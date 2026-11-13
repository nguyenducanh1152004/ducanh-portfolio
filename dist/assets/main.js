(() => {
  const C = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const SECTIONS = [
    { key: 'about', title: 'Giới thiệu', planet: 'Trái Đất', color: '#7cc4ff' },
    { key: 'skills', title: 'Kỹ năng', planet: 'Sao Hải Vương', color: '#a594ff' },
    { key: 'projects', title: 'Dự án', planet: 'Sao Thổ', color: '#f2c38b' },
    { key: 'experience', title: 'Kinh nghiệm', planet: 'Sao Hỏa', color: '#ff8a7a' },
    { key: 'contact', title: 'Liên hệ', planet: 'Sao Thiên Vương', color: '#7fe3d4' }
  ];
  const byKey = Object.fromEntries(SECTIONS.map((s, i) => [s.key, { ...s, index: i }]));

  /* ---------- dữ liệu cơ bản ---------- */
  $$('[data-bind]').forEach(el => { el.textContent = C[el.dataset.bind] || ''; });
  $$('.nav a').forEach(a => a.style.setProperty('--c', byKey[a.dataset.key].color));

  /* ---------- toast ---------- */
  const toastEl = $('.toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
  }

  /* ---------- ảnh bìa dự án (SVG tạo bằng code) ---------- */
  function cover(p, id) {
    const [a, b] = p.colors;
    const w = 'rgba(255,255,255,';
    const shapes = {
      browser: `<rect x="44" y="34" width="232" height="140" rx="10" fill="${w}.08)" stroke="${w}.22)"/><circle cx="58" cy="47" r="3" fill="${w}.5)"/><circle cx="68" cy="47" r="3" fill="${w}.35)"/><circle cx="78" cy="47" r="3" fill="${w}.2)"/><rect x="58" y="64" width="96" height="10" rx="5" fill="${w}.75)"/><rect x="58" y="80" width="64" height="6" rx="3" fill="${w}.35)"/><rect x="58" y="94" width="40" height="14" rx="7" fill="${w}.9)"/><rect x="172" y="62" width="90" height="48" rx="8" fill="${w}.18)"/><rect x="58" y="120" width="62" height="42" rx="7" fill="${w}.16)"/><rect x="129" y="120" width="62" height="42" rx="7" fill="${w}.16)"/><rect x="200" y="120" width="62" height="42" rx="7" fill="${w}.16)"/>`,
      chat: `<rect x="60" y="40" width="130" height="30" rx="15" fill="${w}.16)"/><rect x="74" y="52" width="90" height="6" rx="3" fill="${w}.6)"/><rect x="128" y="82" width="132" height="44" rx="16" fill="${w}.85)"/><rect x="142" y="94" width="100" height="6" rx="3" fill="${a}" opacity=".7"/><rect x="142" y="106" width="70" height="6" rx="3" fill="${a}" opacity=".45"/><rect x="60" y="138" width="110" height="30" rx="15" fill="${w}.16)"/><circle cx="84" cy="153" r="3" fill="#fff"><animate attributeName="opacity" values="1;.2;1" dur="1.2s" repeatCount="indefinite"/></circle><circle cx="96" cy="153" r="3" fill="#fff" opacity=".6"/><circle cx="108" cy="153" r="3" fill="#fff" opacity=".3"/>`,
      kanban: [0, 1, 2].map(c => `<rect x="${48 + c * 78}" y="38" width="68" height="132" rx="9" fill="${w}.08)" stroke="${w}.14)"/><rect x="${56 + c * 78}" y="47" width="30" height="5" rx="2.5" fill="${w}.6)"/>` + [0, 1, 2].slice(0, 3 - (c === 2 ? 1 : 0)).map(r => `<rect x="${55 + c * 78}" y="${60 + r * 34}" width="54" height="27" rx="6" fill="${w}${c === 1 && r === 0 ? '.85' : '.2'})"/>`).join('')).join(''),
      phone: `<rect x="118" y="20" width="84" height="164" rx="16" fill="${w}.1)" stroke="${w}.35)" stroke-width="1.5"/><circle cx="160" cy="80" r="30" fill="none" stroke="${w}.15)" stroke-width="8"/><circle cx="160" cy="80" r="30" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-dasharray="140 200" transform="rotate(-90 160 80)"/><text x="160" y="86" fill="#fff" font-size="16" font-family="sans-serif" font-weight="700" text-anchor="middle">74%</text>${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${130 + i * 10}" y="${160 - [14, 22, 18, 30, 26, 36][i]}" width="6" height="${[14, 22, 18, 30, 26, 36][i]}" rx="3" fill="${w}${i === 5 ? '.95' : '.4'})"/>`).join('')}`,
      terminal: `<rect x="40" y="32" width="240" height="144" rx="10" fill="rgba(5,8,16,.75)" stroke="${w}.16)"/><circle cx="54" cy="45" r="3" fill="#ff5f57"/><circle cx="64" cy="45" r="3" fill="#febc2e"/><circle cx="74" cy="45" r="3" fill="#28c840"/>${[[60, 34, b], [100, 70, '#fff'], [60, 50, a], [116, 90, '#fff'], [60, 110, '#94a3b8'], [76, 60, b], [140, 40, '#fff']].map(([x, wd, col], i) => `<rect x="${x}" y="${64 + i * 14}" width="${wd}" height="6" rx="3" fill="${col}" opacity=".8"/>`).join('')}<rect x="60" y="162" width="8" height="10" fill="${b}"><animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/></rect>`,
      orbit: `<circle cx="160" cy="104" r="34" fill="${w}.9)"/><circle cx="148" cy="92" r="34" fill="${a}" opacity=".35"/><ellipse cx="160" cy="104" rx="96" ry="26" fill="none" stroke="${w}.5)" transform="rotate(-18 160 104)"/><ellipse cx="160" cy="104" rx="72" ry="60" fill="none" stroke="${w}.22)" transform="rotate(30 160 104)"/><circle cx="252" cy="78" r="7" fill="#fff"/><circle cx="96" cy="150" r="4" fill="${w}.8)"/>`,
      map: `${[0, 1, 2, 3, 4].map(i => `<path d="M${20 + i * 70} 0 L${-20 + i * 70} 200" stroke="${w}.1)" stroke-width="10"/>`).join('')}<path d="M0 70 Q160 40 320 110" stroke="${w}.16)" stroke-width="12" fill="none"/><path d="M0 150 Q140 170 320 140" stroke="${w}.1)" stroke-width="8" fill="none"/><path d="M90 140 Q140 60 220 84" stroke="#fff" stroke-width="3" stroke-dasharray="6 6" fill="none"/>${[[90, 140], [160, 70], [220, 84]].map(([x, y], i) => `<path d="M${x} ${y} c-10 -12 -10 -26 0 -30 c10 4 10 18 0 30z" transform="translate(0 -4)" fill="${i === 2 ? '#fff' : w + '.75)'}"/><circle cx="${x}" cy="${y - 20}" r="4" fill="${a}"/>`).join('')}`,
      chart: `<path d="M40 150 L80 120 L120 132 L160 86 L200 100 L240 58 L280 70 L280 170 L40 170Z" fill="${w}.14)"/><path d="M40 150 L80 120 L120 132 L160 86 L200 100 L240 58 L280 70" fill="none" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><circle cx="240" cy="58" r="5" fill="#fff"/><circle cx="240" cy="58" r="11" fill="none" stroke="#fff" opacity=".4"><animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite"/></circle>${[0, 1, 2].map(i => `<rect x="${44 + i * 64}" y="30" width="54" height="22" rx="6" fill="${w}.12)"/>`).join('')}`,
      wave: `${Array.from({ length: 26 }, (_, i) => { const h = 16 + Math.abs(Math.sin(i * 0.7) * 60 + Math.sin(i * 1.9) * 20); return `<rect x="${44 + i * 9.4}" y="${104 - h / 2}" width="5" height="${h.toFixed(0)}" rx="2.5" fill="${w}${(0.35 + (i % 5) * 0.13).toFixed(2)})"/>`; }).join('')}<circle cx="160" cy="104" r="20" fill="#fff"/><path d="M155 96 L167 104 L155 112Z" fill="${a}"/>`
    };
    return `<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient><radialGradient id="r${id}" cx=".2" cy=".1" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><rect width="320" height="200" fill="url(#g${id})"/><rect width="320" height="200" fill="url(#r${id})"/><rect width="320" height="200" fill="rgba(6,9,20,.28)"/>${shapes[p.cover] || shapes.browser}</svg>`;
  }

  /* ---------- icon SVG (một nét, một độ dày) ---------- */
  const ICONS = {
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    sparkles: '<path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.9L12 18.5l-1.8-5.8-5.7-1.9L10.2 9z"/><path d="M19 3v3M20.5 4.5h-3"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.6-4.4L4 8M4 3v5h5M4 13a8 8 0 0 0 14.6 4.4L20 16M20 21v-5h-5"/>',
    layout: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 20V9"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    server: '<rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M7 7.5h.01M7 16.5h.01"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    hammer: '<path d="m14 7 3 3M3 21l9.5-9.5M12 4l8 8-3 3-8-8z"/>',
    learn: '<path d="M22 9 12 4 2 9l10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5V21h16"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14 -1.5 7 5-3 5 3-1.5-7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    minus: '<path d="M5 12h14"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>'
  };
  const icon = (name, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;

  /* ---------- nội dung từng mục ---------- */
  const views = {
    about() {
      const a = C.about;
      return `
        <div class="about-top">
          <div class="avatar"><span>ĐA</span></div>
          <div><p class="big-name">${esc(C.name)}</p><p class="muted">${esc(C.role)} · ${esc(C.location)}</p></div>
        </div>
        <p class="lead">${esc(a.intro)}</p>
        <p class="body-text">${esc(a.more)}</p>
        <p class="stat-line">${a.stats.map(s => `<span><strong>${esc(s.value)}</strong> ${esc(s.label)}</span>`).join('')}</p>
        <dl class="facts">${a.facts.map(f => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join('')}</dl>
        <h3 class="sub">Câu chuyện của mình</h3>
        <ol class="story">${a.story.map(s => `<li><span class="story-year">${esc(s.year)}</span><p>${esc(s.text)}</p></li>`).join('')}</ol>
        <h3 class="sub">Điều mình theo đuổi</h3>
        <ul class="rows">${a.values.map(v => `<li>${icon(v.icon, 'i row-icon')}<div><h4>${esc(v.title)}</h4><p>${esc(v.text)}</p></div></li>`).join('')}</ul>
        <h3 class="sub">Mình có thể giúp gì</h3>
        <ul class="rows rows-2">${C.services.map(s => `<li>${icon(s.icon, 'i row-icon')}<div><h4>${esc(s.title)}</h4><p>${esc(s.text)}</p></div></li>`).join('')}</ul>
        <h3 class="sub">Dạo này</h3>
        <dl class="now">${a.now.map(n => `<div>${icon(n.icon, 'i row-icon')}<dt>${esc(n.label)}</dt><dd>${esc(n.value)}</dd></div>`).join('')}</dl>
        <h3 class="sub">Ngoài giờ code</h3>
        <p class="inline-list">${a.hobbies.map(h => `<span>${esc(h)}</span>`).join('')}</p>
        <a class="btn btn-primary panel-cta" href="#contact">Cùng làm gì đó nhé ${icon('arrowRight')}</a>`;
    },
    skills() {
      const levelName = l => ['', 'Làm quen', 'Cơ bản', 'Khá', 'Thành thạo', 'Chuyên sâu'][l] || '';
      return `
        <p class="lead">Bộ công cụ mình dùng hằng ngày để đưa một sản phẩm từ bản phác thảo đến tay người dùng.</p>
        <div class="skill-groups">${C.skills.map(g => `
          <section class="skill-group" style="--c:${g.color}">
            <h3><i></i>${esc(g.group)}</h3>
            <p class="skill-desc">${esc(g.desc)}</p>
            <ul class="skill-list">${g.items.map(s => `
              <li class="lv-${s.level}">
                <span class="skill-name">${esc(s.name)}</span>
                <span class="skill-meta">${levelName(s.level)} · ${s.years} năm</span>
              </li>`).join('')}
            </ul>
          </section>`).join('')}
        </div>
        <h3 class="sub">Cách mình làm việc</h3>
        <ol class="process">${C.process.map((p, i) => `<li><span class="step">Bước ${i + 1}</span><h4>${esc(p.title)}</h4><p>${esc(p.text)}</p></li>`).join('')}</ol>
        <h3 class="sub">Kỹ năng mềm</h3>
        <p class="inline-list">${C.softSkills.map(s => `<span>${esc(s)}</span>`).join('')}</p>
        <h3 class="sub">Đang tìm hiểu</h3>
        <p class="inline-list muted-list">${C.learning.map(s => `<span>${esc(s)}</span>`).join('')}</p>`;
    },
    projects() {
      const cats = ['Tất cả', ...new Set(C.projects.map(p => p.category))];
      return `
        <p class="lead">Một vài sản phẩm mình đã xây — từ web app, mobile, backend đến những thử nghiệm sáng tạo.</p>
        <div class="filters" role="tablist" aria-label="Lọc dự án">${cats.map((c, i) => `<button role="tab" aria-selected="${i === 0}" data-cat="${esc(c)}">${esc(c)}</button>`).join('')}</div>
        <div class="projects">${C.projects.map((p, i) => `
          <button class="project" data-index="${i}" data-cat="${esc(p.category)}" style="--a:${p.colors[0]};--b:${p.colors[1]}">
            <span class="project-cover">${cover(p, 'c' + i)}</span>
            <span class="project-info">
              <span class="project-title">${esc(p.title)}${icon('arrowUpRight', 'i arrow')}</span>
              <span class="project-tagline">${esc(p.tagline)}</span>
              <span class="project-meta">${esc(p.category)} · ${esc(p.year)} · ${p.tech.slice(0, 3).map(esc).join(', ')}</span>
            </span>
          </button>`).join('')}
        </div>`;
    },
    experience() {
      return `
        <p class="lead">Hành trình từ những trang web đầu tiên đến các sản phẩm có người dùng thật.</p>
        <ol class="timeline">${C.experience.map(e => `
          <li class="tl-item">
            <span class="tl-dot"></span>
            <p class="tl-time">${esc(e.time)} · ${esc(e.type)}</p>
            <h3>${esc(e.role)}</h3>
            <p class="tl-org">${esc(e.org)} · ${esc(e.place)}</p>
            <p class="body-text">${esc(e.text)}</p>
            <ul>${e.points.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
            <p class="tl-tech">${e.tech.map(esc).join(' · ')}</p>
          </li>`).join('')}
        </ol>
        <h3 class="sub">Học vấn</h3>
        ${C.education.map(e => `<div class="edu"><p class="tl-time">${esc(e.time)}</p><h4>${esc(e.title)}</h4><p class="tl-org">${esc(e.org)}</p><p class="body-text">${esc(e.text)}</p></div>`).join('')}
        <h3 class="sub">Chứng chỉ & giải thưởng</h3>
        <ul class="rows rows-2">${C.certificates.map(c => `<li>${icon('award', 'i row-icon')}<div><h4>${esc(c.title)}</h4><p>${esc(c.org)} · ${esc(c.year)}</p></div></li>`).join('')}</ul>`;
    },
    contact() {
      return `
        <p class="contact-big">Có một ý tưởng?<br><span>Cùng biến nó thành thật.</span></p>
        <p class="lead">Một website, một ứng dụng hay chỉ là một cuộc trò chuyện — mình thường phản hồi trong vòng 24 giờ.</p>
        <div class="contact-card">
          <div><p class="muted small">Email</p><p class="contact-email">${esc(C.email)}</p></div>
          <button class="btn btn-ghost btn-sm copy-email">${icon('copy')} Sao chép</button>
        </div>
        <div class="socials">
          <a href="${esc(C.github)}" target="_blank" rel="noopener">GitHub ${icon('arrowUpRight')}</a>
          <a href="${esc(C.linkedin)}" target="_blank" rel="noopener">LinkedIn ${icon('arrowUpRight')}</a>
          <span class="muted">${esc(C.location)}</span>
        </div>
        <div class="avail">
          <div class="avail-info">
            <p><span class="status-dot"></span>${esc(C.contact.response)}</p>
            <p class="muted">${esc(C.contact.hours)}</p>
          </div>
          <ul>${C.contact.open.map(o => `<li class="${o.on ? 'on' : 'off'}">${icon(o.on ? 'check' : 'minus')} ${esc(o.label)}</li>`).join('')}</ul>
        </div>
        <h3 class="sub">Gửi lời nhắn</h3>
        <form class="contact-form" novalidate>
          <div class="topic-pick" role="group" aria-label="Chủ đề">${C.contact.topics.map(t => `<button type="button" class="topic" aria-pressed="false">${esc(t)}</button>`).join('')}</div>
          <div class="row">
            <label>Tên của bạn<input name="name" autocomplete="name" required maxlength="100" placeholder="Nguyễn Văn A"></label>
            <label>Email<input name="email" type="email" autocomplete="email" required maxlength="254" placeholder="ban@email.com"></label>
          </div>
          <label>Lời nhắn<textarea name="message" rows="4" required maxlength="3000" placeholder="Mình đang muốn làm…"></textarea></label>
          <p class="form-error" aria-live="polite"></p>
          <button class="btn btn-primary" type="submit">Gửi lời nhắn ${icon('arrowRight')}</button>
        </form>
        <h3 class="sub">Câu hỏi thường gặp</h3>
        <div class="faq">${C.contact.faq.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>`;
    }
  };

  /* ---------- nhãn hành tinh ---------- */
  const tagsHost = $('.planet-tags');
  const labels = {};
  SECTIONS.forEach(s => {
    const b = document.createElement('a');
    b.className = 'planet-tag';
    b.href = '#' + s.key;
    b.dataset.key = s.key;
    b.style.setProperty('--c', s.color);
    b.innerHTML = `<span class="tag-dot"></span><span class="tag-name">${s.title}</span>`;
    tagsHost.appendChild(b);
    labels[s.key] = b;
  });

  /* ---------- panel & điều hướng ---------- */
  const panel = $('.panel');
  const panelBody = $('.panel-body');
  let current = null;

  function go(key) {
    if (key) {
      if (location.hash !== '#' + key) location.hash = key;
      else route();
    } else {
      history.pushState(null, '', location.pathname + location.search);
      route();
    }
  }

  function route() {
    const key = location.hash.slice(1);
    if (byKey[key]) open(key); else close();
  }

  function fill(key) {
    const s = byKey[key];
    panel.style.setProperty('--accent', s.color);
    body.style.setProperty('--accent', s.color);
    $('.panel-planet').textContent = s.planet;
    $('.panel-title').textContent = s.title;
    panelBody.innerHTML = views[key]();
    panelBody.scrollTop = 0;
    const prev = SECTIONS[(s.index + 4) % 5], next = SECTIONS[(s.index + 1) % 5];
    $('.prev .foot-label').textContent = prev.title;
    $('.next .foot-label').textContent = next.title;
    $('.prev').dataset.key = prev.key;
    $('.next').dataset.key = next.key;
    wire(key);
  }

  let swapTimer;
  function open(key) {
    if (current === key) return;
    const wasOpen = !!current;
    current = key;
    body.classList.add('is-focused');
    panel.setAttribute('aria-hidden', 'false');
    panel.inert = false;
    $$('.nav a').forEach(a => a.toggleAttribute('aria-current', a.dataset.key === key));
    $(`.nav a[data-key="${key}"]`).scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduced ? 'auto' : 'smooth' });
    document.title = `${byKey[key].title} — ${C.name}`;
    scene && scene.focus(key);
    clearTimeout(swapTimer);
    if (wasOpen && !reduced) {
      panel.classList.add('is-swapping');
      swapTimer = setTimeout(() => { fill(key); panel.classList.remove('is-swapping'); }, 220);
    } else {
      fill(key);
    }
    setTimeout(() => panel.focus({ preventScroll: true }), wasOpen ? 0 : 400);
  }

  function close() {
    if (!current) return;
    current = null;
    body.classList.remove('is-focused');
    panel.setAttribute('aria-hidden', 'true');
    panel.inert = true;
    $$('.nav a').forEach(a => a.removeAttribute('aria-current'));
    document.title = `${C.name} — ${C.role}`;
    scene && scene.overview();
  }
  panel.inert = true;

  addEventListener('hashchange', route);
  addEventListener('popstate', route);
  $('.brand').addEventListener('click', e => { e.preventDefault(); go(null); });
  $('.panel-close').addEventListener('click', () => go(null));
  $$('.foot-btn').forEach(b => b.addEventListener('click', () => go(b.dataset.key)));

  addEventListener('keydown', e => {
    if (dialog.open) return;
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '');
    if (e.key === 'Escape' && current) go(null);
    if (current && !typing && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      const i = byKey[current].index + (e.key === 'ArrowRight' ? 1 : 4);
      go(SECTIONS[i % 5].key);
    }
  });

  /* ---------- tương tác trong từng mục ---------- */
  const dialog = $('#project-dialog');
  function openProject(i) {
    const p = C.projects[i];
    $('.dialog-body', dialog).innerHTML = `
      <div class="pd-cover">${cover(p, 'd' + i)}</div>
      <div class="pd-content">
        <p class="project-meta">${esc(p.category)} · ${esc(p.year)}</p>
        <h2 id="pd-title">${esc(p.title)}</h2>
        <p class="lead">${esc(p.tagline)}</p>
        <div class="pd-grid">
          <div><h4>Bài toán</h4><p>${esc(p.problem)}</p></div>
          <div><h4>Giải pháp</h4><p>${esc(p.solution)}</p></div>
        </div>
        <h4>Tính năng chính</h4>
        <ul class="pd-features">${p.features.map(f => `<li>${icon('check')}${esc(f)}</li>`).join('')}</ul>
        <div class="pd-result"><span>Kết quả</span>${esc(p.result)}</div>
        <p class="inline-list">${p.tech.map(t => `<span>${esc(t)}</span>`).join('')}</p>
        <div class="pd-actions">
          <button class="btn btn-primary sample-link">Xem demo ${icon('arrowUpRight')}</button>
          <button class="btn btn-ghost sample-link">Mã nguồn</button>
        </div>
      </div>`;
    dialog.style.setProperty('--a', p.colors[0]);
    dialog.showModal();
    $$('.sample-link', dialog).forEach(b => b.addEventListener('click', () => toast('Đây là dự án mẫu — link sẽ được cập nhật sau.')));
  }
  $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });

  function wire(key) {
    if (key === 'projects') {
      $$('.project', panelBody).forEach(card => card.addEventListener('click', () => openProject(+card.dataset.index)));
      $$('.filters button', panelBody).forEach(btn => btn.addEventListener('click', () => {
        $$('.filters button', panelBody).forEach(b => b.setAttribute('aria-selected', b === btn));
        const cat = btn.dataset.cat;
        $$('.project', panelBody).forEach(card => { card.hidden = cat !== 'Tất cả' && card.dataset.cat !== cat; });
      }));
    }
    if (key === 'contact') {
      $('.copy-email', panelBody).addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(C.email); toast('Đã sao chép email ✓'); }
        catch { toast(C.email); }
      });
      $$('.socials a', panelBody).forEach(a => {
        if (/^https:\/\/(github|www\.linkedin)\.com\/?$/.test(a.getAttribute('href'))) {
          a.addEventListener('click', e => { e.preventDefault(); toast('Link mạng xã hội sẽ được cập nhật sau.'); });
        }
      });
      const form = $('.contact-form', panelBody);
      $$('.topic', form).forEach(t => t.addEventListener('click', () => t.setAttribute('aria-pressed', t.getAttribute('aria-pressed') !== 'true')));
      form.addEventListener('submit', e => {
        e.preventDefault();
        const d = Object.fromEntries(new FormData(form));
        const err = $('.form-error', form);
        if (!d.name.trim() || !d.message.trim()) { err.textContent = 'Bạn điền giúp mình tên và lời nhắn nhé.'; return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) { err.textContent = 'Email chưa đúng định dạng.'; return; }
        err.textContent = '';
        if (C.demo) {
          toast('Bản thử nghiệm: lời nhắn chưa được gửi đi.');
          form.reset();
          return;
        }
        const topics = $$('.topic[aria-pressed="true"]', form).map(t => t.textContent).join(', ');
        location.href = `mailto:${C.email}?subject=${encodeURIComponent('Liên hệ từ portfolio — ' + d.name)}&body=${encodeURIComponent((topics ? 'Chủ đề: ' + topics + '\n\n' : '') + d.message + '\n\n— ' + d.name + ' (' + d.email + ')')}`;
      });
    }
  }
  /* ---------- cảnh 3D ---------- */
  let scene = null;
  const body = document.body;
  const pct = $('.loader-pct');
  function markReady() {
    body.classList.remove('is-loading');
    body.classList.add('is-ready');
    setTimeout(() => body.classList.add('is-settled'), 2600);
    route();
  }
  function boot() {
  if (window.Space && Space.supported()) {
    try {
      scene = Space.create({
        host: $('#space'),
        labels,
        reduced,
        avoid: () => (body.classList.contains('is-focused') ? [] : $$('.hero-title, .hero-role, .hero-text, .hero-actions, .hero-status').map(el => el.getBoundingClientRect()).filter(r => r.width)),
        onProgress: p => { pct.textContent = Math.round(p * 100) + '%'; },
        onReady: markReady,
        onHover: key => {
          Object.entries(labels).forEach(([k, el]) => el.classList.toggle('is-hover', k === key));
        },
        onSelect: key => go(key)
      });
    } catch (err) {
      console.error(err);
      scene = null;
    }
  }
  if (!scene) {
    body.classList.add('no-webgl');
    markReady();
  }
  }
  boot();
})();
