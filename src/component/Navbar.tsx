"use client"
import Link from 'next/link'
import { useState} from "react";
import { Menu, X } from 'lucide-react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { open } = useWeb3Modal();
    const {address} = useAccount();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
      <>
        <div>
          <nav className="bg-gray-900 p-4 flex justify-between items-center text-white shadow-lg border-b border-gray-700">
            <div className="text-2xl font-bold tracking-wide flex items-center space-x-4 md:space-x-40">
              <span className="bg-blue-600 px-3 py-1 rounded-lg">DEX</span>
              <div className="hidden md:flex space-x-8">
                <Link
                  href="/"
                  className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium text-lg group px-4 py-2 rounded-lg hover:border hover:border-transparent hover:bg-gray-800/50 flex items-center space-x-2"
                >
                  <span>Swap</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  href="/liquidity"
                  className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium text-lg group px-4 py-2 rounded-lg hover:border hover:border-transparent hover:bg-gray-800/50 flex items-center space-x-2"
                >
                  <span>Liquidity</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
              <button className="md:hidden" onClick={toggleMenu}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
            <div className="hidden md:flex space-x-6 items-center">

              {}
              <button onClick={() =>open()} className="bg-gradient-to-r cursor-pointer from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 px-6 py-2 rounded-full text-white font-semibold shadow-lg transition duration-300">
                   { address ? (address.slice(0,10)): "Connect Wallet"}
              </button>
            </div>
          </nav>
          {isMenuOpen && (
            <div className="bg-gray-800 text-white p-4 md:hidden">
              <Link href="/" className="block py-2">Swap</Link>
              <Link href="/liquidity" className="block py-2">Liquidity</Link>
              <button className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 px-6 py-2 rounded-full text-white font-semibold shadow-lg transition duration-300">
                Connect Wallet
              </button>
            </div>
          )}
        </div>
      </>
    )
}

export default Navbar
