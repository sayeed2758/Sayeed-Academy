const App=(()=> {
  const KEY={prefs:"sa_v2_prefs",favorites:"sa_v2_favorites",history:"sa_v2_history",catalog:"sa_v2_catalog"};
  let catalog,view="home",selectedClass=null,selectedSubject=null,current=null,deferredInstall=null;

  const $=s=>document.querySelector(s);
  const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
  const read=(k,f)=>{try{const x=JSON.parse(localStorage.getItem(k));return x??f}catch{return f}};
  const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const prefs=()=>read(KEY.prefs,{theme:"light"});
  const favorites=()=>read(KEY.favorites,[]);
  const history=()=>read(KEY.history,[]);
  const allClasses=()=>catalog.classes||[];
  const allSubjects=()=>allClasses().flatMap(c=>c.subjects.map(s=>({...s,classId:c.id,className:c.name})));
  const allChapters=()=>allSubjects().flatMap(s=>s.chapters.map(ch=>({...ch,subjectId:s.id,subjectName:s.name,classId:s.classId,className:s.className})));
  const findChapter=id=>allChapters().find(x=>x.id===id);
  const toast=msg=>{const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove("show"),2200)};
  const saveHistory=id=>{let h=history().filter(x=>x!==id);h.unshift(id);write(KEY.history,h.slice(0,30))};
  const isFav=id=>favorites().includes(id);
  const toggleFav=id=>{let f=favorites();f=f.includes(id)?f.filter(x=>x!==id):[...f,id];write(KEY.favorites,f);render();toast(f.includes(id)?"Added to favorites":"Removed from favorites");if(current?.id===id)updatePlayerFav()};
  const fmtTime=s=>{if(!Number.isFinite(s))return"0:00";const m=Math.floor(s/60),sec=Math.floor(s%60);return `${m}:${String(sec).padStart(2,"0")}`};

  function init(){
    catalog=read(KEY.catalog,null);
    if(!catalog) catalog=window.__CATALOG__;
    if(!catalog){document.body.innerHTML="<div style='padding:30px'>Catalog could not load.</div>";return}
    document.body.classList.toggle("dark",prefs().theme==="dark");
    bind();
    render();
    registerSW();
  }
  async function registerSW(){if("serviceWorker" in navigator)try{await navigator.serviceWorker.register("sw.js")}catch{}}

  function bind(){
    document.addEventListener("click",e=>{
      const nav=e.target.closest("[data-view]"); if(nav){view=nav.dataset.view;selectedClass=null;selectedSubject=null;$("#sidebar").classList.remove("open");render();return}
      const act=e.target.closest("[data-action]"); if(act){actions(act.dataset.action);return}
      const cls=e.target.closest("[data-class]"); if(cls){selectedClass=cls.dataset.class;view="class";render();return}
      const sub=e.target.closest("[data-subject]"); if(sub){selectedSubject=sub.dataset.subject;view="subject";render();return}
      const ch=e.target.closest("[data-play]"); if(ch){playChapter(ch.dataset.play);return}
      const fav=e.target.closest("[data-fav]"); if(fav){toggleFav(fav.dataset.fav);return}
      const detail=e.target.closest("[data-detail]"); if(detail){openChapterModal(detail.dataset.detail);return}
      const edit=e.target.closest("[data-edit]"); if(edit){openEditor(edit.dataset.edit);return}
      const del=e.target.closest("[data-delete]"); if(del){deleteChapter(del.dataset.delete);return}
    });
    $("#menuBtn").onclick=()=>$("#sidebar").classList.toggle("open");
    $("#searchBtn").onclick=()=>{$("#searchPanel").classList.toggle("hidden");if(!$("#searchPanel").classList.contains("hidden"))$("#globalSearch").focus()};
    $("#globalSearch").oninput=e=>search(e.target.value);
    $("#playBtn").onclick=togglePlay;
    $("#back15").onclick=()=>seek(-15);$("#forward15").onclick=()=>seek(15);
    $("#progress").oninput=e=>{if($("#audio").duration)$("#audio").currentTime=(+e.target.value/100)*$("#audio").duration};
    $("#audio").ontimeupdate=updateProgress;$("#audio").loadedmetadata=updateProgress;
    $("#audio").onended=()=>{$("#playBtn").textContent="▶"};
    $("#playerFav").onclick=()=>current&&toggleFav(current.id);
    $("#playerClose").onclick=()=>{$("#playerDock").classList.add("hidden");current=null};
    $("#modalClose").onclick=closeModal;
    $("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
    window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredInstall=e;$("#installBtn").hidden=false});
    $("#installBtn").onclick=async()=>{if(!deferredInstall)return;deferredInstall.prompt();deferredInstall=null};
  }
  function actions(a){
    if(a==="theme"){const p=prefs();p.theme=p.theme==="dark"?"light":"dark";write(KEY.prefs,p);document.body.classList.toggle("dark",p.theme==="dark");toast(`${p.theme==="dark"?"Dark":"Light"} mode enabled`)}
    if(a==="reset"){if(confirm("Reset local preferences and history? Your catalog will not be removed.")){localStorage.removeItem(KEY.prefs);localStorage.removeItem(KEY.favorites);localStorage.removeItem(KEY.history);location.reload()}}
    if(a==="add"){openEditor(null)}
  }
  function render(){
    $(".nav-item.active")?.classList.remove("active");document.querySelector(`[data-view="${view}"]`)?.classList.add("active");
    $("#crumb").textContent={home:"Home",library:"Library",favorites:"Favorites",history:"Listening History",manage:"Content Manager",class:"Class",subject:"Subject"}[view]||"Home";
    const r=$("#viewRoot");
    if(view==="home")r.innerHTML=home();
    else if(view==="library")r.innerHTML=library();
    else if(view==="favorites")r.innerHTML=listView("Favorites",favorites().map(findChapter).filter(Boolean),"No favorites yet. Tap ☆ on any chapter to save it.");
    else if(view==="history")r.innerHTML=listView("Recently Played",history().map(findChapter).filter(Boolean),"Your listening history will appear here.");
    else if(view==="manage")r.innerHTML=manager();
    else if(view==="class")r.innerHTML=classView();
    else if(view==="subject")r.innerHTML=subjectView();
    bindDynamic();
  }
  function home(){
    const total=allChapters().length, listened=history().length, fav=favorites().length;
    return `<div class="content">
      <div class="hero"><div class="hero-card">
        <div class="eyebrow">Sayeed Academy • Audio Learning</div>
        <h1>Learn chapter by chapter.<br><span style="color:var(--primary)">Listen anywhere.</span></h1>
        <p>Premium, focused audio summaries for Classes 6–10. Pick a class, open a subject and start listening — all inside the app.</p>
        <div class="hero-actions"><button class="primary" data-view="library">Explore Library</button><button class="secondary" data-action="add">＋ Add Audio Chapter</button></div>
      </div><div class="hero-stat">
        <div class="stat"><strong>${allClasses().length}</strong><span>Classes</span></div><div class="stat"><strong>${allSubjects().length}</strong><span>Subjects</span></div>
        <div class="stat"><strong>${total}</strong><span>Chapters</span></div><div class="stat"><strong>${listened}</strong><span>Played</span></div>
      </div></div>
      <div class="section-head"><div><h2>Choose your class</h2><p>Start from your current class.</p></div></div>
      <div class="class-grid">${allClasses().map(c=>`<button class="class-card" data-class="${c.id}"><div class="class-number">${c.short}</div><h3>${esc(c.name)}</h3><span class="muted">${c.subjects.length} subjects • ${c.subjects.reduce((n,s)=>n+s.chapters.length,0)} chapters</span></button>`).join("")}</div>
      <div class="section-head"><div><h2>Continue listening</h2><p>Quick access to your recent chapters.</p></div><button class="secondary" data-view="history">View history</button></div>
      ${history().slice(0,4).map(findChapter).filter(Boolean).map(chapterCard).join("")||`<div class="empty">No listening history yet.<br>Choose a chapter above to get started.</div>`}
    </div>`;
  }
  function library(){
    return `<div class="content"><div class="section-head"><div><h2>Audio Library</h2><p>Classes 6 to 10 • subject-wise chapter summaries.</p></div></div>
      <div class="class-grid">${allClasses().map(c=>`<button class="class-card" data-class="${c.id}"><div class="class-number">${c.short}</div><h3>${esc(c.name)}</h3><span class="muted">${c.subjects.length} subjects</span></button>`).join("")}</div></div>`;
  }
  function classView(){
    const c=allClasses().find(x=>x.id===selectedClass);if(!c)return library();
    return `<div class="content"><div class="section-head"><div><h2>${esc(c.name)}</h2><p>Select a subject to open its chapters.</p></div><button class="secondary" data-view="library">← Classes</button></div>
      <div class="subject-grid">${c.subjects.map(s=>`<button class="subject-card" data-subject="${s.id}"><div class="subject-icon">${s.icon}</div><h3>${esc(s.name)}</h3><span class="muted">${s.chapters.length} audio chapters</span></button>`).join("")}</div></div>`;
  }
  function subjectView(){
    const s=allSubjects().find(x=>x.id===selectedSubject);if(!s)return library();
    return `<div class="content"><div class="section-head"><div><h2>${esc(s.className)} / ${esc(s.name)}</h2><p>${s.chapters.length} chapter summaries.</p></div><button class="secondary" data-class="${s.classId}">← Subject list</button></div>
      <div class="chapter-grid">${s.chapters.map(chapterCard).join("")}</div></div>`;
  }
  function chapterCard(ch){
    const configured=!!ch.audio;
    return `<article class="chapter-card"><div class="chapter-top"><span class="tag">${esc(ch.className)} • ${esc(ch.subjectName)}</span><button class="icon-btn" data-fav="${ch.id}" title="Favorite">${isFav(ch.id)?"★":"☆"}</button></div>
      <h3>${esc(ch.title)}</h3><p>${esc(ch.summary)}</p><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><span class="muted">${configured?"Audio ready":"Audio not configured"}</span><div><button class="secondary" data-detail="${ch.id}">Details</button> <button class="play-mini" data-play="${ch.id}" title="${configured?"Play":"Configure audio first"}">${configured?"▶":"＋"}</button></div></div></article>`;
  }
  function listView(title,items,empty){
    return `<div class="content"><div class="section-head"><div><h2>${title}</h2><p>Saved on this device.</p></div></div>${items.length?`<div class="list">${items.map(ch=>`<div class="list-row"><div class="list-main"><b>${esc(ch.title)}</b><span>${esc(ch.className)} • ${esc(ch.subjectName)}</span></div><div class="list-actions"><button class="secondary" data-play="${ch.id}">▶ Play</button><button class="icon-btn" data-fav="${ch.id}">${isFav(ch.id)?"★":"☆"}</button></div></div>`).join("")}</div>`:`<div class="empty">${empty}</div>`}</div>`;
  }
  function manager(){
    const items=allChapters();
    return `<div class="content"><div class="section-head"><div><h2>Content Manager</h2><p>Add or update chapter metadata and an audio URL. Audio is played inside the app.</p></div><button class="primary" data-action="add">＋ Add chapter</button></div>
      <div class="toolbar"><input id="managerSearch" placeholder="Search chapters…"></div>
      <div class="list" id="managerList">${items.map(ch=>managerRow(ch)).join("")}</div>
      <div class="empty" style="margin-top:16px">Tip: for production, use a cloud object-storage URL (for example a public or signed audio URL) in the Audio URL field. The player stays on this website.</div></div>`;
  }
  function managerRow(ch){return `<div class="list-row" data-manager-row><div class="list-main"><b>${esc(ch.title)}</b><span>${esc(ch.className)} • ${esc(ch.subjectName)} • ${ch.audio?"Audio configured":"Audio missing"}</span></div><div class="list-actions"><button class="secondary" data-play="${ch.id}">▶</button><button class="secondary" data-edit="${ch.id}">Edit</button><button class="danger" data-delete="${ch.id}">Delete</button></div></div>`}
  function bindDynamic(){const ms=$("#managerSearch");if(ms)ms.oninput=()=>{const q=ms.value.toLowerCase();document.querySelectorAll("[data-manager-row]").forEach(r=>r.style.display=r.textContent.toLowerCase().includes(q)?"":"none")}}
  function playChapter(id){
    const ch=findChapter(id);if(!ch)return;
    if(!ch.audio){openChapterModal(id);toast("Add an audio URL to play this chapter");return}
    current=ch;$("#playerDock").classList.remove("hidden");$("#playerTitle").textContent=ch.title;$("#playerSub").textContent=`${ch.className} • ${ch.subjectName}`;$("#miniCover").textContent="▶";$("#audio").src=ch.audio;$("#audio").load();saveHistory(id);updatePlayerFav();$("#audio").play().then(()=>$("#playBtn").textContent="❚❚").catch(()=>$("#playBtn").textContent="▶");renderHistoryOnly();
  }
  function renderHistoryOnly(){if(view==="history")render()}
  function togglePlay(){if(!current){toast("Choose a chapter first");return}const a=$("#audio");if(a.paused){a.play().then(()=>$("#playBtn").textContent="❚❚")}else{a.pause();$("#playBtn").textContent="▶"}}
  function seek(sec){if($("#audio").duration)$("#audio").currentTime=Math.max(0,Math.min($("#audio").duration,$("#audio").currentTime+sec))}
  function updateProgress(){const a=$("#audio");$("#currentTime").textContent=fmtTime(a.currentTime);$("#duration").textContent=fmtTime(a.duration);$("#progress").value=a.duration?(a.currentTime/a.duration)*100:0}
  function updatePlayerFav(){if(current)$("#playerFav").textContent=isFav(current.id)?"★":"☆"}
  function search(q){
    const box=$("#searchResults");q=q.trim().toLowerCase();if(!q){box.innerHTML="";return}
    const hits=allChapters().filter(x=>`${x.title} ${x.className} ${x.subjectName}`.toLowerCase().includes(q)).slice(0,10);
    box.innerHTML=hits.length?hits.map(x=>`<button class="search-result" data-play="${x.id}"><b>${esc(x.title)}</b><span class="muted"> • ${esc(x.className)} • ${esc(x.subjectName)}</span></button>`).join(""):`<div class="muted">No matches found.</div>`;
  }
  function openChapterModal(id){
    const ch=findChapter(id);if(!ch)return;
    $("#modalTitle").textContent=ch.title;
    $("#modalBody").innerHTML=`<div class="tag">${esc(ch.className)} • ${esc(ch.subjectName)}</div><p style="line-height:1.7;color:var(--muted)">${esc(ch.summary)}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="primary" data-play="${ch.id}">${ch.audio?"▶ Play audio":"⚙ Configure audio"}</button><button class="secondary" data-fav="${ch.id}">${isFav(ch.id)?"★ Remove favorite":"☆ Add favorite"}</button></div>`;
    $("#modal").classList.remove("hidden");
  }
  function openEditor(id){
    const ch=id?findChapter(id):{id:"",title:"",summary:"",audio:"",duration:"--:--"};
    const options=allClasses().map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join("");
    $("#modalTitle").textContent=id?"Edit chapter":"Add chapter";
    $("#modalBody").innerHTML=`<div class="form">
      <label>Class<select id="fClass">${options}</select></label>
      <label>Subject<select id="fSubject"></select></label>
      <label>Chapter title<input id="fTitle" value="${esc(ch.title)}" maxlength="120"></label>
      <label>Summary<textarea id="fSummary">${esc(ch.summary)}</textarea></label>
      <label>Audio URL<input id="fAudio" type="url" value="${esc(ch.audio)}" placeholder="https://…/chapter.mp3"></label>
      <label>Duration label<input id="fDuration" value="${esc(ch.duration||"--:--")}" placeholder="05:30"></label>
      <div class="form-actions"><button class="secondary" id="formCancel">Cancel</button><button class="primary" id="formSave">Save chapter</button></div>
    </div>`;
    const fc=$("#fClass"),fs=$("#fSubject");fc.value=ch.classId||allClasses()[0]?.id;populateSubjects(fc.value,ch.subjectId);
    fc.onchange=()=>populateSubjects(fc.value,null);
    $("#formCancel").onclick=closeModal;
    $("#formSave").onclick=()=>saveEditor(id);
    $("#modal").classList.remove("hidden");
  }
  function populateSubjects(classId,subjectId){const c=allClasses().find(x=>x.id===classId),s=$("#fSubject");if(!c||!s)return;s.innerHTML=c.subjects.map(x=>`<option value="${x.id}">${esc(x.name)}</option>`).join("");s.value=subjectId||c.subjects[0]?.id}
  function saveEditor(id){
    const title=$("#fTitle").value.trim(),summary=$("#fSummary").value.trim(),audio=$("#fAudio").value.trim(),duration=$("#fDuration").value.trim()||"--:--",sid=$("#fSubject").value;
    if(!title||!summary){toast("Title and summary are required");return}
    const s=allSubjects().find(x=>x.id===sid);if(!s)return;
    if(id){const old=findChapter(id);Object.assign(old,{title,summary,audio,duration});}
    else{s.chapters.push({id:"ch-"+Date.now(),title,summary,audio,duration})}
    write(KEY.catalog,catalog);closeModal();render();toast(id?"Chapter updated":"Chapter added");
  }
  function deleteChapter(id){
    const ch=findChapter(id);if(!ch)return;if(!confirm(`Delete "${ch.title}"?`))return;
    const s=allSubjects().find(x=>x.id===ch.subjectId);s.chapters=s.chapters.filter(x=>x.id!==id);write(KEY.catalog,catalog);
    write(KEY.favorites,favorites().filter(x=>x!==id));write(KEY.history,history().filter(x=>x!==id));render();toast("Chapter deleted");
  }
  function closeModal(){$("#modal").classList.add("hidden")}
  return {init};
})();

fetch("data/catalog.json").then(r=>r.json()).then(data=>{window.__CATALOG__=data;App.init()}).catch(()=>App.init());
