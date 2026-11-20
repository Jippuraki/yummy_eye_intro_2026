// YUMMY EYE 모델 마스터 데이터 — 이름·설명·맛·키워드·순서는 팜플렛(피그마 '팜플렛 시안')·스프레드시트 기준 (2026-11-20)
// ko: 팜플렛 한글 이름 / desc: 맛 설명 / level: 맛 강도 1~3(팜플렛 ●●○) / tastes: [주맛, 부맛]
// atc(실물 시착 표시)는 실물 모델 확정 전까지 빼둠
// 맛 6종: sweet 단맛 / bitter 쓴맛 / salty 짠맛 / sour 신맛 / spicy 매운맛 / umami 감칠맛

var TASTES = {
  sweet:  { ko: "단맛",   mood: "부드럽고 친근한" },
  bitter: { ko: "쓴맛",   mood: "시크하고 절제된" },
  salty:  { ko: "짠맛",   mood: "단정하고 클래식한" },
  sour:   { ko: "신맛",   mood: "산뜻하고 경쾌한" },
  spicy:  { ko: "매운맛", mood: "강렬하게 튀는" },
  umami:  { ko: "감칠맛", mood: "깊고 은근히 돋보이는" }
};

// 라인 공통 정보: 셰잎 계열 / 유형 / 어울리는 얼굴형(노션 3장 표 기준)
var LINES = {
  Dango:      { ko: "당고",     category: "Deli",     shape: "oval",   shapeKo: "가로 오벌",            type: "도수테",   faces: ["square", "heart"] },
  Omurice:    { ko: "오무라이스", category: "Deli",   shape: "round",  shapeKo: "보스턴·판토",          type: "선글라스", faces: ["square", "long"] },
  Cutlet:     { ko: "커틀렛",   category: "Deli",     shape: "square", shapeKo: "낮고 넓은 앵귤러 사각", type: "선글라스", faces: ["round"] },
  Sushi:      { ko: "스시",     category: "Deli",     shape: "square", shapeKo: "슬림 메탈 사각",        type: "도수테",   faces: ["round", "oval"] },
  Tteokbokki: { ko: "떡볶이",   category: "Deli",     shape: "square", shapeKo: "낮고 긴 둥근 사각",     type: "도수테",   faces: ["round"] },
  Juice:      { ko: "주스",     category: "Beverage", shape: "square", shapeKo: "소프트 스퀘어 무테",    type: "틴트",     faces: ["heart", "diamond"] },
  Milk:       { ko: "밀크",     category: "Beverage", shape: "catEye", shapeKo: "스퀘어 캣아이",         type: "선글라스", faces: ["round", "long", "triangle", "diamond"] },
  Wine:       { ko: "와인",     category: "Beverage", shape: "catEye", shapeKo: "버터플라이 캣아이",     type: "선글라스", faces: ["long", "triangle", "oval"] },
  Coffee:     { ko: "커피",     category: "Beverage", shape: "round",  shapeKo: "플랫바 원형(보스턴)",   type: "선글라스", faces: ["square", "oval"] },
  Vegie:      { ko: "베지",     category: "Fresh",    shape: "oval",   shapeKo: "오벌·판토",            type: "선글라스", faces: ["square"] },
  Fruit:      { ko: "프루트",   category: "Fresh",    shape: "catEye", shapeKo: "작은 소프트 캣아이",    type: "도수테",   faces: ["triangle", "diamond"] },
  Meat:       { ko: "미트",     category: "Fresh",    shape: "square", shapeKo: "라운디드 스퀘어",       type: "선글라스", faces: ["round", "oval"] },
  Sashimi:    { ko: "사시미",   category: "Fresh",    shape: "round",  shapeKo: "보스턴·라운디드 스퀘어", type: "도수테",  faces: ["square", "long", "oval"] }
};

var MODELS = [
  // ── Dango
  { id: "dango-burned",      line: "Dango", name: "Burned",        ko: "노릇노릇 당고", desc: "노릇하게 구운 겉면처럼 고소하고 깊은 인상, 끝에 은근한 달큰함이 남아요.", level: 2, frame: "다크 고동→카라멜 그라데이션", lens: "투명", tastes: ["umami", "sweet"], keywords: ["노릇노릇", "고소한", "구운 그라데이션"] },
  { id: "dango-chewing",     line: "Dango", name: "Chewing",       ko: "쫀득쫀득 당고", desc: "말랑하고 담백한 첫인상. 부드럽지만 짭조름한 단정함도 있어요.", level: 1, frame: "반투명 화이트→토스트 브라운", lens: "투명", tastes: ["sweet", "salty"], keywords: ["쫀득", "담백한", "말랑"] },
  { id: "dango-buldak",      line: "Dango", name: "Buldak",        ko: "핫뜨핫뜨 불닭", desc: "한 입에 확 오는 화끈함. 선명한 레드로 존재감을 터뜨려요.", level: 3, frame: "레드 외부·베이지 이너", lens: "투명", tastes: ["spicy", "umami"], keywords: ["화끈한", "선명한 레드", "이중 배색"] },
  { id: "dango-mintchoco",   line: "Dango", name: "Mint Choco",    ko: "리얼 민초단", desc: "호불호마저 매력이 되는 반전의 맛. 상쾌하게 달다가 쌉싸름하게 끝나요.", level: 2, frame: "앰버 호피·민트 이너", lens: "투명", tastes: ["sweet", "bitter"], keywords: ["호불호", "반전 매력", "상쾌한"] },
  // ── Omurice
  { id: "omurice-omelet",    line: "Omurice", name: "Omelet",        ko: "오믈렛의 정석", desc: "폭신하고 포근한 기본기에 옐로우 틴트로 살짝 매콤한 포인트를 더했어요.", level: 2, frame: "레드", hex: "#861111", lens: "옐로우", lensHex: "#F4D88D", tastes: ["sweet", "spicy"], keywords: ["포근한", "옐로우 틴트", "정석"] },
  { id: "omurice-ketchup",   line: "Omurice", name: "Ketchup Holic", ko: "케첩 홀릭", desc: "케첩을 너무나 사랑하는 새콤달콤 경양식. 밝고 장난스러운 인상이에요.", level: 2, frame: "딥 버건디", hex: "#650C0C", lens: "다크 버건디", lensHex: "#5A1418", tastes: ["sour", "sweet"], keywords: ["새콤달콤", "경양식", "레드 렌즈"] },
  { id: "omurice-demiglace", line: "Omurice", name: "Demi-Glace",    ko: "데미그라스", desc: "오래 졸인 소스처럼 진하고 깊은 풍미. 레스토랑의 클래식한 무드예요.", level: 2, frame: "다크 브라운", hex: "#3C1A0D", lens: "브라운", lensHex: "#62321B", tastes: ["umami", "salty"], keywords: ["진한", "깊은 풍미", "레스토랑"] },
  // ── Cutlet
  { id: "cutlet-burnt",      line: "Cutlet", name: "Burnt",   ko: "아뿔싸 탄먹", desc: "한눈판 사이 타버린 끝맛. 블랙으로 시크하게 마무리해요.", level: 2, frame: "블랙·다크 브라운 팁", lens: "브라운 틴트", tastes: ["bitter", "salty"], keywords: ["탄 끝맛", "시크한", "블랙"] },
  { id: "cutlet-jjikmuk",    line: "Cutlet", name: "Jjikmuk", ko: "찍먹", desc: "바삭함은 지키고 소스는 내 방식대로. 깔끔하고 단단한 인상이에요.", level: 2, frame: "투명 허니 앰버", lens: "브라운 틴트", tastes: ["salty", "umami"], keywords: ["바삭한", "내 방식대로", "허니 앰버"] },
  { id: "cutlet-bumuk",      line: "Cutlet", name: "Bumuk",   ko: "부먹", desc: "소스를 듬뿍 부어 촉촉하게. 따뜻하고 넉넉한 풍미의 호피예요.", level: 2, frame: "다크 브라운·앰버 호피", lens: "브라운 틴트", tastes: ["umami", "sweet"], keywords: ["촉촉한", "소스 듬뿍", "호피"] },
  // ── Sushi
  { id: "sushi-tuna",        line: "Sushi", name: "Tuna",     ko: "윤기 좔좔 참치", desc: "담백하지만 고급진 윤기. 로즈골드 메탈로 가볍고 정갈하게.", level: 1, frame: "로즈골드 메탈", lens: "투명", tastes: ["umami", "salty"], keywords: ["담백한", "로즈골드", "가벼운"] },
  { id: "sushi-flounder",    line: "Sushi", name: "Flounder", ko: "과광광광어", desc: "깔끔하고 맑은 흰살의 맛. 실버 미니멀로 군더더기 없이.", level: 1, frame: "실버 메탈", lens: "투명", tastes: ["salty", "umami"], keywords: ["깔끔한", "실버", "미니멀"] },
  { id: "sushi-egg",         line: "Sushi", name: "Egg",      ko: "몽글몽글 계란", desc: "몽글몽글 계란말이처럼 달큰하고 친근한 골드. 단정한 인상이에요.", level: 2, frame: "골드 메탈", lens: "투명", tastes: ["sweet", "salty"], keywords: ["달큰한", "골드", "단정한"] },
  { id: "sushi-salmon",      line: "Sushi", name: "Salmon",   ko: "오예 오늘은 연어", desc: "부드럽고 고소한 코랄빛. 직선 테에 기름진 윤기를 더했어요.", level: 2, frame: "코랄골드 메탈", lens: "투명", tastes: ["umami", "sweet"], keywords: ["고소한", "코랄빛", "부드러운 직선"] },
  // ── Tteokbokki
  { id: "tteok-gochujang",   line: "Tteokbokki", name: "Gochujang", ko: "근본 고추장", desc: "매콤달콤한 국민 간식의 근본. 버건디로 대담하게.", level: 3, frame: "버건디", lens: "투명", tastes: ["spicy", "sweet"], keywords: ["매콤달콤", "버건디", "국민 간식"] },
  { id: "tteok-jjajang",     line: "Tteokbokki", name: "Jjajang",   ko: "짜장의 변신", desc: "진득하고 묵직한 짜장의 깊이. 다크 호피로 무게감을 더했어요.", level: 3, frame: "다크 브라운·블랙 호피", lens: "투명", tastes: ["umami", "salty"], keywords: ["진득한", "다크 호피", "묵직한"] },
  { id: "tteok-cream",       line: "Tteokbokki", name: "Cream",     ko: "크리미크림", desc: "순하고 크리미한 한 그릇. 아이보리로 부드럽게 감싸요.", level: 2, frame: "아이보리", lens: "투명", tastes: ["sweet", "umami"], keywords: ["크리미", "아이보리", "순한 맛"] },
  // ── Vegie
  { id: "vegie-tomato",      line: "Vegie", name: "Tomato",   ko: "토마토마토", desc: "새콤하게 터지는 감칠맛. 가로로 넓은 오벌이 생기를 더해요.", level: 3, frame: "레드 버건디", lens: "브라운 틴트", tastes: ["sour", "umami"], keywords: ["새콤한", "감칠맛 폭발", "가로 오벌"], shape: "oval", shapeKo: "가로 오벌" },
  { id: "vegie-lettuce",     line: "Vegie", name: "Lettuce",  ko: "양상춧추", desc: "싱그럽지만 차분한 포레스트 그린. 아삭하고 담백한 인상이에요.", level: 2, frame: "짙은 포레스트 그린", lens: "스모키 다크 그린", tastes: ["bitter", "salty"], keywords: ["싱그러운", "차분한", "포레스트 그린"], shape: "round", shapeKo: "라운드 판토" },
  { id: "vegie-pumpkin",     line: "Vegie", name: "Pumpkin",  ko: "호박박!", desc: "달큰하게 익은 호박빛 앰버. 투명해서 가볍게 즐겨요.", level: 1, frame: "투명 샴페인 베이지", lens: "스모키 모브 브라운", tastes: ["sweet", "umami"], keywords: ["달큰한", "누드 앰버", "투명"], shape: "oval", shapeKo: "슬림 소프트 오벌" },
  { id: "vegie-eggplant",    line: "Vegie", name: "Eggplant", ko: "가지가지해", desc: "보랏빛 포인트로 은근히 깊은 맛. 와인 렌즈로 무드를 더해요.", level: 2, frame: "퍼플", hex: "#4E1164", lens: "와인레드", lensHex: "#641122", tastes: ["umami", "bitter"], keywords: ["보랏빛", "포인트", "와인 렌즈"], shape: "round", shapeKo: "라운드 판토" },
  // ── Fruit
  { id: "fruit-apple",       line: "Fruit", name: "Apple", ko: "사과", desc: "아삭하고 달콤새콤한 첫 입. 레드에 화이트 팁으로 산뜻하게.", level: 2, frame: "레드·화이트 팁", lens: "투명", tastes: ["sweet", "sour"], keywords: ["아삭한", "레드", "화이트 팁"] },
  { id: "fruit-kiwi",        line: "Fruit", name: "Kiwi",  ko: "킈위새", desc: "겉과 속이 다른 반전 속살. 이중 배색 그린으로 상큼하게.", level: 2, frame: "브라운 외부·그린 이너", lens: "투명", tastes: ["sour", "sweet"], keywords: ["반전 속살", "이중 배색", "그린"] },
  { id: "fruit-melon",       line: "Fruit", name: "Melon", ko: "메멜론", desc: "은은하게 달고 맑은 세이지. 투명하고 부드러운 인상이에요.", level: 1, frame: "투명 세이지 그린", lens: "투명", tastes: ["sweet", "salty"], keywords: ["은은한", "세이지", "투명"] },
  { id: "fruit-plum",        line: "Fruit", name: "Plum",  ko: "매혹의 자두", desc: "새콤떨떠름한 쿨톤의 매력. 바이올렛으로 오래 남아요.", level: 2, frame: "쿨 바이올렛", lens: "투명", tastes: ["sour", "bitter"], keywords: ["새콤떨떠름", "쿨톤", "바이올렛"] },
  // ── Meat
  { id: "meat-rare",         line: "Meat", name: "Beef Rare",        ko: "레어", desc: "대담하게 붉은 단면. 체리 레드로 선명한 존재감을 줘요.", level: 3, frame: "딥 체리 레드", lens: "웜 브라운", tastes: ["umami", "spicy"], keywords: ["대담한", "체리 레드", "선명한"] },
  { id: "meat-mediumrare",   line: "Meat", name: "Beef Medium Rare", ko: "미디엄레어", desc: "딱 좋은 익힘의 균형. 체스트넛 브라운으로 근사하게.", level: 2, frame: "체스트넛 브라운", lens: "웜 브라운", tastes: ["umami", "salty"], keywords: ["딱 좋은 익힘", "체스트넛", "균형"] },
  { id: "meat-welldone",     line: "Meat", name: "Beef Well Done",   ko: "웰던!", desc: "불맛까지 바싹 익힌 묵직함. 다크 호피로 단단하게.", level: 3, frame: "다크 브라운·블랙 호피", lens: "웜 브라운", tastes: ["bitter", "umami"], keywords: ["불맛", "다크 호피", "묵직한"] },
  // ── Sashimi
  { id: "sashimi-mackerel",  line: "Sashimi", name: "Mackerel",        ko: "고등어", desc: "바다 내음 가득한 등푸른 결. 블루블랙의 불규칙한 무늬예요.", level: 2, frame: "블루블랙·그레이", lens: "투명", tastes: ["salty", "umami"], keywords: ["바다 내음", "블루블랙", "불규칙한 결"] },
  { id: "sashimi-salmon",    line: "Sashimi", name: "Salmon",          ko: "연어홀릭", desc: "부드럽게 녹는 피치 코랄. 반투명으로 화사하게.", level: 1, frame: "투명 피치 코랄", lens: "투명", tastes: ["sweet", "umami"], keywords: ["부드러운", "피치 코랄", "반투명"], faces: ["heart"] },
  { id: "sashimi-tuna",      line: "Sashimi", name: "Tuna",            ko: "참참치", desc: "마블링 가득 풍부한 레드. 진하고 깊은 존재감이에요.", level: 3, frame: "레드·아이보리 마블", lens: "투명", tastes: ["umami", "sweet"], keywords: ["마블링", "레드", "풍부한"] },
  { id: "sashimi-flounder",  line: "Sashimi", name: "Flounder",        ko: "광어", desc: "담백하고 맑은 흰살. 투명하게 깨끗한 인상이에요.", level: 1, frame: "투명 밀키 화이트", lens: "투명", tastes: ["salty", "sweet"], keywords: ["담백한", "흰살", "맑은"], faces: ["heart"] },
  { id: "sashimi-baked",     line: "Sashimi", name: "Baked Mackerel",  ko: "구운 고등어", desc: "고소하게 구운 토스티드 브라운. 무광으로 차분하게.", level: 2, frame: "토스티드 브라운", lens: "투명", tastes: ["salty", "bitter"], keywords: ["고소하게 구운", "토스티드 브라운", "무광"] },
  { id: "sashimi-shrimp",    line: "Sashimi", name: "Shrimp",          ko: "새우", desc: "탱글탱글 코랄 그라데이션. 겹겹이 경쾌한 인상이에요.", level: 2, frame: "투명 화이트→코랄", lens: "투명", tastes: ["sweet", "salty"], keywords: ["탱글한", "코랄 그라데이션", "레이어"] },
  // ── Juice
  { id: "juice-ice",         line: "Juice", name: "ICE dongdong", ko: "얼음 동동", desc: "얼음 동동 띄운 청량함. 무테 아이스블루로 시원하고 가볍게.", level: 1, frame: "실버 메탈 무테", lens: "아이스블루", tastes: ["sour", "salty"], keywords: ["청량한", "무테", "아이스블루"] },
  { id: "juice-orange",      line: "Juice", name: "Wow Orange",       ko: "와우오렌지", desc: "상큼한 비타민 한 잔. 오렌지 틴트로 기분까지 밝게.", level: 2, frame: "로즈골드 메탈 무테", lens: "오렌지 틴트", tastes: ["sour", "sweet"], keywords: ["상큼한", "비타민", "오렌지 틴트"] },
  { id: "juice-grape",       line: "Juice", name: "Grape",        ko: "포도톡", desc: "톡 터지는 달콤한 포도. 퍼플 틴트로 가볍고 몽환적으로.", level: 2, frame: "실버 메탈 무테", lens: "퍼플 틴트", tastes: ["sweet", "sour"], keywords: ["달콤한", "퍼플 틴트", "가벼운"] },
  // ── Milk
  { id: "milk-cereals",      line: "Milk", name: "Milk & Cereals", ko: "시리얼", desc: "알록달록 장난기 가득한 아침. 스펙클로 경쾌하게.", level: 2, frame: "투명 쿨그레이·컬러 스펙클", lens: "라벤더→블루", tastes: ["sweet", "sour"], keywords: ["알록달록", "장난기", "스펙클"] },
  { id: "milk-choco",        line: "Milk", name: "Choco Loco",         ko: "초코로코", desc: "진한 다크초코의 쌉싸름함. 블랙 렌즈로 시크하게.", level: 3, frame: "초콜릿 브라운", lens: "블랙", tastes: ["bitter", "sweet"], keywords: ["다크초코", "진한", "블랙 렌즈"] },
  { id: "milk-white",        line: "Milk", name: "White Milk",    ko: "화이트 밀크", desc: "순수하고 담백한 흰 우유. 깨끗한 화이트 그대로예요.", level: 1, frame: "무광 화이트", lens: "스모키 블루그레이", tastes: ["sweet", "salty"], keywords: ["순수한", "담백한", "화이트"] },
  // ── Wine
  { id: "wine-white",        line: "Wine", name: "White Wine", ko: "화이트와인", desc: "드라이하고 우아한 한 모금. 크림 화이트로 산뜻하게.", level: 2, frame: "크림 화이트", lens: "스모키 모브", tastes: ["sour", "sweet"], keywords: ["드라이", "우아한", "크림 화이트"] },
  { id: "wine-rose",         line: "Wine", name: "Rose Wine",  ko: "로제와인", desc: "로맨틱하게 오르는 가벼운 취기. 투명 코랄로 화사하게.", level: 2, frame: "투명 코랄", lens: "스모키 모브", tastes: ["sweet", "sour"], keywords: ["로맨틱", "투명 코랄", "가벼운 취기"] },
  { id: "wine-red",          line: "Wine", name: "Red Wine",   ko: "레드 와인", desc: "깊고 드라마틱한 여운. 보라 호피로 성숙하게.", level: 3, frame: "딥 퍼플·버건디 호피", lens: "스모키 모브", tastes: ["bitter", "sour"], keywords: ["드라마틱", "깊은", "보라 호피"] },
  // ── Coffee
  { id: "coffee-espresso",   line: "Coffee", name: "Espresso",      ko: "에스프레소", desc: "진한 한 샷의 집중력. 블랙으로 시크하게.", level: 3, frame: "유광 블랙", lens: "다크 그레이", tastes: ["bitter", "sour"], keywords: ["진한 한 샷", "블랙", "시크한"] },
  { id: "coffee-iceamericano", line: "Coffee", name: "Ice Americano", ko: "아아", desc: "매일 마시는 깔끔함. 호피로 일상에 딱 맞게.", level: 2, frame: "다크 브라운·앰버 호피", lens: "다크 그레이", tastes: ["bitter", "salty"], keywords: ["매일의", "깔끔한", "호피"] },
  { id: "coffee-latte",      line: "Coffee", name: "Latte",         ko: "라테", desc: "부드러운 밀크티 빛. 반투명으로 포근하게.", level: 1, frame: "반투명 밀크티 브라운", lens: "브라운", tastes: ["sweet", "bitter"], keywords: ["부드러운", "밀크티", "반투명"], faces: ["heart"] }
];

// 실물 시착 표시(atc) — 실물 모델 확정 후 true로
var SHOW_ATC = false;

// 카테고리 순서 (주문 번호용): Deli 01 · Fresh 02 · Beverage 03
var CATEGORY_ORDER = ["Deli", "Fresh", "Beverage"];

// 모델 코드: { no: "01-01-03", code: "DELI-DANGO-03" } — 카테고리·라인·라인 안 순서(LINES·MODELS 순서 기준)
// 팜플렛·스프레드시트 품번 형식: DELI-DANGO-01 / FRESH-VEGI-01 / BEV-JUICE-01
function modelCode(m) {
  var line = LINES[m.line], cat = line.category;
  var ci = CATEGORY_ORDER.indexOf(cat) + 1, li = 0, mi = 0, k, i;
  for (k in LINES) { if (LINES[k].category === cat) { li++; if (k === m.line) break; } }
  for (i = 0; i < MODELS.length; i++) { if (MODELS[i].line === m.line) { mi++; if (MODELS[i] === m) break; } }
  function p(n) { return (n < 10 ? "0" : "") + n; }
  var catCode = cat === "Beverage" ? "BEV" : cat.toUpperCase(), lineCode = m.line === "Vegie" ? "VEGI" : m.line.toUpperCase();
  return { no: p(ci) + "-" + p(li) + "-" + p(mi), code: catCode + "-" + lineCode + "-" + p(mi) };
}

// 모델 사진: assets/models/<모델 id>.png (배경 투명 권장). 파일이 없으면 자리만 비워둔다.
function modelPhoto(m) { return "assets/models/" + m.id + ".png"; }
// 정면 사진: assets/models/front/<모델 id>.png (영수증 Today's Menu)
function modelFront(m) { return "assets/models/front/" + m.id + ".png"; }
