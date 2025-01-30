import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
import "@nomicfoundation/hardhat-verify";
import "@typechain/hardhat";
import "hardhat-deploy";
require("dotenv").config();

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "api-key";
const SEPOLIA_ETHERSCAN_API_KEY = process.env.SEPOLIA_ETHERSCAN_API_KEY || "api-key";
  process.env.SEPOLIA_ETHERSCAN_API_KEY || "api-key";

// Import MNEMONIC or single private key
const MNEMONIC = process.env.MNEMONIC || "your mnemonic";
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

const config: HardhatUserConfig = {
  defaultNetwork: "localhost",
  namedAccounts: {
    deployer: {
      default: 0, // First account in the list
    },
  },

  networks: {
    localhost: {
      url: "http://localhost:8545",
    },

    ethereum: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MAIN}`,
      accounts: WALLET_PRIVATE_KEY ? [WALLET_PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },

    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_SEPOLIA}`,
      accounts: WALLET_PRIVATE_KEY ? [WALLET_PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },

    celoMainnet: {
      url: "https://forno.celo.org",
      accounts: WALLET_PRIVATE_KEY ? [WALLET_PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },

    celoAlfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: WALLET_PRIVATE_KEY  ? [WALLET_PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },

    liskMainnet: {
      url: "https://rpc.api.lisk.com",
      accounts: WALLET_PRIVATE_KEY ? [WALLET_PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },

    liskSepolia: {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: WALLET_PRIVATE_KEY ? [WALLET_PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },

    baseMainet: {
      url: `https://sepolia.base.org`,
      accounts: WALLET_PRIVATE_KEY ? [WALLET_PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },

    baseSepolia: {
      url: `https://sepolia.base.org`,
      accounts: WALLET_PRIVATE_KEY ? [WALLET_PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },
  },

  // ethereum, celo, base, lisk - explorer API keys
  etherscan: {
    apiKey: {
      mainnet: `${ETHERSCAN_API_KEY}`, // Ethereum mainnet
      sepolia: `${SEPOLIA_ETHERSCAN_API_KEY}`,   // Ethereum Sepolia testnet
      celo: "YOUR_CELOSCAN_API_KEY",     // Celo mainnet
      celoAlfajores: "123",                  // Celo Alfajores testnet (placeholder if no key is required)
      base: "YOUR_BASESCAN_API_KEY",     // Base mainnet
      baseSepolia: "123",             // Base Goerli testnet
      liskSepolia: "123",             // Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
    },
    customChains: [
      // Custom chain for Lisk Sepolia
      {
        network: "lisk-sepolia",
        chainId: 4202,
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com",
        },
      },
      // Custom chain for Base Sepolia
      {
        network: "base-sepolia",
        chainId: 84531,
        urls: {
          apiURL: "https://sepolia-blockscout.base.com/api",
          browserURL: "https://sepolia-blockscout.base.com",
        },
      },
      // Custom chain for Celo Alfajores
      {
        network: "celo-alfajores",
        chainId: 44787,
        urls: {
          apiURL: "https://alfajores.celoscan.io/api",
          browserURL: "https://alfajores.celoscan.io",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
  paths: {
    sources: "./contracts",
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
};

export default config;
