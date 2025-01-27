const fs = require("fs");
const path = require("path");

const { exportIndexFile } = require("./export-index-file");

const varName = "contractAddresses";
const addressesFilePath = path.join(path.resolve(), "contracts-abis-exports", "contract-addresses.js");

function ContractAddresses(network, addresses) {
  console.log("Updating contract addresses...");

  let addressMap = {};

  if (fs.existsSync(addressesFilePath)) {
    addressMap = require(addressesFilePath)[varName];
  } else {
    fs.mkdirSync(path.dirname(addressesFilePath), { recursive: true });
  }

  if (!addressMap[network]) {
    addressMap[network] = {};
  }

  for (const [contract, address] of Object.entries(addresses)) {
    addressMap[network][contract] = address;
  }

  const fileContents = `exports.${varName} = ${JSON.stringify(
    addressMap,
    null,
    2
  )};`;

  fs.writeFileSync(addressesFilePath, fileContents);
  exportIndexFile();

  console.log(
    "Contract addresses updated!",
    JSON.stringify(addressMap, null, 2)
  );
}

module.exports = ContractAddresses;
