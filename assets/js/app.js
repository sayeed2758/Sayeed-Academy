(() => {
  'use strict';

  const KEY = {
    catalog: 'sa_v4_full_catalog',
    prefs: 'sa_v4_full_prefs',
    favorites: 'sa_v4_full_favorites',
    history: 'sa_v4_full_history',
    db: 'SayeedAcademyAudioDB_v4'
  };

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  const clone = obj => JSON.parse(JSON.stringify(obj));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
  const uid = prefix => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;

  let catalog = null;
  let view = 'home';
  let managerTab = 'chapters';
  let current = null;
  let currentClass = '';
  let currentSubject = '';
  let dbPromise = null;
  const objectUrls = new Map();

  const DEFAULT_CATALOG = clone({"version":"3.0.0","academy":"Sayeed Academy","classes":[{"id":"class-6","name":"Class 6","short":"06","subjects":[{"id":"c6-s1","name":"English","icon":"📖","chapters":[{"id":"c6-1-01","title":"English Chapter 1","summary":"Add the audio summary and key points for Class 6 English Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c6-1-02","title":"English Chapter 2","summary":"Add the audio summary and key points for Class 6 English Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c6-s2","name":"Mathematics","icon":"∑","chapters":[{"id":"c6-2-01","title":"Mathematics Chapter 1","summary":"Add the audio summary and key points for Class 6 Mathematics Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c6-2-02","title":"Mathematics Chapter 2","summary":"Add the audio summary and key points for Class 6 Mathematics Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c6-s3","name":"Science","icon":"⚗","chapters":[{"id":"c6-3-01","title":"Science Chapter 1","summary":"Add the audio summary and key points for Class 6 Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c6-3-02","title":"Science Chapter 2","summary":"Add the audio summary and key points for Class 6 Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c6-s4","name":"Social Science","icon":"🌍","chapters":[{"id":"c6-4-01","title":"Social Science Chapter 1","summary":"Add the audio summary and key points for Class 6 Social Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c6-4-02","title":"Social Science Chapter 2","summary":"Add the audio summary and key points for Class 6 Social Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c6-s5","name":"Hindi","icon":"अ","chapters":[{"id":"c6-5-01","title":"Hindi Chapter 1","summary":"Add the audio summary and key points for Class 6 Hindi Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c6-5-02","title":"Hindi Chapter 2","summary":"Add the audio summary and key points for Class 6 Hindi Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c6-s6","name":"Computer","icon":"💻","chapters":[{"id":"c6-6-01","title":"Computer Chapter 1","summary":"Add the audio summary and key points for Class 6 Computer Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c6-6-02","title":"Computer Chapter 2","summary":"Add the audio summary and key points for Class 6 Computer Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]}]},{"id":"class-7","name":"Class 7","short":"07","subjects":[{"id":"c7-s1","name":"English","icon":"📖","chapters":[{"id":"c7-1-01","title":"English Chapter 1","summary":"Add the audio summary and key points for Class 7 English Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c7-1-02","title":"English Chapter 2","summary":"Add the audio summary and key points for Class 7 English Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c7-s2","name":"Mathematics","icon":"∑","chapters":[{"id":"c7-2-01","title":"Mathematics Chapter 1","summary":"Add the audio summary and key points for Class 7 Mathematics Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c7-2-02","title":"Mathematics Chapter 2","summary":"Add the audio summary and key points for Class 7 Mathematics Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c7-s3","name":"Science","icon":"⚗","chapters":[{"id":"c7-3-01","title":"Science Chapter 1","summary":"Add the audio summary and key points for Class 7 Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c7-3-02","title":"Science Chapter 2","summary":"Add the audio summary and key points for Class 7 Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c7-s4","name":"Social Science","icon":"🌍","chapters":[{"id":"c7-4-01","title":"Social Science Chapter 1","summary":"Add the audio summary and key points for Class 7 Social Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c7-4-02","title":"Social Science Chapter 2","summary":"Add the audio summary and key points for Class 7 Social Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c7-s5","name":"Hindi","icon":"अ","chapters":[{"id":"c7-5-01","title":"Hindi Chapter 1","summary":"Add the audio summary and key points for Class 7 Hindi Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c7-5-02","title":"Hindi Chapter 2","summary":"Add the audio summary and key points for Class 7 Hindi Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c7-s6","name":"Computer","icon":"💻","chapters":[{"id":"c7-6-01","title":"Computer Chapter 1","summary":"Add the audio summary and key points for Class 7 Computer Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c7-6-02","title":"Computer Chapter 2","summary":"Add the audio summary and key points for Class 7 Computer Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]}]},{"id":"class-8","name":"Class 8","short":"08","subjects":[{"id":"c8-s1","name":"English","icon":"📖","chapters":[{"id":"c8-1-01","title":"English Chapter 1","summary":"Add the audio summary and key points for Class 8 English Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c8-1-02","title":"English Chapter 2","summary":"Add the audio summary and key points for Class 8 English Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c8-s2","name":"Mathematics","icon":"∑","chapters":[{"id":"c8-2-01","title":"Mathematics Chapter 1","summary":"Add the audio summary and key points for Class 8 Mathematics Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c8-2-02","title":"Mathematics Chapter 2","summary":"Add the audio summary and key points for Class 8 Mathematics Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c8-s3","name":"Science","icon":"⚗","chapters":[{"id":"c8-3-01","title":"Science Chapter 1","summary":"Add the audio summary and key points for Class 8 Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c8-3-02","title":"Science Chapter 2","summary":"Add the audio summary and key points for Class 8 Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c8-s4","name":"Social Science","icon":"🌍","chapters":[{"id":"c8-4-01","title":"Social Science Chapter 1","summary":"Add the audio summary and key points for Class 8 Social Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c8-4-02","title":"Social Science Chapter 2","summary":"Add the audio summary and key points for Class 8 Social Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c8-s5","name":"Hindi","icon":"अ","chapters":[{"id":"c8-5-01","title":"Hindi Chapter 1","summary":"Add the audio summary and key points for Class 8 Hindi Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c8-5-02","title":"Hindi Chapter 2","summary":"Add the audio summary and key points for Class 8 Hindi Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c8-s6","name":"Computer","icon":"💻","chapters":[{"id":"c8-6-01","title":"Computer Chapter 1","summary":"Add the audio summary and key points for Class 8 Computer Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c8-6-02","title":"Computer Chapter 2","summary":"Add the audio summary and key points for Class 8 Computer Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]}]},{"id":"class-9","name":"Class 9","short":"09","subjects":[{"id":"c9-s1","name":"English","icon":"📖","chapters":[{"id":"c9-1-01","title":"English Chapter 1","summary":"Add the audio summary and key points for Class 9 English Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c9-1-02","title":"English Chapter 2","summary":"Add the audio summary and key points for Class 9 English Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c9-s2","name":"Mathematics","icon":"∑","chapters":[{"id":"c9-2-01","title":"Mathematics Chapter 1","summary":"Add the audio summary and key points for Class 9 Mathematics Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c9-2-02","title":"Mathematics Chapter 2","summary":"Add the audio summary and key points for Class 9 Mathematics Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c9-s3","name":"Science","icon":"⚗","chapters":[{"id":"c9-3-01","title":"Science Chapter 1","summary":"Add the audio summary and key points for Class 9 Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c9-3-02","title":"Science Chapter 2","summary":"Add the audio summary and key points for Class 9 Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c9-s4","name":"Social Science","icon":"🌍","chapters":[{"id":"c9-4-01","title":"Social Science Chapter 1","summary":"Add the audio summary and key points for Class 9 Social Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c9-4-02","title":"Social Science Chapter 2","summary":"Add the audio summary and key points for Class 9 Social Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c9-s5","name":"Hindi","icon":"अ","chapters":[{"id":"c9-5-01","title":"Hindi Chapter 1","summary":"Add the audio summary and key points for Class 9 Hindi Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c9-5-02","title":"Hindi Chapter 2","summary":"Add the audio summary and key points for Class 9 Hindi Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c9-s6","name":"Computer","icon":"💻","chapters":[{"id":"c9-6-01","title":"Computer Chapter 1","summary":"Add the audio summary and key points for Class 9 Computer Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c9-6-02","title":"Computer Chapter 2","summary":"Add the audio summary and key points for Class 9 Computer Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]}]},{"id":"class-10","name":"Class 10","short":"10","subjects":[{"id":"c10-s1","name":"English","icon":"📖","chapters":[{"id":"c10-1-01","title":"English Chapter 1","summary":"Add the audio summary and key points for Class 10 English Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c10-1-02","title":"English Chapter 2","summary":"Add the audio summary and key points for Class 10 English Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c10-s2","name":"Mathematics","icon":"∑","chapters":[{"id":"c10-2-01","title":"Mathematics Chapter 1","summary":"Add the audio summary and key points for Class 10 Mathematics Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c10-2-02","title":"Mathematics Chapter 2","summary":"Add the audio summary and key points for Class 10 Mathematics Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c10-s3","name":"Science","icon":"⚗","chapters":[{"id":"c10-3-01","title":"Science Chapter 1","summary":"Add the audio summary and key points for Class 10 Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c10-3-02","title":"Science Chapter 2","summary":"Add the audio summary and key points for Class 10 Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c10-s4","name":"Social Science","icon":"🌍","chapters":[{"id":"c10-4-01","title":"Social Science Chapter 1","summary":"Add the audio summary and key points for Class 10 Social Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c10-4-02","title":"Social Science Chapter 2","summary":"Add the audio summary and key points for Class 10 Social Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c10-s5","name":"Hindi","icon":"अ","chapters":[{"id":"c10-5-01","title":"Hindi Chapter 1","summary":"Add the audio summary and key points for Class 10 Hindi Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c10-5-02","title":"Hindi Chapter 2","summary":"Add the audio summary and key points for Class 10 Hindi Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c10-s6","name":"Computer","icon":"💻","chapters":[{"id":"c10-6-01","title":"Computer Chapter 1","summary":"Add the audio summary and key points for Class 10 Computer Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c10-6-02","title":"Computer Chapter 2","summary":"Add the audio summary and key points for Class 10 Computer Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]}]}]});

  function read(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (_) { return fallback; }
  }
  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  function prefs() { return read(KEY.prefs, { theme: 'light' }); }
  function favorites() { return read(KEY.favorites, []); }
  function history() { return read(KEY.history, []); }
  function saveCatalog() { write(KEY.catalog, catalog); }
  function classes() { return Array.isArray(catalog?.classes) ? catalog.classes : []; }
  function subjects() {
    return classes().flatMap(c => (c.subjects || []).map(s => ({...s, classId:c.id, className:c.name})));
  }
  function chapters() {
    return subjects().flatMap(s => (s.chapters || []).map(ch => ({...ch, subjectId:s.id, subjectName:s.name, classId:s.classId, className:s.className})));
  }
  function findChapter(id) { return chapters().find(ch => ch.id === id) || null; }
  function getClass(id) { return classes().find(c => c.id === id) || null; }
  function getSubject(classId, subjectId) { return getClass(classId)?.subjects?.find(s => s.id === subjectId) || null; }

  function toast(message, error = false) {
    const wrap = $('#toastWrap');
    if (!wrap) return;
    const el = document.createElement('div');
    el.className = `toast${error ? ' error' : ''}`;
    el.textContent = message;
    wrap.appendChild(el);
    setTimeout(() => el.remove(), 2800);
  }

  function applyTheme() {
    const dark = prefs().theme === 'dark';
    document.body.classList.toggle('dark', dark);
    const themeText = $('#themeToggle');
    const top = $('#topTheme');
    if (themeText) themeText.innerHTML = `${dark ? '☀' : '☾'} <span>${dark ? 'Light mode' : 'Dark mode'}</span>`;
    if (top) top.textContent = dark ? '☀' : '☾';
  }
  function toggleTheme() {
    const p = prefs();
    p.theme = p.theme === 'dark' ? 'light' : 'dark';
    write(KEY.prefs, p);
    applyTheme();
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return '00:00';
    const s = Math.max(0, Math.floor(seconds));
    return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  }

  function render() {
    const titles = {home:'Dashboard', library:'Audio Library', favorites:'Favorites', history:'Listening History', manager:'Content Manager', backup:'Backup & Restore'};
    const pageTitle = $('#pageTitle');
    if (pageTitle) pageTitle.textContent = titles[view] || 'Dashboard';
    $$('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
    const content = $('#appContent');
    if (!content) return;
    if (view === 'home') content.innerHTML = homeView();
    else if (view === 'library') content.innerHTML = libraryView(false);
    else if (view === 'favorites') content.innerHTML = libraryView(true);
    else if (view === 'history') content.innerHTML = historyView();
    else if (view === 'manager') content.innerHTML = managerView();
    else content.innerHTML = backupView();
    closeSidebar();
  }

  function stat(icon, title, number, sub) {
    return `<div class="stat"><div class="stat-top"><small>${esc(title)}</small><div class="stat-icon">${icon}</div></div><strong>${number}</strong><small>${esc(sub)}</small></div>`;
  }

  function homeView() {
    const recent = history().slice(0,5).map(x => findChapter(x.id)).filter(Boolean);
    return `<div class="content">
      <section class="hero">
        <div class="eyebrow">SAYEED ACADEMY • AUDIO LEARNING PRO</div>
        <h1>Learn chapter by chapter. Listen anywhere.</h1>
        <p>A premium, mobile-first audio learning library for Classes 6–10. Organise every subject, chapter and summary in one clean place.</p>
        <div class="hero-actions"><button class="btn btn-primary" data-action="goto-library">Explore Audio Library</button><button class="btn btn-ghost" data-action="goto-manager">Manage Content</button></div>
      </section>
      <section class="stats">
        ${stat('◉','Classes',classes().length,'Classes 6–10')}
        ${stat('▦','Subjects',subjects().length,'Across all classes')}
        ${stat('▶','Chapters',chapters().length,`${chapters().filter(c=>c.audio).length} with audio`)}
        ${stat('★','Favorites',favorites().length,'Saved chapters')}
      </section>
      <div class="section-head"><div><h2>Choose your class</h2><p>Open a class to see subject-wise chapters.</p></div></div>
      <div class="class-grid">${classes().map(c => `<button class="class-card" data-class="${esc(c.id)}"><div class="class-number">${esc(c.short)}</div><strong>${esc(c.name)}</strong><span>${(c.subjects||[]).length} subjects • ${(c.subjects||[]).reduce((n,s)=>n+(s.chapters||[]).length,0)} chapters</span><div class="gold-line"></div></button>`).join('')}</div>
      <div class="section-head"><div><h2>Recently listened</h2><p>Your latest audio chapters on this device.</p></div>${recent.length ? '<button class="link-btn" data-view-link="history">View all</button>' : ''}</div>
      ${recent.length ? `<div class="recent-list">${recent.map(c => `<div class="recent"><div class="recent-icon">▶</div><div class="grow"><strong>${esc(c.title)}</strong><small>${esc(c.className)} • ${esc(c.subjectName)}</small></div><button class="round-btn primary" data-play="${esc(c.id)}" title="Play">▶</button></div>`).join('')}</div>` : '<div class="empty"><strong>No listening history yet</strong>Play any chapter and it will appear here.</div>'}
    </div>`;
  }

  function libraryView(favoriteOnly) {
    return `<div class="content">
      <div class="section-head"><div><h2>${favoriteOnly ? 'Favorite Chapters' : 'Audio Library'}</h2><p>${favoriteOnly ? 'Your saved chapters.' : 'Browse Class → Subject → Chapter and play audio in-app.'}</p></div><button class="btn btn-blue" data-action="add-chapter">＋ Add Chapter</button></div>
      <div class="library-toolbar">
        <input class="search" id="librarySearch" placeholder="Search chapter, subject or class…" autocomplete="off">
        <select class="select" id="classFilter"><option value="">All classes</option>${classes().map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('')}</select>
        <select class="select" id="subjectFilter"><option value="">All subjects</option>${[...new Set(subjects().map(s=>s.name))].map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join('')}</select>
      </div>
      <div id="chapterResults" class="chapter-grid">${chapterCards(favoriteOnly ? chapters().filter(c=>favorites().includes(c.id)) : chapters())}</div>
    </div>`;
  }

  function chapterCards(list) {
    if (!list.length) return `<div class="empty" style="grid-column:1/-1"><strong>No chapters found</strong><span>Try another filter or create a chapter from Content Manager.</span></div>`;
    return list.map(c => `<article class="chapter-card">
      <div class="chapter-top"><span class="badge">${esc(c.className)} • ${esc(c.subjectName)}</span><button class="round-btn" data-fav="${esc(c.id)}" title="Favorite">${favorites().includes(c.id) ? '★' : '☆'}</button></div>
      <h3>${esc(c.title)}</h3><p>${esc(c.summary || 'No summary added yet.')}</p>
      <div class="chapter-meta"><span class="note">${c.audio ? `Audio ready${c.duration && c.duration !== '--:--' ? ' • '+esc(c.duration) : ''}` : 'Audio not added'}</span><button class="round-btn ${c.audio ? 'primary' : ''}" data-play="${esc(c.id)}" ${c.audio ? '' : 'disabled'} title="Play">▶</button></div>
    </article>`).join('');
  }

  function historyView() {
    const rows = history().map(h => ({...h, chapter:findChapter(h.id)})).filter(x=>x.chapter);
    return `<div class="content"><div class="section-head"><div><h2>Listening History</h2><p>Recent chapters played on this device.</p></div>${rows.length ? '<button class="btn btn-danger" data-action="clear-history">Clear history</button>' : ''}</div>
      ${rows.length ? `<div class="recent-list">${rows.map(x=>`<div class="recent"><div class="recent-icon">◷</div><div class="grow"><strong>${esc(x.chapter.title)}</strong><small>${esc(x.chapter.className)} • ${esc(x.chapter.subjectName)} • ${new Date(x.at).toLocaleString()}</small></div><button class="round-btn primary" data-play="${esc(x.chapter.id)}" ${x.chapter.audio?'':'disabled'}>▶</button></div>`).join('')}</div>` : '<div class="empty"><strong>Nothing played yet</strong><span>Your listening activity will be saved here.</span></div>'}</div>`;
  }

  function managerView() {
    let body = '';
    if (managerTab === 'chapters') {
      body = `<div class="manager-toolbar"><input class="search" id="managerSearch" placeholder="Search chapters…"><select class="select" id="managerClass"><option value="">All classes</option>${classes().map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('')}</select></div><div id="managerList" class="manager-list">${managerRows(chapters())}</div>`;
    } else if (managerTab === 'classes') {
      body = `<div class="manager-list">${classes().map(c=>`<div class="manager-row"><div class="recent-icon">${esc(c.short)}</div><div class="grow"><strong>${esc(c.name)}</strong><small>${(c.subjects||[]).length} subjects • ${(c.subjects||[]).reduce((n,s)=>n+(s.chapters||[]).length,0)} chapters</small></div></div>`).join('')}</div>`;
    } else {
      body = `<div class="manager-list">${subjects().map(s=>`<div class="manager-row"><div class="recent-icon">${esc(s.icon || '◉')}</div><div class="grow"><strong>${esc(s.name)}</strong><small>${esc(s.className)} • ${(s.chapters||[]).length} chapters</small></div></div>`).join('')}</div>`;
    }
    return `<div class="content"><div class="section-head"><div><h2>Content Manager</h2><p>Add, edit and delete chapter content without leaving the app.</p></div><button class="btn btn-blue" data-action="add-chapter">＋ New Chapter</button></div><div class="manager-tabs">${['chapters','classes','subjects'].map(t=>`<button class="tab ${managerTab===t?'active':''}" data-manager-tab="${t}">${t[0].toUpperCase()+t.slice(1)}</button>`).join('')}</div>${body}</div>`;
  }

  function managerRows(list) {
    if (!list.length) return '<div class="empty"><strong>No chapters found</strong><span>Create your first chapter.</span></div>';
    return list.map(ch=>`<div class="manager-row"><div class="recent-icon">${ch.audio?'▶':'○'}</div><div class="grow"><strong>${esc(ch.title)}</strong><small>${esc(ch.className)} • ${esc(ch.subjectName)} • ${ch.audio?'Audio ready':'No audio'}</small></div><div class="row-actions"><button class="round-btn" data-edit="${esc(ch.id)}" title="Edit">✎</button><button class="round-btn danger" data-delete="${esc(ch.id)}" title="Delete">⌫</button></div></div>`).join('');
  }

  function backupView() {
    return `<div class="content"><div class="section-head"><div><h2>Backup & Restore</h2><p>Protect your catalogue, favorites, preferences and history.</p></div></div><div class="backup-grid">
      <div class="backup-card"><h3>Export JSON</h3><p>Save the complete editable catalogue and app settings.</p><button class="btn btn-blue" data-action="export-backup">Download Backup</button></div>
      <div class="backup-card"><h3>Import JSON</h3><p>Restore a Sayeed Academy backup after confirmation.</p><button class="btn btn-ghost" data-action="import-backup">Choose Backup</button></div>
      <div class="backup-card"><h3>Reset starter data</h3><p>Restore the original Class 6–10 catalogue. This does not delete IndexedDB audio.</p><button class="btn btn-danger" data-action="reset-catalog">Reset Catalogue</button></div>
      <div class="backup-card"><h3>Audio storage</h3><p>Use a direct audio URL or upload a file to this device. Playback stays inside this app.</p><button class="btn btn-ghost" data-action="storage-info">Learn More</button></div>
    </div></div>`;
  }

  function filterLibrary() {
    const q = ($('#librarySearch')?.value || '').trim().toLowerCase();
    const cf = $('#classFilter')?.value || '';
    const sf = $('#subjectFilter')?.value || '';
    let list = view === 'favorites' ? chapters().filter(c=>favorites().includes(c.id)) : chapters();
    if (q) list = list.filter(c => `${c.title} ${c.summary} ${c.className} ${c.subjectName}`.toLowerCase().includes(q));
    if (cf) list = list.filter(c=>c.classId===cf);
    if (sf) list = list.filter(c=>c.subjectName===sf);
    const target = $('#chapterResults'); if (target) target.innerHTML = chapterCards(list);
  }

  function filterManager() {
    const q = ($('#managerSearch')?.value || '').trim().toLowerCase();
    const cf = $('#managerClass')?.value || '';
    let list = chapters();
    if (q) list = list.filter(c => `${c.title} ${c.summary} ${c.className} ${c.subjectName}`.toLowerCase().includes(q));
    if (cf) list = list.filter(c=>c.classId===cf);
    const target = $('#managerList'); if (target) target.innerHTML = managerRows(list);
  }

  function navigate(nextView) {
    if (!['home','library','favorites','history','manager','backup'].includes(nextView)) return;
    view = nextView;
    render();
  }

  function handleAction(action) {
    if (action === 'goto-library') return navigate('library');
    if (action === 'goto-manager') { view='manager'; managerTab='chapters'; return render(); }
    if (action === 'add-chapter') return openChapterModal();
    if (action === 'clear-history') return clearHistory();
    if (action === 'export-backup') return exportBackup();
    if (action === 'import-backup') return importBackup();
    if (action === 'reset-catalog') return resetCatalog();
    if (action === 'storage-info') return openInfoModal();
  }

  function handleClick(event) {
    const nav = event.target.closest('[data-view]');
    if (nav) return navigate(nav.dataset.view);
    const action = event.target.closest('[data-action]');
    if (action) return handleAction(action.dataset.action);
    const cls = event.target.closest('[data-class]');
    if (cls) { currentClass = cls.dataset.class; currentSubject=''; view='library'; render(); const filter=$('#classFilter'); if(filter) filter.value=currentClass; filterLibrary(); return; }
    const play = event.target.closest('[data-play]'); if (play) return playChapter(play.dataset.play);
    const fav = event.target.closest('[data-fav]'); if (fav) return toggleFavorite(fav.dataset.fav);
    const edit = event.target.closest('[data-edit]'); if (edit) return openChapterModal(edit.dataset.edit);
    const del = event.target.closest('[data-delete]'); if (del) return deleteChapter(del.dataset.delete);
    const tab = event.target.closest('[data-manager-tab]'); if (tab) { managerTab=tab.dataset.managerTab; render(); return; }
    const link = event.target.closest('[data-view-link]'); if (link) return navigate(link.dataset.viewLink);
  }

  function toggleFavorite(id) {
    let list = favorites();
    list = list.includes(id) ? list.filter(x=>x!==id) : [...list,id];
    write(KEY.favorites, list);
    toast(list.includes(id) ? 'Added to favorites' : 'Removed from favorites');
    render();
  }

  function clearHistory() {
    if (!confirm('Clear all listening history?')) return;
    write(KEY.history, []); toast('History cleared'); render();
  }

  async function deleteChapter(id) {
    const ch = findChapter(id);
    if (!ch) return toast('Chapter not found', true);
    if (!confirm(`Delete “${ch.title}” permanently?`)) return;
    const subject = getSubject(ch.classId, ch.subjectId);
    if (!subject) return toast('Chapter parent not found', true);
    subject.chapters = (subject.chapters||[]).filter(x=>x.id!==id);
    saveCatalog();
    write(KEY.favorites, favorites().filter(x=>x!==id));
    write(KEY.history, history().filter(x=>x.id!==id));
    await deleteAudioBlob(id).catch(()=>{});
    if (current?.id===id) closePlayer();
    toast('Chapter deleted'); render();
  }

  function openChapterModal(id='') {
    if (!classes().length) return toast('No classes available', true);
    const ch = id ? findChapter(id) : null;
    const firstClass = getClass(currentClass) || classes()[0];
    const form = ch ? {...ch} : {classId:firstClass.id, subjectId:firstClass.subjects[0]?.id || '', title:'', summary:'', audio:'', duration:'--:--', audioSource:'url'};
    const classOptions = classes().map(c=>`<option value="${esc(c.id)}" ${form.classId===c.id?'selected':''}>${esc(c.name)}</option>`).join('');
    const subjectOptions = (getClass(form.classId)?.subjects||[]).map(s=>`<option value="${esc(s.id)}" ${form.subjectId===s.id?'selected':''}>${esc(s.name)}</option>`).join('');
    $('#modalCard').innerHTML = `<div class="modal-head"><h2>${ch?'Edit chapter':'Add new chapter'}</h2><button class="icon-btn" data-close-modal>×</button></div>
      <form id="chapterForm"><div class="form-grid">
        <div class="field"><label>Class</label><select id="fClass">${classOptions}</select></div>
        <div class="field"><label>Subject</label><select id="fSubject">${subjectOptions}</select></div>
        <div class="field full"><label>Chapter title</label><input id="fTitle" maxlength="120" required value="${esc(form.title)}" placeholder="Chapter title"></div>
        <div class="field full"><label>Summary</label><textarea id="fSummary" maxlength="1500" placeholder="Short chapter summary">${esc(form.summary)}</textarea></div>
        <div class="field"><label>Audio source</label><select id="fSource"><option value="url" ${form.audioSource!=='local'?'selected':''}>Direct audio URL</option><option value="local" ${form.audioSource==='local'?'selected':''}>Upload to this device</option></select></div>
        <div class="field"><label>Duration</label><input id="fDuration" value="${esc(form.duration||'--:--')}" placeholder="08:42"></div>
        <div class="field full" id="urlBox"><label>Audio URL</label><input id="fAudio" value="${esc(form.audioSource==='local'?'':form.audio)}" placeholder="https://example.com/chapter.mp3"><span class="note">The URL must be directly playable by the browser.</span></div>
        <div class="field full hidden" id="fileBox"><label>Audio file</label><input id="fFile" type="file" accept="audio/*"><span class="note">The file is stored in this browser's IndexedDB and plays inside Sayeed Academy.</span></div>
      </div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-close-modal>Cancel</button><button class="btn btn-blue" type="submit">${ch?'Save Changes':'Create Chapter'}</button></div></form>`;
    $('#modal').classList.remove('hidden');
    const source = $('#fSource'), urlBox=$('#urlBox'), fileBox=$('#fileBox');
    const updateSource = () => { const local=source.value==='local'; urlBox.classList.toggle('hidden',local); fileBox.classList.toggle('hidden',!local); };
    source.addEventListener('change', updateSource); updateSource();
    $('#fClass').addEventListener('change', () => {
      const subs = getClass($('#fClass').value)?.subjects || [];
      $('#fSubject').innerHTML = subs.map(s=>`<option value="${esc(s.id)}">${esc(s.name)}</option>`).join('');
    });
    $('#chapterForm').addEventListener('submit', async e => { e.preventDefault(); await saveChapter(id || null); });
  }

  async function saveChapter(existingId) {
    const title=$('#fTitle').value.trim();
    if (!title) return toast('Chapter title is required', true);
    const classId=$('#fClass').value, subjectId=$('#fSubject').value, source=$('#fSource').value;
    const summary=$('#fSummary').value.trim();
    const duration=$('#fDuration').value.trim() || '--:--';
    const subject=getSubject(classId,subjectId);
    if (!subject) return toast('Please select a valid class and subject', true);
    const old=existingId ? findChapter(existingId) : null;
    let audio = source==='url' ? $('#fAudio').value.trim() : '';
    if (source==='url' && audio && !/^https?:\/\//i.test(audio)) return toast('Audio URL must start with http:// or https://', true);
    if (source==='local') {
      const file=$('#fFile').files[0];
      if (!file && !old?.audio?.startsWith('indexeddb://')) return toast('Choose an audio file', true);
    }
    let target = old;
    if (target && (target.classId!==classId || target.subjectId!==subjectId)) {
      const oldSubject=getSubject(target.classId,target.subjectId);
      if (oldSubject) oldSubject.chapters=oldSubject.chapters.filter(x=>x.id!==existingId);
      target=null;
    }
    if (!target) {
      target={id:existingId||uid('chapter'),title:'',summary:'',audio:'',duration:'--:--',audioSource:source};
      subject.chapters.push(target);
    }
    target.title=title; target.summary=summary; target.duration=duration; target.audioSource=source;
    if (source==='url') {
      target.audio=audio;
      await deleteAudioBlob(target.id).catch(()=>{});
    } else {
      const file=$('#fFile').files[0];
      if (file) { await saveAudioBlob(target.id,file); target.audio=`indexeddb://${target.id}`; }
    }
    saveCatalog(); closeModal(); toast(existingId?'Chapter updated':'Chapter created'); render();
  }

  async function playChapter(id) {
    const ch=findChapter(id);
    if (!ch) return toast('Chapter not found', true);
    if (!ch.audio) return toast('No audio has been added to this chapter', true);
    current=ch;
    $('#playerTitle').textContent=ch.title;
    $('#playerSub').textContent=`${ch.className} • ${ch.subjectName}`;
    $('#playerFav').textContent=favorites().includes(id)?'★':'☆';
    let src=ch.audio;
    if (src.startsWith('indexeddb://')) {
      src=await getAudioBlob(id);
      if (!src) return toast('Local audio file is missing. Edit the chapter and upload it again.', true);
    }
    const audio=$('#audio');
    audio.src=src; audio.load();
    try { await audio.play(); } catch (_) { toast('Tap play to start audio'); }
    recordHistory(id);
  }

  function recordHistory(id) {
    const list=history().filter(x=>x.id!==id);
    list.unshift({id,at:Date.now()});
    write(KEY.history,list.slice(0,100));
  }

  function closePlayer() {
    const audio=$('#audio'); if (!audio) return;
    audio.pause(); audio.removeAttribute('src'); audio.load(); current=null;
    $('#playerTitle').textContent='Nothing playing'; $('#playerSub').textContent='Choose a chapter from the library';
    $('#playerFav').textContent='☆'; $('#playPause').textContent='▶'; $('#currentTime').textContent='00:00'; $('#duration').textContent='00:00'; $('#seekBar').value=0;
  }

  function openSidebar() { $('#sidebar')?.classList.add('open'); $('#backdrop')?.classList.add('show'); }
  function closeSidebar() { $('#sidebar')?.classList.remove('open'); $('#backdrop')?.classList.remove('show'); }
  function closeModal() { $('#modal')?.classList.add('hidden'); if ($('#modalCard')) $('#modalCard').innerHTML=''; }

  function openInfoModal() {
    $('#modalCard').innerHTML=`<div class="modal-head"><h2>Audio storage</h2><button class="icon-btn" data-close-modal>×</button></div><p class="note" style="font-size:13px;line-height:1.7"><b>Direct URL:</b> the audio is streamed from its public file URL while the player remains on this website. <b>Upload to this device:</b> the audio Blob is stored in IndexedDB and played locally. It is not uploaded to GitHub. For a large multi-device library, use a free/low-cost object-storage provider later and save only the direct audio URLs in the catalogue.</p><div class="modal-actions"><button class="btn btn-blue" data-close-modal>Done</button></div>`;
    $('#modal').classList.remove('hidden');
  }

  function exportBackup() {
    const data={format:'sayeed-academy-backup',version:'4.0.0',createdAt:new Date().toISOString(),catalog,prefs:prefs(),favorites:favorites(),history:history()};
    download('sayeed-academy-backup.json',JSON.stringify(data,null,2),'application/json'); toast('Backup downloaded');
  }

  function importBackup() {
    const input=document.createElement('input'); input.type='file'; input.accept='.json,application/json';
    input.onchange=()=>{const file=input.files?.[0]; if(!file)return; const reader=new FileReader(); reader.onload=()=>{try{const data=JSON.parse(reader.result); if(!data.catalog || !Array.isArray(data.catalog.classes)) throw new Error('invalid'); if(!confirm('Replace the current catalogue with this backup?'))return; catalog=data.catalog; saveCatalog(); write(KEY.prefs,data.prefs||prefs()); write(KEY.favorites,Array.isArray(data.favorites)?data.favorites:[]); write(KEY.history,Array.isArray(data.history)?data.history:[]); applyTheme(); toast('Backup restored'); render();}catch(_){toast('Invalid Sayeed Academy backup',true)}}; reader.readAsText(file);}; input.click();
  }

  function resetCatalog() {
    if (!confirm('Reset the starter catalogue? Your custom chapters will be removed from the catalogue.')) return;
    catalog=clone(DEFAULT_CATALOG); saveCatalog(); write(KEY.favorites,[]); write(KEY.history,[]); toast('Starter catalogue restored'); render();
  }

  function download(name,data,type) {
    const blob=new Blob([data],{type}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise=new Promise((resolve,reject)=>{
      if (!('indexedDB' in window)) return reject(new Error('IndexedDB unavailable'));
      const req=indexedDB.open(KEY.db,1);
      req.onupgradeneeded=()=>{ if(!req.result.objectStoreNames.contains('audio')) req.result.createObjectStore('audio'); };
      req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error);
    });
    return dbPromise;
  }
  async function saveAudioBlob(id,file) {
    const db=await openDB();
    return new Promise((resolve,reject)=>{const tx=db.transaction('audio','readwrite'); tx.objectStore('audio').put(file,id); tx.oncomplete=resolve; tx.onerror=()=>reject(tx.error);});
  }
  async function getAudioBlob(id) {
    const db=await openDB();
    const blob=await new Promise((resolve,reject)=>{const tx=db.transaction('audio','readonly'); const req=tx.objectStore('audio').get(id); req.onsuccess=()=>resolve(req.result||null); req.onerror=()=>reject(req.error);});
    if (!blob) return null;
    if (objectUrls.has(id)) URL.revokeObjectURL(objectUrls.get(id));
    const url=URL.createObjectURL(blob); objectUrls.set(id,url); return url;
  }
  async function deleteAudioBlob(id) {
    if (objectUrls.has(id)) { URL.revokeObjectURL(objectUrls.get(id)); objectUrls.delete(id); }
    try { const db=await openDB(); return await new Promise((resolve,reject)=>{const tx=db.transaction('audio','readwrite'); tx.objectStore('audio').delete(id); tx.oncomplete=resolve; tx.onerror=()=>reject(tx.error);}); } catch (_) { return false; }
  }

  function bindStatic() {
    document.addEventListener('click', handleClick);
    $('#openSidebar')?.addEventListener('click', openSidebar);
    $('#closeSidebar')?.addEventListener('click', closeSidebar);
    $('#backdrop')?.addEventListener('click', closeSidebar);
    $('#themeToggle')?.addEventListener('click', toggleTheme);
    $('#topTheme')?.addEventListener('click', toggleTheme);
    $('#quickManager')?.addEventListener('click', () => { view='manager'; managerTab='chapters'; render(); });
    $('#closePlayer')?.addEventListener('click', closePlayer);
    $('#playerFav')?.addEventListener('click', () => { if(current) toggleFavorite(current.id); });
    $('#playPause')?.addEventListener('click', () => { const a=$('#audio'); if(!current)return toast('Choose a chapter first',true); if(a.paused)a.play().catch(()=>{});else a.pause(); });
    $('#back15')?.addEventListener('click', () => { const a=$('#audio'); a.currentTime=Math.max(0,(a.currentTime||0)-15); });
    $('#forward15')?.addEventListener('click', () => { const a=$('#audio'); a.currentTime=Math.min(Number.isFinite(a.duration)?a.duration:(a.currentTime||0)+15,(a.currentTime||0)+15); });
    $('#seekBar')?.addEventListener('input', e => { const a=$('#audio'); a.currentTime=Number(e.target.value); });
    $('#audio')?.addEventListener('play',()=>$('#playPause').textContent='❚❚');
    $('#audio')?.addEventListener('pause',()=>$('#playPause').textContent='▶');
    $('#audio')?.addEventListener('loadedmetadata',()=>{const a=$('#audio');$('#duration').textContent=formatTime(a.duration);$('#seekBar').max=Number.isFinite(a.duration)?a.duration:100;});
    $('#audio')?.addEventListener('timeupdate',()=>{const a=$('#audio');$('#currentTime').textContent=formatTime(a.currentTime);$('#seekBar').value=a.currentTime||0;});
    $('#audio')?.addEventListener('error',()=>toast('Audio could not be played. Check the URL or upload the file again.',true));
    $('#audio')?.addEventListener('ended',()=>$('#playPause').textContent='▶');
    $('#modal')?.addEventListener('click', e => { if(e.target.matches('[data-close-modal]')) closeModal(); });
    document.addEventListener('input', e => { if(e.target.id==='librarySearch'||e.target.id==='classFilter'||e.target.id==='subjectFilter') filterLibrary(); if(e.target.id==='managerSearch'||e.target.id==='managerClass') filterManager(); });
    document.addEventListener('change', e => { if(e.target.id==='classFilter'||e.target.id==='subjectFilter') filterLibrary(); if(e.target.id==='managerClass') filterManager(); });
    document.addEventListener('keydown', e => { if(e.key==='Escape'){closeModal();closeSidebar();} });
  }

  function initCatalog() {
    const stored=read(KEY.catalog,null);
    if (stored && Array.isArray(stored.classes)) catalog=stored;
    else { catalog=clone(DEFAULT_CATALOG); saveCatalog(); }
    // Ensure Social Science exists even if an older compatible backup was imported.
    const requiredSubjects=[['Social Science','🌍'],['English','📖'],['Mathematics','∑'],['Science','⚗'],['Hindi','अ'],['Computer','💻']];
    classes().forEach(c=>{
      c.subjects=c.subjects||[];
      requiredSubjects.forEach(([name,icon])=>{if(!c.subjects.some(s=>s.name===name))c.subjects.push({id:uid('subject'),name,icon,chapters:[]});});
      c.subjects.forEach(s=>{s.chapters=s.chapters||[];});
    });
    saveCatalog();
  }

  function init() {
    try { initCatalog(); } catch (_) { catalog=clone(DEFAULT_CATALOG); saveCatalog(); }
    applyTheme(); bindStatic(); render();
  }

  window.addEventListener('beforeunload',()=>objectUrls.forEach(url=>URL.revokeObjectURL(url)));
  document.addEventListener('DOMContentLoaded',init);
  if ('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js?v=20260821-4').catch(()=>{}));
})();
