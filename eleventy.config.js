import yaml from "js-yaml";
import fs from "node:fs";
const dimCache = {};
function jpegDims(src) {
  if (dimCache[src]) return dimCache[src];
  let d = [3, 2];
  try {
    const b = fs.readFileSync("src" + src);
    if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
      const k = b.toString("ascii", 12, 16);
      if (k === "VP8X") d = [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
      else if (k === "VP8L") { const v = b.readUInt32LE(21); d = [1 + (v & 0x3fff), 1 + ((v >> 14) & 0x3fff)]; }
      else if (k === "VP8 ") d = [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
      return (dimCache[src] = d);
    }
    if (b[0] === 0x89 && b[1] === 0x50) return (dimCache[src] = [b.readUInt32BE(16), b.readUInt32BE(20)]);
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
