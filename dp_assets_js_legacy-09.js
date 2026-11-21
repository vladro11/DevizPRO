
(()=>{
'use strict';
const trV42=(ro,ru)=>typeof t==='function'?t(ro,ru):ro;
const quoteById=id=>Array.isArray(quotes)?quotes.find(q=>String(q.id)===String(id)):null;
const safeName=value=>String(value||'DevizPRO').normalize('NFKD').replace(/[\\/:*?"<>|]+/g,'-').replace(/[^\p{L}\p{N}._ -]/gu,'').trim().replace(/\s+/g,'-').slice(0,70)||'DevizPRO';
const csvCell=value=>'"'+String(value??'').replace(/\r?\n/g,' ').replace(/"/g,'""')+'"';
const numberCsv=value=>{const n=Number(value)||0;return n.toFixed(2).replace(/\.00$/,'').replace(/(\.\d*[1-9])0+$/,'$1').replace('.',',')};
function quoteCsv(q){
 const rows=[];rows.push(['Nr. / №','Cod / Код','Denumire lucrare (RO)','Наименование работы (RU)','U.M. / Ед.','Preț unitar / Цена','Cantitate / Количество','Reducere % / Скидка','Total / Итого']);
 let n=0,hiddenLocation=false;
 (q.lines||[]).forEach(l=>{
  if(l.kind==='location'){hiddenLocation=!!l.hidden;if(!hiddenLocation)rows.push(['','','LOCAȚIE: '+(l.name||''),'ЛОКАЦИЯ: '+(l.name||''),'','','','','']);return;}
  if(l.hidden||hiddenLocation)return;
  n++;rows.push([n,l.code||'',l.ro||l.name||'',l.ru||'',l.unit||'',numberCsv(l.price),numberCsv(l.qty),numberCsv(l.rate||l.discount||0),numberCsv(l.total??((Number(l.price)||0)*(Number(l.qty)||0)))]);
 });
 rows.push(['','','','','','','','TOTAL DE PLATĂ / ИТОГО К ОПЛАТЕ',numberCsv(q.net)]);
 if(q.advanceOn){rows.push(['','','','','','','','AVANS PRIMIT / ПОЛУЧЕННЫЙ АВАНС',numberCsv(q.advanceAmount)]);rows.push(['','','','','','','','REST DE ÎNCASAT / ОСТАТОК К ПОЛУЧЕНИЮ',numberCsv(Math.max(0,(Number(q.net)||0)-(Number(q.advanceAmount)||0)))]);}
 return '\uFEFF'+rows.map(row=>row.map(csvCell).join(';')).join('\r\n');
}
function quoteText(q){return typeof quoteTextForClient==='function'?quoteTextForClient(q):`${q.name||'DevizPRO'}\n${q.client||''}\n${(q.lines||[]).map((l,i)=>`${i+1}. ${l.ro||l.name||''} / ${l.ru||''} — ${l.qty||1} ${l.unit||''} × ${l.price||0} = ${l.total||0}`).join('\n')}\nTOTAL: ${q.net||0} ${q.currency||'MDL'}`;}
function downloadCSV(q){const data=quoteCsv(q),name='DevizPRO-'+safeName(q.name||q.client)+'-'+(q.date||'')+'.csv';if(typeof downloadBlob==='function')downloadBlob(data,name,'text/csv;charset=utf-8');else{const a=document.createElement('a'),u=URL.createObjectURL(new Blob([data],{type:'text/csv;charset=utf-8'}));a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),2000)}return {data,name};}
window.dpV42ExportSavedCSV=()=>{const q=quoteById(window.__dpSavedQuoteId);if(!q){alert(trV42('Devizul salvat nu a fost găsit.','Сохранённая смета не найдена.'));return}downloadCSV(q)};
window.dpV42ShareQuote=id=>{
 const q=quoteById(id);if(!q){alert(trV42('Devizul nu a fost găsit.','Смета не найдена.'));return}
 const text=quoteText(q),data=quoteCsv(q),name='DevizPRO-'+safeName(q.name||q.client)+'-'+(q.date||'')+'.csv';
 let file=null;try{file=new File([data],name,{type:'text/csv;charset=utf-8'})}catch{}
 if(file&&navigator.share&&navigator.canShare){try{if(navigator.canShare({files:[file]})){const p=navigator.share({files:[file],title:q.name||'DevizPRO',text:trV42('Devizul este atașat în format CSV pentru Excel / Numbers.','Смета прикреплена в формате CSV для Excel / Numbers.')});p?.catch(err=>{if(err?.name!=='AbortError')console.warn('Share cancelled or unavailable',err)});return}}catch(err){console.warn('File sharing unavailable',err)}}
 if(navigator.share){downloadCSV(q);try{const p=navigator.share({title:q.name||'DevizPRO',text});p?.catch(err=>{if(err?.name!=='AbortError')window.dpV42ShowShareOptions(id)});return}catch(err){console.warn('Text sharing unavailable',err)}}
 downloadCSV(q);window.dpV42ShowShareOptions(id);
};
window.dpV42ShareSavedQuote=()=>{if(!window.__dpSavedQuoteId)return alert(trV42('Nu există un deviz salvat pentru partajare.','Нет сохранённой сметы для отправки.'));window.dpV42ShareQuote(window.__dpSavedQuoteId)};
window.dpV42ShowShareOptions=id=>{
 const q=quoteById(id);if(!q)return;let dlg=document.getElementById('dpV42ShareDialog');if(!dlg){dlg=document.createElement('dialog');dlg.id='dpV42ShareDialog';dlg.className='export-dialog';dlg.innerHTML=`<div class="between"><strong>${trV42('Partajează devizul','Поделиться сметой')}</strong><button class="export-close" type="button" onclick="document.getElementById('dpV42ShareDialog').close()">✕</button></div><p class="muted">${trV42('Alege aplicația. În aceste variante se trimite textul devizului; fișierul CSV a fost descărcat separat.','Выберите приложение. В этих вариантах отправляется текст сметы; CSV-файл скачан отдельно.')}</p><div class="dp-actions" style="display:grid;grid-template-columns:1fr 1fr"><button type="button" onclick="dpV42ShareChannel('whatsapp')">WhatsApp</button><button type="button" onclick="dpV42ShareChannel('telegram')">Telegram</button><button type="button" onclick="dpV42ShareChannel('viber')">Viber</button><button type="button" onclick="dpV42ShareChannel('email')">E-mail</button><button type="button" class="secondary" onclick="dpV42CopyShareText()">${trV42('Copiază textul','Копировать текст')}</button></div>`;document.body.appendChild(dlg)}dlg.dataset.quoteId=String(id);if(!dlg.open)dlg.showModal();
};
window.dpV42ShareChannel=channel=>{
 const dlg=document.getElementById('dpV42ShareDialog'),q=quoteById(dlg?.dataset.quoteId);if(!q)return;const text=quoteText(q),subject=trV42('Deviz: ','Смета: ')+(q.name||q.client||'DevizPRO'),enc=encodeURIComponent(text);let url='';
 if(channel==='whatsapp')url='https://wa.me/?text='+enc;
 else if(channel==='telegram')url='https://t.me/share/url?url=&text='+enc;
 else if(channel==='viber')url='viber://forward?text='+enc;
 else if(channel==='email')url='mailto:?subject='+encodeURIComponent(subject)+'&body='+enc;
 if(url){const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove();}
};
window.dpV42CopyShareText=()=>{const dlg=document.getElementById('dpV42ShareDialog'),q=quoteById(dlg?.dataset.quoteId);if(q&&typeof copyTextToClipboard==='function')copyTextToClipboard(quoteText(q))};
function injectShareButtons(root){if(!root)return;root.querySelectorAll('button[onclick*="copySavedQuoteText("]').forEach(copy=>{const m=(copy.getAttribute('onclick')||'').match(/copySavedQuoteText\('([^']+)'\)/);if(!m||copy.parentElement.querySelector('[data-v42-share]'))return;const b=document.createElement('button');b.type='button';b.className='secondary small dp-icon-action';b.title=trV42('Partajează devizul','Поделиться сметой');b.setAttribute('aria-label',b.title);b.dataset.v42Share='1';b.textContent='↗';b.onclick=()=>window.dpV42ShareQuote(m[1]);copy.insertAdjacentElement('afterend',b)});
 root.querySelectorAll('#quoteGroups .work').forEach(row=>{const open=row.querySelector('button[onclick*="loadQuote("]');if(!open||row.querySelector('[data-v42-share]'))return;const m=(open.getAttribute('onclick')||'').match(/loadQuote\('([^']+)'\)/);if(!m)return;const b=document.createElement('button');b.type='button';b.className='secondary small';b.textContent='↗';b.title=trV42('Partajează devizul','Поделиться сметой');b.dataset.v42Share='1';b.onclick=()=>window.dpV42ShareQuote(m[1]);open.parentElement.insertBefore(b,open.nextSibling)});
}
const oldLedger=window.renderLedger;if(typeof oldLedger==='function')window.renderLedger=function(...args){const out=oldLedger.apply(this,args);injectShareButtons(document);return out};
const oldGroups=window.renderQuoteGroups;if(typeof oldGroups==='function')window.renderQuoteGroups=function(...args){const out=oldGroups.apply(this,args);injectShareButtons(document);return out};
setTimeout(()=>injectShareButtons(document),0);
})();
