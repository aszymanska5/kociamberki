(function () {
  "use strict";
  var CMS = window.KOCIAMBERKI_CMS;
  if (!CMS) return;
  var app = document.getElementById("app");
  var footer = document.getElementById("site-footer");
  var modalRoot = document.getElementById("modal-root");
  var cookieBanner = document.getElementById("cookie-banner");
  var toastNode = document.getElementById("toast");
  var mobileMenu = document.getElementById("mobile-menu");
  var quizIndex = 0, quizAnswers = [], quizResults = null;
  var activeGalleryIndex = 0, activeGalleryCat = null, tinderIndex = 0, tinderMode = false, tinderStartX = null;
  var filters = { status: "all", sex: "all", age: "all" };
  var toastTimer, currentRoute = "start";
  var routes = {
    start: 1, adopcja: 1, "koci-mikolaj": 1, adoptowane: 1, "teczowy-most": 1,
    "dom-staly": 1, "dom-tymczasowy": 1, "pomoc-rzeczowa": 1, "ocalone-lapki": 1,
    bazarek: 1, "wsparcie-finansowe": 1, podatek: 1, wolontariat: 1,
    aktualnosci: 1, kontakt: 1, quiz: 1, "polityka-prywatnosci": 1
  };
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }
  function attr(value) { return esc(value); }
  function routeName() { return (location.hash || "#start").slice(1).split("?")[0] || "start"; }
  function catById(id) { return CMS.cats.find(function (cat) { return cat.id === id; }); }
  function ageText(months) {
    if (months < 12) {
      if (months === 1) return "1 miesiąc";
      if (months >= 2 && months <= 4) return months + " miesiące";
      return months + " miesięcy";
    }
    var years = Math.floor(months / 12);
    if (years === 1) return "1 rok";
    if (years % 10 >= 2 && years % 10 <= 4 && !(years % 100 >= 12 && years % 100 <= 14)) return years + " lata";
    return years + " lat";
  }
  function labelStatus(status) { return status === "urgent" ? "Pilnie do adopcji" : status === "foster" ? "Szukam domu tymczasowego" : "Do adopcji"; }
  function formatDate(date) { return new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date + "T12:00:00")); }
  function announce(message) {
    toastNode.textContent = message;
    toastNode.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastNode.classList.remove("show"); }, 3000);
  }
  function external(url, label, classes) {
    if (!url) return '<a class="' + (classes || "button") + '" href="#kontakt">' + esc(label) + "</a>";
    return '<a class="' + (classes || "button") + '" href="' + attr(url) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + "</a>";
  }
  function formOrSocial(formKey, label) {
    return external(CMS.siteSettings.links[formKey] || CMS.siteSettings.socialLinks[0].url, label, "button");
  }
  function socialLinksMarkup(items) {
    return items.filter(function (item) { return item.url; }).map(function (item) {
      var key = item.label.toLowerCase();
      var icon = key === "instagram" ? "fa-instagram" : key === "facebook" ? "fa-facebook-f" : "fa-arrow-up-right-from-square";
      var style = key === "instagram" ? "instagram" : key === "facebook" ? "facebook" : "generic";
      return '<a class="social-chip social-' + style + '" href="' + attr(item.url) + '" target="_blank" rel="noopener noreferrer" aria-label="Otwórz ' + esc(item.label) + (item.handle ? ": " + esc(item.handle) : "") + '"><i class="fa-brands ' + icon + '" aria-hidden="true"></i><span>' + esc(item.label) + '</span><i class="fa-solid fa-arrow-up-right-from-square social-external" aria-hidden="true"></i></a>';
    }).join("");
  }
  function activeCats() { return CMS.cats.filter(function (cat) { return ["urgent", "adoption", "foster"].indexOf(cat.status) !== -1; }); }
  function catCard(cat) {
    var statusClass = cat.status === "urgent" ? "urgent" : cat.status === "foster" ? "foster" : "";
    var icon = cat.status === "urgent" ? "fa-triangle-exclamation" : cat.status === "foster" ? "fa-house" : "fa-paw";
    return '<article class="cat-card ' + statusClass + '"><div class="cat-card-top"><span class="status-badge ' + statusClass + '"><i class="fa-solid ' + icon + '"></i> ' + esc(labelStatus(cat.status)) + '</span><span aria-hidden="true">🐾</span></div>' +
      '<img class="cat-photo" src="' + attr(cat.photo) + '" alt="Portret kota o imieniu ' + esc(cat.name) + '" loading="lazy"><h3>' + esc(cat.name) + '</h3><p class="cat-intro">' + esc(cat.sexLabel || "Lorem ipsum") + " · " + esc(cat.ageLabel || "Lorem ipsum") + '</p><div class="cat-meta"><div class="meta-item"><span class="meta-label">Badania</span><span class="meta-value">' + esc(cat.fivfelv) + '</span></div><div class="meta-item"><span class="meta-label">Towarzystwo</span><span class="meta-value">' + esc(cat.company) + "</span></div></div>" +
      '<div class="cat-card-actions"><a class="button ghost small" href="#kot/' + attr(cat.id) + '"><i class="fa-regular fa-heart"></i> Poznaj bliżej</a><button class="button small" data-action="adopt" data-cat="' + attr(cat.id) + '">Chcę dać dom</button></div></article>';
  }
  function newsCard(item) {
    return '<article class="news-card"><img src="' + attr(item.image) + '" alt="" loading="lazy"><div class="news-body"><div class="news-meta"><span>' + esc(item.category) + "</span><span>·</span><time datetime=\"" + attr(item.date) + '">' + esc(formatDate(item.date)) + "</time></div><h3>" + esc(item.title) + "</h3><p>" + esc(item.excerpt) + '</p><a class="text-link" href="#aktualnosci">Czytaj więcej <i class="fa-solid fa-arrow-right"></i></a></div></article>';
  }
  function footerMarkup() {
    var s = CMS.siteSettings;
    return '<div class="container"><div class="footer-grid"><div><div class="footer-brand"><img class="brand-logo footer-logo" src="assets/logo-kociamberki.png" alt=""><span><span class="brand-name">' + esc(s.name) + '</span><span class="brand-sub">MRUCZĄCA PRZYSTAŃ · POZNAŃ</span></span></div><p class="footer-copy">' + esc(s.tagline) + ' Dziękujemy, że jesteś częścią tej historii.</p><div class="social-row">' + socialLinksMarkup(s.socialLinks) + '</div></div><div><h3 class="footer-heading">Dane stowarzyszenia</h3><div class="footer-links"><span>NIP: ' + esc(s.nip) + " · REGON: " + esc(s.regon) + '</span></div></div><div><h3 class="footer-heading">Kocie sprawy</h3><div class="footer-links"><a href="#adopcja">Poznaj koty</a><a href="#dom-tymczasowy">Zostań domem tymczasowym</a><a href="#pomoc-rzeczowa">Lista potrzeb</a><a href="#wolontariat">Dołącz do wolontariatu</a><a href="#polityka-prywatnosci">Polityka prywatności</a></div></div></div><div class="footer-bottom"><span>© ' + new Date().getFullYear() + " " + esc(s.name) + '</span><span>Uszy do góry. Łapki w dobrych rękach. <i class="fa-solid fa-heart" style="color:#f4a261"></i></span></div></div>';
  }
  function pageHero(eyebrow, title, intro) {
    return '<section class="page-hero"><div class="container"><div class="section-label">' + esc(eyebrow) + '</div><h1>' + esc(title) + "</h1><p>" + esc(intro) + "</p></div></section>";
  }
  function homeView() {
    var copy = CMS.pagesContent.home;
    var urgent = CMS.cats.filter(function (cat) { return cat.status === "urgent"; });
    var latest = CMS.news.slice().sort(function (a, b) { return b.date.localeCompare(a.date); }).slice(0, 3);
    return '<section class="hero"><div class="container hero-grid"><div><span class="eyebrow">' + esc(copy.eyebrow) + '</span><h1>' + esc(copy.title).replace(". ", ".<br><em>") + "</em></h1><p class=\"hero-copy\">" + esc(copy.intro) + '</p><div class="hero-actions"><a href="#adopcja" class="button"><i class="fa-solid fa-paw"></i> Poznaj koty</a><a href="#pomoc-rzeczowa" class="button ghost"><i class="fa-solid fa-box-open"></i> Pomóż po swojemu</a></div><div class="hero-trust"><span class="avatar-stack"><img src="' + attr(CMS.cats[0].photo) + '" alt=""><img src="' + attr(CMS.cats[5].photo) + '" alt=""><img src="' + attr(CMS.cats[2].photo) + '" alt=""></span><span>' + esc(copy.trustLine) + '</span></div></div><div class="hero-photo-wrap"><img class="hero-photo" src="' + attr(CMS.cats[0].photo) + '" alt="Kot z Mruczącej Przystani"><div class="hero-sticker"><i class="fa-solid fa-heart"></i><span>Adopcja zmienia<br>dwie historie naraz</span></div><div class="hero-note">tu mruczy się bezpiecznie ✨</div></div></div></section>' +
      '<section class="section compact"><div class="container"><div class="section-head"><div><div class="section-label">Czekają na Ciebie</div><h2>' + esc(copy.urgentTitle) + '</h2><p>' + esc(copy.urgentIntro) + '</p></div><a href="#adopcja" class="text-link">Zobacz wszystkich <i class="fa-solid fa-arrow-right"></i></a></div><div class="cards-grid">' + urgent.map(catCard).join("") + "</div></div></section>" +
      '<section class="section"><div class="container"><div class="quiz-banner"><div><h3>' + esc(copy.quizTitle) + '</h3><p>' + esc(copy.quizIntro) + '</p></div><a class="button" href="#quiz"><i class="fa-solid fa-wand-magic-sparkles"></i> Zrób quiz doboru</a></div></div></section>' +
      '<section class="section soft-section"><div class="container"><div class="split-card"><img class="split-photo" src="' + attr(CMS.cats[5].photo) + '" alt="Kot odpoczywa w ciepłym domu" loading="lazy"><div class="split-content"><div class="section-label">' + esc(copy.supportEyebrow) + '</div><h2>' + esc(copy.supportTitle) + '</h2><p>' + esc(copy.supportIntro) + '</p><ul class="feature-list">' + copy.supportWays.map(function (way) { return '<li><i class="fa-solid fa-circle-check"></i><span>' + esc(way) + "</span></li>"; }).join("") + '</ul><a class="button amber" href="#pomoc-rzeczowa">' + esc(copy.supportAction) + ' <i class="fa-solid fa-arrow-right"></i></a></div></div></div></section>' +
      '<section class="section"><div class="container"><div class="section-head"><div><div class="section-label">Z przystani</div><h2>' + esc(copy.newsTitle) + '</h2><p>' + esc(copy.newsIntro) + '</p></div><a href="#aktualnosci" class="text-link">Wszystkie aktualności <i class="fa-solid fa-arrow-right"></i></a></div><div class="news-grid">' + latest.map(newsCard).join("") + "</div></div></section>";
  }
  function getFilteredCats() {
    return activeCats().filter(function (cat) {
      if (filters.status !== "all" && cat.status !== filters.status) return false;
      if (filters.sex !== "all" && cat.sex !== filters.sex) return false;
      if (filters.age === "young" && cat.ageMonths > 24) return false;
      if (filters.age === "adult" && cat.ageMonths <= 24) return false;
      return true;
    });
  }
  function tinderView() {
    var deck = activeCats().slice().sort(function (a, b) {
      var order = { urgent: 0, adoption: 1, foster: 2 };
      return order[a.status] - order[b.status];
    });
    if (!deck.length) return '<div class="empty-state">Na razie nie ma tu kotów do pokazania. Zajrzyj za chwilę.</div>';
    if (tinderIndex >= deck.length) tinderIndex = 0;
    var cat = deck[tinderIndex];
    return '<div class="tinder-wrap"><article class="tinder-card" id="tinder-card"><img class="tinder-photo" src="' + attr(cat.photo) + '" alt="Kot ' + esc(cat.name) + '" loading="lazy"><div class="tinder-content"><div class="tinder-title"><h3>' + esc(cat.name) + '</h3><span>' + esc(cat.ageLabel || "Lorem ipsum") + " · " + esc(cat.sexLabel || "Lorem ipsum") + '</span></div><div class="cat-meta"><div class="meta-item"><span class="meta-label">Status</span><span class="meta-value">' + esc(labelStatus(cat.status)) + '</span></div><div class="meta-item"><span class="meta-label">Towarzystwo</span><span class="meta-value">' + esc(cat.company) + '</span></div></div><p class="tinder-bio">“' + esc(cat.bioTag || "Lorem ipsum") + '”</p><div class="tinder-actions"><button class="button ghost" data-action="next-cat">⏮️ Następny Kociamber</button><a class="button amber" href="#kot/' + attr(cat.id) + '"><i class="fa-solid fa-magnifying-glass"></i> Poznaj bliżej</a><button class="button match" data-action="match" data-cat="' + attr(cat.id) + '"><i class="fa-solid fa-heart"></i> Mruczący match!</button></div></div></article><p class="cat-intro" style="margin-top:14px">Przesuń zdjęcie w lewo, aby pominąć, lub w prawo, aby dać serduszko · karta ' + (tinderIndex + 1) + " z " + deck.length + "</p></div>";
  }
  function adoptionView() {
    var filtered = getFilteredCats();
    var controls = '<div class="filter-panel"><div class="filter-control"><label for="filter-status">Status</label><select id="filter-status"><option value="all">Wszystkie</option><option value="urgent">Do pilnej adopcji</option><option value="adoption">Do adopcji</option><option value="foster">Szukające DT</option></select></div><div class="filter-control"><label for="filter-sex">Płeć</label><select id="filter-sex"><option value="all">Wszystkie</option><option value="Kocur">Kocur ♂️</option><option value="Kotka">Kotka ♀️</option></select></div><div class="filter-control"><label for="filter-age">Wiek</label><select id="filter-age"><option value="all">Wszystkie</option><option value="young">Do 2 lat</option><option value="adult">Powyżej 2 lat</option></select></div><span class="filter-count">Kociamberków: ' + filtered.length + '</span><div class="view-switch"><button data-action="tiles" class="' + (tinderMode ? "" : "active") + '">🔲 Widok kafelków</button><button data-action="tinder" class="' + (tinderMode ? "active" : "") + '">🔥 Koci Tinder</button></div></div>';
    var listing = "";
    if (tinderMode) listing = tinderView();
    else if (!filtered.length) listing = '<div class="empty-state">Nie znaleźliśmy kota dla tych filtrów. Spróbuj zmienić wybór.</div>';
    else if (filters.status === "all") {
      var groups = [{ status: "urgent", title: "🚨 Do pilnej adopcji" }, { status: "adoption", title: "🐾 Do adopcji" }, { status: "foster", title: "🏡 Szukające domu tymczasowego (DT)" }];
      listing = groups.map(function (group) {
        var items = filtered.filter(function (cat) { return cat.status === group.status; });
        return items.length ? '<section class="cat-group"><h2 class="group-heading">' + group.title + ' <span>' + items.length + " podopiecznych</span></h2><div class=\"cards-grid\">" + items.map(catCard).join("") + "</div></section>" : "";
      }).join("");
    } else listing = '<div class="cards-grid">' + filtered.map(catCard).join("") + "</div>";
    var copy = CMS.pagesContent.cats;
    return pageHero(copy.eyebrow, copy.title, copy.intro) +
      '<section class="section compact"><div class="container"><div class="quiz-banner"><div><h3>Dobierz kota do swojego stylu życia</h3><p>Empatyczny quiz poleca także koty, które potrzebują cierpliwego, spokojnego domu.</p></div><a class="button" href="#quiz"><i class="fa-solid fa-wand-magic-sparkles"></i> Uruchom quiz</a></div>' + controls + '<div id="cats-listing">' + listing + "</div></div></section>";
  }
  var quizQuestions = CMS.pagesContent.quiz.questions;
  function calculateQuiz() {
    var selectedTags = [];
    quizAnswers.forEach(function (choice, index) {
      if (quizQuestions[index] && quizQuestions[index].options[choice]) selectedTags = selectedTags.concat(quizQuestions[index].options[choice].tags);
    });
    var eligible = CMS.cats.filter(function (cat) { return ["urgent", "adoption"].indexOf(cat.status) !== -1; });
    var ranked = eligible.map(function (cat) {
      var score = cat.tags.reduce(function (sum, tag) {
        var count = selectedTags.filter(function (item) { return item === tag; }).length;
        return sum + count * (tag === "cierpliwosc" && cat.quizShy ? 1.35 : 1);
      }, 0);
      return { cat: cat, score: score };
    }).sort(function (a, b) { return b.score - a.score; });
    var first = ranked[0] || { cat: eligible[0], score: 0 };
    var gentle = eligible.find(function (cat) { return cat.id === "mglka"; });
    if (first.cat.id === "mglka") first = ranked.find(function (entry) { return entry.cat.id !== "mglka"; }) || first;
    var third = ranked.find(function (entry) { return entry.cat.id !== first.cat.id && entry.cat.id !== (gentle && gentle.id); }) || ranked.find(function (entry) { return entry.cat.id !== first.cat.id; }) || first;
    quizResults = [
      { label: CMS.pagesContent.quiz.resultLabels[0], cat: first.cat, text: CMS.pagesContent.quiz.resultExplanations[0] },
      { label: CMS.pagesContent.quiz.resultLabels[1], cat: gentle || third.cat, text: CMS.pagesContent.quiz.resultExplanations[1] },
      { label: CMS.pagesContent.quiz.resultLabels[2], cat: third.cat, text: CMS.pagesContent.quiz.resultExplanations[2] }
    ];
    if (quizResults[1].cat.id === quizResults[0].cat.id) quizResults[0].cat = ranked.find(function (entry) { return entry.cat.id !== quizResults[1].cat.id; }).cat;
    if (quizResults[2].cat.id === quizResults[0].cat.id || quizResults[2].cat.id === quizResults[1].cat.id) {
      var alternate = ranked.find(function (entry) { return entry.cat.id !== quizResults[0].cat.id && entry.cat.id !== quizResults[1].cat.id; });
      if (alternate) quizResults[2].cat = alternate.cat;
    }
  }
  function quizView() {
    if (quizResults) return quizResultsView();
    var question = quizQuestions[quizIndex];
    var progress = Math.round(((quizIndex + 1) / quizQuestions.length) * 100);
    var copy = CMS.pagesContent.quiz;
    return pageHero(copy.eyebrow, copy.title, copy.intro) +
      '<section class="section compact"><div class="container"><div class="quiz-panel"><div style="display:flex;justify-content:space-between;gap:10px;color:#858985;font-size:12px;font-weight:700"><span>Pytanie ' + (quizIndex + 1) + " z " + quizQuestions.length + '</span><span>Spokojnie, bez złych odpowiedzi</span></div><div class="quiz-progress"><span style="width:' + progress + '%"></span></div><h2 class="quiz-question">' + esc(question.text) + '</h2><div class="quiz-options">' + question.options.map(function (option, index) {
        return '<label class="quiz-option"><input type="radio" name="quiz-answer" value="' + index + '"' + (quizAnswers[quizIndex] === index ? " checked" : "") + '><span>' + esc(option.label) + "</span></label>";
      }).join("") + '</div><div class="quiz-controls"><button class="button ghost" data-action="quiz-prev"' + (quizIndex === 0 ? " disabled" : "") + '>← Wstecz</button><button class="button" data-action="quiz-next">' + (quizIndex === quizQuestions.length - 1 ? "Pokaż moje dopasowania" : "Dalej →") + "</button></div></div></div></section>";
  }
  function quizResultsView() {
    var copy = CMS.pagesContent.quiz;
    return pageHero("Twoja kocia trójka", copy.resultsTitle, copy.resultsIntro) +
      '<section class="section compact"><div class="container"><div class="quiz-panel"><div class="quiz-results">' + quizResults.map(function (result) {
        return '<article class="quiz-result"><img src="' + attr(result.cat.photo) + '" alt="Kot ' + esc(result.cat.name) + '"><div><span class="quiz-result-label">' + esc(result.label) + '</span><h4>' + esc(result.cat.name) + " · " + esc(result.cat.ageLabel || "Lorem ipsum") + '</h4><p>' + esc(result.text) + '</p><a class="text-link" style="margin-top:8px" href="#kot/' + attr(result.cat.id) + '">Poznaj profil <i class="fa-solid fa-arrow-right"></i></a></div></article>';
      }).join("") + '</div><div class="quiz-controls"><button class="button ghost" data-action="quiz-reset">← Zacznij od nowa</button><a href="#adopcja" class="button">Zobacz wszystkie koty</a></div></div></div></section>';
  }
  function adoptionContentView() {
    var c = CMS.pagesContent.adoption;
    return pageHero(c.eyebrow, c.title, c.intro) +
      '<section class="section compact"><div class="container"><div class="content-card"><h3>Jak wygląda adopcja?</h3><ol class="step-list">' + c.steps.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ol></div><div class="content-columns"><div class="content-card"><h3>Dobre przygotowanie</h3><ul class="check-list">' + c.requirements.map(function (x) { return '<li><i class="fa-solid fa-circle-check"></i><span>' + esc(x) + "</span></li>"; }).join("") + '</ul></div><div class="content-card"><h3>Masz pytania?</h3><p style="color:#737875;font-size:14px;line-height:1.7">Napisz do nas na Instagramie. Opowiemy o kotach i wspólnie ustalimy, jaki będzie kolejny krok.</p>' + external(CMS.siteSettings.socialLinks[0].url, "Porozmawiajmy na Instagramie", "button") + "</div></div></div></section>";
  }
  function fosterContentView() {
    var c = CMS.pagesContent.foster;
    return pageHero(c.eyebrow, c.title, c.intro) +
      '<section class="section compact"><div class="container"><div class="content-columns"><div class="content-card"><h3>Co zapewnia fundacja?</h3><ul class="check-list">' + c.provides.map(function (x) { return '<li><i class="fa-solid fa-circle-check"></i><span>' + esc(x) + "</span></li>"; }).join("") + '</ul></div><div class="content-card"><h3>Czego potrzebuje kot?</h3><ul class="check-list">' + c.caregiver.map(function (x) { return '<li><i class="fa-solid fa-heart"></i><span>' + esc(x) + "</span></li>"; }).join("") + '</ul></div></div><div class="quiz-banner" style="margin-top:18px"><div><h3>Podaruj komuś bezpieczny start</h3><p>Opowiedz nam o swoim domu, a wspólnie dobierzemy kota i zakres wsparcia.</p></div>' + formOrSocial("temporaryHomeForm", "Zapytaj o dom tymczasowy") + "</div></div></section>";
  }
  function physicalView() {
    var c = CMS.pagesContent.physical;
    var needs = c.needs.map(function (need) {
      var examples = (need.examples || []).map(function (example) { return '<li><i class="fa-solid fa-star" aria-hidden="true"></i><span>' + esc(example) + "</span></li>"; }).join("");
      return '<article class="need-card"><div class="need-visual"><img src="' + attr(need.image || "") + '" alt="" loading="lazy"></div><div class="need-card-content"><h3>' + esc(need.name) + '</h3><p>' + esc(need.note) + '</p><ul class="need-examples">' + examples + "</ul></div></article>";
    }).join("");
    return pageHero(c.eyebrow, c.title, c.intro) +
      '<section class="section compact"><div class="container"><div class="needs-heading"><div class="section-label">Lista potrzeb</div><h2>Co przyda się w kociarni?</h2><p>To przykłady rzeczy, które pomagają nam dbać o codzienny komfort podopiecznych. Aktualną potrzebę konkretnego produktu możesz potwierdzić w wiadomości na Facebooku lub Instagramie.</p></div><div class="need-grid">' + needs + '</div><div class="drop-box"><div class="section-label">Pudełko pełne dobra</div><h2 style="margin:0;font-size:25px;letter-spacing:-.04em">Gdzie wysłać paczkę?</h2>' + CMS.siteSettings.dropPoints.map(function (drop) {
        var detail = drop.detail ? " · " + drop.detail : "";
        var copy = drop.name + ": " + drop.address + detail;
        return '<div class="drop-row"><div><strong>' + esc(drop.name) + '</strong><span>' + esc(drop.address + detail) + '</span></div><button class="button ghost small" data-action="copy" data-copy="' + attr(copy) + '"><i class="fa-regular fa-copy"></i> Kopiuj dane</button></div>';
      }).join("") + '<p style="margin:12px 0 0;color:#766c62;font-size:12px;line-height:1.6">' + esc(c.courierNote) + "</p></div></div></section>";
  }
  function seasonalView() {
    var copy = CMS.pagesContent.santa;
    var cats = CMS.cats.filter(function (cat) { return cat.seasonal && ["urgent", "adoption", "foster"].indexOf(cat.status) !== -1; });
    return pageHero(copy.eyebrow, copy.title, copy.intro) +
      '<section class="section compact"><div class="container"><div class="cards-grid">' + cats.map(function (cat) {
        return '<article class="cat-card ' + (cat.status === "urgent" ? "urgent" : cat.status === "foster" ? "foster" : "") + '"><span class="status-badge"><i class="fa-solid fa-gift"></i> Koci Mikołaj</span><img class="cat-photo" src="' + attr(cat.photo) + '" alt="Kot ' + esc(cat.name) + '" loading="lazy"><h3><a href="#kot/' + attr(cat.id) + '">' + esc(cat.name) + '</a></h3><p class="cat-intro">' + esc(cat.sexLabel || "Lorem ipsum") + " · " + esc(cat.ageLabel || "Lorem ipsum") + " · " + esc(cat.fivfelv) + '</p><p style="color:#737875;font-size:13px;line-height:1.65">Lorem ipsum</p><div class="drop-box" style="padding:15px;margin:12px 0"><strong style="font-size:12px">🎁 Lista życzeń do Mikołaja</strong><ul class="check-list" style="margin:10px 0 0">' + (cat.wishes || []).map(function (wish) { return '<li><i class="fa-solid fa-star"></i><span>' + esc(wish) + "</span></li>"; }).join("") + '</ul></div><button class="button" style="width:100%" data-action="santa" data-cat="' + attr(cat.id) + '">🎅 Zostań Mikołajem ' + esc(cat.name) + "</button></article>";
      }).join("") + "</div></div></section>";
  }
  function memoryView(status) {
    var cats = CMS.cats.filter(function (cat) { return cat.status === status; });
    var copy = CMS.pagesContent[status];
    return pageHero(copy.eyebrow, copy.title, copy.intro) +
      '<section class="section compact"><div class="container"><div class="rainbow-grid">' + cats.map(function (cat) { return '<article class="memory-cat"><img src="' + attr(cat.photo) + '" alt="Kot ' + esc(cat.name) + '" loading="lazy"><h3>' + esc(cat.name) + "</h3></article>"; }).join("") + "</div></div></section>";
  }
  function volunteerView() {
    var c = CMS.pagesContent.volunteer, icons = ["fa-bowl-food", "fa-car", "fa-camera", "fa-calendar-heart"];
    return pageHero(c.eyebrow, c.title, c.intro) +
      '<section class="section compact"><div class="container"><div class="volunteer-grid">' + c.roles.map(function (role, i) { return '<article class="volunteer-card"><i class="fa-solid ' + icons[i % icons.length] + '"></i><h3>' + esc(role.title) + "</h3><p>" + esc(role.text) + "</p></article>"; }).join("") + '</div><div class="quiz-banner" style="margin-top:20px"><div><h3>Dołącz do kociej ekipy</h3><p>Nie musisz znać wszystkich odpowiedzi. Wystarczy, że chcesz pomóc i masz trochę serca oraz czasu.</p></div>' + formOrSocial("volunteerForm", "Napisz do nas") + "</div></div></section>";
  }
  function pawsView() {
    var c = CMS.pagesContent.paws;
    return pageHero(c.eyebrow, c.title, c.intro) +
      '<section class="section compact"><div class="container"><div class="content-card"><h3>' + esc(c.processTitle) + '</h3><ol class="step-list">' + c.process.map(function (step) { return "<li>" + esc(step) + "</li>"; }).join("") + '</ol></div><div class="package-grid">' + c.packages.map(function (pack) { return '<article class="package-card"><span style="font-size:25px">🐾</span><h3>' + esc(pack.name) + '</h3><strong class="package-price">' + esc(pack.amount) + "</strong><p>" + esc(pack.description) + "</p>" + external(CMS.siteSettings.links.rescuedPaws, "Wybieram pakiet", "button small") + "</article>"; }).join("") + '<p style="grid-column:1/-1;text-align:center;color:#858985;font-size:11px;margin:4px 0 0">Płatność i szczegóły pakietu są obsługiwane przez Ocalone Łapki.</p></div></div></section>';
  }
  function bazaarView() {
    var c = CMS.pagesContent.bazaar;
    var status = c.statusDetails[c.status] || c.statusDetails.soon;
    var statusIcon = c.status === "live" ? "🔔" : c.status === "collecting" ? "📦" : "🗓️";
    var statusLink = c.status === "live" ? "Dołącz do trwającego bazarku" : "Obserwuj grupę bazarkową";
    return pageHero(c.eyebrow, c.title, c.intro) +
      '<section class="section compact"><div class="container"><div class="bazaar-status" data-status="' + attr(c.status) + '"><span class="bazaar-status-icon" aria-hidden="true">' + statusIcon + '</span><div><h2>' + esc(status.title) + '</h2><p>' + esc(status.text) + '</p><div style="margin-top:14px">' + external(CMS.siteSettings.links.bazaar, statusLink, "button small") + '</div></div></div><div class="section-head" style="margin:34px 0 0"><div><div class="section-label">Wspomnienia z grupy</div><h2>Poprzednie edycje</h2><p>Każda edycja miała swój cel. Archiwum można uzupełniać o krótkie podsumowania, kiedy dziewczyny potwierdzą wyniki.</p></div></div><div class="bazaar-archive">' + c.editions.map(function (edition) { return '<article class="bazaar-edition"><img src="' + attr(edition.image) + '" alt="Grafika: ' + esc(edition.title) + '" loading="lazy"><div class="bazaar-edition-body"><div class="section-label">' + esc(edition.date) + '</div><h3>' + esc(edition.title) + '</h3><p><strong>Cel edycji:</strong> ' + esc(edition.goal) + '</p><p>' + esc(edition.description) + '</p><p class="edition-summary"><strong>Podsumowanie:</strong> ' + esc(edition.summary) + '</p></div></article>'; }).join("") + "</div></div></section>";
  }
  function financeView() {
    var c = CMS.pagesContent.finance;
    var cards = c.fundraisers.map(function (campaign) {
      var url = CMS.siteSettings.links[campaign.linkKey];
      if (campaign.widgetUrl) {
        return '<article class="fundraiser-widget-card"><div class="fundraiser-widget-top"><span class="fundraiser-category">' + esc(campaign.category) + '</span><span class="widget-source"><i class="fa-solid fa-signal" aria-hidden="true"></i> Aktualne dane</span></div><iframe class="fundraiser-widget" src="' + attr(campaign.widgetUrl) + '" width="430" height="500" scrolling="no" frameborder="0" loading="lazy" title="' + attr(campaign.title) + ' — widżet zbiórki Pomagam.pl"></iframe><div class="fundraiser-widget-foot"><span>Widżet Pomagam.pl</span>' + external(url, "Otwórz zbiórkę ↗", "text-link") + '</div></article>';
      }
      var raisedKnown = typeof campaign.raised === "number" && typeof campaign.target === "number" && campaign.target > 0;
      var progress = raisedKnown ? Math.min(100, Math.round(campaign.raised / campaign.target * 100)) : 0;
      var updatedLabel = campaign.updatedAt ? campaign.updatedAt.split("-").reverse().join(".") : "";
      return '<article class="fundraiser-card"><img class="fundraiser-photo" src="' + attr(campaign.image) + '" alt="Zdjęcie do zbiórki: ' + esc(campaign.title) + '" loading="lazy"><div class="fundraiser-body"><span class="fundraiser-category">' + esc(campaign.category) + '</span><h3>' + esc(campaign.title) + '</h3><p>' + esc(campaign.description) + '</p>' + (raisedKnown ? '<div class="fundraiser-amount"><strong>' + esc(new Intl.NumberFormat("pl-PL").format(campaign.raised)) + ' zł</strong><span>z ' + esc(new Intl.NumberFormat("pl-PL").format(campaign.target)) + ' zł</span></div><div class="fundraiser-progress" role="progressbar" aria-label="Postęp zbiórki" aria-valuenow="' + progress + '" aria-valuemin="0" aria-valuemax="100"><span style="width:' + progress + '%"></span></div><div class="fundraiser-meta"><span>' + progress + '% celu' + (campaign.donors ? ' · ' + esc(campaign.donors) + ' osób' : '') + '</span><span>stan na ' + esc(updatedLabel) + '</span></div>' : '<div class="fundraiser-amount"><strong>Aktualny postęp</strong><span>na stronie zbiórki</span></div>') + external(url, "Pokaż zbiórkę", "button") + '</div><div class="fundraiser-foot">Zbiórka jest prowadzona na zewnętrznej platformie.</div></article>';
    }).join("");
    return pageHero(c.eyebrow, c.title, c.intro) +
      '<section class="section compact"><div class="container"><div class="fundraiser-grid">' + cards + '</div><p style="margin:16px 2px 0;color:#858985;font-size:11px;line-height:1.6">' + esc(c.manualUpdateNote) + '</p></div></section>';
  }
  function taxView() {
    var c = CMS.pagesContent.tax;
    var krsRow = c.krs
      ? '<div class="drop-row"><div><strong>KRS</strong><span>' + esc(c.krs) + '</span></div><button class="button ghost small" data-action="copy" data-copy="' + attr(c.krs) + '"><i class="fa-regular fa-copy"></i> Kopiuj</button></div>'
      : '<div class="drop-row"><div><strong>KRS</strong><span>Numer do potwierdzenia</span></div></div>';
    var goalRow = c.goalCodeConfirmed
      ? '<div class="drop-row"><div><strong>Cel szczegółowy</strong><span>' + esc(c.goal + (c.goalCode ? " " + c.goalCode : "")) + '</span></div><button class="button ghost small" data-action="copy" data-copy="' + attr(c.goal + (c.goalCode ? " " + c.goalCode : "")) + '"><i class="fa-regular fa-copy"></i> Kopiuj</button></div>'
      : '<div class="drop-row"><div><strong>Cel szczegółowy Kociamberków</strong><span>' + esc(c.goal + " · kod celu do uzupełnienia") + '</span></div></div>';
    return pageHero(c.eyebrow, c.title, c.intro) +
      '<section class="section compact"><div class="container"><div class="tax-explainer"><h2>' + esc(c.whyTitle) + '</h2><p>' + esc(c.whyText) + '</p></div><div class="content-card" style="max-width:800px;margin:auto"><h3>Dane do rozliczenia · ' + esc(c.partner) + '</h3><p style="color:#747976;font-size:13px;line-height:1.6">' + esc(c.notice) + '</p>' + krsRow + goalRow + '<p style="margin:12px 0;color:#858985;font-size:11px">Przed wpisaniem danych sprawdź aktualną instrukcję stowarzyszenia i Fundacji Młodzi-Młodym.</p>' + external(CMS.siteSettings.links.taxInfo, "Informacje Fundacji Młodzi-Młodym", "button ghost small") + '</div></div></section>';
  }
  function newsView() {
    var c = CMS.pagesContent.news;
    var items = CMS.news.slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
    return pageHero(c.eyebrow, c.title, c.intro) +
      '<section class="section compact"><div class="container"><div class="news-grid">' + items.map(newsCard).join("") + "</div></div></section>";
  }
  function contactView() {
    var s = CMS.siteSettings, c = CMS.pagesContent.contact;
    return pageHero(c.eyebrow, c.title, c.intro) +
      '<section class="section compact"><div class="container contact-grid"><div class="content-card"><h3>Napisz do nas</h3><p style="color:#747976;line-height:1.65;font-size:13px">Najłatwiej skontaktujesz się z nami przez wiadomość na Instagramie lub Facebooku. Odpowiemy, kiedy skończymy karmić, sprzątać albo głaskać.</p><div class="social-row">' + socialLinksMarkup(s.socialLinks) + '</div></div><div class="content-card"><h3>Dane stowarzyszenia</h3><div class="contact-item"><span class="contact-icon"><i class="fa-solid fa-id-card"></i></span><div><small>NIP · REGON</small><strong>' + esc(s.nip) + " · " + esc(s.regon) + "</strong></div></div></div></div></section>";
  }
  function santaModal(cat) {
    var drop = CMS.siteSettings.dropPoints[0];
    var detail = drop.detail ? " · " + drop.detail : "";
    var copy = drop.name + ": " + drop.address + detail + " · Dar dla: " + cat.name;
    openModal('<div class="success-card"><div class="success-icon">🎁</div><h2>Zostań Mikołajem ' + esc(cat.name) + '</h2><p>Wybierz coś z listy życzeń i wyślij paczkę do naszego punktu. Dopisz imię <strong>' + esc(cat.name) + '</strong>, żebyśmy wiedzieli, dla kogo jest prezent.</p><div class="drop-box" style="text-align:left"><strong>' + esc(drop.name) + '</strong><p style="margin:7px 0;color:#766a60;font-size:13px">' + esc(drop.address + detail) + '</p><button class="button ghost small" data-action="copy" data-copy="' + attr(copy) + '"><i class="fa-regular fa-copy"></i> Kopiuj instrukcję wysyłki</button></div><button class="button" style="margin-top:14px" data-action="close-modal">Gotowe, dziękuję</button></div>');
  }
  function catProfileView(cat) {
    activeGalleryCat = cat;
    activeGalleryIndex = 0;
    var photos = cat.photos && cat.photos.length ? cat.photos : [cat.photo];
    var back = cat.status === "adopted" ? "#adoptowane" : cat.status === "rainbow" ? "#teczowy-most" : "#adopcja";
    var backLabel = cat.status === "adopted" ? "Wróć do adoptowanych" : cat.status === "rainbow" ? "Wróć do wspomnień" : "Wróć do podopiecznych";
    var previous = photos.length > 1 ? '<button class="gallery-control prev" data-action="gallery-prev" aria-label="Poprzednie zdjęcie"><i class="fa-solid fa-arrow-left"></i></button>' : '<span class="profile-gallery-spacer" aria-hidden="true"></span>';
    var next = photos.length > 1 ? '<button class="gallery-control next" data-action="gallery-next" aria-label="Następne zdjęcie"><i class="fa-solid fa-arrow-right"></i></button>' : '<span class="profile-gallery-spacer" aria-hidden="true"></span>';
    var dots = photos.length > 1 ? '<div class="gallery-dots" aria-label="Wybierz zdjęcie">' + photos.map(function (_, index) { return '<button class="gallery-dot ' + (index === 0 ? "active" : "") + '" data-action="gallery-go" data-index="' + index + '" aria-label="Zdjęcie ' + (index + 1) + '"></button>'; }).join("") + "</div>" : "";
    var gallery = '<div class="cat-profile-gallery"><div class="profile-gallery-stage">' + previous + '<img class="cat-profile-image" id="gallery-image" src="' + attr(photos[0]) + '" alt="Zdjęcie kota ' + esc(cat.name) + '">' + next + '</div>' + dots + "</div>";
    var adoptAction = cat.status === "adopted" || cat.status === "rainbow" ? '<p class="profile-unavailable">Lorem ipsum</p>' : '<button class="button" data-action="adopt" data-cat="' + attr(cat.id) + '">' + (cat.status === "foster" ? "Chcę zostać domem tymczasowym dla " : "Chcę adoptować ") + esc(cat.name) + "</button>";
    var sleepy = cat.description ? '<section class="cat-profile-description"><h2>Opis</h2><p>' + esc(cat.description) + "</p></section>" : '<div class="sleepy-note cat-profile-sleepy"><span class="sleepy-illustration" aria-hidden="true">😴🐈</span><strong>😴 OPIS W TRAKCIE DRZEMKI, NIEDŁUGO SIĘ POJAWI!</strong><span>(Opis czeka na akceptację Naczelnego Mruczka – dopytaj o mnie u dziewczyn!)</span></div>';
    return '<section class="page-hero cat-profile-hero"><div class="container"><a class="text-link" href="' + back + '"><i class="fa-solid fa-arrow-left"></i> ' + backLabel + '</a></div></section><section class="section compact"><div class="container"><article class="cat-profile-page"><div class="cat-profile-grid">' + gallery + '<div class="cat-profile-info"><span class="status-badge ' + (cat.status === "urgent" ? "urgent" : cat.status === "foster" ? "foster" : "") + '">' + esc(labelStatus(cat.status)) + '</span><h1>' + esc(cat.name) + '</h1><p class="cat-profile-kicker"><strong>Info</strong><span>Lorem ipsum</span></p><div class="cat-profile-facts"><div class="meta-item"><span class="meta-label">Płeć</span><span class="meta-value">' + esc(cat.sexLabel || cat.sex || "Lorem ipsum") + '</span></div><div class="meta-item"><span class="meta-label">Wiek</span><span class="meta-value">' + esc(cat.ageLabel || "Lorem ipsum") + '</span></div><div class="meta-item"><span class="meta-label">FIV / FeLV</span><span class="meta-value">' + esc(cat.fivfelv || "Lorem ipsum") + '</span></div><div class="meta-item"><span class="meta-label">Towarzystwo</span><span class="meta-value">' + esc(cat.company || "Lorem ipsum") + '</span></div></div></div></div>' + sleepy + '<div class="cat-profile-cta">' + adoptAction + (cat.wishes ? '<button class="button ghost" data-action="santa" data-cat="' + attr(cat.id) + '">🎁 Lista życzeń</button>' : "") + '</div></article></div></section>';
  }
  function openModal(content) {
    modalRoot.innerHTML = '<div class="modal" role="document">' + content + "</div>";
    modalRoot.hidden = false;
    document.body.style.overflow = "hidden";
    var close = modalRoot.querySelector(".modal-close");
    if (close) close.focus();
  }
  function closeModal() {
    modalRoot.hidden = true;
    modalRoot.innerHTML = "";
    document.body.style.overflow = "";
    var current = routeName();
    activeGalleryCat = current.indexOf("kot/") === 0 ? catById(current.slice(4)) : null;
  }
  function galleryMove(delta, exact) {
    if (!activeGalleryCat) return;
    var photos = activeGalleryCat.photos && activeGalleryCat.photos.length ? activeGalleryCat.photos : [activeGalleryCat.photo];
    activeGalleryIndex = exact == null ? (activeGalleryIndex + delta + photos.length) % photos.length : exact;
    var image = document.getElementById("gallery-image");
    if (image) image.src = photos[activeGalleryIndex];
    document.querySelectorAll(".gallery-dot").forEach(function (dot, index) { dot.classList.toggle("active", index === activeGalleryIndex); });
    var count = document.getElementById("gallery-count");
    if (count) count.textContent = (activeGalleryIndex + 1) + " / " + photos.length;
  }
  function showMatch(cat) {
    var matches = [];
    try { matches = JSON.parse(localStorage.getItem("kociamberkiMatches") || "[]"); } catch (error) { matches = []; }
    if (matches.indexOf(cat.id) === -1) matches.push(cat.id);
    try { localStorage.setItem("kociamberkiMatches", JSON.stringify(matches)); } catch (error) { /* localStorage może być niedostępny */ }
    openModal('<div class="success-card"><div class="success-icon">🐾</div><h2>Mruczący match!</h2><p>' + esc(cat.name) + ' zapisuje Ci łapkę. Zobacz jego profil, poznaj potrzeby i porozmawiaj z nami o kolejnym kroku.</p><div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap"><button class="button ghost" data-action="close-modal">Jeszcze przeglądam</button><button class="button" data-action="profile" data-cat="' + attr(cat.id) + '">Poznaj ' + esc(cat.name) + "</button></div></div>");
  }
  function copyText(value) {
    var text = String(value || "");
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { announce("Skopiowano do schowka."); }).catch(function () { fallbackCopy(text); });
    } else fallbackCopy(text);
  }
  function fallbackCopy(text) {
    var field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    try { document.execCommand("copy"); announce("Skopiowano do schowka."); }
    catch (error) { announce("Zaznacz i skopiuj: " + text); }
    document.body.removeChild(field);
  }
  function pageTitle(route) {
    if (route.indexOf("kot/") === 0) {
      var profileCat = catById(route.slice(4));
      return profileCat ? profileCat.name : "Profil kota";
    }
    var titles = {
      adopcja: "Do adopcji", quiz: "Quiz doboru kota", "koci-mikolaj": "Całoroczny Koci Mikołaj",
      adoptowane: "Adoptowane", "teczowy-most": "Za Tęczowym Mostem", "dom-staly": "Dom stały",
      "dom-tymczasowy": "Dom tymczasowy", "pomoc-rzeczowa": "Pomoc rzeczowa", "ocalone-lapki": "Ocalone Łapki",
      bazarek: "Bazarek", "wsparcie-finansowe": "Wsparcie finansowe", podatek: "1,5% podatku",
      wolontariat: "Wolontariat", aktualnosci: "Aktualności", kontakt: "Kontakt", "polityka-prywatnosci": "Polityka prywatności"
    };
    return titles[route] || "Mrucząca Przystań";
  }
  function render() {
    var requestedRoute = routeName();
    currentRoute = (routes[requestedRoute] || requestedRoute.indexOf("kot/") === 0) ? requestedRoute : "start";
    if (currentRoute.indexOf("kot/") !== 0) activeGalleryCat = null;
    if (currentRoute !== "adopcja") tinderMode = false;
    var page = "";
    if (currentRoute === "start") page = homeView();
    else if (currentRoute === "adopcja") page = adoptionView();
    else if (currentRoute === "quiz") page = quizView();
    else if (currentRoute === "koci-mikolaj") page = seasonalView();
    else if (currentRoute === "adoptowane") page = memoryView("adopted");
    else if (currentRoute === "teczowy-most") page = memoryView("rainbow");
    else if (currentRoute === "dom-staly") page = adoptionContentView();
    else if (currentRoute === "dom-tymczasowy") page = fosterContentView();
    else if (currentRoute === "pomoc-rzeczowa") page = physicalView();
    else if (currentRoute === "ocalone-lapki") page = pawsView();
    else if (currentRoute === "bazarek") page = bazaarView();
    else if (currentRoute === "wsparcie-finansowe") page = financeView();
    else if (currentRoute === "podatek") page = taxView();
    else if (currentRoute === "wolontariat") page = volunteerView();
    else if (currentRoute === "aktualnosci") page = newsView();
    else if (currentRoute === "kontakt") page = contactView();
    else if (currentRoute.indexOf("kot/") === 0) {
      var requestedCat = catById(currentRoute.slice(4));
      page = requestedCat ? catProfileView(requestedCat) : pageHero("Profil kota", "Nie znaleźliśmy takiego kociamberka.", "Sprawdź adres lub wróć do listy podopiecznych.") + '<section class="section compact"><div class="container"><a class="button" href="#adopcja">Wróć do kotów</a></div></section>';
    }
    else if (currentRoute === "polityka-prywatnosci") {
      var privacy = CMS.pagesContent.privacy;
      page = pageHero(privacy.eyebrow, privacy.title, privacy.intro) + '<section class="section compact"><div class="container"><a class="button ghost" href="#start">Wróć na stronę główną</a></div></section>';
    }
    app.innerHTML = page;
    footer.innerHTML = footerMarkup();
    if (currentRoute === "adopcja") {
      var status = document.getElementById("filter-status"), sex = document.getElementById("filter-sex"), age = document.getElementById("filter-age");
      if (status) status.value = filters.status;
      if (sex) sex.value = filters.sex;
      if (age) age.value = filters.age;
    }
    document.title = (currentRoute === "start" ? "Kociamberki – Mrucząca Przystań" : pageTitle(currentRoute) + " | Kociamberki");
    if (mobileMenu.classList.contains("open")) closeMobileMenu();
  }
  function closeMobileMenu() {
    mobileMenu.classList.remove("open");
    mobileMenu.querySelectorAll("details[open]").forEach(function (group) { group.open = false; });
    document.getElementById("menu-toggle").setAttribute("aria-expanded", "false");
    document.getElementById("menu-toggle").setAttribute("aria-label", "Otwórz menu");
    document.getElementById("menu-toggle").innerHTML = '<i class="fa-solid fa-bars"></i>';
  }
  function closeDesktopMenus(except) {
    document.querySelectorAll(".desktop-nav .nav-group[open]").forEach(function (group) {
      if (group !== except) group.open = false;
    });
  }
  function showCookies() {
    var accepted = false;
    try { accepted = localStorage.getItem("kociamberkiCookiesAccepted") === "yes"; } catch (error) { accepted = false; }
    if (accepted) return;
    cookieBanner.innerHTML = '<p>Używamy wyłącznie niezbędnych danych przeglądarki, by zapamiętać Twoją decyzję. <a href="#polityka-prywatnosci">Polityka prywatności</a></p><button class="button small" data-action="accept-cookies">Rozumiem</button>';
    cookieBanner.hidden = false;
  }
  document.addEventListener("click", function (event) {
    var target = event.target.closest("[data-action]");
    if (event.target === modalRoot) { closeModal(); return; }
    if (!target) return;
    var action = target.getAttribute("data-action");
    if (action === "profile") {
      var profileCat = catById(target.getAttribute("data-cat"));
      if (profileCat) { closeModal(); location.hash = "kot/" + profileCat.id; }
    } else if (action === "adopt") {
      var adoptCat = catById(target.getAttribute("data-cat"));
      if (adoptCat) {
        var url = CMS.siteSettings.links.adoptionForm;
        window.open(url && url !== "https://forms.gle/" ? url : CMS.siteSettings.socialLinks[0].url, "_blank", "noopener");
        announce("Napisz do nas, a pomożemy Ci rozpocząć adopcyjną rozmowę.");
      }
    } else if (action === "tiles") { tinderMode = false; render(); }
    else if (action === "tinder") { tinderMode = true; tinderIndex = 0; render(); }
    else if (action === "next-cat") { tinderIndex += 1; render(); }
    else if (action === "match") { var match = catById(target.getAttribute("data-cat")); if (match) showMatch(match); }
    else if (action === "santa") { var santa = catById(target.getAttribute("data-cat")); if (santa) santaModal(santa); }
    else if (action === "copy") copyText(target.getAttribute("data-copy"));
    else if (action === "close-modal") closeModal();
    else if (action === "gallery-prev") galleryMove(-1);
    else if (action === "gallery-next") galleryMove(1);
    else if (action === "gallery-go") galleryMove(0, Number(target.getAttribute("data-index")));
    else if (action === "quiz-next") {
      if (quizAnswers[quizIndex] == null) { announce("Wybierz odpowiedź, żeby przejść dalej."); return; }
      if (quizIndex < quizQuestions.length - 1) quizIndex += 1; else calculateQuiz();
      render();
    } else if (action === "quiz-prev") { if (quizIndex > 0) quizIndex -= 1; render(); }
    else if (action === "quiz-reset") { quizIndex = 0; quizAnswers = []; quizResults = null; render(); }
    else if (action === "accept-cookies") {
      try { localStorage.setItem("kociamberkiCookiesAccepted", "yes"); } catch (error) { /* preferencja nie zostanie zapisana */ }
      cookieBanner.hidden = true;
    }
  });
  document.addEventListener("change", function (event) {
    if (event.target.matches("#filter-status")) { filters.status = event.target.value; render(); }
    else if (event.target.matches("#filter-sex")) { filters.sex = event.target.value; render(); }
    else if (event.target.matches("#filter-age")) { filters.age = event.target.value; render(); }
    else if (event.target.matches('input[name="quiz-answer"]')) {
      quizAnswers[quizIndex] = Number(event.target.value);
      event.target.closest(".quiz-option").style.borderColor = "#74b9a8";
    }
  });
  document.getElementById("menu-toggle").addEventListener("click", function () {
    var open = !mobileMenu.classList.contains("open");
    mobileMenu.classList.toggle("open", open);
    this.setAttribute("aria-expanded", String(open));
    this.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
    this.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });
  document.querySelectorAll(".desktop-nav .nav-group").forEach(function (group) {
    group.addEventListener("toggle", function () {
      if (group.open) closeDesktopMenus(group);
    });
  });
  document.querySelectorAll("#mobile-menu details").forEach(function (group) {
    group.addEventListener("toggle", function () {
      if (!group.open) return;
      mobileMenu.querySelectorAll("details[open]").forEach(function (other) {
        if (other !== group) other.open = false;
      });
    });
  });
  document.addEventListener("pointerdown", function (event) {
    if (!event.target.closest(".desktop-nav")) closeDesktopMenus();
  });
  window.addEventListener("hashchange", function () {
    if (routeName() === "quiz") { quizIndex = 0; quizAnswers = []; quizResults = null; }
    closeDesktopMenus();
    render();
    window.scrollTo(0, 0);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modalRoot.hidden) closeModal();
    if (event.key === "Escape") { closeDesktopMenus(); if (mobileMenu.classList.contains("open")) closeMobileMenu(); }
    if (activeGalleryCat && event.key === "ArrowRight") galleryMove(1);
    if (activeGalleryCat && event.key === "ArrowLeft") galleryMove(-1);
  });
  document.addEventListener("pointerdown", function (event) {
    if (event.target.closest(".tinder-photo")) tinderStartX = event.clientX;
  });
  document.addEventListener("pointerup", function (event) {
    if (tinderStartX == null) return;
    var movement = event.clientX - tinderStartX;
    tinderStartX = null;
    if (Math.abs(movement) < 80) return;
    if (movement < 0) {
      tinderIndex += 1;
      render();
    } else {
      var deck = activeCats().slice().sort(function (a, b) {
        var order = { urgent: 0, adoption: 1, foster: 2 };
        return order[a.status] - order[b.status];
      });
      var selected = deck[tinderIndex % deck.length];
      if (selected) showMatch(selected);
    }
  });
  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[href^='#']");
    if (link) {
      closeDesktopMenus();
      if (mobileMenu.classList.contains("open")) closeMobileMenu();
    }
  });
  render();
  showCookies();
}());
