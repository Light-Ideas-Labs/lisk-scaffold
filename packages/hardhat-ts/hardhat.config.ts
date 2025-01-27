import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
require("dotenv").config();

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "api-key"
const SEPOLIA_ETHERSCAN_API_KEY = process.env.SEPOLIA_ETHERSCAN_API_KEY || "api-key"

// Import MNEMONIC or single private key
const MNEMONIC = process.env.MNEMONIC || "your mnemonic"
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: {
      default: 0, // First account in the list
    },
  },
  networks: {
    ethereum: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MAIN}`,
      accounts: WALLET_PRIVATE_KEY ? [WALLET_PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },

    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_SEPOLIA}`,
      accounts: WALLET_PRIVATE_KEY ? [WALLET_PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },

    celo: {
      url: "https://forno.celo.org",
      accounts: WALLET_PRIVATE_KEY ? [WALLET_PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },

    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: WALLET_PRIVATE_KEY ? [WALLET_PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },

    lisk: {
      url: "https://rpc.api.lisk.com",
      accounts: WALLET_PRIVATE_KEY ? [WALLET_PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },

    liskSepolia: {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: WALLET_PRIVATE_KEY ? [WALLET_PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },

    base_main: {
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
    // Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
     apiKey: { 
      "lisk-sepolia": "123",
     },
     customChains: [
      {
          network: "lisk-sepolia",
          chainId: 4202,
          urls: {
              apiURL: "https://sepolia-blockscout.lisk.com/api",
              browserURL: "https://sepolia-blockscout.lisk.com"
          }
       }
     ]
   },
   sourcify: {
    enabled: false
  },
  paths: {
    sources: './contracts',
  },
  solidity:{
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  }


};

export default config;
