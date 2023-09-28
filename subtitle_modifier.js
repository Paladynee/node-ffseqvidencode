/** @format */

// ffmpeg -i out.mp4 -i source.mkv -map 0 -map -0:s -map 1:4 -c copy -c:s mov_text final2.mp4

const fs = require("fs");
const { spawn } = require("child_process");

const files = fs
  .readdirSync("./videos/")
  .filter((filename) =>
    filename.includes(
      "[Valenciano] Yahari Ore no Seishun Love Come wa Machigatteiru. - S0"
    )
  )
  .sort();
const outputPath = "D:\\fixed_subs\\";

const ffmpegStrs = [];

for (let filename of files) {
  let source = "D:\\videos\\" + filename;
  let output = "D:\\out\\" + filename + "_out2.mp4";

  const ffmpegStr = `ffmpeg -i "${output}" -i "${source}" -map 0 -map -0:s -map 1:4 -c copy -c:s mov_text "${outputPath}fixed_${filename}_out2.mp4"`;
  ffmpegStrs.push(ffmpegStr);
}

let curr = 0;

function next() {
  let ffmpegStr = ffmpegStrs[curr];
  const ffmpegProcess = spawn("cmd", ["/c", ffmpegStr], { shell: true });

  ffmpegProcess.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  ffmpegProcess.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  ffmpegProcess.on("exit", async (code) => {
    if (code === 0) {
      curr++;
      if (curr >= ffmpegStrs.length) return;
      next();
    } else {
      console.error(`Error processing ${filename}`);
    }
  });
}

next();
