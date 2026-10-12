/* Tumbuh — glossary (kamus.html) */
(function () {
  const T = window.TUMBUH, t = T.t, L = T.L;
  let query = "";

  function sorted() {
    return T.glossary.slice().sort((a, b) => L(a.term).localeCompare(L(b.term), T.lang()));
  }

  function renderList() {
    const q = query.trim().toLowerCase();
    const other = T.lang() === "id" ? "en" : "id";
    const items = sorted().filter((g) =>
      !q || [g.term.id, g.term.en, g.def.id, g.def.en].some((s) => s.toLowerCase().includes(q)));
    const letters = [...new Set(items.map((g) => L(g.term)[0].toUpperCase()))];
    document.getElementById("alpha").innerHTML = letters.map((ch) => {
      const first = items.find((g) => L(g.term)[0].toUpperCase() === ch);
      return `<a href="#${first.id}">${ch}</a>`;
    }).join("");
    document.getElementById("terms").innerHTML = items.length ? items.map((g) => `
      <article class="card term stack" id="${g.id}" style="gap:10px">
        <div style="display:flex;flex-direction:column;gap:4px">
          <h3>${L(g.term)}</h3>
          ${g.term[other] !== L(g.term) ? `<span class="term__other">${t("alsoKnown")}: ${g.term[other]}</span>` : ""}
        </div>
        <p>${L(g.def)}</p>
        ${g.ex ? `<div class="term__ex"><strong>${t("example")}:</strong> ${L(g.ex)}</div>` : ""}
      </article>`).join("") : `<div class="empty-state">${t("glossaryNone")}</div>`;
  }

  function render() {
    document.title = t("glossaryTitle") + " — Tumbuh";
    document.getElementById("main").innerHTML = `
      <section class="stack" style="gap:14px;max-width:760px">
        <h1 style="font-size:clamp(32px,4.5vw,48px);font-weight:800;letter-spacing:-0.03em">${t("glossaryTitle")}</h1>
        <p class="lead" style="font-size:18px">${t("glossarySub")}</p>
        <label class="search" style="flex:none;max-width:520px;height:50px">
          ${T.icon("search", 18, 'style="color:var(--muted-2);flex:none"')}
          <input id="term-search" type="search" value="${T.esc(query)}" placeholder="${t("glossarySearch")}" aria-label="${t("glossarySearch")}">
        </label>
        <nav class="alpha" id="alpha" aria-label="A–Z"></nav>
      </section>
      <div class="grid-auto" id="terms" style="grid-template-columns:repeat(auto-fill,minmax(320px,1fr));align-items:start"></div>`;
    const input = document.getElementById("term-search");
    input.addEventListener("input", () => { query = input.value; renderList(); });
    renderList();
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ block: "center" });
    }
  }

  T.boot("glossary", render);
})();
