window.REFERENCE_DATA = {
  "updated": "2026-11-05",
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
      "id": "tokyo-national-museum",
      "day": "文化歷史",
      "minutes": 6,
      "title": "CHAPTER 01｜東京國立博物館",
      "intro": "30 秒掌握 東京國立博物館不只是「日本古物很多的博物館」 ，它本身就是明治國家建立博物館制度、文化財分類與保存觀念的重要現場。 其源頭可追溯至 1872 年湯島聖堂博覽會，通常被視為日本最早的博物館起點；今天館藏橫跨日本與亞洲藝術、考古與文化財。 你只排約 2–2.5 小時，不應追求「看完」，而應以本館日本美術史主線為核心，再依興趣補東洋館或法隆寺寶物館。",
      "points": [
        "1. 為什麼 1872 年很重要？",
        "2. 本館怎麼看才不會疲乏？",
        "3. 你這趟旅行可以怎麼利用東京國博？"
      ],
      "question": "到現場時可以觀察哪些建築、文化與歷史細節？",
      "href": "trip-guide.html#tokyo-national-museum"
    },
    {
      "id": "fuji-yoshida",
      "day": "文化歷史",
      "minutes": 6,
      "title": "CHAPTER 02｜富士吉田：從忠靈塔到富士信仰",
      "intro": "30 秒掌握 新倉山忠靈塔、富士吉田本町通、北口本宮富士淺間神社其實可以讀成同一章： 現代「日本代表景觀」如何疊在富士信仰、戰爭記憶與地方城市上。 忠靈塔不是古代五重塔，而是 1958 年建立的戰歿者慰靈塔；今天著名的富士山構圖，是戰後地方記憶與全球觀光影像重疊的結果。 北口本宮的核心則更早，連結富士山鎮火信仰、吉田口登拝、富士講與御師町。",
      "points": [
        "新倉山淺間公園／忠靈塔：先分清「塔」與「神社」",
        "富士吉田本町通：現代生活街道如何被富士山重新定義",
        "北口本宮富士淺間神社：富士山不只是風景",
        "富士講與御師：旅行其實早已制度化"
      ],
      "question": "到現場時可以觀察哪些建築、文化與歷史細節？",
      "href": "trip-guide.html#fuji-yoshida"
    },
    {
      "id": "fuji-landscape",
      "day": "文化歷史",
      "minutes": 6,
      "title": "CHAPTER 03｜富士五湖：火山地景如何變成觀光風景",
      "intro": "30 秒掌握 精進湖、本栖湖、河口湖不是三個獨立「拍富士山」景點，而是 火山地形＋道路交通＋近代觀光 共同形成的文化景觀。 精進湖的重要性尤其在於小尺度湖畔聚落、古道交通與明治以後早期國際富士觀光。 河口湖北岸與大石公園代表當代成熟觀光；本栖湖「千圓鈔富士」則顯示國家圖像、攝影與風景認同如何結合。",
      "points": [
        "精進湖：先看湖，再看富士",
        "本栖湖與千圓鈔富士：風景如何變成國家圖像",
        "河口湖北岸／大石公園／紅葉迴廊：成熟觀光景觀"
      ],
      "question": "到現場時可以觀察哪些建築、文化與歷史細節？",
      "href": "trip-guide.html#fuji-landscape"
    },
    {
      "id": "nenba-guide",
      "day": "文化歷史",
      "minutes": 6,
      "title": "CHAPTER 04｜西湖療癒之里根場：消失聚落如何被重新記住",
      "intro": "30 秒掌握 西湖療癒之里根場不是完整保留的江戶古村，而是以 1966 年災害前的 茅葺聚落記憶 為基礎重建／再生的文化景觀。 它最值得看的不是「古裝感」，而是災害、聚落消失、地方記憶與觀光再生如何結合。 茅葺屋頂本身是一套材料、勞動、維修與社群合作制度，不只是造型。",
      "points": [
        "1. 根場為什麼會變成今天這個樣子？",
        "2. 茅葺屋頂是生活技術",
        "3. 重建村落有沒有「歷史價值」？"
      ],
      "question": "到現場時可以觀察哪些建築、文化與歷史細節？",
      "href": "trip-guide.html#nenba-guide"
    },
    {
      "id": "kunozan-guide",
      "day": "文化歷史",
      "minutes": 6,
      "title": "CHAPTER 05｜久能山東照宮：家康之死如何被變成政權記憶",
      "intro": "30 秒掌握 久能山東照宮是家康死後最直接的安葬與最初祭祀核心，也是全國東照宮體系的起點。 1616 年家康卒於駿府，依遺命葬久能山；秀忠命中井正清主持造營，社殿約一年七個月完成。 本殿—石之間—拜殿構成早期權現造代表，2010 年指定為國寶。",
      "points": [
        "1. 家康為什麼葬在久能山？",
        "2. 將軍如何變成神？",
        "3. 建築為什麼這麼華麗？",
        "4. 山本身也要看"
      ],
      "question": "到現場時可以觀察哪些建築、文化與歷史細節？",
      "href": "trip-guide.html#kunozan-guide"
    },
    {
      "id": "shizuoka-guide",
      "day": "文化歷史",
      "minutes": 6,
      "title": "CHAPTER 06｜靜岡・靜岡淺間神社：從今川駿府到大御所城市",
      "intro": "30 秒掌握 靜岡淺間神社不是單一神社，而是神部、淺間、大歲御祖三社為中心的複合神域。 駿府城市史要先有今川，再有家康；家康幼年、五國統治與大御所晚年都和駿府深度相連。 同樣叫「淺間」，靜岡淺間與北口本宮功能不同：前者嵌入國府／城市秩序，後者深度連接富士登拝。",
      "points": [
        "1. 三社為什麼被一起叫「靜岡淺間神社」？",
        "2. 駿府不是家康晚年才突然重要",
        "3. 為什麼社殿規模巨大？",
        "4. 靜岡與茶、清水港"
      ],
      "question": "到現場時可以觀察哪些建築、文化與歷史細節？",
      "href": "trip-guide.html#shizuoka-guide"
    },
    {
      "id": "kakegawa-guide",
      "day": "文化歷史",
      "minutes": 6,
      "title": "CHAPTER 07｜掛川・掛川城：東海道、今川、家康與深蒸茶",
      "intro": "30 秒掌握 掛川的核心不是單一名人，而是位置：駿河—遠江之間的東海道要衝。 掛川同時是城下町與宿場町，戰國軍事、江戶交通、近代茶業在此交會。 掛川城最重要的現場判讀： 二之丸御殿是 1855–1861 年重建並保存至今的江戶末期實物；天守是 1994 年木造復元。",
      "points": [
        "1. 東海道如何塑造掛川？",
        "2. 今川氏真的退守與家康包圍",
        "3. 山內一豐與近世城郭化",
        "4. 二之丸御殿比天守更該慢看",
        "5. 掛川茶與茶草場"
      ],
      "question": "到現場時可以觀察哪些建築、文化與歷史細節？",
      "href": "trip-guide.html#kakegawa-guide"
    },
    {
      "id": "ryugashido-guide",
      "day": "文化歷史",
      "minutes": 6,
      "title": "CHAPTER 08｜龍岩洞：把時間尺度拉回 2.5 億年的遠州",
      "intro": "30 秒掌握 龍岩洞是約 2.5 億年前石灰岩地層中形成的洞窟系統；今天的鐘乳石景觀是地下水長時間溶蝕與沉積的結果。 它雖不是「歷史建築」，但很值得做自然史導讀：你會在同一天從人類航空／製造史，切換到以萬年計的地質時間。 洞內的形成速度非常慢，任何鐘乳石都不是幾十年就能「長出來」的觀光布景。",
      "points": [
        "1. 石灰岩洞窟怎麼形成？",
        "2. 為什麼龍岩洞值得放在濱松行程？",
        "3. 洞穴展示怎麼看？"
      ],
      "question": "到現場時可以觀察哪些建築、文化與歷史細節？",
      "href": "trip-guide.html#ryugashido-guide"
    },
    {
      "id": "airpark-guide",
      "day": "文化歷史",
      "minutes": 6,
      "title": "CHAPTER 09｜Air Park：從飛機迷視角走向「空防系統」",
      "intro": "30 秒掌握 Air Park 不只是「戰鬥機展示館」，而是理解日本航空自衛隊任務、裝備、訓練與濱松航空城市身分的入口。 展示資料館談部隊、任務、裝備與救難；展示格納庫則可近距離看歷代航空機，包括 Blue Impulse 相關展示。 真正有價值的是把飛機看成一套制度：人員訓練、基地、維修、救難、雷達、防空、運輸共同構成空防。",
      "points": [
        "1. 為什麼濱松和航空史特別有關？",
        "2. 不要只盯著戰鬥機",
        "3. 展示格納庫怎麼看比較有意思？",
        "4. 看得到現役訓練，是這裡最特殊的地方"
      ],
      "question": "到現場時可以觀察哪些建築、文化與歷史細節？",
      "href": "trip-guide.html#airpark-guide"
    },
    {
      "id": "suzuki-guide",
      "day": "文化歷史",
      "minutes": 6,
      "title": "CHAPTER 10｜Suzuki 歷史館：從遠州織機到全球小型車",
      "intro": "30 秒掌握 Suzuki 的歷史起點不是汽車，而是 1909 年創業、1920 年公司化的 織機製造 。這點能直接連到遠州紡織與機械工業傳統。 從機織設備、摩托車、輕型車到全球生產，館內真正主題是「如何把製造能力轉移到不同產品」。 參觀前應依官方規定完成預約，並確認當日開館及參觀時間。",
      "points": [
        "1. 為什麼汽車公司從織機開始？",
        "2. 戰後機動化與小型車",
        "3. 展示車不要只問「帥不帥」",
        "4. 全球化怎麼看？",
        "5. 與濱松／遠州放在一起"
      ],
      "question": "到現場時可以觀察哪些建築、文化與歷史細節？",
      "href": "trip-guide.html#suzuki-guide"
    },
    {
      "id": "hamamatsu-castle-guide",
      "day": "文化歷史",
      "minutes": 6,
      "title": "CHAPTER 11｜濱松城：家康如何在壓力中活下來",
      "intro": "30 秒掌握 家康 1570 年移居濱松，直到 1586 年遷往駿府，這 17 年是他從區域大名走向全國政治人物的關鍵期。 三方原慘敗與長期武田壓力，使濱松城的意義更像「危機管理基地」，而不是天下人成功紀念館。 今天醒目的石垣與復興天守多與家康後世改造／現代復興有關，不等於家康時代原貌。",
      "points": [
        "1. 為什麼家康要把中心從岡崎推到濱松？",
        "2. 三方原之敗",
        "3. 今天的石垣不等於家康城",
        "4. 「出世城」真正代表什麼？"
      ],
      "question": "到現場時可以觀察哪些建築、文化與歷史細節？",
      "href": "trip-guide.html#hamamatsu-castle-guide"
    },
    {
      "id": "enoshima-guide",
      "day": "文化歷史",
      "minutes": 6,
      "title": "CHAPTER 12｜江之島・岩本樓：從神之島到近代旅館",
      "intro": "30 秒掌握 江之島的歷史不是「神社史」與「旅館史」兩條線，而是一條從 岩屋—弁財天—武家祈願—宿坊／別當寺—江戶參詣—明治神佛分離—近代旅館 延續下來的線。 青銅鳥居、弁財天仲見世、邊津宮／奉安殿與岩本樓都屬同一套參詣文化，只是時代功能不同。 岩本樓最有價值之處，不是「老旅館風格」，而是其前身岩本坊／岩本院兼具宗教管理與宿坊功能，明治後把住宿功能轉化成近代旅館。",
      "points": [
        "1. 青銅鳥居與仲見世：江島詣還活在街道裡",
        "2. 邊津宮與奉安殿：神佛習合不能用今天分類理解",
        "3. 岩本坊／岩本院到底是什麼？",
        "4. 明治神佛分離如何改變江之島？",
        "5. 弁天洞窟風呂與羅馬風呂：兩種時代同住一晚"
      ],
      "question": "到現場時可以觀察哪些建築、文化與歷史細節？",
      "href": "trip-guide.html#enoshima-guide"
    },
    {
      "id": "hasedera-guide",
      "day": "文化歷史",
      "minutes": 6,
      "title": "CHAPTER 13｜鎌倉長谷寺：觀音、山坡與海景如何成為一個宗教空間",
      "intro": "30 秒掌握 長谷寺的主角是十一面觀音信仰，但它同時也是山坡地形、鎌倉海景、寺院庭園與庶民祈願重疊的寺院。 寺傳將創建追溯至奈良時代；現地歷史跨越中世鎌倉與後世重建，不能把所有建築都視為創建當時原物。 你在這裡最值得看的，是「巨大觀音像如何成為信仰中心」以及寺院如何沿山勢分層布局。",
      "points": [
        "1. 十一面觀音為什麼是核心？",
        "2. 長谷寺的山坡地形",
        "3. 地藏與庶民祈願"
      ],
      "question": "到現場時可以觀察哪些建築、文化與歷史細節？",
      "href": "trip-guide.html#hasedera-guide"
    },
    {
      "id": "great-buddha-guide",
      "day": "文化歷史",
      "minutes": 6,
      "title": "CHAPTER 14｜鎌倉大佛・高德院：露天大佛其實不是原本的樣子",
      "intro": "30 秒掌握 鎌倉大佛是 13 世紀鎌倉佛教與大型造像技術的代表；現存銅造阿彌陀如來坐像本身是國寶。 原本大佛有佛殿覆蓋，後來堂宇因災害等原因不復存在，因此今天「露天大佛」並非最初設計狀態。 阿彌陀佛信仰和往生淨土、末法觀念及中世庶民／武家宗教世界密切相關。",
      "points": [
        "1. 為什麼鎌倉需要這麼巨大的阿彌陀佛？",
        "2. 露天不是原貌",
        "3. 為什麼大佛能留到今天？"
      ],
      "question": "到現場時可以觀察哪些建築、文化與歷史細節？",
      "href": "trip-guide.html#great-buddha-guide"
    },
    {
      "id": "kamakura-hachimangu-guide",
      "day": "文化歷史",
      "minutes": 6,
      "title": "CHAPTER 15｜鎌倉・鶴岡八幡宮：武家政權如何把宗教放進城市中心",
      "intro": "30 秒掌握 鎌倉不是「古寺很多的觀光城」，而是 12–14 世紀日本武家政權、軍事、外交與文化的重要中心。 鶴岡八幡宮是源氏氏神信仰、幕府政治儀式與城市軸線的核心；若宮大路把宗教中心直接嵌入城市設計。 1219 年源實朝在八幡宮境內遇刺，提醒我們：神社不是政治以外的和平空間，而是權力最密集的公共舞台。",
      "points": [
        "1. 源賴朝為什麼把八幡宮放在城市中心？",
        "2. 武家政權不只靠刀劍",
        "3. 1219：源實朝之死",
        "4. 北條執權與鎌倉的制度化"
      ],
      "question": "到現場時可以觀察哪些建築、文化與歷史細節？",
      "href": "trip-guide.html#kamakura-hachimangu-guide"
    },
    {
      "id": "kamakura-museum-zeniarai",
      "day": "文化歷史",
      "minutes": 6,
      "title": "CHAPTER 16｜鎌倉國寶館・錢洗弁財天：從國寶到庶民祈願",
      "intro": "30 秒掌握 鎌倉國寶館的價值是把寺社中的佛像、雕刻、繪畫與工藝集中到一個可比較的空間，讓你把「鎌倉文化」從建築拉回具體物件。 錢洗弁財天則完全是另一種尺度：狹窄谷戶、水源、洞窟感與現世利益信仰結合，呈現鎌倉庶民宗教的一面。 兩站一起看，能避免把鎌倉史只理解成將軍與大寺院。",
      "points": [
        "1. 鎌倉國寶館怎麼看？",
        "2. 錢洗弁財天：為什麼要在洞窟水源洗錢？",
        "3. 谷戶是鎌倉宗教地理的一部分"
      ],
      "question": "到現場時可以觀察哪些建築、文化與歷史細節？",
      "href": "trip-guide.html#kamakura-museum-zeniarai"
    },
    {
      "id": "naritasan-guide",
      "day": "文化歷史",
      "minutes": 6,
      "title": "CHAPTER 17｜成田山新勝寺：密教、歌舞伎與江戶庶民旅行",
      "intro": "30 秒掌握 成田山新勝寺的核心不是「機場附近大寺院」，而是 真言密教不動明王信仰＋江戶庶民參詣＋歌舞伎文化 。 寺傳將創建和 939–940 年平將門之亂相連；真正讓成田山成為江戶超級信仰中心的關鍵，則是近世出開帳與市川團十郎家族。 表參道、鰻魚、米菓與旅館不是寺院外的商業雜訊，而是「成田詣」大眾旅行文化的一部分。",
      "points": [
        "1. 不動明王為什麼是主角？",
        "2. 平將門傳承與創建敘事",
        "3. 市川團十郎如何讓成田山變成江戶流行文化？",
        "4. 表參道為什麼要一起看？",
        "5. 成田山公園與平和大塔"
      ],
      "question": "到現場時可以觀察哪些建築、文化與歷史細節？",
      "href": "trip-guide.html#naritasan-guide"
    },
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
