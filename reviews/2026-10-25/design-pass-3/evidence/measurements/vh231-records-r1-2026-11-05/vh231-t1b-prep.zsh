#!/bin/zsh
# VH-231 #6: `npm ci` in the temporary base worktree $S/vh231-base (4bc3a40, detached), once, under the walk lock, taken at the
# queue's turn (run after walk-queue-wait-seq.zsh in t1b's chain, before go.sh t1b). Orchestrator #41's plan for must 1.
S=/Users/uazjob/UoN-Video-Helper-side; B=$S/vh231-base; LOCK=$S/walk.lock; WHO="VH-231 #6"; LOG=$S/vh231-t1b-npm-ci.log
test ! -e $LOG || { echo "EXISTS $LOG"; exit 2; }
pmset -g batt | head -1 | grep -q 'AC Power' || { echo "NOT ON AC"; exit 7; }
mkdir "$LOCK" || { echo "LOCK HELD: $(cat $LOCK/owner.txt 2>/dev/null)"; exit 3; }
echo "$WHO — $(date -u +%FT%TZ) — npm ci in vh231-base (t1b's before tree)" > "$LOCK/owner.txt"
caffeinate -i -w $$ & CAF=$!
echo "start $(date -u +%FT%TZ) $(uptime)" > $LOG
cd "$B" && echo "pwd $(pwd) head $(git rev-parse HEAD) porcelain $(git status --porcelain | wc -l | tr -d ' ')" >> $LOG
npm ci --prefer-offline >> $LOG 2>&1; rc=$?
echo "end $(date -u +%FT%TZ) exit $rc $(uptime)" >> $LOG
echo "after: porcelain $(git -C "$B" status --porcelain | wc -l | tr -d ' ') diff $(git -C "$B" diff --binary | shasum -a 1 | cut -c1-16)" >> $LOG
kill $CAF 2>/dev/null
grep -q "$WHO" "$LOCK/owner.txt" && rm -r "$LOCK"
echo "npm ci exit $rc"; exit $rc
