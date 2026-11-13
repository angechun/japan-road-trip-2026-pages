/* Safe, explicit, one-time local curation. Public code contains zero private itinerary. */
(()=>{'use strict';
const $=id=>document.getElementById(id),clone=x=>JSON.parse(JSON.stringify(x));
const status=(id,msg)=>{$(id).textContent=msg};
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const exists=x=>x!==undefined;
let data=null,ready=false;
const knownTextFields=new Set(['名稱','日期時間','類型','地區','預約','車程／保留','停車','Plan B','備註','費用','實用連結','連結名稱']);
const knownRoots=new Set(['rental','hotels','reservations','cardGuidePersonal']);
function customFromPackage(p,s){
  // On V2.11.x, the current editor's settings record is fresher than the imported package.
  if(s&&s.value&&typeof s.value==='object')return clone(s.value);
  try {const c=JSON.parse(localStorage.getItem('japan-trip-itinerary-custom-v1')||'null');if(c&&typeof c==='object')return c;}catch{}
  return clone(p.trip.itineraryCustom||{overrides:{},hidden:{},added:[]});
}
function sanitize(c){return {overrides:typeof c.overrides==='object'&&c.overrides&&!Array.isArray(c.overrides)?c.overrides:{},hidden:typeof c.hidden==='object'&&c.hidden&&!Array.isArray(c.hidden)?c.hidden:{},added:Array.isArray(c.added)?c.added:[]};}
function getPath(o,path){let x=o;for(const k of path){if(!x||!(k in x))return undefined;x=x[k];}return x;}
function setPath(o,path,val,del){let x=o;for(let i=0;i<path.length-1;i++){if(!x||!(path[i] in x))return false;x=x[path[i]];}if(!x)return false;const last=path[path.length-1];if(del)delete x[last];else x[last]=clone(val);return true;}
const isAllowedLink=(f,u)=>f!=='實用連結'||u===''||u==='./trip-private-docs.html'||(typeof u==='string'&&/^https:\/\/[a-z0-9.-]+\//.test(u));
function validate(p){
 if(!p||p.format!=='jrt-safe-curation-patch'||p.schemaVersion!=='1.0'||p.patchId!=='FINAL-CLEAN-2026-11-13')throw Error('不是這次專用的安全精簡檔');
 if(!Array.isArray(p.itineraryChanges)||!Array.isArray(p.hideRows)||!Array.isArray(p.addedChanges)||!Array.isArray(p.objectChanges)||!Array.isArray(p.attachmentsToAdd))throw Error('精簡檔內容不完整');
 if(p.itineraryChanges.length>1200||p.objectChanges.length>200)throw Error('異常更新數量');
 for(const x of p.itineraryChanges){if(!knownTextFields.has(x.field)||typeof x.id!=='string'||!('set' in x)||!Array.isArray(x.acceptedWas)||!isAllowedLink(x.field,x.set))throw Error('行程欄位不合法');}
 for(const x of p.addedChanges){if(!knownTextFields.has(x.field)||typeof x.id!=='string'||!('set' in x)||!isAllowedLink(x.field,x.set))throw Error('自訂項目欄位不合法');}
 for(const x of p.objectChanges){if(!Array.isArray(x.path)||!knownRoots.has(x.path[0])||x.path.length>6||!Array.isArray(x.acceptedWas))throw Error('附加欄位不合法');}
 if(p.attachmentsToAdd.length>10||p.attachmentsToAdd.some(x=>!/^rev7-(?:suzuki|esim)-[a-zA-Z0-9-]+$/.test(x.id)||typeof x.dataUrl!=='string'||!/^data:application\/pdf;base64,[a-zA-Z0-9+/=]+$/.test(x.dataUrl)||x.dataUrl.length>8e6))throw Error('私人附件格式不合法');
}
function simulate(pkg,settings,patch){
 let t=clone(pkg.trip),c=sanitize(customFromPackage(pkg,settings));
 const rows=new Map((t.baseItems||[]).map(r=>[r._id,r]));
 let applied=0,already=0,skipped=0,hidden=0,meta=0,added=0,docsAdded=0;const conflicts=[];
 const accept=(val,entry)=>entry.acceptedWas?.some(y=>eq(val,y))||eq(val,entry.was);
 for(const x of patch.itineraryChanges){
  const row=rows.get(x.id);if(!row){skipped++;conflicts.push(x.id+'／資料不存在');continue}
  const override=c.overrides[x.id]||{};
  const current=Object.prototype.hasOwnProperty.call(override,x.field)?override[x.field]:row[x.field];
  const actual=exists(current)?current:'';
  if(eq(actual,x.set)){
   // Clear redundant overrides to keep a clean base. Existing data is already intended value.
   if(Object.prototype.hasOwnProperty.call(override,x.field)){row[x.field]=clone(x.set);delete override[x.field];if(!Object.keys(override).length)delete c.overrides[x.id]}
   already++;continue;
  }
  if(!accept(actual,x)){skipped++;if(conflicts.length<80)conflicts.push(x.id+'／'+x.field);continue;}
  row[x.field]=clone(x.set);if(Object.prototype.hasOwnProperty.call(override,x.field)){delete override[x.field];if(!Object.keys(override).length)delete c.overrides[x.id]}
  applied++;
 }
 for(const x of patch.addedChanges){
  const row=c.added.find(r=>r._id===x.id);if(!row){skipped++;if(conflicts.length<80)conflicts.push(x.id+'／自訂項目不存在');continue}
  const val=exists(row[x.field])?row[x.field]:'';
  if(eq(val,x.set)){already++;continue}
  if(!eq(val,x.was)){skipped++;if(conflicts.length<80)conflicts.push(x.id+'／'+x.field);continue}
  row[x.field]=clone(x.set);added++;
 }
 for(const row of patch.addIfMissing||[]){
  if(!row||typeof row._id!=='string'||!row._id.startsWith('rev7-private-documents-'))continue;
  if(!rows.has(row._id)&&!c.added.some(a=>a._id===row._id)){c.added.push(clone(row));added++;}
 }
 for(const id of patch.hideRows){
  if(!rows.has(id)){skipped++;if(conflicts.length<80)conflicts.push(id+'／隱藏對象不存在');continue}
  if(c.hidden[id])continue;
  // Never hide an item manually edited to different effective values.
  if(c.overrides[id]&&Object.keys(c.overrides[id]).length){skipped++;if(conflicts.length<80)conflicts.push(id+'／含本機個人編輯，保留顯示');continue}
  c.hidden[id]=true;hidden++;
 }
 for(const x of patch.objectChanges){
  const path=x.path;
  if(!knownRoots.has(path[0]))continue;
  if(path[0]==='hotels'||path[0]==='reservations'){
   const item=t[path[0]]?.[path[1]];
   const id=path[0]==='hotels'?'name':'id';
   if(!item||item[id]!==x.recordId){skipped++;continue}
  }
  const now=getPath(t,path);
  if(x.delete){if(!exists(now))continue;if(!accept(now,x)){skipped++;continue};if(setPath(t,path,undefined,true))meta++;continue;}
  if(eq(now,x.set))continue;
  if(x.requireAbsent?exists(now):!accept(now,x)){skipped++;if(conflicts.length<80)conflicts.push(path.join('/'));continue}
  if(setPath(t,path,x.set,false))meta++;else skipped++;
 }
 t.itineraryCustom=c;
 const attachments=clone(pkg.attachments||[]);const aIds=new Set(attachments.map(a=>a.id));
 for(const x of patch.attachmentsToAdd||[]){if(!aIds.has(x.id)){attachments.push(clone(x));aIds.add(x.id);docsAdded++;}}
 return {trip:t,custom:c,attachments,stats:{applied,already,skipped,hidden,meta,added,docsAdded},conflicts};
}
async function state(){
 if(typeof TripDB==='undefined'||typeof PrivateV211==='undefined')throw Error('資料庫程式未載入：請勿修改資料');
 const [p,s]=await Promise.all([TripDB.get('tripPackages','active'),TripDB.get('settings','itineraryCustom')]);
 if(!p?.trip?.baseItems?.length||p.trip.baseItems.length<100)throw Error('此裝置無完整私人行程，請不要在這裡套用');
 return {p,s};
}
async function showState(){try{const {p}=await state();status('state',`已找到私人行程：${p.trip.baseItems.length} 筆基礎行程。已儲存的記帳、日記與照片不會被清除。`);ready=true;return true;}catch(e){ready=false;status('state','停止：'+e.message);return false;}}
$('check').addEventListener('click',showState);
$('patchFile').addEventListener('change',async()=>{data=null;$('apply').disabled=true;
 try{const f=$('patchFile').files[0];if(!f)throw Error('尚未選擇檔案');if(f.size>12e6)throw Error('檔案大小異常');data=JSON.parse(await f.text());validate(data);$('preview').disabled=false;status('previewText','已讀取整理檔，請點選檢查。');}catch(e){status('previewText','無法讀取：'+e.message);$('preview').disabled=true;}});
$('preview').addEventListener('click',async()=>{
 try{const {p,s}=await state();if(data.tripId!==p.tripId)throw Error('這不是同一趟旅程的整理檔');const q=simulate(p,s,data),k=q.stats;
 status('previewText',`可整理：${k.applied} 項文字／連結；${k.meta} 項住宿／租車／預約資訊；${k.hidden} 項多餘備案可隱藏；${k.docsAdded} 份私人附件補入（已存在的不重複）；另有 ${k.added} 項私人文件清單調整。\n保留未覆蓋：${k.skipped} 項不同版本或個人編輯。`+(q.conflicts.length?'\n略過項目：'+q.conflicts.slice(0,12).join('、'):'')+'\n精簡只改內容，不刪除原始附件及記帳。');
 $('apply').disabled=false;
 }catch(e){status('previewText','停止：'+e.message);$('apply').disabled=true;}
});
$('backup').addEventListener('click',async()=>{try{await state();await PrivateV211.exportFull();}catch(e){status('result','無法備份：'+e.message)}});
$('confirmed').addEventListener('change',()=>{});
$('apply').addEventListener('click',async()=>{
 if(!data||!$('confirmed').checked){status('result','請先匯出完整備份、確認檔案存在並勾選確認。');return}
 try{
  const {p,s}=await state();if(data.tripId!==p.tripId)throw Error('旅程 ID 不一致，停止');
  const q=simulate(p,s,data),k=q.stats;
  if(!confirm(`將精簡 ${k.applied} 項行程文字、${k.meta} 項附加資訊、隱藏 ${k.hidden} 筆備案，補入 ${k.docsAdded} 份尚未存在的私密附件。\n${k.skipped} 項與參考版本不一致將保留原狀。\n已保存完整備份，確定套用？`))return;
  const updated=clone(p);updated.trip=q.trip;updated.attachments=q.attachments;updated.source={...(p.source||{}),curationRevision:'FINAL-CLEAN-2026-11-13'};
  // Never use applySnapshot/clear/restore: these would replace user-owned stores.
  await TripDB.put('tripPackages',{...updated,id:'active'});
  await TripDB.put('settings',{id:'itineraryCustom',value:q.custom});
  localStorage.setItem('japan-trip-itinerary-custom-v1',JSON.stringify(q.custom));
  status('result',`整理已套用。文字：${k.applied}，附加資訊：${k.meta}，隱藏備案：${k.hidden}，新增私人附件：${k.docsAdded}，略過衝突：${k.skipped}。請回首頁重新載入後檢查 D02、D03、D07、D08、D10，並再匯出完整備份。`);
  $('apply').disabled=true;
 }catch(e){status('result','更新未能全部完成：'+e.message+'。請勿清除網站資料，使用先前備份檢查。')}
});
showState();
})();