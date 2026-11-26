#!/bin/zsh
# VH-209 #1: the repairs' groups of one side. Usage: zsh seq2.zsh before|after <walker> <app> [groups…]
side=$1; W=$2; A=$3; shift 3
D=/Users/joe/UoN-Video-Helper-side/vh209-walk; cd "$D"
L=en-GB,zh-Hans,ms-MY; F=font32,dark-font32,forced-light-font32,forced-dark-font32
FOC='#trim-set-start|#trim-set-end|#language-switcher input:checked|#video-kind input:checked|#video-language input:checked|#closing-colour input:checked|.system-check > summary|.statement > summary'
groups=("$@"); [ ${#groups} = 0 ] && groups=(rings1 rings2 rings3 sp32 states32 defopen)
for g in $groups; do
  case "$g" in
    rings1) job="source ./jobs2.zsh; walkset2 $side rings1 S-113 $L w320,w401 $F '' '$FOC' '' ''";;
    rings2) job="source ./jobs2.zsh; walkset2 $side rings2 S-113 $L w320,w401 $F '' '#closing-colour input:checked' '#closing-colour input[value=\"white\"]' ''";;
    rings3) job="source ./jobs2.zsh; walkset2 $side rings3 S-113 $L w320,w401 $F '' '#video-kind input:checked' '#video-kind input[value=\"submission\"]' ''";;
    sp32) job="source ./jobs2.zsh; walkset2 $side sp32 S-113,S-03 $L w320,w401 font32 '' '' '' 1";;
    states32) job="source ./jobs2.zsh; walkset2 $side states32 S-76,S-114,S-83 $L w320,w401 font32 '' '' '' ''";;
    defopen) job="source ./jobs2.zsh; walkset2 $side defopen S-03 $L w1280,w401,w320 light,forced-dark S-03 '' '' ''";;
    *) echo "unknown $g"; exit 2;;
  esac
  zsh go.sh "$side-$g" "$side $g" "$W" "$A" "$job" > "$side-$g.go.out" 2>&1; rc=$?
  echo "$side-$g exit $rc $(date -u +%T)" >> "$side.seq2.log"
  [ $rc = 0 ] || { echo "SEQ STOP $side-$g rc $rc" >> "$side.seq2.log"; exit $rc; }
done
echo "SEQ DONE $side" >> "$side.seq2.log"
