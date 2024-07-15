"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { ethers } from 'ethers'
import { MetaMaskInpageProvider } from '@metamask/providers'
import { BrowserProvider } from 'ethers'
import { metamaskAtom } from '@/state/metamask'

// at a global level ethereum type is added
declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider
    }
}

const ConnectWallet = () => {
  const [provider, setProvider] = useState<BrowserProvider>();
  const [metamaskAddress, setMetamaskAddress] = useRecoilState(metamaskAtom);

  const connectMetamask = async () => {  
    if(window.ethereum) {
        // request for metamask accounts
        await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        const address = await (await provider.getSigner()).getAddress();
        setMetamaskAddress(address);
    }
    else {
        console.log('Install Metamask Extension');
    }
  }

  return (
    <div className='flex flex-row gap-4 items-center'>
        {(metamaskAddress && metamaskAddress.length > 0) && <div>Your Address: {metamaskAddress}</div>}
        <Button variant="outline" className='flex gap-2 items-center' onClick={connectMetamask}>
            <Image src='/metamask.png' alt='Metamask' width={24} height={24} />
            <span>Connect Wallet</span>
        </Button>
    </div>
  )
}

export default ConnectWallet