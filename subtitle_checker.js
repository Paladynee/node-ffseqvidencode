/** @format */

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const folderPath = "D:/out/";
let files = [];
let index = 0;

function checkVideoFile(index) {
  let filePath = files[index];
  console.log("started checking for " + filePath);
  const probeProcess = spawn("ffprobe", [
    "-i",
    filePath, // Input video file
  ]);

  let subinfoPath = "D:\\subinfos\\" + aux[index] + ".subinfo";

  fs.writeFileSync(subinfoPath, "");
  const stream = fs.createWriteStream(subinfoPath);

  probeProcess.stderr.on("data", (data) => {
    stream.write(data.toString());
    // console.log(data.toString());
  });

  probeProcess.stdout.on("data", (data) => {
    stream.write(data.toString());
    // console.log(data.toString());
  });

  probeProcess.on("exit", (code) => {
    // if (code === 0) {
    //   console.log(`File ${filePath} is fine.`);
    // }
    index++;
    if (index > files.length) return console.log("Done.");
    checkVideoFile(index);
  });
}

let aux = fs.readdirSync(folderPath).sort();
files = aux.map((file) => path.join(folderPath, file));
checkVideoFile(index);

// fs.readdir(folderPath, (err, files) => {
//   if (err) {
//     console.error("Error reading directory:", err);
//     return;
//   }

//   // Filter video files with extensions .mp4, .mkv, .avi, etc.
//   const videoFiles = files.filter((file) => /\.(mp4|mkv|avi|mov)$/i.test(file));

//   // Check each video file
//   videoFiles.forEach((file) => {
//     const filePath = path.join(folderPath, file);
//     checkVideoFile(filePath);
//   });
// });
