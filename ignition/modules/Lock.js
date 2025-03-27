const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("DexModule", (m) => {
    const token1 = "0x275A22000Db67B39E34Df05afafFA7F65518086B";
    const token2 = "0x89a25F8d1d64A69656Bf599bA905e1625408dD25";

    const mathLibrary = m.library("Math");

    const dex = m.contract("Dex", [token1, token2], {
        libraries: {
            Math: mathLibrary,
        },
    });

    
    return { dex };
});