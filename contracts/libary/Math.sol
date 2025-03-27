// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library Math{

      function _sqrt(uint256 y) public pure returns (uint256 z) {
        if (y > 3) {
            z = y;
            uint256 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }

    function _min(uint256 x, uint256 y) public pure returns (uint256) {
        return x <= y ? x : y;
    }
}