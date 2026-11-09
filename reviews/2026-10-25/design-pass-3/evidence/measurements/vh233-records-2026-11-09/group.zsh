#!/bin/zsh
# VH-233 #1 (WHO and queue label #2 by VH-233 #2): one group, queued afresh (a new queue line), then go.sh (AC, the 1- and 5-minute loads below 8, the lock), the job line in $W.
#   zsh group.zsh <name> "<what>" '<job line>'   — the chain's pid in <name>.chain.pid; the base check written to <name>.base.txt first.
S=/Users/uazjob/UoN-Video-Helper-side; W=$S/vh233; WK="$W/reviews/2026-10-25/design-pass-3/evidence/measurements/walker"; D=$S/vh233-walk
BASE=73d16f085fc2bda8a76c79263b67d3034262aa78
N=$1; WHAT=$2; JOB=$3; cd $D || exit 2
for f in "$N.chain.pid" "$N.go.out" "$N.base.txt"; do [ -e "$f" ] && { echo "EXISTS $f"; exit 2; }; done
echo $$ > $N.chain.pid
{ echo "at $(date -u +%FT%TZ) head $(git -C $W rev-parse HEAD) diff-binary $(git -C $W diff --binary | shasum -a 1 | cut -c1-16) porcelain $(git -C $W status --porcelain | wc -l | tr -d ' ')";
  git -C $W diff --quiet $BASE -- src index.html public package.json package-lock.json vite.config.ts && echo "app as base: true (git diff --quiet $BASE -- src index.html public package.json package-lock.json vite.config.ts)" || echo "app as base: false";
  echo "walker $(cd $WK && node --input-type=module -e "const m=await import(process.cwd()+'/runner.mjs');console.log(m.instrumentRevision().revision)")";
  shasum -a 1 go.sh walk.sh vh233-driver.mjs vh233-probe.mjs; } > $N.base.txt 2>&1
QPID=$$ zsh $S/walk-queue-wait-seq.zsh "VH-233 #2 $N ($WHAT)" > $N.go.out 2>&1 && zsh go.sh $N "VH-233 $WHAT ($N)" "$WK" "$W" "$JOB" >> $N.go.out 2>&1
rc=$?; echo "group $N exit $rc $(date -u +%T)"; tail -3 $N.go.out; exit $rc
