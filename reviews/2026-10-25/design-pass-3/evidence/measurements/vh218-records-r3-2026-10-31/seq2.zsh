#!/bin/zsh
# VH-218 #2: the after2 S-82 groups and S-103 by seq.zsh, then S-103 under the AAC warning, after then before (the base by its read-only export). In sequence; stops at the first non-zero exit.
W=$1; A=$2; D=/Users/joe/UoN-Video-Helper-side/vh218-walk; cd "$D"
zsh seq.zsh after2 "$W" "$A" passed pending warned failed s103 || exit $?
zsh go.sh after2-s103-warned "after2 s103 warned" "$W" "$A" 'node vh218-driver-2.mjs walk --walker "$WALKER" --label after2 --name s103-warned --scenarios S-103-warned' > after2-s103-warned.go.out 2>&1; rc=$?; echo "after2-s103-warned exit $rc $(date -u +%T)" >> after2.seq.log; [ $rc = 0 ] || exit $rc
zsh go.sh before-s103-warned "before s103 warned" "$W" "$D/base-export" 'node vh218-driver-2.mjs walk --walker "$WALKER" --label before --name s103-warned --scenarios S-103-warned' > before-s103-warned.go.out 2>&1; rc=$?; echo "before-s103-warned exit $rc $(date -u +%T)" >> after2.seq.log; [ $rc = 0 ] || exit $rc
echo "SEQ2 DONE" >> after2.seq.log
