window.REFERENCE_DATA = {
  "updated": "2026-09-04",
  "cards": [
    {
      "id": "ubot-m",
      "name": "聯邦 M 卡",
      "issuer": "聯邦銀行",
      "best": "海外實體 3% 無上限",
      "summary": "申辦電子化帳單後，2026/2/1–12/31 海外實體消費 3% 回饋無上限。",
      "conditions": [
        "海外實體消費",
        "需電子化帳單",
        "國際組織額外活動另計"
      ],
      "valid": "2026-12-31",
      "source": "https://activity.ubot.com.tw/2026Mcard/index.htm",
      "score": 4,
      "calc": {
        "rates": {
          "physical": 3,
          "mobile": 3
        },
        "requires": {
          "physical": "mEbill",
          "mobile": "mEbill"
        },
        "compareNote": "海外實體3%需電子化帳單；指定國家額外加碼因有門檻，未自動併入。"
      }
    },
    {
      "id": "ubot-jiho",
      "name": "聯邦吉鶴卡",
      "issuer": "聯邦銀行",
      "best": "日本一般 2.5%；指定情境可再加碼",
      "summary": "2026/7/1–12/31 日幣一般消費 2.5% 無上限；日本實體 Apple Pay / Google Pay 登錄加 1.5%，前月聯邦帳單滿 3 萬再加 1%，日本 11 大熱門商店再加 3%。",
      "conditions": [
        "日本一般 2.5% 無上限",
        "行動支付加碼需先登錄",
        "熱門商店加碼活動期間上限 600 元",
        "日本交通卡儲值另有活動、非一般消費"
      ],
      "valid": "2026-12-31",
      "source": "https://activity.ubot.com.tw/2026JiHoCard/japan.htm",
      "score": 5,
      "calc": {
        "rates": {
          "physical": 2.5,
          "mobile": 2.5,
          "drugstore": 2.5
        },
        "compareNote": "日本一般2.5%無上限；行動支付依你的登錄/前月帳單資格再加碼。"
      }
    },
    {
      "id": "fubon-costco",
      "name": "富邦 Costco 聯名卡",
      "issuer": "台北富邦",
      "best": "日本國外實體最高 5%",
      "summary": "2026/1/1–12/31 國外實體商店完成每月登錄後最高 5%：原 1% + 4% 加碼；每月每戶加碼合計上限 600 好多金。",
      "conditions": [
        "每月需登錄",
        "第三方支付不適用加碼",
        "好多金使用規則依 Costco / 富邦公告"
      ],
      "valid": "2026-12-31",
      "source": "https://www.fubon.com/banking/event/credit_card/costcoweb/travel/evt5-03.html",
      "score": 5,
      "calc": {
        "rates": {
          "physical": 5,
          "booking": 3,
          "drugstore": 5
        },
        "requires": {
          "physical": "fubonRegistered",
          "booking": "fubonRegistered",
          "drugstore": "fubonRegistered"
        },
        "compareNote": "需當月完成活動登錄；第三方支付不適用加碼。"
      }
    },
    {
      "id": "dbs-eco",
      "name": "星展 eco 永續卡",
      "issuer": "星展銀行",
      "best": "日本當地實體最高 5%",
      "summary": "2026 年日本當地實體商店消費最高 5%：1% 無上限 + 4% 加碼，每期帳單加碼上限 600 點。",
      "conditions": [
        "日本當地實體商店",
        "Apple Pay / Samsung Pay 亦屬官方列示適用情境",
        "加碼上限 600 點/期"
      ],
      "valid": "2026-12-31",
      "source": "https://www.dbs.com.tw/personal-zh/cards/dbs_eco/index.html",
      "score": 5,
      "calc": {
        "rates": {
          "physical": 5,
          "mobile": 5,
          "drugstore": 5
        },
        "compareNote": "日本當地實體最高5%；加碼每期有上限。"
      }
    },
    {
      "id": "dbs-eco-ez",
      "name": "星展 eco 永續極簡卡",
      "issuer": "星展銀行",
      "best": "日本指定地區最高 5%",
      "summary": "2026/7/1–12/31 日本等指定地區最高 5%：1% 無上限 + 4% 加碼，每期帳單加碼上限 600 點。",
      "conditions": [
        "日本為指定地區",
        "加碼上限 600 點/期"
      ],
      "valid": "2026-12-31",
      "source": "https://www.dbs.com.tw/personal-zh/cards/dbs-credit-cards/eco-ez",
      "score": 5,
      "calc": {
        "rates": {
          "physical": 5,
          "drugstore": 5
        },
        "compareNote": "日本指定地區最高5%；加碼每期有上限。"
      }
    },
    {
      "id": "esun-kumamon",
      "name": "玉山熊本熊卡",
      "issuer": "玉山銀行",
      "best": "日本一般 2.5%；指定商店最高 8.5%",
      "summary": "2026/7/1–12/31 日本一般消費 2.5% 無上限；指定日本商店加碼 6%，合計最高 8.5%，需登錄。PayPay 另有最高 5% 優惠方案。",
      "conditions": [
        "指定日本商店 6% 加碼需登錄",
        "指定商店加碼每期上限 500 元",
        "一般海外交易仍收 1.5% 國外交易服務費",
        "PayPay 方案不與日本一般 2.5% / 指定店 6% 疊加"
      ],
      "valid": "2026-12-31",
      "source": "https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/kumamon_card",
      "score": 5,
      "calc": {
        "rates": {
          "physical": 2.5,
          "drugstore": 2.5,
          "paypay": 5
        },
        "requires": {
          "paypay": "kumamonPaypay"
        },
        "compareNote": "日本一般2.5%；PayPay最高5%需依玉山Wallet方案。指定日本商店8.5%未自動套用，避免誤判店家。"
      }
    },
    {
      "id": "esun-ubear",
      "name": "玉山 U Bear 卡",
      "issuer": "玉山銀行",
      "best": "海外一般最高 1%；網路消費最高 3%",
      "summary": "2026/9/1–2027/2/28 國內外一般消費最高 1% 無上限；網路消費含基本回饋最高 3%，加碼 2% 每期上限 150 元。",
      "conditions": [
        "1% 基本回饋需帳單 e 化 + 玉山帳戶自扣；僅其一為 0.5%",
        "網路加碼 2% 需帳單 e 化",
        "日本現場實體刷卡不屬高回饋主力"
      ],
      "valid": "2027-02-28",
      "source": "https://event.esunbank.com.tw/credit/ubear/index.html",
      "score": 2,
      "calc": {
        "rates": {
          "physical": 1,
          "booking": 3
        },
        "requires": {
          "booking": "ubearOnlineFull"
        },
        "compareNote": "日本現場非主力；網路最高3%需符合帳單e化/自扣等條件。"
      }
    },
    {
      "id": "taishin-flygo",
      "name": "台新 FlyGo／Richart 卡",
      "issuer": "台新銀行",
      "best": "切換「玩旅刷」海外最高 3.3%",
      "summary": "FlyGo 已整併 Richart 權益；切換「玩旅刷」可涵蓋海外實體、海外線上、航空與訂房旅行，完成指定任務最高 3.3%。",
      "conditions": [
        "消費前確認 Richart Life 的方案切換",
        "需符合台新指定任務（如帳戶自扣）才能拿滿加碼",
        "每日可切換方案，以當日最終方案為準"
      ],
      "valid": "2027-03-31",
      "source": "https://www.taishinbank.com.tw/TSB/personal/credit/intro/overview/future/",
      "score": 4,
      "calc": {
        "rates": {
          "physical": 3.3,
          "mobile": 3.3,
          "booking": 3.3,
          "drugstore": 3.3
        },
        "requires": {
          "physical": "flygoEligible",
          "mobile": "flygoEligible",
          "booking": "flygoEligible",
          "drugstore": "flygoEligible"
        },
        "compareNote": "需先切換玩旅刷並完成指定任務，才以最高3.3%估算。"
      }
    },
    {
      "id": "kgi-eslite",
      "name": "凱基誠品聯名卡",
      "issuer": "凱基銀行",
      "best": "國內外一般最高 2.3%",
      "summary": "2026/7/1–12/31 國內外一般消費 0.3%；設定凱基銀行帳戶自動扣繳後加碼 2%，合計最高 2.3%，加碼每帳期上限 400 點。",
      "conditions": [
        "2% 加碼需凱基帳戶自動扣繳",
        "加碼每帳期上限 400 點",
        "超過上限後仍有 0.3% 基本回饋"
      ],
      "valid": "2026-12-31",
      "source": "https://www.kgibank.com.tw/webpages/eslite-credit-card/index.html?entry=OS9000969",
      "score": 2,
      "calc": {
        "rates": {
          "physical": 0.3,
          "mobile": 0.3,
          "booking": 0.3,
          "drugstore": 0.3
        },
        "compareNote": "一般0.3%；若設定凱基帳戶自扣，計算器會改以最高2.3%估算。"
      }
    }
  ],
  "networkPromos": [
    {
      "network": "Visa",
      "title": "Visa Select｜日本指定藥妝・電器滿 ¥20,000 回饋 ¥2,000",
      "valid": "2027-08-14",
      "detail": "台灣發行 Visa 卡須先註冊報名，結帳展示活動券碼並以報名卡實體刷卡；指定藥妝與愛電王等單筆未稅滿 ¥20,000 可回饋 ¥2,000。交易後須於期限內上傳刷卡憑證。",
      "source": "https://www.visa.com.tw/zh_tw/visa-offers-and-perks/visa-select%E5%84%AA%E9%81%B8%E5%9B%9E%E9%A5%8B/180212"
    },
    {
      "network": "Mastercard",
      "title": "Mastercard Travel Rewards｜全球指定商戶最高 25% 現金回饋",
      "valid": "依活動頁",
      "detail": "需先在 Mastercard Travel Rewards 註冊符合資格卡片；商店、門檻與回饋率會滾動更新。出發前再檢查 11 月日本名單。",
      "source": "https://www.mastercard.com/tw/zh/personal/experience-mastercard/offers-and-promotions.html"
    },
    {
      "network": "JCB",
      "title": "JCB｜日本藥妝最高 7% OFF",
      "valid": "2027-03-31",
      "detail": "松本清、Cocokara Fine：出示專屬優惠券並使用 JCB；未稅滿 ¥10,000 / ¥30,000 / ¥50,000，分別享 3% / 5% / 7% OFF。",
      "source": "https://www.specialoffers.jcb/zh-tw/campaign/detail/drugstore/41054/"
    }
  ],
  "guides": [
    {
      "id": "general-parking",
      "day": "通用",
      "minutes": 3,
      "title": "日本自駕停車要點",
      "intro": "停車前請核對營業時間、最大收費、場站高度限制以及進出場動線。",
      "points": [
        "檢查現地標示及每小時費率",
        "事先確認附近第二停車場",
        "不要以導航推算代替實際路況"
      ],
      "question": "如果主要停車場已滿，替代方案在哪裡？"
    },
    {
      "id": "general-route",
      "day": "通用",
      "minutes": 4,
      "title": "Map Code 與 Google Maps",
      "intro": "導航前先確認 Map Code 的來源、目的地名稱及停車場實際入口。",
      "points": [
        "Map Code 可能和景點入口位置不同",
        "山路遇到封閉請以現場交通資訊為準",
        "下載離線地圖供網路不佳時使用"
      ],
      "question": "這個導航終點是停車場入口嗎？"
    },
    {
      "id": "general-onsen",
      "day": "通用",
      "minutes": 3,
      "title": "溫泉與住宿注意事項",
      "intro": "飯店大浴場的使用時間、刺青政策、住宿停車規則，出發前應向官方核實。",
      "points": [
        "確認入住及退房時間",
        "檢查停車收費及限高",
        "確認大浴場最後入場時間"
      ],
      "question": "抵達時間是否落在浴場開放時段內？"
    }
  ],
  "compareUpdated": "2026-09-04"
};
