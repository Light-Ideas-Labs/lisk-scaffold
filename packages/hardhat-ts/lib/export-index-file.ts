import fs from "fs";
import path from "path";

const abisFilePath = path.join(path.resolve(), "abis-exports", "abis.ts");
const addressesFilePath = path.join(path.resolve(), "abis-exports", "addresses.ts");
const indexFilePath = path.join(path.resolve(), "abis-exports", "index.ts");

export function exportIndexFile() {
  let fileContent = "";

  if (fs.existsSync(abisFilePath)) {
    fileContent += `export * from "./abis";\n`;
  }

  if (fs.existsSync(addressesFilePath)) {
    fileContent += `export * from "./addresses";\n`;
  }

  fs.writeFileSync(indexFilePath, fileContent);
}
