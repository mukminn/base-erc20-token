'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import WalletButton from '@/components/WalletButton';
import TokenInfo from '@/components/TokenInfo';
import TokenActions from '@/components/TokenActions';
import { switchToBaseNetwork, switchToBaseSepoliaNetwork } from '@/lib/wallet';

export default function Home() {
  const [provider, setProvider] = useState<ethers.Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [contractAddress, setContractAddress] = useState(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''
  );
  const [refreshKey, setRefreshKey] = useState(0);

  const handleConnect = async (address: string) => {
    if (!window.ethereum) return;

    const prov = new ethers.BrowserProvider(window.ethereum);
    const sig = await prov.getSigner();

    setProvider(prov);
    setSigner(sig);
    setUserAddress(address);
  };

  const handleDisconnect = () => {
    setProvider(null);
    setSigner(null);
    setUserAddress(null);
  };

  const handleTransactionComplete = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-base-dark via-purple-900 to-base-dark p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            BaseToken dApp
          </h1>
          <p className="text-gray-300 text-lg">
            Interact with your ERC20 token on Base blockchain
          </p>
        </div>

        {/* Network Switcher */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={switchToBaseNetwork}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Switch to Base
          </button>
          <button
            onClick={switchToBaseSepoliaNetwork}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Switch to Base Sepolia
          </button>
        </div>

        {/* Wallet Connection */}
        <div className="flex justify-center mb-8">
          <WalletButton
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Token Info */}
          <div key={refreshKey}>
            <TokenInfo
              provider={provider}
              signer={signer}
              userAddress={userAddress}
            />
          </div>

          {/* Token Actions */}
          <TokenActions
            signer={signer}
            userAddress={userAddress}
            contractAddress={contractAddress}
            onTransactionComplete={handleTransactionComplete}
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Built for Base blockchain • Powered by ethers.js & Next.js</p>
        </div>
      </div>
    </main>
  );
}
