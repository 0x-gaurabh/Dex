require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",

  networks:{
    sepolia:{
      url:process.env.URL,
      accounts:[process.env.PRIVATE_KEY]
    },
  },
};

// 0x8f9CE19D4Bb5036936470B0208Af2fBe1306d177
// 0x7CE647A27dCbCCB4BbF687f1C700F78754B08Df9
