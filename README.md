# ⚠️ WARNING! HARDCODED PATH VALUES FOR DRIVE D:/ ⚠️

# node-ffseqvidencode - encode videos sequentially using node.js and ffmpeg

### requirements:
Node.js (unknown version)

ffmpeg.exe (unknown version)

ffprobe.exe (unknown version, for subtitle_checker.js only)


these programs have to be in PATH.

### required folders in the folder containing start.js:

videos/

out/

broken_subs/

fixed_subs/

checker/

subinfos/

# workflow

### run `node start.js`.

it scans every file in `videos/` and encode it using `h264_nvenc`. outputs will be saved to `out/{filename}_out2.mp4`.

### running `node integrity_checker.js`

it scans every file in `out/` and runs an ffmpeg error check on it. results are saved to `checker/results_{filename}.log`.

### running `node remaining_files.js`

scans both `videos/` and `out/` and reports back into `remaining.txt` which files are rendered, which files are waiting and the total amounts.

### running `node subtitle_checker.js`

isn't actually a subtitle checker. runs an ffprobe command on every file in `out/`. writes results to `checker/{filename}.subinfo`. why is it named this way? because i used it to fix my broken subtitles. just an ffprobe scan.

### running `node subtitle_modifier.js`
modifying this file is necessary for modification. apply your filter for filename in line 11. apply your subtitle mapping at line 24, at the `-map` fields.

used to map subtitles from `videos/` into `out/` where `videos/file.extension` has broken subtitles and `out/source.extension` has the correct ones.

can occur if the source videos does not have the desired subtitle at index `s:0`. writes the output to `fixed_subs/fixed_{filename}`.

### running `node subinfo_cleaner.js`

unused right now. i used it when i used to write `.subinfo` files directly to `out/`.
