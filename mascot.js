window.mascotState = "intro1";
window.mascotBonk = 0;
window.mascotCorner = { x: "right", y: "bottom" };
window.mascotOrder = ["intro1", "intro2", "fight", "bonk", "pet", "sleep"];

window.mascotScenes = {
  intro1: {
    gif: "intro.gif",
    reload: true,
    text: "哈囉！我是蘿蘿~ ",
    btns: [{ label: "認識大狗狗 🐾", act: "next", cls: "" }]
  },
  intro2: {
    gif: "intro.gif",
    reload: false,
    text: "旁邊這隻是我的大狗狗喔！咦…牠好像在偷看我的小熊軟糖？ ",
    btns: [{ label: "拿出小熊軟糖 🍬", act: "next", cls: "is-soft" }]
  },
  fight: {
    gif: "fight.gif",
    reload: true,
    text: "嗚哇～大狗狗不要搶我的軟糖啦！ ",
    btns: [{ label: "幫助蘿蘿搶軟糖 🏏", act: "next", cls: "is-danger" }]
  },
  bonk: {
    gif: "bonk.gif",
    reload: true,
    text: "咚！小熊軟糖掉出來了！大狗狗是壞狗狗… ",
    btns: [
      { label: "再打一次 🏏", act: "rebonk", cls: "is-danger" },
      { label: "幫牠呼呼 🩹", act: "next", cls: "is-soft" }
    ]
  },
  pet: {
    gif: "pet.gif",
    reload: true,
    text: "乖乖～不哭不哭（把糖糖藏起來嘿嘿）",
    btns: [{ label: "放他們去睡覺 💤", act: "next", cls: "" }]
  },
  sleep: {
    gif: "sleep.gif",
    reload: true,
    text: "吃飽玩累了，窩在一起陪你讀書 Zzz…",
    btns: [{ label: "起床一起玩 🎈", act: "restart", cls: "is-soft" }]
  }
};

window.mascotSnap = function(cx, cy) {
  var w = document.getElementById("luoluo-mascot-widget");
  if (!w) return;
  window.mascotCorner.x = cx;
  window.mascotCorner.y = cy;
  w.className = "mascot-container " + (cx === "left" ? "is-left" : "is-right") + " " + (cy === "top" ? "is-top" : "is-bottom") + (w.getAttribute("data-min") === "1" ? " is-minimized" : "");
  w.style.right = "auto";
  w.style.bottom = "auto";
  var mx = window.innerWidth <= 640 ? 12 : 22;
  var topMin = window.innerWidth <= 640 ? 60 : 66;
  var botMin = window.innerWidth <= 640 ? 14 : 22;
  var r = w.getBoundingClientRect();
  w.style.left = (cx === "left" ? mx : Math.max(mx, window.innerWidth - r.width - mx)) + "px";
  w.style.top = (cy === "top" ? topMin : Math.max(topMin, window.innerHeight - r.height - botMin)) + "px";
};

window.mascotRender = function(key, customText) {
  var w = document.getElementById("luoluo-mascot-widget");
  var b = document.getElementById("mascot-speech-bubble");
  var img = document.getElementById("mascot-gif");
  var box = document.getElementById("mascot-actions");
  var sc = window.mascotScenes[key];
  if (!w || !b || !img || !box || !sc) return;
  window.mascotState = key;
  w.setAttribute("data-state", key);
  b.textContent = customText || sc.text;
  if (sc.reload) {
    var base = img.getAttribute("data-base") || "";
    img.src = base + sc.gif;
  }
  var html = "";
  for (var i = 0; i < sc.btns.length; i++) {
    var info = sc.btns[i];
    var cls = "mascot-action-btn" + (info.cls ? " " + info.cls : "");
    html += '<button type="button" class="' + cls + '" onclick="window.mascotGo(\'' + info.act + '\')">' + info.label + "</button>";
  }
  box.innerHTML = html;
  setTimeout(function() { window.mascotSnap(window.mascotCorner.x, window.mascotCorner.y); }, 20);
};

window.mascotMin = function() {
  var w = document.getElementById("luoluo-mascot-widget");
  var mb = document.getElementById("mascot-min-btn");
  if (!w) return;
  var nowMin = w.getAttribute("data-min") === "1" ? "0" : "1";
  w.setAttribute("data-min", nowMin);
  if (mb) mb.textContent = nowMin === "1" ? "+" : "-";
  setTimeout(function() { window.mascotSnap(window.mascotCorner.x, window.mascotCorner.y); }, 20);
};

window.mascotGo = function(act) {
  var w = document.getElementById("luoluo-mascot-widget");
  if (w && w.getAttribute("data-min") === "1") {
    window.mascotMin();
    return;
  }
  if (act === "rebonk") {
    window.mascotBonk++;
    var lines = [
      "再敲一下！不准偷吃小熊軟糖！🏏",
      "咚咚！大狗狗頭上的包變大顆了！🌀",
      "好痛好痛～大狗狗知道錯了嗚嗚 🏳️"
    ];
    window.mascotRender("bonk", lines[(window.mascotBonk - 1) % lines.length]);
    return;
  }
  if (act === "restart") {
    window.mascotBonk = 0;
    window.mascotRender("intro1");
    return;
  }
  if (act === "next") {
    var idx = window.mascotOrder.indexOf(window.mascotState);
    var nxt = (idx + 1) % window.mascotOrder.length;
    if (window.mascotOrder[nxt] === "intro1") window.mascotBonk = 0;
    window.mascotRender(window.mascotOrder[nxt]);
  }
};

(function() {
  var mode = "none", sx = 0, sy = 0, ol = 0, ot = 0, ow = 155, moved = false;
  function xy(e) {
    if (e.touches && e.touches.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  }
  function isBtn(el) {
    while (el && el !== document.body) {
      if (el.tagName === "BUTTON") return true;
      el = el.parentNode;
    }
    return false;
  }
  function hitId(el, id) {
    while (el && el !== document.body) {
      if (el.id === id) return true;
      el = el.parentNode;
    }
    return false;
  }
  document.addEventListener("mousedown", function(e) {
    if (isBtn(e.target)) return;
    var w = document.getElementById("luoluo-mascot-widget");
    var img = document.getElementById("mascot-gif");
    if (!w || !img) return;
    var p = xy(e); sx = p.x; sy = p.y; moved = false;
    if (hitId(e.target, "mascot-resize-handle")) {
      e.preventDefault(); mode = "resize";
      ow = img.getBoundingClientRect().width || 155; return;
    }
    if (hitId(e.target, "mascot-drag-card")) {
      mode = "drag"; var r = w.getBoundingClientRect();
      ol = r.left; ot = r.top;
    }
  });
  document.addEventListener("mousemove", function(e) {
    if (mode === "none") return;
    var w = document.getElementById("luoluo-mascot-widget");
    var img = document.getElementById("mascot-gif");
    var b = document.getElementById("mascot-speech-bubble");
    if (!w || !img) return;
    var p = xy(e), dx = p.x - sx, dy = p.y - sy;
    if (mode === "resize") {
      e.preventDefault();
      var delta = (window.mascotCorner.x === "right") ? -dx : dx;
      var nw = Math.min(Math.max(110, ow + delta), 340);
      img.style.width = nw + "px";
      if (b) {
        var ratio = nw / 155;
        b.style.maxWidth = Math.round(210 * ratio) + "px";
        b.style.fontSize = Math.min(Math.max(11.5, 12.5 * ratio), 16) + "px";
      }
      window.mascotSnap(window.mascotCorner.x, window.mascotCorner.y); return;
    }
    if (mode === "drag" && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      moved = true; e.preventDefault();
      var r = w.getBoundingClientRect();
      var nl = Math.min(Math.max(8, ol + dx), window.innerWidth - r.width - 8);
      var nt = Math.min(Math.max(8, ot + dy), window.innerHeight - r.height - 8);
      w.style.right = "auto"; w.style.bottom = "auto";
      w.style.left = nl + "px"; w.style.top = nt + "px";
    }
  });
  document.addEventListener("mouseup", function() {
    if (mode === "none") return;
    var w = document.getElementById("luoluo-mascot-widget");
    var m = mode; mode = "none";
    if (m === "resize") { window.mascotSnap(window.mascotCorner.x, window.mascotCorner.y); }
    else if (m === "drag" && moved && w) {
      var r = w.getBoundingClientRect();
      window.mascotSnap((r.left + r.width / 2) < window.innerWidth / 2 ? "left" : "right",
                       (r.top + r.height / 2) < window.innerHeight / 2 ? "top" : "bottom");
    }
  });
})();
