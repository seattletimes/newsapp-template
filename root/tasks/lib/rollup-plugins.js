var fs = require("fs").promises;
var path = require("path");

// text import plugin
var textExtensions = new Set([".svg", ".html", ".txt", ".glsl"]);
var importText = function() {
  return {
    name: "import-text",
    async load(id) {
      var extension = path.extname(id);
      if (!textExtensions.has(extension)) return null;
      var text = await fs.readFile(id, "utf-8");
      var code = "export default " + JSON.stringify(text);
      return { code };
    }
  }
};

var cssExtensions = new Set([".css", ".less"]);
var importLESS = function() {
  return {
    name: "import-less",
    async load(id) {
      var extension = path.extname(id);
      if (!cssExtensions.has(extension)) return null;
      var file = await fs.readFile(id, "utf-8");
      var options = {
        paths: [ path.dirname(id) ],
        plugins: [ npmImporter ]
      };
      var { css } = await less.render(file, options);
      return `
var style = document.createElement("style");
style.setAttribute("data-less-source", "${path.basename(id)}");
style.innerHTML = ${JSON.stringify(css)};
document.head.appendChild(style);`;
    }
  }
};

module.exports = { importText, importLESS };