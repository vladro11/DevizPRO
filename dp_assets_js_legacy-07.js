
(function(){
 const icons={
  copy:'<path d="M8 8V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4"/><rect x="2" y="8" width="14" height="14" rx="2"/>',
  pdf:'<path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v7H7z"/>',
  edit:'<path d="M12 20h9"/><path d="m16.5 3.5 4 4L8 20l-5 1 1-5z"/>',
  delete:'<path d="M3 6h18M8 6V4h8v2m3 0-1 15H6L5 6m4 4v7m6-7v7"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 20h16"/>',
  open:'<path d="M14 3h7v7M10 14 21 3M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/>',
  receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3"/>',
  print:'<path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v7H7z"/>',
  close:'<path d="m6 6 12 12M18 6 6 18"/>'
 };
 function svg(kind){return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'+(icons[kind]||icons.receipt)+'</svg>'}
 function iconify(){
  document.querySelectorAll('button').forEach(b=>{
   if(b.dataset.dpIconified==='1'||b.querySelector('svg'))return;
   const visibleText=(b.textContent||'').trim();
   const glyphOnly=visibleText.length<=4 || /dp-icon-action/.test(b.className);
   if(!glyphOnly)return;
   const label=((b.getAttribute('aria-label')||'')+' '+(b.title||'')+' '+(b.getAttribute('onclick')||'')+' '+visibleText).toLocaleLowerCase();
   let kind='';
   if(/copy|copia|clipboard/.test(label))kind='copy';
   else if(/delete|șterg|sterge|șterge|⌫|remove|dpdeleteworkreport/.test(label))kind='delete';
   else if(/edit|modific|redact|pencil|✎/.test(label))kind='edit';
   else if(/pdf|print|imprim|window\.print|receiptcopy/.test(label))kind='print';
   else if(/download|export|extras|⇩/.test(label))kind='download';
   else if(/loadquote|deschide|open/.test(label))kind='open';
   if(!kind)return;
   b.dataset.dpIconified='1';b.classList.add('dp-action-icon');b.setAttribute('aria-label',b.getAttribute('aria-label')||b.title||kind);if(!b.title)b.title=b.getAttribute('aria-label');b.innerHTML=svg(kind);
  });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',iconify);else iconify();
 const mo=new MutationObserver(()=>iconify());mo.observe(document.documentElement,{subtree:true,childList:true});
 // The report/receipt dialog must remain easy to close; Esc also returns to the app.
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){const d=document.getElementById('dpReceiptDialog');if(d?.open)d.close();}});
})();
