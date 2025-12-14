'use client';

import { useState, useEffect } from 'react';
import { connectWallet, getWalletAddress, formatAddress } from '@/lib/wallet';

interface WalletButtonProps {
  onConnect: (address: string) => void;
  onDisconnect: () => void;
}

export default function WalletButton({
  onConnect,
  onDisconnect,
}: WalletButtonProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    const addr = await getWalletAddress();
    if (addr) {
      setAddress(addr);
      onConnect(addr);
    }
  };

  const handleConnect = async () => {
    try {
      setLoading(true);
      const { address: addr } = await connectWallet();
      setAddress(addr);
      onConnect(addr);
    } catch (error: any) {
      alert(`Error connecting wallet: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    setAddress(null);
    onDisconnect();
  };

  if (address) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 bg-green-500/20 border border-green-500 rounded-lg">
          <span className="text-green-400 font-mono text-sm">
            {formatAddress(address)}
          </span>
        </div>
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
    >
      {loading ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
