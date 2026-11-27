# Architecture — UoN Video Tools

Updated: 2026-11-27

<!-- pm-next architecture record, specification 3.26 — keep this line -->

<!-- pm-next v3.1's optional architecture record (specification 3.26),
     adopted by UVT-8 on the owner's "retrofit everything in full": the
     whole system as the root sees it, the lobby and the two tools.
     Never in the base read: rules.md's By-task row routes to it, "a
     container, external system, boundary or interface change |
     project/architecture.md | 400 | none". A change that adds, removes
     or renames an external system or a container, moves the system's
     boundary or changes how two of them talk updates this file in the
     same change, and its Updated line; so does a person added, removed
     or renamed, which the row does not name. Each tool's own record
     draws its inside: finisher/project/architecture.md and
     name-graphics/project/architecture.md. Directories belong in
     structure.md, not here. The checker reads only the envelope: the
     title, one Updated line, ## System context and ## Containers, each
     with one mermaid fence and its ### Text alternative. -->

## System context

What runs today is drawn in solid lines; what later items bring is
drawn apart, in dashed lines and marked planned. Each tool's own
outside systems, such as the device's files, are in its own record.

```mermaid
flowchart LR
  accTitle: UoN Video Tools, system context
  accDescr: Staff open the lobby and the tools on GitHub Pages' preview, in their own browser, and students can open a tool there; the owner directs the work in GitHub, whose one workflow gates every push to main and publishes the preview; Xerte, the public home where students will start, and the owner's uploads to it are planned.
  staff(["Person: a member of University staff"])
  student(["Person: a student"])
  owner(["Person: the owner"])
  system["System: UoN Video Tools<br>a lobby and two browser-only tools, all static files"]
  github["External system: GitHub<br>the repository and its one workflow"]
  pages["External system: GitHub Pages<br>the unadvertised preview from main"]
  staff -->|"opens the lobby and the tools on the preview"| system
  student -->|"can open a tool on the preview"| system
  owner -->|"directs the work, pushed to main"| github
  github -->|"gates every push to main, then publishes the built site"| pages
  pages -->|"serves the lobby and each tool"| system
  subgraph planned["Planned, not yet built"]
    xerte["External system: Xerte<br>the public home"]
  end
  owner -.->|"planned: uploads each release by hand, a flat package"| xerte
  xerte -.->|"planned: serves the Finisher, VH-14, Name Graphics, VNG-9, and the lobbies, UVT-6.10"| system
  student -.->|"planned: opens the student lobby on Xerte"| system
```

### Text alternative

- Staff open the lobby and both tools on the preview, the unadvertised
  site on GitHub Pages; each tool runs in their own browser. The
  preview is public, so a student can open a tool there too.
- The owner directs the work in the repository on GitHub; every push to
  `main` runs the one workflow, which gates every tool and the root,
  then publishes the built site to GitHub Pages.
- GitHub Pages serves the lobby at the top and each tool in its folder.
- Xerte is the planned public home. The owner uploads each release
  there by hand as a flat package. The Finisher's 0.3.1 is cut and waits on
  that upload (VH-14); Name Graphics' first release is VNG-9; a staff
  and a student lobby there link to the tools, and students start from
  the student lobby (UVT-6.10).

## Containers

```mermaid
flowchart LR
  accTitle: UoN Video Tools, containers
  accDescr: In the viewer's browser the lobby page links to the Finisher and to Name Graphics, and GitHub Pages serves all three; Xerte serving the tools and the lobby's staff and student editions is planned.
  staff(["Person: a member of University staff"])
  student(["Person: a student"])
  subgraph boundary["System boundary: UoN Video Tools, in the viewer's browser"]
    lobby["Container: the lobby page<br>static HTML rendered at build time from lobby/Lobby.tsx, no script"]
    finisher["Container: UoN Video Finisher<br>a TypeScript app built by Vite, its job worker inside it, and on the preview its service worker"]
    names["Container: Video Name Graphics<br>a static page that cannot make a graphic yet"]
  end
  pages["External system: GitHub Pages"]
  staff -->|"opens"| lobby
  lobby -->|"links to its folder"| finisher
  lobby -->|"links to its folder"| names
  staff -->|"uses"| finisher
  staff -->|"uses"| names
  student -->|"can use, on the preview"| finisher
  student -->|"can use, on the preview"| names
  pages -->|"serves each from main's build"| lobby
  pages -->|"serves"| finisher
  pages -->|"serves"| names
  subgraph planned["Planned, not yet built"]
    xerte["External system: Xerte"]
  end
  xerte -.->|"planned: serves the Finisher's release, VH-14"| finisher
  xerte -.->|"planned: serves Name Graphics' release, VNG-9"| names
  xerte -.->|"planned: serves a staff and a student edition, UVT-6.10"| lobby
  student -.->|"planned: opens the student edition"| lobby
```

### Text alternative

- The lobby page is static HTML that the build renders from
  `lobby/Lobby.tsx`; it ships no script and no service worker, and
  links to each tool's folder on the same site.
- UoN Video Finisher is a TypeScript app built by Vite that runs in
  the viewer's browser, its job worker inside it; the preview's build
  adds its service worker, which the 0.3.1 release cut for Xerte
  predates (VH-161). Its own record draws them.
- Video Name Graphics is a static page that says it cannot make a
  graphic yet; its own backlog builds the tool, and its own record
  draws it.
- Staff open the lobby and use both tools, and a student can use
  either on the preview; GitHub Pages serves all three from `main`'s
  build.
- Planned: Xerte serves the Finisher's release (VH-14), Name Graphics'
  (VNG-9) and a staff and a student edition of the lobby (UVT-6.10);
  students open the student edition.
- `shared/` is source both tools build in, not a container: it runs
  only inside each tool.
