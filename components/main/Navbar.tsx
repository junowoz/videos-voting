"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
  }
}


export const Navbar = () => {

  const [web3, setWeb3] = useState<Web3 | null>(null);

const connectWalletHandler = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = window.ethereum;
      const web3Instance = new Web3(provider);
      setWeb3(web3Instance);
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    console.error("Ethereum browser not detected. Consider installing MetaMask.");
  }
};


  return (
    <nav className="bg-slate-200 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src="/web3dev.svg"
              alt="Logo"
              className="h-8"
              width={28}
              height={28}
            />
          </Link>
        </div>

        {/* Link */}
        <div>
          <Separator orientation="vertical" />
          <Link href="/" className="text-black hover:text-slate-600">
            Rank
          </Link>
          <Separator orientation="vertical" />
        </div>

        {/* Botão */}
        <div>
          <Button 
          onClick={connectWalletHandler}
          className="bg-slate-800 hover:bg-slate-600 p-4 rounded text-white">
          Conectar Carteira
          </Button>
        </div>
      </div>
    </nav>
  );
};
