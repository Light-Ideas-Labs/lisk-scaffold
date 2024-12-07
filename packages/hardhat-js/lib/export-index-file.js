const fs = require("fs");
const path = require("path");

const abisFilePath = path.join(path.resolve(), "contracts-abis-exports", "abis.js");
const addressesFilePath = path.join(path.resolve(), "contracts-abis-exports", "contract-addresses.js");
const indexFilePath = path.join(path.resolve(), "contracts-abis-exports", "index.js");

function exportIndexFile() {
  let fileContent = "";

  if (fs.existsSync(abisFilePath)) {
    fileContent += `module.exports.abis = require("./abis");\n`;
  }

  if (fs.existsSync(addressesFilePath)) {
    fileContent += `module.exports.addresses = require("./contract-addresses");\n`;
  }

  fs.writeFileSync(indexFilePath, fileContent);
}

module.exports = { exportIndexFile };
