# DevizPRO V2 E2 — 21.11.2026

## Implemented in this archive
- Home dashboard extension: recorded income, recorded expenses, balance, open quote value, active quote count, upcoming appointments. Values are derived from existing local records; no sample figures are inserted.
- Explicit Back control on secondary pages and secondary-page navigation chrome behavior.
- Measurement object ordering controls (up/down) in addition to the existing drag handle; ordering keeps clipped child records attached to their parent where possible and refuses moves involving grouped objects rather than silently breaking a group.
- Compact measurement card dimensions and smaller photo placeholder on phone.
- Object type picker aligned beside the object pictogram and a dedicated plus button.
- Dedicated new-type dialog with separate Add-only-to-current-measurement and Save-to-general-settings actions.
- Existing storage keys retained; no deliberate migration or reset.
- App title remains DevizPRO; version is not displayed in the app body.

## Not certified / remaining work
- Custom uploaded pictogram library with rename/delete/recent-first ordering is not complete.
- Room photo aggregation/editor workflow needs further end-to-end validation.
- Settings category redesign and full responsive navigation QA remain incomplete.
- MINUS, MERGE, quote, payment, backup/restore and export workflows require full regression testing.
- No physical iPad, Android or Windows test was performed in this build session.
