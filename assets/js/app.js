
import {loadCatalog,saveCatalog,loadJSON,saveJSON} from "./storage.js";
import {initPlayer,play,toggle,setSpeed,currentItem,getAudio,history,clearHistory} from "./player.js";

const fallback=await fetch("./data/catalog.json").then(r=>r.json());
let catalog=loadCatalog(fallback);
let route={name:"home",params:{}};
const main=document.getElementById("main"), sidebar=document.getElementById("sidebar"), toast=document.getElementById("toast"), mini=document.getElementById("miniPlayer");

const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const allChapters=()=>catalog.classes.flatMap(c=>c.subjects.flatMap(s=>s.chapters.map(ch=>({...ch,classId:c.id,className:c.name,subjectId:s.id,subjectName:s.name}))));
const getClass=id=>catalog.classes.find(x=>x.id===id);
const getSubject=(cid,sid)=>getClass(cid)?.subjects.find(x=>x.id===sid);
function notify(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(notify.t);notify.t=setTimeout(()=>toast.classList.remove("show"),2300)}
function go(name,params={}){route={name,params};sidebar.classList.remove("open");render()}
function setActive(){document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.route===route.name))}
function cardClass(c){
  const count=c.subjects.reduce((n,s)=>n+s.chapters.length,0);
  return `<article class="card class-card" data-go-class="${c.id}"><div><div class="class-number">${esc(c.name.replace("Class ",""))}</div><div class="gold-line"></div><div class="class-label">${esc(c.name)}</div></div><div class="class-meta">${c.subjects.length} subjects • ${count} chapters</div></article>`;
}
function home(){
  const total=allChapters().length;
  return `<section class="hero"><div class="hero-content">
    <img class="hero-logo" src="./assets/icons/logo.png" alt="Sayeed Academy">
    <div class="eyebrow" style="color:#f6d477">SA YEED ACADEMY</div>
    <h1>Listen. Learn. Revise.</h1>
    <p class="sub">Chapter-wise audio summaries for Classes 6–10, designed for quick and focused revision.</p>
    <div class="search"><input id="globalSearch" placeholder="Search chapter or subject…" aria-label="Search"><button class="btn btn-gold" id="searchBtn">Search</button></div>
    <div class="kpis"><div class="kpi"><b>5</b><span>Classes</span></div><div class="kpi"><b>${total}</b><span>Available chapters</span></div><div class="kpi"><b>🎧</b><span>Audio-first learning</span></div></div>
  </div></section>
  <section class="section"><div class="section-head"><div><div class="eyebrow">Start learning</div><h2>Choose your class</h2></div><button class="btn" data-route="classes">View all</button></div><div class="grid grid-5">${catalog.classes.map(cardClass).join("")}</div></section>
  <div class="footer-note">Sayeed Academy • Audio Learning Platform</div>`;
}
function classesPage(){
  return `<div class="page-head"><div><div class="eyebrow">Learning library</div><h1>Classes 6–10</h1><p class="sub">Choose a class to explore subjects and chapter summaries.</p></div></div><div class="grid grid-5">${catalog.classes.map(cardClass).join("")}</div>`;
}
function classPage(cid){
  const c=getClass(cid); if(!c)return notFound();
  return `<div class="page-head"><div><button class="btn" data-route="classes">← Classes</button><div class="eyebrow" style="margin-top:16px">${esc(c.name)}</div><h1>Subjects</h1><p class="sub">Select a subject to open its chapter library.</p></div></div>
  <div class="grid grid-4">${c.subjects.map(s=>`<article class="card subject-card" data-go-subject="${c.id}|${s.id}"><div><div class="subject-icon">${s.icon}</div><h3>${esc(s.name)}</h3><p>${s.chapters.length} chapter${s.chapters.length===1?"":"s"}</p></div><button class="btn">Open →</button></article>`).join("")}</div>`;
}
function subjectPage(cid,sid){
  const c=getClass(cid),s=getSubject(cid,sid);if(!c||!s)return notFound();
  const rows=s.chapters.map(ch=>({...ch,className:c.name,subjectName:s.name}));
  return `<div class="page-head"><div><button class="btn" data-go-class="${cid}">← ${esc(c.name)}</button><div class="eyebrow" style="margin-top:16px">${esc(s.name)}</div><h1>Chapters</h1><p class="sub">${rows.length} chapter${rows.length===1?"":"s"} available.</p></div></div>
  <div class="filterbar"><input id="chapterFilter" placeholder="Search chapter…"></div>
  <div id="chapterList" class="list">${rows.length?rows.map(chapterRow).join(""):`<div class="empty">📚 No chapters added yet.<br><small>Add chapters from Content Manager.</small></div>`}</div>`;
}
function chapterRow(ch){
  const fav=loadJSON("sayeed_academy_favorites_v1",[]).includes(ch.id);
  return `<article class="card chapter-row" data-chapter-row data-search="${esc((ch.title+" "+ch.summary).toLowerCase())}">
    <div class="chapter-num">${ch.number}</div><div class="chapter-main"><strong>${esc(ch.title)}</strong><small>${ch.audioUrl?"🎧 Audio available":"📝 Summary ready • Audio pending"}</small></div>
    <div class="chapter-actions"><button class="btn" data-fav="${ch.id}" title="Favorite">${fav?"★":"☆"}</button><button class="play-btn" data-play="${ch.id}" title="Play">▶</button></div>
  </article>`;
}
function playerPage(id){
  const ch=allChapters().find(x=>x.id===id);if(!ch)return notFound();
  const fav=loadJSON("sayeed_academy_favorites_v1",[]).includes(id);
  return `<div class="page-head"><div><button class="btn" data-go-subject="${ch.classId}|${ch.subjectId}">← ${esc(ch.subjectName)}</button></div></div>
  <article class="card player-card"><div class="player-cover"><img src="./assets/icons/logo.png" alt=""><div class="player-title"><div class="eyebrow" style="color:#f6d477">${esc(ch.className)} • ${esc(ch.subjectName)}</div><h1>${esc(ch.title)}</h1><p class="sub">${esc(ch.summary)}</p></div></div>
  <div class="section"><h3>Chapter Summary</h3><div class="card" style="box-shadow:none;background:#f8fafc">${esc(ch.summary)}</div>
  <div class="audio-box">${ch.audioUrl?`<audio id="chapterAudio" controls preload="metadata" src="${esc(ch.audioUrl)}"></audio>`:`<div class="empty">🎧 Audio is not connected for this chapter yet.<br><small>Content Manager can store an audio URL now; R2 upload integration will be added in the next phase.</small></div>`}
  </div><div class="player-tools"><button class="btn ${fav?"btn-gold":""}" data-fav="${id}">${fav?"★ Favorited":"☆ Add to Favorites"}</button><button class="btn" data-share="${id}">↗ Share</button></div></div></article>`;
}
function favoritesPage(){
  const ids=loadJSON("sayeed_academy_favorites_v1",[]), rows=allChapters().filter(x=>ids.includes(x.id));
  return `<div class="page-head"><div><div class="eyebrow">Saved chapters</div><h1>Favorites</h1><p class="sub">Your saved chapters for quick revision.</p></div></div><div class="list">${rows.length?rows.map(chapterRow).join(""):`<div class="empty">☆ No favorites yet.<br><small>Tap ☆ on any chapter to save it.</small></div>`}</div>`;
}
function historyPage(){
  const rows=history();
  return `<div class="page-head"><div><div class="eyebrow">Your activity</div><h1>Listening History</h1><p class="sub">Recently played chapters on this device.</p></div>${rows.length?`<button class="btn btn-danger" id="clearHistory">Clear history</button>`:""}</div><div class="list">${rows.length?rows.map(x=>`<article class="card chapter-row"><div class="chapter-num">🎧</div><div class="chapter-main"><strong>${esc(x.title)}</strong><small>${esc(x.className)} • ${esc(x.subjectName)} • ${new Date(x.playedAt).toLocaleString()}</small></div><button class="play-btn" data-play="${x.id}">▶</button></article>`).join(""):`<div class="empty">◷ Nothing played yet.</div>`}</div>`;
}
function adminPage(){
  return `<div class="page-head"><div><div class="eyebrow">Local content manager</div><h1>Content Manager</h1><p class="sub">Add chapter metadata and an audio URL. This phase stores content locally; the secure Cloudflare R2 uploader is the next integration.</p></div></div>
  <div class="card"><form id="chapterForm"><div class="form-grid">
    <div class="field"><label>Class</label><select id="adminClass">${catalog.classes.map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join("")}</select></div>
    <div class="field"><label>Subject</label><select id="adminSubject"></select></div>
    <div class="field"><label>Chapter number</label><input id="adminNumber" type="number" min="1" required placeholder="1"></div>
    <div class="field"><label>Chapter title</label><input id="adminTitle" required placeholder="Chapter title"></div>
    <div class="field full"><label>Summary</label><textarea id="adminSummary" required placeholder="Short chapter summary…"></textarea></div>
    <div class="field full"><label>Audio URL (MP3/compatible audio)</label><input id="adminAudio" type="url" placeholder="https://…/chapter.mp3"></div>
  </div><div class="form-actions"><button class="btn" type="reset">Reset</button><button class="btn btn-primary">Add Chapter</button></div></form></div>
  <section class="section"><div class="section-head"><div><div class="eyebrow">Current local content</div><h2>Chapter inventory</h2></div></div><div class="list">${allChapters().length?allChapters().map(ch=>`<article class="card chapter-row"><div class="chapter-num">${ch.number}</div><div class="chapter-main"><strong>${esc(ch.title)}</strong><small>${esc(ch.className)} • ${esc(ch.subjectName)}</small></div><button class="btn btn-danger" data-delete="${ch.id}">Delete</button></article>`).join(""):`<div class="empty">No chapters yet.</div>`}</div></section>`;
}
function notFound(){return `<div class="empty"><h2>Page not found</h2><button class="btn btn-primary" data-route="home">Go Home</button></div>`}

function render(){
  setActive();
  if(route.name==="home")main.innerHTML=home();
  else if(route.name==="classes")main.innerHTML=classesPage();
  else if(route.name==="class")main.innerHTML=classPage(route.params.id);
  else if(route.name==="subject")main.innerHTML=subjectPage(route.params.cid,route.params.sid);
  else if(route.name==="chapter")main.innerHTML=playerPage(route.params.id);
  else if(route.name==="favorites")main.innerHTML=favoritesPage();
  else if(route.name==="history")main.innerHTML=historyPage();
  else if(route.name==="admin")main.innerHTML=adminPage();
  else main.innerHTML=notFound();
  bind();
  renderMini();
}
function bind(){
  document.querySelectorAll("[data-route]").forEach(b=>b.onclick=()=>go(b.dataset.route));
  document.querySelectorAll("[data-go-class]").forEach(b=>b.onclick=()=>go("class",{id:b.dataset.goClass}));
  document.querySelectorAll("[data-go-subject]").forEach(b=>b.onclick=()=>{const [cid,sid]=b.dataset.goSubject.split("|");go("subject",{cid,sid})});
  document.querySelectorAll("[data-play]").forEach(b=>b.onclick=()=>{const ch=allChapters().find(x=>x.id===b.dataset.play);if(ch){play(ch);go("chapter",{id:ch.id})}});
  document.querySelectorAll("[data-fav]").forEach(b=>b.onclick=()=>toggleFav(b.dataset.fav));
  document.querySelectorAll("[data-share]").forEach(b=>b.onclick=()=>shareChapter(b.dataset.share));
  const filter=document.getElementById("chapterFilter");if(filter)filter.oninput=()=>document.querySelectorAll("[data-chapter-row]").forEach(x=>x.style.display=x.dataset.search.includes(filter.value.toLowerCase())?"":"none");
  const clear=document.getElementById("clearHistory");if(clear)clear.onclick=()=>{clearHistory();notify("History cleared");render()};
  const search=document.getElementById("searchBtn");if(search)search.onclick=globalSearch;
  const gi=document.getElementById("globalSearch");if(gi)gi.onkeydown=e=>{if(e.key==="Enter")globalSearch()};
  const form=document.getElementById("chapterForm");if(form){refreshAdminSubjects();document.getElementById("adminClass").onchange=refreshAdminSubjects;form.onsubmit=addChapter}
  document.querySelectorAll("[data-delete]").forEach(b=>b.onclick=()=>deleteChapter(b.dataset.delete));
}
function globalSearch(){
  const q=(document.getElementById("globalSearch")?.value||"").trim().toLowerCase();if(!q)return;
  const rows=allChapters().filter(x=>(x.title+" "+x.subjectName+" "+x.className+" "+x.summary).toLowerCase().includes(q));
  main.innerHTML=`<div class="page-head"><div><div class="eyebrow">Search</div><h1>Results</h1><p class="sub">${rows.length} matching chapter${rows.length===1?"":"s"}.</p></div><button class="btn" data-route="home">← Home</button></div><div class="list">${rows.length?rows.map(chapterRow).join(""):`<div class="empty">No matching chapters found.</div>`}</div>`;bind();
}
function toggleFav(id){
  const rows=loadJSON("sayeed_academy_favorites_v1",[]),i=rows.indexOf(id);i>=0?rows.splice(i,1):rows.push(id);saveJSON("sayeed_academy_favorites_v1",rows);notify(i>=0?"Removed from favorites":"Added to favorites");render();
}
function shareChapter(id){
  const ch=allChapters().find(x=>x.id===id),url=location.href.split("#")[0]+"#chapter/"+id;
  if(navigator.share)navigator.share({title:ch?.title||"Sayeed Academy",text:ch?.summary||"",url}).catch(()=>{});
  else navigator.clipboard?.writeText(url).then(()=>notify("Chapter link copied"));
}
function refreshAdminSubjects(){
  const c=getClass(document.getElementById("adminClass").value),sel=document.getElementById("adminSubject");
  if(c&&sel)sel.innerHTML=c.subjects.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join("");
}
function addChapter(e){
  e.preventDefault();const cid=document.getElementById("adminClass").value,sid=document.getElementById("adminSubject").value,s=getSubject(cid,sid),c=getClass(cid);
  const ch={id:crypto.randomUUID(),number:Number(document.getElementById("adminNumber").value),title:document.getElementById("adminTitle").value.trim(),summary:document.getElementById("adminSummary").value.trim(),audioUrl:document.getElementById("adminAudio").value.trim()};
  if(!ch.title||!ch.summary)return notify("Please complete required fields");
  s.chapters.push(ch);s.chapters.sort((a,b)=>a.number-b.number);saveCatalog(catalog);notify(`Chapter added to ${c.name} • ${s.name}`);e.target.reset();refreshAdminSubjects();render();
}
function deleteChapter(id){
  if(!confirm("Delete this chapter from local content?"))return;
  for(const c of catalog.classes)for(const s of c.subjects){s.chapters=s.chapters.filter(x=>x.id!==id)}
  saveCatalog(catalog);notify("Chapter deleted");render();
}
function renderMini(){
  const item=currentItem();if(!item||!item.audioUrl){mini.classList.add("hidden");return}
  const a=getAudio();mini.classList.remove("hidden");mini.innerHTML=`<div class="mini-inner"><img src="./assets/icons/logo.png" alt=""><div class="mini-copy"><strong>${esc(item.title)}</strong><small>${esc(item.subjectName||"")}</small></div><button class="btn" id="miniPlay">▶/⏸</button><audio controls src="${esc(item.audioUrl)}"></audio></div>`;
  const miniAudio=mini.querySelector("audio");if(a){miniAudio.currentTime=a.currentTime||0;miniAudio.playbackRate=a.playbackRate||1;miniAudio.onplay=()=>{}}
}
initPlayer(ev=>{if(ev.type==="no-audio"){notify("Audio is not connected for this chapter yet.");return}if(ev.type==="start"||ev.type==="pause"||ev.type==="ended")renderMini()});
document.getElementById("themeBtn").onclick=()=>{document.body.classList.toggle("dark");localStorage.setItem("sayeed_theme",document.body.classList.contains("dark")?"dark":"light")};
document.getElementById("menuBtn").onclick=()=>sidebar.classList.toggle("open");
document.getElementById("brandHome").onclick=()=>go("home");
document.getElementById("brandHome").onkeydown=e=>{if(e.key==="Enter")go("home")};
if(localStorage.getItem("sayeed_theme")==="dark")document.body.classList.add("dark");

function parseHash(){
  const parts=location.hash.replace(/^#/,"").split("/").filter(Boolean);
  if(!parts.length)return go("home");
  if(parts[0]==="classes")return go("classes");
  if(parts[0]==="class")return go("class",{id:parts[1]});
  if(parts[0]==="subject")return go("subject",{cid:parts[1],sid:parts[2]});
  if(parts[0]==="chapter")return go("chapter",{id:parts[1]});
  if(parts[0]==="favorites")return go("favorites");
  if(parts[0]==="history")return go("history");
  if(parts[0]==="admin")return go("admin");
  return go("home");
}
window.addEventListener("hashchange",parseHash);
parseHash();
