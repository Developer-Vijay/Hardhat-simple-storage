require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); 
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://eth-goeli" 
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

module.exports = {
  solidity: "0.8.8",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [
        PRIVATE_KEY
      ],
      chainId: 5,
    },
    loalhost: {
      url: "http://127.0.0.1:8545/",
      // account Thansks hardhat
      chainId: 31337,
    }
  },
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: API_KEY,
  },
  gasReporter: {
    enabled: true,
    outFile: "gas-report.text",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC",
  },
};
