#!/bin/zsh
# VH-231 #3: the fixtures VH-231's cells read, made by the walker's own recipes (fixtures.sh and fixtures-8.sh at walker
# revision 9c52269607bccc4c), each line copied verbatim; nothing else. Run under the walk lock, as a walk. Nothing from samples/.
#   zsh fix-make.sh <fixtures dir>      (this Mac's ffmpeg, /Users/uazjob/.local/bin/ffmpeg, 9.0.2-tessus)
set -e
OUT="$1"
mkdir -p "$OUT"
export PATH="/Users/uazjob/.local/bin:$PATH"
V="-f lavfi -i testsrc2=size=1280x720:rate=25"
A="-f lavfi -i sine=frequency=440:sample_rate=48000"
ENC="-c:v libx264 -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart"
# fixtures.sh: lecture-60s, lecture-30s, silent-10s, truncated-30s, N1 (cut-short-30s.mkv), VH-215's cut WebM.
ffmpeg -v error -y ${=V} ${=A} -t 60 -af "volume=-13dB,aformat=channel_layouts=stereo" ${=ENC} "$OUT/lecture-60s.mp4"
ffmpeg -v error -y ${=V} ${=A} -t 30 -af "volume=-13dB,aformat=channel_layouts=stereo" ${=ENC} "$OUT/lecture-30s.mp4"
ffmpeg -v error -y ${=V} -t 10 -an -c:v libx264 -preset veryfast -pix_fmt yuv420p -movflags +faststart "$OUT/silent-10s.mp4"
SIZE=$(stat -f %z "$OUT/lecture-30s.mp4")
head -c $(( SIZE * 7 / 10 )) "$OUT/lecture-30s.mp4" > "$OUT/truncated-30s.mp4"
ffmpeg -v error -y ${=V} ${=A} -t 30 -af "volume=-13dB,aformat=channel_layouts=stereo" -c:v libx264 -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 128k "$OUT/lecture-30s.mkv"
SIZE=$(stat -f %z "$OUT/lecture-30s.mkv")
head -c $(( SIZE * 7 / 10 )) "$OUT/lecture-30s.mkv" > "$OUT/cut-short-30s.mkv"
rm "$OUT/lecture-30s.mkv"
ffmpeg -v error -y ${=V} ${=A} -t 10 -af "volume=-13dB,aformat=channel_layouts=stereo" -c:v libvpx-vp9 -deadline realtime -cpu-used 8 -b:v 500k -c:a libopus -b:a 64k "$OUT/a-vp9opus.webm"
SIZE=$(stat -f %z "$OUT/a-vp9opus.webm")
head -c $(( SIZE * 9 / 10 )) "$OUT/a-vp9opus.webm" > "$OUT/cut-short-10s.webm"
rm "$OUT/a-vp9opus.webm"
# fixtures-8.sh: clicks-20s (S-136).
ffmpeg -v error -y ${=V} -f lavfi -i "aevalsrc=0.005*sin(2*PI*440*t)+0.3*lt(mod(t\,0.25)\,0.003)*sin(2*PI*2000*t):s=48000:c=mono" -t 20 ${=ENC} "$OUT/clicks-20s.mp4"
# Identity: sha1 and the manifests' sha256 (first 16), bytes.
for f in lecture-60s.mp4 lecture-30s.mp4 silent-10s.mp4 truncated-30s.mp4 cut-short-30s.mkv cut-short-10s.webm clicks-20s.mp4; do
  echo "$f $(stat -f %z "$OUT/$f") sha1 $(shasum -a 1 "$OUT/$f" | cut -c1-40) sha256 $(shasum -a 256 "$OUT/$f" | cut -c1-16)"
done
