
import {loadJSON,saveJSON} from "./storage.js";
const HISTORY_KEY="sayeed_academy_history_v1";
let audio=null,current=null,onChange=()=>{};
export function initPlayer(change){onChange=change}
export function play(item){
  if(!item?.audioUrl){onChange({type:"no-audio",item});return}
  if(!audio){audio=new Audio();audio.preload="metadata";audio.addEventListener("ended",()=>onChange({type:"ended",item:current}));audio.addEventListener("timeupdate",()=>onChange({type:"time",currentTime:audio.currentTime,duration:audio.duration||0}));}
  if(current?.id===item.id){audio.play().catch(()=>{});return}
  current=item;audio.src=item.audioUrl;audio.play().catch(()=>{});saveHistory(item);onChange({type:"start",item});
}
export function pause(){audio?.pause();onChange({type:"pause",item:current})}
export function toggle(item){if(current?.id===item.id&&audio&&!audio.paused){pause()}else play(item)}
export function setSpeed(speed){if(audio)audio.playbackRate=speed;onChange({type:"speed",speed})}
export function currentItem(){return current}
export function getAudio(){return audio}
function saveHistory(item){
  const rows=loadJSON(HISTORY_KEY,[]).filter(x=>x.id!==item.id);
  rows.unshift({id:item.id,title:item.title,className:item.className,subjectName:item.subjectName,playedAt:Date.now()});
  saveJSON(HISTORY_KEY,rows.slice(0,50));
}
export function history(){return loadJSON(HISTORY_KEY,[])}
export function clearHistory(){localStorage.removeItem(HISTORY_KEY)}
