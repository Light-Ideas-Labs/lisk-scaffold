require("@nomicfoundation/hardhat-ignition/modules");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {

    hardhat: {
      allowUnlimitedContractSize: false,
    },

    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_SEPOLIA}`,
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },

    ethereum: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MAIN}`,
      accounts: [process.env.WALLET_PRIVATE_KEY],
      chainId: 44787,
    },

    lisk: {
      url: 'https://rpc.api.lisk.com',
      accounts: [process.env.WALLET_PRIVATE_KEY],
      gasPrice: 1000000000,
    },
    
    liskSepolia: {
      url: 'https://rpc.sepolia-api.lisk.com',
      accounts: [process.env.WALLET_PRIVATE_KEY]
    },

    base_sepolia: {
      url: `https://sepolia.base.org`,
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },

    base_main: {
      url: `https://sepolia.base.org`,
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },

    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },
    
    celo: {
      url: "https://forno.celo.org",
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },
  },

  // ethereum - celo - explorer API keys
  etherscan: {
    // Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
     apiKey: {
      "lisk-sepolia": "123"
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
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  }
};