---
standard: Node.js release lines and support
source: https://nodejs.org/en/about/previous-releases (schedule data at https://github.com/nodejs/Release)
version: release schedule as of 2026-10-28
retrieved: 2026-10-28
next-check: 2027-04-22
licence: Copyright OpenJS Foundation and Node.js contributors; schedule summarised with attribution
---
# Node.js — digest

Which line to run on, and when that changes. The next-check date is
the April before v22's end of life (2027-04-30), when v27 reaches
Current; the October re-check on 2026-10-28 found the transitions
below, v24's on 2026-10-20 and v26's scheduled for 2026-10-28.

## Rules that bite here

- Pin an LTS line and say so in the profile and `package.json`
  (`engines`). As of 2026-10-28: v24 Krypton is Maintenance LTS by its dates
  (LTS since 2025-10-28, maintenance since 2026-10-20, end of life
  2028-04-30; the README table still says Active LTS); v22 Jod is Maintenance LTS (end of life 2027-04-30);
  v20 Iron is end of life (2026-04-30) and must not be used; v26 has
  its Active LTS start scheduled for 2026-10-28 (maintenance
  2027-10-20, end of life 2029-04-30), its codename blank in the
  schedule file and the README table still labelling it Current.
  v27 is in Alpha from 2026-10-28 (Current 2027-04-22, LTS
  2027-10-20, end of life 2030-04-30). From v27 every line is
  promoted to LTS and stays Active LTS for 30 months with no
  Maintenance phase; v26 and earlier follow the older schedule.
- Move lines deliberately: a change of the pinned line is a decision,
  made when the current line enters maintenance, not when it dies.
- ES modules by default; no build step that the gate cannot run.
- Dependencies are the project's own rule, stated in the profile, not
  Node's.

## Checklist by task type

- New project or upgrade: `engines` set to the pinned line; the gate
  runs on it; CI matches it.
- Any dependency change: the profile's dependency rule and a decision.
- October each year: re-check the schedule; plan the move before the
  line enters maintenance. From v27, which has no Maintenance phase,
  read the trigger again at the April 2027 check.
- When the schedule file's dates and the README table's status labels
  disagree, the dates are the schedule; note the lag.

## Exceptions recorded

- none.

## Deeper references

- Release schedule: <https://nodejs.org/en/about/previous-releases>
- Machine-readable schedule:
  <https://raw.githubusercontent.com/nodejs/Release/main/schedule.json>
- Documentation: <https://nodejs.org/docs/latest-v24.x/api/>
