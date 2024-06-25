// const { network } = require("hardhat");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
// Ensure your configuration variables are set before executing the script

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
  // network:{
  //   localhost:{
  //     gasPrice: 60000
  //   }
  // },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
    },
  },
};