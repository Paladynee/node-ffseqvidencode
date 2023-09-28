/** @format */

const fs = require("fs");

const sources = fs
  .readdirSync("./videos/")
  .map((fileName) => "D:\\videos\\" + fileName);
const outputs = fs
  .readdirSync("./out/")
  .map((fileName) => "D:\\out\\" + fileName);

const filter = (fileName) => fileName.endsWith(".subinfo");

const total = [...sources, ...outputs].filter(filter).sort();

for (const path of total) {
  fs.unlinkSync(path);
}
