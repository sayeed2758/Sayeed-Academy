
const KEY="sayeed_academy_catalog_v1";
export function loadCatalog(fallback){
  try{const raw=localStorage.getItem(KEY);return raw?JSON.parse(raw):structuredClone(fallback)}catch{return structuredClone(fallback)}
}
export function saveCatalog(data){localStorage.setItem(KEY,JSON.stringify(data));}
export function loadJSON(key,fallback){try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch{return fallback}}
export function saveJSON(key,value){localStorage.setItem(key,JSON.stringify(value));}
