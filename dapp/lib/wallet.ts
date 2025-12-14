import { ethers } from 'ethers';
import { BASE_NETWORK, BASE_SEPOLIA_NETWORK } from './contract';

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider;
  }
}

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();

  return { provider, signer, address: accounts[0] };
};

export const getWalletAddress = async () => {
  if (!window.ethereum) {
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send('eth_accounts', []);
  return accounts[0] || null;
};

export const switchToBaseNetwork = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BASE_NETWORK.chainId }],
    });
  } catch (switchError: any) {
    // Chain doesn't exist, add it
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [BASE_NETWORK],
      });
    } else {
      throw switchError;
    }
  }
};

export const switchToBaseSepoliaNetwork = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BASE_SEPOLIA_NETWORK.chainId }],
    });
  } catch (switchError: any) {
    // Chain doesn't exist, add it
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [BASE_SEPOLIA_NETWORK],
      });
    } else {
      throw switchError;
    }
  }
};

export const formatAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatBalance = (balance: bigint, decimals: number = 18) => {
  return ethers.formatUnits(balance, decimals);
};

export const parseAmount = (amount: string, decimals: number = 18) => {
  return ethers.parseUnits(amount, decimals);
};
