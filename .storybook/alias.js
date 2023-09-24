const path = require("path");

function resolveDir(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  "@components/*": resolveDir("../components"),
  "@lib/*": resolveDir("../lib"),
  "@layouts/*": resolveDir("../layouts"),
  "@pages/*": resolveDir("../pages"),
  "@img/*": resolveDir("../img"),
  "@stories/*": resolveDir("../stories"),
};
