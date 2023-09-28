/** @format */

const fs = require("fs");

let videos = fs.readdirSync("./videos/");
let out = fs.readdirSync("./out/");

let done = [];
let undone = [];

let done_counter = 0;
let undone_counter = 0;
for (let file of videos) {
  if (out.includes(file + "_out2.mp4")) {
    done.push(file);
    done_counter++;
  } else {
    undone.push(file);
    undone_counter++;
  }
}

let total = `Amounts: Done<${done_counter}>, Undone<${undone_counter}>

Done:
${done.join("\n")}

Undone:
${undone.join("\n")}`;

fs.writeFileSync("remaining.txt", total);
