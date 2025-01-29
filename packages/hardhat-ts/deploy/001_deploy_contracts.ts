import { HardhatRuntimeEnvironment } from "hardhat/types"; // Import Hardhat types
import { ContractFactory, Signer } from "ethers"; // Import ethers types
import hre from "hardhat";
import { ContractAddresses } from "../lib/contract-addresses";

async function deploySampleContract(hre: HardhatRuntimeEnvironment) {

  const sampleContract = await hre.ethers.getContractFactory("SampleContract");    // Get the contract factory
  const deployedSampleContract = await sampleContract.deploy();   // Deploy the contract


  await deployedSampleContract.waitForDeployment();     // Wait for the deployment to be mined
  console.log("Sample Contract Deployed to:", await deployedSampleContract.getAddress());

  const initialData = 42;   // Set the initial data (for example, 42)
  const tx = await deployedSampleContract.setData(initialData);

  await tx.wait();    // Wait for the transaction to be mined
  console.log("Initial data set to:", initialData);

  return deployedSampleContract;
}

async function deployTodoList(hre: HardhatRuntimeEnvironment, initialOwner: string) {
  const todoListContract = await hre.ethers.getContractFactory("TodoList");

  const deployedTodoListContract = await todoListContract.deploy(initialOwner);
  console.log("Todo List Deployed to:", await deployedTodoListContract.getAddress());

  return deployedTodoListContract
}

async function main() {
  await hre.run("compile"); // compile the contract to get the latest bytecode and ABI - Optional
  
  const deployedSampleContract = await deploySampleContract(hre); // Deploy SampleContract
   
  // Deploy the TodoList contract with the deployer's address as the initial owner
  const [deployer] = await hre.ethers.getSigners();
  console.log(deployer.address)
  const deployedTodoListContract = await deployTodoList(hre, deployer.address);
      
  // Create a todo during deployment
  const todoTx = await deployedTodoListContract.add("Build the next big thing");
  await todoTx.wait(); // Wait for the transaction to be mined
  console.log("Todo added: 'Build the next big thing'");
  
  // If on localhost, update the contract addresses
  // if (hre.network.name === "localhost") {}
    const network = hre.network.name;
    ContractAddresses(network, {
      SampleContract: await deployedSampleContract.getAddress(),
      TodoList: await deployedTodoListContract.getAddress(),
    });
    
    console.log(`Contract addresses saved for network: ${network}`);
}

// Recommended pattern for handling async/await errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
