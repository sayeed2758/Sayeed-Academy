(() => {
  'use strict';

  const KEY = {
    catalog: 'sa_v4_full_catalog',
    prefs: 'sa_v4_full_prefs',
    favorites: 'sa_v4_full_favorites',
    history: 'sa_v4_full_history',
    db: 'SayeedAcademyAudioDB_v4',
    progress: 'sa_v5_full_progress'
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
  let currentPartIndex = 0;
  let modalParts = [];
  let modalPartFiles = new Map();

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
  function progress() { return read(KEY.progress, {}); }
  function saveCatalog() { write(KEY.catalog, catalog); }
  function classes() { return Array.isArray(catalog?.classes) ? catalog.classes : []; }
  function subjects() {
    return classes().flatMap(c => (c.subjects || []).map(s => ({...s, classId:c.id, className:c.name})));
  }
  function normalizeChapter(ch) {
    if (!ch || typeof ch !== 'object') return ch;
    if (!Array.isArray(ch.parts) || !ch.parts.length) {
      const legacyAudio = ch.audio || '';
      const legacySource = ch.audioSource || (String(legacyAudio).startsWith('indexeddb://') ? 'local' : 'url');
      const legacyKey = String(legacyAudio).startsWith('indexeddb://') ? String(legacyAudio).slice('indexeddb://'.length) : `${ch.id}-p1`;
      ch.parts = [{id:`${ch.id}-p1`,title:'Part 1',summary:'',audio:legacyAudio,duration:ch.duration||'--:--',audioSource:legacySource,storageKey:legacyKey}];
    } else {
      ch.parts = ch.parts.map((p,i)=>({
        id:p.id||`${ch.id}-p${i+1}`,
        title:p.title||`Part ${i+1}`,
        summary:p.summary||'',
        audio:p.audio||'',
        duration:p.duration||'--:--',
        audioSource:p.audioSource||(String(p.audio||'').startsWith('indexeddb://')?'local':'url'),
        storageKey:p.storageKey||(String(p.audio||'').startsWith('indexeddb://')?String(p.audio).slice('indexeddb://'.length):`${ch.id}-p${i+1}`)
      }));
    }
    const first=ch.parts[0];
    ch.audio=first?.audio||'';
    ch.duration=first?.duration||'--:--';
    ch.audioSource=first?.audioSource||'url';
    return ch;
  }
  function getParts(ch) { return normalizeChapter(ch)?.parts || []; }
  function chapterHasAudio(ch) { return getParts(ch).some(p=>!!p.audio); }
  function chapterPartCount(ch) { return getParts(ch).length; }
  function chapters() {
    return subjects().flatMap(s=>(s.chapters||[]).map(ch=>{
      normalizeChapter(ch);
      return {...ch,subjectId:s.id,subjectName:s.name,classId:s.classId,className:s.className};
    }));
  }
  function findChapter(id) { return chapters().find(ch=>ch.id===id)||null; }
  function getClass(id) { return classes().find(c=>c.id===id)||null; }
  function getSubject(classId,subjectId) { return getClass(classId)?.subjects?.find(s=>s.id===subjectId)||null; }

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
    const titles={home:'Dashboard',library:'Audio Library',favorites:'Favorites',history:'Listening History',manager:'Content Manager',analytics:'Analytics',backup:'Backup & Restore'};
    const pageTitle=$('#pageTitle'); if(pageTitle) pageTitle.textContent=titles[view]||'Dashboard';
    $$('.nav-item').forEach(btn=>btn.classList.toggle('active',btn.dataset.view===view));
    const content=$('#appContent'); if(!content) return;
    if(view==='home') content.innerHTML=homeView();
    else if(view==='library') content.innerHTML=libraryView(false);
    else if(view==='favorites') content.innerHTML=libraryView(true);
    else if(view==='history') content.innerHTML=historyView();
    else if(view==='manager') content.innerHTML=managerView();
    else if(view==='analytics') content.innerHTML=analyticsView();
    else content.innerHTML=backupView();
    closeSidebar();
  }

  function stat(icon, title, number, sub) {
    return `<div class="stat"><div class="stat-top"><small>${esc(title)}</small><div class="stat-icon">${icon}</div></div><strong>${number}</strong><small>${esc(sub)}</small></div>`;
  }

  function homeView() {
    const recent=history().slice(0,5).map(x=>findChapter(x.id)).filter(Boolean);
    const all=chapters(), audioCount=all.filter(chapterHasAudio).length, partTotal=all.reduce((n,c)=>n+chapterPartCount(c),0);
    const resume=Object.entries(progress()).map(([id,v])=>({chapter:findChapter(v.chapterId||id),v})).filter(x=>x.chapter&&x.v.seconds>5&&!x.v.completed).sort((a,b)=>(b.v.updatedAt||0)-(a.v.updatedAt||0))[0];
    return `<div class="content">
      <section class="hero"><div class="eyebrow">SAYEED ACADEMY • AUDIO LEARNING PRO V5</div><h1>Learn chapter by chapter. Listen anywhere.</h1><p>A premium, mobile-first audio learning library for Classes 6–10 with multi-part chapter summaries.</p>
      <div class="hero-actions"><button class="btn btn-primary" data-action="goto-library">Explore Audio Library</button><button class="btn btn-ghost" data-action="goto-manager">Manage Content</button><button class="btn btn-ghost" data-action="goto-analytics">View Analytics</button></div></section>
      <section class="stats">${stat('◉','Classes',classes().length,'Classes 6–10')}${stat('▦','Subjects',subjects().length,'Across all classes')}${stat('▶','Chapters',all.length,`${audioCount} with audio • ${partTotal} parts`)}${stat('★','Favorites',favorites().length,'Saved chapters')}</section>
      ${resume?`<section class="resume-card"><div><span class="eyebrow blue-text">CONTINUE LEARNING</span><h2>${esc(resume.chapter.title)}</h2><p>${esc(resume.chapter.className)} • ${esc(resume.chapter.subjectName)} • ${formatTime(resume.v.seconds)} listened</p></div><button class="btn btn-blue" data-play="${esc(resume.chapter.id)}" data-part="${Number(resume.v.partIndex||0)}">▶ Resume</button></section>`:''}
      <div class="section-head"><div><h2>Choose your class</h2><p>Open a class to see subject-wise chapters.</p></div></div>
      <div class="class-grid">${classes().map(c=>`<button class="class-card" data-class="${esc(c.id)}"><div class="class-number">${esc(c.short)}</div><strong>${esc(c.name)}</strong><span>${(c.subjects||[]).length} subjects • ${(c.subjects||[]).reduce((n,s)=>n+(s.chapters||[]).length,0)} chapters</span><div class="gold-line"></div></button>`).join('')}</div>
      <div class="section-head"><div><h2>Recently listened</h2><p>Your latest audio chapters on this device.</p></div>${recent.length?'<button class="link-btn" data-view-link="history">View all</button>':''}</div>
      ${recent.length?`<div class="recent-list">${recent.map(c=>`<div class="recent"><div class="recent-icon">▶</div><div class="grow"><strong>${esc(c.title)}</strong><small>${esc(c.className)} • ${esc(c.subjectName)} • ${chapterPartCount(c)} part${chapterPartCount(c)!==1?'s':''}</small></div><button class="round-btn primary" data-play="${esc(c.id)}">▶</button></div>`).join('')}</div>`:'<div class="empty"><strong>No listening history yet</strong>Play any chapter and it will appear here.</div>'}
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
    if(!list.length) return `<div class="empty" style="grid-column:1/-1"><strong>No chapters found</strong><span>Try another filter or create a chapter from Content Manager.</span></div>`;
    return list.map(c=>{const parts=getParts(c),ready=parts.filter(p=>p.audio).length;return `<article class="chapter-card"><div class="chapter-top"><span class="badge">${esc(c.className)} • ${esc(c.subjectName)}</span><button class="round-btn" data-fav="${esc(c.id)}">${favorites().includes(c.id)?'★':'☆'}</button></div><h3>${esc(c.title)}</h3><p>${esc(c.summary||'No summary added yet.')}</p><div class="part-strip">${parts.map((p,i)=>`<button class="part-chip ${p.audio?'ready':''}" data-play="${esc(c.id)}" data-part="${i}" ${p.audio?'':'disabled'}>P${i+1}</button>`).join('')}</div><div class="chapter-meta"><span class="note">${ready?`${ready}/${parts.length} audio part${parts.length!==1?'s':''}`:'Audio not added'}</span><button class="round-btn ${ready?'primary':''}" data-play="${esc(c.id)}" data-part="0" ${ready?'':'disabled'}>▶</button></div></article>`;}).join('');
  }

  function historyView() {
    const rows=history().map(h=>({...h,chapter:findChapter(h.id)})).filter(x=>x.chapter);
    const p=progress();
    return `<div class="content"><div class="section-head"><div><h2>Listening History</h2><p>Recent chapters played on this device.</p></div>${rows.length?'<button class="btn btn-danger" data-action="clear-history">Clear history</button>':''}</div>
    ${rows.length?`<div class="recent-list">${rows.map(x=>{const pr=p[x.chapter.id]||{};return `<div class="recent"><div class="recent-icon">◷</div><div class="grow"><strong>${esc(x.chapter.title)}</strong><small>${esc(x.chapter.className)} • ${esc(x.chapter.subjectName)} • ${chapterPartCount(x.chapter)} parts • ${new Date(x.at).toLocaleString()}${pr.seconds?` • ${formatTime(pr.seconds)}`:''}</small></div><button class="round-btn primary" data-play="${esc(x.chapter.id)}" data-part="${Number(pr.partIndex||x.partIndex||0)}" ${chapterHasAudio(x.chapter)?'':'disabled'}>▶</button></div>`}).join('')}</div>`:'<div class="empty"><strong>Nothing played yet</strong><span>Your listening activity will be saved here.</span></div>'}</div>`;
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
    if(!list.length) return '<div class="empty"><strong>No chapters found</strong><span>Create your first chapter.</span></div>';
    return list.map(ch=>`<div class="manager-row"><div class="recent-icon">${chapterHasAudio(ch)?'▶':'○'}</div><div class="grow"><strong>${esc(ch.title)}</strong><small>${esc(ch.className)} • ${esc(ch.subjectName)} • ${chapterPartCount(ch)} part${chapterPartCount(ch)!==1?'s':''} • ${chapterHasAudio(ch)?'Audio ready':'No audio'}</small></div><div class="row-actions"><button class="round-btn" data-play="${esc(ch.id)}" ${chapterHasAudio(ch)?'':'disabled'}>▶</button><button class="round-btn" data-edit="${esc(ch.id)}">✎</button><button class="round-btn danger" data-delete="${esc(ch.id)}">⌫</button></div></div>`).join('');
  }

  function analyticsView() {
    const all=chapters(), hist=history(), fav=favorites(), prog=progress(), times=Object.values(prog);
    const seconds=times.reduce((n,x)=>n+(Number(x.seconds)||0),0), completed=times.filter(x=>x.completed).length;
    const subjectMap={}, classMap={};
    all.forEach(c=>{if(chapterHasAudio(c)){subjectMap[c.subjectName]=(subjectMap[c.subjectName]||0)+1;classMap[c.className]=(classMap[c.className]||0)+1;}});
    const top=Object.entries(subjectMap).sort((a,b)=>b[1]-a[1]), maxS=Math.max(1,...Object.values(subjectMap)), maxC=Math.max(1,...Object.values(classMap));
    return `<div class="content"><div class="section-head"><div><h2>Analytics</h2><p>Local learning activity and content health.</p></div></div>
    <section class="stats">${stat('▶','Audio chapters',all.filter(chapterHasAudio).length,`${all.filter(c=>!chapterHasAudio(c)).length} without audio`)}${stat('◷','Played',hist.length,'History entries')}${stat('✓','Completed',completed,'Tracked sessions')}${stat('⏱','Listening time',formatTime(seconds),`${fav.length} favorites`)}</section>
    <div class="analytics-grid"><div class="analytics-card"><h3>Audio by subject</h3>${top.length?top.map(([n,v])=>`<div class="bar-row"><span>${esc(n)}</span><div class="bar"><i style="width:${Math.round(v/maxS*100)}%"></i></div><b>${v}</b></div>`).join(''):'<div class="empty">No audio content yet.</div>'}</div>
    <div class="analytics-card"><h3>Audio by class</h3>${Object.entries(classMap).map(([n,v])=>`<div class="bar-row"><span>${esc(n)}</span><div class="bar"><i style="width:${Math.round(v/maxC*100)}%"></i></div><b>${v}</b></div>`).join('')}</div></div></div>`;
  }

  function backupView() {
    return `<div class="content"><div class="section-head"><div><h2>Backup & Restore</h2><p>Protect catalogue, favorites, history and V5 learning progress.</p></div></div><div class="backup-grid">
    <div class="backup-card"><h3>Export JSON</h3><p>Save the complete editable catalogue and learning data.</p><button class="btn btn-blue" data-action="export-backup">Download Backup</button></div>
    <div class="backup-card"><h3>Import JSON</h3><p>Restore a V4 or V5 compatible backup.</p><button class="btn btn-ghost" data-action="import-backup">Choose Backup</button></div>
    <div class="backup-card"><h3>CSV export</h3><p>Export class, subject, chapter, part and audio status.</p><button class="btn btn-ghost" data-action="export-csv">Download CSV</button></div>
    <div class="backup-card"><h3>Print report</h3><p>Generate a clean printable catalogue report.</p><button class="btn btn-ghost" data-action="print-report">Print Report</button></div>
    <div class="backup-card"><h3>Reset starter data</h3><p>Restore the original Class 6–10 catalogue without deleting IndexedDB audio.</p><button class="btn btn-danger" data-action="reset-catalog">Reset Catalogue</button></div>
    <div class="backup-card"><h3>Audio storage</h3><p>Direct URLs and device uploads play inside the Sayeed Academy player.</p><button class="btn btn-ghost" data-action="storage-info">Learn More</button></div>
    </div></div>`;
  }

  function filterLibrary() {
    const q = ($('#librarySearch')?.value || '').trim().toLowerCase();
    const cf = $('#classFilter')?.value || '';
    const sf = $('#subjectFilter')?.value || '';
    let list = view === 'favorites' ? chapters().filter(c=>favorites().includes(c.id)) : chapters();
    if (q) list = list.filter(c => `${c.title} ${c.summary} ${c.className} ${c.subjectName} ${getParts(c).map(p=>p.title).join(' ')}`.toLowerCase().includes(q));
    if (cf) list = list.filter(c=>c.classId===cf);
    if (sf) list = list.filter(c=>c.subjectName===sf);
    const target = $('#chapterResults'); if (target) target.innerHTML = chapterCards(list);
  }

  function filterManager() {
    const q = ($('#managerSearch')?.value || '').trim().toLowerCase();
    const cf = $('#managerClass')?.value || '';
    let list = chapters();
    if (q) list = list.filter(c => `${c.title} ${c.summary} ${c.className} ${c.subjectName} ${getParts(c).map(p=>p.title).join(' ')}`.toLowerCase().includes(q));
    if (cf) list = list.filter(c=>c.classId===cf);
    const target = $('#managerList'); if (target) target.innerHTML = managerRows(list);
  }

  function navigate(nextView) {
    if(!['home','library','favorites','history','manager','analytics','backup'].includes(nextView)) return;
    view=nextView; render();
  }

  function handleAction(action) {
    if(action==='goto-library') return navigate('library');
    if(action==='goto-manager'){view='manager';managerTab='chapters';return render();}
    if(action==='goto-analytics') return navigate('analytics');
    if(action==='add-chapter') return openChapterModal();
    if(action==='clear-history') return clearHistory();
    if(action==='export-backup') return exportBackup();
    if(action==='export-csv') return exportCSV();
    if(action==='print-report') return printReport();
    if(action==='import-backup') return importBackup();
    if(action==='reset-catalog') return resetCatalog();
    if(action==='storage-info') return openInfoModal();
  }

  function handleClick(event) {
    const nav=event.target.closest('[data-view]'); if(nav) return navigate(nav.dataset.view);
    const action=event.target.closest('[data-action]'); if(action) return handleAction(action.dataset.action);
    const cls=event.target.closest('[data-class]'); if(cls){currentClass=cls.dataset.class;currentSubject='';view='library';render();const f=$('#classFilter');if(f)f.value=currentClass;filterLibrary();return;}
    const play=event.target.closest('[data-play]'); if(play) return playChapter(play.dataset.play,Number(play.dataset.part||0));
    const fav=event.target.closest('[data-fav]'); if(fav) return toggleFavorite(fav.dataset.fav);
    const edit=event.target.closest('[data-edit]'); if(edit) return openChapterModal(edit.dataset.edit);
    const del=event.target.closest('[data-delete]'); if(del) return deleteChapter(del.dataset.delete);
    const tab=event.target.closest('[data-manager-tab]'); if(tab){managerTab=tab.dataset.managerTab;render();return;}
    const link=event.target.closest('[data-view-link]'); if(link) return navigate(link.dataset.viewLink);
    const add=event.target.closest('[data-add-part]'); if(add){collectModalPartDrafts();modalParts.push({id:uid('part'),title:`Part ${modalParts.length+1}`,summary:'',audio:'',duration:'--:--',audioSource:'url',storageKey:uid('audio')});renderModalParts();return;}
    const rem=event.target.closest('[data-remove-part]'); if(rem){collectModalPartDrafts();if(modalParts.length<=1)return toast('A chapter must have at least one part',true);const id=rem.dataset.removePart;modalParts=modalParts.filter(p=>p.id!==id);renderModalParts();return;}
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
    const ch=findChapter(id); if(!ch) return toast('Chapter not found',true);
    if(!confirm(`Delete “${ch.title}” permanently?`)) return;
    const subject=getSubject(ch.classId,ch.subjectId); if(!subject)return toast('Chapter parent not found',true);
    subject.chapters=(subject.chapters||[]).filter(x=>x.id!==id); saveCatalog();
    write(KEY.favorites,favorites().filter(x=>x!==id)); write(KEY.history,history().filter(x=>x.id!==id));
    const keys=getParts(ch).map(p=>p.storageKey).filter(Boolean);
    for(const key of keys) await deleteAudioBlob(key).catch(()=>{});
    await deleteAudioBlob(id).catch(()=>{});
    if(current?.id===id)closePlayer();
    toast('Chapter deleted');render();
  }

  function openChapterModal(id='') {
    if(!classes().length)return toast('No classes available',true);
    const ch=id?findChapter(id):null, firstClass=getClass(currentClass)||classes()[0];
    const form=ch?normalizeChapter({...ch}):{classId:firstClass.id,subjectId:firstClass.subjects[0]?.id||'',title:'',summary:'',parts:[{id:uid('part'),title:'Part 1',summary:'',audio:'',duration:'--:--',audioSource:'url',storageKey:uid('audio')}]};
    modalParts=clone(form.parts||[]); modalPartFiles=new Map();
    const classOptions=classes().map(c=>`<option value="${esc(c.id)}" ${form.classId===c.id?'selected':''}>${esc(c.name)}</option>`).join('');
    const subjectOptions=(getClass(form.classId)?.subjects||[]).map(s=>`<option value="${esc(s.id)}" ${form.subjectId===s.id?'selected':''}>${esc(s.name)}</option>`).join('');
    $('#modalCard').innerHTML=`<div class="modal-head"><div><h2>${ch?'Edit chapter':'Add new chapter'}</h2><span class="modal-kicker">V5 • Multi-part audio</span></div><button class="icon-btn" data-close-modal>×</button></div>
    <form id="chapterForm"><div class="form-grid"><div class="field"><label>Class</label><select id="fClass">${classOptions}</select></div><div class="field"><label>Subject</label><select id="fSubject">${subjectOptions}</select></div>
    <div class="field full"><label>Chapter title</label><input id="fTitle" maxlength="120" required value="${esc(form.title)}" placeholder="Chapter title"></div>
    <div class="field full"><label>Summary</label><textarea id="fSummary" maxlength="1500" placeholder="Short chapter summary">${esc(form.summary)}</textarea></div>
    <div class="field full"><div class="parts-head"><div><strong>Audio Parts</strong><span>Add Part 2, Part 3, etc. for longer chapters.</span></div><button type="button" class="btn btn-ghost" data-add-part>＋ Add Part</button></div><div id="modalParts"></div></div></div>
    <div class="modal-actions"><button type="button" class="btn btn-ghost" data-close-modal>Cancel</button><button class="btn btn-blue" type="submit">${ch?'Save Changes':'Create Chapter'}</button></div></form>`;
    renderModalParts(); $('#modal').classList.remove('hidden');
    $('#fClass').addEventListener('change',()=>{const subs=getClass($('#fClass').value)?.subjects||[];$('#fSubject').innerHTML=subs.map(s=>`<option value="${esc(s.id)}">${esc(s.name)}</option>`).join('');});
    $('#chapterForm').addEventListener('submit',async e=>{e.preventDefault();await saveChapter(id||null);});
  }

  function collectModalPartDrafts(){
    const rows=$$('.part-row'); if(!rows.length)return modalParts;
    const map=new Map(modalParts.map(p=>[p.id,p]));
    rows.forEach((row,i)=>{
      const id=row.dataset.partId,p=map.get(id);if(!p)return;
      const q=s=>row.querySelector(s);
      p.title=q('[data-part-title]')?.value.trim()||`Part ${i+1}`;
      p.summary=q('[data-part-summary]')?.value.trim()||'';
      p.duration=q('[data-part-duration]')?.value.trim()||'--:--';
      p.audioSource=q('[data-part-source]')?.value||p.audioSource||'url';
      if(p.audioSource==='url')p.audio=q('[data-part-url]')?.value.trim()||'';
      const file=q('[data-part-file]')?.files?.[0];if(file)modalPartFiles.set(id,file);
    });
    return modalParts;
  }

  function renderModalParts(){
    const target=$('#modalParts');if(!target)return;
    target.innerHTML=modalParts.map((p,i)=>{const local=p.audioSource==='local';return `<div class="part-row" data-part-id="${esc(p.id)}"><div class="part-row-head"><div><span class="part-number">PART ${i+1}</span><strong>${esc(p.title||`Part ${i+1}`)}</strong></div>${modalParts.length>1?`<button type="button" class="icon-btn danger" data-remove-part="${esc(p.id)}">×</button>`:''}</div>
    <div class="part-fields"><input data-part-title value="${esc(p.title||`Part ${i+1}`)}" maxlength="80" placeholder="Part title"><input data-part-duration value="${esc(p.duration||'--:--')}" placeholder="Duration e.g. 08:42">
    <select data-part-source><option value="url" ${!local?'selected':''}>Direct audio URL</option><option value="local" ${local?'selected':''}>Upload to this device</option></select>
    <input data-part-url class="${local?'hidden':''}" value="${esc(local?'':p.audio||'')}" placeholder="https://example.com/part.mp3">
    <input data-part-file type="file" accept="audio/*" class="${local?'':'hidden'}"><textarea data-part-summary placeholder="Optional part notes">${esc(p.summary||'')}</textarea></div>
    <small class="note">${local&&p.audio?'Local audio saved on this device. Choose a new file to replace it.':'Each part can have its own audio source.'}</small></div>`;}).join('');
    $$('#modalParts [data-part-source]').forEach(sel=>sel.addEventListener('change',()=>togglePartSource(sel.closest('.part-row'))));
  }

  function togglePartSource(row){
    if(!row)return;const source=row.querySelector('[data-part-source]')?.value;
    row.querySelector('[data-part-url]')?.classList.toggle('hidden',source!=='url');
    row.querySelector('[data-part-file]')?.classList.toggle('hidden',source!=='local');
  }

  async function saveChapter(existingId){
    collectModalPartDrafts();const title=$('#fTitle')?.value.trim();if(!title)return toast('Chapter title is required',true);
    const classId=$('#fClass')?.value,subjectId=$('#fSubject')?.value,summary=$('#fSummary')?.value.trim()||'',subject=getSubject(classId,subjectId);
    if(!subject)return toast('Please select a valid class and subject',true);if(!modalParts.length)return toast('Add at least one audio part',true);
    const old=existingId?findChapter(existingId):null;let target=old;
    if(target&&(target.classId!==classId||target.subjectId!==subjectId)){const os=getSubject(target.classId,target.subjectId);if(os)os.chapters=os.chapters.filter(x=>x.id!==existingId);target=null;}
    if(!target){target={id:existingId||uid('chapter'),title:'',summary:'',audio:'',duration:'--:--',audioSource:'url',parts:[]};subject.chapters.push(target);}
    const oldParts=getParts(target),oldKeys=new Set(oldParts.map(p=>p.storageKey).filter(Boolean)),next=[];
    for(let i=0;i<modalParts.length;i++){
      const d=modalParts[i],part={...d,id:d.id||uid('part'),title:(d.title||`Part ${i+1}`).trim(),summary:(d.summary||'').trim(),duration:(d.duration||'--:--').trim(),audioSource:d.audioSource==='local'?'local':'url',storageKey:d.storageKey||uid('audio')};
      const file=modalPartFiles.get(d.id);
      if(part.audioSource==='url'){
        const url=$$('.part-row').find(r=>r.dataset.partId===d.id)?.querySelector('[data-part-url]')?.value.trim()||'';
        if(url&&!/^https?:\/\//i.test(url))return toast(`Part ${i+1}: audio URL must start with http:// or https://`,true);
        part.audio=url;if(part.storageKey)await deleteAudioBlob(part.storageKey).catch(()=>{});
      }else{
        if(file){await saveAudioBlob(part.storageKey,file);part.audio=`indexeddb://${part.storageKey}`;}
        else if(String(d.audio||'').startsWith('indexeddb://'))part.audio=d.audio;
        else return toast(`Choose an audio file for Part ${i+1}`,true);
      }
      next.push(part);
    }
    const newKeys=new Set(next.map(p=>p.storageKey).filter(Boolean));for(const key of oldKeys)if(!newKeys.has(key))await deleteAudioBlob(key).catch(()=>{});
    target.title=title;target.summary=summary;target.parts=next;normalizeChapter(target);saveCatalog();closeModal();toast(existingId?'Chapter updated':'Chapter created');render();
  }

  async function playChapter(id,partIndex=0){
    const ch=findChapter(id);if(!ch)return toast('Chapter not found',true);const parts=getParts(ch);
    let i=Math.max(0,Math.min(Number(partIndex)||0,parts.length-1));while(i<parts.length&&!parts[i].audio)i++;
    if(i>=parts.length)return toast('No audio has been added to this chapter',true);
    current=ch;currentPartIndex=i;const part=parts[i];
    $('#playerTitle').textContent=ch.title;$('#playerSub').textContent=`${ch.className} • ${ch.subjectName} • ${part.title}`;$('#playerFav').textContent=favorites().includes(id)?'★':'☆';$('#playerArt').textContent=`${i+1}/${parts.length}`;
    $('#prevPart')?.toggleAttribute('disabled',i<=0);$('#nextPart')?.toggleAttribute('disabled',i>=parts.length-1);
    let src=part.audio;if(src.startsWith('indexeddb://')){src=await getAudioBlob(src.slice('indexeddb://'.length)||part.storageKey||part.id);if(!src)return toast('Local audio file is missing. Edit the chapter and upload that part again.',true);}
    const audio=$('#audio');audio.src=src;audio.load();
    const saved=progress(),sp=saved[id];if(sp&&Number(sp.partIndex)===i&&Number(sp.seconds)>5){const resume=()=>{audio.removeEventListener('loadedmetadata',resume);try{audio.currentTime=Math.min(Number(sp.seconds),Math.max(0,audio.duration-1));}catch(_){}};audio.addEventListener('loadedmetadata',resume);}
    try{await audio.play();}catch(_){toast('Tap play to start audio');}recordHistory(id);
  }

  function playAdjacentPart(direction){
    if(!current)return;const parts=getParts(current);let i=currentPartIndex+direction;while(i>=0&&i<parts.length&&!parts[i].audio)i+=direction;
    if(i<0||i>=parts.length)return toast(direction>0?'This is the last part':'This is the first part');playChapter(current.id,i);
  }

  function recordHistory(id){
    const list=history().filter(x=>x.id!==id);list.unshift({id,at:Date.now(),partIndex:currentPartIndex});write(KEY.history,list.slice(0,100));
  }
  function saveProgress(){
    if(!current||!$('#audio'))return;const a=$('#audio'),p=progress();p[current.id]={chapterId:current.id,partIndex:currentPartIndex,seconds:Number(a.currentTime||0),duration:Number.isFinite(a.duration)?a.duration:0,completed:Number.isFinite(a.duration)&&a.duration>0&&a.currentTime>=a.duration-2,updatedAt:Date.now()};write(KEY.progress,p);
  }

  function closePlayer(){
    const audio=$('#audio');if(!audio)return;saveProgress();audio.pause();audio.removeAttribute('src');audio.load();current=null;currentPartIndex=0;
    $('#playerTitle').textContent='Nothing playing';$('#playerSub').textContent='Choose a chapter from the library';$('#playerFav').textContent='☆';$('#playerArt').textContent='▶';$('#playPause').textContent='▶';$('#currentTime').textContent='00:00';$('#duration').textContent='00:00';$('#seekBar').value=0;
  }

  function openSidebar() { $('#sidebar')?.classList.add('open'); $('#backdrop')?.classList.add('show'); }
  function closeSidebar() { $('#sidebar')?.classList.remove('open'); $('#backdrop')?.classList.remove('show'); }
  function closeModal() { $('#modal')?.classList.add('hidden'); if ($('#modalCard')) $('#modalCard').innerHTML=''; }

  function openInfoModal() {
    $('#modalCard').innerHTML=`<div class="modal-head"><h2>Audio storage</h2><button class="icon-btn" data-close-modal>×</button></div><p class="note" style="font-size:13px;line-height:1.7"><b>Direct URL:</b> the audio is streamed from its public file URL while the player remains on this website. <b>Upload to this device:</b> the audio Blob is stored in IndexedDB and played locally. It is not uploaded to GitHub. For a large multi-device library, use a free/low-cost object-storage provider later and save only the direct audio URLs in the catalogue.</p><div class="modal-actions"><button class="btn btn-blue" data-close-modal>Done</button></div>`;
    $('#modal').classList.remove('hidden');
  }

  function exportBackup(){
    const data={format:'sayeed-academy-backup',version:'5.0.0',createdAt:new Date().toISOString(),catalog,prefs:prefs(),favorites:favorites(),history:history(),progress:progress()};
    download('sayeed-academy-v5-backup.json',JSON.stringify(data,null,2),'application/json');toast('V5 backup downloaded');
  }
  function exportCSV(){
    const rows=[['Class','Subject','Chapter','Part','Summary','Audio Source','Audio Ready','Duration']];
    chapters().forEach(c=>getParts(c).forEach(p=>rows.push([c.className,c.subjectName,c.title,p.title,p.summary,p.audioSource,p.audio?'Yes':'No',p.duration||'--:--'])));
    const csv=rows.map(r=>r.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\n');
    download('sayeed-academy-v5-library.csv','\uFEFF'+csv,'text/csv;charset=utf-8');toast('CSV exported');
  }
  function printReport(){
    const rows=chapters().map(c=>`<tr><td>${esc(c.className)}</td><td>${esc(c.subjectName)}</td><td>${esc(c.title)}</td><td>${getParts(c).length}</td><td>${getParts(c).filter(p=>p.audio).length}</td></tr>`).join('');
    const w=window.open('','_blank','width=900,height=700');if(!w)return toast('Allow pop-ups to print the report',true);
    w.document.write(`<!doctype html><html><head><title>Sayeed Academy V5 Report</title><style>body{font-family:Arial;padding:30px;color:#10213d}table{width:100%;border-collapse:collapse;margin-top:20px}th,td{border:1px solid #d8e0ec;padding:8px;text-align:left;font-size:12px}th{background:#edf4ff}@media print{body{padding:10mm}}</style></head><body><h1>Sayeed Academy — Audio Learning Pro V5</h1><p>Generated ${new Date().toLocaleString()}</p><table><thead><tr><th>Class</th><th>Subject</th><th>Chapter</th><th>Parts</th><th>Audio Ready</th></tr></thead><tbody>${rows}</tbody></table><script>window.onload=()=>setTimeout(()=>window.print(),150)</script></body></html>`);w.document.close();
  }
  function importBackup(){
    const input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.onchange=()=>{const file=input.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{
      const data=JSON.parse(reader.result);if(!data.catalog||!Array.isArray(data.catalog.classes))throw new Error('invalid');
      if(!confirm('Restore this Sayeed Academy backup? Current catalogue data will be replaced.'))return;
      catalog=data.catalog;write(KEY.prefs,data.prefs||prefs());write(KEY.favorites,Array.isArray(data.favorites)?data.favorites:[]);write(KEY.history,Array.isArray(data.history)?data.history:[]);write(KEY.progress,data.progress&&typeof data.progress==='object'?data.progress:{});
      classes().forEach(c=>(c.subjects||[]).forEach(s=>(s.chapters||[]).forEach(normalizeChapter)));saveCatalog();applyTheme();toast('Backup restored');render();
    }catch(_){toast('Invalid Sayeed Academy backup',true)}};reader.readAsText(file);};input.click();
  }

  function importBackup() {
    const input=document.createElement('input'); input.type='file'; input.accept='.json,application/json';
    input.onchange=()=>{const file=input.files?.[0]; if(!file)return; const reader=new FileReader(); reader.onload=()=>{try{const data=JSON.parse(reader.result); if(!data.catalog || !Array.isArray(data.catalog.classes)) throw new Error('invalid'); if(!confirm('Replace the current catalogue with this backup?'))return; catalog=data.catalog; saveCatalog(); write(KEY.prefs,data.prefs||prefs()); write(KEY.favorites,Array.isArray(data.favorites)?data.favorites:[]); write(KEY.history,Array.isArray(data.history)?data.history:[]); applyTheme(); toast('Backup restored'); render();}catch(_){toast('Invalid Sayeed Academy backup',true)}}; reader.readAsText(file);}; input.click();
  }

  function resetCatalog(){
    if(!confirm('Reset the starter catalogue? Custom catalogue entries will be removed. IndexedDB audio is not deleted automatically.'))return;
    catalog=clone(DEFAULT_CATALOG);classes().forEach(c=>(c.subjects||[]).forEach(s=>(s.chapters||[]).forEach(normalizeChapter)));saveCatalog();write(KEY.favorites,[]);write(KEY.history,[]);write(KEY.progress,{});toast('Starter catalogue restored');render();
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
    $('#audio')?.addEventListener('timeupdate',()=>{const a=$('#audio');$('#currentTime').textContent=formatTime(a.currentTime);$('#seekBar').value=a.currentTime||0;if(Math.floor(a.currentTime)%5===0)saveProgress();});
    $('#audio')?.addEventListener('error',()=>toast('Audio could not be played. Check the URL or upload the file again.',true));
    $('#audio')?.addEventListener('ended',()=>{saveProgress();if(current&&currentPartIndex<getParts(current).length-1)playAdjacentPart(1);else $('#playPause').textContent='▶';});
    $('#prevPart')?.addEventListener('click',()=>playAdjacentPart(-1));
    $('#nextPart')?.addEventListener('click',()=>playAdjacentPart(1));
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
      c.subjects.forEach(s=>{s.chapters=s.chapters||[];s.chapters.forEach(normalizeChapter);});
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
