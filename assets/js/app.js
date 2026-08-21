(() => {
"use strict";
const KEY={catalog:"sa_v3_catalog",prefs:"sa_v3_prefs",favorites:"sa_v3_favorites",history:"sa_v3_history",blobs:"sa_v3_audio_blobs"};
const DEFAULT_CATALOG={"version":"3.0.0","academy":"Sayeed Academy","classes":[{"id":"class-6","name":"Class 6","short":"06","subjects":[{"id":"c6-s1","name":"English","icon":"📖","chapters":[{"id":"c6-1-01","title":"English Chapter 1","summary":"Add the audio summary and key points for Class 6 English Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c6-1-02","title":"English Chapter 2","summary":"Add the audio summary and key points for Class 6 English Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c6-s2","name":"Mathematics","icon":"∑","chapters":[{"id":"c6-2-01","title":"Mathematics Chapter 1","summary":"Add the audio summary and key points for Class 6 Mathematics Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c6-2-02","title":"Mathematics Chapter 2","summary":"Add the audio summary and key points for Class 6 Mathematics Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c6-s3","name":"Science","icon":"⚗","chapters":[{"id":"c6-3-01","title":"Science Chapter 1","summary":"Add the audio summary and key points for Class 6 Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c6-3-02","title":"Science Chapter 2","summary":"Add the audio summary and key points for Class 6 Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c6-s4","name":"Social Science","icon":"🌍","chapters":[{"id":"c6-4-01","title":"Social Science Chapter 1","summary":"Add the audio summary and key points for Class 6 Social Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c6-4-02","title":"Social Science Chapter 2","summary":"Add the audio summary and key points for Class 6 Social Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c6-s5","name":"Hindi","icon":"अ","chapters":[{"id":"c6-5-01","title":"Hindi Chapter 1","summary":"Add the audio summary and key points for Class 6 Hindi Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c6-5-02","title":"Hindi Chapter 2","summary":"Add the audio summary and key points for Class 6 Hindi Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c6-s6","name":"Computer","icon":"💻","chapters":[{"id":"c6-6-01","title":"Computer Chapter 1","summary":"Add the audio summary and key points for Class 6 Computer Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c6-6-02","title":"Computer Chapter 2","summary":"Add the audio summary and key points for Class 6 Computer Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]}]},{"id":"class-7","name":"Class 7","short":"07","subjects":[{"id":"c7-s1","name":"English","icon":"📖","chapters":[{"id":"c7-1-01","title":"English Chapter 1","summary":"Add the audio summary and key points for Class 7 English Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c7-1-02","title":"English Chapter 2","summary":"Add the audio summary and key points for Class 7 English Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c7-s2","name":"Mathematics","icon":"∑","chapters":[{"id":"c7-2-01","title":"Mathematics Chapter 1","summary":"Add the audio summary and key points for Class 7 Mathematics Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c7-2-02","title":"Mathematics Chapter 2","summary":"Add the audio summary and key points for Class 7 Mathematics Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c7-s3","name":"Science","icon":"⚗","chapters":[{"id":"c7-3-01","title":"Science Chapter 1","summary":"Add the audio summary and key points for Class 7 Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c7-3-02","title":"Science Chapter 2","summary":"Add the audio summary and key points for Class 7 Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c7-s4","name":"Social Science","icon":"🌍","chapters":[{"id":"c7-4-01","title":"Social Science Chapter 1","summary":"Add the audio summary and key points for Class 7 Social Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c7-4-02","title":"Social Science Chapter 2","summary":"Add the audio summary and key points for Class 7 Social Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c7-s5","name":"Hindi","icon":"अ","chapters":[{"id":"c7-5-01","title":"Hindi Chapter 1","summary":"Add the audio summary and key points for Class 7 Hindi Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c7-5-02","title":"Hindi Chapter 2","summary":"Add the audio summary and key points for Class 7 Hindi Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c7-s6","name":"Computer","icon":"💻","chapters":[{"id":"c7-6-01","title":"Computer Chapter 1","summary":"Add the audio summary and key points for Class 7 Computer Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c7-6-02","title":"Computer Chapter 2","summary":"Add the audio summary and key points for Class 7 Computer Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]}]},{"id":"class-8","name":"Class 8","short":"08","subjects":[{"id":"c8-s1","name":"English","icon":"📖","chapters":[{"id":"c8-1-01","title":"English Chapter 1","summary":"Add the audio summary and key points for Class 8 English Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c8-1-02","title":"English Chapter 2","summary":"Add the audio summary and key points for Class 8 English Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c8-s2","name":"Mathematics","icon":"∑","chapters":[{"id":"c8-2-01","title":"Mathematics Chapter 1","summary":"Add the audio summary and key points for Class 8 Mathematics Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c8-2-02","title":"Mathematics Chapter 2","summary":"Add the audio summary and key points for Class 8 Mathematics Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c8-s3","name":"Science","icon":"⚗","chapters":[{"id":"c8-3-01","title":"Science Chapter 1","summary":"Add the audio summary and key points for Class 8 Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c8-3-02","title":"Science Chapter 2","summary":"Add the audio summary and key points for Class 8 Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c8-s4","name":"Social Science","icon":"🌍","chapters":[{"id":"c8-4-01","title":"Social Science Chapter 1","summary":"Add the audio summary and key points for Class 8 Social Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c8-4-02","title":"Social Science Chapter 2","summary":"Add the audio summary and key points for Class 8 Social Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c8-s5","name":"Hindi","icon":"अ","chapters":[{"id":"c8-5-01","title":"Hindi Chapter 1","summary":"Add the audio summary and key points for Class 8 Hindi Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c8-5-02","title":"Hindi Chapter 2","summary":"Add the audio summary and key points for Class 8 Hindi Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c8-s6","name":"Computer","icon":"💻","chapters":[{"id":"c8-6-01","title":"Computer Chapter 1","summary":"Add the audio summary and key points for Class 8 Computer Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c8-6-02","title":"Computer Chapter 2","summary":"Add the audio summary and key points for Class 8 Computer Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]}]},{"id":"class-9","name":"Class 9","short":"09","subjects":[{"id":"c9-s1","name":"English","icon":"📖","chapters":[{"id":"c9-1-01","title":"English Chapter 1","summary":"Add the audio summary and key points for Class 9 English Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c9-1-02","title":"English Chapter 2","summary":"Add the audio summary and key points for Class 9 English Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c9-s2","name":"Mathematics","icon":"∑","chapters":[{"id":"c9-2-01","title":"Mathematics Chapter 1","summary":"Add the audio summary and key points for Class 9 Mathematics Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c9-2-02","title":"Mathematics Chapter 2","summary":"Add the audio summary and key points for Class 9 Mathematics Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c9-s3","name":"Science","icon":"⚗","chapters":[{"id":"c9-3-01","title":"Science Chapter 1","summary":"Add the audio summary and key points for Class 9 Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c9-3-02","title":"Science Chapter 2","summary":"Add the audio summary and key points for Class 9 Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c9-s4","name":"Social Science","icon":"🌍","chapters":[{"id":"c9-4-01","title":"Social Science Chapter 1","summary":"Add the audio summary and key points for Class 9 Social Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c9-4-02","title":"Social Science Chapter 2","summary":"Add the audio summary and key points for Class 9 Social Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c9-s5","name":"Hindi","icon":"अ","chapters":[{"id":"c9-5-01","title":"Hindi Chapter 1","summary":"Add the audio summary and key points for Class 9 Hindi Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c9-5-02","title":"Hindi Chapter 2","summary":"Add the audio summary and key points for Class 9 Hindi Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c9-s6","name":"Computer","icon":"💻","chapters":[{"id":"c9-6-01","title":"Computer Chapter 1","summary":"Add the audio summary and key points for Class 9 Computer Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c9-6-02","title":"Computer Chapter 2","summary":"Add the audio summary and key points for Class 9 Computer Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]}]},{"id":"class-10","name":"Class 10","short":"10","subjects":[{"id":"c10-s1","name":"English","icon":"📖","chapters":[{"id":"c10-1-01","title":"English Chapter 1","summary":"Add the audio summary and key points for Class 10 English Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c10-1-02","title":"English Chapter 2","summary":"Add the audio summary and key points for Class 10 English Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c10-s2","name":"Mathematics","icon":"∑","chapters":[{"id":"c10-2-01","title":"Mathematics Chapter 1","summary":"Add the audio summary and key points for Class 10 Mathematics Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c10-2-02","title":"Mathematics Chapter 2","summary":"Add the audio summary and key points for Class 10 Mathematics Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c10-s3","name":"Science","icon":"⚗","chapters":[{"id":"c10-3-01","title":"Science Chapter 1","summary":"Add the audio summary and key points for Class 10 Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c10-3-02","title":"Science Chapter 2","summary":"Add the audio summary and key points for Class 10 Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c10-s4","name":"Social Science","icon":"🌍","chapters":[{"id":"c10-4-01","title":"Social Science Chapter 1","summary":"Add the audio summary and key points for Class 10 Social Science Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c10-4-02","title":"Social Science Chapter 2","summary":"Add the audio summary and key points for Class 10 Social Science Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c10-s5","name":"Hindi","icon":"अ","chapters":[{"id":"c10-5-01","title":"Hindi Chapter 1","summary":"Add the audio summary and key points for Class 10 Hindi Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c10-5-02","title":"Hindi Chapter 2","summary":"Add the audio summary and key points for Class 10 Hindi Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]},{"id":"c10-s6","name":"Computer","icon":"💻","chapters":[{"id":"c10-6-01","title":"Computer Chapter 1","summary":"Add the audio summary and key points for Class 10 Computer Chapter 1.","audio":"","duration":"--:--","audioSource":"url"},{"id":"c10-6-02","title":"Computer Chapter 2","summary":"Add the audio summary and key points for Class 10 Computer Chapter 2.","audio":"","duration":"--:--","audioSource":"url"}]}]}]};
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
let catalog, view="home", currentClass=null, currentSubject=null, current=null, managerTab="chapters";
let audioBlobUrls=new Map();

const read=(k,f)=>{try{const v=JSON.parse(localStorage.getItem(k));return v??f}catch{return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const uid=p=>p+"-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,7);
const getPrefs=()=>read(KEY.prefs,{theme:"light"});
const favs=()=>read(KEY.favorites,[]);
const hist=()=>read(KEY.history,[]);
const saveCatalog=()=>write(KEY.catalog,catalog);
const classes=()=>catalog.classes||[];
const subjects=()=>classes().flatMap(c=>c.subjects.map(s=>({...s,classId:c.id,className:c.name})));
const chapters=()=>subjects().flatMap(s=>s.chapters.map(ch=>({...ch,subjectId:s.id,subjectName:s.name,classId:s.classId,className:s.className})));
const findChapter=id=>chapters().find(x=>x.id===id);
const getClass=id=>classes().find(c=>c.id===id);
const getSubject=(cid,sid)=>{const c=getClass(cid);return c?.subjects.find(s=>s.id===sid)};
function toast(msg,error=false){const el=document.createElement("div");el.className="toast"+(error?" error":"");el.textContent=msg;$("#toastWrap").appendChild(el);setTimeout(()=>el.remove(),2800)}
function applyTheme(){document.body.classList.toggle("dark",getPrefs().theme==="dark");$("#themeToggle").innerHTML=(getPrefs().theme==="dark"?"☀":"☾")+" <span>"+(getPrefs().theme==="dark"?"Light mode":"Dark mode")+"</span>";$("#topTheme").textContent=getPrefs().theme==="dark"?"☀":"☾"}
function setTheme(){const p=getPrefs();p.theme=p.theme==="dark"?"light":"dark";write(KEY.prefs,p);applyTheme()}
function totalChapters(){return chapters().length}
function playableCount(){return chapters().filter(c=>c.audio).length}
function render(){const titles={home:"Dashboard",library:"Audio Library",favorites:"Favorites",history:"Listening History",manager:"Content Manager",backup:"Backup & Restore"};$("#pageTitle").textContent=titles[view]||"Dashboard"; $$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===view)); $("#appContent").innerHTML=view==="home"?homeView():view==="library"?libraryView(false):view==="favorites"?libraryView(true):view==="history"?historyView():view==="manager"?managerView():backupView(); bindView(); closeSidebar()}
function homeView(){
 const recent=hist().slice(0,5).map(h=>findChapter(h.id)).filter(Boolean);
 return `<div class="content">
  <section class="hero"><div class="eyebrow">SAYEED ACADEMY • AUDIO LEARNING PRO</div><h1>Learn chapter by chapter. Listen anywhere.</h1><p>A premium, mobile-first audio learning library for Classes 6–10. Organise every subject, chapter and summary in one clean place.</p><div class="hero-actions"><button class="btn btn-primary" data-action="goto-library">Explore Audio Library</button><button class="btn btn-ghost" data-action="goto-manager">Manage Content</button></div></section>
  <section class="stats">
   ${stat("◉","Classes",classes().length,"6–10")}
   ${stat("▦","Subjects",subjects().length,"Across all classes")}
   ${stat("▶","Chapters",totalChapters(),playableCount()+" with audio")}
   ${stat("★","Favorites",favs().length,"Saved chapters")}
  </section>
  <div class="section-head"><div><h2>Choose your class</h2><p>Open a class to see subject-wise chapters.</p></div></div>
  <div class="class-grid">${classes().map(c=>`<div class="class-card" data-class="${c.id}"><div class="class-number">${esc(c.short)}</div><strong>${esc(c.name)}</strong><span>${c.subjects.length} subjects • ${c.subjects.reduce((a,s)=>a+s.chapters.length,0)} chapters</span><div class="gold-line"></div></div>`).join("")}</div>
  <div class="section-head"><div><h2>Recently listened</h2><p>Your latest audio chapters on this device.</p></div>${recent.length?`<button class="link-btn" data-view-link="history">View all</button>`:""}</div>
  ${recent.length?`<div class="recent-list">${recent.map(c=>`<div class="recent"><div class="recent-icon">▶</div><div style="flex:1"><strong>${esc(c.title)}</strong><small>${esc(c.className)} • ${esc(c.subjectName)}</small></div><button class="round-btn primary" data-play="${c.id}">▶</button></div>`).join("")}</div>`:`<div class="empty"><strong>No listening history yet</strong>Play any chapter and it will appear here.</div>`}
 </div>`;
}
function stat(icon,title,num,sub){return `<div class="stat"><div class="stat-top"><small>${title}</small><div class="stat-icon">${icon}</div></div><strong>${num}</strong><small>${sub}</small></div>`}
function libraryView(favoriteOnly){
 let list=chapters(); if(favoriteOnly)list=list.filter(c=>favs().includes(c.id));
 return `<div class="content"><div class="section-head"><div><h2>${favoriteOnly?"Favorite Chapters":"Audio Library"}</h2><p>${favoriteOnly?"Your saved chapters.":"Browse Class → Subject → Chapter and play audio in-app."}</p></div><button class="btn btn-blue" data-action="goto-manager">＋ Add Chapter</button></div>
 <div class="library-toolbar"><input class="search" id="librarySearch" placeholder="Search chapter, subject or class…" autocomplete="off"><select class="select" id="classFilter"><option value="">All classes</option>${classes().map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join("")}</select><select class="select" id="subjectFilter"><option value="">All subjects</option>${[...new Map(subjects().map(s=>[s.name,s.name])).values()].map(s=>`<option>${esc(s)}</option>`).join("")}</select></div>
 <div id="chapterResults" class="chapter-grid">${chapterCards(list)}</div></div>`;
}
function chapterCards(list){
 if(!list.length)return `<div class="empty" style="grid-column:1/-1"><strong>No chapters found</strong>${view==="favorites"?"Add chapters to favorites or change your filters.":"Try a different search/filter or add a chapter from Content Manager."}</div>`;
 return list.map(c=>`<article class="chapter-card">
  <div class="chapter-top"><span class="badge">${esc(c.className)} • ${esc(c.subjectName)}</span><button class="round-btn" data-fav="${c.id}" title="Favorite">${favs().includes(c.id)?"★":"☆"}</button></div>
  <h3>${esc(c.title)}</h3><p>${esc(c.summary)}</p>
  <div class="chapter-meta"><span class="note">${c.audio?("Audio ready"+(c.duration&&c.duration!=="--:--"?" • "+esc(c.duration):"")):"Audio not added"}</span><div class="chapter-actions"><button class="round-btn ${c.audio?"primary":""}" data-play="${c.id}" ${c.audio?"":"disabled"} title="Play">▶</button></div></div>
 </article>`).join("");
}
function historyView(){
 const hs=hist().map(h=>({...h,c:findChapter(h.id)})).filter(x=>x.c);
 return `<div class="content"><div class="section-head"><div><h2>Listening History</h2><p>Recent chapters played on this device.</p></div>${hs.length?`<button class="btn btn-danger" data-action="clear-history">Clear history</button>`:""}</div>${hs.length?`<div class="recent-list">${hs.map(x=>`<div class="recent"><div class="recent-icon">◷</div><div style="flex:1"><strong>${esc(x.c.title)}</strong><small>${esc(x.c.className)} • ${esc(x.c.subjectName)} • ${new Date(x.at).toLocaleString()}</small></div><button class="round-btn primary" data-play="${x.c.id}" ${x.c.audio?"":"disabled"}>▶</button></div>`).join("")}</div>`:`<div class="empty"><strong>Nothing played yet</strong>Your listening activity will be saved here.</div>`}</div>`;
}
function managerView(){
 const c=classes()[0];
 let body="";
 if(managerTab==="chapters") body=`<div class="manager-list">${chapters().map(ch=>`<div class="manager-row"><div class="recent-icon">▶</div><div class="grow"><strong>${esc(ch.title)}</strong><small>${esc(ch.className)} • ${esc(ch.subjectName)} ${ch.audio?"• Audio ready":"• No audio"}</small></div><div class="row-actions"><button class="round-btn" data-edit="${ch.id}" title="Edit">✎</button><button class="round-btn danger" data-delete="${ch.id}" title="Delete">⌫</button></div></div>`).join("")||`<div class="empty"><strong>No chapters</strong>Create your first chapter.</div>`}</div>`;
 if(managerTab==="classes") body=`<div class="manager-list">${classes().map(x=>`<div class="manager-row"><div class="recent-icon">${esc(x.short)}</div><div class="grow"><strong>${esc(x.name)}</strong><small>${x.subjects.length} subjects • ${x.subjects.reduce((a,s)=>a+s.chapters.length,0)} chapters</small></div></div>`).join("")}</div>`;
 if(managerTab==="subjects") body=`<div class="manager-list">${subjects().map(s=>`<div class="manager-row"><div class="recent-icon">${esc(s.icon)}</div><div class="grow"><strong>${esc(s.name)}</strong><small>${esc(s.className)} • ${s.chapters.length} chapters</small></div></div>`).join("")}</div>`;
 return `<div class="content"><div class="section-head"><div><h2>Content Manager</h2><p>Manage chapters, summaries and in-app audio sources. Delete and edit actions are fully wired.</p></div><button class="btn btn-blue" data-action="add-chapter">＋ New Chapter</button></div>
 <div class="manager-tabs">${["chapters","classes","subjects"].map(t=>`<button class="tab ${managerTab===t?"active":""}" data-manager-tab="${t}">${t[0].toUpperCase()+t.slice(1)}</button>`).join("")}</div>${body}</div>`;
}
function backupView(){return `<div class="content"><div class="section-head"><div><h2>Backup & Restore</h2><p>Protect your catalogue, settings, favorites and listening history.</p></div></div><div class="backup-grid">
 <div class="backup-card"><h3>Export full backup</h3><p>Downloads a JSON backup containing your catalogue and app data. Browser audio blobs are excluded because they can be large.</p><button class="btn btn-blue" data-action="export-backup">Download JSON Backup</button></div>
 <div class="backup-card"><h3>Import backup</h3><p>Restore a Sayeed Academy backup. Your current catalogue will be replaced only after confirmation.</p><button class="btn btn-ghost" data-action="import-backup">Choose JSON File</button></div>
 <div class="backup-card"><h3>Reset catalogue</h3><p>Restore the original Class 6–10 starter catalogue. This does not remove your browser audio files.</p><button class="btn btn-danger" data-action="reset-catalog">Reset Starter Catalogue</button></div>
 <div class="backup-card"><h3>Storage information</h3><p>URL audio is streamed. Uploaded browser audio is stored locally in IndexedDB on this device and is not uploaded to GitHub.</p><button class="btn btn-ghost" data-action="storage-info">How audio storage works</button></div>
 </div></div>`}
function bindView(){
 $$("[data-class]").forEach(b=>b.onclick=()=>{currentClass=b.dataset.class;currentSubject=null;view="library";render();$("#classFilter").value=currentClass});
 $$("[data-play]").forEach(b=>b.onclick=()=>playChapter(b.dataset.play));
 $$("[data-fav]").forEach(b=>b.onclick=()=>toggleFav(b.dataset.fav));
 $$("[data-view-link]").forEach(b=>b.onclick=()=>{view=b.dataset.viewLink;render()});
 $$("[data-manager-tab]").forEach(b=>b.onclick=()=>{managerTab=b.dataset.managerTab;render()});
 $$("[data-edit]").forEach(b=>b.onclick=()=>openChapterModal(b.dataset.edit));
 $$("[data-delete]").forEach(b=>b.onclick=()=>deleteChapter(b.dataset.delete));
 $$("[data-action]").forEach(b=>b.onclick=()=>action(b.dataset.action));
 const search=$("#librarySearch"), cf=$("#classFilter"), sf=$("#subjectFilter");
 if(search){const filter=()=>{let q=search.value.toLowerCase().trim(), list=chapters();if(view==="favorites")list=list.filter(c=>favs().includes(c.id));if(cf.value)list=list.filter(c=>c.classId===cf.value);if(sf.value)list=list.filter(c=>c.subjectName===sf.value);if(q)list=list.filter(c=>(c.title+" "+c.summary+" "+c.className+" "+c.subjectName).toLowerCase().includes(q));$("#chapterResults").innerHTML=chapterCards(list);$$("[data-play]").forEach(b=>b.onclick=()=>playChapter(b.dataset.play));$$("[data-fav]").forEach(b=>b.onclick=()=>toggleFav(b.dataset.fav))};search.oninput=filter;cf.onchange=filter;sf.onchange=filter}
}
function action(a){
 if(a==="goto-library"){view="library";render()}
 if(a==="goto-manager"){view="manager";managerTab="chapters";render()}
 if(a==="add-chapter")openChapterModal()
 if(a==="clear-history"){if(confirm("Clear all listening history?")){write(KEY.history,[]);toast("History cleared");render()}}
 if(a==="export-backup")exportBackup()
 if(a==="import-backup")importBackup()
 if(a==="reset-catalog")resetCatalog()
 if(a==="storage-info")openInfoModal()
}
function toggleFav(id){let f=favs();f=f.includes(id)?f.filter(x=>x!==id):[...f,id];write(KEY.favorites,f);toast(f.includes(id)?"Added to favorites":"Removed from favorites");render()}
function deleteChapter(id){
 const ch=findChapter(id);if(!ch)return;
 if(!confirm(`Delete "${ch.title}" permanently from this device?`))return;
 const s=getSubject(ch.classId,ch.subjectId);s.chapters=s.chapters.filter(x=>x.id!==id);saveCatalog();
 write(KEY.favorites,favs().filter(x=>x!==id));write(KEY.history,hist().filter(x=>x.id!==id));
 deleteAudioBlob(id).catch(()=>{});if(current?.id===id)closePlayer();
 toast("Chapter deleted");render();
}
function openChapterModal(id){
 const ch=id?findChapter(id):null;
 const form=ch?{...ch}: {id:"",title:"",summary:"",audio:"",duration:"--:--",audioSource:"url",classId:classes()[0].id,subjectId:classes()[0].subjects[0].id};
 const classOptions=classes().map(c=>`<option value="${c.id}" ${form.classId===c.id?"selected":""}>${esc(c.name)}</option>`).join("");
 const subj=getClass(form.classId)?.subjects||[]; const subjectOptions=subj.map(s=>`<option value="${s.id}" ${form.subjectId===s.id?"selected":""}>${esc(s.name)}</option>`).join("");
 $("#modalCard").innerHTML=`<div class="modal-head"><h2>${ch?"Edit chapter":"Add new chapter"}</h2><button class="icon-btn" data-close-modal>×</button></div>
 <form id="chapterForm"><div class="form-grid">
 <div class="field"><label>Class</label><select id="fClass">${classOptions}</select></div>
 <div class="field"><label>Subject</label><select id="fSubject">${subjectOptions}</select></div>
 <div class="field full"><label>Chapter title</label><input id="fTitle" required maxlength="120" value="${esc(form.title)}" placeholder="e.g. The Living Organisms"></div>
 <div class="field full"><label>Summary</label><textarea id="fSummary" maxlength="1200" placeholder="Short chapter summary…">${esc(form.summary)}</textarea></div>
 <div class="field"><label>Audio source</label><select id="fSource"><option value="url" ${form.audioSource!=="local"?"selected":""}>Direct audio URL</option><option value="local" ${form.audioSource==="local"?"selected":""}>Upload to this device</option></select></div>
 <div class="field"><label>Duration (optional)</label><input id="fDuration" value="${esc(form.duration||"--:--")}" placeholder="08:42"></div>
 <div class="field full" id="urlBox"><label>Audio URL</label><input id="fAudio" value="${esc(form.audioSource==="local"?"":form.audio)}" placeholder="https://example.com/chapter.mp3"><span class="note">Use a direct browser-playable audio URL. It should end in .mp3/.m4a/.ogg or return an audio MIME type.</span></div>
 <div class="field full hidden" id="fileBox"><label>Audio file</label><div class="file-box"><input id="fFile" type="file" accept="audio/*"><div class="note">Uploaded audio is stored locally in IndexedDB on this device. It will play inside Sayeed Academy but is not uploaded to GitHub.</div></div></div>
 </div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-close-modal>Cancel</button><button class="btn btn-blue" type="submit">${ch?"Save Changes":"Create Chapter"}</button></div></form>`;
 $("#modal").classList.remove("hidden");
 const source=$("#fSource"),urlBox=$("#urlBox"),fileBox=$("#fileBox");
 const toggle=()=>{const local=source.value==="local";urlBox.classList.toggle("hidden",local);fileBox.classList.toggle("hidden",!local)};source.onchange=toggle;toggle();
 $("#fClass").onchange=()=>{const subs=getClass($("#fClass").value)?.subjects||[];$("#fSubject").innerHTML=subs.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join("")};
 $("#chapterForm").onsubmit=async e=>{e.preventDefault();await saveChapter(ch?.id||null)};
 $$("[data-close-modal]").forEach(x=>x.onclick=closeModal);
}
async function saveChapter(existingId){
 const title=$("#fTitle").value.trim();if(!title){toast("Chapter title is required",true);return}
 const cid=$("#fClass").value,sid=$("#fSubject").value,source=$("#fSource").value;
 let audio=source==="url"?$("#fAudio").value.trim():"", duration=$("#fDuration").value.trim()||"--:--";
 if(source==="url" && audio && !/^https?:\/\//i.test(audio)){toast("Enter a valid http/https audio URL",true);return}
 const subject=getSubject(cid,sid);if(!subject){toast("Invalid class/subject",true);return}
 let target=existingId?findChapter(existingId):null;
 if(target && (target.classId!==cid || target.subjectId!==sid)){getSubject(target.classId,target.subjectId).chapters=getSubject(target.classId,target.subjectId).chapters.filter(x=>x.id!==existingId);target=null}
 if(!target){target={id:existingId||uid("chapter"),title:"",summary:"",audio:"",duration:"--:--",audioSource:source};subject.chapters.push(target)}
 target.title=title;target.summary=$("#fSummary").value.trim();target.duration=duration;target.audioSource=source;
 if(source==="url"){target.audio=audio;if(existingId)await deleteAudioBlob(existingId).catch(()=>{})}
 else {
   const file=$("#fFile").files[0];
   if(file){await saveAudioBlob(target.id,file);target.audio="indexeddb://"+target.id}
   else if(!existingId || target.audioSource!=="local"){toast("Choose an audio file",true);return}
 }
 saveCatalog();closeModal();toast(existingId?"Chapter updated":"Chapter created");render();
}
async function playChapter(id){
 const ch=findChapter(id);if(!ch)return;
 if(!ch.audio){toast("No audio has been added for this chapter",true);return}
 current=ch;
 $("#playerTitle").textContent=ch.title;$("#playerSub").textContent=`${ch.className} • ${ch.subjectName}`;
 $("#playerFav").textContent=favs().includes(id)?"★":"☆";
 let src=ch.audio;
 if(src.startsWith("indexeddb://")){src=await getAudioBlob(id);if(!src){toast("Local audio file is missing",true);return}}
 const audio=$("#audio");audio.src=src;audio.load();audio.play().catch(()=>{});recordHistory(id);toast("Playing "+ch.title);
}
function recordHistory(id){let h=hist().filter(x=>x.id!==id);h.unshift({id,at:Date.now()});write(KEY.history,h.slice(0,50))}
function toggleCurrentFav(){if(!current)return;toggleFav(current.id);$("#playerFav").textContent=favs().includes(current.id)?"★":"☆"}
function closePlayer(){const a=$("#audio");a.pause();a.removeAttribute("src");a.load();current=null;$("#playerTitle").textContent="Nothing playing";$("#playerSub").textContent="Choose a chapter from the library";$("#playerArt").textContent="▶";$("#playerFav").textContent="☆";$("#seekBar").value=0}
function closeModal(){$("#modal").classList.add("hidden");$("#modalCard").innerHTML=""}
function openInfoModal(){$("#modalCard").innerHTML=`<div class="modal-head"><h2>How audio storage works</h2><button class="icon-btn" data-close-modal>×</button></div><p class="note" style="font-size:12px">There are two working modes. <b>Direct audio URL</b> streams an MP3/M4A/OGG from its public file URL while playback remains inside this site. <b>Upload to this device</b> stores the audio as a browser Blob in IndexedDB and plays it through the same in-app player. Device uploads are local to the browser/device; they are not published to GitHub. For a large multi-device library, use object storage later and paste direct audio URLs.</p><div class="modal-actions"><button class="btn btn-blue" data-close-modal>Got it</button></div>`;$("#modal").classList.remove("hidden");$$("[data-close-modal]").forEach(x=>x.onclick=closeModal)}
function exportBackup(){const data={format:"sayeed-academy-backup",version:"3.0.0",createdAt:new Date().toISOString(),catalog,prefs:getPrefs(),favorites:favs(),history:hist()};download("sayeed-academy-backup.json",JSON.stringify(data,null,2),"application/json");toast("Backup downloaded")}
function importBackup(){const input=document.createElement("input");input.type="file";input.accept=".json,application/json";input.onchange=()=>{const file=input.files[0];if(!file)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!d.catalog?.classes)throw Error();if(!confirm("Replace current catalogue with this backup?"))return;catalog=d.catalog;write(KEY.catalog,catalog);if(d.prefs)write(KEY.prefs,d.prefs);if(Array.isArray(d.favorites))write(KEY.favorites,d.favorites);if(Array.isArray(d.history))write(KEY.history,d.history);toast("Backup restored");render();applyTheme()}catch{toast("Invalid Sayeed Academy backup",true)}};r.readAsText(file)};input.click()}
function resetCatalog(){if(!confirm("Reset the catalogue to the Class 6–10 starter content? Your custom chapters will be removed from the catalogue."))return;catalog=structuredClone(DEFAULT_CATALOG);saveCatalog();write(KEY.favorites,[]);write(KEY.history,[]);toast("Starter catalogue restored");render()}
function download(name,data,type){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([data],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function openSidebar(){ $("#sidebar").classList.add("open");$("#backdrop").classList.add("show") }
function closeSidebar(){ $("#sidebar").classList.remove("open");$("#backdrop").classList.remove("show") }

function idb(){return new Promise((resolve,reject)=>{const req=indexedDB.open("SayeedAcademyAudioDB",1);req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains("audio"))req.result.createObjectStore("audio")};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
async function saveAudioBlob(id,file){const db=await idb();return new Promise((res,rej)=>{const tx=db.transaction("audio","readwrite");tx.objectStore("audio").put(file,id);tx.oncomplete=res;tx.onerror=()=>rej(tx.error)})}
async function getAudioBlob(id){const db=await idb();return new Promise((res,rej)=>{const tx=db.transaction("audio","readonly");const req=tx.objectStore("audio").get(id);req.onsuccess=()=>res(req.result?URL.createObjectURL(req.result):null);req.onerror=()=>rej(req.error)})}
async function deleteAudioBlob(id){const db=await idb();return new Promise((res,rej)=>{const tx=db.transaction("audio","readwrite");tx.objectStore("audio").delete(id);tx.oncomplete=res;tx.onerror=()=>rej(tx.error)})}

function init(){
 try{catalog=read(KEY.catalog,null)||structuredClone(DEFAULT_CATALOG);if(!catalog.classes)throw Error()}catch{catalog=structuredClone(DEFAULT_CATALOG);saveCatalog()}
 applyTheme();render();
 $("#themeToggle").onclick=setTheme;$("#topTheme").onclick=setTheme;$("#openSidebar").onclick=openSidebar;$("#closeSidebar").onclick=closeSidebar;$("#backdrop").onclick=closeSidebar;$("#quickManager").onclick=()=>{view="manager";render()};
 $("#playPause").onclick=()=>{const a=$("#audio");if(!current)return;if(a.paused)a.play();else a.pause()};
 $("#back15").onclick=()=>{$("#audio").currentTime=Math.max(0,$("#audio").currentTime-15)};
 $("#forward15").onclick=()=>{$("#audio").currentTime=Math.min($("#audio").duration||0,$("#audio").currentTime+15)};
 $("#playerFav").onclick=toggleCurrentFav;$("#closePlayer").onclick=closePlayer;
 $("#audio").addEventListener("play",()=>$("#playPause").textContent="❚❚");$("#audio").addEventListener("pause",()=>$("#playPause").textContent="▶");
 $("#audio").addEventListener("loadedmetadata",()=>{$("#duration").textContent=fmt($("#audio").duration);$("#seekBar").max=$("#audio").duration||100});
 $("#audio").addEventListener("timeupdate",()=>{$("#currentTime").textContent=fmt($("#audio").currentTime);$("#seekBar").value=$("#audio").currentTime});
 $("#seekBar").oninput=e=>$("#audio").currentTime=Number(e.target.value);
 $("#audio").addEventListener("ended",()=>{$("#playPause").textContent="▶";});
 $("#modal").addEventListener("click",e=>{if(e.target.matches("[data-close-modal]"))closeModal()});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModal();closeSidebar()}});
}
function fmt(n){if(!Number.isFinite(n))return"00:00";const m=Math.floor(n/60),s=Math.floor(n%60);return String(m).padStart(2,"0")+":"+String(s).padStart(2,"0")}
if("serviceWorker"in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
document.addEventListener("DOMContentLoaded",init);
})();