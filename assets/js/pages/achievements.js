/* Tumbuh — achievements and completion certificate (prestasi.html) */
(function () {
  const T = window.TUMBUH, t = T.t;
  const NKEY = "tumbuh-name";
  const readName = () => { try { return localStorage.getItem(NKEY) || ""; } catch (e) { return ""; } };
  const saveName = (v) => { try { localStorage.setItem(NKEY, v); } catch (e) { /* ignore */ } };

  function certificate(name, grad, list) {
    const done = T.doneLessons().length, total = T.lessons.length;
    if (!grad) {
      return `
      <section class="card cert-locked">
        <span class="icon-tile" style="width:56px;height:56px;border-radius:16px">${T.icon("lock", 26)}</span>
        <div class="stack" style="gap:8px;flex:1;min-width:240px">
          <h2 style="font-size:22px;font-weight:800">${t("certLockedTitle")}</h2>
          <p style="color:var(--muted)">${t("certLockedSub", { n: total - done })}</p>
          <div style="display:flex;align-items:center;gap:12px;max-width:420px">
            <div class="progress" style="flex:1"><span style="width:${(done / total) * 100}%"></span></div>
            <span style="font-size:14px;font-weight:700">${t("progress", { n: done, total })}</span>
          </div>
        </div>
        <a class="btn btn--primary" href="belajar.html">${t("certContinue")}</a>
      </section>`;
    }
    const date = T.date(new Date().toISOString().slice(0, 10));
    return `
      <section class="stack" style="gap:14px">
        <h2 style="font-size:24px;font-weight:800">${t("certTitle")}</h2>
        <label class="calc-field" for="cert-name" style="max-width:420px"><span>${t("certNameLabel")}</span>
          <span class="calc-input"><input id="cert-name" type="text" maxlength="60" value="${T.esc(name)}" placeholder="${t("certNamePh")}" autocomplete="name" style="font-weight:700"></span>
        </label>
        <div class="certificate" id="certificate">
          <div class="certificate__inner">
            <div class="brand" style="justify-content:center">${T.logo(40)}<span style="font-size:26px">Tumbuh</span></div>
            <span class="certificate__eyebrow">${t("certEyebrow")}</span>
            <p class="certificate__given">${t("certGiven")}</p>
            <p class="certificate__name" id="cert-name-out">${T.esc(name) || "&nbsp;"}</p>
            <p class="certificate__text">${t("certText", { n: total })}</p>
            <div class="certificate__mods">${T.modules.map((m) => `<span>${T.icon("check", 14)}${T.esc(T.L(m.title))}</span>`).join("")}</div>
            <div class="certificate__foot">
              <span><small>${t("certDate")}</small><strong>${date}</strong></span>
              <span class="certificate__seal" aria-hidden="true">${T.icon("trophy", 30)}</span>
              <span><small>${t("certBadges")}</small><strong>${list.filter((a) => a.done).length}/${list.length}</strong></span>
            </div>
            <p class="certificate__note">${t("certNote")}</p>
          </div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:10px">
          <button type="button" class="btn btn--primary" id="cert-print">${T.icon("print", 18)}${t("certPrint")}</button>
        </div>
        <small class="calc-note">${t("certPrintHint")}</small>
      </section>`;
  }

  function render() {
    document.title = t("achTitle") + " — Tumbuh";
    const list = T.achievements();
    const got = list.filter((a) => a.done).length;
    const grad = list.find((a) => a.key === "graduate").done;
    document.getElementById("main").innerHTML = `
      <section class="stack" style="gap:12px;max-width:760px">
        <span class="eyebrow eyebrow--chip">${T.icon("trophy", 14, 'style="display:inline;vertical-align:-2px;margin-right:6px"')}${t("achEyebrow")}</span>
        <h1 style="font-size:clamp(32px,4.5vw,48px);font-weight:800;letter-spacing:-0.03em">${t("achTitle")}</h1>
        <p class="lead" style="font-size:18px">${t("achSub")}</p>
        <div style="display:flex;align-items:center;gap:14px;max-width:420px">
          <div class="progress" style="flex:1"><span style="width:${(got / list.length) * 100}%;background:var(--turmeric)"></span></div>
          <span style="font-size:14px;font-weight:700">${t("achCount", { n: got, total: list.length })}</span>
        </div>
      </section>

      <section class="ach-grid" aria-label="${t("achTitle")}">
        ${list.map((a) => `
          <div class="ach ${a.done ? "is-done" : ""}">
            <span class="ach__icon">${T.icon(a.done ? a.icon : "lock", 24)}</span>
            <strong>${t("ach_" + a.key)}</strong>
            <span class="ach__hint">${t("achHint_" + a.key)}</span>
            ${a.goal > 1 ? `<span class="ach__bar"><span style="width:${(a.now / a.goal) * 100}%"></span></span><small class="num">${a.now}/${a.goal}</small>`
              : `<small>${a.done ? t("achDone") : t("achTodo")}</small>`}
            <span class="sr-only">${a.done ? t("achDone") : t("achTodo")}</span>
          </div>`).join("")}
      </section>

      ${certificate(readName(), grad, list)}

      <p class="calc-note">${t("achStored")}</p>`;

    const input = document.getElementById("cert-name");
    if (input) input.addEventListener("input", () => {
      saveName(input.value.trim());
      document.getElementById("cert-name-out").textContent = input.value.trim() || " ";
    });
    const pr = document.getElementById("cert-print");
    if (pr) pr.addEventListener("click", () => window.print());
  }

  T.boot("achievements", render);
})();
