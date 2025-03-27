"use client";
import Swap from "@/component/Swap";
import { ethers } from "ethers";
import { Contract } from "ethers";
import { useEffect } from "react";

export default function SwapUI() {
  // const initial = async () => {



  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     const signer = await provider.getSigner();
  //     const token1ABI=[
  //       {
  //         "inputs": [],
  //         "stateMutability": "nonpayable",
  //         "type": "constructor"
  //       },
  //       {
  //         "inputs": [
  //           {
  //             "internalType": "address",
  //             "name": "spender",
  //             "type": "address"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "allowance",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "needed",
  //             "type": "uint256"
  //           }
  //         ],
  //         "name": "ERC20InsufficientAllowance",
  //         "type": "error"
  //       },
  //       {
  //         "inputs": [
  //           {
  //             "internalType": "address",
  //             "name": "sender",
  //             "type": "address"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "balance",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "needed",
  //             "type": "uint256"
  //           }
  //         ],
  //         "name": "ERC20InsufficientBalance",
  //         "type": "error"
  //       },
  //       {
  //         "inputs": [
  //           {
  //             "internalType": "address",
  //             "name": "approver",
  //             "type": "address"
  //           }
  //         ],
  //         "name": "ERC20InvalidApprover",
  //         "type": "error"
  //       },
  //       {
  //         "inputs": [
  //           {
  //             "internalType": "address",
  //             "name": "receiver",
  //             "type": "address"
  //           }
  //         ],
  //         "name": "ERC20InvalidReceiver",
  //         "type": "error"
  //       },
  //       {
  //         "inputs": [
  //           {
  //             "internalType": "address",
  //             "name": "sender",
  //             "type": "address"
  //           }
  //         ],
  //         "name": "ERC20InvalidSender",
  //         "type": "error"
  //       },
  //       {
  //         "inputs": [
  //           {
  //             "internalType": "address",
  //             "name": "spender",
  //             "type": "address"
  //           }
  //         ],
  //         "name": "ERC20InvalidSpender",
  //         "type": "error"
  //       },
  //       {
  //         "anonymous": false,
  //         "inputs": [
  //           {
  //             "indexed": true,
  //             "internalType": "address",
  //             "name": "owner",
  //             "type": "address"
  //           },
  //           {
  //             "indexed": true,
  //             "internalType": "address",
  //             "name": "spender",
  //             "type": "address"
  //           },
  //           {
  //             "indexed": false,
  //             "internalType": "uint256",
  //             "name": "value",
  //             "type": "uint256"
  //           }
  //         ],
  //         "name": "Approval",
  //         "type": "event"
  //       },
  //       {
  //         "anonymous": false,
  //         "inputs": [
  //           {
  //             "indexed": true,
  //             "internalType": "address",
  //             "name": "from",
  //             "type": "address"
  //           },
  //           {
  //             "indexed": true,
  //             "internalType": "address",
  //             "name": "to",
  //             "type": "address"
  //           },
  //           {
  //             "indexed": false,
  //             "internalType": "uint256",
  //             "name": "value",
  //             "type": "uint256"
  //           }
  //         ],
  //         "name": "Transfer",
  //         "type": "event"
  //       },
  //       {
  //         "inputs": [
  //           {
  //             "internalType": "address",
  //           "name": "owner",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "spender",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "allowance",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "spender",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "value",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "approve",
  //       "outputs": [
  //         {
  //           "internalType": "bool",
  //           "name": "",
  //           "type": "bool"
  //         }
  //       ],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "account",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "balanceOf",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "decimals",
  //       "outputs": [
  //         {
  //           "internalType": "uint8",
  //           "name": "",
  //           "type": "uint8"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "amount",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "mint",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "name",
  //       "outputs": [
  //         {
  //           "internalType": "string",
  //           "name": "",
  //           "type": "string"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "symbol",
  //       "outputs": [
  //         {
  //           "internalType": "string",
  //           "name": "",
  //           "type": "string"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "totalSupply",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "value",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "transfer",
  //       "outputs": [
  //         {
  //           "internalType": "bool",
  //           "name": "",
  //           "type": "bool"
  //         }
  //       ],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "from",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "value",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "transferFrom",
  //       "outputs": [
  //         {
  //           "internalType": "bool",
  //           "name": "",
  //           "type": "bool"
  //         }
  //       ],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     }
  //   ]

  //   const token2ABI=[
  //     {
  //       "inputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "constructor"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "spender",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "allowance",
  //           "type": "uint256"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "needed",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "ERC20InsufficientAllowance",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "sender",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "balance",
  //           "type": "uint256"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "needed",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "ERC20InsufficientBalance",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "approver",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "ERC20InvalidApprover",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "receiver",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "ERC20InvalidReceiver",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "sender",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "ERC20InvalidSender",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "spender",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "ERC20InvalidSpender",
  //       "type": "error"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "owner",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "spender",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": false,
  //           "internalType": "uint256",
  //           "name": "value",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "Approval",
  //       "type": "event"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "from",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": false,
  //           "internalType": "uint256",
  //           "name": "value",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "Transfer",
  //       "type": "event"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "owner",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "spender",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "allowance",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "spender",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "value",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "approve",
  //       "outputs": [
  //         {
  //           "internalType": "bool",
  //           "name": "",
  //           "type": "bool"
  //         }
  //       ],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "account",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "balanceOf",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "decimals",
  //       "outputs": [
  //         {
  //           "internalType": "uint8",
  //           "name": "",
  //           "type": "uint8"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "amount",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "mint",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "name",
  //       "outputs": [
  //         {
  //           "internalType": "string",
  //           "name": "",
  //           "type": "string"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "symbol",
  //       "outputs": [
  //         {
  //           "internalType": "string",
  //           "name": "",
  //           "type": "string"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "totalSupply",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "value",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "transfer",
  //       "outputs": [
  //         {
  //           "internalType": "bool",
  //           "name": "",
  //           "type": "bool"
  //         }
  //       ],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "from",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "value",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "transferFrom",
  //       "outputs": [
  //         {
  //           "internalType": "bool",
  //           "name": "",
  //           "type": "bool"
  //         }
  //       ],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     }
  //   ]

  //   const dexABI=[
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "_token0",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "_token1",
  //           "type": "address"
  //         }
  //       ],
  //       "stateMutability": "nonpayable",
  //       "type": "constructor"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "ReentrancyGuardReentrantCall",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "_token0",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "_token1",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "_amount0",
  //           "type": "uint256"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "_amount1",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "_initializer",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "_amount0",
  //           "type": "uint256"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "_amount1",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "addLiquidity",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "shares",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "balanceOf",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "_token",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "getReserve",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "_token",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "_user",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "getUserBalance",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "initialized",
  //       "outputs": [
  //         {
  //           "internalType": "bool",
  //           "name": "",
  //           "type": "bool"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "_shares",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "removeLiquidity",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "_amount0",
  //           "type": "uint256"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "_amount1",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "_tokenIn",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "_tokenOut",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "_amountIn",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "swap",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "_amountOut",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "token0",
  //       "outputs": [
  //         {
  //           "internalType": "contract IERC20",
  //           "name": "",
  //           "type": "address"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "token1",
  //       "outputs": [
  //         {
  //           "internalType": "contract IERC20",
  //           "name": "",
  //           "type": "address"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "totalSupply",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     }
  //   ]

    
  //   const token0Address = "0x275A22000Db67B39E34Df05afafFA7F65518086B"; 
  //   const token1Address = "0x89a25F8d1d64A69656Bf599bA905e1625408dD25"; 
  //   const dexAddress = "0xC3e8cB7Bb321ae3A7776b1C7bE9c62D11B6A6948"; 

    
  //   const token0Contract = new ethers.Contract(token0Address, token1ABI, signer);
  //   const token1Contract = new ethers.Contract(token1Address, token2ABI, signer);
  //   const dexContract = new ethers.Contract(dexAddress, dexABI, signer);

    
  //   const amount0 = ethers.parseUnits("10000", 18); 
  //   const amount1 = ethers.parseUnits("3000", 18); 

  //   // Step 1: Check if the contract is already initialized
  //   const isInitialized = await dexContract.initialized();
  //   if (isInitialized) {
  //     console.log("Contract is already initialized");
  //     return;
  //   }

  //   const approveTokens = async (tokenContract: Contract, spender: string, amount: bigint) => {
  //     const tx = await tokenContract.approve(spender, amount);
  //     await tx.wait();
  //     console.log("Approval successful");
  // };
  //   await approveTokens(token0Contract, dexAddress, amount0);
  //   await approveTokens(token1Contract, dexAddress, amount1);


  //   const initializeDex = async (
  //     dexContract: Contract,  
  //     token0Address: string,
  //     token1Address: string,
  //     amount0: bigint,
  //     amount1: bigint
  // ) => {
  //     const tx = await dexContract._initializer(
  //         token0Address,
  //         token1Address,
  //         amount0,
  //         amount1
  //     );
  //     await tx.wait();
  //     console.log("DEX initialized successfully");
  // };

  //   await initializeDex(
  //     dexContract,
  //     token0Address,
  //     token1Address,
  //     amount0,
  //     amount1
  //   );
  // };

  // useEffect(() =>{
// 
// 
  //  initial()
// 
// 
  // },[])

  return (
    <>
      <Swap />
    </>
  );
}
