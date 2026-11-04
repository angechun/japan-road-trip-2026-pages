/* Load private trip from IndexedDB BEFORE running old app.js. No network private JSON. */
(async()=>{
  try{
    const p=await window.PrivateV211.active();
    if(p?.trip){
      const t=p.trip;
      window.TRIP_DATA=t.baseItems||[];
      window.HOTELS=t.hotels||[];
      window.FLIGHTS=t.flights||[];
      window.LOUNGE_DATA=t.lounges||[];
      window.RENTAL_DATA=t.rental||{};
      window.PRIVATE_CARD_GUIDE=t.cardGuidePersonal||{};
      window.PRIVATE_MODE=true;
      window.PWA_DEMO=false;
      // Local keys are a mirror of private data saved in this origin; only app-specific keys.
      window.PrivateV211.restoreLocalMirror(p.userData?.localState||{},t.itineraryCustom);
      document.getElementById('privacyMode').textContent='私人行程已在此裝置載入';
      document.getElementById('importStatus').textContent=`來源：${p.source?.sourceType||'私人 JSON'} · ${t.baseItems.length} 筆原始行程。本機儲存沒有加密。`;
    }
  }catch(e){
    console.error('Private bootstrap',e);
    document.getElementById('importStatus').textContent='本機資料載入失敗，暫以公開示範模式啟動；請勿清除瀏覽器資料。';
  }
  const script=document.createElement('script');script.src='./app.js';script.onload=()=>{
    document.getElementById('quickPrivateImport')?.addEventListener('click',()=>document.getElementById('importFile').click());
  };script.onerror=()=>{document.getElementById('importStatus').textContent='應用程式載入失敗；請重新整理。'};
  document.body.appendChild(script);
})();
