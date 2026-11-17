// YUMMY EYE 모델 마스터 데이터 — 노션 '모델 3차 시안 - 최종'(2026-11-04) 기준
// tastes: [주맛, 부맛]  ※ 맛·키워드는 Claude 초안 (검토 필요)
// 맛 6종: sweet 단맛 / bitter 쓴맛 / salty 짠맛 / sour 신맛 / spicy 매운맛 / umami 감칠맛
// atc: ATC 실물(A티어) 시착 가능 모델

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
  // ── Deli · Dango
  { id: "dango-burned",      line: "Dango", name: "Burned",        ko: "노릇하게 구운 당고", frame: "다크 고동→카라멜 그라데이션", lens: "투명", tastes: ["umami", "sweet"], keywords: ["노릇노릇", "고소한", "구운 그라데이션"] },
  { id: "dango-chewing",     line: "Dango", name: "Chewing",       ko: "쫀득한 화이트 당고", frame: "반투명 화이트→토스트 브라운", lens: "투명", tastes: ["sweet", "salty"], keywords: ["쫀득", "담백한", "말랑"], atc: true },
  { id: "dango-buldak",      line: "Dango", name: "Buldak",        ko: "불닭 소스", frame: "레드 외부·베이지 이너", lens: "투명", tastes: ["spicy", "umami"], keywords: ["화끈한", "선명한 레드", "이중 배색"] },
  { id: "dango-mintchoco",   line: "Dango", name: "Mint Choco",    ko: "민트초코", frame: "앰버 호피·민트 이너", lens: "투명", tastes: ["sweet", "bitter"], keywords: ["호불호", "반전 매력", "상쾌한"] },
  // ── Deli · Omurice
  { id: "omurice-ketchup",   line: "Omurice", name: "Ketchup Holic", ko: "케첩", frame: "딥 버건디", hex: "#650C0C", lens: "다크 버건디", lensHex: "#5A1418", tastes: ["sour", "sweet"], keywords: ["새콤달콤", "경양식", "버건디 렌즈"], atc: true },
  { id: "omurice-demiglace", line: "Omurice", name: "Demi-Glace",    ko: "데미글라스 소스", frame: "다크 브라운", hex: "#3C1A0D", lens: "브라운", lensHex: "#62321B", tastes: ["umami", "salty"], keywords: ["진한", "깊은 풍미", "레스토랑"] },
  { id: "omurice-omelet",    line: "Omurice", name: "Omelet",        ko: "오믈렛", frame: "레드", hex: "#861111", lens: "옐로우", lensHex: "#F4D88D", tastes: ["sweet", "spicy"], keywords: ["포근한", "옐로우 렌즈", "정석"], atc: true },
  // ── Deli · Cutlet
  { id: "cutlet-bumuk",      line: "Cutlet", name: "Bumuk",   ko: "부먹", frame: "다크 브라운·앰버 호피", lens: "브라운 틴트", tastes: ["umami", "sweet"], keywords: ["촉촉한", "소스 듬뿍", "호피"] },
  { id: "cutlet-jjikmuk",    line: "Cutlet", name: "Jjikmuk", ko: "찍먹", frame: "투명 허니 앰버", lens: "브라운 틴트", tastes: ["salty", "umami"], keywords: ["바삭한", "내 방식대로", "허니 앰버"] },
  { id: "cutlet-burnt",      line: "Cutlet", name: "Burnt",   ko: "바삭하게 구운 끝맛", frame: "블랙·다크 브라운 팁", lens: "브라운 틴트", tastes: ["bitter", "salty"], keywords: ["탄 끝맛", "시크한", "블랙"] },
  // ── Deli · Sushi
  { id: "sushi-tuna",        line: "Sushi", name: "Tuna",     ko: "참치", frame: "로즈골드 메탈", lens: "투명", tastes: ["umami", "salty"], keywords: ["담백한", "로즈골드", "가벼운"] },
  { id: "sushi-salmon",      line: "Sushi", name: "Salmon",   ko: "연어", frame: "코랄골드 메탈", lens: "투명", tastes: ["umami", "sweet"], keywords: ["고소한", "코랄빛", "부드러운 직선"] },
  { id: "sushi-egg",         line: "Sushi", name: "Egg",      ko: "계란", frame: "골드 메탈", lens: "투명", tastes: ["sweet", "salty"], keywords: ["달큰한", "골드", "단정한"] },
  { id: "sushi-flounder",    line: "Sushi", name: "Flounder", ko: "광어", frame: "실버 메탈", lens: "투명", tastes: ["salty", "umami"], keywords: ["깔끔한", "실버", "미니멀"] },
  // ── Deli · Tteokbokki
  { id: "tteok-gochujang",   line: "Tteokbokki", name: "Gochujang", ko: "고추장", frame: "버건디", lens: "투명", tastes: ["spicy", "sweet"], keywords: ["매콤달콤", "버건디", "국민 간식"] },
  { id: "tteok-jjajang",     line: "Tteokbokki", name: "Jjajang",   ko: "짜장", frame: "다크 브라운·블랙 호피", lens: "투명", tastes: ["umami", "salty"], keywords: ["진득한", "다크 호피", "묵직한"] },
  { id: "tteok-cream",       line: "Tteokbokki", name: "Cream",     ko: "크림", frame: "아이보리", lens: "투명", tastes: ["sweet", "umami"], keywords: ["크리미", "아이보리", "순한 맛"] },
  // ── Beverage · Juice
  { id: "juice-ice",         line: "Juice", name: "ICE dongdong", ko: "얼음 동동", frame: "실버 메탈 무테", lens: "아이스블루", tastes: ["sour", "salty"], keywords: ["청량한", "무테", "아이스블루"] },
  { id: "juice-orange",      line: "Juice", name: "Orange",       ko: "오렌지", frame: "로즈골드 메탈 무테", lens: "오렌지 틴트", tastes: ["sour", "sweet"], keywords: ["상큼한", "비타민", "오렌지 틴트"] },
  { id: "juice-grape",       line: "Juice", name: "Grape",        ko: "포도", frame: "실버 메탈 무테", lens: "퍼플 틴트", tastes: ["sweet", "sour"], keywords: ["달콤한", "퍼플 틴트", "가벼운"], atc: true },
  // ── Beverage · Milk
  { id: "milk-cereals",      line: "Milk", name: "Cereals with White", ko: "우유와 컬러 시리얼", frame: "투명 쿨그레이·컬러 스펙클", lens: "라벤더→블루", tastes: ["sweet", "sour"], keywords: ["알록달록", "장난기", "스펙클"], atc: true },
  { id: "milk-white",        line: "Milk", name: "ssuk ssuk white",    ko: "화이트 밀크", frame: "무광 화이트", lens: "스모키 블루그레이", tastes: ["sweet", "salty"], keywords: ["순수한", "담백한", "화이트"] },
  { id: "milk-choco",        line: "Milk", name: "choco loco",         ko: "초콜릿", frame: "초콜릿 브라운", lens: "블랙", tastes: ["bitter", "sweet"], keywords: ["다크초코", "진한", "블랙 렌즈"] },
  // ── Beverage · Wine
  { id: "wine-white",        line: "Wine", name: "White Wine", ko: "화이트 와인", frame: "크림 화이트", lens: "스모키 모브", tastes: ["sour", "sweet"], keywords: ["드라이", "우아한", "크림 화이트"] },
  { id: "wine-rose",         line: "Wine", name: "Rose Wine",  ko: "로제 와인", frame: "투명 코랄", lens: "스모키 모브", tastes: ["sweet", "sour"], keywords: ["로맨틱", "투명 코랄", "가벼운 취기"] },
  { id: "wine-red",          line: "Wine", name: "Red Wine",   ko: "레드 와인", frame: "딥 퍼플·버건디 호피", lens: "스모키 모브", tastes: ["bitter", "sour"], keywords: ["드라마틱", "깊은", "보라 호피"] },
  // ── Beverage · Coffee
  { id: "coffee-espresso",   line: "Coffee", name: "Espresso",      ko: "에스프레소", frame: "유광 블랙", lens: "다크 그레이", tastes: ["bitter", "sour"], keywords: ["진한 한 샷", "블랙", "시크한"] },
  { id: "coffee-iceamericano", line: "Coffee", name: "Ice Americano", ko: "아이스 아메리카노", frame: "다크 브라운·앰버 호피", lens: "다크 그레이", tastes: ["bitter", "salty"], keywords: ["매일의", "깔끔한", "호피"] },
  { id: "coffee-latte",      line: "Coffee", name: "Latte",         ko: "라테", frame: "반투명 밀크티 브라운", lens: "브라운", tastes: ["sweet", "bitter"], keywords: ["부드러운", "밀크티", "반투명"], faces: ["heart"] },
  // ── Fresh · Vegie (모델마다 셰잎 다름)
  { id: "vegie-tomato",      line: "Vegie", name: "Tomato",   ko: "토마토", frame: "레드 버건디", lens: "브라운 틴트", tastes: ["sour", "umami"], keywords: ["새콤한", "감칠맛 폭발", "가로 오벌"], shape: "oval", shapeKo: "가로 오벌" },
  { id: "vegie-lettuce",     line: "Vegie", name: "Lettuce",  ko: "상추", frame: "짙은 포레스트 그린", lens: "스모키 다크 그린", tastes: ["bitter", "salty"], keywords: ["싱그러운", "차분한", "포레스트 그린"], shape: "round", shapeKo: "라운드 판토" },
  { id: "vegie-eggplant",    line: "Vegie", name: "Eggplant", ko: "가지", frame: "퍼플", hex: "#4E1164", lens: "와인레드", lensHex: "#641122", tastes: ["umami", "bitter"], keywords: ["보랏빛", "포인트", "와인 렌즈"], shape: "round", shapeKo: "라운드 판토" },
  { id: "vegie-pumpkin",     line: "Vegie", name: "Pumpkin",  ko: "호박", frame: "투명 샴페인 베이지", lens: "스모키 모브 브라운", tastes: ["sweet", "umami"], keywords: ["달큰한", "누드 앰버", "투명"], shape: "oval", shapeKo: "슬림 소프트 오벌" },
  // ── Fresh · Fruit
  { id: "fruit-plum",        line: "Fruit", name: "Plum",  ko: "자두", frame: "쿨 바이올렛", lens: "투명", tastes: ["sour", "bitter"], keywords: ["새콤떨떠름", "쿨톤", "바이올렛"] },
  { id: "fruit-apple",       line: "Fruit", name: "Apple", ko: "사과", frame: "레드·화이트 팁", lens: "투명", tastes: ["sweet", "sour"], keywords: ["아삭한", "레드", "화이트 팁"] },
  { id: "fruit-kiwi",        line: "Fruit", name: "Kiwi",  ko: "키위", frame: "브라운 외부·그린 이너", lens: "투명", tastes: ["sour", "sweet"], keywords: ["반전 속살", "이중 배색", "그린"] },
  { id: "fruit-melon",       line: "Fruit", name: "Melon", ko: "멜론", frame: "투명 세이지 그린", lens: "투명", tastes: ["sweet", "salty"], keywords: ["은은한", "세이지", "투명"] },
  // ── Fresh · Meat
  { id: "meat-rare",         line: "Meat", name: "Beef Rare",        ko: "레어", frame: "딥 체리 레드", lens: "웜 브라운", tastes: ["umami", "spicy"], keywords: ["대담한", "체리 레드", "선명한"] },
  { id: "meat-mediumrare",   line: "Meat", name: "Beef Medium Rare", ko: "미디엄 레어", frame: "체스트넛 브라운", lens: "웜 브라운", tastes: ["umami", "salty"], keywords: ["딱 좋은 익힘", "체스트넛", "균형"], atc: true },
  { id: "meat-welldone",     line: "Meat", name: "Beef Well Done",   ko: "웰던", frame: "다크 브라운·블랙 호피", lens: "웜 브라운", tastes: ["bitter", "umami"], keywords: ["불맛", "다크 호피", "묵직한"] },
  // ── Fresh · Sashimi
  { id: "sashimi-mackerel",  line: "Sashimi", name: "Mackerel",        ko: "고등어", frame: "블루블랙·그레이", lens: "투명", tastes: ["salty", "umami"], keywords: ["바다 내음", "블루블랙", "불규칙한 결"], atc: true },
  { id: "sashimi-tuna",      line: "Sashimi", name: "Tuna",            ko: "참치", frame: "레드·아이보리 마블", lens: "투명", tastes: ["umami", "sweet"], keywords: ["마블링", "레드", "풍부한"] },
  { id: "sashimi-salmon",    line: "Sashimi", name: "Salmon",          ko: "연어", frame: "투명 피치 코랄", lens: "투명", tastes: ["sweet", "umami"], keywords: ["부드러운", "피치 코랄", "반투명"], faces: ["heart"] },
  { id: "sashimi-flounder",  line: "Sashimi", name: "Flounder",        ko: "광어", frame: "투명 밀키 화이트", lens: "투명", tastes: ["salty", "sweet"], keywords: ["담백한", "흰살", "맑은"], faces: ["heart"] },
  { id: "sashimi-baked",     line: "Sashimi", name: "Baked Mackerel",  ko: "구운 고등어", frame: "토스티드 브라운", lens: "투명", tastes: ["salty", "bitter"], keywords: ["고소하게 구운", "토스티드 브라운", "무광"] },
  { id: "sashimi-shrimp",    line: "Sashimi", name: "Shrimp",          ko: "새우", frame: "투명 화이트→코랄", lens: "투명", tastes: ["sweet", "salty"], keywords: ["탱글한", "코랄 그라데이션", "레이어"] }
];

// 모델 한 줄 소개 (결과 화면·주문서) — 디자인 시안에 있는 것만 채움.
// TODO: 나머지 모델 소개 문구 받기. 비어 있으면 키워드로 대신 보여준다.
var MODEL_TAGLINES = {
  "dango-buldak": "불같은 성격을 불닭으로 화라락",
  "fruit-kiwi":   "키위는 까슬까슬 겉과 속이 다르다네",
  "wine-red":     "레드와인은 으른의 맛"
};

// 카테고리 순서 (주문 번호용): Deli 01 · Fresh 02 · Beverage 03
var CATEGORY_ORDER = ["Deli", "Fresh", "Beverage"];

// 모델 코드: { no: "01-01-03", code: "DELI-DANGO-03" } — 카테고리·라인·라인 안 순서(LINES·MODELS 순서 기준)
// TODO: 노션에 정식 품번이 있으면 그걸로 교체
function modelCode(m) {
  var line = LINES[m.line], cat = line.category;
  var ci = CATEGORY_ORDER.indexOf(cat) + 1, li = 0, mi = 0, k, i;
  for (k in LINES) { if (LINES[k].category === cat) { li++; if (k === m.line) break; } }
  for (i = 0; i < MODELS.length; i++) { if (MODELS[i].line === m.line) { mi++; if (MODELS[i] === m) break; } }
  function p(n) { return (n < 10 ? "0" : "") + n; }
  return { no: p(ci) + "-" + p(li) + "-" + p(mi), code: cat.toUpperCase() + "-" + m.line.toUpperCase() + "-" + p(mi) };
}

// 모델 사진: assets/models/<모델 id>.png (배경 투명 권장). 파일이 없으면 자리만 비워둔다.
function modelPhoto(m) { return "assets/models/" + m.id + ".png"; }
// 정면 사진: assets/models/front/<모델 id>.png (영수증 Today's Menu)
function modelFront(m) { return "assets/models/front/" + m.id + ".png"; }
