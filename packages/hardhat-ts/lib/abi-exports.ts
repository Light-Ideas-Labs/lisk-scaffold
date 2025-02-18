import fs from "fs";
import path from "path";

import { NestedDir } from "./nested-dir";
import { exportIndexFile } from "./export-index-file";

const contractsDir = path.join(path.resolve(), "artifacts", "contracts");

const contractJsonFilePaths = NestedDir(contractsDir).filter((path) => {
  const fileName = path.at(-1);
  return !!fileName && /^\w+\.json$/.test(fileName);
});

let fileContent = "";
const contractNames: string[] = [];

for (const filePath of contractJsonFilePaths) {
  const contractName = filePath.at(-1)?.replace(/\.json$/, "");

  if (!contractName) continue;

  const contractJsonPath = path.join(contractsDir, ...filePath);
  const contractJsonContent = fs.readFileSync(contractJsonPath, "utf8");
  const contractJson = JSON.parse(contractJsonContent);
  fileContent += `export const ${contractName} = ${JSON.stringify(
    contractJson.abi,
    null,
    2,
  )} as const;\n\n`;
  contractNames.push(contractName);
}

if (contractNames.length) {
  fileContent += `export const abis = { ${contractNames.join(
    ", ",
  )} } as const;\n`;
}

const distPath = path.join(path.resolve(), "abis-exports");

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

const filePath = path.join(distPath, "abis.ts");

fs.writeFileSync(path.join(filePath), fileContent);

exportIndexFile();
