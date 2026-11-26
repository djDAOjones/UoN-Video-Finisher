# Brief — Video Name Graphics

<!-- Owner-signed. Direction lives here and in the backlog; agents do
     not change it without a decision. Full brief: 1,500-word guideline,
     warn only. Rule 1 reads Direction every session: under 150 words
     (hard budget). Read the full brief at kick-off, after a substantial
     amendment, in the plan verb, and when Direction does not answer.
     Written by the intake on 2026-11-05 from the owner's description in
     session. -->

## Direction

A static, browser-only app that makes a name graphic, a lower third
with a name and an optional second line, from a short form. It saves a
transparent video to lay over other video in Clipchamp, native 4K with
an HD option, or a still PNG, as small and as cheap to make as the
format allows; nothing typed leaves the device. Brands are packs
chosen at build time: the neutral build carries no University branding;
the UoN build adds UoN styles and the UoN look, with the neutral styles
beside them. It inherits the UoN Video Finisher's simple, accessible
form and look: WCAG 2.2 AAA, Carbon productive design in our own code,
en-GB, zh-Hans and ms-MY. Public on a UoN Xerte upload; GitHub Pages is
the unadvertised preview from `main`.

## What we are building

A sibling to the UoN Video Finisher. A member of staff or a student
types a name and, if they want one, a second line such as a role or a
course, picks a style, and saves the graphic. The graphic is made on
their own machine, in the browser, and saved as a transparent video
that Clipchamp lays over their footage, or as a still PNG for any
editor. 4K is the native size; HD is an option for a smaller, quicker
file. It is not an editor: no timeline, no keyframes, no free choice of
font or colour beyond what a style offers.

The app is built to travel. The University of Nottingham's styles and
look come from a brand pack; a build without it is a complete,
unbranded app that another organisation can host as it is or give its
own pack. Even the UoN build offers unbranded styles.

## Who it is for

Staff and students on the University's three campuses, in the UK,
China and Malaysia, making their own videos in Clipchamp, most of them
not video specialists; and, through the neutral build, anyone outside
the University.

## Constraints

- Browser-only, static hosting, no server and no upload; Chrome with WebCodecs, as the Finisher [guess]
- Output: transparent video, 3840 × 2160 native, 1920 × 1080 option; still PNG; the video format is the one Clipchamp keeps transparent, settled by VNG-3
- Small and cheap: short graphics, the smallest file and the least computation the format allows
- WCAG 2.2 AAA and Carbon productive for the page in every brand pack
- Three page languages, en-GB, zh-Hans and ms-MY; the graphic's text is whatever the person types, in any script
- Code copied from the Finisher names its source commit; no shared package until a third app needs one

## Out of scope

- Editing or compositing the person's own video; that is the Finisher's territory
- Free choice of fonts, colours or animation outside a style
- Batch graphics from a list [guess: a later possibility]

## Open questions

- Which transparent video format Clipchamp keeps, and at what size and cost (VNG-3)
- The UoN styles' design source: the owner's earlier lower-third projects, or new designs (VNG-7)
- How long a graphic runs, and whether it animates in and out [guess: a few seconds, set per style]

## Signed

- Owner (delegated, not reviewed): Joe, 2026-11-05 — see the INTAKE decision, 2026-11-05
