#!/bin/zsh
# VH-232 #3: one side's three groups, in sequence, each queued afresh by its own process (a new queue line per group).
#   zsh side.zsh <label: before|after> <prefix: b|a>
S=/Users/uazjob/UoN-Video-Helper-side; W=$S/vh232; WK="$W/reviews/2026-10-25/design-pass-3/evidence/measurements/walker"; D=$S/vh232-walk
L=$1; P=$2; cd $D || exit 2
J='node vh232-driver.mjs walk --walker "$WALKER" --label '$L' --set'
for g in 1 2 3; do
  case $g in
    1) JOB="$J matrix --name m-light --modes light && $J matrix --name m-dark --modes dark";;
    2) JOB="$J matrix --name m-forced-light --modes forced-light && $J matrix --name m-forced-dark --modes forced-dark";;
    3) JOB="$J extras-a --name x-a && $J extras-b --name x-b && $J keys --name keys";;
  esac
  zsh -c "zsh $S/walk-queue-wait-seq.zsh 'VH-232 #4 $P$g ($L)' && zsh go.sh $P$g 'VH-232 $L group $P$g' '$WK' '$W' '$JOB'" > $P$g.go.out 2>&1
  rc=$?; echo "$P$g go exit $rc $(date -u +%T)"; [ $rc = 0 ] || exit $rc
  grep -c '^recorded' $P$g/logs/job1.log | sed "s/^/$P$g recorded /"; grep -cE 'not reached|setup failed|state lost' $P$g/logs/job1.log | sed "s/^/$P$g problems /"
done
