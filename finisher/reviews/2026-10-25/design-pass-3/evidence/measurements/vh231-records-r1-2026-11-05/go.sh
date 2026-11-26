#!/bin/zsh
# VH-231 #3, from VH-216 #2's go-2.sh (8008f234), adapted only for the Mac Pro (macpro-39, macpro-40) and Orchestrator #40's lock rulings.
# Waits, checking every 60 s, for AC Power (this Mac's pmset prints no powermode line: it passes then, as at 2 only), the 1- and
# 5-minute loads below 8 and a free walk lock. The turn is Orchestrator #40's first-come queue from 12:45Z
# (walk-queue-wait-seq.zsh, run before this in the same chain); no turn rule here. No 45-minute limit: one line (exit 9) only
# when one holder has held the lock for 3 h. Then walk.sh once; logs as go-2.sh.
# Usage: zsh walk-queue-wait-seq.zsh "<who> <what>" && zsh go.sh <name> <what for the lock> <walker dir> <app root> "<job line>" …
D=/Users/uazjob/UoN-Video-Helper-side/vh231-walk
NAME=$1
LOCK=/Users/uazjob/UoN-Video-Helper-side/walk.lock
for f in "$D/$NAME" "$D/$NAME.launcher.log" "$D/$NAME.load.log"; do [ -e "$f" ] && { echo "EXISTS: $f"; exit 2; }; done
HOLD=""; HSINCE=$(date +%s)
while :; do
  while :; do
    L=$(uptime | sed -E 's/.*load averages?: ([0-9.]+),? ([0-9.]+).*/\1/'); L5=$(uptime | sed -E 's/.*load averages?: ([0-9.]+),? ([0-9.]+).*/\2/')
    AC=0; pmset -g batt | grep -q 'AC Power' && AC=1
    M=$(pmset -g | sed -nE 's/^ *powermode +([0-9]+).*/\1/p')
    OWN=$(cat $LOCK/owner.txt 2>/dev/null)
    if [ $AC = 1 ] && { [ -z "$M" ] || [ "$M" = 2 ]; } && [ "$(echo "$L < 8 && $L5 < 8" | bc)" = 1 ] && [ ! -e $LOCK ]; then break; fi
    if [ "$OWN" != "$HOLD" ]; then HOLD=$OWN; HSINCE=$(date +%s); fi
    [ -n "$HOLD" ] && [ $(( $(date +%s) - HSINCE )) -ge 10800 ] && { echo "HELD 3 h $(date -u +%T): $(print -r -- "$HOLD" | cut -c1-80)"; exit 9; }
    sleep 60
  done
  echo "GO $(date -u +%T) load $L $L5 AC powermode ${M:-none}" >> "$D/$NAME.launcher.log"
  ( while :; do echo "$(date -u +%T) load $(uptime | sed -E 's/.*load averages?: ([0-9.]+).*/\1/') $(pmset -g batt | sed -nE "1s/Now drawing from '(.*)'/\1/p") $(pmset -g batt | grep -oE '[0-9]+%' | head -1) pm$(pmset -g | sed -nE 's/^ *powermode +([0-9]+).*/\1/p')" >> "$D/$NAME.load.log"; sleep 30; done ) &
  LP=$!
  zsh "$D/walk.sh" "$@" >> "$D/$NAME.launcher.log" 2>&1
  rc=$?
  kill $LP 2>/dev/null; wait $LP 2>/dev/null
  echo "walk exit $rc $(date -u +%T)" >> "$D/$NAME.launcher.log"
  if { [ $rc = 3 ] || [ $rc = 8 ]; } && [ ! -e "$D/$NAME" ]; then continue; fi
  echo "walk exit $rc"; exit $rc
done
