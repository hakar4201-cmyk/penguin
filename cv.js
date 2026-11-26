/* Free CV Maker — runs fully on the user's device. Data stays in localStorage. */
(function () {
  if (window.CV) return;
  var LS = "ph_cv", W = 794, H = 1123;
  var TR = {
    ck: {
      title: "دروستکرنا CV بێ بەرامبەر", sub: "CVیەکا جوان و پیشەیی ل دەمەکێ کورت دروست بکە",
      steps: ["زانیاریێن کەسی", "خواندن", "ئەزموونا کاری", "شارەزایی", "زێدەتر", "قالب"],
      name: "ناڤێ تەمام", job: "پیشە / ناڤونیشانێ کاری (ئارەزوومەندانە)", photo: "وێنە (ئارەزوومەندانە)", pickPhoto: "هەلبژارتنا وێنەی", rmPhoto: "سڕینا وێنەی",
      phone: "ژمارا موبایلێ", email: "ئیمەیل", addr: "ناڤنیشان",
      school: "ناڤێ قوتابخانە یان زانکۆیێ", field: "بەشێ خواندنێ", level: "ئاستێ خواندنێ", from: "ساڵا دەستپێکرنێ", to: "ساڵا تەمامکرنێ",
      co: "ناڤێ کۆمپانیا یان جهێ کاری", role: "ناڤێ پیشەیی", period: "ماوەیێ کارکرنێ", duties: "ئەرک و بەرپرسیارەتی (هەر ئەرکەک ل دێرەکێ)",
      comp: "شارەزاییا کۆمپیوتەری", langs: "زمان", prof: "توانایێن پیشەیی", courses: "خولێن رابوونێ و بڕوانامە",
      summary: "کورتەیەک دەربارەی خۆ", objective: "ئارمانجا پیشەیی", hobbies: "حەز و ئارەزوو",
      hintList: "هەر یەکێ ب کۆمایێ یان ل دێرەکێ جودا بنڤێسە",
      add: "+ زێدەکرن", del: "سڕین", next: "پاشتر", back: "ڤەگەڕیان", clear: "پاککرنا هەمی زانیاریان", sure: "تو پشتڕاستی؟ هەمی زانیاری دێ هێنە سڕین.",
      pick: "قالبەکێ هەلبژێرە", tplN: ["سادە و فەرمی", "مۆدێرن", "کارمەند", "قوتابی", "بێ ئەزموونا کاری"],
      zoom: "بینینا مەزن", dl: "داگرتنا PDF", busy: "دروستدکەم...", needName: "ناڤێ تەمام بنڤێسە", err: "نەشیا PDF دروست بکەت. دووبارە هەول بدە.",
      priv: "زانیاری ل سەر موبایلا تە دمینن و ناچنە چ سێرڤەرەکی.", sec: { sum: "دەربارەی من", obj: "ئارمانج", work: "ئەزموونا کاری", edu: "خواندن", skills: "شارەزایی", langs: "زمان", courses: "خول و بڕوانامە", hob: "حەز و ئارەزوو", contact: "پەیوەندی" }
    },
    ar: {
      title: "إنشاء سيرة ذاتية مجاناً", sub: "اصنع سيرة ذاتية جميلة ومهنية في دقائق",
      steps: ["البيانات الشخصية", "التعليم", "الخبرة", "المهارات", "إضافي", "القالب"],
      name: "الاسم الكامل", job: "المهنة / المسمى الوظيفي (اختياري)", photo: "صورة شخصية (اختياري)", pickPhoto: "اختيار صورة", rmPhoto: "حذف الصورة",
      phone: "رقم الهاتف", email: "البريد الإلكتروني", addr: "العنوان",
      school: "اسم المدرسة أو الجامعة", field: "التخصص", level: "المستوى الدراسي", from: "سنة البداية", to: "سنة التخرج",
      co: "اسم الشركة أو مكان العمل", role: "المسمى الوظيفي", period: "مدة العمل", duties: "المهام والمسؤوليات (كل مهمة في سطر)",
      comp: "مهارات الحاسوب", langs: "اللغات", prof: "المهارات المهنية", courses: "الدورات والشهادات",
      summary: "نبذة عن نفسك", objective: "الهدف المهني", hobbies: "الهوايات والاهتمامات",
      hintList: "اكتب كل عنصر مفصولاً بفاصلة أو في سطر جديد",
      add: "+ إضافة", del: "حذف", next: "التالي", back: "رجوع", clear: "مسح كل البيانات", sure: "هل أنت متأكد؟ سيتم حذف كل البيانات.",
      pick: "اختر قالباً", tplN: ["بسيط ورسمي", "عصري", "موظفين", "طلاب", "بدون خبرة"],
      zoom: "عرض أكبر", dl: "تحميل PDF", busy: "جارٍ الإنشاء...", needName: "اكتب الاسم الكامل", err: "تعذر إنشاء PDF. حاول مرة أخرى.",
      priv: "بياناتك تبقى على هاتفك ولا تُرسل إلى أي خادم.", sec: { sum: "نبذة عني", obj: "الهدف", work: "الخبرة العملية", edu: "التعليم", skills: "المهارات", langs: "اللغات", courses: "الدورات والشهادات", hob: "الهوايات", contact: "التواصل" }
    },
    en: {
      title: "Create a free CV", sub: "Build a clean, professional CV in minutes",
      steps: ["Personal", "Education", "Experience", "Skills", "More", "Template"],
      name: "Full name", job: "Job title (optional)", photo: "Photo (optional)", pickPhoto: "Choose photo", rmPhoto: "Remove photo",
      phone: "Phone number", email: "Email", addr: "Address",
      school: "School or university", field: "Field of study", level: "Level", from: "Start year", to: "End year",
      co: "Company or workplace", role: "Job title", period: "Period", duties: "Duties and responsibilities (one per line)",
      comp: "Computer skills", langs: "Languages", prof: "Professional skills", courses: "Courses and certificates",
      summary: "About you", objective: "Career objective", hobbies: "Hobbies and interests",
      hintList: "Separate items with commas or new lines",
      add: "+ Add", del: "Delete", next: "Next", back: "Back", clear: "Clear all data", sure: "Are you sure? All data will be deleted.",
      pick: "Choose a template", tplN: ["Simple & formal", "Modern", "Employee", "Student", "No experience"],
      zoom: "Larger view", dl: "Download PDF", busy: "Creating...", needName: "Enter your full name", err: "Could not create the PDF. Please try again.",
      priv: "Your data stays on your phone and is never sent to a server.", sec: { sum: "About me", obj: "Objective", work: "Experience", edu: "Education", skills: "Skills", langs: "Languages", courses: "Courses & certificates", hob: "Hobbies", contact: "Contact" }
    }
  };
  var D, step = 0, sec, hostPDF;
  var BG = [null, { c: "#1f3a5f", w: 250 }, null, null, { c: "#f3f4f6", w: 230 }];

  function L() { var l = (typeof lang === "string" && TR[lang]) ? lang : "ck"; return TR[l]; }
  function rtl() { return !(typeof lang === "string" && lang === "en"); }
  function E(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function blank() {
    return { name: "", job: "", phone: "", email: "", addr: "", photo: "", edu: [{}], work: [{}], comp: "", langs: "", prof: "", courses: "", summary: "", objective: "", hobbies: "", tpl: 0 };
  }
  function load() { try { D = Object.assign(blank(), JSON.parse(localStorage.getItem(LS) || "{}")); } catch (e) { D = blank(); } if (!D.edu || !D.edu.length) D.edu = [{}]; if (!D.work || !D.work.length) D.work = [{}]; }
  var st; function save() { clearTimeout(st); st = setTimeout(function () { try { localStorage.setItem(LS, JSON.stringify(D)); } catch (e) { } }, 250); }

  /* ---------- CV rendering ---------- */
  function items(t) { return String(t || "").split(/[\n,،;؛]+/).map(function (x) { return x.trim(); }).filter(Boolean); }
  function chips(t) { var a = items(t); return a.length ? '<div class="chips">' + a.map(function (x) { return '<span class="chip" dir="auto">' + E(x) + "</span>"; }).join("") + "</div>" : ""; }
  function lines(t) { var a = String(t || "").split(/\n+/).map(function (x) { return x.trim(); }).filter(Boolean); return a.length ? '<ul class="ul">' + a.map(function (x) { return '<li dir="auto">' + E(x) + "</li>"; }).join("") + "</ul>" : ""; }
  function has(o) { for (var k in o) if (o[k] && String(o[k]).trim()) return true; return false; }
  function blk(h, body, cls) { return body ? '<div class="blk ' + (cls || "") + '"><h3>' + E(h) + "</h3>" + body + "</div>" : ""; }
  function sb(h, body) { return body ? '<div class="sb"><h4>' + E(h) + "</h4>" + body + "</div>" : ""; }
  function contact(d) {
    var a = [];
    if (d.phone) a.push('<bdi dir="ltr">' + E(d.phone) + "</bdi>");
    if (d.email) a.push('<bdi dir="ltr">' + E(d.email) + "</bdi>");
    if (d.addr) a.push('<span dir="auto">' + E(d.addr) + "</span>");
    return a;
  }
  function contactList(d) { var a = contact(d); return a.length ? '<ul class="ct">' + a.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>" : ""; }
  function contactLine(d) { return contact(d).join('<i class="dot"></i>'); }
  function photo(d, cls) { return d.photo ? '<div class="ph ' + (cls || "") + '" style="background-image:url(' + d.photo + ')"></div>' : ""; }
  function period(e) { var f = (e.from || "").trim(), t = (e.to || "").trim(); return f && t ? f + " – " + t : f || t; }
  function eduHtml(d) {
    return d.edu.filter(has).map(function (e) {
      var sub = [e.field, e.level].filter(function (x) { return x && x.trim(); }).join(" · ");
      return '<div class="en"><div class="et" dir="auto">' + E(e.school) + "</div>" + (sub ? '<div class="es" dir="auto">' + E(sub) + "</div>" : "") + (period(e) ? '<div class="ep"><bdi dir="ltr">' + E(period(e)) + "</bdi></div>" : "") + "</div>";
    }).join("");
  }
  function workHtml(d) {
    return d.work.filter(has).map(function (e) {
      return '<div class="en"><div class="et" dir="auto">' + E(e.role) + "</div>" + (e.co ? '<div class="es" dir="auto">' + E(e.co) + "</div>" : "") + (e.period ? '<div class="ep" dir="auto">' + E(e.period) + "</div>" : "") + lines(e.duties) + "</div>";
    }).join("");
  }
  function para(t) { return t && t.trim() ? '<div class="tx" dir="auto">' + E(t.trim()) + "</div>" : ""; }
  function render(d, t, l) {
    var s = (TR[l] || TR.ck).sec, dir = l === "en" ? "ltr" : "rtl";
    var sum = blk(s.sum, para(d.summary)), obj = blk(s.obj, para(d.objective)), work = blk(s.work, workHtml(d)), edu = blk(s.edu, eduHtml(d));
    var comp = blk(s.skills, chips(d.comp) + chips(d.prof)), lg = blk(s.langs, chips(d.langs)), crs = blk(s.courses, lines(d.courses)), hob = blk(s.hob, chips(d.hobbies));
    var nm = '<h1 dir="auto">' + E(d.name) + "</h1>" + (d.job ? '<div class="jb" dir="auto">' + E(d.job) + "</div>" : "");
    var o = "";
    if (t === 0) o = '<div class="hd">' + nm + '<div class="cl">' + contactLine(d) + "</div></div>" + sum + obj + work + edu + comp + lg + crs + hob;
    else if (t === 1) o = '<div class="side">' + photo(d) + sb(s.contact, contactList(d)) + sb(s.skills, chips(d.comp) + chips(d.prof)) + sb(s.langs, chips(d.langs)) + sb(s.hob, chips(d.hobbies)) + '</div><div class="main">' + nm + sum + obj + work + edu + crs + "</div>";
    else if (t === 2) o = '<div class="bn">' + photo(d, "sq") + "<div>" + nm + '<div class="cl">' + contactLine(d) + '</div></div></div><div class="bd">' + sum + work + edu + comp + lg + crs + hob + "</div>";
    else if (t === 3) o = '<div class="hd">' + photo(d) + "<div>" + nm + '<div class="cl">' + contactLine(d) + '</div></div></div><div class="bd">' + edu + obj + comp + lg + crs + work + sum + hob + "</div>";
    else o = '<div class="side">' + photo(d) + sb(s.contact, contactList(d)) + sb(s.langs, chips(d.langs)) + sb(s.hob, chips(d.hobbies)) + '</div><div class="main">' + nm + obj + sum + comp + edu + crs + work + "</div>";
    return '<div class="cv t' + t + '" dir="' + dir + '">' + o + "</div>";
  }
  var CSS = ".cv{width:794px;min-height:1123px;box-sizing:border-box;background:#fff;color:#222;font:14px/1.6 'Segoe UI',Tahoma,Arial,'Noto Sans Arabic','Noto Sans',sans-serif;position:relative;overflow:hidden;text-align:start}" +
    ".cv *{box-sizing:border-box;letter-spacing:normal}.cv h1{margin:0;font-size:34px;line-height:1.25;font-weight:800}.cv h3,.cv h4{margin:0 0 8px;font-size:15px;font-weight:800}" +
    ".cv .jb{font-size:17px;margin-top:2px}.cv .blk{margin-bottom:18px}.cv .en{margin-bottom:11px}.cv .et{font-weight:700;font-size:14.5px}.cv .es{color:#555;font-size:13px}.cv .ep{color:#777;font-size:12.5px}" +
    ".cv .tx{white-space:pre-line;font-size:13.5px}.cv .ul{margin:4px 0 0;padding:0;list-style:none}.cv .ul li{position:relative;padding-inline-start:16px;font-size:13.5px}.cv .ul li:before{content:'';position:absolute;inset-inline-start:2px;top:9px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.55}" +
    ".cv .chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px}.cv .chip{padding:2px 11px;border-radius:12px;font-size:12.5px;background:#eef1f5;color:#333}" +
    ".cv .ph{width:130px;height:130px;border-radius:50%;background-size:cover;background-position:center;flex:none}.cv .ph.sq{border-radius:14px}.cv .ct{margin:0;padding:0;list-style:none}.cv .ct li{margin-bottom:6px;font-size:13px;word-break:break-word}" +
    ".cv .dot{display:inline-block;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.5;margin:0 10px;vertical-align:middle}.cv .cl{margin-top:8px;font-size:13px}" +
    ".cv.t0{padding:46px 52px}.cv.t0 .hd{text-align:center;border-bottom:3px solid #111;padding-bottom:16px;margin-bottom:22px}.cv.t0 h3{border-bottom:1.5px solid #bbb;padding-bottom:3px;text-transform:uppercase;letter-spacing:normal}" +
    ".cv.t1{display:flex;background:linear-gradient(to right,#1f3a5f 250px,#fff 250px);padding:0}.cv.t1[dir=rtl]{background:linear-gradient(to left,#1f3a5f 250px,#fff 250px)}.cv.t1 .side{width:250px;flex:none;color:#fff;padding:34px 22px}.cv.t1 .side .ph{margin:0 auto 22px}.cv.t1 .sb{margin-bottom:20px}.cv.t1 .sb h4{border-bottom:1px solid #ffffff55;padding-bottom:4px}.cv.t1 .chip{background:#ffffff26;color:#fff}.cv.t1 .main{flex:1;padding:40px 34px;min-width:0}.cv.t1 h1{color:#1f3a5f;margin-bottom:6px}.cv.t1 .main h3{color:#1f3a5f;border-bottom:2px solid #1f3a5f33;padding-bottom:3px}.cv.t1 .jb{color:#555;margin-bottom:18px}" +
    ".cv.t2 .bn{background:#0f766e;color:#fff;padding:34px 48px;display:flex;align-items:center;gap:24px}.cv.t2 .bd{padding:28px 48px}.cv.t2 h3{color:#0f766e;border-inline-start:5px solid #0f766e;padding-inline-start:10px}.cv.t2 .ph{width:120px;height:120px}.cv.t2 .chip{background:#e0f2f1;color:#0b4f4a}" +
    ".cv.t3 .hd{background:#fff4e0;padding:34px 48px;display:flex;align-items:center;gap:24px;border-bottom:6px solid #f28c28}.cv.t3 .bd{padding:26px 48px}.cv.t3 h3{display:inline-block;background:#f28c28;color:#fff;padding:3px 14px;border-radius:14px;font-size:14px}.cv.t3 .en{border:1px solid #f1d8b0;border-radius:10px;padding:8px 12px}.cv.t3 .chip{background:#ffe9c7;color:#6b3d00}.cv.t3 h1{color:#8a4b00}" +
    ".cv.t4{display:flex;background:linear-gradient(to right,#f3f4f6 230px,#fff 230px);padding:0}.cv.t4[dir=rtl]{background:linear-gradient(to left,#f3f4f6 230px,#fff 230px)}.cv.t4 .side{width:230px;flex:none;padding:34px 20px}.cv.t4 .side .ph{margin:0 auto 22px}.cv.t4 .sb{margin-bottom:20px}.cv.t4 .sb h4{color:#6d28d9}.cv.t4 .main{flex:1;padding:40px 34px;min-width:0}.cv.t4 h1{color:#4c1d95;margin-bottom:16px}.cv.t4 .main h3{color:#6d28d9;border-bottom:2px solid #6d28d9;display:inline-block;padding-bottom:2px}.cv.t4 .chip{background:#ede9fe;color:#4c1d95}.cv.t4 .side .chip{background:#fff}" +
    ".cvw{position:relative;overflow:hidden;border-radius:6px;background:#fff;box-shadow:0 2px 10px #0003}.cvw .cv{position:absolute;top:0;left:0;transform-origin:0 0}";

  function wrap(t, w, id) {
    var sc = w / W, h = Math.round(H * sc);
    return '<div class="cvw" ' + (id || "") + ' style="width:' + w + "px;height:" + h + 'px"><div style="position:absolute;top:0;left:0;transform:scale(' + sc + ');transform-origin:0 0;width:' + W + 'px">' + render(D, t, rtl() ? (typeof lang === "string" ? lang : "ck") : "en") + "</div></div>";
  }
  function curLang() { return typeof lang === "string" && TR[lang] ? lang : "ck"; }

  /* ---------- UI ---------- */
  function css() {
    if (document.getElementById("cvCss")) return;
    var s = document.createElement("style"); s.id = "cvCss";
    s.textContent = CSS +
      "#cvMaker{display:none}.cvh{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:4px 0 10px}.cvh h2{margin:0;font-size:18px}" +
      ".cvs{display:flex;gap:6px;margin:8px 0 14px;overflow-x:auto}.cvs button{flex:1;min-width:34px;height:34px;border-radius:17px;border:1px solid #e3dcd4;background:#fff;font-size:13px;font-weight:800;color:#6d7880;padding:0}.cvs button.on{background:#f28c28;color:#fff;border-color:#f28c28}.cvs button.ok{background:#e6f4ea;color:#1e7a3c;border-color:#bfe3c8}" +
      ".cvst{font-size:15px;font-weight:800;margin:0 0 10px}.cvf label{display:block;font-size:13px;font-weight:700;margin-top:6px;color:#2a2433}.cvf small{display:block;color:#8a929a;font-weight:400;font-size:11.5px}" +
      ".cvi{width:100%;box-sizing:border-box;padding:11px 12px;border:1px solid #e3dcd4;border-radius:12px;font-size:15px;background:#fff;margin:4px 0 8px;font-family:inherit;color:#2a2433}textarea.cvi{min-height:70px;resize:vertical}" +
      ".cvc{background:#fff;border:1px solid #e3dcd4;border-radius:14px;padding:10px 12px;margin:8px 0}.cvr{display:flex;gap:8px}.cvr>div{flex:1;min-width:0}" +
      ".cvb{display:flex;gap:8px;margin:14px 0}.cvb button{flex:1;padding:13px;border:0;border-radius:14px;font-size:15px;font-weight:800;background:#f28c28;color:#fff}.cvb button.g{background:#fff;color:#2a2433;border:1px solid #e3dcd4}.cvb button.k{background:#2a2433}" +
      ".cvx{background:#fff;color:#c62828;border:1px solid #f1c4c4!important;border-radius:10px;padding:6px 12px;font-size:12px;font-weight:700}.cvadd{width:100%;padding:11px;border:1px dashed #f28c28;border-radius:12px;background:#fff8ee;color:#b25e00;font-weight:800;font-size:14px}" +
      ".cvp{display:flex;align-items:center;gap:12px;margin:6px 0 10px}.cvp .ph{width:64px;height:64px;border-radius:50%;background:#eef1f5 center/cover}.cvp button{padding:8px 12px;border-radius:10px;border:1px solid #e3dcd4;background:#fff;font-size:13px;font-weight:700}" +
      ".cvt{display:flex;gap:10px;overflow-x:auto;padding:4px 2px 10px}.cvt>div{flex:none;text-align:center;font-size:12px;font-weight:700}.cvt .cvw{border:3px solid transparent;cursor:pointer}.cvt .sel .cvw{border-color:#f28c28}" +
      ".cvn{font-size:12px;color:#6d7880;text-align:center;margin-top:10px}#cvFull{display:none;position:fixed;inset:0;background:#000b;z-index:95;overflow:auto;padding:14px}#cvFull .x{position:fixed;top:10px;right:10px;z-index:96;background:#fff;border:0;border-radius:50%;width:38px;height:38px;font-size:18px}" +
      ".cv-cta{display:flex;align-items:center;justify-content:space-between;width:100%;margin:12px 0;padding:14px 16px;border:0;border-radius:18px;background:linear-gradient(135deg,#f28c28,#e0561f);color:#fff;font-size:16px;font-weight:800;box-shadow:0 4px 14px #f28c2855}";
    document.head.appendChild(s);
  }
  function build() {
    if (sec) return;
    css();
    sec = document.createElement("section"); sec.id = "cvMaker"; sec.style.display = "none";
    var m = document.querySelector("main"), f = document.querySelector("footer");
    m.insertBefore(sec, f);
    if (VIEWS.indexOf("cvMaker") < 0) VIEWS.push("cvMaker");
    var full = document.createElement("div"); full.id = "cvFull"; full.onclick = function (e) { if (e.target === full || e.target.className === "x") full.style.display = "none"; };
    document.body.appendChild(full);
    sec.addEventListener("input", onInput);
    sec.addEventListener("click", onClick);
  }
  function inp(k, label, o) {
    o = o || {}; var v = o.v != null ? o.v : D[k];
    var attr = o.a ? ' data-a="' + o.a + '" data-i="' + o.i + '"' : "";
    var el = o.ta ? '<textarea class="cvi" data-k="' + k + '"' + attr + (o.ph ? ' placeholder="' + E(o.ph) + '"' : "") + ">" + E(v) + "</textarea>"
      : '<input class="cvi" data-k="' + k + '"' + attr + ' value="' + E(v) + '"' + (o.t ? ' type="' + o.t + '"' : "") + (o.dir ? ' dir="' + o.dir + '"' : ' dir="auto"') + (o.im ? ' inputmode="' + o.im + '"' : "") + ">";
    return "<label>" + E(label) + (o.hint ? "<small>" + E(o.hint) + "</small>" : "") + "</label>" + el;
  }
  function body() {
    var l = L(), h = "";
    if (step === 0) {
      h += inp("name", l.name) + inp("job", l.job) +
        '<label>' + E(l.photo) + '</label><div class="cvp"><div class="ph" style="' + (D.photo ? "background-image:url(" + D.photo + ")" : "") + '"></div><button data-act="photo">' + E(l.pickPhoto) + "</button>" + (D.photo ? '<button data-act="rmphoto">' + E(l.rmPhoto) + "</button>" : "") + '<input type="file" id="cvFile" accept="image/*" style="display:none"></div>' +
        inp("phone", l.phone, { t: "tel", dir: "ltr", im: "tel" }) + inp("email", l.email, { t: "email", dir: "ltr" }) + inp("addr", l.addr);
    } else if (step === 1) {
      D.edu.forEach(function (e, i) {
        h += '<div class="cvc">' + inp("school", l.school, { a: "edu", i: i, v: e.school }) + inp("field", l.field, { a: "edu", i: i, v: e.field }) + inp("level", l.level, { a: "edu", i: i, v: e.level }) +
          '<div class="cvr"><div>' + inp("from", l.from, { a: "edu", i: i, v: e.from, im: "numeric", dir: "ltr" }) + "</div><div>" + inp("to", l.to, { a: "edu", i: i, v: e.to, im: "numeric", dir: "ltr" }) + "</div></div>" +
          (D.edu.length > 1 ? '<button class="cvx" data-act="deledu" data-i="' + i + '">' + E(l.del) + "</button>" : "") + "</div>";
      });
      h += '<button class="cvadd" data-act="addedu">' + E(l.add) + "</button>";
    } else if (step === 2) {
      D.work.forEach(function (e, i) {
        h += '<div class="cvc">' + inp("co", l.co, { a: "work", i: i, v: e.co }) + inp("role", l.role, { a: "work", i: i, v: e.role }) + inp("period", l.period, { a: "work", i: i, v: e.period }) + inp("duties", l.duties, { a: "work", i: i, v: e.duties, ta: 1 }) +
          (D.work.length > 1 ? '<button class="cvx" data-act="delwork" data-i="' + i + '">' + E(l.del) + "</button>" : "") + "</div>";
      });
      h += '<button class="cvadd" data-act="addwork">' + E(l.add) + "</button>";
    } else if (step === 3) {
      h += inp("comp", l.comp, { ta: 1, hint: l.hintList }) + inp("langs", l.langs, { ta: 1, hint: l.hintList }) + inp("prof", l.prof, { ta: 1, hint: l.hintList }) + inp("courses", l.courses, { ta: 1, hint: l.hintList });
    } else if (step === 4) {
      h += inp("summary", l.summary, { ta: 1 }) + inp("objective", l.objective, { ta: 1 }) + inp("hobbies", l.hobbies, { ta: 1, hint: l.hintList });
    } else {
      h += '<div class="cvst">' + E(l.pick) + '</div><div class="cvt">' + [0, 1, 2, 3, 4].map(function (t) { return '<div data-act="tpl" data-t="' + t + '" class="' + (D.tpl === t ? "sel" : "") + '">' + wrap(t, 150) + "<div>" + E(l.tplN[t]) + "</div></div>"; }).join("") + "</div>" +
        '<div id="cvBig" data-act="zoom">' + wrap(D.tpl, Math.min(380, (sec.clientWidth || 340))) + '</div><div class="cvb"><button class="g" data-act="zoom">🔍 ' + E(l.zoom) + '</button><button class="k" id="cvDl" data-act="dl">⬇️ ' + E(l.dl) + "</button></div>";
    }
    return h;
  }
  function paint() {
    var l = L(), bar = "";
    for (var i = 0; i < 6; i++) bar += '<button data-act="go" data-i="' + i + '" class="' + (i === step ? "on" : i < step ? "ok" : "") + '">' + (i + 1) + "</button>";
    var nav = step < 5 ? '<div class="cvb">' + (step > 0 ? '<button class="g" data-act="prev">' + E(l.back) + '</button>' : "") + '<button data-act="next">' + E(l.next) + "</button></div>" : '<div class="cvb"><button class="g" data-act="prev">' + E(l.back) + "</button></div>";
    sec.innerHTML = '<div class="cvh"><h2>🧾 ' + E(l.title) + '</h2><button class="back" data-act="exit">← ' + E(l.back) + '</button></div><div class="cvn" style="margin:0 0 6px">' + E(l.sub) + '</div><div class="cvs">' + bar + '</div><div class="cvst">' + (step + 1) + " / 6 — " + E(l.steps[step]) + '</div><div class="cvf">' + body() + "</div>" + nav +
      '<div class="cvn">🔒 ' + E(l.priv) + '</div>' + (step === 0 ? '<div class="cvn"><button class="cvx" data-act="clear">' + E(l.clear) + "</button></div>" : "");
    sec.dir = rtl() ? "rtl" : "ltr";
  }
  function onInput(e) {
    var t = e.target; if (!t.dataset || !t.dataset.k) return;
    if (t.dataset.a) D[t.dataset.a][+t.dataset.i][t.dataset.k] = t.value; else D[t.dataset.k] = t.value;
    save();
  }
  function go(n) { step = n; paint(); window.scrollTo(0, 0); }
  function toast2(m) { if (typeof toast === "function") toast(m); else alert(m); }
  function onClick(e) {
    var b = e.target.closest("[data-act]"); if (!b) return;
    var a = b.dataset.act, i = +b.dataset.i;
    if (a === "exit") { show("services"); if (typeof renderSvc === "function") renderSvc(); }
    else if (a === "go") { if (i > 0 && !(D.name || "").trim()) { toast2(L().needName); return; } go(i); }
    else if (a === "next") { if (step === 0 && !(D.name || "").trim()) { toast2(L().needName); return; } go(step + 1); }
    else if (a === "prev") go(step - 1);
    else if (a === "addedu") { D.edu.push({}); save(); paint(); }
    else if (a === "addwork") { D.work.push({}); save(); paint(); }
    else if (a === "deledu") { D.edu.splice(i, 1); save(); paint(); }
    else if (a === "delwork") { D.work.splice(i, 1); save(); paint(); }
    else if (a === "photo") { var f = document.getElementById("cvFile"); f.onchange = pickPhoto; f.click(); }
    else if (a === "rmphoto") { D.photo = ""; save(); paint(); }
    else if (a === "clear") { if (confirm(L().sure)) { D = blank(); try { localStorage.removeItem(LS); } catch (x) { } go(0); } }
    else if (a === "tpl") { D.tpl = +b.dataset.t; save(); paint(); }
    else if (a === "zoom") { var fl = document.getElementById("cvFull"); fl.innerHTML = '<button class="x">✕</button>' + wrap(D.tpl, 720); fl.style.display = "block"; }
    else if (a === "dl") makePDF(b);
  }
  function pickPhoto(ev) {
    var f = ev.target.files && ev.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      var im = new Image();
      im.onload = function () {
        var s = Math.min(im.width, im.height), c = document.createElement("canvas"); c.width = c.height = 360;
        c.getContext("2d").drawImage(im, (im.width - s) / 2, (im.height - s) / 2, s, s, 0, 0, 360, 360);
        D.photo = c.toDataURL("image/jpeg", 0.85); save(); paint();
      };
      im.src = r.result;
    };
    r.readAsDataURL(f);
  }

  /* ---------- PDF ---------- */
  function loadH2C() {
    return new Promise(function (res, rej) {
      if (window.html2canvas) return res();
      var s = document.createElement("script"); s.src = "/html2canvas.min.js"; s.onload = res; s.onerror = rej; document.head.appendChild(s);
    });
  }
  function buildPDF(pages) {
    var enc = function (s) { return new TextEncoder().encode(s); }, chunks = [], offs = [], len = 0;
    var put = function (b) { chunks.push(b); len += b.length; };
    var obj = function (n, parts) { offs[n] = len; put(enc(n + " 0 obj\n")); parts.forEach(put); put(enc("\nendobj\n")); };
    var n = pages.length;
    put(enc("%PDF-1.4\n"));
    obj(1, [enc("<< /Type /Catalog /Pages 2 0 R >>")]);
    obj(2, [enc("<< /Type /Pages /Count " + n + " /Kids [" + pages.map(function (_, i) { return (3 + 3 * i) + " 0 R"; }).join(" ") + "] >>")]);
    pages.forEach(function (p, i) {
      var pn = 3 + 3 * i, cn = 4 + 3 * i, im = 5 + 3 * i, cs = "q 595.28 0 0 841.89 0 0 cm /Im0 Do Q";
      obj(pn, [enc("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 " + im + " 0 R >> >> /Contents " + cn + " 0 R >>")]);
      obj(cn, [enc("<< /Length " + cs.length + " >>\nstream\n" + cs + "\nendstream")]);
      obj(im, [enc("<< /Type /XObject /Subtype /Image /Width " + p.w + " /Height " + p.h + " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " + p.jpg.length + " >>\nstream\n"), p.jpg, enc("\nendstream")]);
    });
    var xr = len, total = 3 * n + 3, x = "xref\n0 " + total + "\n0000000000 65535 f \n";
    for (var k = 1; k < total; k++) x += String(offs[k]).padStart(10, "0") + " 00000 n \n";
    put(enc(x + "trailer\n<< /Size " + total + " /Root 1 0 R >>\nstartxref\n" + xr + "\n%%EOF"));
    return new Blob(chunks, { type: "application/pdf" });
  }
  function cuts(host, total) {
    var base = host.getBoundingClientRect().top, pts = [];
    host.querySelectorAll(".en,.blk").forEach(function (el) {
      if (el.closest(".side")) return;
      pts.push(Math.round(el.getBoundingClientRect().bottom - base));
    });
    pts.sort(function (a, b) { return a - b; });
    var M = 40, pages = [], pos = 0, first = true;
    while (pos < total - 2) {
      var cap = first ? H : H - 2 * M, end = pos + cap;
      if (end >= total) { pages.push([pos, total, first ? 0 : M]); break; }
      var best = 0;
      pts.forEach(function (p) { if (p <= end && p > pos + cap * 0.4 && p > best) best = p; });
      if (!best) best = end;
      pages.push([pos, best, first ? 0 : M]); pos = best; first = false;
    }
    return pages.length ? pages : [[0, total, 0]];
  }
  function toBlob(c) { return new Promise(function (r) { c.toBlob(r, "image/jpeg", 0.92); }); }
  async function makePDF(btn) {
    if (!(D.name || "").trim()) { toast2(L().needName); return; }
    var old = btn.innerHTML; btn.innerHTML = "⏳ " + E(L().busy); btn.disabled = true;
    var host;
    try {
      await loadH2C();
      host = document.createElement("div");
      host.style.cssText = "position:absolute;top:0;left:0;width:" + W + "px;z-index:-1";
      host.innerHTML = render(D, D.tpl, curLang());
      document.body.appendChild(host);
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      var el = host.firstChild, total = Math.max(H, Math.ceil(el.scrollHeight));
      var plan = cuts(el, total);
      var cv = await window.html2canvas(el, { scale: 2, backgroundColor: "#ffffff", useCORS: true, scrollX: 0, scrollY: 0, width: W, height: total, windowWidth: W });
      var bg = BG[D.tpl], isR = rtl(), pages = [];
      for (var i = 0; i < plan.length; i++) {
        var p = plan[i], pc = document.createElement("canvas"); pc.width = W * 2; pc.height = H * 2;
        var cx = pc.getContext("2d"); cx.fillStyle = "#fff"; cx.fillRect(0, 0, pc.width, pc.height);
        if (bg) { cx.fillStyle = bg.c; cx.fillRect(isR ? pc.width - bg.w * 2 : 0, 0, bg.w * 2, pc.height); }
        cx.drawImage(cv, 0, p[0] * 2, W * 2, (p[1] - p[0]) * 2, 0, p[2] * 2, W * 2, (p[1] - p[0]) * 2);
        var blob = await toBlob(pc), buf = new Uint8Array(await blob.arrayBuffer());
        pages.push({ jpg: buf, w: pc.width, h: pc.height });
      }
      var pdf = buildPDF(pages), url = URL.createObjectURL(pdf), a = document.createElement("a");
      a.href = url; a.download = "CV.pdf"; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
    } catch (e) { toast2(L().err); }
    if (host) host.remove();
    btn.innerHTML = old; btn.disabled = false;
  }

  window.CV = {
    open: function () { build(); load(); step = 0; show("cvMaker"); paint(); window.scrollTo(0, 0); },
    relang: function () { if (sec && sec.style.display === "block") paint(); },
    label: function () { return L().title; },
    _render: render, _D: function () { return D; }, _set: function (d) { D = Object.assign(blank(), d); }
  };
})();
