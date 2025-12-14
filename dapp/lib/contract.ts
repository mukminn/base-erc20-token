import { ethers } from 'ethers';

// BaseToken ABI - hanya fungsi yang diperlukan
export const BASETOKEN_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function mint(address to, uint256 amount)',
  'function burn(uint256 amount)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
] as const;

// Base network configuration
export const BASE_NETWORK = {
  chainId: '0x2105', // 8453 in hex
  chainName: 'Base',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://mainnet.base.org'],
  blockExplorerUrls: ['https://basescan.org'],
};

export const BASE_SEPOLIA_NETWORK = {
  chainId: '0x14a34', // 84532 in hex
  chainName: 'Base Sepolia',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://sepolia.base.org'],
  blockExplorerUrls: ['https://sepolia.basescan.org'],
};

// Contract address - akan diisi setelah deploy
// Untuk testing, gunakan address contract yang sudah di-deploy
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

export const getContract = (provider: ethers.Provider, address?: string) => {
  const contractAddress = address || CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error('Contract address not set');
  }
  return new ethers.Contract(contractAddress, BASETOKEN_ABI, provider);
};

export const getContractWithSigner = (
  signer: ethers.Signer,
  address?: string
) => {
  const contractAddress = address || CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error('Contract address not set');
  }
  return new ethers.Contract(contractAddress, BASETOKEN_ABI, signer);
};
