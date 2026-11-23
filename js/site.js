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
  // 팜플렛 카드처럼 "주맛 | 부맛 ●●○"
  function tasteDots(m) {
    var lv = m.level || 0, d = "";
    for (var i = 0; i < 3; i++) d += i < lv ? "●" : "○";
    return esc(TASTES[m.tastes[0]].ko + " | " + TASTES[m.tastes[1]].ko) + (lv ? ' <span class="lv">' + d + "</span>" : "");
  }
  var FOLD = { Sushi: 1 };
  function front(m) { return '<img class="itm-img" loading="lazy" src="assets/models/front/' + m.id + '.png" alt="">'; }
  function atcBadge(m) { return isAtc(m) ? '<span class="badge">실물<br>시식</span>' : ""; }
  // 테스트 웹 메뉴판과 같은 진열: Deli = 델리 키친 메뉴판 / Fresh = 투명 트레이 / Beverage = 음료 냉장고
  function itemHTML(m, cat) {
    var d = ' type="button" data-id="' + m.id + '"', code = esc(modelCode(m).code);
    if (cat === "Fresh") {
      return '<button class="itm itm-fresh"' + d + '><span class="tray">' + front(m) + '<i class="tray-lid"></i>' +
        '<span class="f-label"><b>' + esc(m.ko) + "</b><small>" + esc(m.name) + "</small><i>" + tasteDots(m) + "</i></span></span>" +
        '<span class="itm-code">' + code + "</span>" + atcBadge(m) + "</button>";
    }
    if (cat === "Beverage") {
      return '<button class="itm itm-bev"' + d + ">" + front(m) +
        '<span class="b-label"><b>' + esc(m.ko) + "</b><small>" + esc(m.name) + "</small><i>" + tasteDots(m) + "</i><em>" + code + "</em></span>" + atcBadge(m) + "</button>";
    }
    var fold = FOLD[m.line] ? '<img class="itm-fold" loading="lazy" src="assets/models/fold/' + m.id + '.png" alt=""><span class="itm-fold-t">접이식</span>' : "";
    return '<button class="itm itm-deli' + (fold ? " has-fold" : "") + '"' + d + ">" + front(m) + fold +
      '<span class="d-label"><b>' + esc(m.ko) + "</b><small>" + esc(m.name) + "</small><i>" + tasteDots(m) + "</i></span>" + atcBadge(m) + "</button>";
  }
  function lineTitle(cat, key) {
    if (cat === "Fresh") return "Fresh – " + (key === "Vegie" ? "VEGI" : key.toUpperCase());
    return (cat === "Beverage" ? "Bev" : cat) + " - " + key;
  }
  function renderBoard() {
    setCatColor(state.cat);
    var cat = state.cat, h = "", shown = 0;
    for (var key in LINES) {
      var L = LINES[key];
      if (L.category !== cat) continue;
      var items = "";
      each(MODELS, function (m) {
        if (m.line !== key || !matches(m)) return;
        shown++;
        items += itemHTML(m, cat);
      });
      if (!items) continue;
      var sub = "<span>" + esc(L.ko) + " · " + esc(L.shapeKo) + "</span>";
      if (cat === "Beverage") {
        h += '<section class="ln fridge"><h3>' + esc(lineTitle(cat, key)) + sub + '</h3><div class="row">' + items + '</div><span class="fridge-name">' + key + "</span></section>";
      } else if (cat === "Fresh") {
        h += '<section class="ln"><h3>' + esc(lineTitle(cat, key)) + sub + '</h3><span class="burst"><img src="assets/stickers/fresh-' + key.toLowerCase() + '.svg" alt=""></span><div class="row">' + items + "</div></section>";
      } else {
        h += '<section class="ln"><h3>' + esc(lineTitle(cat, key)) + sub + '</h3><div class="row">' + items + "</div></section>";
      }
    }
    if (!shown) h += '<p class="empty">이 코너에는 해당 메뉴가 없어요. 다른 코너도 둘러보세요.</p>';
    var b = $("board");
    b.className = "board theme-" + cat.toLowerCase();
    b.innerHTML = '<div class="board-in"><h3 class="board-name"><img src="assets/titles/' + cat.toLowerCase() + '.png" alt="' + esc(CATS[cat].board) + '"></h3>' + h + "</div>";
  }
  function renderMenu() { renderCatTabs(); renderTasteFilter(); renderBoard(); if (typeof refit === "function" && pageEls) fit($("menu").parentNode.parentNode); }

  // ── 모델 상세 시트
  function row(k, v) { return v ? "<div><dt>" + k + "</dt><dd>" + esc(v) + "</dd></div>" : ""; }
  function openModel(id) {
    var m = byId(id); if (!m) return;
    var L = LINES[m.line], cat = L.category, code = modelCode(m);
    setCatColor(cat);
    var tag = m.desc || (typeof MODEL_TAGLINES !== "undefined" && MODEL_TAGLINES[m.id]) || "";
    var lv = m.level ? '<span>맛 강도 ' + "●●●".slice(0, m.level) + "○○○".slice(0, 3 - m.level) + "</span>" : "";
    var h = '<p class="sh-code">' + code.code + " · " + CATS[cat].pack + "</p>" +
      '<div class="sh-head"><img class="sh-emoji" src="assets/emoji/' + m.id + '.png" alt="" onerror="this.style.display=\'none\'">' +
      '<h3 class="sh-name">' + esc(m.ko) + '<br><span class="sh-en">' + esc(m.name) + " · " + esc(m.ko) + "</span></h3></div>" +
      '<img class="sh-img" src="assets/models/full/' + m.id + '.png" alt="' + esc(m.ko) + ' 안경">' +
      (FOLD[m.line] ? '<p class="sh-fold"><img src="assets/models/fold/' + m.id + '.png" alt="접은 모습"><span>접이식 · 반으로 접어 도시락처럼 쏙</span></p>' : "") +
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

  // ── 좌우로 넘기는 장: 탭·화살표·점·키보드·#링크가 모두 같은 goTo를 쓴다
  var pagesEl = $("pages"), pageEls = [], cur = 0;
  each(pagesEl.children, function (el) { if (el.className === "page") pageEls.push(el); });
  var PAGE_NAMES = { top: "표지", guide: "이용 안내", faq: "자주 묻는 질문", menu: "메뉴판", chef: "셰프", gallery: "화보", counter: "계산대" };
  function pageOf(el) { while (el && el !== document) { var k = pageEls.indexOf(el); if (k >= 0) return k; el = el.parentNode; } return -1; }
  // 책장 넘기기: 앞으로 가면 지금 장이 왼쪽 모서리를 축으로 넘어가고, 뒤로 가면 앞 장이 다시 덮인다
  var turning = false;
  function goTo(i, smooth) {
    i = Math.max(0, Math.min(pageEls.length - 1, i));
    if (i === cur || turning) return;
    var from = pageEls[cur], to = pageEls[i], fwd = i > cur, anim = smooth !== false && !reduceMotion;
    fit(to);
    if (!anim) { from.className = "page"; to.className = "page cur" + (to.className.indexOf("fitted") >= 0 ? " fitted" : ""); refit(to); setCur(i); return; }
    turning = true;
    var keepFrom = from.className.indexOf("fitted") >= 0 ? " fitted" : "", keepTo = to.className.indexOf("fitted") >= 0 ? " fitted" : "";
    if (fwd) { to.className = "page under" + keepTo; from.className = "page turn-out" + keepFrom; }
    else { from.className = "page under" + keepFrom; to.className = "page turn-in" + keepTo; }
    setCur(i);
    setTimeout(function () {
      from.className = "page" + keepFrom; to.className = "page cur" + keepTo; turning = false;
    }, 760);
  }
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // 한 화면 맞춤: 장 내용(.fit)이 장 높이보다 크면 줄인다. 데스크톱은 0.5배까지, 폰은 0.78배까지만(더 작아지면 세로 스크롤)
  function fit(page) {
    var f = page.firstElementChild; if (!f) return;
    page.className = page.className.replace(/ ?fitted/g, "");
    var h = f.offsetHeight, H = page.clientHeight - (parseFloat(window.getComputedStyle(page).paddingTop) || 0), desk = window.innerWidth >= 720;
    var sc = Math.min(1, H / h), min = desk ? 0.5 : 0.78;
    if (sc < 1 && sc >= min) { f.style.setProperty("--s", sc.toFixed(3)); page.className += " fitted"; }
    else f.style.removeProperty("--s");
  }
  function setHH() { var t = document.querySelector(".top"); if (t) document.documentElement.style.setProperty("--hh", t.offsetHeight + "px"); }
  setHH();
  function refit(page) { setHH(); fit(page || pageEls[cur]); }
  var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { refit(); }, 120); });
  document.addEventListener("load", function (e) { if (e.target.tagName === "IMG") { clearTimeout(rt); rt = setTimeout(function () { refit(); }, 120); } }, true);
  // 손가락으로 옆으로 밀기
  var tx = null, ty = 0;
  pagesEl.addEventListener("touchstart", function (e) { var t = e.touches[0]; tx = t.clientX; ty = t.clientY; }, { passive: true });
  pagesEl.addEventListener("touchend", function (e) {
    if (tx === null) return;
    var t = e.changedTouches[0], dx = t.clientX - tx, dy = t.clientY - ty; tx = null;
    if (closest(e.target, "data-noswipe")) return;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(cur + (dx < 0 ? 1 : -1));
  }, { passive: true });
  function setCur(i) {
    cur = i;
    var key = pageEls[i].getAttribute("data-page");
    each($("tabs").getElementsByTagName("a"), function (a) { a.className = a.getAttribute("href") === "#" + key ? "on" : ""; });
    var d = "";
    each(pageEls, function (p, k) { d += '<button type="button" data-go="' + k + '" class="' + (k === i ? "on" : "") + '" aria-label="' + PAGE_NAMES[p.getAttribute("data-page")] + '"></button>'; });
    $("pg-dots").innerHTML = d + "<span>" + PAGE_NAMES[key] + "</span>";
    $("pg-prev").className = "pg-arrow pg-prev" + (i === 0 ? " off" : "");
    $("pg-next").className = "pg-arrow pg-next" + (i === pageEls.length - 1 ? " off" : "");
    var on = $("tabs").getElementsByTagName("a")[i];
    if (on && on.scrollIntoView && $("tabs").scrollWidth > $("tabs").clientWidth) $("tabs").scrollLeft = on.offsetLeft - 40;
  }
  // #링크(탭·버튼·본문 링크): 그 섹션이 있는 장으로 넘기고 장 안에서 위치를 맞춘다
  function goToTarget(id, smooth) {
    var el = id === "top" ? pageEls[0] : $(id);
    var i = pageOf(el); if (i < 0) return false;
    goTo(i, smooth);
    var page = pageEls[i];
    page.scrollTop = page.className.indexOf("fitted") >= 0 || el === page || el.tagName === "SECTION" ? 0 : Math.max(0, el.offsetTop - 10);
    return true;
  }
  document.addEventListener("click", function (e) {
    var t = closest(e.target, "data-go");
    if (t) { goTo(+t.getAttribute("data-go")); return; }
    if (e.target.id === "pg-prev") { goTo(cur - 1); return; }
    if (e.target.id === "pg-next") { goTo(cur + 1); return; }
    var a = closest(e.target, "href");
    if (a && /^#[\w-]+$/.test(a.getAttribute("href")) && goToTarget(a.getAttribute("href").slice(1))) e.preventDefault();
  });
  document.addEventListener("keydown", function (e) {
    if ($("sheet").className.indexOf("hidden") < 0) return;
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea") return;
    if (e.keyCode === 37) goTo(cur - 1);
    if (e.keyCode === 39) goTo(cur + 1);
  });

  // 화보 빈자리: 라인별 대표 컷 1장씩 (사진을 받으면 assets/gallery/<라인>.jpg로 교체)
  var STICKERS = { Dango: "deli-dango", Omurice: "deli-omurice", Sushi: "deli-sushi", Tteokbokki: "deli-tteokbokki",
    Vegie: "fresh-vegie", Fruit: "fresh-fruit", Meat: "fresh-meat", Sashimi: "fresh-sashimi",
    Juice: "bev-juice", Milk: "bev-milk", Wine: "bev-wine", Coffee: "bev-coffee" };
  function renderGallerySlots() {
    var h = "";
    each(CATEGORY_ORDER, function (c) {
      for (var key in LINES) {
        if (LINES[key].category !== c) continue;
        var st = STICKERS[key] ? '<img class="slot-st" loading="lazy" src="assets/stickers/' + STICKERS[key] + '.svg" alt="">' : "";
        h += '<div class="slot slot-ln">' + st + "<b>" + c + " - " + key + "</b><span>" + esc(LINES[key].ko) + " 라인 대표 모델을 쓴 AI 모델 컷이 들어갈 자리예요.</span></div>";
      }
    });
    $("gallery-slots").innerHTML = h;
  }

  // 시작
  renderGallerySlots();
  renderTastes();
  renderMenu();
  pageEls[0].className = "page cur"; setCur(0); fit(pageEls[0]);
  var mh = /^#m=([\w-]+)/.exec(location.hash), hh = /^#([\w-]+)$/.exec(location.hash);
  if (mh && byId(mh[1])) {
    state.cat = catOf(byId(mh[1])); renderMenu();
    setTimeout(function () { goToTarget("menu", false); openModel(mh[1]); }, 50);
  } else if (hh) { setTimeout(function () { goToTarget(hh[1], false); }, 50); }
})();
