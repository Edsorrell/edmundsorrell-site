import yaml from "js-yaml";
import fs from "node:fs";
const dimCache = {};
function jpegDims(src) {
  if (dimCache[src]) return dimCache[src];
  let d = [3, 2];
  try {
    const b = fs.readFileSync("src" + src);
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1];
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) { d = [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)]; break; }
      i += 2 + b.readUInt16BE(i + 2);
    }
  } catch (e) {}
  return (dimCache[src] = d);
}
export default function (cfg) {
  cfg.addDataExtension("yaml,yml", (c) => yaml.load(c));
  cfg.addPassthroughCopy({ "src/css": "css", "src/img": "img", "src/media": "media", "src/fonts": "fonts", "src/js": "js", "src/icons": "/" });
  cfg.addPassthroughCopy({ "src/_redirects": "_redirects", "src/robots.txt": "robots.txt" });
  cfg.addFilter("dims", (src) => jpegDims(src));
  cfg.addFilter("words", (s) => String(s || "").trim().split(/\s+/));
  return { dir: { input: "src", output: "_site" }, htmlTemplateEngine: "njk" };
}
