// https://hardhat.org/hardhat-runner/docs/advanced/migrating-from-hardhat-waffle (Migrating away from hardhat-waffle)
const hre = require("hardhat");
const  ContractAddresses = require("../../lib/contract-addresses")

async function deploySampleContract() {
  const sampleContract = await hre.ethers.getContractFactory("SampleContract");    // Get the contract factory
  const deployedSampleContract = await sampleContract.deploy();                    // Deploy the contract
  
  await deployedSampleContract.waitForDeployment();  // Wait for the deployment to be mined
  console.log("Sample Contract Deployed to:", await deployedSampleContract.getAddress());

  const initialData = 42;  // Set the initial data (for example, 42)
  const tx = await deployedSampleContract.setData(initialData);
    

  await tx.wait();   // Wait for the transaction to be mined
  console.log("Initial data set to:", initialData);

  return deployedSampleContract

}

async function deployTodoList(initialOwner) {
  const todoListContract = await hre.ethers.getContractFactory("TodoList");

  const deployedTodoListContract = await todoListContract.deploy(initialOwner);
  console.log("Todo List Deployed to:", await deployedTodoListContract.getAddress());

  return deployedTodoListContract
}

async function deployMockNFTMarketplace() {
  const mockNFTMarketplace = await hre.ethers.getContractFactory("MockNFTMarketplace");   // step one get the NFT Marketplace 
  
  const deployedNFT = await mockNFTMarketplace.deploy();   // step two deploy the NFT Marketplace 
  await deployedNFT.waitForDeployment()    //  .deployed(); depreciated
  console.log("NFT marketplace deployed to:", await deployedNFT.getAddress()) // .address(); depreciated

  return deployedNFT;
}

async function main() {
  await hre.run('compile'); // compile the contract to get the latest bytecode and ABI - Optional


  const deployedSampleContract = await deploySampleContract();   // Deploy SampleContract
    
  const [deployer] = await hre.ethers.getSigners(); // Deploy the TodoList contract with the deployer's address as the initial owner
  console.log(deployer.address)
  const deployedTodoListContract = await deployTodoList(deployer.address); 

  const deployedNFT = await deployMockNFTMarketplace();       // Deploy MockNFTMarketplace

    // If on localhost, update the contract addresses
    // if (hre.network.name === "localhost") {}
    const network = hre.network.name;
    ContractAddresses(network, {
      SampleContract: await deployedSampleContract.getAddress(),
      TodoListContract: await deployedTodoListContract.getAddress(),
      MockNFTMarketplace: await deployedNFT.getAddress(),
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exit(1);
});


