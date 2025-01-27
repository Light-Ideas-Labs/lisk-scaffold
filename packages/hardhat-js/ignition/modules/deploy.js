// https://hardhat.org/hardhat-runner/docs/advanced/migrating-from-hardhat-waffle (Migrating away from hardhat-waffle)
const hre = require("hardhat");
const  ContractAddresses = require("../../lib/contract-addresses")

async function deploySampleContract() {
  // Get the contract factory
  const sampleContract = await hre.ethers.getContractFactory("SampleContract");

  // Deploy the contract
  const deployedSampleContract = await sampleContract.deploy();
  
  // Wait for the deployment to be mined
  await deployedSampleContract.waitForDeployment();
  console.log("Sample Contract Deployed to:", await deployedSampleContract.getAddress());

  // Set the initial data (for example, 42)
  const initialData = 42;
  const tx = await deployedSampleContract.setData(initialData);
    
  // Wait for the transaction to be mined
  await tx.wait();
  console.log("Initial data set to:", initialData);

  return deployedSampleContract

}



// async function deployMockNFTMarketplace() {
//   // step one get the NFT Marketplace 
//   const mockNFTMarketplace = await hre.ethers.getContractFactory("MockNFTMarketplace");
  
//   // step two deploy the NFT Marketplace 
//   const deployedNFT = await mockNFTMarketplace.deploy();
//   await deployedNFT.waitForDeployment()    //  deployed(); depreciated
//   console.log("NFT marketplace deployed to:", await deployedNFT.getAddress()) // .address); depreciated

//   return deployedNFT;
// }

async function main() {
  await hre.run('compile'); // compile the contract to get the latest bytecode and ABI - Optional


  const deployedSampleContract = await deploySampleContract();   // Deploy SampleContract
  // const deployedNFT = await deployMockNFTMarketplace();     // Deploy MockNFTMarketplace

    // If on localhost, update the contract addresses
    if (hre.network.name === "localhost") {
      ContractAddresses("localhost", {
        SampleContract: await deployedSampleContract.getAddress(),
        // MockNFTMarketplace: await deployedNFT.getAddress(),
      });
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exit(1);
});


