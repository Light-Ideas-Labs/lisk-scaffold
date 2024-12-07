const fs = require("fs");
const path = require("path");

function NestedDir(dir, _nestedDir = []) {
  const rootPath = path.join(dir, _nestedDir.join("/"));

  const content = fs.readdirSync(rootPath);
  return content.reduce((acc, curr) => {
    const currentPath = path.join(rootPath, curr);

    if (!fs.statSync(currentPath).isDirectory()) {
      acc.push([..._nestedDir, curr]);
      return acc;
    }

    return acc.concat(NestedDir(dir, [..._nestedDir, curr]));
  }, []);
}

module.exports = NestedDir;
