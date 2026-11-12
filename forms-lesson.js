"use strict";
window.FormsLesson = (() => {
  const schemas = window.FORMS_CONFIG;
  const byKey = key => schemas.find(f => f.key === key);
  const clone = value => JSON.parse(JSON.stringify(value));
  const esc = value => String(value ?? "").replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dateText = value => /^\d{4}-\d\d-\d\d$/.test(String(value)) ? value.split('-').reverse().join('/') : value || '—';
  const label = (state,id) => state.passed[id] ? '✓ Đã hoàn thành' : 'Cần tự thử';
  const buttons = [['new','Thêm mới','Record Operations → Add New Record'],['save','Lưu','Record Operations → Save Record'],['prev','Bản ghi trước','Record Navigation → Previous Record'],['next','Bản ghi sau','Record Navigation → Next Record'],['close','Đóng','Form Operations → Close Form']];
  const choice = (name,items,caption) => `<label>${caption}<select name="${name}" required><option value="">Chọn</option>${items.map(i=>`<option>${esc(i)}</option>`).join('')}</select></label>`;
  function taskList(state) {
    return `<ul class="form-task-list">${[
      ['add-reader-v2','Thêm và lưu một người đọc mới'],['add-book-v2','Thêm và lưu một sách mới'],
      ['loan-v2','Tạo lượt mượn bằng hai danh mục vừa thêm'],['return-v2','Cập nhật lượt đó thành Đã trả']
    ].map(([id,text])=>`<li data-lab-task="${id}" class="${state.passed[id]?'done':''}"><span>${state.passed[id]?'✓':'○'}</span>${text}</li>`).join('')}</ul>`;
  }
  function nativePhoto(photo,name,title,caption) {
    return window.ACCESS_PHOTOS?.[name] ? photo(name,title,caption) : '';
  }
  function nativeVideos(section) {
    return (LESSON.nativeVideos || []).filter(v=>v.section===section).map(v=>`<section class="video-card"><div class="video-header"><span class="play-icon" aria-hidden="true">▶</span><div><h3>${esc(v.title)} · 1080p</h3><p>${esc(v.summary)}</p></div></div><div class="video-content"><video controls playsinline preload="metadata" ${v.poster?`poster="${esc(v.poster)}"`:''}><source src="${esc(v.src)}" type="video/mp4">Trình duyệt chưa hỗ trợ video.</video><p class="small-note">Quay trực tiếp trong Access ở 1920 × 1080, có vòng sáng và chú thích tiếng Việt. Không có lời đọc. Ngày trong máy quay có thể hiển thị theo tháng/ngày/năm.</p></div></section>`).join('');
  }
  function sourceTable() {
    return `<div class="table-scroll"><table><thead><tr><th>Form</th><th>Record Source</th><th>Dùng để</th></tr></thead><tbody>${schemas.map(f=>`<tr><th>${f.name}</th><td>${f.table}</td><td>${f.key==='reader'?'Thêm, cập nhật thông tin người đọc':f.key==='book'?'Thêm, cập nhật thông tin sách':'Ghi nhận lượt mượn và việc trả sách'}</td></tr>`).join('')}</tbody></table></div>`;
  }
  function comboGuide() {
    return `<div class="table-scroll"><table class="combo-guide"><thead><tr><th>Thuộc tính</th><th>Chọn người đọc</th><th>Chọn sách</th><th>Trạng thái</th></tr></thead><tbody>
      <tr><th>Name</th><td>cboNguoiDoc</td><td>cboSach</td><td>cboTrangThai</td></tr>
      <tr><th>Control Source</th><td>SoTheTV</td><td>MaSach</td><td>TrangThai</td></tr>
      <tr><th>Row Source Type</th><td>Table/Query</td><td>Table/Query</td><td>Value List</td></tr>
      <tr><th>Row Source</th><td><code>SELECT SoTheTV, HoVaTen FROM [NGƯỜI ĐỌC] ORDER BY HoVaTen;</code></td><td><code>SELECT MaSach, TenSach FROM [SÁCH] ORDER BY TenSach;</code></td><td><code>"Đang mượn";"Đã trả"</code></td></tr>
      <tr><th>Bound Column</th><td>1 · lấy mã thẻ</td><td>1 · lấy mã sách</td><td>1 · lấy trạng thái</td></tr>
      <tr><th>Column Count</th><td>2</td><td>2</td><td>1</td></tr>
      <tr><th>Column Widths</th><td>0cm;6cm</td><td>0cm;6cm</td><td>Không cần ẩn cột</td></tr>
      <tr><th>Limit To List</th><td>Yes</td><td>Yes</td><td>Yes</td></tr>
    </tbody></table></div>`;
  }
  function html(index,state,photo,video) {
    if(index===0) return `<section class="concept-section"><p class="revision-note">Bản đầy đủ · ba Form, dropdown và nút lệnh</p><h2>Cùng một CSDL, mỗi Form làm một việc</h2><p><strong>Form</strong> là giao diện xem, thêm và sửa các bản ghi của bảng hoặc truy vấn nguồn. Thuộc tính <strong>Record Source</strong> chỉ ra nguồn đó. Bài này tạo đủ ba Form cho CSDL thư viện.</p>${sourceTable()}</section>
      <section class="interactive-card"><div class="section-heading"><h2 id="form-explore-title">Thử nhìn dữ liệu qua ba Form</h2><span class="task-status" id="form-explore-status">${label(state,'explore-forms-v2')}</span></div><p>Bấm từng Form, quan sát giá trị hiển thị và bảng dữ liệu bên dưới. Ở Form mượn trả, thử đổi người đọc hoặc sách để thấy <strong>tên được chọn, mã được lưu</strong>.</p><div class="form-tabs" role="group" aria-label="Chọn Form để quan sát">${schemas.map(f=>`<button type="button" data-explore-form="${f.key}" aria-pressed="false">${f.name}</button>`).join('')}</div><div id="explore-form-body"></div><p id="form-explore-result" class="interaction-result" role="status">Hãy mở đủ cả ba Form.</p></section>
      <section class="concept-section"><h2>Ba cách nhập giá trị cần phân biệt</h2><div class="concept-strip"><div><b>Mã danh mục</b><p>SoTheTV ở NGƯỜI ĐỌC và MaSach ở SÁCH là Short Text. Nhập mã duy nhất khi thêm danh mục mới.</p></div><div><b>Mã tự sinh</b><p>MaMuonTra là AutoNumber. Access sinh mã cho lượt mượn; em không nhập, không sửa mã và không cần lấp số bị thiếu.</p></div><div><b>Khóa ngoại</b><p>Ở MƯỢN_TRẢ, Combo Box hiện tên người đọc và tên sách. Giá trị được lưu vẫn là SoTheTV, MaSach.</p></div></div><p class="callout">Chọn tên dễ hơn nhớ mã. Quan hệ giữa các bảng vẫn dựa trên mã duy nhất. Nếu hai người trùng tên, danh sách nên hiển thị thêm số thẻ hoặc lớp để phân biệt.</p></section>
      <section class="concept-section"><h2>Form View và Design View</h2><p><strong>Form View</strong> dùng để nhập và cập nhật dữ liệu. <strong>Design View</strong> dùng để đặt điều khiển, cấu hình dropdown và thêm nút lệnh. <strong>Layout View</strong> hỗ trợ chỉnh bố cục khi vẫn thấy dữ liệu.</p><div class="photo-grid">${nativePhoto(photo,'v2-reader','F_NguoiDoc','Form quản lý thông tin người đọc, có các nút thêm, lưu, chuyển bản ghi và đóng.')}${nativePhoto(photo,'v2-book','F_Sach','Form quản lý sách. MaSach nhập khi thêm đầu sách mới.')}${nativePhoto(photo,'v2-loan','F_MuonTra','Mã tự sinh chỉ đọc; người đọc, sách và trạng thái dùng dropdown.')}</div></section>${video('create')}`;
    if(index===1) return `<section class="concept-section"><h2>1. Dựng khung cho đủ ba Form</h2><p>Mở CSDL thư viện của bài trước. Thực hiện <strong>Form Wizard ba lần</strong>, mỗi lần chọn một bảng nguồn.</p>${sourceTable()}<ol class="instruction-list"><li>Chọn <strong>Create → Form Wizard</strong>, chọn bảng nguồn tương ứng.</li><li>Dùng <strong>&gt;&gt;</strong> để chọn đủ trường của bảng. Chọn Next → <strong>Columnar</strong>.</li><li>Đặt đúng tên F_NguoiDoc, F_Sach hoặc F_MuonTra, rồi Finish.</li><li>Mở Design View. Đổi nhãn sang tiếng Việt, bố trí ô nhập và chừa vùng cho nút lệnh. Giữ đúng Control Source của từng ô.</li></ol><details class="dictionary"><summary>Danh sách trường của cả ba Form</summary><div class="dictionary-content">${schemas.map(f=>`<h3>${f.name} · ${f.fields.length} trường</h3><p>${f.fields.map(a=>`<code>${a[0]}</code>`).join(' · ')}</p>`).join('')}</div></details></section>
      <section class="concept-section"><h2>2. Hoàn thiện điều khiển nhập liệu</h2><p>F_NguoiDoc và F_Sach dùng các ô nhập đúng kiểu dữ liệu đã khai báo. Các trường Number/Integer nhập số nguyên; điện thoại và mã dùng văn bản.</p><p>Ở <strong>F_MuonTra</strong>, ô MaMuonTra gắn với AutoNumber. Đặt <strong>Locked = Yes, Tab Stop = No</strong> để thể hiện rõ đây là ô chỉ đọc và bỏ qua khi bấm Tab.</p><p>Với SoTheTV và MaSach, dùng <strong>Combo Box</strong>. Trong Wizard chọn lấy dữ liệu từ bảng danh mục, chọn cột mã và cột tên, rồi chọn <strong>Store that value in this field</strong> đúng trường khóa ngoại. Trong Design View có thể thay Text Box bằng Combo Box qua <strong>Change To → Combo Box</strong>, sau đó đặt các thuộc tính bên dưới.</p>${comboGuide()}<p class="callout"><strong>Control Source</strong> là trường nhận giá trị. <strong>Row Source</strong> cung cấp danh sách chọn. <strong>Bound Column</strong> quyết định cột lấy giá trị. Ẩn cột mã không làm đổi giá trị được lưu.</p><details class="dictionary"><summary>Hiện tên kèm mã để phân biệt tên trùng</summary><div class="dictionary-content"><p>Giữ hai cột và Bound Column = 1. Cột thứ hai có thể ghép tên với mã để người dùng phân biệt được hai đối tượng trùng tên. Mẫu Access dùng cách hiển thị này.</p><p>Danh sách người đọc:</p><pre><code>SELECT SoTheTV, HoVaTen &amp; " · " &amp; SoTheTV AS NguoiHienThi
FROM [NGƯỜI ĐỌC] ORDER BY HoVaTen, SoTheTV;</code></pre><p>Danh sách sách:</p><pre><code>SELECT MaSach, TenSach &amp; " · " &amp; MaSach AS SachHienThi
FROM [SÁCH] ORDER BY TenSach, MaSach;</code></pre><p>Đây là chuỗi hiển thị của cột thứ hai. Trường khóa ngoại vẫn nhận mã ở cột thứ nhất.</p></div></details><p>Trạng thái dùng Value List với hai giá trị <strong>Đang mượn</strong> và <strong>Đã trả</strong>. Dùng <strong>Limit To List = Yes</strong> để tránh nhập những cách viết khác nhau.</p><div class="photo-grid">${nativePhoto(photo,'v2-combo','Combo Box chọn sách','Control Source = MaSach, Row Source có mã và tên, Bound Column = 1.')}${nativePhoto(photo,'v2-status-config','Danh sách trạng thái','Control Source = TrangThai; Row Source Type = Value List; Limit To List = Yes.')}${nativePhoto(photo,'v2-auto','MaMuonTra chỉ đọc','AutoNumber được Access sinh. Locked = Yes và Tab Stop = No làm rõ vai trò ô chỉ đọc.')}</div></section>
      <section class="concept-section"><h2>3. Thêm năm nút cho mỗi Form</h2><p>Trong Design View, bật <strong>Use Control Wizards</strong> ở nhóm Controls. Chọn <strong>Button</strong>, đặt nút lên Form và chọn hành động trong Command Button Wizard. Dùng nhãn chữ để dễ hiểu.</p><div class="table-scroll"><table><thead><tr><th>Nhãn nút</th><th>Categories → Actions</th><th>Name gợi ý</th></tr></thead><tbody>${buttons.map(([k,t,a])=>`<tr><th>${t}</th><td>${a}</td><td>cmd${{new:'Moi',save:'Luu',prev:'Truoc',next:'Sau',close:'Dong'}[k]}</td></tr>`).join('')}</tbody></table></div><details class="dictionary"><summary>Tạo hành động trực tiếp bằng Macro Builder</summary><div class="dictionary-content"><ol><li>Trong Design View, chọn nút, mở Property Sheet → Event → On Click → dấu ba chấm → Macro Builder.</li><li>Với nút Lưu, thêm <strong>RunMenuCommand</strong> và chọn Command = <strong>SaveRecord</strong>.</li><li>Lưu macro, đóng Macro Builder rồi Ctrl+S để lưu thiết kế Form.</li></ol><table><thead><tr><th>Nút</th><th>Hành động macro</th></tr></thead><tbody><tr><td>Thêm mới</td><td>GoToRecord → Record: New</td></tr><tr><td>Lưu</td><td>RunMenuCommand → Command: SaveRecord</td></tr><tr><td>Bản ghi trước</td><td>GoToRecord → Record: Previous</td></tr><tr><td>Bản ghi sau</td><td>GoToRecord → Record: Next</td></tr><tr><td>Đóng</td><td>RunMenuCommand → Command: Close</td></tr></tbody></table><p>Với GoToRecord, để trống tên đối tượng để thao tác trên Form đang mở. Trong mẫu, nút Lưu có điều kiện <code>Dirty</code> để chỉ chạy khi bản ghi có thay đổi chưa lưu; các nút chuyển bản ghi cũng kiểm tra vị trí đầu/cuối.</p></div></details><p>Các nút dùng <strong>embedded macro</strong> do Wizard tạo. Có thể sao chép nhóm nút sang hai Form còn lại và kiểm tra lại hành động. Lưu thiết kế bằng Ctrl+S, rồi chuyển Form View để thử.</p><div class="photo-grid">${nativePhoto(photo,'v2-buttons','Nút lệnh trong Form','Kiểm tra cả năm nút trên từng Form, đặc biệt phân biệt Thêm mới với Lưu.')}</div></section>
      <section class="interactive-card"><h2>Tự cấu hình ba Form</h2><p>Hoàn thành cấu hình cho từng Form. Phần mượn trả cần đủ ô tự sinh và ba dropdown.</p><div class="config-panels">${schemas.map(f=>`<form class="config-form" data-config-form="${f.key}"><div class="section-heading"><h3>${f.name}</h3><span class="task-status" data-config-status="${f.key}">${label(state,f.task)}</span></div>${choice('source',['NGƯỜI ĐỌC','SÁCH','MƯỢN_TRẢ'],'Record Source')}${f.key==='loan'?`<div class="form-two">${choice('auto',['Ô chỉ đọc, Access tự sinh','Ô nhập số do người dùng điền'],'MaMuonTra')}${choice('reader',['Combo Box hiện tên, lưu SoTheTV','Text Box nhập họ tên'],'Người đọc')}${choice('book',['Combo Box hiện tên, lưu MaSach','Text Box nhập tên sách'],'Sách')}${choice('status',['Combo Box danh sách cố định','Text Box nhập tùy ý'],'Trạng thái')}</div>`:`${choice('key',['Nhập mã duy nhất khi thêm mới','Để AutoNumber tự sinh'],'Cách nhập '+f.pk)}` }<button type="submit" class="primary">Kiểm tra ${f.name}</button><p class="interaction-result" data-config-result="${f.key}" role="status"></p></form>`).join('')}</div></section>
      <section class="interactive-card"><div class="section-heading"><h2>Năm nút, năm thao tác</h2><span class="task-status" id="buttons-status">${label(state,'buttons-v2')}</span></div><form id="buttons-lab"><div class="button-mapping">${buttons.map(([k,t])=>choice(k,buttons.map(b=>b[2]),'Nút '+t)).join('')}</div><button class="primary" type="submit">Kiểm tra các nút lệnh</button><p id="buttons-result" class="interaction-result" role="status"></p></form></section>${nativeVideos(1)}`;
    return `<section class="concept-section"><h2>Một quy trình dùng cả ba Form</h2><ol class="instruction-list"><li>Mở <strong>F_NguoiDoc</strong>, bấm Thêm mới, nhập mã thẻ cùng thông tin người đọc, rồi Lưu.</li><li>Mở <strong>F_Sach</strong>, bấm Thêm mới, nhập mã sách và thông tin sách, rồi Lưu.</li><li>Mở <strong>F_MuonTra</strong>, bấm Thêm mới. Chọn tên người đọc và tên sách vừa thêm. Để Access tự sinh MaMuonTra; chọn ngày mượn, hạn trả và trạng thái Đang mượn.</li><li>Bấm Lưu, mở bảng MƯỢN_TRẢ và kiểm tra hai khóa ngoại lưu mã.</li><li>Khi trả sách, tìm đúng lượt mượn, nhập NgayTra, chọn Đã trả và Lưu. MaMuonTra giữ nguyên.</li></ol><p class="callout">Form có liên kết cũng có thể tự lưu khi chuyển bản ghi hoặc đóng. Bấm Lưu giúp chủ động kiểm tra dữ liệu. Nút Đóng không phải nút hủy.</p></section>
      <section class="interactive-card"><h2 id="three-form-lab-title">Em điều hành quầy mượn</h2><p>Đây là mô phỏng trong trình duyệt, có dữ liệu giả lập. Hãy thực hiện đủ bốn việc dưới đây bằng ba Form. Dữ liệu mô phỏng không ghi vào tệp Access.</p>${taskList(state)}<div class="form-tabs" role="group" aria-label="Chọn Form thực hành">${schemas.map(f=>`<button type="button" data-work-form="${f.key}">${f.name}</button>`).join('')}</div><div id="three-form-editor"></div><p class="interaction-result" id="three-form-result" role="status" aria-live="polite"></p><div class="saved-table" id="three-form-stored"></div><p class="small-note">Quy tắc của tình huống luyện tập: điền đủ thông tin danh mục; mã không trùng; số lượng là số nguyên không âm; ngày mượn không sau hạn trả; khi chọn Đã trả cần có ngày trả. Các quy tắc bổ sung này cần được cấu hình khi áp dụng vào Access.</p></section>
      <section class="concept-section"><h2>Kiểm tra trước khi nộp bài</h2><ul><li>Đủ ba Form, mỗi Form gắn đúng bảng và có đủ trường.</li><li>MaMuonTra tự sinh, không sửa tay. Hai dropdown lưu mã, dropdown trạng thái chỉ nhận giá trị quy ước.</li><li>Năm nút lệnh thực hiện đúng trên cả ba Form.</li><li>Bản ghi thêm qua Form xuất hiện trong bảng. Sửa thông tin trả sách giữ nguyên mã lượt mượn.</li><li>Nếu danh mục vừa thêm chưa xuất hiện trong Form đang mở, mở lại Form hoặc dùng Requery để nạp lại danh sách.</li></ul></section>${nativeVideos(2)}${video('use')}`;
  }
  function bind(index,api) {
    if(index===0) bindExplorer(api);
    if(index===1) bindConfiguration(api);
    if(index===2) bindLibrary(api);
  }
  function bindExplorer(api) {
    const seed=window.FORMS_SEED;
    function show(key,mark=false) {
      const f=byKey(key),row=seed[key][0];
      document.querySelectorAll('[data-explore-form]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.exploreForm===key)));
      document.querySelector('#explore-form-body').innerHTML=`<div class="form-preview"><h3>${f.name}<small>Record Source = ${f.table}</small></h3><dl>${f.fields.map(([n,t,type])=>`<div><dt>${t}</dt><dd>${type==='auto'?`${row[n]} <small>· chỉ đọc</small>`:type==='reader'||type==='book'?`<select data-explore-combo="${n}" aria-label="${t}">${seed[type].map(r=>`<option value="${r[byKey(type).pk]}" ${r[byKey(type).pk]===row[n]?'selected':''}>${esc(r[type==='reader'?'HoVaTen':'TenSach'])}</option>`).join('')}</select>`:esc(dateText(row[n]))}</dd></div>`).join('')}</dl></div><div id="explore-stored"></div>`;
      const record=clone(row);
      const paint=()=>{document.querySelector('#explore-stored').innerHTML=`<div class="table-scroll"><table><caption>${f.table} · các giá trị được lưu</caption><thead><tr>${f.fields.map(a=>`<th>${a[0]}</th>`).join('')}</tr></thead><tbody><tr>${f.fields.map(a=>`<td>${esc(dateText(record[a[0]]))}</td>`).join('')}</tr></tbody></table></div>`;};paint();
      document.querySelectorAll('[data-explore-combo]').forEach(s=>s.addEventListener('change',()=>{record[s.dataset.exploreCombo]=s.value;paint();document.querySelector('#form-explore-result').textContent='Tên đang hiển thị trong dropdown; mã tương ứng xuất hiện trong hàng dữ liệu.';}));
      if(mark){const viewed=[...new Set([...(api.getState().demos.exploredFormsV2||[]),key])];api.update({demos:{exploredFormsV2:viewed}});if(viewed.length===3){api.markPassed('explore-forms-v2');document.querySelector('#form-explore-status').textContent='✓ Đã hoàn thành';}document.querySelector('#form-explore-result').textContent=`${f.name} đang đọc bản ghi từ ${f.table}. Em đã mở ${viewed.length}/3 Form.`;}
    }
    document.querySelectorAll('[data-explore-form]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.exploreForm,true)));show('reader');
  }
  function bindConfiguration(api) {
    document.querySelectorAll('[data-config-form]').forEach(form=>{
      const f=byKey(form.dataset.configForm),saved=api.getState().demos.configFormsV2?.[f.key];
      if(saved)for(const [n,v]of Object.entries(saved))if(form.elements[n])form.elements[n].value=v;
      form.addEventListener('submit',event=>{
        event.preventDefault();const data=Object.fromEntries(new FormData(form));
        const expected=f.key==='loan'?{auto:'Ô chỉ đọc, Access tự sinh',reader:'Combo Box hiện tên, lưu SoTheTV',book:'Combo Box hiện tên, lưu MaSach',status:'Combo Box danh sách cố định'}:{key:'Nhập mã duy nhất khi thêm mới'};
        const good=data.source===f.table&&Object.entries(expected).every(([k,v])=>data[k]===v);
        api.update({demos:{configFormsV2:{...api.getState().demos.configFormsV2,[f.key]:data}}});
        document.querySelector(`[data-config-result="${f.key}"]`).textContent=good?'Cấu hình phù hợp. Lưu thiết kế và thử Form View trong Access.':'Kiểm tra lại nguồn bản ghi và cách nhập từng trường. Phân biệt mã danh mục, mã tự sinh và khóa ngoại.';
        if(good){api.markPassed(f.task);document.querySelector(`[data-config-status="${f.key}"]`).textContent='✓ Đã hoàn thành';}
      });
    });
    const form=document.querySelector('#buttons-lab'),saved=api.getState().demos.formButtonsV2;
    if(saved)for(const [k,v]of Object.entries(saved))form.elements[k].value=v;
    form.addEventListener('submit',event=>{event.preventDefault();const data=Object.fromEntries(new FormData(form));api.update({demos:{formButtonsV2:data}});const good=buttons.every(([k,,a])=>data[k]===a);document.querySelector('#buttons-result').textContent=good?'Đúng. Dùng bộ nút này cho cả ba Form và kiểm tra hành động sau khi sao chép.':'Đối chiếu mục đích từng nút với Categories → Actions trong bảng hướng dẫn.';if(good){api.markPassed('buttons-v2');document.querySelector('#buttons-status').textContent='✓ Đã hoàn thành';}});
  }
  function bindLibrary(api) {
    const initial=()=>({reader:clone(FORMS_SEED.reader),book:clone(FORMS_SEED.book),loan:clone(FORMS_SEED.loan),created:{reader:[],book:[],loan:[]},nextLoan:Math.max(...FORMS_SEED.loan.map(r=>Number(r.MaMuonTra)))+1,ui:null});
    let model=clone(api.getState().demos.libraryV2||initial());
    const persist=()=>api.update({demos:{libraryV2:clone(model)}});
    const feedback=text=>{document.querySelector('#three-form-result').textContent=text;};
    function use(key,index=0){model.ui={key,index,mode:'edit',draft:clone(model[key][index]),dirty:false,closed:false};}
    if(!model.ui)use('reader');
    const selected=()=>byKey(model.ui.key);
    function input([name,title,type,max]) {
      const value=model.ui.draft[name]??'';
      let control;
      if(type==='auto')control=`<input name="${name}" value="${esc(value||'Access tự sinh')}" readonly aria-readonly="true" tabindex="-1"><small>AutoNumber · không nhập, không sửa</small>`;
      else if(type==='reader'||type==='book')control=`<select name="${name}" required><option value="">Chọn ${type==='reader'?'người đọc':'sách'}</option>${model[type].map(row=>{const code=row[byKey(type).pk],text=row[type==='reader'?'HoVaTen':'TenSach'];return `<option value="${code}" ${value===code?'selected':''}>${esc(text)} · ${code}</option>`;}).join('')}</select><small>Lưu vào ${name}</small>`;
      else if(type==='status')control=`<select name="TrangThai" required>${['Đang mượn','Đã trả'].map(v=>`<option ${value===v?'selected':''}>${v}</option>`).join('')}</select>`;
      else control=`<input name="${name}" type="${type==='number'?'number':type==='date'?'date':name==='Email'?'email':name==='DienThoai'?'tel':'text'}" value="${esc(value)}" ${name!=='NgayTra'?'required':''} ${max?`maxlength="${max}"`:''} ${type==='number'?'step="1" min="0" max="32767"':''}>`;
      return `<label>${title}<span class="field-code">${name}</span>${control}</label>`;
    }
    function drawTable(){
      const f=selected();
      document.querySelector('#three-form-stored').innerHTML=`<div class="table-scroll"><table><caption>${f.table} · dữ liệu đã lưu trong mô phỏng</caption><thead><tr>${f.fields.map(([n])=>`<th>${n}</th>`).join('')}</tr></thead><tbody>${model[f.key].map(row=>`<tr class="${model.created[f.key].includes(row[f.pk])?'created-row':''}">${f.fields.map(([n])=>`<td>${esc(dateText(row[n]))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    }
    function syncTasks(){document.querySelectorAll('[data-lab-task]').forEach(li=>{const done=Boolean(api.getState().passed[li.dataset.labTask]);li.classList.toggle('done',done);li.querySelector('span').textContent=done?'✓':'○';});}
    function render(){
      const f=selected();
      document.querySelectorAll('[data-work-form]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.workForm===f.key)));
      document.querySelector('#three-form-editor').innerHTML=model.ui.closed?`<div class="form-preview"><h3>Đã đóng ${f.name}</h3><p>Các thay đổi hợp lệ đã được lưu. Bấm để mở lại Form.</p><button type="button" id="reopen-form">Mở lại ${f.name}</button></div>`:`<form id="library-editor" class="form-preview"><div class="section-heading"><h3>${f.name}<small>Record Source = ${f.table}</small></h3><span class="record-mode">${model.ui.mode==='new'?'Bản ghi mới':`Bản ghi ${model.ui.index+1} / ${model[f.key].length}`}${model.ui.dirty?' · đang sửa':''}</span></div><div class="form-two">${f.fields.map(input).join('')}</div><div class="form-toolbar" role="group" aria-label="Nút lệnh của ${f.name}">${buttons.map(([k,t])=>`<button type="${k==='save'?'submit':'button'}" data-record-action="${k}" class="${k==='save'?'primary':''}" ${k==='prev'&&model.ui.mode!=='new'&&model.ui.index===0||k==='next'&&(model.ui.mode==='new'||model.ui.index===model[f.key].length-1)?'disabled':''}>${t}</button>`).join('')}</div></form>`;
      drawTable();syncTasks();
      document.querySelector('#reopen-form')?.addEventListener('click',()=>{model.ui.closed=false;persist();render();});
      const form=document.querySelector('#library-editor');if(!form)return;
      form.addEventListener('input',draftChanged);form.addEventListener('change',draftChanged);
      form.addEventListener('submit',e=>{e.preventDefault();commit(true);});
      form.querySelectorAll('[data-record-action]:not([data-record-action=save])').forEach(b=>b.addEventListener('click',()=>act(b.dataset.recordAction)));
    }
    function draftChanged(){const form=document.querySelector('#library-editor');model.ui.draft=Object.fromEntries(new FormData(form));model.ui.dirty=true;if(selected().key==='loan'&&model.ui.mode==='new'&&!model.ui.allocated){model.ui.allocated=model.nextLoan++;model.ui.draft.MaMuonTra=model.ui.allocated;form.elements.MaMuonTra.value=model.ui.allocated;}persist();form.querySelector('.record-mode').textContent=(model.ui.mode==='new'?'Bản ghi mới':`Bản ghi ${model.ui.index+1} / ${model[selected().key].length}`)+' · đang sửa';}
    function commit(explicit=false){
      if(model.ui.closed||!model.ui.dirty){if(explicit)feedback('Bản ghi này đã được lưu, chưa có thay đổi mới.');return true;}
      const form=document.querySelector('#library-editor');if(!form.reportValidity())return false;
      const f=selected(),data=Object.fromEntries(new FormData(form));
      for(const [n,,type,max] of f.fields){if(type==='number'){data[n]=Number(data[n]);if(!Number.isInteger(data[n])||data[n]<0||data[n]>32767){feedback('Trường số cần là số nguyên trong phạm vi của Integer.');return false;}}else data[n]=String(data[n]??'').trim();if(max&&data[n].length>max){feedback(`${n} vượt kích thước trường.`);return false;}}
      if(f.key==='loan'){
        data.MaMuonTra=model.ui.mode==='new'?model.ui.allocated:model[f.key][model.ui.index].MaMuonTra;
        if(!model.reader.some(r=>r.SoTheTV===data.SoTheTV)||!model.book.some(r=>r.MaSach===data.MaSach)){feedback('Không lưu được: mã tham chiếu chưa có trong danh mục.');return false;}
        if(!['Đang mượn','Đã trả'].includes(data.TrangThai)){feedback('Chọn trạng thái từ danh sách.');return false;}
        if(data.NgayMuon>data.HanTra){feedback('Trong bài luyện tập, hạn trả không được trước ngày mượn.');return false;}
        if((data.TrangThai==='Đã trả'&&!data.NgayTra)||(data.TrangThai==='Đang mượn'&&data.NgayTra)){feedback('Điền ngày trả và chọn Đã trả cùng nhau khi hoàn tất lượt trả.');return false;}
      }else{
        data[f.pk]=data[f.pk].toUpperCase();
        if(model[f.key].some((r,i)=>String(r[f.pk]).toUpperCase()===data[f.pk]&&(model.ui.mode==='new'||i!==model.ui.index))){feedback(`Không lưu được: ${f.pk} đã tồn tại. Dùng mã khác cho danh mục mới.`);return false;}
        if(model.ui.mode!=='new'&&data[f.pk]!==model[f.key][model.ui.index][f.pk]){feedback('Trong tình huống này, hãy giữ mã của danh mục đã có. Bấm Thêm mới để tạo một danh mục khác.');return false;}
      }
      const isNew=model.ui.mode==='new',old=isNew?null:model[f.key][model.ui.index];
      if(isNew){model[f.key].push(data);model.ui.index=model[f.key].length-1;model.created[f.key].push(data[f.pk]);}else model[f.key][model.ui.index]=data;
      model.ui.mode='edit';model.ui.draft=clone(data);model.ui.dirty=false;delete model.ui.allocated;persist();
      if(isNew&&f.key==='reader')api.markPassed('add-reader-v2');if(isNew&&f.key==='book')api.markPassed('add-book-v2');
      if(f.key==='loan'&&model.created.loan.includes(data.MaMuonTra)&&model.created.reader.includes(data.SoTheTV)&&model.created.book.includes(data.MaSach)&&data.TrangThai==='Đang mượn'&&!data.NgayTra)api.markPassed('loan-v2');
      if(f.key==='loan'&&model.created.loan.includes(data.MaMuonTra)&&api.getState().passed['loan-v2']&&old?.TrangThai==='Đang mượn'&&data.TrangThai==='Đã trả'&&data.NgayTra)api.markPassed('return-v2');
      render();feedback(`Đã ${isNew?'thêm':'cập nhật'} bản ghi ${data[f.pk]} vào ${f.table}.`+(f.key==='loan'?` Các khóa ngoại được lưu là ${data.SoTheTV} và ${data.MaSach}.`:''));return true;
    }
    function act(action){
      if(!commit())return;const f=selected();
      if(action==='new'){model.ui={key:f.key,index:model[f.key].length,mode:'new',dirty:false,closed:false,draft:Object.fromEntries(f.fields.map(([n,,type])=>[n,type==='status'?'Đang mượn':'']))};feedback('Bản ghi mới đã mở. Nhập thông tin rồi bấm Lưu.');}
      if(action==='prev'||action==='next'){use(f.key,Math.max(0,Math.min(model[f.key].length-1,model.ui.index+(action==='prev'?-1:1))));feedback('Đang xem bản ghi đã lưu.');}
      if(action==='close'){model.ui.closed=true;feedback('Đã đóng Form. Đóng không phải thao tác hủy dữ liệu.');}
      persist();render();
    }
    document.querySelectorAll('[data-work-form]').forEach(b=>b.addEventListener('click',()=>{if(!commit())return;use(b.dataset.workForm);persist();render();feedback('Đang mở '+selected().name+'. Bấm Thêm mới nếu muốn tạo bản ghi.');}));
    render();
  }
  function practiceSummary(){return `<p>Tạo đủ <strong>F_NguoiDoc, F_Sach và F_MuonTra</strong> từ ba bảng của CSDL thư viện. Mỗi Form có đủ trường và năm nút: Thêm mới, Lưu, Bản ghi trước, Bản ghi sau, Đóng.</p><p>MaMuonTra tự sinh và chỉ đọc. Hai Combo Box chọn người đọc, sách phải lưu mã tương ứng. TrangThai chọn từ danh sách. Thêm một người đọc, một sách và một lượt mượn bằng ba Form, rồi cập nhật lượt đó khi trả sách.</p><a href="bai02-form-canvas.html" target="_blank" rel="noopener">Xem đầy đủ yêu cầu và minh chứng nộp trên Canvas →</a>`;}
  return {html,bind,practiceSummary};
})();
