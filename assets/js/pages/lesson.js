/* Tumbuh — single lesson (pelajaran.html?id=slug) */
(function () {
  const T = window.TUMBUH, t = T.t, L = T.L;
  const slug = new URLSearchParams(location.search).get("id") || T.lessons[0].slug;
  let picked = null;

  function render() {
    const i = Math.max(0, T.lessons.findIndex((l) => l.slug === slug));
    const l = T.lessons[i];
    const prev = T.lessons[i - 1], next = T.lessons[i + 1];
    const isDone = T.doneLessons().includes(l.slug);
    const q = l.quiz;
    document.title = L(l.title) + " — Tumbuh";

    document.getElementById("main").innerHTML = `
      <article class="lesson">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="belajar.html">${t("navLearn")}</a><span aria-hidden="true">›</span>
          <span>${t("lessonOf", { n: i + 1, total: T.lessons.length })}</span>
        </nav>
        <div class="progress" aria-hidden="true"><span style="width:${((i + 1) / T.lessons.length) * 100}%"></span></div>
        <header class="stack" style="gap:12px">
          <span class="mins" style="align-self:flex-start">${t("minutes", { n: l.mins })}</span>
          <h1>${L(l.title)}</h1>
          <p class="lead" style="font-size:19px">${L(l.desc)}</p>
        </header>

        <div class="stack" style="gap:18px">${L(l.body)}</div>

        <section class="card stack" style="gap:14px;margin-top:8px" aria-labelledby="quiz-title">
          <span class="eyebrow" id="quiz-title">${t("quizTitle")}</span>
          <h2 style="font-size:21px;margin:0">${L(q.q)}</h2>
          <div class="quiz" role="group" aria-labelledby="quiz-title">
            ${q.options.map((o, k) => {
              let cls = "";
              if (picked !== null && k === q.answer) cls = "is-right";
              else if (picked === k) cls = "is-wrong";
              return `<button type="button" class="quiz__opt ${cls}" data-k="${k}" aria-pressed="${picked === k}">${L(o)}</button>`;
            }).join("")}
          </div>
          <p class="quiz__feedback" aria-live="polite">${picked === null ? "" : `<strong>${t(picked === q.answer ? "quizRight" : "quizWrong")}</strong> ${L(q.explain)}`}</p>
          <button type="button" class="btn ${isDone ? "btn--dark" : "btn--primary"}" id="done-btn" aria-pressed="${isDone}" style="align-self:flex-start">
            ${isDone ? T.icon("check", 18, 'stroke-width="3"') + t("done") : t("markDone")}
          </button>
        </section>

        <nav class="lesson-nav" aria-label="Lessons">
          ${prev ? `<a class="btn btn--ghost" href="pelajaran.html?id=${prev.slug}">← ${t("prev")}</a>` : `<a class="btn btn--ghost" href="belajar.html">← ${t("allLessons")}</a>`}
          ${next ? `<a class="btn btn--primary" href="pelajaran.html?id=${next.slug}">${t("next")}: ${L(next.title)} →</a>` : `<a class="btn btn--primary" href="penyaring.html">${t("navScreener")} →</a>`}
        </nav>
      </article>`;

    document.querySelectorAll(".quiz__opt").forEach((b) => b.addEventListener("click", () => {
      picked = Number(b.dataset.k);
      if (picked === q.answer) T.setLessonDone(l.slug, true);
      render();
    }));
    document.getElementById("done-btn").addEventListener("click", () => {
      T.setLessonDone(l.slug, !isDone);
      render();
    });
  }

  T.boot("learn", render);
})();
