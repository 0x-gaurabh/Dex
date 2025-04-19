// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interface/IERC20.sol";

import "./libary/Math.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Dex is ReentrancyGuard {
    using Math for uint256;

    IERC20 public immutable token0;
    IERC20 public immutable token1;

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    bool public initialized;

    constructor(address _token0, address _token1) {
        token0 = IERC20(_token0);
        token1 = IERC20(_token1);
        initialized = false;
    }

    modifier onlyOnce() {
        require(!initialized, "DEX: Already initialized");
        _;
        initialized = true; // Set the flag to true after the first call
    }

    function getUserBalance(
        address _token,
        address _user
    ) public view returns (uint256) {
        return IERC20(_token).balanceOf(_user);
    }
    function getReserve(address _token) public view returns (uint256) {
        return IERC20(_token).balanceOf(address(this));
    }

    function _mint(address _to, uint256 _amount) private {
        balanceOf[_to] += _amount;
        totalSupply += _amount;
    }

    function _burn(address _to, uint256 _amount) private {
        balanceOf[_to] -= _amount;
        totalSupply -= _amount;
    }

    function _initializer(
        address _token0,
        address _token1,
        uint256 _amount0,
        uint256 _amount1
    ) public onlyOnce {
        require(_amount0 > 0 && _amount1 > 0, "DEX: Not enough tokens");

        require(
            IERC20(_token0).transferFrom(msg.sender, address(this), _amount0),
            "DEX: Token0 transfer failed"
        );
        require(
            IERC20(_token1).transferFrom(msg.sender, address(this), _amount1),
            "DEX: Token1 transfer failed"
        );
    }

    function getAmountOut(
        uint256 _amountIn,
        uint256 _reserveIn,
        uint256 _reserveOut
    ) public pure returns (uint256 _amountOut) {
        uint256 amountInWithFee = (_amountIn * 997) / 1000;

        _amountOut =
            (_reserveOut * amountInWithFee) /
            (_reserveIn + amountInWithFee);
    }

    function swap(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn
    ) external returns (uint256 _amountOut) {
        require(
            (_tokenIn == address(token0) || _tokenIn == address(token1)) &&
                (_tokenOut == address(token0) || _tokenOut == address(token1)),
            "Token is not supported"
        );

        require(_amountIn > 0, "Value should be greater than zero");

        uint256 reserveIn = IERC20(_tokenIn).balanceOf(address(this));
        uint256 reserveOut = IERC20(_tokenOut).balanceOf(address(this));

        require(
            IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn),
            "TransferFrom failed"
        );

        _amountOut = getAmountOut(_amountIn, reserveIn, reserveOut);

        require(
            IERC20(_tokenOut).transfer(msg.sender, _amountOut),
            "Transfer failed"
        );

        return _amountOut;
    }
    function addLiquidity(
        uint256 _amount0,
        uint256 _amount1
    ) external returns (uint256 shares) {
        require(
            _amount0 > 0 && _amount1 > 0,
            "Amount should be greater than zero"
        );

        token0.transferFrom(msg.sender, address(this), _amount0);
        token1.transferFrom(msg.sender, address(this), _amount1);

        uint256 reserve0 = IERC20(token0).balanceOf(address(this));
        uint256 reserve1 = IERC20(token1).balanceOf(address(this));

        if (reserve0 > 0 || reserve1 > 0) {
            require(
                (reserve0 * _amount1) == (reserve1 * _amount0),
                " x/y !=dx?dy"
            );
        }

        if (totalSupply == 0) {
            shares = Math._sqrt(_amount0 * _amount1);
        } else {
            shares = Math._min(
                (_amount0 * totalSupply) / reserve0,
                (_amount1 * totalSupply) / reserve1
            );
        }

        require(shares > 0, "shares cannot be zero");

        _mint(msg.sender, shares);
    }
    function removeLiquidity(
        uint256 _shares
    ) external returns (uint256 _amount0, uint256 _amount1) {
        require(_shares > 0, "Amount should be greater than zero");

        uint256 bal0 = token0.balanceOf(address(this));
        uint256 bal1 = token1.balanceOf(address(this));

        _amount0 = (bal0 * _shares) / totalSupply;
        _amount1 = (bal1 * _shares) / totalSupply;

        require(_amount0 > 0 && _amount1 > 0, "Should be greater than zero");

        _burn(msg.sender, _shares);

        token0.transfer(msg.sender, _amount0);
        token1.transfer(msg.sender, _amount1);
    }
}
