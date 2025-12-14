'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { getContract, formatBalance } from '@/lib/contract';
import { getContractWithSigner } from '@/lib/contract';

interface TokenInfoProps {
  provider: ethers.Provider | null;
  signer: ethers.Signer | null;
  userAddress: string | null;
}

export default function TokenInfo({
  provider,
  signer,
  userAddress,
}: TokenInfoProps) {
  const [tokenName, setTokenName] = useState<string>('');
  const [tokenSymbol, setTokenSymbol] = useState<string>('');
  const [totalSupply, setTotalSupply] = useState<string>('');
  const [userBalance, setUserBalance] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [contractAddress, setContractAddress] = useState(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''
  );

  const loadTokenInfo = async () => {
    if (!provider || !contractAddress) return;

    try {
      setLoading(true);
      const contract = getContract(provider, contractAddress);

      const [name, symbol, supply] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.totalSupply(),
      ]);

      setTokenName(name);
      setTokenSymbol(symbol);
      setTotalSupply(formatBalance(supply));

      if (userAddress) {
        const balance = await contract.balanceOf(userAddress);
        setUserBalance(formatBalance(balance));
      }
    } catch (error: any) {
      console.error('Error loading token info:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (provider && contractAddress) {
      loadTokenInfo();
    }
  }, [provider, contractAddress, userAddress]);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold mb-4 text-white">Token Information</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Contract Address
        </label>
        <input
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="0x..."
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={loadTokenInfo}
          disabled={loading || !contractAddress}
          className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm"
        >
          {loading ? 'Loading...' : 'Load Info'}
        </button>
      </div>

      {tokenName && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Name:</span>
            <span className="text-white font-semibold">{tokenName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Symbol:</span>
            <span className="text-white font-semibold">{tokenSymbol}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Total Supply:</span>
            <span className="text-white font-semibold">
              {totalSupply} {tokenSymbol}
            </span>
          </div>
          {userAddress && userBalance && (
            <div className="flex justify-between items-center pt-3 border-t border-white/20">
              <span className="text-gray-300">Your Balance:</span>
              <span className="text-green-400 font-bold text-lg">
                {userBalance} {tokenSymbol}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
