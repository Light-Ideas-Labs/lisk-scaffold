import { execa } from "execa";
import inquirer from "inquirer";

(async () => {
  // first prompt for selecting networks including an "others" option -  // Check if --network-options flag is provided
  if (process.argv.includes("--network-options")) {
    const answers = await inquirer.prompt([
      {
        type: "checkbox",
        message: "Select network(s) to deploy:",
        name: "networks",
        loop: false,
        choices: [
          { name: "Hardhat (local testnet)", value: "hardhat" },
          { name: "Ethereum Sepolia", value: "sepolia" },
          { name: "Ethereum Mainnet", value: "ethereum" },
          { name: "Optimism Sepolia", value: "optimismSepolia" },
          { name: "Optimism Mainnet", value: "optimismMainnet" },
          { name: "Base Sepolia", value: "baseSepolia" },
          { name: "Base Mainnet", value: "baseMainnet" },
          { name: "Polygon Mumbai", value: "polygonMumbai" },
          { name: "Polygon Mainnet", value: "polygonMainnet" },
          { name: "Arbitrum Sepolia", value: "arbitrumSepolia" },
          { name: "Arbitrum One", value: "arbitrumMainnet" },
          { name: "Celo Alfajores", value: "celoAlfajores" },
          { name: "Celo Mainnet", value: "celoMainnet" },
          { name: "Lisk Sepolia", value: "liskSepolia" },
          { name: "Mode Sepolia", value: "modeSepolia" },
          { name: "Mode Mainnet", value: "modeMainnet" },
          { name: "Scroll Sepolia", value: "scrollSepolia" },
          { name: "Scroll Mainnet", value: "scrollMainnet" },
          { name: "All the above", value: "all" },
          { name: "Others (specify)", value: "others" }, // Add this line
        ],
        validate(answer) {
          if (answer.length < 1) {
            return "You must choose at least one option.";
          }
          return true;
        },
      },
    ]);

    let allNetworks = [
        "hardhat",      
        "sepolia", "ethereum",
        "optimismSepolia", "optimismMainnet",
        "baseSepolia", "baseMainnet",
        "polygonMumbai", "polygonMainnet",
        "arbitrumSepolia", "arbitrumMainnet",
        "celoAlfajores", "celoMainnet",
        "liskSepolia",
        "modeSepolia", "modeMainnet",
        "scrollSepolia", "scrollMainnet"
    ];
    let selectedNetworks = answers.networks;

    // Check if "all the above" is selected
    if (selectedNetworks.includes("all")) {
      selectedNetworks = allNetworks;
    }

    // Check if "others" is selected and prompt for input
    if (selectedNetworks.includes("others")) {
      const { otherNetworks } = await inquirer.prompt([
        {
          type: "input",
          name: "otherNetworks",
          message: "Enter the network separated by commas (e.g., ethereum, optimism, celo). You can check network names in hardhat.config:",
        },
      ]);

      // Remove "others" from selected networks and add the user specified networks
      selectedNetworks = selectedNetworks
        .filter(n => n !== "others")
        .concat(otherNetworks.split(",").map(n => n.trim()));
    }

    // Deployment logic remains the same
    for (const network of selectedNetworks) {
      console.log(`Deploying to ${network}...`);
      await execa("hardhat", ["deploy", "--network", network], { stdio: "inherit" });
    }
  } else {
    // If "--network-options" was not provided, directly call "hardhat deploy" without network options
    const args = process.argv.slice(2).filter(arg => arg !== "--network-options");

    console.log(`Deploying with provided CLI arguments to`, args[1]);
    await execa("hardhat", ["deploy", ...args], { stdio: "inherit" });
  }
})();