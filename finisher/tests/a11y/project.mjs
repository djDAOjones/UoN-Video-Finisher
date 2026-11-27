/* global document, window, localStorage, MutationObserver, HTMLInputElement */
// The baseline of 2026-11-27 (VH-249): today's interface, the Finisher in HTML and .ts (index.html, src/main.ts),
// measured in the pack's browser, Playwright 1.56.1's Chromium 141.0.7390.37 headless shell, where start-up blocks.
// That browser refuses H.264 encode, so the System check reads "Output video format (H.264) Not supported", step 1
// says why, the file input stays disabled and no video can be chosen. The ruling (2026-11-27): the pack runs as
// installed, with no browser channel added. So the empty page is measured in its blocked form, and so are the states
// that open from it without a video. Every file state, file keyboard function and file journey stays declared and
// fails "start-up blocked", naming the System check's rows. That is 6 states, 5 keyboard functions and 6 journeys.
// The reviewed sequences (REVIEWED_READING, REVIEWED_TAB_ORDER) stay as a Chrome user meets the page, with start-up
// passed; where the blocked page differs, the row fails by the block, as the comment there says.
//
// The project's own declarations for the accessibility gate (V31-A11Y): its UI states, dialogs, keyboard functions
// and authored journeys, its server and the source the lint step reads. The pack writes this starter once and never
// overwrites it. Features live in project/a11y/coverage.json, not here. A state with no reviewed ARIA snapshot fails
// its snapshot test; an applicable row no journey claims fails its "not written" test.
//
// Declared so the rebuild can be measured against the same coverage. Run outside the gate, on a build served at the
// root: `npm run build` with BASE_PATH unset, then `npm run a11y`. Each snapshot below was captured from that build by
// `npm run a11y:sample` in the blocked page and reviewed (see SNAPSHOTS).
//
// A video is chosen through the real file input (Playwright's setInputFiles, or the file chooser a tap or a key opens).
// The test videos are made by ffmpeg, once, into the system's temporary folder, never in the checkout and never from
// samples/: bars and a 440 Hz tone, H.264 and AAC in MP4, as a recording would arrive. Set FFMPEG to name another binary.
// In the pack's browser none is made: every route to a video stops first at readyForAVideo, which throws on the block.
//
// Declared here: the empty page (also in zh-Hans and ms-MY), the about panel, the format help open in it, the
// accessibility statement, the system check, the feedback dialog open, showing its error, and with "What will be sent
// with it" open. These open while blocked. Also declared: a file that cannot be read, a video read with its verdict,
// the staff title card, the student submission card, a trim time refused, and a submission card refused by Create.
// These need a video, so in the pack's browser each fails "start-up blocked" and has no snapshot.
//
// Not declared, with the reason (the journeys below cover what they can of each):
// - A video being made: transient; a short job ends on its own within seconds, and every check reopens the state.
// - A finished video with Save, and the "discard it?" question: each open repeats the read, the device check and a
//   whole job, and the contrast check reopens the state once per stateful control (about ten), past the pack's fixed
//   60 s test timeout.
// - Saving, saved and save stopped: Save opens the browser's own save dialog (showSaveFilePicker), which the harness
//   cannot answer; a stub would not be today's interface.
// - A drop held over the zone, and a drop refused: the file must be dragged from the operating system; Playwright drags
//   only within the page, and synthetic drag events are not real input.
// - Errors captured: needs an uncaught error; the dev-only buttons that raise one are absent from the production build.
// - The start-up block as a state of its own: in Chrome start-up passes and the block never shows. In the pack's
//   browser every state above shows it, so the empty state measures it: the browser sentence above step 1, step 1's
//   status saying why, the file input disabled, and the System check open on its failed row (main.ts:925-928, :1422).
// - Reachable with other ffmpeg fixtures, left out to keep the run in budget: a silent video ("No audio."), one too
//   short to trim, one the preview refuses, a discouraged verdict ("Continue anyway"), the file states in zh-Hans and
//   ms-MY.
// - The statement open in zh-Hans and ms-MY: left out of this baseline by its brief.
import { spawnSync } from 'node:child_process';
import { Buffer } from 'node:buffer';
import { existsSync, mkdirSync, renameSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// The reviewed ARIA snapshots, one per state that opens, captured by `npm run a11y:sample` (its discovered.json) from
// the BASE_PATH-unset build of 2026-11-27 in the pack's browser, where start-up blocks, and reviewed against that page.
// Text that changes by build, run or date is a /regex/: the build id in the version line, the worker's round trip
// ("Ready in N ms"), the statement's dates, and the feedback details' version and log. A file state has none: it
// cannot open while start-up is blocked, so there is nothing to capture.
//
// The empty page, blocked. Banner: the logo, the "Page language" group with three radios (English checked) and its
// empty status. Main: the h1 and the "About this tool" button, its "?" (closed); the browser sentence (#browser-note,
// main.ts:925-927); step 1's region with its h2, the file input as a button named by the step and [disabled], the
// drop hint, the empty alert and the status saying why the tool cannot run (main.ts:1425-1456); the "Video type"
// group, Staff video checked, and its line; the page announcer's empty status. Contentinfo: the System check open at
// load on its failure (main.ts:928), "System check — 1 problem", its six rows, H.264 "Not supported"; the statement
// closed; the "Help and feedback" h2, three h3, two links, the "Report a problem" button, one link, the version line.
const EMPTY = String.raw`- link "Skip to main content":
  - /url: "#main"
- banner:
  - img "University of Nottingham"
  - group "Page language":
    - text: Page language
    - radio "English" [checked]
    - text: English
    - radio "中文"
    - text: 中文
    - radio "Bahasa Malaysia"
    - text: Bahasa Malaysia
    - status
- main:
  - heading "UoN Video Finisher" [level=1]
  - button "About this tool": "?"
  - paragraph: This tool is designed and built for Chrome, and this browser has not passed all the checks for it to run. The system check at the foot of the page says what is missing.
  - region "1. Choose a video":
    - heading "1. Choose a video" [level=2]
    - button "1. Choose a video" [disabled]
    - paragraph: Or drop it here.
    - alert
    - status: This browser cannot create the video format this tool needs, so the tool cannot run here. This copy of Chrome may be out of date, or a setting on this computer may have turned the feature off. Update Chrome, or ask whoever manages the computer.
  - group "Video type":
    - text: Video type
    - radio "Staff video" [checked]
    - text: Staff video
    - radio "Student submission"
    - text: Student submission
    - paragraph: You choose the closing graphics, and whether they say “Internal use only”.
  - status
- contentinfo:
  - group:
    - heading "System check — 1 problem" [level=2]
    - list:
      - listitem: Secure connection Available
      - listitem: Video processing (WebCodecs) Supported
      - listitem: Output video format (H.264) Not supported
      - listitem: Output audio format (AAC) Supported
      - listitem: Private working storage Available
      - listitem: /Background processing Ready in \d[\d,]* ms/
  - group:
    - heading "Accessibility statement" [level=2]
  - heading "Help and feedback" [level=2]
  - heading "Need help using the tool?" [level=3]
  - list:
    - listitem:
      - 'link "Staff: ask in the Creators team on Teams (new tab)"':
        - /url: https://teams.microsoft.com/l/team/19%3A14c7a4d2bf43456fa0c3c52c851fb097%40thread.tacv2/conversations?groupId=bd942b5f-5389-410c-abf2-9ba087360738&tenantId=67bda7ee-fd80-41ef-ac91-358418290a1e
    - listitem:
      - 'link "Students: get help through Self Service (new tab)"':
        - /url: https://selfservice.nottingham.ac.uk
  - heading "Something not working?" [level=3]
  - paragraph:
    - button "Report a problem"
  - heading "What do you think of the tool?" [level=3]
  - paragraph:
    - link "Please tell us what you think in the feedback form (new tab)":
      - /url: https://forms.cloud.microsoft/e/Meg347QQvs
  - paragraph: /v0\.3\.1\+\d{8}\.[0-9a-f]+/`;
// A state that opens from the blocked empty page: the empty template with the lines it adds after the line `at`, in
// place of the `drop` lines that follow it; a line the template does not hold stops the load.
function from(base, at, added, drop = 0) {
  const l = base.split('\n'), i = l.indexOf(at);
  if (i < 0) throw new Error(`tests/a11y/project.mjs: the snapshot template holds no line ${at}`);
  l.splice(i + 1, drop, ...added.split('\n'));
  return l.join('\n');
}
const H1 = '  - heading "UoN Video Finisher" [level=1]';
const SNAPSHOTS = {
  empty: EMPTY,
  // In zh-Hans and ms-MY: the page in the language, the language group's status naming it, the machine-translation
  // notice (#language-notice) as a region with its email link, and the same blocked page.
  'empty-zh-hans': String.raw`- link "跳至内容":
  - /url: "#main"
- banner:
  - img "University of Nottingham"
  - group "页面语言":
    - text: 页面语言
    - radio "English"
    - text: English
    - radio "中文" [checked]
    - text: 中文
    - radio "Bahasa Malaysia"
    - text: Bahasa Malaysia
    - status: 页面语言：中文。
- main:
  - region "机器翻译":
    - paragraph: 机器翻译
    - paragraph: 本页面由机器从英文翻译而来，部分措辞可能有误。
    - paragraph:
      - link "发送电子邮件至 joe.bell@nottingham.ac.uk，提出更好的措辞":
        - /url: mailto:joe.bell@nottingham.ac.uk?subject=UoN%20Video%20Finisher%20translation%3A%20%E4%B8%AD%E6%96%87
  - heading "UoN 视频成片工具" [level=1]
  - button "关于本工具": "?"
  - paragraph: 此工具专为 Chrome 浏览器设计和构建，但此浏览器尚未通过运行此工具所需的全部检查。页面底部的系统检查信息显示了缺失的功能。
  - region "1. 选择一个视频":
    - heading "1. 选择一个视频" [level=2]
    - button "1. 选择一个视频" [disabled]
    - paragraph: 或者把它拖放到这里。
    - alert
    - status: 此浏览器无法创建此工具所需的视频格式，因此该工具无法在此处运行。此 Chrome 浏览器版本可能已过期，或者此计算机上的某个设置可能已关闭此功能。请更新 Chrome 浏览器，或咨询计算机管理员。
  - group "视频类型":
    - text: 视频类型
    - radio "教职员工视频" [checked]
    - text: 教职员工视频
    - radio "学生提交作品"
    - text: 学生提交作品
    - paragraph: 由您选择结尾图形，以及是否显示“仅供内部使用”。
  - status
- contentinfo:
  - group:
    - heading "系统检查 — 1 个问题" [level=2]
    - list:
      - listitem: 安全连接 可用的
      - listitem: 视频处理（WebCodecs） 支持
      - listitem: 输出视频格式（H.264） 不支持
      - listitem: 输出音频格式（AAC） 支持
      - listitem: 私人工作存储 可用的
      - listitem: /后台处理 准备时间：\d[\d,]*毫秒/
  - group:
    - heading "无障碍声明" [level=2]
  - heading "帮助和反馈" [level=2]
  - heading "需要使用本工具的帮助？" [level=3]
  - list:
    - listitem:
      - link "教职员工：在 Teams 上的创作团队中提问（在新标签页中打开）":
        - /url: https://teams.microsoft.com/l/team/19%3A14c7a4d2bf43456fa0c3c52c851fb097%40thread.tacv2/conversations?groupId=bd942b5f-5389-410c-abf2-9ba087360738&tenantId=67bda7ee-fd80-41ef-ac91-358418290a1e
    - listitem:
      - link "学生：通过 Self Service 获取帮助（在新标签页中打开）":
        - /url: https://selfservice.nottingham.ac.uk
  - heading "有功能无法正常使用？" [level=3]
  - paragraph:
    - button "报告问题"
  - heading "您觉得本工具怎么样？" [level=3]
  - paragraph:
    - link "请在反馈表中告诉我们您的想法（在新标签页中打开）":
      - /url: https://forms.cloud.microsoft/e/Meg347QQvs
  - paragraph: /v0\.3\.1\+\d{8}\.[0-9a-f]+/`,
  'empty-ms-my': String.raw`- link "Langkau ke kandungan utama":
  - /url: "#main"
- banner:
  - img "University of Nottingham"
  - group "Bahasa halaman":
    - text: Bahasa halaman
    - radio "English"
    - text: English
    - radio "中文"
    - text: 中文
    - radio "Bahasa Malaysia" [checked]
    - text: Bahasa Malaysia
    - status: "Bahasa halaman: Bahasa Malaysia."
- main:
  - region "Terjemahan mesin":
    - paragraph: Terjemahan mesin
    - paragraph: Halaman ini diterjemahkan daripada bahasa Inggeris oleh komputer, jadi beberapa perkataan mungkin tidak tepat.
    - paragraph:
      - link "Cadangkan perkataan yang lebih baik melalui e-mel ke joe.bell@nottingham.ac.uk":
        - /url: mailto:joe.bell@nottingham.ac.uk?subject=UoN%20Video%20Finisher%20translation%3A%20Bahasa%20Malaysia
  - heading "Penyiap Video UoN" [level=1]
  - button "Perihal alat ini": "?"
  - paragraph: Alat ini direka bentuk dan dibina untuk Chrome, dan pelayar ini belum lulus semua pemeriksaan yang diperlukan untuk menjalankannya. Pemeriksaan sistem di kaki halaman menyatakan apa yang hilang.
  - region "1. Pilih video":
    - heading "1. Pilih video" [level=2]
    - button "1. Pilih video" [disabled]
    - paragraph: Atau letakkannya di sini.
    - alert
    - status: Pelayar ini tidak dapat mencipta format video yang diperlukan oleh alat ini, jadi alat ini tidak dapat dijalankan di sini. Salinan Chrome ini mungkin sudah lapuk atau tetapan pada komputer ini mungkin telah mematikan ciri ini. Kemas kini Chrome atau tanya sesiapa yang mengurus komputer tersebut.
  - group "Jenis video":
    - text: Jenis video
    - radio "Video staf" [checked]
    - text: Video staf
    - radio "Serahan pelajar"
    - text: Serahan pelajar
    - paragraph: Anda memilih grafik penutup, dan sama ada grafik itu memaparkan “Untuk kegunaan dalaman sahaja”.
  - status
- contentinfo:
  - group:
    - heading "Pemeriksaan sistem — 1 masalah" [level=2]
    - list:
      - listitem: Sambungan selamat Tersedia
      - listitem: Pemprosesan video (WebCodecs) Disokong
      - listitem: Format video keluaran (H.264) Tidak disokong
      - listitem: Format audio keluaran (AAC) Disokong
      - listitem: Storan kerja persendirian Tersedia
      - listitem: /Pemprosesan latar belakang Bersedia dalam \d[\d,]* ms/
  - group:
    - heading "Kenyataan kebolehcapaian" [level=2]
  - heading "Bantuan dan maklum balas" [level=2]
  - heading "Perlukan bantuan menggunakan alat ini?" [level=3]
  - list:
    - listitem:
      - 'link "Kakitangan: tanya dalam pasukan pencipta di Teams (dibuka dalam tab baharu)"':
        - /url: https://teams.microsoft.com/l/team/19%3A14c7a4d2bf43456fa0c3c52c851fb097%40thread.tacv2/conversations?groupId=bd942b5f-5389-410c-abf2-9ba087360738&tenantId=67bda7ee-fd80-41ef-ac91-358418290a1e
    - listitem:
      - 'link "Pelajar: dapatkan bantuan melalui Self Service (dibuka dalam tab baharu)"':
        - /url: https://selfservice.nottingham.ac.uk
  - heading "Ada sesuatu yang tidak berfungsi?" [level=3]
  - paragraph:
    - button "Laporkan masalah"
  - heading "Apakah pendapat anda tentang alat ini?" [level=3]
  - paragraph:
    - link "Sila beritahu kami pendapat anda dalam borang maklum balas (dibuka dalam tab baharu)":
      - /url: https://forms.cloud.microsoft/e/Meg347QQvs
  - paragraph: /v0\.3\.1\+\d{8}\.[0-9a-f]+/`,
  // The "?" [expanded] and the about panel under it: the five promises, the "?" beside the fourth (closed), the
  // privacy sentence.
  'about-open': from(EMPTY, H1, String.raw`  - button "About this tool" [expanded]: "?"
  - list:
    - listitem: Lets you trim unwanted footage from the start and end.
    - listitem: Adds opening and closing graphics.
    - listitem: Evens out the audio level for better audience experience.
    - listitem:
      - text: Saves in a reliable format.
      - button "About the video format": "?"
    - listitem: Makes the file the right size for your purpose.
  - paragraph: Your video is processed on your device, it is never uploaded, and the original file does not change.`, 1),
  // As about-open, with the format help's "?" [expanded] and its paragraph.
  'format-help-open': from(EMPTY, H1, String.raw`  - button "About this tool" [expanded]: "?"
  - list:
    - listitem: Lets you trim unwanted footage from the start and end.
    - listitem: Adds opening and closing graphics.
    - listitem: Evens out the audio level for better audience experience.
    - listitem:
      - text: Saves in a reliable format.
      - button "About the video format" [expanded]: "?"
      - paragraph: Videos come in many formats. Some play on one device but not another, or do not work with some apps. This tool saves your video as an MP4, the most interoperable video format. That means it plays on almost any phone, computer or website.
    - listitem: Makes the file the right size for your purpose.
  - paragraph: Your video is processed on your device, it is never uploaded, and the original file does not change.`, 1),
  // The statement's group open under its h2: its paragraphs, lists, seven h3, two links and four dates.
  'statement-open': from(EMPTY, '    - heading "Accessibility statement" [level=2]', String.raw`    - paragraph: This statement covers UoN Video Finisher, the page you are on.
    - paragraph: "We want as many people as possible to be able to use this tool. You should be able to:"
    - list:
      - listitem: Use it with a keyboard alone.
      - listitem: Use it with a screen reader, which reads out each stage and result.
      - listitem: Zoom in to 200% without the text going off the screen.
      - listitem: Use your own colours, and your computer’s high contrast mode.
      - listitem: Turn off movement on the page in your computer’s settings.
    - paragraph: The words are plain, and the text has strong contrast with its background.
    - heading "How accessible this tool is" [level=3]
    - paragraph: "We know some parts are not fully accessible:"
    - list:
      - listitem: It is built for Google Chrome on a computer. In other browsers, it may not work.
      - listitem: The Chinese and Malay pages were translated by a computer. We are asking colleagues who speak each language to check them, so some words may be wrong until they do.
      - listitem: Chinese text uses your computer’s own Chinese font, so it may look different from one computer to another.
      - listitem: The preview plays your own video as it is. Its captions, audio description and other alternatives, and whether it flashes, depend on your recording.
      - listitem: Some short forms are not spelled out. UoN stands for University of Nottingham. The others are file sizes, such as MB and GB, and video format names, such as H.264 and AAC.
      - listitem: The Choose File button belongs to your browser. On the Chinese and Malay pages, its words are in your browser’s language. To use it by voice, say the step’s name, “Choose a video”.
    - heading "Feedback and contact" [level=3]
    - paragraph:
      - text: If you find a problem with this tool, or need its information in another way, email the learning content team at
      - link "UI-Learning-Content@nottingham.ac.uk":
        - /url: mailto:UI-Learning-Content@nottingham.ac.uk
      - text: .
    - heading "Enforcement procedure" [level=3]
    - paragraph:
      - text: The Equality and Human Rights Commission enforces the accessibility regulations. If you are not happy with how we answer your complaint, you can contact the
      - link "Equality Advisory and Support Service (new tab)":
        - /url: https://www.equalityadvisoryservice.com/
      - text: for help.
    - heading "Compliance status" [level=3]
    - paragraph: This tool is partially compliant with version 2.2 of the Web Content Accessibility Guidelines (WCAG), at level AA, the middle of their three levels. This is because of the parts listed under “How accessible this tool is”, and because no one has yet tested it with a screen reader or other assistive technology. We aim for level AAA, the highest.
    - heading "How we tested this tool" [level=3]
    - paragraph:
      - text: "On"
      - time: /\d{1,2} [A-Z][a-z]+ \d{4}/
      - text: ", we checked this page with WAVE, a web accessibility evaluation tool from WebAIM. It gave the page a score of 10 out of 10."
    - paragraph: Each time the code changes, automated tests check the contrast of the text against its background, and the reading level of the English words.
    - paragraph: We have also checked it by hand in Chrome, in all three languages, at computer and phone widths, while building it.
    - paragraph: In October 2026, an automated check in Chrome went through the page’s main states in all three languages, at computer and phone widths, in light and dark colours, in Chrome’s imitation of high contrast mode, and with larger text. This was not a test by a person.
    - heading "What we plan to test next" [level=3]
    - paragraph: "We have not yet run these tests. We need them before we can say the tool fully meets the guidelines:"
    - list:
      - listitem: Using the tool with a keyboard alone.
      - listitem: Using it with the NVDA screen reader in Chrome on Windows, and with VoiceOver on a Mac.
      - listitem: Zooming in to 400%, and using a screen 320 pixels wide.
      - listitem: Using Windows contrast themes.
    - paragraph: "We are also thinking of:"
    - list:
      - listitem: A second automated tool, such as axe or Lighthouse.
      - listitem: A session with disabled staff who use the tool.
    - heading "About this statement" [level=3]
    - paragraph:
      - text: This statement was written on
      - time: /\d{1,2} [A-Z][a-z]+ \d{4}/
      - text: and updated on
      - time: /\d{1,2} [A-Z][a-z]+ \d{4}/
      - text: . Joe Bell reviewed it. We will review it again by
      - time: /\d{1,2} [A-Z][a-z]+ \d{4}/
      - text: .`),
  // While blocked the System check is open at load, so this is the empty page (see the state).
  'system-check-open': EMPTY,
  // The blocked page with the modal dialog after it: its h2, the intro, "Your message", the closed "What will be sent
  // with it", the three buttons and the empty status.
  'feedback-open': EMPTY + '\n' + String.raw`- dialog "Report a problem":
  - heading "Report a problem" [level=2]
  - paragraph: Your message goes to UI-Learning-Content@nottingham.ac.uk from your own email app. You will see the email before it is sent.
  - text: Your message
  - textbox "Your message"
  - group: What will be sent with it
  - button "Open email app"
  - button "Copy message and details"
  - button "Close"
  - status`,
  // As feedback-open, with "Write a message first." under the field.
  'feedback-error': EMPTY + '\n' + String.raw`- dialog "Report a problem":
  - heading "Report a problem" [level=2]
  - paragraph: Your message goes to UI-Learning-Content@nottingham.ac.uk from your own email app. You will see the email before it is sent.
  - text: Your message
  - textbox "Your message"
  - paragraph: Write a message first.
  - group: What will be sent with it
  - button "Open email app"
  - button "Copy message and details"
  - button "Close"
  - status`,
  // As feedback-open, with "What will be sent with it" open: its paragraph and the details, in English.
  'feedback-details-open': EMPTY + '\n' + String.raw`- dialog "Report a problem":
  - heading "Report a problem" [level=2]
  - paragraph: Your message goes to UI-Learning-Content@nottingham.ac.uk from your own email app. You will see the email before it is sent.
  - text: Your message
  - textbox "Your message"
  - group:
    - text: What will be sent with it
    - paragraph: "Details that help find a problem: the tool’s version, your browser, how far you got, and your video’s length, picture size, and format. These details never include the video, its name, or anything in it."
    - text: '/^App: v0\.3\.1\+\d{8}\.[0-9a-f]+ Browser: .+ Stage: idle Recent log: /'
  - button "Open email app"
  - button "Copy message and details"
  - button "Close"
  - status`,
};
// The reviewed snapshots after each interaction (4.1.2), keyed state/interaction: the whole page after it, so every
// stated control is listed. Where the interaction opens a declared state, its snapshot is that state's. The rest were
// captured in the pack's browser by opening the state, running the interaction and reading the page, then reviewed.
// While blocked, "toggle the system check" closes the panel the failed row opened (above), so its snapshot is the page
// with the System check closed; in Chrome it opens it, and the rebuild reviews that. The file states' interactions have
// none: those states cannot open while start-up is blocked.
const CONTENTINFO = '- contentinfo:';
const AFTER = {
  'empty/open the about panel': SNAPSHOTS['about-open'],
  // Student submission [checked], Staff video not, and the line under the group saying what that means.
  'empty/choose student submission': from(EMPTY, '  - group "Video type":', String.raw`    - text: Video type
    - radio "Staff video"
    - text: Staff video
    - radio "Student submission" [checked]
    - text: Student submission
    - paragraph: If the video has closing graphics, they say “Internal use only”.`, 6),
  // The System check closed: its group keeps its h2 and drops the list of six rows.
  'empty/toggle the system check': from(EMPTY, CONTENTINFO, String.raw`  - group:
    - heading "System check — 1 problem" [level=2]`, 9),
  'empty/open report a problem': SNAPSHOTS['feedback-open'],
  // The "?" [expanded] and the about panel under it, in zh-Hans: the five promises, the format help's "?" (closed),
  // the privacy sentence.
  'empty-zh-hans/open the about panel': from(SNAPSHOTS['empty-zh-hans'], '  - heading "UoN 视频成片工具" [level=1]', String.raw`  - button "关于本工具" [expanded]: "?"
  - list:
    - listitem: 可以修剪掉视频开头和结尾不需要的片段。
    - listitem: 添加开场图形和结尾图形。
    - listitem: 平衡音频音量，带来更好的观众体验。
    - listitem:
      - text: 以可靠的格式保存。
      - button "关于视频格式": "?"
    - listitem: 让文件大小适合您的用途。
  - paragraph: 您的视频在您的设备上进行处理，不会上传，原始文件也不会改变。`, 1),
  'empty-zh-hans/toggle the system check': from(SNAPSHOTS['empty-zh-hans'], CONTENTINFO, String.raw`  - group:
    - heading "系统检查 — 1 个问题" [level=2]`, 9),
  // As in zh-Hans, in ms-MY.
  'empty-ms-my/open the about panel': from(SNAPSHOTS['empty-ms-my'], '  - heading "Penyiap Video UoN" [level=1]', String.raw`  - button "Perihal alat ini" [expanded]: "?"
  - list:
    - listitem: Membolehkan anda memotong rakaman yang tidak diingini di awal dan akhir.
    - listitem: Menambah grafik pembukaan dan grafik penutup.
    - listitem: Menyamakan paras audio untuk pengalaman penonton yang lebih baik.
    - listitem:
      - text: Menyimpan dalam format yang boleh dipercayai.
      - button "Perihal format video": "?"
    - listitem: Menjadikan saiz fail sesuai dengan tujuan anda.
  - paragraph: Video anda diproses pada peranti anda, ia tidak pernah dimuat naik dan fail asal tidak berubah.`, 1),
  'empty-ms-my/toggle the system check': from(SNAPSHOTS['empty-ms-my'], CONTENTINFO, String.raw`  - group:
    - heading "Pemeriksaan sistem — 1 masalah" [level=2]`, 9),
  'about-open/open the format help': SNAPSHOTS['format-help-open'],
  // The about panel still open, the System check closed.
  'about-open/toggle the system check': from(SNAPSHOTS['about-open'], CONTENTINFO, String.raw`  - group:
    - heading "System check — 1 problem" [level=2]`, 9),
  // The click on the summary is a click outside the format help, which closes it (main.ts:818-822): the page is
  // about-open with the System check closed, the format help's "?" no longer [expanded] and its paragraph gone.
  'format-help-open/toggle the system check': from(SNAPSHOTS['about-open'], CONTENTINFO, String.raw`  - group:
    - heading "System check — 1 problem" [level=2]`, 9),
  'statement-open/close the statement': SNAPSHOTS.empty,
  'feedback-open/send with no message': SNAPSHOTS['feedback-error'],
  'feedback-open/open what will be sent': SNAPSHOTS['feedback-details-open'],
  // As feedback-details-open, with "Write a message first." still under the field.
  'feedback-error/open what will be sent': from(SNAPSHOTS['feedback-details-open'], '  - textbox "Your message"', '  - paragraph: Write a message first.'),
  'feedback-details-open/close what will be sent': SNAPSHOTS['feedback-open'],
};
// While blocked, system-check-open is the empty page, so closing its panel gives the same page as toggling it there.
AFTER['system-check-open/close the system check'] = AFTER['empty/toggle the system check'];

const CREATE = 'Create the video';
// The disclosures' arrow turns by a transform transition (app.css:944), the one interaction motion on every page; a
// state lists it, so its reduced-motion check samples real motion rather than reading an empty list as none. A click
// on the System check's summary toggles it. In Chrome, with start-up passed, the panel is closed at load and the click
// opens it. In the pack's browser the failed H.264 row opens it at load (main.ts:928), so the click closes it. The
// arrow turns either way.
const toggleSystemCheck = (state) => ({ name: 'toggle the system check', run: async ({ page }) => { await page.locator('#system-check > summary').click(); }, snapshot: AFTER[`${state}/toggle the system check`] });
const STAMP = join(tmpdir(), 'finisher-a11y-baseline');

// A test video of the given length, made once by ffmpeg outside the checkout and reused across tests and runs.
function testVideo(seconds) {
  const file = join(STAMP, `bars-and-tone-${seconds}s.mp4`);
  if (existsSync(file)) return file;
  mkdirSync(STAMP, { recursive: true });
  const part = `${file}.part.mp4`;
  const r = spawnSync(process.env.FFMPEG || 'ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-f', 'lavfi', '-i', `testsrc2=size=640x360:rate=25:duration=${seconds}`,
    '-f', 'lavfi', '-i', `sine=frequency=440:sample_rate=48000:duration=${seconds}`,
    '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'veryfast', '-threads', '1',
    '-c:a', 'aac', '-ac', '2', '-b:a', '128k', '-shortest', '-movflags', '+faststart', part,
  ], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`the ${seconds} s test video could not be made with ffmpeg: ${r.error?.message || String(r.stderr).split('\n')[0]}`);
  renameSync(part, file);
  return file;
}
const NOT_A_VIDEO = { name: 'not-a-video.mp4', mimeType: 'video/mp4', buffer: Buffer.from('This file is text, not a video.\n') };

// Every open starts as a first visit: the page remembers its language, the video type, the video language and
// "Announce progress" in localStorage, and the checks activate those controls between opens in one test. The script
// is added at a page's first open and clears the store before every later load of that page.
const cleared = new WeakSet();
async function firstVisit(page) {
  if (cleared.has(page)) return;
  cleared.add(page);
  await page.addInitScript(() => { try { localStorage.clear(); } catch { /* a refused store remembers nothing */ } });
}
// The load-time check settled: all six System check rows out of pending (main.ts renderCheck), in any language.
async function started(page) {
  await firstVisit(page);
  await page.waitForFunction(() => {
    const rows = document.querySelectorAll('#checks .check');
    return rows.length === 6 && !document.querySelector('#checks .check[data-state="pending"]');
  }, null, { timeout: 20_000 });
}
// The file input open: start-up passed. Where it blocked, as it does in the pack's browser, say why rather than time
// out: each file state, file keyboard function and file journey fails here, about a second after the checks settle.
async function readyForAVideo(page) {
  await started(page);
  if (await page.locator('#file-input').isDisabled()) {
    const said = (await page.locator('#source-status').textContent() || '').trim();
    const rows = (await page.locator('#checks').textContent() || '').replace(/\s+/g, ' ').trim();
    throw new Error(`start-up blocked in this browser, so no video can be chosen: "${said}"; system check: ${rows}`);
  }
}
// The device check's verdict with "Create the video" offered (main.ts showProcessControls).
async function verdictShown(page) {
  try {
    await page.waitForFunction((name) => [...document.querySelectorAll('#process-actions button')]
      .some((b) => !b.disabled && b.getClientRects().length > 0 && b.textContent.trim() === name), CREATE, { timeout: 45_000 });
  } catch {
    const step = (await page.locator('#step-create').textContent() || '').replace(/\s+/g, ' ').trim();
    throw new Error(`no "${CREATE}" offered after the device check: ${step.slice(0, 300)}`);
  }
}
async function chooseVideo(page, seconds = 5) {
  await readyForAVideo(page);
  await page.locator('#file-input').setInputFiles(testVideo(seconds));
  await verdictShown(page);
}
const pickLanguage = async (page, tag) => {
  await started(page);
  await page.locator(`#language-switcher input[value="${tag}"]`).check();
  await page.waitForFunction((t) => document.documentElement.lang === t, tag);
};
const shown = (page, sel) => page.locator(sel).isVisible();
const text = async (page, sel) => ((await page.locator(sel).textContent()) || '').replace(/\s+/g, ' ').trim();
// The focused control, named the same way in every run: its id, a radio's name=value, a summary by its disclosure.
const focusedName = (page) => page.evaluate(() => {
  const e = document.activeElement;
  if (!e || e === document.body) return '';
  if (e.id) return `#${e.id}`;
  if (e.tagName === 'SUMMARY') return `summary@${e.parentElement?.id ?? ''}`;
  if (e instanceof HTMLInputElement && e.type === 'radio') return `${e.name}=${e.value}`;
  return `${e.tagName.toLowerCase()} "${(e.textContent || '').trim().slice(0, 30)}"`;
});
// A field's visible label: its label elements, else what aria-labelledby points at.
const unlabelled = (page, scope) => page.evaluate((root) => [...document.querySelectorAll(`${root} input:not([type=hidden]), ${root} select, ${root} textarea`)]
  .filter((e) => e.getClientRects().length > 0)
  .filter((e) => {
    const own = [...(e.labels ?? [])].map((l) => l.textContent).join(' ');
    const by = (e.getAttribute('aria-labelledby') || '').split(/\s+/).filter(Boolean).map((id) => document.getElementById(id)?.textContent ?? '').join(' ');
    return !/[\p{L}\p{N}]/u.test(`${own} ${by}`);
  })
  .map((e) => e.id || `${e.tagName.toLowerCase()}[name=${e.getAttribute('name')}]`), scope);

// The reviewed sequences for j-order: today's interface's order for the empty page in en-GB as a Chrome user meets
// it, with start-up passed, drafted from index.html and main.ts; change only with a review. The reading sequence is
// the same on the blocked page: the browser sentence is a paragraph and the System check, open there, holds no
// heading. The Tab order is not: while blocked, #file-input is disabled (main.ts:1422) and Tab skips it, so the walk
// reads ten stops and then nothing, and 2.4.3 fails by the block, not by the page's order.
const REVIEWED_READING = ['Page language', 'UoN Video Finisher', '#choose-heading', 'Video type', '#system-check-summary', '#statement-heading', 'Help and feedback', 'Need help using the tool?', 'Something not working?', 'What do you think of the tool?'];
const REVIEWED_TAB_ORDER = ['a "Skip to main content"', 'language=en-GB', '#about-help-button', '#file-input', 'video-kind=staff', 'summary@system-check', 'summary@accessibility-statement', '#contact-creators', '#contact-self-service', '#feedback-open', '#feedback-form-link'];
// 1.3.5: the fields that collect the user's own data in a purpose WCAG lists, with the token each must carry. Reviewed:
// none does: every field is about the video or the message, and the authors, convenor and ID numbers need not be the
// user's own. A field on screen and not in this map fails, so a new field is reviewed before it passes.
const REVIEWED_PURPOSES = {
  'file-input': null, 'trim-start-range': null, 'trim-end-range': null, 'trim-start': null, 'trim-end': null,
  'title-card-on': null, 'title-card-title': null, 'title-card-department': null, 'title-card-authors': null, 'title-card-date': null,
  'submission-card-assignment': null, 'submission-card-module': null, 'submission-card-convenor': null, 'submission-card-ids': null,
  'closing-type': null, 'closing-onset': null, 'closing-internal': null, 'announce-progress': null, 'feedback-message': null,
  'radio:language': null, 'radio:video-kind': null, 'radio:video-language': null, 'radio:closing-colour': null, 'radio:preset': null,
};

export default {
  // How the gate reaches the app: a base URL, and the command that serves it on that URL (or null if already served).
  baseURL: 'http://127.0.0.1:4173',
  server: { command: 'npm run preview -- --port 4173 --strictPort --host 127.0.0.1', url: 'http://127.0.0.1:4173' },
  // Source the lint step reads with the project's ESLint configuration, which imports eslint.a11y.mjs. Empty in the
  // baseline: today's interface is HTML and .ts, which the jsx-a11y rules do not read, so the five lint rows (1.1.1,
  // 1.3.1, 1.3.5, 3.3.2, 4.1.2) read not run, "declares no lint source"; the rebuild declares its source and turns them to pass.
  lint: [],
  // The house target size for SUP03, in CSS px.
  houseTarget: 44,
  // Each UI state: a name, a path, optional setup with real input, a reviewed ARIA snapshot (a row is credited only
  // when the snapshot lists, with names and states, every node of the roles it speaks to), dialogs, the interactions
  // whose motion the reduced-motion check samples (an empty list declares that none triggers motion), each with the
  // reviewed snapshot taken after it where a control's state changes (4.1.2), and what reflow, text spacing, forced colours and both orientations must keep:
  // content and cue selectors, and functions that return true when they still work.
  states: [
    {
      name: 'empty', path: '/', setup: async ({ page }) => { await started(page); }, snapshot: SNAPSHOTS.empty,
      dialogs: [{ name: 'report-a-problem', opener: '#feedback-open', dialog: '#feedback-dialog' }],
      interactions: [
        { name: 'open the about panel', run: async ({ page }) => { await page.locator('#about-help-button').click(); }, snapshot: AFTER['empty/open the about panel'] },
        { name: 'choose student submission', run: async ({ page }) => { await page.locator('#video-kind input[value="submission"]').check(); }, snapshot: AFTER['empty/choose student submission'] },
        toggleSystemCheck('empty'),
        { name: 'open report a problem', run: async ({ page }) => { await page.locator('#feedback-open').click(); }, snapshot: AFTER['empty/open report a problem'] },
      ],
      keeps: {
        content: ['h1', '#choose-heading', '#file-input', '#video-kind', '#system-check-summary', '#feedback-open', '#version-line'],
        cues: ['#language-switcher input:checked + .segment-face', '#video-kind input:checked + .segment-face'],
        functions: [{ name: 'open the about panel', run: async ({ page }) => { await page.locator('#about-help-button').click(); return shown(page, '#about-help'); } }],
      },
    },
    {
      name: 'empty-zh-hans', path: '/', setup: async ({ page }) => { await pickLanguage(page, 'zh-Hans'); }, snapshot: SNAPSHOTS['empty-zh-hans'],
      interactions: [{ name: 'open the about panel', run: async ({ page }) => { await page.locator('#about-help-button').click(); }, snapshot: AFTER['empty-zh-hans/open the about panel'] }, toggleSystemCheck('empty-zh-hans')],
      keeps: { content: ['h1', '#language-notice', '#choose-heading', '#file-input', '#video-kind'], cues: ['#language-switcher input:checked + .segment-face'] },
    },
    {
      name: 'empty-ms-my', path: '/', setup: async ({ page }) => { await pickLanguage(page, 'ms-MY'); }, snapshot: SNAPSHOTS['empty-ms-my'],
      interactions: [{ name: 'open the about panel', run: async ({ page }) => { await page.locator('#about-help-button').click(); }, snapshot: AFTER['empty-ms-my/open the about panel'] }, toggleSystemCheck('empty-ms-my')],
      keeps: { content: ['h1', '#language-notice', '#choose-heading', '#file-input', '#video-kind'], cues: ['#language-switcher input:checked + .segment-face'] },
    },
    {
      name: 'about-open', path: '/', snapshot: SNAPSHOTS['about-open'],
      setup: async ({ page }) => { await started(page); await page.locator('#about-help-button').click(); await page.locator('#about-help').waitFor(); },
      interactions: [{ name: 'open the format help', run: async ({ page }) => { await page.locator('#format-help-button').click(); }, snapshot: AFTER['about-open/open the format help'] }, toggleSystemCheck('about-open')],
      keeps: {
        content: ['#about-help .promises', '#format-help-button', '#choose-heading'],
        functions: [{ name: 'open the format help', run: async ({ page }) => { await page.locator('#format-help-button').click(); return shown(page, '#format-help'); } }],
      },
    },
    {
      // The toggletip beside "Saves in a reliable format." open (index.html:66-84); a click elsewhere closes it (main.ts:818).
      name: 'format-help-open', path: '/', snapshot: SNAPSHOTS['format-help-open'],
      setup: async ({ page }) => {
        await started(page);
        await page.locator('#about-help-button').click();
        await page.locator('#about-help').waitFor();
        await page.locator('#format-help-button').click();
        await page.locator('#format-help').waitFor();
      },
      interactions: [toggleSystemCheck('format-help-open')],
      keeps: { content: ['#format-help', '#format-help-button', '#about-help .promises'] },
    },
    {
      // The address a course page links to; main.ts opens the statement for it (main.ts:4079). Followed from '/', not
      // declared as the path: a second goto to the same address with a fragment does not reload, so a reopen would keep
      // what the last check changed. The page's own URL keeps it absolute for the extended review's page, which has no baseURL.
      name: 'statement-open', path: '/', snapshot: SNAPSHOTS['statement-open'],
      setup: async ({ page }) => {
        await started(page);
        await page.goto(new URL('/#accessibility-statement', page.url()).href);
        await page.locator('#accessibility-statement[open]').waitFor();
      },
      interactions: [{ name: 'close the statement', run: async ({ page }) => { await page.locator('#accessibility-statement > summary').click(); }, snapshot: AFTER['statement-open/close the statement'] }],
      keeps: { content: ['#statement-heading', '#statement-contact', '#statement-enforcement', '#statement-about'] },
    },
    {
      // In Chrome, with start-up passed, the panel is closed at load and the setup opens it. In the pack's browser the
      // failed row opens it at load (main.ts:928), so the setup clicks nothing and this is the same page as empty: the
      // sampler records it as empty's `also`, and its snapshot is empty's.
      name: 'system-check-open', path: '/', snapshot: SNAPSHOTS['system-check-open'],
      setup: async ({ page }) => { await started(page); if (!(await page.locator('#system-check').evaluate((d) => d.open))) await page.locator('#system-check > summary').click(); },
      interactions: [{ name: 'close the system check', run: async ({ page }) => { await page.locator('#system-check > summary').click(); }, snapshot: AFTER['system-check-open/close the system check'] }],
      keeps: { content: ['#checks', '#check-h264', '#check-worker'], cues: ['#check-secure .mark', '#check-h264 .mark'] },
    },
    {
      // Expect contrast and forced colours to time out here and in the two dialog states after it: their state-cue step
      // clicks the page's radios behind the modal, the backdrop takes the click, and Playwright waits out the 60 s test
      // timeout (a limit of the pack).
      name: 'feedback-open', path: '/', snapshot: SNAPSHOTS['feedback-open'],
      setup: async ({ page }) => { await started(page); await page.locator('#feedback-open').click(); await page.locator('#feedback-dialog[open]').waitFor(); },
      interactions: [
        { name: 'send with no message', run: async ({ page }) => { await page.locator('#feedback-form button[type=submit]').click(); }, snapshot: AFTER['feedback-open/send with no message'] },
        { name: 'open what will be sent', run: async ({ page }) => { await page.locator('#feedback-form details > summary').click(); }, snapshot: AFTER['feedback-open/open what will be sent'] },
      ],
      keeps: {
        content: ['#feedback-heading', '#feedback-message', '#feedback-close'],
        functions: [{ name: 'write a message', run: async ({ page }) => { await page.locator('#feedback-message').fill('It stopped.'); return (await page.locator('#feedback-message').inputValue()) === 'It stopped.'; } }],
      },
    },
    {
      // "Open email app" with no message: the error beside the field, the field invalid, focus on it (main.ts:3981-3993).
      name: 'feedback-error', path: '/', snapshot: SNAPSHOTS['feedback-error'],
      setup: async ({ page }) => {
        await started(page);
        await page.locator('#feedback-open').click();
        await page.locator('#feedback-dialog[open]').waitFor();
        await page.locator('#feedback-form button[type=submit]').click();
        await page.locator('#feedback-message-error').waitFor();
      },
      interactions: [{ name: 'open what will be sent', run: async ({ page }) => { await page.locator('#feedback-form details > summary').click(); }, snapshot: AFTER['feedback-error/open what will be sent'] }],
      keeps: { content: ['#feedback-heading', '#feedback-message', '#feedback-message-error', '#feedback-close'] },
    },
    {
      // The details the message carries, in English for the maintainer (<pre lang="en-GB">, index.html:916).
      name: 'feedback-details-open', path: '/', snapshot: SNAPSHOTS['feedback-details-open'],
      setup: async ({ page }) => {
        await started(page);
        await page.locator('#feedback-open').click();
        await page.locator('#feedback-dialog[open]').waitFor();
        await page.locator('#feedback-form details > summary').click();
        await page.locator('#feedback-form details[open]').waitFor();
      },
      interactions: [{ name: 'close what will be sent', run: async ({ page }) => { await page.locator('#feedback-form details > summary').click(); }, snapshot: AFTER['feedback-details-open/close what will be sent'] }],
      keeps: { content: ['#feedback-heading', '#feedback-message', '#feedback-details', '#feedback-close'] },
    },
    // The file states: each needs a video, so in the pack's browser its setup throws "start-up blocked" at
    // readyForAVideo and every test that opens it fails on that. It has no reviewed snapshot, as it cannot open to be
    // captured, so its snapshot test fails first, for want of one.
    {
      name: 'unreadable', path: '/', snapshot: SNAPSHOTS.unreadable,
      setup: async ({ page }) => {
        await readyForAVideo(page);
        await page.locator('#file-input').setInputFiles(NOT_A_VIDEO);
        await page.waitForFunction(() => (document.querySelector('#source-report')?.children.length ?? 0) > 0, null, { timeout: 30_000 });
      },
      interactions: [toggleSystemCheck('unreadable')],
      keeps: { content: ['#source-report', '#file-input', '#choose-heading'] },
    },
    {
      name: 'read', path: '/', setup: async ({ page }) => { await chooseVideo(page); }, snapshot: SNAPSHOTS.read,
      interactions: [
        { name: 'tick add a title card', run: async ({ page }) => { await page.locator('#title-card-on').check(); }, snapshot: AFTER['read/tick add a title card'] },
        { name: 'choose fade', run: async ({ page }) => { await page.locator('#closing-type').selectOption('fade'); }, snapshot: AFTER['read/choose fade'] },
        { name: 'choose white', run: async ({ page }) => { await page.locator('#closing-colour input[value="white"]').check(); }, snapshot: AFTER['read/choose white'] },
        { name: 'choose the smaller file', run: async ({ page }) => { await page.locator('#preset-choice input[value="smaller"]').check(); }, snapshot: AFTER['read/choose the smaller file'] },
        { name: 'open the onset help', run: async ({ page }) => { await page.locator('#onset-help-button').click(); }, snapshot: AFTER['read/open the onset help'] },
        { name: 'open video properties', run: async ({ page }) => { await page.locator('#source-report details > summary').click(); }, snapshot: AFTER['read/open video properties'] },
      ],
      keeps: {
        content: ['#trim-heading', '#trim-start', '#trim-end', '#trim-result', '#title-heading', '#closing-type', '#preset-choice', '#preflight-report', '#process-actions'],
        cues: ['#closing-colour input:checked + .segment-face', '#video-kind input:checked + .segment-face'],
        functions: [
          { name: 'type a start time', run: async ({ page }) => { await page.locator('#trim-start').fill('1'); await page.locator('#trim-start').press('Enter'); return Number(await page.locator('#trim-start-range').inputValue()) === 1; } },
          { name: 'tick add a title card', run: async ({ page }) => { await page.locator('#title-card-on').check(); return shown(page, '#title-card-fields'); } },
        ],
      },
    },
    {
      name: 'title-card', path: '/', snapshot: SNAPSHOTS['title-card'],
      setup: async ({ page }) => { await chooseVideo(page); await page.locator('#title-card-on').check(); await page.locator('#title-card-fields').waitFor(); },
      interactions: [{ name: 'untick the card', run: async ({ page }) => { await page.locator('#title-card-on').uncheck(); }, snapshot: AFTER['title-card/untick the card'] }, toggleSystemCheck('title-card')],
      keeps: {
        content: ['#title-card-title', '#title-card-department', '#title-card-authors', '#title-card-date', '#title-card-date-helper'],
        functions: [{ name: 'type a title', run: async ({ page }) => { await page.locator('#title-card-title').fill('Week 1'); return (await page.locator('#title-card-title').inputValue()) === 'Week 1'; } }],
      },
    },
    {
      name: 'submission', path: '/', snapshot: SNAPSHOTS.submission,
      setup: async ({ page }) => { await chooseVideo(page); await page.locator('#video-kind input[value="submission"]').check(); await page.locator('#submission-card-fields').waitFor(); },
      interactions: [{ name: 'back to staff video', run: async ({ page }) => { await page.locator('#video-kind input[value="staff"]').check(); }, snapshot: AFTER['submission/back to staff video'] }, toggleSystemCheck('submission')],
      keeps: { content: ['#submission-card-assignment', '#submission-card-module', '#submission-card-convenor', '#submission-card-ids', '#submission-card-ids-helper', '#title-card-reason'] },
    },
    {
      name: 'trim-error', path: '/', snapshot: SNAPSHOTS['trim-error'],
      setup: async ({ page }) => {
        await chooseVideo(page);
        await page.locator('#trim-start').fill('abc');
        await page.locator('#trim-start').press('Tab');
        await page.locator('#trim-start-error').waitFor();
      },
      interactions: [toggleSystemCheck('trim-error')],
      keeps: { content: ['#trim-start', '#trim-start-error', '#trim-format'] },
    },
    {
      // Create refuses an empty submission card before anything starts: the reasons beside the fields, focus there.
      name: 'card-refused', path: '/', snapshot: SNAPSHOTS['card-refused'],
      setup: async ({ page }) => {
        await chooseVideo(page);
        await page.locator('#video-kind input[value="submission"]').check();
        await page.getByRole('button', { name: CREATE, exact: true }).click();
        await page.locator('#submission-card-assignment-error').waitFor();
      },
      interactions: [toggleSystemCheck('card-refused')],
      keeps: { content: ['#submission-card-assignment-error', '#submission-card-ids-error', '#submission-card-ids'] },
    },
  ],
  // Keyboard functions run at no delay and with long gaps between keys: steps of { focus }, { press } or { type }.
  keyboardFunctions: [
    { name: 'open-about-by-enter', state: 'empty', steps: [{ focus: '#about-help-button' }, { press: 'Enter' }], check: async ({ page }) => shown(page, '#about-help') },
    { name: 'close-about-by-escape', state: 'about-open', steps: [{ focus: '#about-help-button' }, { press: 'Escape' }], check: async ({ page }) => !(await shown(page, '#about-help')) && (await focusedName(page)) === '#about-help-button' },
    { name: 'choose-submission-by-arrow', state: 'empty', steps: [{ focus: '#video-kind input[value="staff"]' }, { press: 'ArrowRight' }], check: async ({ page }) => page.locator('#video-kind input[value="submission"]').isChecked() },
    { name: 'switch-language-by-arrow', state: 'empty', steps: [{ focus: '#language-switcher input[value="en-GB"]' }, { press: 'ArrowRight' }], check: async ({ page }) => (await page.evaluate(() => document.documentElement.lang)) === 'zh-Hans' },
    { name: 'open-statement-by-enter', state: 'empty', steps: [{ focus: '#accessibility-statement > summary' }, { press: 'Enter' }], check: async ({ page }) => page.locator('#accessibility-statement').evaluate((d) => d.open) },
    { name: 'write-feedback', state: 'empty', steps: [{ focus: '#feedback-open' }, { press: 'Enter' }, { type: 'Help' }], check: async ({ page }) => (await page.locator('#feedback-message').inputValue()) === 'Help' },
    // The five below run in the state read, so in the pack's browser each fails "start-up blocked" as it opens.
    // Start time already reads 0:00.0, so its text is selected before the 1 is typed; appended, it would read 0:00.01.
    { name: 'set-start-by-typing', state: 'read', steps: [{ focus: '#trim-start' }, { press: 'ControlOrMeta+A' }, { type: '1' }, { press: 'Enter' }], check: async ({ page }) => Number(await page.locator('#trim-start-range').inputValue()) === 1 },
    { name: 'move-start-by-arrow', state: 'read', steps: [{ focus: '#trim-start-range' }, { press: 'ArrowRight' }], check: async ({ page }) => Number(await page.locator('#trim-start-range').inputValue()) > 0 },
    { name: 'tick-title-card-by-space', state: 'read', steps: [{ focus: '#title-card-on' }, { press: 'Space' }], check: async ({ page }) => shown(page, '#title-card-fields') },
    { name: 'choose-smaller-by-arrow', state: 'read', steps: [{ focus: '#preset-choice input[value="best"]' }, { press: 'ArrowDown' }], check: async ({ page }) => page.locator('#preset-choice input[value="smaller"]').isChecked() },
    { name: 'create-by-enter', state: 'read', steps: [{ focus: '#process-actions button:not([hidden]):not(.button--secondary)' }, { press: 'Enter' }], check: async ({ page }) => shown(page, '#announce-field') },
  ],
  // Authored journeys: a name, a catalogue method (j-* or keyboard), the rows it claims, and run({ page, expect, open, record }).
  // Six need a video (pointer-alternatives, submission-card-form, card-kept-across-sides, progress-quiet-and-stop,
  // make-and-keep, make-by-keyboard): in the pack's browser each fails "start-up blocked" before its first check.
  journeys: [
    { name: 'reading-and-focus-order', method: 'j-order', rows: ['1.3.2', '2.4.3'], run: async ({ page, open, record, tab }) => {
      await open('empty');
      const reading = await page.evaluate(() => [...document.querySelectorAll('h1, h2, h3, legend')].filter((e) => e.checkVisibility()).map((e) => (e.id ? `#${e.id}` : e.textContent.trim())));
      const order = [];
      for (let i = 0; i < REVIEWED_TAB_ORDER.length; i++) { await tab(); order.push(await focusedName(page)); }
      const readOk = JSON.stringify(reading) === JSON.stringify(REVIEWED_READING), tabOk = JSON.stringify(order) === JSON.stringify(REVIEWED_TAB_ORDER);
      record('1.3.2', readOk, `reading sequence ${reading.join(' > ')}`);
      await page.locator('#feedback-open').focus(); await page.keyboard.press('Enter');
      await page.locator('#feedback-dialog[open]').waitFor();
      const inside = await page.evaluate(() => document.getElementById('feedback-dialog').contains(document.activeElement));
      await page.keyboard.press('Escape');
      const back = await focusedName(page);
      await page.locator('#about-help-button').focus(); await page.keyboard.press('Enter');
      await page.keyboard.press('Escape');
      const aboutBack = (await focusedName(page)) === '#about-help-button' && !(await shown(page, '#about-help'));
      record('2.4.3', tabOk && inside && back === '#feedback-open' && aboutBack, `Tab order ${order.join(' > ')}; focus ${inside ? 'moved into' : 'stayed out of'} Report a problem and returned to ${back || 'nothing'}; Escape on the about panel ${aboutBack ? 'returned focus to its "?"' : 'did not return focus'}`);
    } },
    { name: 'page-title', method: 'j-routes', rows: ['2.4.2'], run: async ({ page, open, record }) => {
      await open('empty');
      const title = await page.title();
      record('2.4.2', title === 'UoN Video Finisher', `title "${title}"`);
    } },
    { name: 'pointer-abandon', method: 'j-pointer', rows: ['2.5.2'], run: async ({ page, open, record, pointer }) => {
      await open('empty');
      const b = await page.locator('#about-help-button').boundingBox();
      const expanded = () => page.locator('#about-help-button').getAttribute('aria-expanded');
      await pointer.down(b.x + b.width / 2, b.y + b.height / 2); await pointer.move(5, 5); await pointer.up();
      const abandoned = await expanded();
      await pointer.down(b.x + b.width / 2, b.y + b.height / 2);
      const onDown = await expanded();
      await pointer.up();
      const onUp = await expanded();
      record('2.5.2', abandoned === 'false' && onDown === 'false' && onUp === 'true', `abandoned press left ${abandoned}; down ${onDown}, up ${onUp}`);
    } },
    { name: 'pointer-alternatives', method: 'j-pointer', rows: ['2.5.1', '2.5.7'], run: async ({ page, open, record, pointer }) => {
      await open('empty');
      await readyForAVideo(page);
      // The drop's alternative: the picker, by one tap. Then a trim handle moved with no drag: a tap in its time field and a typed time.
      const f = await page.locator('#file-input').boundingBox();
      const [chooser] = await Promise.all([page.waitForEvent('filechooser', { timeout: 10_000 }), pointer.tap(f.x + f.width / 2, f.y + f.height / 2)]);
      await chooser.setFiles(testVideo(5));
      await verdictShown(page);
      // The tap is at viewport coordinates, so the field is scrolled into view first; it already reads 0:00.0, so its
      // text is selected before the 1 is typed, which appended would read 0:00.01.
      await page.locator('#trim-start').scrollIntoViewIfNeeded();
      const t = await page.locator('#trim-start').boundingBox();
      await pointer.tap(t.x + t.width / 2, t.y + t.height / 2);
      await page.keyboard.press('ControlOrMeta+A'); await page.keyboard.type('1'); await page.keyboard.press('Enter');
      const start = Number(await page.locator('#trim-start-range').inputValue());
      const why = `a tap on the file input opened the chooser and the video was read; a tap in Start time and a typed 1 moved the start handle to ${start} s (the "Set start here" route needs the preview seeked, not exercised)`;
      record('2.5.7', start === 1, why);
      record('2.5.1', start === 1, `no function needs a path or two pointers: ${why}`);
    } },
    { name: 'feedback-form', method: 'j-forms', rows: ['3.3.1', '3.3.2', '3.3.3', '4.1.3'], run: async ({ page, open, record }) => {
      await open('empty');
      await page.locator('#feedback-open').click();
      await page.locator('#feedback-dialog[open]').waitFor();
      await page.locator('#feedback-form button[type=submit]').click();
      const words = await text(page, '#feedback-message-error');
      const invalid = await page.locator('#feedback-message').getAttribute('aria-invalid');
      const described = ((await page.locator('#feedback-message').getAttribute('aria-describedby')) || '').split(/\s+/).includes('feedback-message-error');
      const at = await focusedName(page);
      const visible = await shown(page, '#feedback-message-error');
      record('3.3.1', visible && invalid === 'true' && described && at === '#feedback-message', `an empty message: "${words}" beside the field, aria-invalid=${invalid}, described=${described}, focus on ${at}`);
      record('3.3.3', visible && /message/i.test(words), `the error says what to do: "${words}"`);
      const missing = await unlabelled(page, '#feedback-dialog');
      record('3.3.2', missing.length === 0, missing.length ? `no visible label: ${missing.join(', ')}` : 'every field in the dialog has a visible label');
      await page.locator('#feedback-message').fill('The tool would not read my video.');
      const copy = page.locator('#feedback-copy');
      await copy.click();
      await page.waitForFunction(() => (document.querySelector('#feedback-status')?.textContent || '').trim().length > 0, null, { timeout: 10_000 });
      const role = await page.locator('#feedback-status').getAttribute('role');
      const stayed = await copy.evaluate((b) => b === document.activeElement);
      record('4.1.3', role === 'status' && stayed, `"${await text(page, '#feedback-status')}" in role=${role}; focus ${stayed ? 'stayed on' : 'left'} Copy message and details`);
    } },
    { name: 'submission-card-form', method: 'j-forms', rows: ['1.3.5', '3.3.1', '3.3.2', '3.3.3', '3.3.5', 'SUP05'], run: async ({ page, open, record }) => {
      await open('submission');
      const fields = await page.evaluate(() => [...document.querySelectorAll('main input:not([type=hidden]), main select, main textarea')].filter((e) => e.getClientRects().length > 0).map((e) => ({ key: e.type === 'radio' ? `radio:${e.name}` : e.id, auto: e.getAttribute('autocomplete') || '' })));
      const unreviewed = fields.filter((f) => !(f.key in REVIEWED_PURPOSES)).map((f) => f.key);
      const untokened = fields.filter((f) => REVIEWED_PURPOSES[f.key] && f.auto !== REVIEWED_PURPOSES[f.key]).map((f) => f.key);
      record('1.3.5', !unreviewed.length && !untokened.length, `${fields.length} field(s) on screen; unreviewed: ${unreviewed.join(', ') || 'none'}; missing a purpose token: ${untokened.join(', ') || 'none'}`);
      await page.locator('#submission-card-assignment').fill('Assignment 2');
      await page.locator('#submission-card-module').fill('ABCD1234 Media practice');
      await page.locator('#submission-card-convenor').fill('Dr A. Tutor');
      await page.locator('#submission-card-ids').fill('1234');
      await page.getByRole('button', { name: CREATE, exact: true }).click();
      await page.locator('#submission-card-ids-error').waitFor({ timeout: 10_000 });
      const words = await text(page, '#submission-card-ids-error');
      const invalid = await page.locator('#submission-card-ids').getAttribute('aria-invalid');
      const described = ((await page.locator('#submission-card-ids').getAttribute('aria-describedby')) || '').split(/\s+/).includes('submission-card-ids-error');
      record('3.3.1', invalid === 'true' && described && words.length > 0, `ID numbers "1234": "${words}" beside the box, aria-invalid=${invalid}, described=${described}`);
      record('3.3.3', /8/.test(words), `the error names the correction: "${words}"`);
      const kept = [await page.locator('#submission-card-assignment').inputValue(), await page.locator('#submission-card-module').inputValue(), await page.locator('#submission-card-convenor').inputValue()];
      record('SUP05', kept.join('|') === 'Assignment 2|ABCD1234 Media practice|Dr A. Tutor', `after the refusal the three valid fields read: ${kept.join('; ')}`);
      const missing = await unlabelled(page, 'main');
      record('3.3.2', missing.length === 0, missing.length ? `no visible label: ${missing.join(', ')}` : `every one of ${fields.length} field(s) in the steps has a visible label`);
      const trimHelp = ((await page.locator('#trim-start').getAttribute('aria-describedby')) || '').split(/\s+/).includes('trim-format') && await shown(page, '#trim-format');
      const idsHelp = ((await page.locator('#submission-card-ids').getAttribute('aria-describedby')) || '').split(/\s+/).includes('submission-card-ids-helper');
      await page.locator('#onset-help-button').click();
      const onsetHelp = await shown(page, '#onset-help');
      record('3.3.5', trimHelp && idsHelp && onsetHelp, `trim times described by their format line: ${trimHelp}; ID numbers by their helper: ${idsHelp}; the "?" beside Plays over opens its help: ${onsetHelp}`);
    } },
    { name: 'card-kept-across-sides', method: 'j-multi-step', rows: ['3.3.7'], run: async ({ page, open, record }) => {
      await open('read');
      await page.locator('#title-card-on').check();
      await page.locator('#title-card-title').fill('Week 1 lecture');
      await page.locator('#video-kind input[value="submission"]').check();
      await page.locator('#submission-card-assignment').fill('Assignment 2');
      await page.locator('#video-kind input[value="staff"]').check();
      const title = await page.locator('#title-card-title').inputValue();
      const ticked = await page.locator('#title-card-on').isChecked();
      const date = await page.locator('#title-card-date').inputValue();
      await page.locator('#video-kind input[value="submission"]').check();
      const assignment = await page.locator('#submission-card-assignment').inputValue();
      record('3.3.7', title === 'Week 1 lecture' && ticked && assignment === 'Assignment 2' && date.length > 0, `back on Staff video the card is ${ticked ? 'ticked' : 'unticked'} with title "${title}" and date "${date}" filled for the user; back on Student submission the assignment reads "${assignment}"`);
    } },
    { name: 'progress-quiet-and-stop', method: 'j-timing', rows: ['2.2.2', '2.2.4'], run: async ({ page, open, record }) => {
      await open('empty');
      await chooseVideo(page, 30);
      await page.getByRole('button', { name: CREATE, exact: true }).click();
      await page.locator('#announce-field').waitFor({ timeout: 15_000 });
      await page.locator('#announce-progress').uncheck();
      // With Announce progress on, the Finisher speaks only at a change of stage or a milestone, a quarter, half and three
      // quarters of the encode, judged on the raw fraction (src/ui/progress.ts progressView, src/config/thresholds.ts:235),
      // so a report between them proves nothing, and neither does the rounded percentage: "25%" can show at 24.7%. Each
      // report is read as the stage line and the bar's raw value (main.ts:2316, :2330-2331); the completion's "Ready"
      // (en-GB.ts:585, main.ts:3431) and a new job's empty line are not reports. Suppression is shown at the first report
      // that would have been spoken: a stage other than the one showing now, or a later quarter of the raw fraction.
      await page.evaluate(() => {
        const w = window;
        const line = document.querySelector('#process-progress-text'), bar = document.querySelector('#process-progress');
        const report = () => ({ line: line.textContent.trim(), f: bar.getAttribute('value') });
        w.__said = []; w.__moved = 0; w.__reports = [report()];
        new MutationObserver(() => { w.__said.push(document.querySelector('#status').textContent); }).observe(document.querySelector('#status'), { childList: true, characterData: true, subtree: true });
        new MutationObserver(() => { w.__moved++; const r = report(); if (r.line && r.line !== 'Ready') w.__reports.push(r); }).observe(line, { childList: true, characterData: true, subtree: true });
      });
      const spokenAt = await page.waitForFunction(() => {
        const stage = (l) => l.replace(/ — \d+%$/, '');
        const quarters = (f) => (f === null ? 0 : [0.25, 0.5, 0.75].filter((q) => Number(f) >= q).length);
        const [first, ...later] = window.__reports;
        return later.find((r) => stage(r.line) !== stage(first.line) || quarters(r.f) > quarters(first.f)) || null;
      }, null, { timeout: 30_000 }).then((h) => h.jsonValue(), () => null);
      const { said, moved, from } = await page.evaluate(() => ({ said: window.__said.filter((s) => s.trim()), moved: window.__moved, from: window.__reports[0] }));
      const at = (r) => `"${r.line}"${r.f === null ? '' : ` (raw ${Number(r.f).toFixed(4)})`}`;
      record('2.2.4', spokenAt !== null && said.length === 0, spokenAt === null
        ? `with Announce progress off, no report that would have been spoken arrived in 30 s (the stage line moved ${moved} time(s) from ${at(from)}), so suppression was not observed`
        : `with Announce progress off, the stage line moved from ${at(from)} to ${at(spokenAt)}, a report the Finisher speaks with it on, and the status line announced ${said.length}: ${said.slice(0, 2).join(' | ') || 'nothing'}`);
      await page.getByRole('button', { name: 'Cancel', exact: true }).click();
      await page.waitForFunction(() => /Cancelled/.test(document.querySelector('#status')?.textContent || ''), null, { timeout: 20_000 });
      await page.evaluate(() => { window.__moved = 0; });
      await page.waitForTimeout(2000);
      const still = await page.evaluate(() => ({ moved: window.__moved, bar: document.querySelector('#process-progress').hidden, animating: document.getAnimations().filter((a) => a.playState === 'running').length }));
      record('2.2.2', still.moved === 0 && (still.bar || still.animating === 0), `after Cancel the stage line changed ${still.moved} time(s) in 2 s; bar ${still.bar ? 'hidden' : 'shown'}, ${still.animating} animation(s) running`);
    } },
    { name: 'make-and-keep', method: 'j-forms', rows: ['3.3.4', '3.3.6', '4.1.3', 'SUP05'], run: async ({ page, open, record }) => {
      await open('read');
      // Progress counts only the running stages' reports on the visible stage line, never the completion's "Ready"
      // (en-GB.ts:585, main.ts:3431) or a new job's empty line, so completion alone cannot pass SUP05.
      await page.evaluate(() => { const w = window; const e = document.querySelector('#process-progress-text'); w.__progress = 0; new MutationObserver(() => { const l = e.textContent.trim(); if (l && l !== 'Ready' && !e.hidden) w.__progress++; }).observe(e, { childList: true, characterData: true, subtree: true }); });
      await page.getByRole('button', { name: CREATE, exact: true }).click();
      const save = page.getByRole('button', { name: 'Save the video', exact: true });
      await save.waitFor({ timeout: 45_000 });
      // The completion is the ready announcement (src/i18n/en-GB.ts:440, set at main.ts:3436), not any text in the line:
      // "Creating your video" may still be there.
      const ready = await page.waitForFunction(() => /^Your video is ready\./.test((document.querySelector('#status')?.textContent || '').trim()), null, { timeout: 10_000 }).then(() => true, () => false);
      const said = await text(page, '#status');
      const role = await page.locator('#status').getAttribute('role');
      const onStatus = await page.evaluate(() => document.activeElement?.id === 'status');
      const progress = await page.evaluate(() => window.__progress);
      record('4.1.3', role === 'status' && !onStatus && ready, `${ready ? 'the ready announcement' : 'no ready announcement'}, "${said}", in role=${role}; focus ${onStatus ? 'on the status line' : `on ${await focusedName(page)}`}`);
      record('SUP05', progress > 0 && ready, `${progress} running-stage report(s) on the stage line before completion; ${ready ? 'the ready announcement' : 'no ready announcement'}, "${said}"`);
      await page.locator('#process-actions button').filter({ hasText: /^Create the video/ }).first().click();
      const keep = page.getByRole('button', { name: 'Keep it', exact: true });
      const asked = await keep.waitFor({ timeout: 10_000 }).then(() => true, () => false);
      const discard = asked && await page.getByRole('button', { name: 'Discard it and start again', exact: true }).isVisible();
      if (asked) await keep.click();
      const kept = await save.isVisible();
      const why = `with the result unsaved, Create again ${asked ? 'asked first (Keep it, Discard it and start again)' : 'did not ask'}; after Keep it the result ${kept ? 'stayed, Save offered' : 'was gone'}; the original file is never written`;
      record('3.3.4', asked && discard && kept, why);
      record('3.3.6', asked && discard && kept, why);
    } },
    { name: 'make-by-keyboard', method: 'keyboard', rows: ['3.2.2', '3.2.5', 'P06', 'CONF03'], run: async ({ page, open, record }) => {
      await open('empty');
      await readyForAVideo(page);
      const url = page.url(), steps = [];
      await page.locator('#file-input').focus();
      const [chooser] = await Promise.all([page.waitForEvent('filechooser', { timeout: 10_000 }), page.keyboard.press('Space')]);
      await chooser.setFiles(testVideo(5));
      await verdictShown(page); steps.push('choose');
      await page.locator('#title-card-on').focus(); await page.keyboard.press('Space');
      const ticked = await page.locator('#title-card-on').isChecked();
      await page.keyboard.press('Space'); // unticked again, so Create is not refused for an empty card
      await page.locator('#preset-choice input[value="best"]').focus(); await page.keyboard.press('ArrowDown');
      const smaller = await page.locator('#preset-choice input[value="smaller"]').isChecked();
      const stayed = (await focusedName(page)) === 'preset=smaller';
      record('3.2.2', smaller && stayed && ticked && page.url() === url && page.context().pages().length === 1, `the card box and the preset changed by keyboard (ticked ${ticked}, smaller ${smaller}); focus ${stayed ? 'stayed' : 'moved'}; the page and the tab count stayed`);
      // The preset change hides Create while the device check runs again (main.ts:1878-1895), so the new verdict is
      // awaited, then Create is reached by Tab from the preset, as a keyboard user reaches it.
      await verdictShown(page);
      const onCreate = () => page.evaluate((name) => { const e = document.activeElement; return !!e?.closest('#process-actions') && e.textContent.trim() === name; }, CREATE);
      let tabs = 0;
      while (!(await onCreate()) && tabs < 15) { await page.keyboard.press('Tab'); tabs++; }
      if (!(await onCreate())) throw new Error(`"${CREATE}" not reached by ${tabs} Tab(s) from the preset; focus on ${await focusedName(page) || 'nothing'}`);
      await page.keyboard.press('Enter'); steps.push(`create (${tabs} Tab(s) from the preset)`);
      const create = () => page.locator('#process-actions button').filter({ hasText: /^Create the video/ }).first();
      const cancel = page.getByRole('button', { name: 'Cancel', exact: true });
      await cancel.waitFor({ timeout: 15_000 });
      await cancel.focus(); await page.keyboard.press('Enter');
      await page.waitForFunction(() => /Cancelled/.test(document.querySelector('#status')?.textContent || ''), null, { timeout: 20_000 }); steps.push('cancel');
      await verdictShown(page);
      await create().focus(); await page.keyboard.press('Enter'); steps.push('create again');
      const save = page.getByRole('button', { name: 'Save the video', exact: true });
      await save.waitFor({ timeout: 40_000 }); steps.push('result');
      record('3.2.5', page.url() === url && page.context().pages().length === 1, `no change of context but those asked for, through ${steps.join(' > ')}`);
      // A download is credited only once it has finished: the event fires as the transfer starts, and failure() waits
      // for its end, null when it succeeded.
      const download = page.waitForEvent('download', { timeout: 8_000 }).then(async (d) => { const failed = await d.failure(); return failed === null ? 'a download' : `a download that failed: ${failed}`; }, () => null);
      await save.focus(); await page.keyboard.press('Enter');
      const status = page.waitForFunction(() => /^Saved/.test((document.querySelector('#save-status')?.textContent || '').trim()), null, { timeout: 8_000 }).then(() => 'Saved', () => null);
      const outcome = (await Promise.all([download, status])).find(Boolean) ?? `no save: "${await text(page, '#save-status')}"`;
      const saved = outcome === 'a download' || outcome === 'Saved';
      steps.push(saved ? `save (${outcome})` : outcome);
      record('P06', saved, `end to end by keyboard, recovery by Cancel included: ${steps.join(' > ')}`);
      record('CONF03', saved, `every step of making a video, the browser's own save step included: ${steps.join(' > ')}`);
    } },
  ],
  // Extended depth (stage 4), read by `npm run a11y:extended`: VoiceOver journeys through Guidepup (each a state, the rows
  // it claims among those listing vo, steps of { next }, { previous }, { act }, { interact }, { stopInteracting },
  // { press: key }, { type: text }, { perform: command }, { wait: ms }, and the phrases expected in order); media items
  // (a file for ffprobe, caption files with their language, description files, a transcript route, the state and the
  // player's selector); flashing items (a state, a selector, a start control, seconds and fps) with the design constraint.
  // The baseline runs the standard command and the doctor only. Before an extended run: media is present. The page has
  // two players, the trim preview (index.html:203) and the result player (main.ts:3226-3236), and both play the user's
  // own recording, which is theirs. A result carries the product's own media only as chosen: the closing graphics in
  // public/branding/ (closing-onset-*.webm and closing-tail-*.mp4, 1080p and 2160p, 24 files, video only by ffprobe:
  // the logo and, on the internal tails, "Internal use only" in each language) unless "No closing graphics" is chosen
  // (index.html:480), and the card drawn from its fields unless a staff video's card is left unticked (index.html:314),
  // so a staff result can carry none. Those graphics are the product's media files for the extended run's `media`
  // items. Flashing is declared absent: the closings are a 1 s fade or slide onset and an opaque tail
  // (public/branding/README.md:16-21), the card a still held for TITLE_CARD_SECONDS, 5 s (src/config/cards.ts:167), and
  // the page's one keyframe animation slides the progress band (app.css:798); so no flashing item. VoiceOver journeys
  // are written at their first attended run.
  // extended: {
  //   voJourneys: [{ name: 'settings-vo', state: 'home', engines: ['webkit', 'chromium'], rows: ['1.3.1', '2.4.1', '4.1.2'], steps: [{ next }, { next }], expected: ['Home, heading level 1', 'Menu, button'] }],
  //   media: [{ name: 'intro', file: 'public/intro.mp4', captions: [{ file: 'public/intro.en.vtt', lang: 'en' }], descriptions: [{ file: 'public/intro-ad.mp4' }], transcript: '/intro-transcript', state: 'home', player: '#intro' }],
  //   flashing: [{ name: 'alert', state: 'home', selector: '#alert', start: '#trigger', seconds: 3, fps: 20 }], flashingConstraint: 'no content flashes more than three times a second by design; alerts fade once',
  // },
  // The sampling, run by hand through `npm run a11y:sample` (the README's "Sampling the states"): the app's own route
  // list where it keeps one, else a walk from the entry points; never against live data. The cap bounds the renders,
  // states × 7 × engines; a sample over it is refused. Defaults apply when this is absent.
  // One page, one entry; the walk never presses "Open email app" or the copy, which leave the page or touch the clipboard.
  sample: { entries: ['/'], depth: 2, maxStates: 40, maxActions: 25, topUp: 0.1, cap: 150, engines: ['chromium'], skip: 'delete|remove|sign out|log out|pay|buy|send|submit|purchase|cancel subscription|open email app|copy message' },
  // The records the session keeps current, each with the note that grounds it; the report computes the rest.
  // records: { rows: { P09: { state: 'pass', note: 'no shared component or environment changed since the baseline' }, P10: { state: 'pass', note: 'no open finding' } } },
};
