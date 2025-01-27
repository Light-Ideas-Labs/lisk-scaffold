const fs = require("fs");
const path = require("path");

const NestedDir = require("./nested-dir");
const { exportIndexFile } = require("./export-index-file");

const contractsDir = path.join(path.resolve(), "artifacts", "contracts");
console.log(`Exporting contracts from ${contractsDir}`)

const contractJsonFilePaths = NestedDir(contractsDir).filter((filePath) => {
  const fileName = filePath[filePath.length - 1];
  return !!fileName && /^\w+\.json$/.test(fileName);
});

let fileContent = "";
const contractNames = [];

for (const filePath of contractJsonFilePaths) {
  const contractName = filePath[filePath.length - 1].replace(/\.json$/, "");

  if (!contractName) continue;

  const contractJsonPath = path.join(contractsDir, ...filePath);
  const contractJsonContent = fs.readFileSync(contractJsonPath, "utf8");
  const contractJson = JSON.parse(contractJsonContent);
  fileContent += `export const ${contractName} = ${JSON.stringify(
    contractJson.abi,
    null,
    2
  )};\n\n`;
  contractNames.push(contractName);
}

if (contractNames.length) {
  fileContent += `export const abis = { ${contractNames.join(", ")} };\n`;
}

const distPath = path.join(path.resolve(), "contracts-exports");

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

const filePath = path.join(distPath, "abis.js");

fs.writeFileSync(filePath, fileContent);

exportIndexFile();
