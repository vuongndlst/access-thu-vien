(function () {
  "use strict";

  const DATA = window.LESSON;
  const PREFIX = "lsts-access-library:v1:";
  const query = new URLSearchParams(location.search);
  const embedded = query.get("nhung") === "1" && window.parent !== window;
  let viewMode = embedded || query.get("mode") === "read" ? "read" : "world";
  const app = document.querySelector("#app");
  const allQuestions = DATA.steps.flatMap(step => step.challenges);
  let profile = null;
  let state = {};
  let boss = null;
  let memory = {};
  let storageOK = true;
  let toastTimer;
  let selectedEndpoint = null;

  const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const normalize = value => String(value).trim().replace(/\s+/g, " ");
  const uid = () => globalThis.crypto?.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).slice(2);

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      storageWarning();
      return memory[key] ?? fallback;
    }
  }

  function write(key, value) {
    memory[key] = value;
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); }
    catch { storageWarning(); }
  }

  function storageWarning() {
    storageOK = false;
    const warning = document.querySelector("#storage-warning");
    warning.hidden = false;
    warning.textContent = "Trình duyệt đang chặn lưu tiến độ. Em có thể học trong phiên này và tải chứng chỉ ngay khi hoàn thành.";
  }

  function session(key, value) {
    try {
      if (value === undefined) return sessionStorage.getItem(PREFIX + key);
      if (value === null) sessionStorage.removeItem(PREFIX + key);
      else sessionStorage.setItem(PREFIX + key, value);
    } catch { return null; }
  }

  const profileKey = () => "progress:" + profile.id + ":" + DATA.id;
  function freshState() {
    return { passed: {}, drafts: {}, attempts: {}, demos: {}, history: [], lastStage: DATA.steps[0].id };
  }

  function loadState() {
    const legacy = DATA.id === "access-thu-vien-v1" ? read("progress:" + profile.id, {}) : {};
    const saved = read(profileKey(), legacy);
    state = { ...freshState(), ...saved, passed: saved.passed || {}, drafts: saved.drafts || {}, attempts: saved.attempts || {}, demos: saved.demos || {} };
  }

  function update(patch) {
    const disk = read(profileKey(), freshState());
    state = {
      ...disk, ...state, ...patch,
      passed: { ...disk.passed, ...state.passed, ...patch.passed },
      drafts: { ...disk.drafts, ...state.drafts, ...patch.drafts },
      attempts: { ...disk.attempts, ...state.attempts, ...patch.attempts },
      demos: { ...disk.demos, ...state.demos, ...patch.demos },
      updatedAt: new Date().toISOString()
    };
    write(profileKey(), state);
    synchronizeWorld();
  }

  function synchronizeWorld() {
    const completed = DATA.steps.slice(0, 3).map(step => LearningProgress.required(step).every(task => state.passed?.[task.id]));
    let count = 0;
    while (completed[count]) count++;
    try {
      localStorage.setItem("lsts-access-world:" + profile.id + ":" + DATA.id, JSON.stringify({
        ten: profile.name, lop: profile.className, qua: count,
        passedStages: completed.flatMap((passed, index) => passed ? [index] : []),
        dat: LearningProgress.assess(DATA.steps, state.passed || {}).completed
      }));
    } catch { /* reading mode remains available when persistent storage is blocked */ }
  }

  const stageComplete = step => LearningProgress.required(step).every(task => state.passed?.[task.id]);
  const unlocked = index => DATA.steps.slice(0, index).every(stageComplete);
  const assessment = () => LearningProgress.assess(DATA.steps, state.passed);
  const currentStage = () => DATA.steps.find(step => step.id === location.hash.slice(1)) || DATA.steps[0];

  function notify(message) {
    const toast = document.querySelector("#toast");
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 4200);
  }

  function gate() {
    boss?.huy();
    boss = null;
    profile = null;
    document.querySelector("#identity-bar").innerHTML = "";
    document.body.classList.add("at-gate");
    document.body.classList.remove("world-view");
    const profiles = read("profiles", []);
    app.innerHTML = `<main class="gate" id="main">
      <section class="gate-story">
        <nav class="course-nav" aria-label="Các bài học"><a href="index.html">01 · Bảng và quan hệ</a><a href="forms.html">02 · Form nhập liệu</a></nav>
        <h1>${DATA.kind === "forms" ? "Từ bảng dữ liệu.<br>Đến quầy mượn sách." : "Một thư viện.<br>Ba bảng dữ liệu."}</h1>
        <p>${DATA.kind === "forms" ? "Tạo Form để thêm và cập nhật lượt mượn. Ba chặng ngắn, tự thử sau mỗi phần và một Boss cuối." : "Ai đang mượn cuốn sách nào? Cùng tìm hiểu cách tổ chức và nối dữ liệu trong Microsoft Access."}</p>
        <div class="library-scene" aria-label="Minh họa một người đọc liên kết với sách qua lượt mượn">
          <div class="scene-shelf"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
          <div class="scene-card scene-reader"><span class="mini-label">NGƯỜI ĐỌC</span><strong>Nguyễn An</strong><span>SoTheTV <b>TV001</b></span></div>
          <div class="scene-ticket"><span>Phiếu mượn</span><strong>TV001 <i>↔</i> S001</strong><p>Ngày mượn &nbsp; 21/10/2026</p><div class="ticket-perforation"></div></div>
          <div class="scene-card scene-book"><span class="mini-label">SÁCH</span><strong>Bản đồ bầu trời</strong><span>MaSach <b>S001</b></span></div>
        </div>
        <p class="gate-route">${DATA.steps.map(s => esc(s.short)).join(' <span>→</span> ')}</p>
      </section>
      <section class="entry-card" aria-labelledby="entry-title">
        <span class="entry-icon" aria-hidden="true">A</span>
        <h2 id="entry-title">Bắt đầu bài học</h2>
        <p>Nhập thông tin để lưu tiến độ và ghi tên trên chứng chỉ.</p>
        <form id="identity-form">
          ${profiles.length ? `<label>Hồ sơ trên máy này<select id="saved-profile"><option value="">Tạo hồ sơ mới</option>${profiles.map(person => `<option value="${esc(person.id)}">${esc(person.name)} · ${esc(person.className)}</option>`).join("")}</select></label>` : ""}
          <label>Họ và tên<input name="name" required minlength="2" maxlength="80" autocomplete="name" placeholder="Nguyễn Minh An"></label>
          <label>Lớp<input name="className" required minlength="2" maxlength="24" autocomplete="off" placeholder="11A1"></label>
          <p class="form-error" id="identity-error" role="alert"></p>
          <button class="primary start-button" type="submit">Vào học <span aria-hidden="true">↗</span></button>
        </form>
        <p class="save-note">Tiến độ lưu trong trình duyệt trên máy này. Dùng đúng hồ sơ để học tiếp.</p>
      </section>
    </main>${sourcesFooter()}`;
    const savedSelect = document.querySelector("#saved-profile");
    savedSelect?.addEventListener("change", () => {
      const person = profiles.find(item => item.id === savedSelect.value);
      const form = document.querySelector("#identity-form");
      form.elements.name.value = person?.name || "";
      form.elements.className.value = person?.className || "";
      form.elements.name.readOnly = Boolean(person);
      form.elements.className.readOnly = Boolean(person);
      form.querySelector("button[type=submit]").firstChild.textContent = person ? "Tiếp tục học " : "Vào học ";
    });
    document.querySelector("#identity-form").addEventListener("submit", event => {
      event.preventDefault();
      const form = event.currentTarget;
      const name = normalize(form.elements.name.value);
      const className = normalize(form.elements.className.value).toUpperCase();
      if (name.length < 2 || className.length < 2) {
        document.querySelector("#identity-error").textContent = "Em hãy nhập đủ họ tên và lớp.";
        return;
      }
      let person = profiles.find(item => item.id === savedSelect?.value);
      person ||= profiles.find(item => item.name.toLocaleLowerCase("vi") === name.toLocaleLowerCase("vi") && item.className === className);
      if (!person) {
        person = { id: uid(), name, className };
        write("profiles", [...read("profiles", []), person]);
      }
      profile = person;
      session("profile", person.id);
      loadState();
      const desired = DATA.steps.findIndex(step => step.id === location.hash.slice(1));
      const id = desired >= 0 && unlocked(desired) ? DATA.steps[desired].id : state.lastStage;
      navigate(id);
    });
  }

  function navigate(id) {
    clearTimeout(toastTimer);
    document.querySelector("#toast").classList.remove("visible");
    const index = DATA.steps.findIndex(step => step.id === id);
    if (index < 0 || !unlocked(index)) {
      notify("Hoàn thành nhiệm vụ và checkpoint của chặng trước để mở phần này.");
      id = DATA.steps.find((step, i) => unlocked(i) && !stageComplete(step))?.id || "boss";
    }
    history.replaceState(null, "", "#" + id);
    update({ lastStage: id });
    if (viewMode === "world") renderWorld();
    else renderLesson();
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function sidebar() {
    return `<aside class="lesson-sidebar" aria-label="Lộ trình bài học">
      <div class="sidebar-heading">Lộ trình của em <b>${DATA.steps.slice(0, 3).filter(stageComplete).length}/3 chặng</b></div>
      <nav>${DATA.steps.map((step, index) => {
        const done = stageComplete(step);
        const open = unlocked(index);
        const active = currentStage().id === step.id;
        return `<button type="button" class="stage-link ${active ? "active" : ""} ${done ? "complete" : ""}" data-stage="${step.id}" ${open ? "" : "disabled"} ${active ? 'aria-current="step"' : ""} title="${open ? esc(step.title) : "Hoàn thành chặng trước để mở"}">
          <span class="stage-number ${!open ? "locked" : ""}" aria-hidden="true">${done ? "✓" : !open ? "" : index === 3 ? "★" : index + 1}</span>
          <span>${esc(step.short)}<small>${done ? "Đã hoàn thành" : open ? index === 3 ? "6 nhiệm vụ + thử thách vàng" : step.time : "Chưa mở"}</small></span>
        </button>`;
      }).join("")}</nav>
      <div class="sidebar-tip"><strong>Tự thử trước khi kiểm tra.</strong><p>Trả lời đúng checkpoint để mở chặng tiếp. Em luôn có thể quay lại chặng đã học.</p></div>
      <div class="session-status"><span class="saved-dot"></span>${storageOK ? "Đang tự lưu tiến độ" : "Đang lưu trong phiên"}</div>
    </aside>`;
  }

  function renderLesson() {
    boss?.huy();
    document.querySelector("#relationship-board")?._observer?.disconnect();
    boss = null;
    selectedEndpoint = null;
    document.body.classList.remove("at-gate");
    document.body.classList.remove("world-view");
    document.body.classList.toggle("embedded-lesson", embedded);
    const index = DATA.steps.findIndex(step => step.id === currentStage().id);
    if (!unlocked(index)) return navigate(DATA.steps[0].id);
    const step = DATA.steps[index];
    document.querySelector("#identity-bar").innerHTML = `<span class="person-avatar" aria-hidden="true">${esc(profile.name.trim().slice(0, 1))}</span><span class="person-name">${esc(profile.name)}<small>${esc(profile.className)}</small></span><button id="view-mode" type="button">Đảo 3D</button><button id="end-session" type="button">Đổi người học</button>`;
    app.innerHTML = `<div class="lesson-layout">${sidebar()}<main id="main" class="lesson-content" tabindex="-1">
      <nav class="course-nav" aria-label="Các bài học"><a href="index.html?mode=read" ${DATA.kind !== "forms" ? 'aria-current="page"' : ''}>01 · Bảng và quan hệ</a><a href="forms.html?mode=read" ${DATA.kind === "forms" ? 'aria-current="page"' : ''}>02 · Form nhập liệu</a></nav><header class="stage-heading"><p class="stage-kicker">${index === 3 ? "Checkpoint cuối" : "Chặng " + (index + 1) + " / 3"}</p><h1>${esc(step.title)}</h1><p>${esc(step.subtitle)}</p></header>
      ${index === 3 ? bossContent(step) : `<div class="learning-body">${stageContent(index)}${checkpoint(step)}</div>`}
      ${navigation(index)}
      ${sourcesFooter()}
    </main></div>`;
    document.querySelector("#end-session").addEventListener("click", endSession);
    document.querySelector("#view-mode").addEventListener("click", () => setViewMode("world"));
    document.querySelectorAll("[data-stage]").forEach(button => button.addEventListener("click", () => {
      if (embedded && button.id === "next-stage") {
        parent.postMessage({ ma: DATA.id, loai: "dong", tiep: true }, location.origin);
      } else navigate(button.dataset.stage);
    }));
    bindCommon();
    bindQuestions();
    bindDemos(index);
    if (index === 3) mountBoss();
    updateNavigation();
  }

  function endSession() {
    if (profile) write("ended:" + profile.id, Date.now());
    session("profile", null);
    history.replaceState(null, "", location.pathname + location.search);
    gate();
  }

  function setViewMode(mode) {
    if (embedded) {
      parent.postMessage({ ma: DATA.id, loai: "dong" }, location.origin);
      return;
    }
    viewMode = mode;
    const url = new URL(location.href);
    if (mode === "read") url.searchParams.set("mode", "read");
    else url.searchParams.delete("mode");
    history.replaceState(null, "", url);
    navigate(state.lastStage || "bang");
  }

  function renderWorld() {
    boss?.huy();
    boss = null;
    document.querySelector("#relationship-board")?._observer?.disconnect();
    document.body.classList.remove("at-gate", "embedded-lesson");
    document.body.classList.add("world-view");
    document.querySelector("#identity-bar").innerHTML = "";
    app.innerHTML = `<iframe id="access-world" src="${DATA.worldPage || "world.html"}" title="Đảo 3D ${esc(DATA.title)}" allow="autoplay; fullscreen" allowfullscreen></iframe><a class="world-course" href="${DATA.kind === "forms" ? "index.html" : "forms.html"}">${DATA.kind === "forms" ? "← Bài 01 · Bảng và quan hệ" : "Bài 02 · Form nhập liệu →"}</a>`;
  }

  function stageContent(index) {
    if (DATA.kind === "forms") return FormsLesson.html(index, state, photo, videoCard);
    if (index === 0) return `
      <section class="concept-section"><h2>Một bảng lưu thông tin về một loại đối tượng</h2>
        <p>Trong CSDL thư viện, bảng <strong>SÁCH</strong> lưu thông tin về sách. Bảng <strong>NGƯỜI ĐỌC</strong> lưu thông tin về người đọc. Bảng <strong>MƯỢN_TRẢ</strong> ghi lại từng lượt mượn.</p>
        <div class="concept-strip"><div><b>Trường <small>Field</small></b><p>Một cột, như TenSach. Các giá trị trong cột tuân theo kiểu dữ liệu đã chọn.</p></div><div><b>Bản ghi <small>Record</small></b><p>Một hàng chứa các giá trị mô tả một đối tượng hoặc một lượt mượn.</p></div><div><b>Bảng <small>Table</small></b><p>Tập hợp bản ghi có cùng cấu trúc trường.</p></div></div>
      </section>
      <section class="interactive-card" aria-labelledby="explorer-title"><div class="section-heading"><h2 id="explorer-title">Chạm vào bảng để đọc dữ liệu</h2><span class="task-status" id="explore-status">${state.passed.explore ? "Đã thử xong" : "Tự thử"}</span></div>
        <p id="explorer-instruction">Bấm tiêu đề <strong>TenSach</strong>, rồi bấm nút hàng có mã <strong>S002</strong>.</p>
        <div class="table-scroll"><table class="explorer-table"><caption>Bảng SÁCH · dữ liệu giả lập</caption><thead><tr><th scope="col">Chọn hàng</th>${["MaSach", "TenSach", "TacGia", "NamXuatBan"].map(name => `<th scope="col"><button type="button" data-field="${name}">${name}<span aria-hidden="true">↓</span></button></th>`).join("")}</tr></thead><tbody>${[
          ["S001", "Bản đồ bầu trời", "An Minh", "2022"], ["S002", "Khu vườn bốn mùa", "Hà Thu", "2023"], ["S003", "Nhật ký trên đảo", "Nam Sơn", "2021"]
        ].map(row => `<tr data-row="${row[0]}"><th scope="row"><button type="button" data-record="${row[0]}" aria-label="Chọn toàn bộ bản ghi ${row[0]}">Chọn ${row[0]}</button></th>${row.map((cell, i) => `<td data-column="${i}">${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
        <div class="interaction-result" id="explore-result" role="status">Chọn một cột hoặc một hàng để xem lời giải thích.</div>
      </section>
      <div class="note-box"><strong>CSDL và phần mềm Access</strong><p>Tệp <code>ThuVien.accdb</code> chứa CSDL. Microsoft Access là phần mềm quản trị giúp em tạo bảng, nhập dữ liệu và thiết lập quan hệ.</p></div>
      ${videoCard("tables")}`;
    if (index === 1) return `
      <section class="concept-section"><h2>Khóa chính nhận diện riêng từng bản ghi</h2><p><strong>Primary Key (PK)</strong> là trường hoặc nhóm trường được chọn để nhận diện duy nhất mỗi bản ghi. Giá trị khóa chính <strong>không trùng</strong> và <strong>không trống</strong>. Trong bài này, mỗi bảng dùng một trường làm khóa chính.</p></section>
      <section class="interactive-card"><div class="section-heading"><h2>Họ tên hay số thẻ?</h2><span class="task-status" id="key-status">${state.passed["key-lab"] ? "Đã thử xong" : "Tự thử"}</span></div>
        <p>Hai người đọc cùng tên Nguyễn An. Thử chọn một cột để làm khóa chính.</p>
        <div class="table-scroll"><table class="key-table"><thead><tr><th>SoTheTV</th><th>HoVaTen</th><th>Lop</th></tr></thead><tbody><tr><td>TV001</td><td data-duplicate>Nguyễn An</td><td>11A1</td></tr><tr><td>TV002</td><td data-duplicate>Nguyễn An</td><td>11A1</td></tr><tr><td>TV003</td><td>Lê Chi</td><td>11A2</td></tr></tbody></table></div>
        <div class="button-row key-buttons">${["HoVaTen", "SoTheTV", "Lop"].map(name => `<button type="button" data-key="${name}">Thử ${name}</button>`).join("")}</div>
        <div id="key-result" class="interaction-result" role="status">Cột nào còn phân biệt được hai người cùng tên?</div>
      </section>
      <section class="concept-section"><h2>Tạo tệp và khai báo bảng trong Access</h2><ol class="instruction-list"><li>Chọn <strong>Blank database</strong>, đặt tên <code>ThuVien.accdb</code> và chọn nơi lưu.</li><li>Đóng tab Table1 mặc định, rồi chọn <strong>Create → Table Design</strong>.</li><li>Nhập tên trường vào <strong>Field Name</strong>, chọn <strong>Data Type</strong>. Ở phần <strong>Field Properties</strong> bên dưới, chỉnh <strong>Field Size</strong> khi cần.</li><li>Bấm ô xám đầu dòng của trường khóa, chọn <strong>Primary Key</strong>. Nhấn <strong>Ctrl+S</strong> và đặt tên bảng.</li></ol>
        <div class="photo-grid">${photo("create", "Create → Table Design", "Chọn Table Design để tự khai báo cấu trúc bảng.")}${photo("field-type", "Field Name và Data Type", "SoTheTV được khai báo kiểu Short Text.")}${photo("field-size", "Thuộc tính Field Size", "Chọn trường SoTheTV rồi đổi Field Size thành 10.")}${photo("primary-key", "Dấu chìa khóa", "Biểu tượng chìa khóa xuất hiện ở đầu dòng SoTheTV.")}</div>
      </section>
      <section class="interactive-card"><div class="section-heading"><h2>Thử thiết kế bốn trường</h2><span class="task-status" id="type-status">${state.passed["type-lab"] ? "Đã thử xong" : "Tự thử"}</span></div><p>Chọn kiểu và thuộc tính phù hợp. <strong>Integer</strong> được chọn ở Field Size của trường Number.</p>
        <form id="type-lab-form"><div class="type-lab-grid"><span class="grid-head">Field Name</span><span class="grid-head">Data Type</span><span class="grid-head">Field Size / thuộc tính</span>${["SoTheTV", "NgaySinh", "NamXuatBan", "MaMuonTra"].map((field, i) => `<label for="type-${i}" class="type-field">${field}</label><select id="type-${i}" name="type-${i}" aria-label="Kiểu dữ liệu ${field}" required><option value="">Chọn kiểu</option>${["Short Text", "Number", "Date/Time", "AutoNumber"].map(value => `<option ${state.demos.types?.["type-"+i] === value ? "selected" : ""}>${value}</option>`).join("")}</select><select name="size-${i}" aria-label="Thuộc tính ${field}" required><option value="">Chọn thuộc tính</option>${["10", "50", "Integer", "Không cần đặt"].map(value => `<option ${state.demos.types?.["size-"+i] === value ? "selected" : ""}>${value}</option>`).join("")}</select>`).join("")}</div><button type="submit" class="primary">Kiểm tra thiết kế</button></form><div id="type-result" class="interaction-result" role="status">Với Date/Time và AutoNumber trong bài, chọn “Không cần đặt”.</div>
      </section>
      ${dictionary()}
      ${videoCard("design")}`;
    return `
      <section class="concept-section"><h2>Khóa ngoại đưa ta đến bản ghi liên quan</h2><p><strong>Foreign Key (FK)</strong> lưu giá trị tham chiếu tới khóa ở bảng khác. Trong MƯỢN_TRẢ, <code>SoTheTV</code> giúp tìm người đọc, còn <code>MaSach</code> giúp tìm sách.</p><p>Một người đọc có thể có nhiều lượt mượn. Vì vậy, <code>SoTheTV</code> ở MƯỢN_TRẢ có thể lặp. Quan hệ này có dạng <strong>một–nhiều (1–∞)</strong>.</p></section>
      <section class="interactive-card"><div class="section-heading"><h2>Tự nối hai quan hệ</h2><span class="task-status" id="relationship-status">${state.passed["relationship-lab"] ? "Đã thử xong" : "Tự thử"}</span></div><p>Bấm khóa chính ở bảng bên trái, rồi bấm khóa ngoại tương ứng ở MƯỢN_TRẢ. Em có thể dùng Tab và Enter để chọn.</p>
        <div class="relationship-board" id="relationship-board"><canvas id="relationship-lines" aria-hidden="true"></canvas>
          <div class="relation-parents"><div class="relation-table"><h3>NGƯỜI ĐỌC</h3><button type="button" data-endpoint="reader" aria-pressed="false"><b class="key-tag">PK</b> SoTheTV</button><p>HoVaTen<br>Lop</p></div><div class="relation-table"><h3>SÁCH</h3><button type="button" data-endpoint="book" aria-pressed="false"><b class="key-tag">PK</b> MaSach</button><p>TenSach<br>TacGia</p></div></div>
          <div class="relation-child relation-table"><h3>MƯỢN_TRẢ</h3><p><b class="key-tag">PK</b> MaMuonTra</p><button type="button" data-endpoint="reader-fk"><b class="key-tag foreign">FK</b> SoTheTV</button><button type="button" data-endpoint="book-fk"><b class="key-tag foreign">FK</b> MaSach</button><p>NgayMuon<br>HanTra</p></div>
        </div><div id="relationship-result" class="interaction-result" role="status">Bắt đầu bằng SoTheTV hoặc MaSach ở bảng bên trái.</div>
      </section>
      <section class="concept-section"><h2>Tạo Relationships trong Access</h2><ol class="instruction-list"><li>Lưu và đóng các tab bảng. Chọn <strong>Database Tools → Relationships</strong>.</li><li>Thêm ba bảng bằng <strong>Add Tables</strong>. Một số phiên bản dùng tên <strong>Show Table</strong>.</li><li>Kéo <strong>NGƯỜI ĐỌC.SoTheTV</strong> vào <strong>MƯỢN_TRẢ.SoTheTV</strong>.</li><li>Trong Edit Relationships, kiểm tra đúng cặp trường, tích <strong>Enforce Referential Integrity</strong>, rồi bấm <strong>Create</strong>.</li><li>Làm tương tự với <strong>SÁCH.MaSach → MƯỢN_TRẢ.MaSach</strong>. Kiểm tra hai đường nối <strong>1–∞</strong> và lưu sơ đồ.</li></ol><p class="callout">Hai cặp trường mã trong đề đều dùng <strong>Short Text, Field Size 10</strong>. Kiểm tra kiểu trường trước khi tạo liên kết.</p><div class="photo-grid">${photo("tools", "Database Tools → Relationships", "Nút Relationships mở vùng thiết kế quan hệ.")}${photo("add-tables", "Thêm ba bảng", "Mỗi bảng xuất hiện trong một khung liệt kê trường.")}${photo("enforce", "Bật toàn vẹn tham chiếu", "Trong Edit Relationships, tích Enforce Referential Integrity trước khi tạo liên kết.")}${photo("relationships", "Sơ đồ sau khi tạo hai quan hệ", "Các đầu 1 nằm ở bảng NGƯỜI ĐỌC, SÁCH; các đầu ∞ ở MƯỢN_TRẢ.")}</div></section>
      <section class="interactive-card"><div class="section-heading"><h2>Mã chưa tồn tại có lưu được không?</h2><span class="task-status" id="integrity-status">${state.passed["integrity-lab"] ? "Đã thử xong" : "Tự thử"}</span></div><p>Trong ví dụ này, TV001 đã có trong NGƯỜI ĐỌC. Bảng SÁCH chỉ có <strong>S001, S002, S003</strong>.</p><label class="switch-label"><input type="checkbox" id="enforce" checked> Enforce Referential Integrity <span>Toàn vẹn tham chiếu</span></label>
        <form id="integrity-form" class="loan-form"><label>SoTheTV<input value="TV001" readonly></label><label>MaSach<input name="bookCode" id="book-code" value="S999" required maxlength="10" autocomplete="off"></label><button type="submit" class="primary">Thử lưu lượt mượn</button></form>
        <div id="integrity-result" class="interaction-result" role="status">Thử S999 trước, rồi đổi sang một mã sách đang có. Giữ toàn vẹn tham chiếu ở trạng thái bật.</div><p class="small-note">Đây là mô phỏng quy tắc lưu dữ liệu. Em sẽ thực hiện lại trong phần mềm Access ở bài Canvas.</p>
      </section>${videoCard("relations")}
      <div class="note-box"><strong>Thứ tự nhập dữ liệu</strong><p>Nhập NGƯỜI ĐỌC và SÁCH trước, sau đó nhập MƯỢN_TRẢ. Access tự tạo MaMuonTra. Nếu sách chưa trả, có thể để NgayTra trống.</p></div>`;
  }

  function photo(name, title, caption) {
    const dimensions = window.ACCESS_PHOTOS[name];
    return `<figure class="access-photo"><button type="button" data-image="assets/access/original/${name}.png" data-title="${esc(title)}" data-caption="${esc(caption)}" aria-label="Mở ảnh lớn: ${esc(title)}"><img src="assets/access/${name}.png" width="${dimensions.width}" height="${dimensions.height}" style="--photo-width:${dimensions.width}px" loading="lazy" alt="${esc(caption)}"><span>Xem toàn cửa sổ ⤢</span></button><figcaption><strong>${esc(title)}</strong><p>${esc(caption)}</p></figcaption></figure>`;
  }

  function videoCard(key) {
    const video = DATA.media[key];
    if (!video) return "";
    return `<section class="video-card"><div class="video-header"><span class="play-icon" aria-hidden="true">▶</span><div><h3>Video LearnFree</h3><p>${esc(video.title)}${key === "relations" ? " · Giao diện Access 2007" : ""}</p></div></div><div class="video-content"><div class="video-ratio"><iframe src="https://www.youtube-nocookie.com/embed/${video.id}?rel=0" title="${esc(video.title)} của LearnFree" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div><p><strong>Tóm tắt tiếng Việt</strong> · ${esc(video.summary)}</p><p class="small-note">Video tiếng Anh. ${key === "relations" ? "Vị trí nút ở Access hiện tại có thể khác giao diện trong video. " : ""}<a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener noreferrer">Mở video trên YouTube</a></p></div></section>`;
  }

  function dictionary() {
    return `<details class="dictionary"><summary>Cấu trúc đầy đủ của ba bảng trong bài thực hành</summary><div class="dictionary-content">${Object.entries(DATA.fields).map(([name, fields]) => `<section><h3>${name}</h3><div class="table-scroll"><table><thead><tr><th>Field Name</th><th>Data Type</th><th>Field Size</th><th>Khóa</th></tr></thead><tbody>${fields.map(row => `<tr>${row.map(cell => `<td>${cell || "—"}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section>`).join("")}<p class="small-note">PK là khóa chính. FK là khóa ngoại. Nhãn FK mô tả vai trò của trường sau khi tạo quan hệ. Dấu — là thuộc tính không cần chỉnh theo đề bài.</p></div></details>`;
  }

  function checkpoint(step) {
    return `<section class="checkpoint-section"><div class="checkpoint-heading"><span class="checkpoint-icon" aria-hidden="true">✓</span><div><h2>Checkpoint ngắn</h2><p>Hoàn thành phần tự thử và trả lời đúng 3 câu để mở chặng tiếp.</p></div></div>${step.challenges.filter(question => question.type !== "demo").map(questionCard).join("")}</section>`;
  }

  function questionCard(question) {
    const done = Boolean(state.passed[question.id]);
    return `<article class="question-card ${done ? "passed" : ""}" data-question="${question.id}"><div class="question-top"><span class="question-kind">${{ single: "Một đáp án", multi: "Nhiều đáp án", select: "Điền lựa chọn", match: "Ghép cặp", order: "Sắp xếp", truefalse: "Đúng / Sai" }[question.type]}</span><span class="question-status">${done ? "✓ Đã hoàn thành" : ""}</span></div><h3>${esc(question.title)}</h3><p>${esc(question.prompt)}</p><form data-answer="${question.id}"><fieldset ${done ? "disabled" : ""}><legend class="sr-only">${esc(question.title)}</legend>${questionInputs(question)}<button class="primary check-answer" type="submit">Kiểm tra</button></fieldset></form><div class="answer-feedback ${done ? "success" : ""}" role="status">${done ? esc(question.explanation) : ""}</div></article>`;
  }

  function questionInputs(question) {
    const draft = state.drafts[question.id];
    if (["single", "multi", "truefalse"].includes(question.type)) {
      const options = question.options || ["Đúng", "Sai"];
      return `<div class="answer-options">${options.map((option, index) => {
        const selected = question.type === "multi" ? Array.isArray(draft) && draft.includes(option) : draft === option;
        return `<label class="answer-option"><input type="${question.type === "multi" ? "checkbox" : "radio"}" name="answer" aria-label="${esc(option)}" value="${esc(option)}" ${selected ? "checked" : ""}><span class="option-marker" aria-hidden="true">${String.fromCharCode(65 + index)}</span><span>${esc(option)}</span></label>`;
      }).join("")}</div>`;
    }
    if (question.type === "order") {
      const ids = Array.isArray(draft) && draft.length === question.items.length ? draft : question.items.map(item => item.id);
      return `<ol class="order-list" data-order="${question.id}">${ids.map(id => {
        const item = question.items.find(value => value.id === id);
        return `<li draggable="true" data-item="${item.id}" class="order-item"><span class="drag-handle" aria-hidden="true">⠿</span><span>${esc(item.text)}</span><span class="order-actions"><button type="button" data-move="-1" aria-label="Đưa lên: ${esc(item.text)}">↑</button><button type="button" data-move="1" aria-label="Đưa xuống: ${esc(item.text)}">↓</button></span></li>`;
      }).join("")}</ol>`;
    }
    return `<div class="matching-inputs">${question.items.map((item, index) => `<label><span>${esc(item.label)}</span><select name="item-${index}"><option value="">Chọn câu trả lời</option>${item.options.map(option => `<option value="${esc(option)}" ${draft?.[index] === option ? "selected" : ""}>${esc(option)}</option>`).join("")}</select></label>`).join("")}</div>`;
  }

  function getAnswer(form, question) {
    if (question.type === "order") return [...form.querySelectorAll("[data-item]")].map(item => item.dataset.item);
    const values = new FormData(form);
    if (question.type === "multi") return values.getAll("answer");
    if (question.items) return question.items.map((item, index) => values.get("item-" + index) || "");
    return values.get("answer") || "";
  }

  function correct(question, answer) {
    if (question.type === "multi") return Array.isArray(answer) && answer.length === question.answer.length && question.answer.every(option => answer.includes(option));
    if (question.type === "order") return JSON.stringify(answer) === JSON.stringify(question.answer);
    if (question.items) return question.items.every((item, index) => answer[index] === item.answer);
    return answer === question.answer;
  }

  function bindQuestions() {
    document.querySelectorAll("form[data-answer]").forEach(form => {
      const question = allQuestions.find(item => item.id === form.dataset.answer);
      form.addEventListener("change", () => update({ drafts: { [question.id]: getAnswer(form, question) } }));
      form.addEventListener("submit", event => {
        event.preventDefault();
        if (state.passed[question.id]) return;
        const answer = getAnswer(form, question);
        const card = form.closest(".question-card");
        const feedback = card.querySelector(".answer-feedback");
        const right = correct(question, answer);
        const attempt = (state.attempts[question.id] || 0) + 1;
        update({ drafts: { [question.id]: answer }, attempts: { [question.id]: attempt } });
        feedback.className = "answer-feedback " + (right ? "success" : "retry");
        feedback.textContent = right ? question.explanation : attempt === 1 ? "Gợi ý · " + question.hint : "Cùng xem lại · " + question.explanation + " Em hãy sửa câu trả lời rồi kiểm tra lại.";
        if (right) {
          const wasComplete = assessment().completed;
          markPassed(question.id);
          card.classList.add("passed");
          form.querySelector("fieldset").disabled = true;
          card.querySelector(".question-status").textContent = "✓ Đã hoàn thành";
          if (currentStage().kind === "boss") {
            if (!question.advanced) boss?.dmg(Math.round(100 / assessment().boss.total));
            updateBoss();
            if (!wasComplete && assessment().completed) {
              boss?.thang();
              notify("Em đã vượt Boss! Chứng chỉ Bạc đã sẵn sàng.");
              document.querySelector("#certificate-action").focus();
            }
          }
        } else if (currentStage().kind === "boss") boss?.treu();
      });
    });
    document.querySelectorAll(".order-list").forEach(list => {
      let dragging = null;
      const saveOrder = () => update({ drafts: { [list.dataset.order]: [...list.children].map(item => item.dataset.item) } });
      list.addEventListener("click", event => {
        const button = event.target.closest("[data-move]");
        if (!button || list.closest("fieldset").disabled) return;
        const item = button.closest("li");
        const direction = Number(button.dataset.move);
        const sibling = direction < 0 ? item.previousElementSibling : item.nextElementSibling;
        if (!sibling) return;
        if (direction < 0) list.insertBefore(item, sibling);
        else list.insertBefore(sibling, item);
        saveOrder();
        button.focus();
      });
      list.addEventListener("dragstart", event => {
        if (list.closest("fieldset").disabled) return event.preventDefault();
        dragging = event.target.closest("li");
        event.dataTransfer.setData("text/plain", dragging.dataset.item);
        dragging.classList.add("dragging");
      });
      list.addEventListener("dragover", event => event.preventDefault());
      list.addEventListener("drop", event => {
        event.preventDefault();
        const target = event.target.closest("li");
        if (!dragging || !target || dragging === target || list.closest("fieldset").disabled) return;
        const after = event.clientY > target.getBoundingClientRect().top + target.offsetHeight / 2;
        list.insertBefore(dragging, after ? target.nextSibling : target);
        saveOrder();
      });
      list.addEventListener("dragend", () => {
        dragging?.classList.remove("dragging");
        dragging = null;
      });
    });
  }

  function markPassed(id) {
    const index = DATA.steps.findIndex(step => step.challenges.some(task => task.id === id));
    if (!profile || !unlocked(index)) return;
    update({ passed: { [id]: true } });
    updateNavigation();
  }

  function bindDemos(index) {
    if (DATA.kind === "forms") return FormsLesson.bind(index, { getState: () => state, update, markPassed });
    if (index === 0) {
      document.querySelectorAll("[data-field]").forEach(button => button.addEventListener("click", () => {
        const name = button.dataset.field;
        const column = ["MaSach", "TenSach", "TacGia", "NamXuatBan"].indexOf(name);
        document.querySelectorAll(".explorer-table .highlight-column").forEach(cell => cell.classList.remove("highlight-column"));
        document.querySelectorAll(`.explorer-table [data-column="${column}"]`).forEach(cell => cell.classList.add("highlight-column"));
        document.querySelector("#explore-result").textContent = `Cột ${name} là một trường. Các ô bên dưới lưu giá trị ${name} của từng cuốn sách.`;
        const explored = { ...state.demos.explore, field: name === "TenSach" || state.demos.explore?.field };
        update({ demos: { explore: explored } });
        finishExplorer();
      }));
      document.querySelectorAll("[data-record]").forEach(button => button.addEventListener("click", () => {
        document.querySelectorAll(".explorer-table .highlight-row").forEach(row => row.classList.remove("highlight-row"));
        button.closest("tr").classList.add("highlight-row");
        document.querySelector("#explore-result").textContent = `Hàng ${button.dataset.record} là một bản ghi. Nó tập hợp mã, tên sách, tác giả và năm xuất bản của cuốn sách này.`;
        const explored = { ...state.demos.explore, record: button.dataset.record === "S002" || state.demos.explore?.record };
        update({ demos: { explore: explored } });
        finishExplorer();
      }));
    }
    if (index === 1) {
      document.querySelectorAll("[data-key]").forEach(button => button.addEventListener("click", () => {
        const good = button.dataset.key === "SoTheTV";
        document.querySelectorAll("[data-key]").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
        document.querySelector(".key-table").classList.toggle("show-duplicates", !good);
        const result = document.querySelector("#key-result");
        result.classList.toggle("good", good);
        result.textContent = good ? "Đúng. TV001, TV002 và TV003 đều khác nhau và không trống. SoTheTV phân biệt được từng người đọc." : `${button.dataset.key} có giá trị trùng. Hai người đọc vẫn có thể cùng tên và cùng lớp, nên trường này chưa nhận diện riêng từng người.`;
        if (good) {
          markPassed("key-lab");
          document.querySelector("#key-status").textContent = "Đã thử xong";
        }
      }));
      const typesForm = document.querySelector("#type-lab-form");
      typesForm.addEventListener("change", () => update({ demos: { types: Object.fromEntries(new FormData(typesForm)) } }));
      typesForm.addEventListener("submit", event => {
        event.preventDefault();
        const values = Object.fromEntries(new FormData(typesForm));
        const expected = [["Short Text", "10"], ["Date/Time", "Không cần đặt"], ["Number", "Integer"], ["AutoNumber", "Không cần đặt"]];
        const wrong = expected.map((pair, i) => values["type-"+i] !== pair[0] || values["size-"+i] !== pair[1] ? ["SoTheTV", "NgaySinh", "NamXuatBan", "MaMuonTra"][i] : null).filter(Boolean);
        update({ demos: { types: values } });
        const result = document.querySelector("#type-result");
        result.classList.toggle("good", !wrong.length);
        result.textContent = wrong.length ? `Xem lại ${wrong.join(", ")}. Mã thẻ là văn bản dài tối đa 10 ký tự; năm xuất bản là số nguyên; ngày dùng Date/Time; mã lượt mượn tự sinh.` : "Bốn trường đã đúng. Em có thể dùng cách này để khai báo các trường còn lại trong Access.";
        if (!wrong.length) {
          markPassed("type-lab");
          document.querySelector("#type-status").textContent = "Đã thử xong";
        }
      });
    }
    if (index === 2) {
      document.querySelectorAll("[data-endpoint]").forEach(button => button.addEventListener("click", () => {
        const endpoint = button.dataset.endpoint;
        const result = document.querySelector("#relationship-result");
        if (!endpoint.endsWith("-fk")) {
          selectedEndpoint = endpoint;
          document.querySelectorAll("[data-endpoint]").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
          result.textContent = `Đã chọn ${endpoint === "reader" ? "NGƯỜI ĐỌC.SoTheTV" : "SÁCH.MaSach"}. Bây giờ chọn trường tương ứng ở MƯỢN_TRẢ.`;
          return;
        }
        if (!selectedEndpoint) { result.textContent = "Chọn khóa chính ở bảng bên trái trước."; return; }
        if (endpoint !== selectedEndpoint + "-fk") { result.textContent = "Hai trường này mô tả hai loại mã khác nhau. Hãy nối mã thẻ với mã thẻ, mã sách với mã sách."; return; }
        const links = { ...state.demos.links, [selectedEndpoint]: true };
        update({ demos: { links } });
        result.textContent = selectedEndpoint === "reader" ? "Đã nối SoTheTV. Một người đọc có thể có nhiều lượt mượn." : "Đã nối MaSach. Một sách có thể xuất hiện trong nhiều lượt mượn.";
        selectedEndpoint = null;
        document.querySelectorAll("[data-endpoint]").forEach(item => item.setAttribute("aria-pressed", "false"));
        if (links.reader && links.book) {
          markPassed("relationship-lab");
          document.querySelector("#relationship-status").textContent = "Đã thử xong";
          result.textContent = "Đã nối đủ hai quan hệ 1–∞. Hai trường FK ở MƯỢN_TRẢ tham chiếu đúng bảng tương ứng.";
        }
        drawRelationships();
      }));
      const board = document.querySelector("#relationship-board");
      const observer = new ResizeObserver(drawRelationships);
      observer.observe(board);
      board._observer = observer;
      drawRelationships();
      document.querySelector("#integrity-form").addEventListener("submit", event => {
        event.preventDefault();
        const code = normalize(document.querySelector("#book-code").value).toUpperCase();
        document.querySelector("#book-code").value = code;
        const enforce = document.querySelector("#enforce").checked;
        const exists = ["S001", "S002", "S003"].includes(code);
        const result = document.querySelector("#integrity-result");
        result.classList.toggle("good", exists && enforce);
        if (!enforce) {
          result.textContent = exists ? "Mã sách đang có. Bật toàn vẹn tham chiếu rồi thử thêm một mã chưa có để so sánh." : `Khi tắt ràng buộc, ${code} có thể được lưu dù chưa có sách tương ứng. Bản ghi này bị mất tham chiếu. Bật lại ràng buộc và thử lưu.`;
          return;
        }
        result.textContent = exists ? `Đã lưu lượt mượn với ${code}. Mã này tìm được sách tương ứng trong bảng SÁCH.` : `Không lưu được. ${code} chưa có trong SÁCH, nên Access yêu cầu một bản ghi liên quan. Đổi sang S001, S002 hoặc S003 rồi thử lại.`;
        const trials = { ...state.demos.integrity, [exists ? "valid" : "invalid"]: true };
        update({ demos: { integrity: trials } });
        if (trials.valid && trials.invalid) {
          markPassed("integrity-lab");
          document.querySelector("#integrity-status").textContent = "Đã thử xong";
        }
      });
    }
  }

  function finishExplorer() {
    if (state.demos.explore?.field && state.demos.explore?.record) {
      markPassed("explore");
      document.querySelector("#explore-status").textContent = "Đã thử xong";
    }
  }

  function drawRelationships() {
    const canvas = document.querySelector("#relationship-lines");
    if (!canvas) return;
    const board = canvas.parentElement.getBoundingClientRect();
    const ratio = devicePixelRatio || 1;
    canvas.width = board.width * ratio;
    canvas.height = board.height * ratio;
    const context = canvas.getContext("2d");
    context.scale(ratio, ratio);
    for (const link of ["reader", "book"]) {
      if (!state.demos.links?.[link]) continue;
      const source = document.querySelector(`[data-endpoint="${link}"]`).getBoundingClientRect();
      const target = document.querySelector(`[data-endpoint="${link}-fk"]`).getBoundingClientRect();
      const x1 = source.right - board.left + 2;
      const y1 = source.top + source.height / 2 - board.top;
      const x2 = target.left - board.left - 2;
      const y2 = target.top + target.height / 2 - board.top;
      context.strokeStyle = link === "reader" ? "#6752b5" : "#127d68";
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(x1, y1);
      context.bezierCurveTo((x1+x2)/2, y1, (x1+x2)/2, y2, x2, y2);
      context.stroke();
      context.font = "bold 18px 'Segoe UI', sans-serif";
      context.fillStyle = context.strokeStyle;
      context.fillText("1", x1+5, y1-9);
      context.fillText("∞", x2-23, y2-9);
    }
  }

  function navigation(index) {
    const step = DATA.steps[index];
    return `<div class="stage-navigation">${index > 0 ? `<button type="button" data-stage="${DATA.steps[index-1].id}">← Chặng trước</button>` : "<span></span>"}${index < 3 ? `<button type="button" class="primary" id="next-stage" data-stage="${DATA.steps[index+1].id}" ${stageComplete(step) ? "" : "disabled"}>${embedded ? "Hoàn thành và về đảo 3D" : index === 2 ? "Đến Boss cuối" : "Sang chặng tiếp"} →</button>` : ""}<p id="stage-missing" role="status"></p></div>`;
  }

  function updateNavigation() {
    const step = currentStage();
    const next = document.querySelector("#next-stage");
    const missing = LearningProgress.required(step).filter(task => !state.passed[task.id]);
    if (next) next.disabled = missing.length > 0;
    const message = document.querySelector("#stage-missing");
    if (message) message.textContent = step.kind === "boss" ? "" : missing.length ? "Còn cần hoàn thành · " + missing.map(task => task.title).join(" · ") : "Chặng đã hoàn thành. Em có thể học tiếp.";
    document.querySelectorAll(".stage-link").forEach((button, index) => {
      const done = stageComplete(DATA.steps[index]);
      const open = unlocked(index);
      button.disabled = !open;
      button.classList.toggle("complete", done);
      const marker = button.querySelector(".stage-number");
      marker.classList.toggle("locked", !open);
      marker.textContent = done ? "✓" : !open ? "" : index === 3 ? "★" : index + 1;
      if (done) button.querySelector("small").textContent = "Đã hoàn thành";
      else if (open) button.querySelector("small").textContent = index === 3 ? "6 nhiệm vụ + thử thách vàng" : DATA.steps[index].time;
    });
    document.querySelector(".sidebar-heading b")?.replaceChildren(`${DATA.steps.slice(0, 3).filter(stageComplete).length}/3 chặng`);
  }

  function bossContent(step) {
    return `<div class="boss-layout"><div class="boss-work"><div class="boss-intro"><h2>Giải 6 nhiệm vụ để mở thư viện</h2><p>Mỗi nhiệm vụ hoàn thành sẽ làm giảm máu Boss. Có thể sửa câu trả lời và thử lại. Chứng chỉ Bạc mở khi em hoàn thành cả 6 nhiệm vụ cùng các chặng trước.</p></div>${step.challenges.filter(question => !question.advanced).map(questionCard).join("")}
      <section class="certificate-panel" id="certificate-panel"><h2 id="certificate-status">Chứng chỉ của em</h2><p id="certificate-message"></p><button type="button" class="primary" id="certificate-action" disabled>Xem chứng chỉ</button></section>
      <details class="advanced-section"><summary>Thử thách Vàng · 2 câu mở rộng <span>Tùy chọn</span></summary><p>Hoàn thành cả hai câu sau khi vượt Boss để nâng hạng chứng chỉ.</p>${step.challenges.filter(question => question.advanced).map(questionCard).join("")}</details>
      <section class="canvas-task"><h2>Sẵn sàng thực hành trên Canvas</h2>${DATA.kind === "forms" ? '<p>Mở CSDL thư viện của bài trước. Tạo <code>F_MuonTra</code> bằng Form Wizard với nguồn MƯỢN_TRẢ và đủ bảy trường. Thêm ít nhất <strong>2 lượt mượn hợp lệ qua Form</strong>, rồi cập nhật NgayTra và TrangThai cho một lượt.</p><p>Thử một mã sách chưa tồn tại, chụp thông báo, sửa mã rồi lưu. Nộp tệp Access, ảnh Form View, ảnh Record Source và ảnh bảng đối chiếu. Viết tối đa 100 từ giải thích Form lưu dữ liệu ở đâu và vì sao mã sai bị chặn.</p><a href="bai02-form-canvas.html" target="_blank" rel="noopener">Xem đầy đủ yêu cầu thực hành →</a>' : '<p>Mở Microsoft Access và tự tạo <code>ThuVien.accdb</code> với ba bảng đúng cấu trúc đã học. Tạo hai quan hệ có toàn vẹn tham chiếu. Nhập ít nhất <strong>5 người đọc, 5 sách và 10 lượt mượn</strong>.</p>'}<p>Thực hiện theo bài giao trên Canvas của lớp. Chứng chỉ ghi nhận phần tự học trên web.</p></section>
      </div><aside class="boss-dock" aria-label="Tiến độ Boss"><div id="boss-character" aria-label="Nhân vật Boss người giữ thư viện" role="img"></div><h2>Người giữ thư viện</h2><button id="boss-toggle" class="boss-toggle" type="button" aria-expanded="false">Hiện Boss</button><div class="boss-stats"><strong id="boss-hp-text">Máu 100%</strong><span id="boss-count">0/6</span></div><div class="hp-track" role="progressbar" aria-label="Máu Boss còn lại" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100"><div id="hp-fill"></div></div><p id="boss-completion"></p><div class="b3-noi">Ta đang giữ 6 cánh cửa. Dùng kiến thức của em để mở từng cửa nhé!</div><details class="boss-missing"><summary>Nhiệm vụ còn lại</summary><ul id="boss-missing-list"></ul></details></aside></div>`;
  }

  function mountBoss() {
    boss = Boss3D.mount(document.querySelector("#boss-character"), { kieu: "rong", mau: "#f29a37" });
    updateBoss();
    document.querySelector("#certificate-action").addEventListener("click", showCertificate);
    document.querySelector("#boss-toggle").addEventListener("click", event => {
      const expanded = document.querySelector(".boss-dock").classList.toggle("expanded");
      event.currentTarget.setAttribute("aria-expanded", String(expanded));
      event.currentTarget.textContent = expanded ? "Thu gọn" : "Hiện Boss";
    });
  }

  function updateBoss() {
    const result = assessment();
    const hpText = document.querySelector("#boss-hp-text");
    if (!hpText) return;
    hpText.textContent = "Máu " + result.boss.hp + "%";
    document.querySelector("#boss-count").textContent = result.boss.done + "/" + result.boss.total;
    document.querySelector("#hp-fill").style.width = result.boss.hp + "%";
    document.querySelector(".hp-track").setAttribute("aria-valuenow", result.boss.hp);
    document.querySelector("#boss-completion").textContent = result.completed ? "Đã vượt Boss!" : result.boss.done + "/6 nhiệm vụ đã hoàn thành";
    document.querySelector("#boss-missing-list").innerHTML = result.missing.map(task => `<li>${esc(task.title)}</li>`).join("") || "<li>Em đã hoàn thành tất cả nhiệm vụ cốt lõi.</li>";
    document.querySelector("#certificate-action").disabled = !result.completed;
    document.querySelector("#certificate-status").textContent = result.gold ? "Chứng chỉ Vàng đã sẵn sàng" : result.completed ? "Chứng chỉ Bạc đã sẵn sàng" : "Hoàn thành Boss để nhận chứng chỉ";
    document.querySelector("#certificate-message").textContent = result.gold ? "Em đã hoàn thành bài học và cả hai câu mở rộng." : result.completed ? "Em đã hoàn thành ba chặng và sáu nhiệm vụ Boss. Có thể nhận chứng chỉ ngay hoặc thử thêm hai câu Vàng." : "Tiến độ từng nhiệm vụ được tự lưu để em học tiếp.";
    if (result.completed) {
      const badge = result.gold ? "gold" : "silver";
      if (!state.certificate?.[badge]) update({ certificate: { ...state.certificate, [badge]: new Date().toISOString() } });
    }
  }

  function bindCommon() {
    document.querySelectorAll("[data-image]").forEach(button => button.addEventListener("click", () => {
      const image = document.querySelector("#image-full");
      document.querySelector(".image-scroll").classList.remove("actual-size");
      document.querySelector("#image-actual").setAttribute("aria-pressed", "false");
      image.src = button.dataset.image;
      image.alt = button.dataset.caption;
      document.querySelector("#image-title").textContent = button.dataset.title;
      document.querySelector("#image-caption").textContent = button.dataset.caption + " Ảnh chụp Microsoft Access thật, giữ mật độ điểm ảnh gốc.";
      document.querySelector("#image-dialog").showModal();
    }));
  }

  function showCertificate() {
    const result = assessment();
    if (!result.completed) return notify("Hoàn thành các nhiệm vụ còn thiếu trước khi nhận chứng chỉ.");
    const canvas = document.querySelector("#certificate-canvas");
    const context = canvas.getContext("2d");
    const gold = result.gold;
    const issued = state.certificate?.[gold ? "gold" : "silver"] || new Date().toISOString();
    context.fillStyle = "#fffdf8";
    context.fillRect(0, 0, 2400, 1500);
    context.strokeStyle = gold ? "#be8b22" : "#7a83a2";
    context.lineWidth = 13;
    context.strokeRect(55, 55, 2290, 1390);
    context.lineWidth = 2;
    context.strokeRect(80, 80, 2240, 1340);
    context.textAlign = "center";
    const draw = (text, y, size, color = "#17304f", weight = 600) => {
      context.fillStyle = color;
      context.font = `${weight} ${size}px 'Segoe UI', sans-serif`;
      context.fillText(text, 1200, y, 2110);
    };
    draw("TRƯỜNG THCS VÀ THPT ĐINH THIỆN LÝ", 185, 40);
    draw("CHỨNG CHỈ HOÀN THÀNH", 340, 80);
    draw(gold ? "HUY HIỆU VÀNG" : "HUY HIỆU BẠC", 450, 47, gold ? "#986913" : "#5c6486");
    draw(profile.name, 655, 105, "#6752b5", 700);
    draw("Lớp " + profile.className, 755, 54);
    draw("Đã hoàn thành bài tự học", 910, 45, "#526177", 400);
    draw(DATA.title, 1000, 70);
    draw(DATA.certificateTopics || "Bảng dữ liệu · Khóa chính · Khóa ngoại · Relationships", 1100, 39, "#526177", 400);
    draw("3 chặng học và 6 nhiệm vụ Boss" + (gold ? " · 2 câu mở rộng" : ""), 1180, 36, "#526177", 400);
    draw("Ngày hoàn thành " + new Date(issued).toLocaleDateString("vi-VN"), 1290, 33, "#526177", 400);
    let hash = 2166136261;
    for (const char of DATA.id + "|" + profile.id + "|" + (gold ? "G" : "S")) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0;
    draw("Mã học tập ACCESS-" + hash.toString(16).toUpperCase().padStart(8, "0"), 1365, 27, "#526177", 400);
    canvas.setAttribute("aria-label", `Chứng chỉ ${gold ? "Vàng" : "Bạc"}, ${profile.name}, lớp ${profile.className}, đã hoàn thành bài ${DATA.title}.`);
    document.querySelector("#certificate-dialog").showModal();
  }

  function sourcesFooter() {
    return `<footer class="sources-footer"><details><summary>Nguồn học liệu và cách lưu tiến độ</summary><p>Ảnh chụp trực tiếp từ Microsoft Access ở 1920 × 1080; ảnh cận cảnh giữ nguyên điểm ảnh. Bấm ảnh để xem toàn cửa sổ hoặc 100% điểm ảnh. Dữ liệu tên người và sách trong ví dụ là giả lập.</p><p>Video được nhúng từ kênh LearnFree. <a href="https://www.learnfree.org/series/access-foundations" target="_blank" rel="noopener noreferrer">Khóa Access Foundations</a> · <a href="https://support.microsoft.com/en-us/access/guide-to-table-relationships" target="_blank" rel="noopener noreferrer">Quan hệ và toàn vẹn tham chiếu, Microsoft Support</a> · <a href="https://support.microsoft.com/en-us/access/add-a-list-box-or-combo-box" target="_blank" rel="noopener noreferrer">Form và Combo Box, Microsoft Support</a>.</p><p>Bài học dùng cách mở chặng và Boss từ mẫu C++ V3 của thầy. Nhân vật Boss dùng Three.js 0.160.0, <a href="assets/vendor/LICENSE-three.txt" target="_blank" rel="noopener">giấy phép MIT</a>.</p><p>Họ tên, lớp và tiến độ lưu trên trình duyệt của máy đang học. Chứng chỉ là ghi nhận hoàn thành phần tự học. Điểm và sản phẩm thực hành được quản lý trên Canvas của lớp.</p></details><span>Đinh Thiện Lý · Tin học 11</span></footer>`;
  }

  document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", () => document.getElementById(button.dataset.close).close()));
  document.querySelector("#image-actual").addEventListener("click", event => {
    const actual = document.querySelector(".image-scroll").classList.toggle("actual-size");
    event.currentTarget.setAttribute("aria-pressed", String(actual));
    event.currentTarget.textContent = actual ? "Vừa khung hình" : "Xem 100% điểm ảnh";
  });
  document.querySelector("#download-certificate").addEventListener("click", () => {
    if (!assessment().completed) return;
    const link = document.createElement("a");
    link.download = `ChungChi_Access_${profile.className}_${profile.name.replace(/[^\p{L}\p{N}]+/gu, "_")}.png`;
    link.href = document.querySelector("#certificate-canvas").toDataURL("image/png");
    link.click();
  });
  window.addEventListener("hashchange", () => { if (profile) navigate(location.hash.slice(1)); });
  window.addEventListener("message", event => {
    if (event.origin !== location.origin || event.source !== document.querySelector("#access-world")?.contentWindow) return;
    if (["portal-account", "portal-session-end"].includes(event.data?.type)) endSession();
    if (["portal-switch-read", "portal-back"].includes(event.data?.type)) setViewMode("read");
  });
  window.addEventListener("storage", event => {
    if (!profile) return;
    if (event.key === PREFIX + "ended:" + profile.id) {
      session("profile", null);
      gate();
      return;
    }
    if (event.key === PREFIX + profileKey()) {
      loadState();
      document.querySelectorAll(".question-card:not(.passed)").forEach(card => {
        const question = allQuestions.find(item => item.id === card.dataset.question);
        if (state.passed[question.id]) {
          const template = document.createElement("template");
          template.innerHTML = questionCard(question);
          card.replaceWith(template.content.firstElementChild);
        }
      });
      updateNavigation();
      if (currentStage().kind === "boss") updateBoss();
    }
  });
  window.addEventListener("beforeunload", () => boss?.huy());
  const remembered = session("profile");
  const savedProfile = read("profiles", []).find(person => person.id === remembered);
  if (savedProfile) {
    profile = savedProfile;
    loadState();
    const stageFromWorld = query.has("cuoi") ? "boss" : query.has("chang") ? DATA.steps[Number(query.get("chang"))]?.id : null;
    navigate(stageFromWorld || location.hash.slice(1) || state.lastStage);
  } else gate();
})();
