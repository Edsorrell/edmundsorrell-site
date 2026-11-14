import yaml from "js-yaml";
export default function (cfg) {
  cfg.addDataExtension("yaml,yml", (c) => yaml.load(c));
  cfg.addPassthroughCopy({ "src/css": "css", "src/img": "img", "src/media": "media", "src/fonts": "fonts", "src/icons": "/" });
  cfg.addPassthroughCopy({ "src/_redirects": "_redirects" });
  cfg.addFilter("words", (s) => String(s || "").trim().split(/\s+/));
  return { dir: { input: "src", output: "_site" }, htmlTemplateEngine: "njk" };
}
