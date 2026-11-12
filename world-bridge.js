/* The C++ V3 island reads this adapter. Academic progress is owned by the Access lesson. */
(function () {
  "use strict";
  const prefix = "lsts-access-library:v1:";
  let id;
  try { id = sessionStorage.getItem(prefix + "profile"); } catch { /* the 2D lesson reports blocked storage */ }
  function read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(prefix + key)) ?? fallback; }
    catch { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(prefix + key, JSON.stringify(value)); return true; }
    catch { return false; }
  }
  const profile = read("profiles", []).find(person => person.id === id);
  if (!profile) {
    location.replace((LESSON.page || "index.html") + "?mode=read");
    return;
  }
  const key = "progress:" + id + ":" + LESSON.id;
  const peek = () => read(key, {});
  const worldKey = "lsts-access-world:" + id + ":" + LESSON.id;
  function synchronize() {
    const state = peek();
    const done = LESSON.steps.slice(0, 3).map(step => LearningProgress.required(step).every(task => state.passed?.[task.id]));
    let completed = 0;
    while (done[completed]) completed++;
    const world = {
      ten: profile.name, lop: profile.className, qua: completed,
      passedStages: done.flatMap((passed, index) => passed ? [index] : []),
      dat: LearningProgress.assess(LESSON.steps, state.passed || {}).completed
    };
    try { localStorage.setItem(worldKey, JSON.stringify(world)); } catch { /* fallback can still open reading mode */ }
    return world;
  }
  window.PORTAL_RUNTIME_VERSION = "access-20261111-island";
  window.LocalLearning = { ns: prefix, read, write };
  window.PortalCloud = {
    profile: { id, display_name: profile.name, class_label: profile.className },
    packet: { lesson: { lesson_key: LESSON.id, position: 1 } },
    allowed: () => { try { return sessionStorage.getItem(prefix + "profile") === id; } catch { return false; } },
    peek,
    save(lesson, incoming) {
      if (lesson !== LESSON.id || !this.allowed()) return false;
      const latest = peek();
      // Games can only record their own play flags. They cannot grant academic completion.
      return write(key, { ...latest, stationGames: { ...latest.stationGames, ...incoming.stationGames }, updatedAt: new Date().toISOString() });
    }
  };
  window.BAI = {
    ma: LESSON.id, tien_to_luu: "lsts-access-world:" + id + ":", bai: 1,
    khoa: "Tin học 11", nhan: "Microsoft Access", tieu_de: LESSON.title,
    cau_hoi: "Khám phá ba trạm dữ liệu, hoàn thành checkpoint và mở cổng Boss cuối.",
    chang: LESSON.steps.slice(0, 3).map(step => ({ ten: step.title, ten_ngan: step.short, phut: 7, muc_tieu: [], khoi_dong: "" })),
    cuoi: { so_cau: 6, dat: 6 }
  };
  window.QUEST = {
    theme: "archive", ten: LESSON.island || "Đảo dữ liệu thư viện", ten_dao: LESSON.island || "Đảo dữ liệu thư viện",
    kieu: "network", mau: "#b9a5fa", mau_phu: "#ffd275", bieu_tuong: "Access",
    ky_hieu: LESSON.symbols || ["TABLE", "PK", "FK", "1–∞"], dung_sau_chang: false, trang_doc: LESSON.page || "index.html"
  };
  synchronize();
  window.addEventListener("storage", event => {
    if (event.key === prefix + key) {
      synchronize();
      window.dispatchEvent(new StorageEvent("storage", { key: worldKey }));
    }
    if (event.key === prefix + "ended:" + id) parent.postMessage({ type: "portal-account" }, location.origin);
  });
  window.addEventListener("message", event => {
    if (event.origin !== location.origin) return;
    const child = document.querySelector(".q-khung iframe")?.contentWindow;
    if (event.source === child && event.data?.type === "access-switch-mode") parent.postMessage({ type: "portal-switch-read" }, location.origin);
  });
})();
