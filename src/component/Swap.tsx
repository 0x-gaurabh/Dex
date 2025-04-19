"use client";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Contract, ethers } from "ethers";
import token0abi from "../utils/abi.json"
import token1abi from "../utils/abi2.json"
import Dexabi from "../utils/dexAbi.json";
import { ToastContainer, toast } from 'react-toastify';


const Swap = () => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const [fromAmount, setFromAmount] = useState<string>("");
  const [fromToken, setFromToken] = useState<{ ticker: string; address: string; abi:any }>({
    ticker: "ETH",
    address: "0x89a25F8d1d64A69656Bf599bA905e1625408dD25",
    abi:token0abi,
  });
  const [toToken, setToToken] = useState<{ ticker: string; address: string; abi:any }>({
    ticker: "USDC",
    address: "0x275A22000Db67B39E34Df05afafFA7F65518086B",
    abi:token1abi,
  });
  const [ethBalance, setEthBalance] = useState<string>();
  const [USDCBalance, setUSDCBalance] = useState<string>();
  const [amountOut, setAmountOut] = useState<string>("0");
  const [Signer, setSigner] = useState<string>("");
  

  const tokenList = [
    { ticker: "ETH", address: "0x89a25F8d1d64A69656Bf599bA905e1625408dD25",abi:token0abi },
    { ticker: "USDC", address: "0x275A22000Db67B39E34Df05afafFA7F65518086B",abi:token1abi },
  ];

  const checkAllowance = async (tokenContract:Contract, owner:string, spender:string) => {
    const allowance = await tokenContract.allowance(owner, spender);
    return allowance;
  };

  const approveTokens = async (tokenContract:Contract, spender:string, amount:bigint) => {
    const tx = await tokenContract.approve(spender, amount);
    await tx.wait(); 
    toast.warn('Waiting for swap approval', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  };

  const swapTokens = async (dexContract:Contract, tokenIn:string, tokenOut: string, amountIn:bigint) => {
    const tx = await dexContract.swap(tokenIn, tokenOut, amountIn);
    await tx.wait(); 
    toast.success('Swap succesfull', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  };

  const handleFromTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = tokenList.find((token) => token.ticker === e.target.value);
    if (selected) {
      setFromToken(selected);
    }
    const selected2 = tokenList.find((token) => token.ticker !== e.target.value) || tokenList[0];
    setToToken(selected2);
  };

  const Swap = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
  
    const contractadd = "0x8f9CE19D4Bb5036936470B0208Af2fBe1306d177";
    const abi = Dexabi;
    const contractIns = new ethers.Contract(contractadd, abi, signer);
  
    
    const tokenIn = fromToken.address;
    const tokenOut = toToken.address;

    if (!fromAmount || isNaN(Number(fromAmount))) {
      alert("Please enter a valid amount");
      return;
    }
    
    const amountIN = ethers.parseUnits(fromAmount, 18);
  
    console.log("Token In:", fromToken.ticker, tokenIn);
    console.log("Token Out:", toToken.ticker, tokenOut);
    console.log("Amount In:", ethers.formatUnits(amountIN, 18));
  
    const tokenInContract = new ethers.Contract(tokenIn, fromToken.abi, signer);
  
    // Check reserves
    const reserveIn = await contractIns.getReserve(tokenIn);
    const reserveOut = await contractIns.getReserve(tokenOut);
    console.log("Reserve In:", ethers.formatUnits(reserveIn, 18));
    console.log("Reserve Out:", ethers.formatUnits(reserveOut, 18));
  
    // Check allowance
    const currentAllowance = await checkAllowance(tokenInContract, signer.address, contractadd);
    console.log("Current Allowance:", ethers.formatUnits(currentAllowance, 18));
  
    if (currentAllowance < amountIN) {
      await approveTokens(tokenInContract, contractadd, amountIN);
    }
  
    try {
      await swapTokens(contractIns, tokenIn, tokenOut, amountIN);
      
      await getBalnce();
    } catch (error) {
      console.error("Swap failed:", error);
    }
  };
  const getBalnce  = async()=>{

        const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          

          const contractadd="0x8f9CE19D4Bb5036936470B0208Af2fBe1306d177";
      const abi= [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_token0",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_token1",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "ReentrancyGuardReentrantCall",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_token0",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_token1",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_amount0",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_amount1",
              "type": "uint256"
            }
          ],
          "name": "_initializer",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_amount0",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_amount1",
              "type": "uint256"
            }
          ],
          "name": "addLiquidity",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "shares",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_token",
              "type": "address"
            }
          ],
          "name": "getReserve",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_token",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_user",
              "type": "address"
            }
          ],
          "name": "getUserBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "initialized",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_shares",
              "type": "uint256"
            }
          ],
          "name": "removeLiquidity",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "_amount0",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_amount1",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_tokenIn",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_tokenOut",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_amountIn",
              "type": "uint256"
            }
          ],
          "name": "swap",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "_amountOut",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "token0",
          "outputs": [
            {
              "internalType": "contract IERC20",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "token1",
          "outputs": [
            {
              "internalType": "contract IERC20",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
          const token0Address = "0x275A22000Db67B39E34Df05afafFA7F65518086B"; 
    const token1Address = "0x89a25F8d1d64A69656Bf599bA905e1625408dD25"; 
    const userAddress = await signer.getAddress();
       const contractINS=new ethers.Contract(contractadd,abi,signer);
       const balanceToken0Wei = await contractINS.getUserBalance(token0Address, userAddress);
       const balanceToken1Wei = await contractINS.getUserBalance(token1Address, userAddress);
       const USDC = parseFloat(ethers.formatUnits(balanceToken0Wei, 18)).toFixed(2);
       const Eth = parseFloat(ethers.formatUnits(balanceToken1Wei, 18)).toFixed(2);

       setUSDCBalance(USDC);
       setEthBalance(Eth);
    

  }
  useEffect(() =>{
    if(address) {

      getBalnce();
    }
  },[address])


  useEffect(() => {
    const getAmount = async () => {
      if (!fromAmount || parseFloat(fromAmount) <= 0) {
        setAmountOut("0");
        return;
      }
  
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractadd = "0x8f9CE19D4Bb5036936470B0208Af2fBe1306d177";
        const abi = Dexabi;
        const contractINS = new ethers.Contract(contractadd, abi, signer);
        
        const tokenIn = fromToken.address;
        const tokenOut = toToken.address;
        const amountIN = ethers.parseUnits(fromAmount, 18);
        
        const reserveIn = await contractINS.getReserve(tokenIn);
        const reserveOut = await contractINS.getReserve(tokenOut);
        
        const amountOUT = await contractINS.getAmountOut(amountIN, reserveIn, reserveOut);
        const formattedAmount = parseFloat(ethers.formatUnits(amountOUT, 18)).toFixed(2);
        
        setAmountOut(formattedAmount);
        // console.log("Amount Out:", formattedAmount);
      } catch (error) {
        console.error("Error calculating amount out:", error);
        setAmountOut("0");
      }
    };
  
    getAmount();
  }, [fromAmount, fromToken, toToken]);

  return (
    <>
    <ToastContainer
position="top-center"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4">
        <div className="flex justify-center space-x-8 text-sm text-gray-300">
          <div className="flex items-center space-x-2">
            <span className="text-blue-400">●</span>
            <h1>ETH: {ethBalance}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400">●</span>
            <h1>USDC: {USDCBalance}</h1>
          </div>
        </div>
      </div>

      <div className="flex items-center  justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="w-96 p-8 bg-gray-800 mb-36 text-white shadow-2xl rounded-2xl transform transition-all hover:scale-105">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Swap Tokens
          </h1>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-300">Swap from:</label>
            <div className="flex items-center space-x-3">
              <select
                value={fromToken.ticker}
                onChange={handleFromTokenChange}
                className="w-1/3 p-2 bg-gray-700 border cursor-pointer border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-600 transition-colors"
              >
                {tokenList.map((token, index) => (
                  <option key={index} value={token.ticker} className="bg-gray-800 text-sm ">
                    {token.ticker}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder={`Enter ${fromToken.ticker} amount`}
                className="w-2/3 p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-600 transition-colors"
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">{fromToken.ticker}</p>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-300">Swap to:</label>
            <div className="flex items-center space-x-3">
              <button className="w-1/3 p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-600 transition-colors">
                {toToken.ticker}
              </button>
              <p className="w-2/3 p-2 flex justify-center bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-600 transition-colors">
              {amountOut}</p>
            </div>
            <p className="text-sm text-gray-400 mt-2">{toToken.ticker}</p>
          </div>

          {
            address ? (    <button onClick={Swap} className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg py-3 mt-4 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform hover:scale-105">
              Swap
            </button> ):( <button onClick={() =>open()} className="bg-gradient-to-r w-full cursor-pointer from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 px-6 py-2 rounded-full text-white font-semibold shadow-lg transition duration-300">
                Connect Wallet
              </button>)
          }
       
        </div>
      </div>
    </>
  );
};

export default Swap;