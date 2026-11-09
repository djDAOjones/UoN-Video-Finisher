# Words for native readers: what Phase 8 added or changed in Chinese and Malay

For the campus colleagues who read the page in their own language (wish VH-105.2), 9 November 2026, VH-195. Phase 8 added or changed these words in the page's Chinese and Malay tables between Phase 7's close (`452334e`) and Phase 8's last fix (`0aaed0e`). They are machine translations with the agent's repairs, as the page says, until a native reader checks them. Each row gives the English the page shows beside the words in your language.

Please read each row and tell us any that are wrong, unclear or unnatural, with the words you would use. Corrections go through the translator's sheet (`reviews/2026-10-18/VH-105-strings-filled.csv`); the page's line saying it was machine translated comes off a language only after its whole page is checked live and corrected. The person checklist's task H (`person-checklist-2026-10-27.md`) asks the same on the live page.

The key names where the words sit; `[n]` is a place in a list. "Added" is new in Phase 8; "Changed" is a key whose words changed.

## Chinese (Simplified), zh-Hans

28 added and 37 changed.

| Key | Added or changed | English (en-GB) | Chinese |
| --- | --- | --- | --- |
| `app.title` | Changed | UoN Video Finisher | UoN 视频成片工具 |
| `app.description` | Changed | Add the University of Nottingham’s approved branding to a video, level its audio, and get a video file sized and formatted for your intended use, without uploading it anywhere. | 为视频添加诺丁汉大学批准的品牌标识，调整其音频电平，并获得大小和格式适合您预期用途的视频文件，而无需将其上传到任何地方。 |
| `lede.about.label` | Added | About this tool | 关于本工具 |
| `lede.promises[0]` | Changed | Lets you trim unwanted footage from the start and end. | 可以修剪掉视频开头和结尾不需要的片段。 |
| `lede.promises[1]` | Changed | Adds opening and closing graphics. | 添加开场图形和结尾图形。 |
| `lede.promises[2]` | Changed | Evens out the audio level for better audience experience. | 平衡音频音量，带来更好的观众体验。 |
| `lede.promises[3]` | Added | Saves in a reliable format. | 以可靠的格式保存。 |
| `lede.promises[4]` | Added | Makes the file the right size for your purpose. | 让文件大小适合您的用途。 |
| `lede.formatHelp.label` | Added | About the video format | 关于视频格式 |
| `lede.formatHelp.text` | Added | Videos come in many formats. Some play on one device but not another, or do not work with some apps. This tool saves your video as an MP4, the most interoperable video format. That means it plays on almost any phone, computer or website. | 视频有许多格式。有些格式在一台设备上可以播放，在另一台上却不行，或者无法在某些应用中使用。此工具会将您的视频保存为 MP4，这是兼容性最好的视频格式。这意味着它几乎可以在任何手机、电脑或网站上播放。 |
| `videoKind.nextVideo` | Added | Changes to the video type apply to the next video you make. | 对视频类型的更改将用于您制作的下一个视频。 |
| `videoLanguage.helper` | Changed | Words the tool adds to your video, on the title card and the closing graphics, are in this language. | 工具添加到视频中的文字（标题卡和结尾图形上的文字）使用此语言。 |
| `trim.keepingCut` | Added | Keeping {kept}. | 保留 {kept}。 |
| `closing.types.none` | Changed | No closing graphics | 无结尾图形 |
| `closing.onsetLabel` | Changed | Plays over | 叠加于 |
| `closing.onsets.existing` | Changed | The last second of video | 视频的最后一秒 |
| `closing.onsets.freeze` | Changed | A held last frame | 定格的最后一帧 |
| `closing.helpLabel` | Changed | About what the graphics play over | 关于图形叠加的画面 |
| `closing.helpExistingTerm` | Changed | The last second of video | 视频的最后一秒 |
| `closing.helpExistingText` | Changed | — the closing graphics cover it as they build. | — 结尾图形在逐渐出现时会覆盖这一秒。 |
| `closing.helpFreezeTerm` | Changed | A held last frame | 定格的最后一帧 |
| `closing.notUsedWith.none` | Changed | Not used without closing graphics. | 不使用结尾图形时不适用。 |
| `preset.labels.best` | Changed | High quality, for publishing | 高质量，用于发布 |
| `preset.labels.smaller` | Changed | Smaller file, for assignments and sharing | 较小的文件，用于作业和分享 |
| `preset.details.best` | Changed | For EchoVideo, YouTube, and similar sites. | 适用于 EchoVideo、YouTube 及类似网站。 |
| `preset.details.smaller` | Changed | For Moodle assignment uploads, email, and messages. | 适用于 Moodle 作业上传、电子邮件和消息。 |
| `preset.inRecord.best` | Added | high quality | 高质量 |
| `preset.inRecord.smaller` | Added | a smaller file | 较小的文件 |
| `preset.inSentence.best` | Added | high quality | 高质量 |
| `preset.inSentence.smaller` | Added | the smaller file | 较小的文件 |
| `create.again` | Added | Create the video again | 重新制作视频 |
| `status.storageWayOut` | Changed | Keep less of the video, choose {smaller}, or free some space, then press Check again. | 减少视频长度，选择{smaller}，或者释放一些空间，然后按“再次检查”。 |
| `result.keptCut` | Added | {kept}, from {from} to {to} | {kept}，从 {from} 到 {to} |
| `preflight.reasons.insufficientStorageResolvable` | Changed | There is not enough free space on this device. This job needs about {size} of working space. Free some space and try again, keep less of the video, or choose {smaller}. | 此设备上的可用空间不足。此作业需要大约 {size} 的工作空间。请释放一些空间后重试，或保留更少的视频内容，或选择{smaller}。 |
| `warnings.keptTooLittleAudio.heading` | Added | The part you kept has too little audio to level | 您保留的部分音频太少，无法调节音量 |
| `warnings.keptTooLittleAudio.detail` | Added | The new video will have no audio. If you want the audio, move the start or end time to keep more of the video where there is audio. | 新视频将没有音频。如果您需要音频，请调整开始时间或结束时间，多保留一些有音频的部分。 |
| `warnings.wholeTooLittleAudio.heading` | Added | This video has too little audio to level | 此视频的音频太少，无法调节音量 |
| `warnings.wholeTooLittleAudio.detail` | Added | It has less than half a second of sound, too short to level, so the new video will have no audio. Your original file keeps its sound. | 它的声音不到半秒，太短，无法调节音量，因此新视频将没有音频。您的原始文件仍保留声音。 |
| `warnings.heavyLimiting.heading` | Added | The loudest moments were held down hard | 最响亮的部分被大幅压低了 |
| `warnings.heavyLimiting.detail` | Added | To reach the usual level, the tool had to hold down the loudest moments of this recording hard. That can make a voice sound flat or squashed, so play the new video before you use it. Next time, try adjusting how you record the sound. | 为了达到通常的水平，本工具不得不大幅压低这段录音中最响亮的部分。这可能会让人声听起来平淡、缺乏起伏，所以请在使用之前播放新视频。下次录音时，可以尝试调整录制声音的方式。 |
| `failure.unlevellable.next` | Changed | Use the Report a problem button, which adds details that will help. | 请使用“报告问题”按钮，该按钮会附上有助于解决问题的详细信息。 |
| `failure.encoderRefused.next` | Changed | Try the other option under File size / quality. If the problem happens again, report it with the Report a problem button, which adds details that will help. | 请尝试“文件大小/质量”下的另一个选项。如果问题再次出现，请使用“报告问题”按钮报告，该按钮会附上有助于解决问题的详细信息。 |
| `failure.checkFailed.next` | Changed | Press Check again to run the check once more. If the check fails again, use the Report a problem button. | 点击“再次检查”重新运行一次检查。如果检查仍然失败，请使用“报告问题”按钮。 |
| `failure.tryAgain` | Changed | Try again. If the problem happens again, report it with the Report a problem button, which adds details that will help. | 请再试一次。如果问题再次出现，请使用“报告问题”按钮报告，该按钮会附上有助于解决问题的详细信息。 |
| `failure.startup.workerNotStarted` | Changed | The part of the tool that does the work did not start. Reload the page. If the problem happens again, report it with the Report a problem button. | 执行操作的工具部分未启动。请重新加载页面。如果问题再次出现，请使用“报告问题”按钮报告。 |
| `systemCheck.rows.secure` | Changed | Secure connection | 安全连接 |
| `systemCheck.rows.webcodecs` | Changed | Video processing (WebCodecs) | 视频处理（WebCodecs） |
| `systemCheck.rows.h264` | Changed | Output video format (H.264) | 输出视频格式（H.264） |
| `systemCheck.rows.aac` | Changed | Output audio format (AAC) | 输出音频格式（AAC） |
| `feedback.open` | Changed | Report a problem | 报告问题 |
| `feedback.heading` | Changed | Report a problem | 报告问题 |
| `statement.covers` | Changed | This statement covers UoN Video Finisher, the page you are on. | 本声明适用于 UoN 视频成片工具，即您当前所在的页面。 |
| `statement.limits.items[5]` | Added | The Choose File button belongs to your browser. On the Chinese and Malay pages, its words are in your browser’s language. To use it by voice, say the step’s name, “Choose a video”. | “选择文件”按钮属于您的浏览器。在中文和马来文页面上，按钮上的文字使用您浏览器的语言。如需用语音操作，请说出该步骤的名称“选择一个视频”。 |
| `statement.contact.text` | Changed | If you find a problem with this tool, or need its information in another way, email the learning content team at {address}. | 如果您在使用本工具时发现问题，或需要以其他形式获取其中的信息，请发送电子邮件至 {address} 联系学习内容团队。 |
| `statement.testing.walk` | Added | In October 2026, an automated check in Chrome went through the page’s main states in all three languages, at computer and phone widths, in light and dark colours, in Chrome’s imitation of high contrast mode, and with larger text. This was not a test by a person. | 2026 年 10 月，我们在 Chrome 浏览器中进行了一次自动化检查，以全部三种语言、按电脑和手机的屏幕宽度、在浅色和深色配色下、在 Chrome 模拟的高对比度模式下以及放大文字的情况下，检查了页面的主要状态。这并非由人进行的测试。 |
| `statement.about.dates` | Changed | This statement was written on {date} and updated on {updatedDate}. Joe Bell reviewed it. We will review it again by {reviewDate}. | 本声明撰写于{date}，更新于{updatedDate}，并已由 Joe Bell 审核。我们将在{reviewDate}之前再次审核本声明。 |
| `footer.heading` | Added | Help and feedback | 帮助和反馈 |
| `footer.groups.help` | Added | Need help using the tool? | 需要使用本工具的帮助？ |
| `footer.groups.problem` | Added | Something not working? | 有功能无法正常使用？ |
| `footer.groups.opinion` | Added | What do you think of the tool? | 您觉得本工具怎么样？ |
| `footer.feedbackForm` | Changed | Please tell us what you think in the feedback form (new tab) | 请在反馈表中告诉我们您的想法（在新标签页中打开） |
| `footer.contact.creators` | Changed | Staff: ask in the Creators team on Teams (new tab) | 教职员工：在 Teams 上的创作团队中提问（在新标签页中打开） |
| `footer.contact.selfService` | Added | Students: get help through Self Service (new tab) | 学生：通过 Self Service 获取帮助（在新标签页中打开） |
| `format.alone.unknown` | Added | Unknown | 未知 |
| `format.alone.lessThanASecond` | Added | Less than a second | 不到一秒 |

## Malay, ms-MY

28 added and 35 changed.

| Key | Added or changed | English (en-GB) | Malay |
| --- | --- | --- | --- |
| `app.title` | Changed | UoN Video Finisher | Penyiap Video UoN |
| `app.description` | Changed | Add the University of Nottingham’s approved branding to a video, level its audio, and get a video file sized and formatted for your intended use, without uploading it anywhere. | Tambahkan penjenamaan Universiti Nottingham yang diluluskan pada video, seimbangkan audionya dan dapatkan fail video yang saiz dan formatnya sesuai untuk tujuan penggunaan anda, tanpa memuat naiknya ke mana-mana. |
| `lede.about.label` | Added | About this tool | Perihal alat ini |
| `lede.promises[0]` | Changed | Lets you trim unwanted footage from the start and end. | Membolehkan anda memotong rakaman yang tidak diingini di awal dan akhir. |
| `lede.promises[1]` | Changed | Adds opening and closing graphics. | Menambah grafik pembukaan dan grafik penutup. |
| `lede.promises[2]` | Changed | Evens out the audio level for better audience experience. | Menyamakan paras audio untuk pengalaman penonton yang lebih baik. |
| `lede.promises[3]` | Added | Saves in a reliable format. | Menyimpan dalam format yang boleh dipercayai. |
| `lede.promises[4]` | Added | Makes the file the right size for your purpose. | Menjadikan saiz fail sesuai dengan tujuan anda. |
| `lede.formatHelp.label` | Added | About the video format | Perihal format video |
| `lede.formatHelp.text` | Added | Videos come in many formats. Some play on one device but not another, or do not work with some apps. This tool saves your video as an MP4, the most interoperable video format. That means it plays on almost any phone, computer or website. | Video wujud dalam banyak format. Sesetengahnya dimainkan pada satu peranti tetapi tidak pada peranti lain, atau tidak berfungsi dengan sesetengah aplikasi. Alat ini menyimpan video anda sebagai MP4, format video yang paling saling boleh kendali. Ini bermakna ia boleh dimainkan pada hampir mana-mana telefon, komputer atau laman web. |
| `videoKind.nextVideo` | Added | Changes to the video type apply to the next video you make. | Perubahan pada jenis video digunakan untuk video seterusnya yang anda buat. |
| `videoLanguage.helper` | Changed | Words the tool adds to your video, on the title card and the closing graphics, are in this language. | Perkataan yang ditambah oleh alat pada video anda, pada kad tajuk dan grafik penutup, adalah dalam bahasa ini. |
| `trim.keepingCut` | Added | Keeping {kept}. | Menyimpan {kept}. |
| `closing.types.none` | Changed | No closing graphics | Tiada grafik penutup |
| `closing.onsetLabel` | Changed | Plays over | Dimainkan di atas |
| `closing.onsets.existing` | Changed | The last second of video | Saat terakhir video |
| `closing.onsets.freeze` | Changed | A held last frame | Bingkai akhir ditahan |
| `closing.helpLabel` | Changed | About what the graphics play over | Perihal apa yang ditindih grafik |
| `closing.helpExistingTerm` | Changed | The last second of video | Saat terakhir video |
| `closing.helpExistingText` | Changed | — the closing graphics cover it as they build. | — grafik penutup menutupinya semasa ia terbentuk. |
| `closing.helpFreezeTerm` | Changed | A held last frame | Bingkai akhir ditahan |
| `closing.notUsedWith.none` | Changed | Not used without closing graphics. | Tidak digunakan tanpa grafik penutup. |
| `preset.labels.best` | Changed | High quality, for publishing | Kualiti tinggi, untuk penerbitan |
| `preset.labels.smaller` | Changed | Smaller file, for assignments and sharing | Fail lebih kecil, untuk tugasan dan perkongsian |
| `preset.details.best` | Changed | For EchoVideo, YouTube, and similar sites. | Untuk EchoVideo, YouTube dan laman yang serupa. |
| `preset.details.smaller` | Changed | For Moodle assignment uploads, email, and messages. | Untuk muat naik tugasan Moodle, e-mel dan mesej. |
| `preset.inRecord.best` | Added | high quality | kualiti tinggi |
| `preset.inRecord.smaller` | Added | a smaller file | fail yang lebih kecil |
| `preset.inSentence.best` | Added | high quality | kualiti tinggi |
| `preset.inSentence.smaller` | Added | the smaller file | fail yang lebih kecil |
| `create.again` | Added | Create the video again | Cipta video itu semula |
| `result.keptCut` | Added | {kept}, from {from} to {to} | {kept}, dari {from} hingga {to} |
| `warnings.keptTooLittleAudio.heading` | Added | The part you kept has too little audio to level | Bahagian yang anda simpan mempunyai terlalu sedikit audio untuk diratakan |
| `warnings.keptTooLittleAudio.detail` | Added | The new video will have no audio. If you want the audio, move the start or end time to keep more of the video where there is audio. | Video baharu tidak akan mempunyai audio. Jika anda mahukan audio itu, ubah masa mula atau masa tamat untuk menyimpan lebih banyak bahagian video yang ada audio. |
| `warnings.wholeTooLittleAudio.heading` | Added | This video has too little audio to level | Video ini mempunyai terlalu sedikit audio untuk diratakan |
| `warnings.wholeTooLittleAudio.detail` | Added | It has less than half a second of sound, too short to level, so the new video will have no audio. Your original file keeps its sound. | Bunyinya kurang daripada setengah saat, terlalu pendek untuk diratakan, jadi video baharu tidak akan mempunyai audio. Fail asal anda masih mengekalkan bunyinya. |
| `warnings.heavyLimiting.heading` | Added | The loudest moments were held down hard | Bahagian paling kuat telah ditekan dengan banyak |
| `warnings.heavyLimiting.detail` | Added | To reach the usual level, the tool had to hold down the loudest moments of this recording hard. That can make a voice sound flat or squashed, so play the new video before you use it. Next time, try adjusting how you record the sound. | Untuk mencapai tahap biasa, alat ini terpaksa menekan bahagian paling kuat dalam rakaman ini dengan banyak. Ini boleh menyebabkan suara kedengaran mendatar atau termampat, jadi mainkan video baharu sebelum anda menggunakannya. Lain kali, cuba ubah cara anda merakam bunyi. |
| `failure.unlevellable.next` | Changed | Use the Report a problem button, which adds details that will help. | Gunakan butang Laporkan masalah, yang menambah butiran yang akan membantu. |
| `failure.encoderRefused.next` | Changed | Try the other option under File size / quality. If the problem happens again, report it with the Report a problem button, which adds details that will help. | Cuba pilihan lain di bawah Saiz/kualiti fail. Jika masalah itu berlaku lagi, laporkannya dengan butang Laporkan masalah, yang menambah butiran yang akan membantu. |
| `failure.checkFailed.next` | Changed | Press Check again to run the check once more. If the check fails again, use the Report a problem button. | Tekan Semak semula untuk menjalankan semakan sekali lagi. Jika semakan gagal lagi, gunakan butang Laporkan masalah. |
| `failure.tryAgain` | Changed | Try again. If the problem happens again, report it with the Report a problem button, which adds details that will help. | Cuba lagi. Jika masalah itu berlaku lagi, laporkannya dengan butang Laporkan masalah, yang menambah butiran yang akan membantu. |
| `failure.startup.workerNotStarted` | Changed | The part of the tool that does the work did not start. Reload the page. If the problem happens again, report it with the Report a problem button. | Bahagian alat yang melakukan kerja tidak bermula. Muat semula halaman. Jika masalah itu berlaku lagi, laporkannya dengan butang Laporkan masalah. |
| `systemCheck.rows.secure` | Changed | Secure connection | Sambungan selamat |
| `systemCheck.rows.webcodecs` | Changed | Video processing (WebCodecs) | Pemprosesan video (WebCodecs) |
| `systemCheck.rows.h264` | Changed | Output video format (H.264) | Format video keluaran (H.264) |
| `systemCheck.rows.aac` | Changed | Output audio format (AAC) | Format audio keluaran (AAC) |
| `feedback.open` | Changed | Report a problem | Laporkan masalah |
| `feedback.heading` | Changed | Report a problem | Laporkan masalah |
| `statement.covers` | Changed | This statement covers UoN Video Finisher, the page you are on. | Kenyataan ini meliputi Penyiap Video UoN, iaitu halaman yang sedang anda gunakan. |
| `statement.limits.items[5]` | Added | The Choose File button belongs to your browser. On the Chinese and Malay pages, its words are in your browser’s language. To use it by voice, say the step’s name, “Choose a video”. | Butang Pilih Fail ialah milik pelayar anda. Pada halaman bahasa Cina dan Bahasa Malaysia, perkataannya dalam bahasa pelayar anda. Untuk menggunakannya dengan suara, sebut nama langkah itu, “Pilih video”. |
| `statement.contact.text` | Changed | If you find a problem with this tool, or need its information in another way, email the learning content team at {address}. | Jika anda menemui masalah dengan alat ini, atau memerlukan maklumatnya dalam bentuk lain, sila hantar e-mel kepada pasukan kandungan pembelajaran di {address}. |
| `statement.testing.walk` | Added | In October 2026, an automated check in Chrome went through the page’s main states in all three languages, at computer and phone widths, in light and dark colours, in Chrome’s imitation of high contrast mode, and with larger text. This was not a test by a person. | Pada Oktober 2026, satu semakan automatik dalam Chrome meliputi keadaan utama halaman dalam ketiga-tiga bahasa, pada lebar skrin komputer dan telefon, dalam warna cerah dan gelap, dalam mod kontras tinggi tiruan Chrome, dan dengan teks yang lebih besar. Ini bukan ujian oleh seseorang. |
| `statement.about.dates` | Changed | This statement was written on {date} and updated on {updatedDate}. Joe Bell reviewed it. We will review it again by {reviewDate}. | Kenyataan ini ditulis pada {date} dan dikemas kini pada {updatedDate}. Joe Bell telah menyemaknya. Kami akan mengkajinya semula selewat-lewatnya pada {reviewDate}. |
| `footer.heading` | Added | Help and feedback | Bantuan dan maklum balas |
| `footer.groups.help` | Added | Need help using the tool? | Perlukan bantuan menggunakan alat ini? |
| `footer.groups.problem` | Added | Something not working? | Ada sesuatu yang tidak berfungsi? |
| `footer.groups.opinion` | Added | What do you think of the tool? | Apakah pendapat anda tentang alat ini? |
| `footer.feedbackForm` | Changed | Please tell us what you think in the feedback form (new tab) | Sila beritahu kami pendapat anda dalam borang maklum balas (dibuka dalam tab baharu) |
| `footer.contact.creators` | Changed | Staff: ask in the Creators team on Teams (new tab) | Kakitangan: tanya dalam pasukan pencipta di Teams (dibuka dalam tab baharu) |
| `footer.contact.selfService` | Added | Students: get help through Self Service (new tab) | Pelajar: dapatkan bantuan melalui Self Service (dibuka dalam tab baharu) |
| `format.alone.unknown` | Added | Unknown | Tidak diketahui |
| `format.alone.lessThanASecond` | Added | Less than a second | Kurang daripada satu saat |

## A sentence now shown alone

VH-236 changed no key: where step 1 refuses a file, the page now says only the first sentence of `trim.noPreview` ("A preview is not available for this file."), leaving out "You can still set the times.". Please check that the first sentence reads whole on its own in your language.

## Removed in Phase 8

These keys left both tables; there is nothing to read: `lede.intro`, `browserNote.pending`, `browserNote.passed`, `videoLanguage.nextVideo`, `footer.contact.intro`, `footer.contact.learningContent`.
