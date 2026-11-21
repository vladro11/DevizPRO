
(()=>{"use strict";
const $=(s,r=document)=>r.querySelector(s);
const root=document.documentElement, body=document.body;
const pointer={last:"unknown"};
addEventListener("pointerdown",e=>{pointer.last=e.pointerType||"unknown";body.classList.toggle("dp-stylus-mode",pointer.last==="pen");},{passive:true});
function viewport(){
 const vv=window.visualViewport;
 if(!vv||innerWidth>900){body.classList.remove("dp-keyboard-open");root.style.removeProperty("--dp-keyboard-offset");return}
 const delta=Math.max(0,innerHeight-vv.height-vv.offsetTop);
 const open=delta>130;
 body.classList.toggle("dp-keyboard-open",open);
 root.style.setProperty("--dp-keyboard-offset",open?`${delta+8}px`:"0px");
}
if(window.visualViewport){visualViewport.addEventListener("resize",viewport);visualViewport.addEventListener("scroll",viewport)}
addEventListener("resize",viewport);document.addEventListener("focusin",e=>{if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))setTimeout(viewport,80)});
document.addEventListener("focusout",()=>setTimeout(viewport,180));
const nav=$("#nav");
if(nav){
 nav.setAttribute("aria-label","Navigare principală");
 const primary=["home","quote","measurements","more"];
 nav.querySelectorAll("button[data-page]").forEach(b=>{b.dataset.primary=String(primary.includes(b.dataset.page));});
 const m=nav.querySelector('[data-page="measurements"]');if(m){m.setAttribute("aria-label","Măsurări");const t=m.querySelector(".nav-label");if(t)t.textContent="Măsurări"}
}
const DB="devizpro-v2-local-history", STORE="snapshots", SNAPKEY="dp_v2_last_snapshot";
function openDB(){return new Promise((resolve,reject)=>{if(!indexedDB)return reject(Error("IndexedDB indisponibil"));const req=indexedDB.open(DB,1);req.onupgradeneeded=()=>req.result.createObjectStore(STORE,{keyPath:"id",autoIncrement:true});req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
function getAppData(){const data={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&(/^(dp_|devizpro)/i.test(k))&&k!==SNAPKEY){try{data[k]=localStorage.getItem(k)}catch(_){}}}return data}
let snapTimer=0;
function scheduleSnapshot(){clearTimeout(snapTimer);snapTimer=setTimeout(async()=>{try{const data=getAppData(),size=JSON.stringify(data).length;if(size>18_000_000)return;const db=await openDB();await new Promise((resolve,reject)=>{const tx=db.transaction(STORE,"readwrite");tx.objectStore(STORE).add({createdAt:new Date().toISOString(),data,bytes:size});tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)});const tx=db.transaction(STORE,"readwrite"),store=tx.objectStore(STORE),all=store.getAll();all.onsuccess=()=>{const rows=all.result.sort((a,b)=>b.id-a.id);rows.slice(8).forEach(r=>store.delete(r.id))};db.close()}catch(e){console.warn("DevizPRO local snapshot:",e.message)}},1400)}
try{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){const result=original.call(this,k,v);if(this===localStorage&&(/^(dp_|devizpro)/i.test(k))&&k!==SNAPKEY)scheduleSnapshot();return result}}catch(_){}
function download(name,blob){const a=document.createElement("a"),u=URL.createObjectURL(blob);a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1500)}
function exportBackup(){const payload={format:"DevizPRO-Backup",schema:1,createdAt:new Date().toISOString(),appVersion:"2.1.0",data:getAppData()};download(`DevizPRO-backup-${new Date().toISOString().slice(0,10)}.json`,new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}))}
function importBackup(file){const reader=new FileReader();reader.onload=()=>{try{const p=JSON.parse(reader.result);if(p.format!=="DevizPRO-Backup"||!p.data||typeof p.data!=="object")throw Error("Format backup nerecunoscut");if(!confirm("Restaurarea va înlocui datele DevizPRO existente din acest browser. Se creează mai întâi un punct local de revenire. Continui?"))return;scheduleSnapshot();Object.entries(p.data).forEach(([k,v])=>{if(/^(dp_|devizpro)/i.test(k)&&typeof v==="string")localStorage.setItem(k,v)});alert("Backup restaurat. Aplicația se va reîncărca.");location.reload()}catch(e){alert("Nu s-a putut restaura backup-ul: "+e.message)}};reader.readAsText(file)}
function installBackupControls(){
 const head=$(".headrow");if(!head||$("#dpBackupBtn"))return;
 const wrap=document.createElement("div");wrap.style.cssText="display:flex;align-items:center;gap:7px";
 const btn=document.createElement("button");btn.id="dpBackupBtn";btn.type="button";btn.textContent="Backup";btn.title="Exportă datele DevizPRO";btn.style.cssText="padding:7px 10px;border-radius:9px;background:#ffffff18;color:#fff;font-size:11px;box-shadow:none";
 const file=document.createElement("input");file.type="file";file.accept="application/json,.json";file.hidden=true;
 const restore=document.createElement("button");restore.type="button";restore.textContent="↥";restore.title="Restaurează backup";restore.style.cssText=btn.style.cssText+";font-size:16px";
 btn.addEventListener("click",exportBackup);restore.addEventListener("click",()=>file.click());file.addEventListener("change",()=>{if(file.files[0])importBackup(file.files[0]);file.value=""});
 wrap.append(btn,restore,file);head.append(wrap);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",installBackupControls);else installBackupControls();
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden")scheduleSnapshot()});
window.addEventListener("pagehide",scheduleSnapshot);
window.DevizPROv2={exportBackup,device:()=>({width:innerWidth,height:innerHeight,pointer:pointer.last,coarse:matchMedia("(pointer:coarse)").matches})};
})();
