/* Japan Road Trip private document add-on. Public code: no person, order, ticket, or SIM data. */
(()=>{'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const COPY=v=>JSON.parse(JSON.stringify(v));
const TYPES={ticket:'🎫 門票',esim:'📶 eSIM',insurance:'🛡️ 保險',rental:'🚗 租車',other:'📁 其他'};
let currentFilter='all',active=null;
function status(msg,bad=false){const e=$('#status');e.textContent=msg;e.classList.toggle('error',bad);}
function safe(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function safeId(id){return /^[a-zA-Z0-9_-]{1,100}$/.test(id||'');}
function validDataUrl(s){return typeof s==='string'&&/^data:(application\/pdf|image\/(?:png|jpeg|webp));base64,[A-Za-z0-9+/=]+$/.test(s)&&s.length<12000000;}
function validAttachment(a){return a&&safeId(a.id)&&TYPES[a.type]&&typeof a.title==='string'&&a.title.length<180&&(!a.dataUrl||validDataUrl(a.dataUrl))&&(!a.qrDataUrl||validDataUrl(a.qrDataUrl));}
const merge=(old,add)=>Object.assign({},old||{},add||{});
async function refresh(){active=await TripDB.get('tripPackages','active');const docs=active?.attachments||[];$('#docCount').textContent=docs.length+' 份';status(active?.trip?`已載入私人旅程，文件 ${docs.length} 份。資料只存在此瀏覽器，未加密。`:'尚未在此裝置匯入私人旅程，請回主程式先匯入 REV6。',!active?.trip);render();}
function render(){const el=$('#docs');el.replaceChildren();const list=(active?.attachments||[]).filter(a=>currentFilter==='all'||a.type===currentFilter);
 if(!list.length){el.innerHTML='<p class="empty">目前沒有這類文件。</p>';return;}
 for(const a of list){const article=document.createElement('article');article.className='doc';
  const heading=document.createElement('div');heading.innerHTML='<small>'+safe(TYPES[a.type]||TYPES.other)+' · '+safe(a.date||'私人文件')+'</small><h3>'+safe(a.title)+'</h3>'+(a.note?'<p class="note">'+safe(a.note)+'</p>':'');article.append(heading);
  if(validDataUrl(a.qrDataUrl)&&a.qrDataUrl.startsWith('data:image/')){const qr=document.createElement('img');qr.src=a.qrDataUrl;qr.className='qr';qr.alt=a.type==='esim'?'eSIM 啟用 QR Code（請妥善保管）':'入場 QR Code';article.append(qr);}
  else if(validDataUrl(a.dataUrl)&&a.dataUrl.startsWith('data:image/')){const qr=document.createElement('img');qr.src=a.dataUrl;qr.className='qr';qr.alt='已儲存圖片';article.append(qr);}
  const actions=document.createElement('div');actions.className='actions';
  if(validDataUrl(a.dataUrl)){const b=document.createElement('button');b.textContent=a.dataUrl.startsWith('data:application/pdf')?'📄 開啟 PDF':'🖼 開啟圖片';b.addEventListener('click',()=>openAsset(a.dataUrl,a.title));actions.append(b);}
  const d=document.createElement('button');d.textContent='移除此份文件';d.className='danger';d.addEventListener('click',()=>removeDoc(a.id,a.title));actions.append(d);article.append(actions);el.append(article);
 }
}
function openAsset(dataUrl,title){if(!validDataUrl(dataUrl))return status('文件格式不支援',true);const w=window.open('','_blank');if(!w){status('瀏覽器阻擋彈出視窗。請允許開啟 PDF，或改用下方下載方式。',true);return;}
 try{const i=dataUrl.indexOf(','),mime=dataUrl.slice(5,dataUrl.indexOf(';')),binary=atob(dataUrl.slice(i+1)),buf=new Uint8Array(binary.length);for(let j=0;j<binary.length;j++)buf[j]=binary.charCodeAt(j);const url=URL.createObjectURL(new Blob([buf],{type:mime}));w.location.href=url;setTimeout(()=>URL.revokeObjectURL(url),180000);}catch(e){w.close();status('開啟失敗：'+e.message,true);}}
async function atomicStore(next,custom){const db=await TripDB.open();await new Promise((resolve,reject)=>{const tx=db.transaction(['tripPackages','settings'],'readwrite');tx.objectStore('tripPackages').put(next);tx.objectStore('settings').put({id:'itineraryCustom',value:custom});tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error||new Error('寫入失敗'));tx.onabort=()=>reject(tx.error||new Error('交易取消'));});localStorage.setItem('japan-trip-itinerary-custom-v1',JSON.stringify(custom));}
async function patchImport(file){if(!file)return;if(file.size>30*1024*1024)return status('更新檔過大（上限 30MB）',true);let patch;
 try{patch=JSON.parse(await file.text());if(patch.format!=='japan-road-trip-private-patch'||patch.schemaVersion!=='1.0'||!safeId(patch.patchId)||!Array.isArray(patch.attachments)||!patch.attachments.every(validAttachment)||!patch.itineraryOverrides||typeof patch.itineraryOverrides!=='object'||Array.isArray(patch.itineraryOverrides))throw Error('不是受支援的 REV7 私人更新檔');
  active=await TripDB.get('tripPackages','active');if(!active?.trip?.baseItems?.length)throw Error('本機尚無私人行程，請先在主程式匯入 REV6');
  if(patch.tripId!==active.tripId)throw Error('旅程識別碼不同，為避免誤覆蓋已停止匯入');
  const exists=(active.trip.baseItems||[]).map(x=>x._id);for(const id of Object.keys(patch.itineraryOverrides)){if(!safeId(id)||!exists.includes(id))throw Error('找不到要修改的行程：'+id);}
  const duplicate=(active.source?.privatePatchIds||[]).includes(patch.patchId);if(duplicate){status('REV7 更新已套用過。原有文件保持不變。');return;}
  if(!confirm('此更新只改指定的租車、行程及文件資料，不清除記帳、日記或照片。\n\n請先確認已下載「完整私人備份」並妥善保存，是否套用？'))return;
  // Download a pre-mutation recovery snapshot, even if the person forgot to click backup.
  await PrivateV211.exportFull();
  if(!confirm('已開始下載匯入前備份。\n請先確認下載資料夾真的出現備份 JSON，再按「確定」正式更新；若無檔案請按取消。'))return;
  const next=COPY(active),trip=next.trip;
  trip.rental=merge(trip.rental,patch.rental||{});if(patch.rental?.pickup)trip.rental.pickup=merge(active.trip.rental?.pickup,patch.rental.pickup);if(patch.rental?.return)trip.rental.return=merge(active.trip.rental?.return,patch.rental.return);
  const key='japan-trip-itinerary-custom-v1';let local=null;try{local=JSON.parse(localStorage.getItem(key)||'null')}catch(_){};
  const custom=local&&typeof local==='object'&&!Array.isArray(local)?COPY(local):COPY(trip.itineraryCustom||{overrides:{},hidden:{},added:[]});custom.overrides=custom.overrides||{};custom.hidden=custom.hidden||{};custom.added=Array.isArray(custom.added)?custom.added:[];
  for(const [id,value] of Object.entries(patch.itineraryOverrides))custom.overrides[id]=merge(custom.overrides[id],value);
  for(const row of patch.itineraryAdded||[]){if(!safeId(row._id)||!/^D\d{2}$/.test(row.Day)||typeof row['名稱']!=='string')throw Error('新增行程欄位不合法');if(!custom.added.some(r=>r._id===row._id))custom.added.push(row);}
  trip.itineraryCustom=custom;
  next.userData=next.userData||{};next.userData.localState=next.userData.localState||{};next.userData.localState[key]=JSON.stringify(custom);
  for(const [id,fields] of Object.entries(patch.reservationUpdates||{})){const r=(trip.reservations||[]).find(x=>x.id===id);if(r)Object.assign(r,fields);}
  next.attachments=Array.isArray(next.attachments)?next.attachments:[];for(const att of patch.attachments){const i=next.attachments.findIndex(x=>x.id===att.id);if(i>=0)next.attachments[i]=COPY(att);else next.attachments.push(COPY(att));}
  next.source=merge(next.source,{privatePatchIds:[...(next.source?.privatePatchIds||[]),patch.patchId]});
  await atomicStore(next,custom);await refresh();status('REV7 更新成功！請返回主行程重新整理，核對更新的行程與文件。');
 }catch(e){status('匯入失敗，未清空原始資料：'+e.message,true);console.error(e);}finally{$('#patchFile').value='';}}
async function removeDoc(id,title){if(!confirm('確定只移除「'+title+'」文件嗎？此操作不刪除行程與其他資料。'))return;try{const cur=await TripDB.get('tripPackages','active');cur.attachments=(cur.attachments||[]).filter(x=>x.id!==id);await TripDB.put('tripPackages',cur);await refresh();}catch(e){status('移除失敗：'+e.message,true);}}
function fileToDataUrl(f){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(reader.error);reader.readAsDataURL(f);});}
async function addFiles(files){if(!files?.length)return;let cur=await TripDB.get('tripPackages','active');if(!cur?.trip)return status('請先在主程式匯入私人行程',true);const type=$('#newType').value,label=$('#newLabel').value.trim();
 try{for(const f of files){if(f.size>8*1024*1024)throw Error(f.name+' 大於 8MB');const mime=f.type||((f.name||'').toLowerCase().endsWith('.pdf')?'application/pdf':'');if(!['application/pdf','image/jpeg','image/png','image/webp'].includes(mime))throw Error('僅支援 PDF/PNG/JPEG/WebP');const dataUrl=await fileToDataUrl(f);if(!validDataUrl(dataUrl))throw Error('無法讀取 '+f.name);const id='personal-'+(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36));const item={id,type,title:label||f.name,date:new Date().toISOString().slice(0,10),note:'自行加入的私人文件',fileName:f.name,dataUrl};cur.attachments=cur.attachments||[];cur.attachments.push(item);}
  await TripDB.put('tripPackages',cur);$('#newFiles').value='';$('#newLabel').value='';await refresh();status('文件已儲存在本機。請記得匯出新的完整私人備份。');
 }catch(e){status('新增失敗：'+e.message,true);}}
$$('.filter').forEach(b=>b.addEventListener('click',()=>{currentFilter=b.dataset.type;$$('.filter').forEach(x=>x.classList.toggle('active',x===b));render();}));
$('#backupFirst').addEventListener('click',async()=>{try{if(!(await TripDB.get('tripPackages','active'))?.trip)throw Error('請先匯入私人行程');await PrivateV211.exportFull();}catch(e){status('備份失敗：'+e.message,true);}});
$('#patchFile').addEventListener('change',e=>patchImport(e.target.files?.[0]));$('#newFiles').addEventListener('change',e=>addFiles(e.target.files));
refresh().catch(e=>status('資料庫讀取失敗，請勿清除既有資料：'+e.message,true));
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(e=>console.warn('文件頁離線快取設定失敗',e));
})();
