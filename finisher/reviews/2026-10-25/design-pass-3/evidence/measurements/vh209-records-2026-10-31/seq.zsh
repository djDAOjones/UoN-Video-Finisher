#!/bin/zsh
# VH-209 #1: the groups of one side, in sequence, one at a time; stops at the first non-zero exit. Usage: zsh seq.zsh before|after <walker> <app> [groups…]
side=$1; W=$2; A=$3; shift 3
D=/Users/joe/UoN-Video-Helper-side/vh209-walk; cd "$D"
L=en-GB,zh-Hans,ms-MY; F=font32,dark-font32,forced-light-font32,forced-dark-font32; C=light,dark,forced-light,forced-dark; V3=w1280,w401,w320
groups=("$@"); [ ${#groups} = 0 ] && groups=(six open f32 pages32 defa defb defc)
for g in $groups; do
  case "$g" in
    six) job='node "$WALKER/rings-179.mjs" v18';;
    open) job="source ./jobs.zsh; walkset $side open S-03,S-113 $L w320,w401 font32 S-03,S-113";;
    f32) job="source ./jobs.zsh; walkset $side f32 S-113 $L w1280,w640,w401,w400,w375,w320 $F";;
    pages32) job="source ./jobs.zsh; walkset $side pages32 S-03,S-15,S-119 $L w401,w320 $F";;
    defa) job="source ./jobs.zsh; walkset $side defa S-03,S-15 $L $V3 $C";;
    defb) job="source ./jobs.zsh; walkset $side defb S-119,S-83 $L $V3 $C";;
    defc) job="source ./jobs.zsh; walkset $side defc S-111 $L w1280 $C; walkset $side defc2 S-112 $L w401,w320 $C";;
    *) echo "unknown $g"; exit 2;;
  esac
  zsh go.sh "$side-$g" "$side $g" "$W" "$A" "$job" > "$side-$g.go.out" 2>&1; rc=$?
  echo "$side-$g exit $rc $(date -u +%T)" >> "$side.seq.log"
  [ $rc = 0 ] || { echo "SEQ STOP $side-$g rc $rc" >> "$side.seq.log"; exit $rc; }
done
echo "SEQ DONE $side" >> "$side.seq.log"
