/** @format */

const fs = require("fs");
const { spawn } = require("child_process");

const files = fs.readdirSync("./videos/").sort();

function formatDateClosure(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day}.${month}.${year}-${hours}.${minutes}.${seconds}`;
}

function finish() {
  console.log("Done!");

  // TODO: write log
}

function hasRenderedFile(filename) {
  let outFolder = fs.readdirSync("./out/");
  let hasFile = outFolder.some((other) => other === filename + "_out2.mp4");
  console.log("hasRenderedFile for " + filename, hasFile);
  return hasFile;
}

function processFilesSequentially(files, index = 0) {
  if (index >= files.length) return finish();

  const filename = files[index];
  console.log("processFilesSequentially for " + filename);

  if (!hasRenderedFile(filename)) {
    const ffmpegStr = `ffmpeg -y -i "./videos/${filename}" -vf "scale=1280:720,format=yuv420p10le|yuv420p" -c:v h264_nvenc -qp 21 -c:a aac -b:a 128k -c:s mov_text -map_metadata 0 "./out/${filename}_out2.mp4"`;
    // const ffmpegStr = `ffmpeg -y -i "./videos/${filename}" -vf "scale=1280:720" -c:v libx264 -crf 21 -c:a aac -b:a 128k -c:s mov_text -map_metadata 0 "./out/${filename}_out2.mp4"`;
    //`ffmpeg -y -i "./videos/${filename}" -vf "scale=1280:720" -c:v hevc_nvenc -qp 21 -c:a aac -b:a 128k -c:s mov_text -map_metadata 0 "./out/${filename}_out2.mp4"`;

    const ffmpegProcess = spawn("cmd", ["/c", ffmpegStr], { shell: true });

    ffmpegProcess.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    ffmpegProcess.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    ffmpegProcess.on("exit", async (code) => {
      if (code === 0) {
        processFilesSequentially(files, index + 1);
      } else {
        console.error(`Error processing ${filename}`);
      }
    });
  } else {
    // This file has already been processed, move on to the next one
    processFilesSequentially(files, index + 1);
  }
}

processFilesSequentially(files);
