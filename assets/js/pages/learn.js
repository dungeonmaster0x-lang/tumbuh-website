/* Tumbuh — learn hub (belajar.html) */
(function () {
  const T = window.TUMBUH, t = T.t, L = T.L;

  function render() {
    const done = T.doneLessons();
    const total = T.lessons.length;
    const n = T.lessons.filter((l) => done.includes(l.slug)).length;
    const next = T.lessons.find((l) => !done.includes(l.slug));
    document.title = t("learnTitle") + " — Tumbuh";

    document.getElementById("main").innerHTML = `
      <section class="stack" style="gap:18px;max-width:760px">
        <span class="eyebrow eyebrow--chip">${T.icon("book", 14, 'style="display:inline;vertical-align:-2px;margin-right:6px"')}${t("navLearn")}</span>
        <h1 style="font-size:clamp(32px,4.5vw,48px);font-weight:800;letter-spacing:-0.03em">${t("learnTitle")}</h1>
        <p class="lead" style="font-size:18px">${t("learnSub")}</p>
        <div style="display:flex;align-items:center;gap:14px;max-width:420px">
          <div class="progress" style="flex:1"><span style="width:${(n / total) * 100}%"></span></div>
          <span style="font-size:14px;font-weight:700;color:#3B4452">${t("progress", { n, total })}</span>
        </div>
        ${next ? `<a class="btn btn--primary btn--lg" style="align-self:flex-start" href="pelajaran.html?id=${next.slug}">${t("ctaStart")}: ${L(next.title)} ${T.icon("arrow", 18)}</a>` : ""}
      </section>

      ${T.modules.map((m) => {
        const items = m.lessons.map((slug) => T.lessons.find((l) => l.slug === slug)).filter(Boolean);
        const mDone = items.filter((l) => done.includes(l.slug)).length;
        const mins = items.reduce((a, l) => a + l.mins, 0);
        return `
      <section class="stack" style="gap:14px" aria-labelledby="mod-${m.key}">
        <div class="section-head" style="align-items:flex-end;padding-top:8px">
          <div class="stack" style="gap:4px">
            <h2 id="mod-${m.key}" style="font-size:24px;font-weight:800">${L(m.title)}</h2>
            <p style="color:var(--muted)">${L(m.desc)}</p>
          </div>
          <span class="mins" style="background:${mDone === items.length ? "var(--up-bg)" : "#F3F2EC"};color:${mDone === items.length ? "var(--up)" : "var(--muted-2)"}">${t("moduleProgress", { n: mDone, total: items.length, mins })}</span>
        </div>
        <ol class="stack" style="list-style:none;margin:0;padding:0;gap:12px">
          ${items.map((l) => {
            const i = T.lessons.indexOf(l);
            const isDone = done.includes(l.slug);
            return `<li>
            <a class="card card--link" href="pelajaran.html?id=${l.slug}" style="flex-direction:row;align-items:center;gap:18px">
              <span class="step-num ${isDone ? "is-done" : ""}" style="flex:none">${isDone ? T.icon("check", 18, 'stroke-width="3"') : i + 1}</span>
              <span class="stack" style="gap:4px;flex:1;min-width:0">
                <strong style="font-size:19px">${L(l.title)}</strong>
                <span style="color:var(--muted);font-size:15px">${L(l.desc)}</span>
              </span>
              <span class="mins" style="flex:none">${isDone ? t("done") : t("minutes", { n: l.mins })}</span>
            </a>
          </li>`;
          }).join("")}
        </ol>
      </section>`;
      }).join("")}

      ${n > 0 ? `<button type="button" class="btn btn--ghost" id="reset" style="align-self:flex-start">${t("resetProgress")}</button>` : ""}

      <a class="card card--dark card--link" href="kamus.html" style="flex-direction:row;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
        <span class="stack" style="gap:4px"><strong style="font-size:20px;color:#fff">${t("glossaryTitle")}</strong><span style="color:#C9CED6">${t("glossarySub")}</span></span>
        <span class="link-arrow" style="color:#fff">${t("openGlossary")}</span>
      </a>`;

    const reset = document.getElementById("reset");
    if (reset) reset.addEventListener("click", () => {
      T.lessons.forEach((l) => T.setLessonDone(l.slug, false));
      render();
    });
  }

  T.boot("learn", render);
})();
