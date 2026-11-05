/* V2.11.1 public-only card estimate engine. Personal eligibility is loaded from private IndexedDB. */
(function(root){
  'use strict';
  const CARD_ORDER=['ubot-m','ubot-jiho','dbs-eco','dbs-eco-ez','esun-kumamon','fubon-costco','taishin-flygo','esun-ubear','kgi-eslite'];
  const RULES={
    'ubot-m':{name:'聯邦 M 卡',base:3,source:'https://activity.ubot.com.tw/2026Mcard/index.htm'},
    'ubot-jiho':{name:'聯邦吉鶴卡',base:2.5,source:'https://activity.ubot.com.tw/2026JiHoCard/japan.htm'},
    'dbs-eco':{name:'星展 eco 永續卡',base:1,source:'https://www.dbs.com.tw/personal-zh/cards/dbs_eco/index.html'},
    'dbs-eco-ez':{name:'星展 eco 永續極簡卡',base:1,source:'https://www.dbs.com.tw/personal-zh/cards/dbs-credit-cards/eco-ez'},
    'esun-kumamon':{name:'玉山熊本熊卡',base:2.5,source:'https://event.esunbank.com.tw/credit/kumamon-card/japan-discount.html'},
    'fubon-costco':{name:'富邦 Costco 聯名卡',base:1,source:'https://www.fubon.com/banking/event/credit_card/costcoweb/travel/evt5-03.html'},
    'taishin-flygo':{name:'台新 Richart 卡',base:0.3,source:'https://mkp.taishinbank.com.tw/TsCms/marketing/expose/WM_20260820152405032/index.html'},
    'esun-ubear':{name:'玉山 U Bear 卡',base:0,source:'https://event.esunbank.com.tw/credit/ubear/index.html'},
    'kgi-eslite':{name:'凱基誠品聯名卡',base:0.3,source:'https://www.kgibank.com.tw/webpages/eslite-credit-card/index.html?entry=OS9000969'}
  };
  const normal=s=>String(s||'').trim().toLowerCase().replace(/[\s\-_．・·]/g,'');
  const specialBrandAliases=[
    ['biccamera',['biccamera','ビックカメラ','必客','bic camera']],
    ['yodobashi',['yodobashi','ヨドバシ']],
    ['matsukiyo',['松本清','matsumoto kiyoshi','matsukiyo','マツモトキヨシ']],
    ['donki',['唐吉訶德','don quijote','ドン・キホーテ','ドンキ','mega donki']],
    ['daikoku',['大國藥妝','大国ドラッグ','ダイコクドラッグ','daikoku']],
    ['uniqlo',['uniqlo','ユニクロ','優衣庫']],
    ['gu',['gu','ジーユー']],
    ['muji',['無印良品','muji','無印']],
    ['mitsui',['mitsui','三井outlet','mitsui outlet','三井購物']],
    ['lalaport',['lalaport','ららぽーと']],
    ['nipponrent',['nippon rent a car','nippon rent-a-car','ニッポンレンタカー','日本租車']]
  ];
  function namedMerchant(s){
    const v=normal(s);
    if(!v)return null;
    for(const [id,arr] of specialBrandAliases){
      if(arr.some(x=>v.includes(normal(x))))return id;
    }
    return null;
  }
  const knownCap=(obj,key)=>Object.prototype.hasOwnProperty.call(obj||{},key)&&obj[key]!==null&&obj[key]!==''&&Number.isFinite(Number(obj[key]));
  function compare(options={}){
    const p=options.profile||{}, reg=p.registrationStatus||{}, caps=p.capUsedTwd||{}, held=p.heldStatus||{};
    const amountJPY=Math.max(0,Number(options.amountJPY)||0), twdRate=Math.max(0,Number(options.twdRate)||0);
    const foreignFee=Math.max(0,Number(options.foreignFee)||0), twd=amountJPY*twdRate;
    const scenario=options.scenario||'physical',payment=options.payment||'physical',merchant=namedMerchant(options.merchant);
    const isOnline=payment==='online'||scenario==='booking'||scenario==='train';
    const isWallet=payment==='applepay'||payment==='googlepay'||scenario==='mobile';
    const inPerson=!isOnline&&payment!=='paypay'&&scenario!=='paypay';
    const suitable=(id)=>held[id]!=='未持有';
    const result=[];
    for(const id of CARD_ORDER){
      if(!suitable(id))continue;
      const rule=RULES[id];
      const notes=[];
      let basePct=rule.base, conditionalAmount=0;
      // The estimated foreign fee is user-input only; some transactions are exempt or differ by bank.
      const addConditional=(ratePct,capTwd,label,shouldApply)=>{
        const expected=twd*ratePct/100;
        const capIsKnown=knownCap(caps,id);
        const remaining=capIsKnown?Math.max(0,capTwd-Number(caps[id])):null;
        const estimated=remaining===null?Math.min(capTwd,expected):Math.min(remaining,expected);
        if(shouldApply&&capIsKnown){
          basePct+=twd>0?estimated/twd*100:0;
          notes.push(label+'，已按已登記的本期剩餘上限估算；仍須符合交易認列。');
        }else if(shouldApply){
          conditionalAmount+=estimated;
          notes.push(label+'：本期加碼已使用額度未知，未納入保守估算。');
        }else{
          conditionalAmount+=estimated;
          notes.push(label+'：需確認登錄／通路／付款方式，未納入保守估算。');
        }
      };
      if(isOnline){
        notes.push('網路／車票交易須確認請款地區、幣別及指定通路；一般海外實體加碼不可直接套用。');
      }
      if(payment==='paypay'||scenario==='paypay'){
        if(id==='esun-kumamon'){
          basePct=0; notes.push('PayPay 是獨立玉山 Wallet 方案；名目最高 5% 含免收交易費，與一般 2.5%／指定商店 6% 不併計。');
          conditionalAmount=Math.min(twd*0.035,100);
        }else{
          basePct=0;notes.push('此付款方式不適用預設的實體卡回饋估算，須另查銀行條款。');
        }
      }else if(id==='ubot-m'){
        basePct=p.mEbill===true?3:1.5;
        notes.push(p.mEbill===true?'電子帳單資格已記錄；但仍需確認外幣請款的一般消費。':'尚未確認電子帳單，暫按較保守基本比率列示。');
        if(isOnline)notes.push('可能有指定交通／旅遊專屬活動，不能與一般3%無條件疊加。');
      }else if(id==='ubot-jiho'){
        if(isOnline)notes.push('請先確認是否符合日本日圓一般消費的交易定義。');
        if(isWallet){
          addConditional(1.5,600,'日本行動支付加碼1.5%',p.jihoMobileRegistered===true);
          addConditional(1,200,'前月聯邦帳單滿3萬加碼1%',p.jihoBill30k===true);
          notes.push('行動支付優惠須排除 QUICPay 等不合格交易；具體門檻以官方為準。');
        }
        notes.push('日本11大熱門商店加碼3%另有活動總上限，未核實商家名單前不自動加計。');
      }else if(id==='dbs-eco'||id==='dbs-eco-ez'){
        if(inPerson && payment!=='googlepay'){
          addConditional(4,600,'日本指定地區實體加碼4%',false);
        }else notes.push('網路／Google Pay 或未指定付款條件，不直接套用指定實體4%加碼。');
        if(scenario==='dining'){
          const ok=reg.dbsDining202611==='有登錄紀錄';
          notes.push('星饗世界另有最高10%餐飲活動：11月'+(ok?'有登錄紀錄':'登錄待確認')+'；每日只取最高一筆，每日上限NT$300、每月上限NT$1,000。此活動另計、不直接疊加。');
        }
      }else if(id==='esun-kumamon'){
        if(isOnline)notes.push('須確認日本商店請款地點；部分海外訂房網站不符合日本一般消費資格。');
        if(merchant&&inPerson&&payment!=='paypay'){
          const checked=reg.kumamonStore==='有登錄紀錄';
          addConditional(6,500,'日本指定商店加碼6%（店名／請款商戶須符合）',checked);
        }else if(scenario==='drugstore'||scenario==='rental'){
          notes.push('指定商店加碼需輸入可識別的店名，未驗證前不直接套用8.5%。');
        }
        if(payment==='paypay')notes.push('一般實體2.5%不與PayPay方案相加。');
      }else if(id==='fubon-costco'){
        if(inPerson&&payment==='physical')addConditional(4,600,'2026年11月海外實體加碼4%',reg.fubonTravel202611==='有登錄紀錄');
        else notes.push('第三方支付、非實體交易不保證適用海外實體加碼。');
      }else if(id==='taishin-flygo'){
        if(reg.richartTravel==='有登錄紀錄' && p.flygoEligible===true){
          basePct=3.3;notes.push('已依私人成果設定估算玩旅刷Level2；消費當日仍應確認切換狀態及適用通路。');
        }else{
          basePct=0.3;conditionalAmount+=twd*0.03;
          notes.push('玩旅刷需在消費當日切換且達Level2資格；目前不列入確定3.3%。');
        }
      }else if(id==='esun-ubear'){
        basePct=0;notes.push('網購／帳單e化／自扣資格未完整確認；不是已確認的本次七張主力卡。');
      }else if(id==='kgi-eslite'){
        if(p.kgiAutopay===true){
          basePct=2.3;notes.push('需持續符合帳戶自扣資格及上限，非無限2.3%。');
        }else notes.push('目前僅以不需額外自扣資格的0.3%估算。');
      }
      if((p.networks||{})[id]==='未設定'||!(p.networks||{})[id])notes.push('卡組織尚未確認：不自動認列Visa、Mastercard或JCB活動。');
      if(!merchant && (scenario==='drugstore'||scenario==='rental'))notes.push('未輸入店家名稱，指定商家活動不可直接確定。');
      if(held[id]!=='持有')notes.push('持卡狀態未確認，此卡僅供比較候選。');
      // Base rate is only an estimate: exact transaction category and bank approval remain external.
      result.push({id,name:rule.name,held:held[id]==='持有'?'held':'unknown',
        basePct,baseReward:twd*basePct/100,conditionalAmount,
        feeTwd:twd*foreignFee/100,notes,source:rule.source,
        confirmed:held[id]==='持有'&&!!amountJPY});
    }
    result.sort((a,b)=>(b.held==='held')-(a.held==='held') || b.basePct-a.basePct || b.conditionalAmount-a.conditionalAmount);
    return result;
  }
  root.V2111CardEngine={compare,namedMerchant,CARD_ORDER};
})(typeof window==='undefined'?globalThis:window);
