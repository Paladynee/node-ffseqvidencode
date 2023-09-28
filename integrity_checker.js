/** @format */

const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

const folderPath = "D:/out/";
let fileNames = fs.readdirSync(folderPath).sort();
let filePaths = fileNames.map((file) => path.join(folderPath, file));
let index = 0;

checkVideoFile(index);

function checkVideoFile(index) {
  let filePath = filePaths[index];
  let fileName = fileNames[index];
  console.log("started checking for " + filePath);

  // ffmpeg.exe -v error -i file.avi -f null - >error.log 2>&1
  const ffmpegCommand = `ffmpeg -v error -i "${filePath}" -f null - >"D:\\checker\\results_${fileName}.log" 2>&1`;

  child_process.exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(error.message);
    }

    if (stderr) {
      const errorMessage = stderr.toString();
      if (errorMessage.includes("Error while decoding")) {
        console.log(`File ${filePath} is corrupted.`);
      } else if (errorMessage.includes("Conversion failed")) {
        console.log(`File ${filePath} operation interrupted.`);
      } else {
        console.log(errorMessage);
      }
    } else {
      console.log(stdout.toString());
      console.log(`File ${filePath} is fine.`);
      checkVideoFile(index + 1);
    }
  });
}
