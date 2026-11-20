// YUMMY EYE 전시 소개 — 메뉴판·맛 목록·탭 강조. 구형 Safari 호환을 위해 ES5만 쓴다.
// 모델 데이터는 data/models.js (Taste Test 저장소와 같은 파일): TASTES, LINES, MODELS, MODEL_TAGLINES, CATEGORY_ORDER, modelCode
(function () {
  "use strict";

  // 맛 설명 — Taste Test data/copy.js COPY.tastes와 같은 문구
  var TASTE_COPY = {
    sweet:  { title: "달콤한 단맛",   line: "누구에게나 편안한, 첫 숟가락 같은 사람" },
    bitter: { title: "쌉싸름한 쓴맛", line: "한 모금 뒤에 오래 남는 사람" },
    salty:  { title: "짭짤한 짠맛",   line: "기본 간이 딱 맞는, 질리지 않는 사람" },
    sour:   { title: "상큼한 신맛",   line: "한 입에 기분을 깨우는 사람" },
    spicy:  { title: "화끈한 매운맛", line: "어느 테이블에서든 먼저 눈에 띄는 사람" },
    umami:  { title: "깊은 감칠맛",   line: "씹을수록 진가가 나오는 사람" }
  };
  var TASTE_ORDER = ["sweet", "salty", "sour", "spicy", "bitter", "umami"];
  var CATS = {
    Deli:     { board: "Yummy Eye Deli Kitchen",    pack: "도시락 포장",     color: "#C23228", cls: "c-deli" },
    Fresh:    { board: "Yummy Eye Fresh Picks",     pack: "신선 트레이 포장", color: "#009245", cls: "c-fresh" },
    Beverage: { board: "Yummy Eye Beverage Fridge", pack: "음료 팩 포장",    color: "#5499D3", cls: "c-beverage" }
  };

  var state = { cat: "Deli", taste: null, atc: false };

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function each(a, f) { for (var i = 0; i < a.length; i++) f(a[i], i); }
  function byId(id) { for (var i = 0; i < MODELS.length; i++) if (MODELS[i].id === id) return MODELS[i]; return null; }
  function catOf(m) { return LINES[m.line].category; }
  // 실물 표시: 테스트 웹과 같이 SHOW_ATC가 켜졌을 때만
  var SHOWATC = typeof SHOW_ATC === "undefined" ? true : SHOW_ATC;
  function isAtc(m) { return SHOWATC && !!m.atc; }
  function setCatColor(cat) { document.documentElement.style.setProperty("--cat", CATS[cat].color); }

  // ── 6가지 맛 목록 (이용 안내)
  function renderTastes() {
    var h = "";
    each(TASTE_ORDER, function (k) {
      h += '<div class="taste"><div><b>' + esc(TASTE_COPY[k].title) + "</b><span>" + esc(TASTE_COPY[k].line) + "</span></div></div>";
    });
    $("taste-list").innerHTML = h;
  }

  // ── 메뉴판
  function renderCatTabs() {
    var h = "";
    each(CATEGORY_ORDER, function (c) {
      var n = 0; each(MODELS, function (m) { if (catOf(m) === c) n++; });
      h += '<button type="button" class="cat-tab ' + CATS[c].cls + (state.cat === c ? " on" : "") + '" data-cat="' + c + '"><b>' + c.toUpperCase() + "</b><small>" + CATS[c].pack + "</small></button>";
    });
    $("cat-tabs").innerHTML = h;
  }
  function renderTasteFilter() {
    var h = '<button type="button" class="chip' + (state.taste ? "" : " on") + '" data-taste="">전체</button>';
    each(TASTE_ORDER, function (k) {
      h += '<button type="button" class="chip' + (state.taste === k ? " on" : "") + '" data-taste="' + k + '">' + TASTES[k].ko + "</button>";
    });
    $("taste-filter").innerHTML = h;
    $("atc-filter").className = "chip chip-atc" + (state.atc ? " on" : "") + (SHOWATC ? "" : " hidden");
  }
  function matches(m) {
    if (state.atc && !isAtc(m)) return false;
    if (state.taste && m.tastes.indexOf(state.taste) < 0) return false;
    return true;
  }
  function renderBoard() {
    setCatColor(state.cat);
    var h = '<p class="board-name">' + esc(CATS[state.cat].board) + "</p>", shown = 0;
    for (var key in LINES) {
      var L = LINES[key];
      if (L.category !== state.cat) continue;
      var items = "";
      each(MODELS, function (m) {
        if (m.line !== key || !matches(m)) return;
        shown++;
        items += '<button type="button" class="item" data-id="' + m.id + '"><div>' +
          '<img loading="lazy" src="assets/models/front/' + m.id + '.png" alt="">' +
          "<b>" + esc(m.ko) + "</b><small>" + esc(m.name) + "</small>" +
          "<em>" + TASTES[m.tastes[0]].ko + " | " + TASTES[m.tastes[1]].ko + "</em>" +
          "</div>" + (isAtc(m) ? '<span class="badge">실물</span>' : "") + "</button>";
      });
      if (!items) continue;
      h += '<div class="line-h"><b>' + state.cat + " - " + key + "</b><span>" + esc(L.ko) + " · " + esc(L.shapeKo) + "</span><i></i></div>" +
        '<div class="items">' + items + "</div>";
    }
    if (!shown) h += '<p class="empty">이 코너에는 해당 메뉴가 없어요. 다른 코너도 둘러보세요.</p>';
    $("board").innerHTML = h;
  }
  function renderMenu() { renderCatTabs(); renderTasteFilter(); renderBoard(); }

  // ── 모델 상세 시트
  function row(k, v) { return v ? "<div><dt>" + k + "</dt><dd>" + esc(v) + "</dd></div>" : ""; }
  function openModel(id) {
    var m = byId(id); if (!m) return;
    var L = LINES[m.line], cat = L.category, code = modelCode(m);
    setCatColor(cat);
    var tag = m.desc || (typeof MODEL_TAGLINES !== "undefined" && MODEL_TAGLINES[m.id]) || "";
    var lv = m.level ? '<span>맛 강도 ' + "●●●".slice(0, m.level) + "○○○".slice(0, 3 - m.level) + "</span>" : "";
    var h = '<p class="sh-code">' + code.code + " · " + CATS[cat].pack + "</p>" +
      '<h3 class="sh-name">' + esc(m.ko) + '<br><span class="sh-en">' + esc(m.name) + "</span></h3>" +
      '<img class="sh-img" src="assets/models/full/' + m.id + '.png" alt="' + esc(m.ko) + ' 안경">' +
      (tag ? '<p class="sh-line">' + esc(tag) + "</p>" : "") +
      '<p class="sh-tastes"><span>주맛 ' + TASTES[m.tastes[0]].ko + "</span><span>부맛 " + TASTES[m.tastes[1]].ko + "</span>" + lv + "</p>" +
      '<p class="sh-kw">' + esc(m.keywords.join(" · ")) + "</p>" +
      '<dl class="sh-spec">' + row("셰잎", m.shapeKo || L.shapeKo) + row("프레임", m.frame) + row("렌즈", m.lens) + row("유형", L.type) + "</dl>" +
      (isAtc(m) ? '<p class="sh-atc">전시장 테이블에서 실물로 써볼 수 있어요.</p>' : "");
    $("sheet-body").innerHTML = h;
    $("sheet").className = "sheet";
    document.body.style.overflow = "hidden";
    if (history.replaceState) history.replaceState(null, "", "#m=" + m.id);
  }
  function closeModel() {
    $("sheet").className = "sheet hidden";
    document.body.style.overflow = "";
    setCatColor(state.cat);
    if (history.replaceState) history.replaceState(null, "", "#menu");
  }

  // ── 이벤트
  function closest(el, attr) {
    while (el && el !== document) { if (el.getAttribute && el.getAttribute(attr) !== null) return el; el = el.parentNode; }
    return null;
  }
  document.addEventListener("click", function (e) {
    var t;
    if ((t = closest(e.target, "data-cat"))) { state.cat = t.getAttribute("data-cat"); renderMenu(); return; }
    if ((t = closest(e.target, "data-taste"))) { state.taste = t.getAttribute("data-taste") || null; renderMenu(); return; }
    if ((t = closest(e.target, "data-id"))) { openModel(t.getAttribute("data-id")); return; }
    if ((t = closest(e.target, "data-close"))) { closeModel(); return; }
    if ((t = closest(e.target, "data-atc"))) { state.atc = true; state.taste = null; renderMenu(); return; }
    if (e.target.id === "atc-filter") { state.atc = !state.atc; renderMenu(); }
  });
  document.addEventListener("keydown", function (e) { if (e.keyCode === 27) closeModel(); });

  // 상단 탭: 지금 보고 있는 섹션 강조
  var secIds = ["guide", "menu", "chef", "gallery"];
  function onScroll() {
    var y = window.pageYOffset + 90, cur = "";
    each(secIds, function (id) { var el = $(id); if (el && el.offsetTop <= y) cur = id; });
    each($("tabs").getElementsByTagName("a"), function (a) { a.className = a.getAttribute("href") === "#" + cur ? "on" : ""; });
  }
  window.addEventListener("scroll", onScroll);

  // 화보 빈자리: 라인별 대표 컷 1장씩 (사진을 받으면 assets/gallery/<라인>.jpg로 교체)
  function renderGallerySlots() {
    var h = "";
    each(CATEGORY_ORDER, function (c) {
      for (var key in LINES) {
        if (LINES[key].category !== c) continue;
        h += '<div class="slot"><b>' + c + " - " + key + "</b><span>" + esc(LINES[key].ko) + " 라인 대표 모델을 쓴 AI 모델 컷이 들어갈 자리예요.</span></div>";
      }
    });
    $("gallery-slots").innerHTML = h;
  }

  // 시작
  renderGallerySlots();
  renderTastes();
  renderMenu();
  onScroll();
  var mh = /^#m=([\w-]+)/.exec(location.hash);
  if (mh && byId(mh[1])) {
    state.cat = catOf(byId(mh[1])); renderMenu();
    setTimeout(function () { $("menu").scrollIntoView(); openModel(mh[1]); }, 50);
  }
})();
