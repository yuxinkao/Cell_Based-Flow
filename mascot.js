window.mascotState = "intro1";
window.mascotBonk = 0;
window.mascotCorner = { x: "right", y: "bottom" };
window.mascotOrder = ["intro1", "intro2", "fight", "bonk", "pet", "sleep"];

window.mascotScenes = {
  intro1: {
    gif: "intro.gif",
    reload: true,
    text: "\u54c8\u56c9\uff01\u6211\u662f\u863f\u863f",
    btns: [{ label: "\u8a8d\u8b58\u5927\u72d7\u72d7", act: "next", cls: "" }]
  },
  intro2: {
    gif: "intro.gif",
    reload: false,
    text: "\u65c1\u908a\u9019\u96bb\u662f\u6211\u7684\u5927\u72d7\u72d7\u5594\uff01\u54a6\u2026\u7260\u597d\u50cf\u5728\u5077\u770b\u6211\u53e3\u888b\u88e1\u7684\u5c0f\u718a\u8edf\u7cd6\uff1f",
    btns: [{ label: "\u62ff\u51fa\u5c0f\u718a\u8edf\u7cd6", act: "next", cls: "is-soft" }]
  },
  fight: {
    gif: "fight.gif",
    reload: true,
    text: "\u55da\u54c7\uff5e\u5927\u72d7\u72d7\u4e0d\u51c6\u6436\u6211\u7684\u8edf\u7cd6\u5566\uff01",
    btns: [{ label: "\u9ede\u64ca\u5e6b\u52a9\u863f\u863f\u6436\u8edf\u7cd6", act: "next", cls: "is-danger" }]
  },
  bonk: {
    gif: "bonk.gif",
    reload: true,
    text: "\u549a\uff01\u5c0f\u718a\u8edf\u7cd6\u6389\u51fa\u4f86\u5566\uff01\u5927\u72d7\u72d7\u770b\u8d77\u4f86\u597d\u59d4\u5c48\u2026",
    btns: [
      { label: "\u518d\u6253\u4e00\u6b21", act: "rebonk", cls: "is-danger" },
      { label: "\u5e6b\u7260\u547c\u547c", act: "next", cls: "is-soft" }
    ]
  },
  pet: {
    gif: "pet.gif",
    reload: true,
    text: "\u4e56\u4e56\uff5e\u4e0d\u54ed\u4e0d\u54ed\uff08\u8d81\u6a5f\u628a\u8edf\u7cd6\u85cf\u5728\u80cc\u5f8c\u563f\u563f\uff09",
    btns: [{ label: "\u653e\u4ed6\u5011\u53bb\u7761\u89ba", act: "next", cls: "" }]
  },
  sleep: {
    gif: "sleep.gif",
    reload: true,
    text: "\u5403\u98fd\u73a9\u7d2f\u4e86\uff0c\u7aa9\u5728\u4e00\u8d77\u966a\u4f60\u8b80\u66f8 Zzz\u2026",
    btns: [{ label: "\u9ede\u64ca\u8d77\u5e8a\u966a\u8b80\u8005\u73a9", act: "restart", cls: "is-soft" }]
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
    img.src = base + sc.gif + "?t=" + Date.now();
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
      "\u518d\u6572\u4e00\u4e0b\uff01\u4e0d\u51c6\u5077\u5403\u5c0f\u718a\u8edf\u7cd6\uff01",
      "\u549a\u549a\uff01\u5927\u72d7\u72d7\u982d\u4e0a\u7684\u5305\u53c8\u8b8a\u5927\u9846\u4e86\u5566\uff01",
      "\u597d\u75db\u597d\u75db\uff5e\u5927\u72d7\u72d7\u5df2\u7d93\u77e5\u9053\u932f\u4e86\u55da\u55da"
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
