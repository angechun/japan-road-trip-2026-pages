/* V2.11.0 private JSON controller. User selects file locally; no private fetch, no remote sync. */
window.PrivateV211=(()=>{
  const FORMAT='japan-road-trip-private';
  const KEYLIST=['japan-trip-itinerary-custom-v1','japan-trip-reminder-state-v1','japan-trip-card-guide-tasks-v1','trip-checks','jpy-twd-rate','jpy-twd-stamp'];
  const emptyCustom=()=>({overrides:{},hidden:{},added:[]});
  const copy=x=>JSON.parse(JSON.stringify(x));
  const isObj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
  const assert=(ok,text)=>{if(!ok)throw new Error(text)};
  function validate(pkg){
    assert(isObj(pkg),'私人 JSON 必須是物件');
    assert(pkg.format===FORMAT,'不是 V2.11.0 私人旅行資料包');
    assert(String(pkg.schemaVersion||'').startsWith('1.'),'不支援的 schema 版本');
    assert(isObj(pkg.trip),'缺少 trip');
    const t=pkg.trip;
    for(const k of ['baseItems','hotels','flights','lounges'])assert(Array.isArray(t[k]),`缺少資料陣列：${k}`);
    assert(isObj(t.rental),'租車欄位應為物件');
    assert(isObj(pkg.userData),'缺少 userData');
    for(const s of TripDB.stores)assert(Array.isArray(pkg.userData[s]),`缺少資料表：${s}`);
    assert(isObj(pkg.userData.localState),'缺少 localState');
    assert(t.baseItems.length<=30000,'行程筆數異常');
    const ids=new Set();
    for(const row of t.baseItems){
      assert(isObj(row)&&typeof row._id==='string'&&/^[a-zA-Z0-9_-]{1,100}$/.test(row._id),'行程缺少安全的 _id');
      assert(!ids.has(row._id),'基礎行程 _id 重複：'+row._id);ids.add(row._id);
      assert(/^D\d{2}$/.test(String(row.Day||'')),'Day 欄位不合法');
      assert(typeof row['名稱']==='string','行程缺少名稱');
      assert(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(row.日期時間||''),'行程日期時間格式不合法');
    }
    for(const s of TripDB.stores){
      const used=new Set();
      for(const x of pkg.userData[s]){
        assert(isObj(x)&&typeof x.id==='string'&&x.id.length<256,'紀錄 ID 格式錯誤：'+s);
        assert(!used.has(x.id),'紀錄 ID 重複：'+s);used.add(x.id);
      }
    }
    const c=t.itineraryCustom||emptyCustom();
    assert(isObj(c.overrides)&&isObj(c.hidden)&&Array.isArray(c.added),'行程修改結構錯誤');
    return pkg;
  }
  async function active(){return TripDB.get('tripPackages','active')}
  function captureLocal(){const result={};for(const k of KEYLIST){const v=localStorage.getItem(k);if(v!==null)result[k]=v;}return result}
  function restoreLocalMirror(state,custom,force=false){
    const s=isObj(state)?state:{};
    for(const k of KEYLIST){
      if(typeof s[k]==='string'&&(force||localStorage.getItem(k)===null))localStorage.setItem(k,s[k]);
      else if(k==='japan-trip-itinerary-custom-v1'&&custom&&(force||localStorage.getItem(k)===null))localStorage.setItem(k,JSON.stringify(custom));
      else if(force)localStorage.removeItem(k);
    }
  }
  async function snapshot(){
    const curr=await active();const stores=await TripDB.exportAll();
    return {curr,stores,localState:captureLocal()};
  }
  function currentToPackage(snap){
    const a=snap.curr||{};
    const t=a.trip||{dayOrder:[],baseItems:[],itineraryCustom:emptyCustom(),hotels:[],flights:[],lounges:[],rental:{},reservations:[],tickets:[]};
    const c=JSON.parse(snap.localState['japan-trip-itinerary-custom-v1']||'null')||t.itineraryCustom||emptyCustom();
    const out={format:FORMAT,schemaVersion:'1.0.0',packageId:'export-'+new Date().toISOString(),tripId:a.tripId||'local-trip',exportedAt:new Date().toISOString(),source:{appVersion:'2.11.0',sourceType:'v211-browser-full-backup',migrationVersion:1},
      trip:{...copy(t),itineraryCustom:c},userData:{localState:copy(snap.localState)},attachments:copy(a.attachments||[]),integrity:{counts:{},warnings:['本檔是私人明文 JSON；請另以 7-Zip AES-256 加密保存。']}};
    for(const k of TripDB.stores)out.userData[k]=copy(snap.stores[k]||[]);
    for(const k of ['baseItems','hotels','flights'])out.integrity.counts[k]=out.trip[k].length;
    for(const k of TripDB.stores)out.integrity.counts[k]=out.userData[k].length;
    return out;
  }
  function download(obj,filename){
    const blob=new Blob([JSON.stringify(obj,null,2)],{type:'application/json;charset=utf-8'});
    const url=URL.createObjectURL(blob);const link=document.createElement('a');
    link.href=url;link.download=filename;document.body.append(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),30000);
  }
  async function exportFull(){
    const p=currentToPackage(await snapshot());
    // If only demo is present, inform the user the backup won't contain the source ZIP.
    if(!p.trip.baseItems.length && !Object.values(p.userData).some(x=>Array.isArray(x)&&x.length)){
      if(!confirm('目前尚未匯入私人旅程。是否仍要下載空白備份？'))return false;
    }
    download(p,'JapanTrip-V211-PRIVATE-full-'+new Date().toISOString().slice(0,10)+'.json');
    alert('已啟動私人 JSON 下載。請到「下載」確認檔案實際存在，再加密保存；下載不等於資料已加密。');
    return true;
  }
  const key=(row,fallback)=>String(row?.id||row?._id||row?.name||row?.flight||fallback||'');
  function mergeArray(local,incoming,keyFn,stats){
    const index=new Map();const result=copy(local);
    for(let i=0;i<result.length;i++)index.set(keyFn(result[i],i),i);
    for(let i=0;i<incoming.length;i++){
      const r=incoming[i],id=keyFn(r,i);
      if(!index.has(id)){index.set(id,result.length);result.push(copy(r));stats.added++;}
      else if(JSON.stringify(result[index.get(id)])!==JSON.stringify(r)){stats.conflicts++;}
    }
    return result;
  }
  function combine(current,incoming,stats){
    if(!current?.trip)return copy(incoming);
    const p=copy(current),q=incoming,t=p.trip,ti=q.trip;
    for(const [name,keyFn] of [['baseItems',r=>r._id],['hotels',r=>r.id||r.name],['flights',r=>r.id||r.flight],['lounges',r=>r.id]]){
      t[name]=mergeArray(t[name]||[],ti[name]||[],keyFn,stats);
    }
    const c=t.itineraryCustom||emptyCustom(),ci=ti.itineraryCustom||emptyCustom();
    for(const x of ['overrides','hidden'])for(const [k,v] of Object.entries(ci[x]||{})){
      if(!Object.hasOwn(c[x],k)){c[x][k]=copy(v);stats.added++;}
      else if(JSON.stringify(c[x][k])!==JSON.stringify(v))stats.conflicts++;
    }
    c.added=mergeArray(c.added||[],ci.added||[],r=>r._id,stats);t.itineraryCustom=c;
    for(const field of ['rental','cardGuidePersonal']){
      if(!t[field]||!Object.keys(t[field]).length)t[field]=copy(ti[field]||{});
      else if(JSON.stringify(t[field])!==JSON.stringify(ti[field]||{}))stats.conflicts++;
    }
    for(const field of ['reservations','tickets'])t[field]=mergeArray(t[field]||[],ti[field]||[],(r,i)=>key(r,i),stats);
    p.attachments=mergeArray(p.attachments||[],q.attachments||[],(r,i)=>key(r,i),stats);
    return p;
  }
  function combineLocalStates(local,incoming,stats){
    const out={...local};
    for(const k of KEYLIST){if(!(k in incoming))continue;
      if(!(k in out)){out[k]=incoming[k];stats.added++;}
      else if(out[k]!==incoming[k])stats.conflicts++;
    }return out;
  }
  async function importFile(file){
    assert(file.size<=100*1024*1024,'JSON 超過 100 MB，請先分段備份附件');
    let incoming;
    try{incoming=JSON.parse(await file.text())}catch{throw new Error('JSON 無法解析')}
    // Read-only compatibility for V2.10.x's native IndexedDB JSON export.
    // It does NOT contain the original base itinerary, localStorage or complete photos kept outside IndexedDB.
    if(incoming && incoming.format!==FORMAT && Number(incoming.version)===2 && TripDB.stores.some(s=>Array.isArray(incoming[s]))){
      const activeTrip=await active();
      if(!activeTrip?.trip)throw new Error('這是舊版 IndexedDB 備份；請先匯入 V2.11.0 私人基礎行程包，再匯入此舊備份。');
      const legacy=incoming;
      incoming={format:FORMAT,schemaVersion:'1.0.0',packageId:'converted-legacy-db-'+Date.now(),tripId:activeTrip.tripId||'legacy-trip',exportedAt:new Date().toISOString(),
        source:{appVersion:'2.10.x',sourceType:'legacy-indexeddb-export-ONLY',migrationVersion:1},trip:copy(activeTrip.trip),attachments:[],
        userData:{localState:{}},integrity:{counts:{},warnings:['由舊版資料庫 JSON 轉換；不含舊裝置 localStorage 與外部附件。建議只選合併模式。']}};
      for(const s of TripDB.stores)incoming.userData[s]=Array.isArray(legacy[s])?legacy[s]:[];
      alert('偵測到舊版 V2.10.x IndexedDB 備份。它不包含舊裝置 localStorage；建議輸入 1 使用「合併」，避免覆蓋目前私人行程。');
    }
    validate(incoming);
    const count=incoming.trip.baseItems.length;
    const summary=`此私人包包含 ${count} 筆基礎行程、${incoming.trip.hotels.length} 間住宿、${incoming.trip.flights.length} 筆航班。\n來源：${incoming.source?.sourceType||'未知'}。\n注意：如果來源是 legacy-base-only，並不包含舊手機日記、記帳、照片或自訂行程。`;
    const raw=prompt(summary+'\n\n請輸入 1＝合併（同 ID 衝突保留本機）或 2＝完整還原（覆蓋此 PWA 的既有私人資料）。\n留空則取消。','');
    if(raw!=='1'&&raw!=='2')return false;
    const mode=raw==='1'?'merge':'restore';
    const snap=await snapshot();
    const hasExisting=!!snap.curr||TripDB.stores.some(s=>snap.stores[s]?.length)||Object.keys(snap.localState).length>0;
    if(hasExisting){
      const before=currentToPackage(snap);
      download(before,'BACKUP-BEFORE-IMPORT-'+new Date().toISOString().slice(0,19).replace(/:/g,'-')+'.json');
      if(!confirm('已開始下載「匯入前備份」。\n請先到下載資料夾確認檔案存在，並將它加密保存。\n完成後按「確定」繼續；未成功保存請按「取消」。'))return false;
    }
    if(mode==='restore'&&!confirm('最後確認：完整還原將以匯入包覆蓋此 V2.11.0 PWA 目前私人資料。舊 GitHub 帳號和舊手機資料不會刪除。確定繼續？'))return false;
    const stats={added:0,conflicts:0};
    const existingPackage=hasExisting?currentToPackage(snap):null;
    const merged=mode==='restore'?copy(incoming):combine(existingPackage,incoming,stats);
    const records={};
    for(const s of TripDB.stores){
      records[s]=mode==='restore'?copy(incoming.userData[s]):mergeArray(snap.stores[s]||[],incoming.userData[s],r=>r.id,stats);
    }
    const localState=mode==='restore'?{...incoming.userData.localState}:combineLocalStates(snap.localState,incoming.userData.localState,stats);
    const custom=mode==='restore'?incoming.trip.itineraryCustom:merged.trip.itineraryCustom;
    localState['japan-trip-itinerary-custom-v1']=JSON.stringify(custom||emptyCustom());
    records.settings=records.settings.filter(x=>x.id!=='itineraryCustom');
    records.settings.push({id:'itineraryCustom',value:custom||emptyCustom()});
    const chosen={trip:merged.trip,tripId:merged.tripId,source:merged.source,userData:{localState},attachments:merged.attachments||[]};
    // Validate the candidate package and records before a single multi-store IndexedDB transaction.
    validate({...merged,userData:{...records,localState}});
    await TripDB.applySnapshot(chosen,records);
    const verify=await active();
    assert(verify?.trip?.baseItems?.length===merged.trip.baseItems.length,'資料庫驗證未通過，請從匯入前備份還原');
    for(const s of TripDB.stores)assert((await TripDB.all(s)).length===records[s].length,`匯入後 ${s} 筆數不一致，請立即使用匯入前備份還原`);
    restoreLocalMirror(localState,custom,true);
    alert(`匯入成功。模式：${mode==='merge'?'合併':'完整還原'}。\n行程：${verify.trip.baseItems.length} 筆。\n新增：${stats.added}；同 ID 衝突：${stats.conflicts}（合併時保留本機）。\n本機儲存未加密。頁面將重新載入。`);
    location.reload();return true;
  }
  return {active,captureLocal,restoreLocalMirror,snapshot,exportFull,importFile,validate};
})();
