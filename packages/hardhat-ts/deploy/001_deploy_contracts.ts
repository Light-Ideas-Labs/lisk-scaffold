import { HardhatRuntimeEnvironment } from "hardhat/types"; // Import Hardhat types
import { DeployFunction } from "hardhat-deploy/types";
import "hardhat-deploy";
import { ethers } from "hardhat";
import { ContractAddresses } from "../lib/contract-addresses";

const deploySampleContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log(`📡 Deploying SampleContract with account: ${deployer}`);

  // ✅ Deploy the contract
  const sampleContract = await deploy("SampleContract", { from: deployer, log: true });

  console.log(`✅ SampleContract deployed at: ${sampleContract.address}`);

  // ✅ Get contract instance
  const contractInstance = await ethers.getContractAt("SampleContract", sampleContract.address);

  // ✅ Call contract function
  const initialData = 42;
  const tx = await contractInstance.setData(initialData);
  await tx.wait();

  console.log(`✅ Initial data set to: ${initialData}`);
};

const deployTodoListContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log(`📡 Deploying TodoList contract with deployer: ${deployer}`);

  // ✅ Deploy contract with constructor argument (deployer)
  const todoList = await deploy("TodoList", {
    from: deployer,
    args: [deployer], // ✅ Ensure constructor argument is passed
    log: true,
  });

  console.log(`✅ TodoList deployed at: ${todoList.address}`);

  // ✅ Immediately add a sample todo
  await execute("TodoList", { from: deployer, log: true }, "add", "Build the next big thing");

  console.log("✅ Todo added: 'Build the next big thing'");
};

// ✅ Set Tags for Hardhat Deploy
deploySampleContract.tags = ["sample"];
deployTodoListContract.tags = ["todolist"];

const main: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  await hre.run("compile"); // ✅ Compile contracts

  console.log("🚀 Running Deployments...");

  // ✅ Deploy contracts using their functions instead of `deployments.run`
  await deploySampleContract(hre);
  await deployTodoListContract(hre);

  // ✅ Get deployed contract addresses
  const { deployments } = hre;
  const sampleContract = await deployments.get("SampleContract");
  const todoListContract = await deployments.get("TodoList");

  // ✅ Store contract addresses in a JSON file
  const network = hre.network.name;
  ContractAddresses(network, {
    SampleContract: sampleContract.address,
    TodoList: todoListContract.address,
  });

  console.log(`✅ Contract addresses saved for network: ${network}`);
}


// ✅ Tag it so that Hardhat Deploy runs this script
// ✅ Export Main Deploy Function with Tags
export default main;
main.tags = ["all"];
