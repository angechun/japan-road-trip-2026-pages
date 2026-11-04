/* V2.11.0 - new-origin private storage. Does NOT access/upgrade/delete legacy DB. */
const TripDB=(()=>{
  const DB_NAME='JapanRoadTripPrivateV211',VERSION=1;
  const stores=['shopping','notes','expenses','hotelPrivate','hotelCovers','settings'];
  const allStores=[...stores,'tripPackages'];
  let dbp;
  function open(){
    if(dbp)return dbp;
    dbp=new Promise((resolve,reject)=>{
      const r=indexedDB.open(DB_NAME,VERSION);
      r.onupgradeneeded=()=>{for(const s of allStores)if(!r.result.objectStoreNames.contains(s))r.result.createObjectStore(s,{keyPath:'id'});};
      r.onsuccess=()=>resolve(r.result);
      r.onerror=()=>{dbp=null;reject(r.error)};
      r.onblocked=()=>{dbp=null;reject(new Error('資料庫被其他視窗使用，請關閉其他 PWA 分頁。'))};
    });return dbp;
  }
  function doReq(store,mode,method,...args){return open().then(db=>new Promise((resolve,reject)=>{
    let tx;try{tx=db.transaction(store,mode);}catch(e){reject(e);return}
    let result;
    const request=tx.objectStore(store)[method](...args);
    request.onsuccess=()=>{result=request.result};
    tx.oncomplete=()=>resolve(result);
    tx.onabort=()=>reject(tx.error||request.error||new Error('寫入已取消'));
    tx.onerror=()=>{};
  }))}
  const all=s=>doReq(s,'readonly','getAll');
  const get=(s,id)=>doReq(s,'readonly','get',id);
  const put=(s,obj)=>doReq(s,'readwrite','put',obj);
  const del=(s,id)=>doReq(s,'readwrite','delete',id);
  const clear=s=>doReq(s,'readwrite','clear');
  async function exportAll(){const out={version:1,exportedAt:new Date().toISOString()};for(const s of stores)out[s]=await all(s);return out;}
  async function applySnapshot(packageRecord,records){
    const db=await open();
    // Single transaction across all app stores, including active package: either all changes commit or none.
    await new Promise((resolve,reject)=>{
      const tx=db.transaction(allStores,'readwrite');
      tx.oncomplete=resolve;
      tx.onabort=()=>reject(tx.error||new Error('還原交易失敗，已回滾'));
      for(const s of stores){
        const store=tx.objectStore(s);store.clear();
        for(const obj of records[s]||[])store.put(obj);
      }
      const ps=tx.objectStore('tripPackages');ps.put({id:'active',...packageRecord});
    });
  }
  return {open,all,get,put,del,clear,exportAll,applySnapshot,stores,DB_NAME};
})();
