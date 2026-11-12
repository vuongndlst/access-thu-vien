"use strict";
window.FormsLesson = (() => {
  const fields = ["MaMuonTra","SoTheTV","MaSach","NgayMuon","HanTra","NgayTra","TrangThai"];
  const rows = [
    {MaMuonTra:1,SoTheTV:"TV001",MaSach:"S001",NgayMuon:"2026-10-21",HanTra:"2026-10-28",NgayTra:"2026-10-24",TrangThai:"Đã trả"},
    {MaMuonTra:2,SoTheTV:"TV002",MaSach:"S002",NgayMuon:"2026-10-22",HanTra:"2026-10-29",NgayTra:"",TrangThai:"Đang mượn"}
  ];
  const safe = value => String(value ?? "").replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const display = value => /^\d{4}-\d\d-\d\d$/.test(value) ? value.split('-').reverse().join('/') : value || "Chưa có";
  const status = (state,id) => state.passed[id] ? "Đã thử xong" : "Tự thử";
  function recordedVideo() {
    return `<section class="video-card"><div class="video-header"><span class="play-icon" aria-hidden="true">▶</span><div><h3>Làm trọn bài trong Access · 1080p</h3><p>Tạo F_MuonTra, thêm bản ghi, sửa lỗi mã sách và cập nhật lượt trả.</p></div></div><div class="video-content"><video id="native-form-video" controls playsinline preload="metadata" poster="assets/access/form-view.png"><source src="assets/video/form-1080p.mp4" type="video/mp4"><track kind="captions" src="assets/video/form-vi.vtt" srclang="vi" label="Tiếng Việt">Trình duyệt của em chưa hỗ trợ video. <a href="assets/video/form-1080p.mp4">Tải video MP4</a></video><p class="small-note">Quay trực tiếp ở 1920 × 1080, 30 fps. Có con trỏ nổi bật và chú thích tiếng Việt, không có lời đọc. Bấm toàn màn hình để xem rõ. Ngày trong Access của video theo tháng/ngày/năm do thiết lập vùng của máy quay.</p><div class="button-row video-chapters"><button type="button" data-seek="0">Tạo Form</button><button type="button" data-seek="89">Thêm lượt mượn</button><button type="button" data-seek="109">Kiểm tra mã sai</button><button type="button" data-seek="159">Cập nhật trả sách</button><button type="button" data-seek="190">Đối chiếu trong bảng</button></div></div></section>`;
  }
  function html(index,state,photo,video) {
    if (index===0) return `<section class="concept-section"><h2>Form giúp làm việc với dữ liệu dễ hơn</h2><p><strong>Form (biểu mẫu)</strong> là đối tượng trong Access dùng để trình bày, nhập và chỉnh sửa dữ liệu. Trong bài này, <code>F_MuonTra</code> liên kết với bảng <strong>MƯỢN_TRẢ</strong> qua thuộc tính <strong>Record Source</strong>.</p><div class="concept-strip"><div><b>Table</b><p>Lưu các lượt mượn thành các bản ghi có cùng cấu trúc.</p></div><div><b>Form</b><p>Sắp xếp các ô nhập để làm việc với bản ghi.</p></div><div><b>Record Source</b><p>Bảng hoặc truy vấn cung cấp bản ghi cho Form.</p></div></div></section>
      <section class="interactive-card"><div class="section-heading"><h2 id="form-explore-title">Một bản ghi, hai cách nhìn</h2><span id="form-explore-status" class="task-status">${status(state,"form-explore")}</span></div><p>Bấm lần lượt <strong>lượt 1</strong> và <strong>lượt 2</strong>. Quan sát hàng trong bảng và các ô tương ứng trên Form.</p><div class="table-scroll"><table><caption>MƯỢN_TRẢ · dữ liệu mô phỏng</caption><thead><tr><th>Chọn</th><th>MaMuonTra</th><th>SoTheTV</th><th>MaSach</th><th>TrangThai</th></tr></thead><tbody>${rows.map((r,i)=>`<tr data-form-row="${i}"><th><button type="button" data-form-record="${i}">Lượt ${i+1}</button></th><td>${r.MaMuonTra}</td><td>${r.SoTheTV}</td><td>${r.MaSach}</td><td>${r.TrangThai}</td></tr>`).join('')}</tbody></table></div><div class="form-source-flow"><span>Bảng MƯỢN_TRẢ</span><b aria-hidden="true">↕</b><span>Record Source</span><b aria-hidden="true">↕</b><span>F_MuonTra</span></div><div id="record-preview" class="form-preview" aria-live="polite"></div><p class="interaction-result" id="form-explore-result" role="status">Chọn một lượt mượn để xem Form.</p></section>
      <section class="concept-section"><h2>Ảnh Form trong Access</h2>${photo("form-view","F_MuonTra trong Form View","Bảy ô trên Form đang hiển thị các trường của một lượt mượn. Thanh điều hướng ở cuối cửa sổ chuyển giữa các bản ghi.")}<p class="callout">Tạo thêm Form không tự nhân đôi dữ liệu. Hai Form cùng nguồn có thể xem và sửa cùng các bản ghi.</p></section>${video("create")}`;
    if (index===1) return `<section class="concept-section"><h2>Từ bảng có sẵn đến Form</h2><p>Mở CSDL thư viện đã hoàn thành bài trước. Các bảng và hai quan hệ cần có trước khi làm bài này.</p><ol class="instruction-list"><li>Chọn <strong>Create → Form Wizard</strong>.</li><li>Trong Tables/Queries, chọn <strong>Table: MƯỢN_TRẢ</strong>. Bấm <strong>&gt;&gt;</strong> để chuyển đủ bảy trường sang Selected Fields, rồi Next.</li><li>Chọn <strong>Columnar</strong> để bố trí các trường theo một cột, rồi Next.</li><li>Đặt tên <code>F_MuonTra</code>, chọn <strong>Open the form to view or enter information</strong>, rồi Finish.</li><li>Dùng <strong>Form View</strong> để nhập dữ liệu. Khi cần chỉnh cấu trúc giao diện, mở <strong>View → Design View</strong> rồi lưu thiết kế.</li></ol><div class="photo-grid">${photo("wizard-fields","Chọn đúng bảng và đủ trường","Selected Fields có MaMuonTra, SoTheTV, MaSach, NgayMuon, HanTra, NgayTra, TrangThai.")}${photo("wizard-layout","Chọn Columnar","Columnar phù hợp với Form hiển thị một lượt mượn tại một thời điểm.")}${photo("wizard-name","Đặt tên F_MuonTra","Chọn mở Form để xem hoặc nhập dữ liệu rồi bấm Finish.")}${photo("form-source","Record Source của Form","Trong Design View, chọn Form, mở Property Sheet → Data để kiểm tra Record Source = MƯỢN_TRẢ.")}</div></section>
      <section class="interactive-card"><div class="section-heading"><h2>Tự thiết lập Form</h2><span id="wizard-status" class="task-status">${status(state,"wizard-lab")}</span></div><p>Mô phỏng các lựa chọn trong Wizard. Chọn đúng để tạo Form mượn trả của bài học.</p><form id="wizard-lab-form"><label>Nguồn bản ghi<select name="source" required><option value="">Chọn bảng</option>${["NGƯỜI ĐỌC","SÁCH","MƯỢN_TRẢ"].map(n=>`<option>${n}</option>`).join('')}</select></label><fieldset class="wizard-fields"><legend>Selected Fields · chọn đủ bảy trường của lượt mượn</legend>${[...fields,"TenSach","HoVaTen"].map(n=>`<label><input type="checkbox" name="field" value="${n}">${n}</label>`).join('')}</fieldset><div class="form-two"><label>Bố cục<select name="layout" required><option value="">Chọn bố cục</option><option>Columnar</option><option>Tabular</option><option>Datasheet</option></select></label><label>Tên Form<input name="name" maxlength="40" placeholder="F_MuonTra" required></label></div><button type="submit" class="primary">Kiểm tra cấu hình</button></form><p class="interaction-result" id="wizard-result" role="status">Nguồn phải chứa các trường của lượt mượn.</p></section>
      <section class="concept-section"><h2>Ba chế độ thường gặp</h2><div class="concept-strip"><div><b>Form View</b><p>Xem, thêm và sửa bản ghi.</p></div><div><b>Layout View</b><p>Chỉnh bố cục khi vẫn nhìn thấy dữ liệu.</p></div><div><b>Design View</b><p>Chỉnh thiết kế, điều khiển và thuộc tính.</p></div></div><p><strong>Record Source</strong> là nguồn của cả Form. <strong>Control Source</strong> của một ô nhập là trường mà ô đó gắn vào. Ví dụ ô nhập mã sách có Control Source là <code>MaSach</code>. Một <strong>Label</strong> là nhãn chữ hướng dẫn bên cạnh ô.</p></section>${recordedVideo()}`;
    return `<section class="concept-section"><h2>Thêm một lượt mượn rồi cập nhật khi trả</h2><ol class="instruction-list"><li>Mở <code>F_MuonTra</code> ở Form View. Bấm nút <strong>New (blank) record</strong> có dấu ngôi sao ở thanh điều hướng.</li><li>Để <strong>MaMuonTra</strong> tự sinh. Nhập số thẻ và mã sách đã tồn tại, ngày mượn, hạn trả và trạng thái. NgayTra có thể để trống khi sách chưa trả.</li><li>Chọn <strong>Home → Save</strong> trong nhóm Records để lưu bản ghi. Access cũng lưu khi chuyển sang bản ghi khác. <strong>Ctrl+S</strong> dùng để lưu thiết kế đối tượng; hãy phân biệt hai việc này.</li><li>Nếu bị chặn vì mã chưa tồn tại, đọc thông báo, sửa đúng mã rồi lưu lại.</li><li>Khi sách được trả, tìm đúng lượt mượn, cập nhật NgayTra và TrangThai, rồi lưu. Mở MƯỢN_TRẢ để đối chiếu kết quả.</li></ol><div class="photo-grid">${photo("form-integrity","Form vẫn kiểm tra toàn vẹn tham chiếu","Access từ chối lưu MaSach = S999 vì chưa có bản ghi tương ứng trong SÁCH.")}${photo("table-saved","Dữ liệu được lưu trong bảng","Bản ghi mã 12 có cùng thông tin vừa cập nhật qua Form.")}</div></section>
      <section class="interactive-card"><div class="section-heading"><h2>Em làm ở quầy mượn sách</h2><span class="task-status" id="entry-status">${status(state,"entry-lab")}</span></div><p>Trong mô phỏng này có TV001, TV002 và S001, S002. Hãy thử lưu với <strong>S999</strong>, sửa sang <strong>S001</strong>, rồi bổ sung ngày trả và trạng thái <strong>Đã trả</strong>.</p><p class="small-note">Mô phỏng chạy trong trình duyệt, tách với tệp Access thực hành. Phần ngày trả ở đây được kiểm tra cùng trạng thái để em luyện quy trình; Access chỉ có quy tắc này khi được cấu hình thêm.</p><form id="entry-lab-form" class="form-preview"><h3>F_MuonTra <small>Record Source = MƯỢN_TRẢ</small></h3><div class="form-two"><label>MaMuonTra<input name="MaMuonTra" readonly value="(Tự sinh khi lưu)"></label><label>SoTheTV<select name="SoTheTV"><option>TV001</option><option>TV002</option></select></label><label>MaSach<input name="MaSach" value="S999" maxlength="10" required></label><label>NgayMuon<input name="NgayMuon" type="date" value="2026-11-13" required></label><label>HanTra<input name="HanTra" type="date" value="2026-11-20" required></label><label>NgayTra<input name="NgayTra" type="date"></label><label>TrangThai<select name="TrangThai"><option>Đang mượn</option><option>Đã trả</option></select></label></div><button class="primary" type="submit">Lưu bản ghi</button></form><p class="interaction-result" id="entry-result" role="status"></p><div id="stored-record" class="table-scroll" aria-live="polite"></div></section>
      <details class="dictionary"><summary>Mở rộng · chọn tên sách, lưu mã sách</summary><div class="dictionary-content"><p>Có thể thay ô nhập MaSach bằng <strong>Combo Box</strong>. Khi cấu hình đúng, học sinh chọn tên sách nhưng MƯỢN_TRẢ vẫn lưu mã.</p><table><tbody><tr><th>Control Source</th><td>MaSach</td></tr><tr><th>Row Source</th><td><code>SELECT MaSach, TenSach FROM [SÁCH] ORDER BY TenSach;</code></td></tr><tr><th>Bound Column</th><td>1 · cột mã</td></tr><tr><th>Column Count</th><td>2</td></tr><tr><th>Column Widths</th><td>0cm;6cm · ẩn mã, hiện tên</td></tr><tr><th>Limit To List</th><td>Yes</td></tr></tbody></table><p>Kiểm tra giá trị thực được lưu trong bảng sau khi chọn. Nhãn “Tên sách” chỉ thay chữ hiển thị, không tự đổi nguồn điều khiển.</p><a href="https://support.microsoft.com/en-us/access/add-a-list-box-or-combo-box" target="_blank" rel="noopener noreferrer">Hướng dẫn Combo Box của Microsoft</a></div></details>${video("use")}`;
  }
  function bind(index,api) {
    document.querySelectorAll('[data-seek]').forEach(b=>b.addEventListener('click',()=>{const v=document.querySelector('#native-form-video');v.currentTime=Number(b.dataset.seek);v.play().catch(()=>{});}));
    if(index===0) {
      const paint = i => {
        const row=rows[i];
        document.querySelector('#record-preview').innerHTML=`<h3>F_MuonTra <small>Record Source = MƯỢN_TRẢ</small></h3><dl>${fields.map(n=>`<div><dt>${n}</dt><dd>${safe(display(String(row[n])))}</dd></div>`).join('')}</dl><p>Bản ghi ${i+1} / 2</p>`;
        document.querySelectorAll('[data-form-row]').forEach(r=>r.classList.toggle('highlight-row',r.dataset.formRow===String(i)));
      };
      paint(0);
      document.querySelectorAll('[data-form-record]').forEach(b=>b.addEventListener('click',()=>{
        const i=Number(b.dataset.formRecord);paint(i);
        const visited=[...new Set([...(api.getState().demos.formRecords||[]),i])];
        api.update({demos:{formRecords:visited}});
        document.querySelector('#form-explore-result').textContent=`Form đang đọc bản ghi ${i+1} trong MƯỢN_TRẢ. Hai cách nhìn dùng chung dữ liệu.`;
        if(visited.length===2){api.markPassed('form-explore');document.querySelector('#form-explore-status').textContent='Đã thử xong';}
      }));
    }
    if(index===1) {
      const form=document.querySelector('#wizard-lab-form');
      const restore=api.getState().demos.wizard;
      if(restore){for(const n of ['source','layout','name']) form.elements[n].value=restore[n]||'';for(const c of form.querySelectorAll('[name=field]'))c.checked=restore.fields?.includes(c.value);}
      form.addEventListener('submit',e=>{
        e.preventDefault();const data=new FormData(form),chosen=data.getAll('field');
        api.update({demos:{wizard:{source:data.get('source'),layout:data.get('layout'),name:data.get('name'),fields:chosen}}});
        const good=data.get('source')==='MƯỢN_TRẢ'&&data.get('layout')==='Columnar'&&String(data.get('name')).trim()==='F_MuonTra'&&chosen.length===7&&fields.every(f=>chosen.includes(f));
        document.querySelector('#wizard-result').textContent=good?'Đúng. F_MuonTra dùng bảng MƯỢN_TRẢ, đủ bảy trường, bố cục Columnar. Trong Access, bấm Finish để tạo Form.':'Kiểm tra nguồn MƯỢN_TRẢ, chọn đúng bảy trường của lượt mượn, Columnar và tên F_MuonTra. TenSach và HoVaTen thuộc các bảng danh mục.';
        if(good){api.markPassed('wizard-lab');document.querySelector('#wizard-status').textContent='Đã thử xong';}
      });
    }
    if(index===2) {
      const form=document.querySelector('#entry-lab-form');
      const saved=api.getState().demos.entry||{};
      const paint=record=>{
        if(!record)return;
        form.elements.MaMuonTra.value=record.MaMuonTra;
        document.querySelector('#stored-record').innerHTML=`<table><caption>MƯỢN_TRẢ · bản ghi đã lưu trong mô phỏng</caption><thead><tr>${fields.map(n=>`<th>${n}</th>`).join('')}</tr></thead><tbody><tr>${fields.map(n=>`<td>${safe(display(String(record[n])))}</td>`).join('')}</tr></tbody></table>`;
      };
      if(saved.draft)for(const n of fields)if(form.elements[n]&&n!=='MaMuonTra')form.elements[n].value=saved.draft[n]||'';
      paint(saved.record);
      form.addEventListener('change',()=>api.update({demos:{entry:{...api.getState().demos.entry,draft:Object.fromEntries(new FormData(form))}}}));
      form.addEventListener('submit',e=>{
        e.preventDefault();const values=Object.fromEntries(new FormData(form));const previous=api.getState().demos.entry||{};const result=document.querySelector('#entry-result');
        if(!['S001','S002'].includes(values.MaSach.trim())||!['TV001','TV002'].includes(values.SoTheTV)){
          api.update({demos:{entry:{...previous,sawInvalid:true,draft:values}}});
          result.textContent='Không lưu được. Mã tham chiếu chưa tồn tại trong bảng danh mục. Sửa MaSach sang S001 hoặc S002 rồi lưu lại.';return;
        }
        if((values.TrangThai==='Đã trả'&&!values.NgayTra)||(values.NgayTra&&values.TrangThai!=='Đã trả')){result.textContent='Để hoàn thành tình huống trả sách trong mô phỏng, điền NgayTra và chọn Đã trả.';return;}
        const record={...values,MaMuonTra:previous.record?.MaMuonTra||12};
        const isUpdate=Boolean(previous.record);
        api.update({demos:{entry:{...previous,record,draft:values,savedBorrow:previous.savedBorrow||!record.NgayTra}}});paint(record);
        result.textContent=isUpdate?'Đã cập nhật đúng bản ghi 12. Bảng đã đổi NgayTra và TrangThai; không tạo thêm lượt mượn.':'Đã thêm bản ghi 12. Bây giờ cập nhật ngày trả và chọn Đã trả rồi lưu lần nữa.';
        const now=api.getState().demos.entry;
        if(now.sawInvalid&&now.savedBorrow&&isUpdate&&record.NgayTra&&record.TrangThai==='Đã trả'){
          api.markPassed('entry-lab');document.querySelector('#entry-status').textContent='Đã thử xong';
        } else if(!now.sawInvalid){result.textContent+=' Em còn cần thử một mã sách chưa tồn tại để quan sát ràng buộc.';}
      });
    }
  }
  return {html,bind};
})();
