#!/bin/zsh
# VH-235 #1 (from VH-216 #2's go-2.sh, adapted by macpro-39/-40: paths; AC with no powermode line on this Mac; 1- and 5-minute loads below 8): wait (up to 45 min, every 60 s) for AC, loads below 8 and a free walk lock; then run walk.sh once,
# logging load, source, level and mode every 30 s into <name>.load.log and the launcher's output into <name>.launcher.log.
# Modelled read-only on VH-212's go-1.sh. Usage: zsh go-1.sh <name> <what for the lock> <walker dir> <app root> "<job line>" …
D=/Users/uazjob/UoN-Video-Helper-side/vh235-walk
NAME=$1
LOCK=/Users/uazjob/UoN-Video-Helper-side/walk.lock
for f in "$D/$NAME" "$D/$NAME.launcher.log" "$D/$NAME.load.log"; do [ -e "$f" ] && { echo "EXISTS: $f"; exit 2; }; done
s=$(date +%s)
while :; do
  while :; do
    L=$(uptime | sed -E 's/.*load averages?: ([0-9.]+).*/\1/'); L5=$(uptime | sed -E 's/.*load averages?: [0-9.]+,? ([0-9.]+).*/\1/')
    AC=0; pmset -g batt | grep -q 'AC Power' && AC=1
    M=$(pmset -g | sed -nE 's/^ *powermode +([0-9]+).*/\1/p')
    if [ $AC = 1 ] && [ -z "$M" ] && [ "$(echo "$L < 8" | bc)" = 1 ] && [ "$(echo "$L5 < 8" | bc)" = 1 ] && [ ! -e $LOCK ]; then break; fi
    [ $(( $(date +%s) - s )) -ge 2700 ] && { echo "NOT READY $(date -u +%T) load $L $L5 ac $AC powermode $M lock $(cat $LOCK/owner.txt 2>/dev/null | cut -c1-80)"; exit 9; }
    sleep 60
  done
  echo "GO $(date -u +%T) load $L $L5 AC, no powermode line" >> "$D/$NAME.launcher.log"
  ( while :; do echo "$(date -u +%T) load $(uptime | sed -E 's/.*load averages?: //') $(pmset -g batt | sed -nE "1s/Now drawing from '(.*)'/\1/p") $(pmset -g batt | grep -oE '[0-9]+%' | head -1) pm$(pmset -g | sed -nE 's/^ *powermode +([0-9]+).*/\1/p')" >> "$D/$NAME.load.log"; sleep 30; done ) &
  LP=$!
  zsh "$D/walk.sh" "$@" >> "$D/$NAME.launcher.log" 2>&1
  rc=$?
  kill $LP 2>/dev/null; wait $LP 2>/dev/null
  echo "walk-1 exit $rc $(date -u +%T)" >> "$D/$NAME.launcher.log"
  if { [ $rc = 3 ] || [ $rc = 8 ]; } && [ ! -e "$D/$NAME" ]; then continue; fi
  echo "walk-1 exit $rc"; exit $rc
done
