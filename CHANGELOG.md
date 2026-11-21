# DevizPRO — Changelog

Istoricul este cumulativ. Nu șterge și nu rescrie intrările anterioare; adaugă corecții ca note noi.

## V45 — 12.11.2026 — AI Core & documentație cumulativă
- Bază: V44 PRO.
- Versiunea publică sincronizată la V45 în meta, titlu și antet.
- Service Worker cache incrementat la identificator V45.
- Adăugat protocolul strict `00_MANDATORY_INSTRUCTIONS.md`.
- Adăugat jurnalul conversațional disponibil `USER_CHAT_LOG_HISTORY.md`; istoricul anterior incomplet este etichetat ca rezumat, nu transcriere integrală.
- Adăugate `PROJECT_HISTORY.md`, `VERSION_STATE.json`, `TECHNICAL_DECISIONS.md`, `CODE_EXPLANATIONS.md`, `PENDING_WORK.md`.
- Actualizate README, specificația, cerințele, arhitectura, bugurile și checklist-ul.
- Codul principal al aplicației este moștenit din V44; V45 nu implementează încă redesign-ul avansat Măsurători.
- Utilizatorul nu testase V44 la momentul creării V45; V45 nu este declarată stabilă.

## V44 — 12.11.2026 — restabilizare
- Reconstruită din V42 după eșecul V43.
- Antet V44 și cache V44.
- Eliminat CSS-ul care desena semnul MINUS decorativ duplicat pe selectorul MERGE; acțiunea funcțională `− Minus` este păstrată conform documentației V44.
- Adăugată documentație inițială de proiect.
- Nu au fost implementate toate cerințele avansate pentru carduri, MOVE, editor foto, MINUS și grupare.
- Utilizatorul nu a instalat/testat V44 înainte de solicitarea V45.

## V43 — 12.11.2026 — eșec, nu release valid
- Utilizatorul a raportat că instalarea se comporta ca V42 și README-ul indica V42.
- Utilizatorul a raportat că Măsurători nu mai funcționa.
- Documentația V44 consemnează erori de sintaxă în scripturile inline `dpV38Core` și `dpV42ShareAndSpreadsheet` din arhivele V43 analizate.
- Nu se folosește ca bază.

## V42 — 11.11.2026 — bază recuperată
- README-ul V42 descrie Măsurători, MERGE, MINUS/Clipping, fotografii, integrarea cu Deviz nou și funcții de export/partajare.
- Verificarea efectuată în etapa V44 a raportat că blocurile JavaScript inline V42 treceau `node --check`.

## V1–V41 — istoric incomplet
- Arhivele originale complete nu sunt disponibile în contextul acestei versiuni.
- Nu se inventează funcții exacte pe fiecare versiune. Detaliile recuperate din documentația V42/V44 sunt marcate ca atare în `PROJECT_HISTORY.md`.

---

# DevizPRO — Changelog (English)

The changelog is cumulative. Never delete or rewrite previous entries; append corrections as new dated notes.

## V45 — 12 November 2026 — AI Core and cumulative documentation

- Base: V44 PRO.
- Public version synchronized to V45 in meta tag, page title, and visible header.
- Service Worker cache identifier incremented to V45.
- Added strict `00_MANDATORY_INSTRUCTIONS.md` protocol.
- Added available conversation record `USER_CHAT_LOG_HISTORY.md`; incomplete older history is labelled as summary, not a full transcript.
- Added project history, JSON state, technical decisions, code explanations, and backlog.
- Updated README, specification, requirements, architecture, bug log, and checklist.
- Main application code is inherited from V44; V45 does not yet implement the advanced Measurements redesign.
- User had not tested V44 when V45 was created; V45 is not declared stable.

## V45 bilingual documentation update — 12 November 2026

- Added English content alongside Romanian in every human-readable project document.
- Added a consolidated bilingual Word document for reading and learning.
- Kept application code, storage schemas, and public application version unchanged.
- Added explicit test-status notes; no physical device test is claimed.

## V44 — 12 November 2026 — restoration build

- Rebuilt from V42 after the reported V43 failure.
- Visible V44 header and V44 Service Worker cache identifier.
- Documented removal of the decorative duplicate MINUS pseudo-element while retaining the actual MINUS action; device confirmation pending.


## V2 E1 — 21.11.2026
### Schimbări aplicate
- Începută seria nouă de ediții: V2 E1.
- Versiunea V45 eliminată din antetul vizibil al aplicației.
- Titlul filei browserului și meta application-version actualizate la V2 E1.
- Cache-ul Service Worker actualizat la identificatorul unic V2 E1.
- Codul și datele moștenite sunt păstrate; nu s-au schimbat cheile localStorage/IndexedDB.

### Plan confirmat pentru edițiile următoare
- Carduri Măsurători compacte; pictograma selectorului în stânga selectorului de tip; butonul plus în dreapta.
- Acțiunile Adaugă / Salvează în setări / X apar numai în fereastra deschisă prin plus.
- MINUS existent se păstrează și se integrează în cardul compact.
- Fotografii asociate obiectului și agregate automat în galeria încăperii; fotografii generale ale încăperii separat.
- Pictograme personalizate, recente și biblioteca aplicației.
- Reordonare prin drag-and-drop și butoane sus/jos.
- Home, navigare adaptivă telefon/tabletă/desktop, butoane Înapoi și Setări reorganizate.

### Testare și limite
- Verificarea sintaxei JavaScript și integrității arhivei se execută pentru E1.
- Testarea în browser și pe iPad/telefon/desktop nu este efectuată de acest build.
- Redesign-ul funcțional rămâne în lucru; vezi PENDING_WORK.md.
