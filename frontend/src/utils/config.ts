// Frontend configuration constants
export const CONFIG = {
  // Contract address - update this with actual deployed contract address
  CONTRACT_ADDRESS: "AS12BqZEQ6sByhRLyEuf0YbQmcF2PsDdkNNG1akBJu9XcjZA1eT",
  
  // Token decimals (Massa uses 9 decimals by default)
  TOKEN_DECIMALS: 9,
  
  // Network configuration
  NETWORK: {
    MAINNET: 'mainnet',
    TESTNET: 'testnet',
    CURRENT: 'testnet', // Change this for production
  },
  
  // Transaction limits
  MAX_GAS: 200000000n, // 200M gas units
  
  // UI Configuration
  REFRESH_INTERVAL: 30000, // 30 seconds
};

// Utility functions
export const formatTokenAmount = (amount: string | number, decimals: number = CONFIG.TOKEN_DECIMALS): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return (num / Math.pow(10, decimals)).toFixed(6);
};

export const parseTokenAmount = (amount: string, decimals: number = CONFIG.TOKEN_DECIMALS): bigint => {
  const num = parseFloat(amount);
  return BigInt(Math.floor(num * Math.pow(10, decimals)));
};

export const truncateAddress = (address: string, startChars: number = 6, endChars: number = 4): string => {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

export const isValidMassaAddress = (address: string): boolean => {
  // Basic Massa address validation
  return /^A[SU][A-Za-z0-9]{48,50}$/.test(address);
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Error messages
export const ERROR_MESSAGES = {
  WALLET_NOT_FOUND: 'No Massa wallet found. Please install MassaStation or another compatible wallet.',
  NO_ACCOUNTS: 'No accounts found in wallet. Please create an account first.',
  INVALID_AMOUNT: 'Please enter a valid amount',
  TRANSACTION_FAILED: 'Transaction failed. Please try again.',
  CONTRACT_ERROR: 'Smart contract error occurred',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};
