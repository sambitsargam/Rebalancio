import React, { useState, useEffect, useCallback } from 'react';
import {
  LogOut,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCw,
  BarChart3,
  TrendingUp,
  DollarSign,
  Activity,
  Copy,
  CheckCircle
} from 'lucide-react';
import { Provider } from '@massalabs/massa-web3';

interface DAppInterfaceProps {
  provider: Provider;
  userAddress: string;
  contractAddress: string; // TODO: Will be used when API integration is complete
  onDisconnect: () => void;
}

const DAppInterface: React.FC<DAppInterfaceProps> = ({ 
  provider, 
  userAddress, 
  onDisconnect 
}) => {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [operationId, setOperationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState('0.00');
  const [totalDeposited, setTotalDeposited] = useState('0.00');
  const [lastRebalance, setLastRebalance] = useState('Never');

  const fetchPortfolioData = useCallback(async () => {
    if (!provider) return;

    try {
      // For now, we'll set placeholder data since the exact Massa Web3 API needs to be determined
      // TODO: Update with correct Massa Web3 API calls once API is confirmed
      
      setTotalDeposited("0.000000"); 
      setPortfolioValue("0.000000");
      
      console.log('Portfolio data fetch attempted - API integration pending');
      
    } catch (err) {
      console.error('Error fetching portfolio data:', err);
      setError('Failed to fetch portfolio data: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  }, [provider]);

  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  const copyAddress = () => {
    if (userAddress) {
      navigator.clipboard.writeText(userAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const executeTransaction = async (functionName: string) => {
    if (!provider) return;

    setIsLoading(true);
    setError(null);
    setOperationId(null);

    try {
      // TODO: Update with correct Massa Web3 API calls once API is confirmed
      console.log(`Attempting to execute ${functionName} function`);
      
      // Placeholder for successful transaction
      setOperationId('placeholder-operation-id-' + Date.now());
      
      // Clear input fields after successful transaction
      if (functionName === 'deposit') setDepositAmount('');
      if (functionName === 'withdraw') setWithdrawAmount('');
      
      // Refresh portfolio data
      await fetchPortfolioData();
      
      if (functionName === 'rebalance') {
        setLastRebalance('Just now');
      }
      
      setError(null);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
      console.error('Transaction failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      setError('Please enter a valid deposit amount');
      return;
    }
    
    // Note: The amount validation is just for UX
    // The actual deposit amount is determined by the user's token balance
    // in the smart contract
    executeTransaction('deposit');
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      setError('Please enter a valid withdrawal amount');
      return;
    }
    
    // Note: The amount validation is just for UX
    // The actual withdrawal is based on the user's deposit record
    // in the smart contract
    executeTransaction('withdraw');
  };

  const handleRebalance = () => {
    executeTransaction('rebalance');
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-8xl mx-auto">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
          <div className="flex items-center gap-6 mb-6 lg:mb-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-50" />
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Rebalancio</h1>
              <p className="text-gray-300 text-lg">Portfolio Management Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50 shadow-lg">
              <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                <Wallet className="h-4 w-4" />
                Connected Wallet
              </div>
              <div className="flex items-center gap-3">
                <code className="text-white font-mono text-lg font-semibold">
                  {userAddress ? 
                    `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : 
                    'Loading...'
                  }
                </code>
                <button
                  onClick={copyAddress}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  {copied ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-400 group-hover:text-white" />
                  )}
                </button>
              </div>
            </div>
            
            <button
              onClick={onDisconnect}
              className="group bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-300 hover:text-red-200 px-6 py-3 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 flex items-center gap-3 shadow-lg"
            >
              <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Disconnect</span>
            </button>
          </div>
        </div>

        {/* Enhanced Portfolio Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-green-500/50 transition-all duration-500 hover:scale-105 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-2">Portfolio Value</p>
                <p className="text-3xl font-bold text-white">{portfolioValue} MAS</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          
          <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-2">24h Change</p>
                <p className="text-3xl font-bold text-green-400">+2.47%</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          
          <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-2">Total Deposited</p>
                <p className="text-3xl font-bold text-white">{totalDeposited} MAS</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <ArrowDownCircle className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          
          <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-yellow-500/50 transition-all duration-500 hover:scale-105 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-2">Last Rebalance</p>
                <p className="text-3xl font-bold text-white">{lastRebalance}</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <Activity className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Control Panel */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Control Panel</h2>
            
            <div className="space-y-6">
              {/* Deposit */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Deposit Amount (MAS)
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleDeposit}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <ArrowDownCircle className="h-4 w-4" />
                    Deposit
                  </button>
                </div>
              </div>
              
              {/* Withdraw */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Withdraw Amount (MAS)
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleWithdraw}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <ArrowUpCircle className="h-4 w-4" />
                    Withdraw
                  </button>
                </div>
              </div>
              
              {/* Rebalance */}
              <div>
                <button
                  onClick={handleRebalance}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                  {isLoading ? 'Processing...' : 'Rebalance Portfolio'}
                </button>
              </div>

              {/* Refresh Data */}
              <div>
                <button
                  onClick={fetchPortfolioData}
                  disabled={isLoading}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh Data
                </button>
              </div>
            </div>
          </div>
          
          {/* Transaction Status */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Transaction Status</h2>
            
            <div className="space-y-4">
              {operationId && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-green-300 mb-2">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">Transaction Successful</span>
                  </div>
                  <p className="text-sm text-gray-300 break-all">
                    Operation ID: {operationId}
                  </p>
                </div>
              )}
              
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-red-300 mb-2">
                    <span className="font-semibold">Transaction Failed</span>
                  </div>
                  <p className="text-sm text-gray-300">{error}</p>
                </div>
              )}
              
              {isLoading && (
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-300 mb-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-300 border-t-transparent" />
                    <span className="font-semibold">Processing Transaction</span>
                  </div>
                  <p className="text-sm text-gray-300">Please wait while your transaction is processed...</p>
                </div>
              )}
              
              {!operationId && !error && !isLoading && (
                <div className="bg-gray-500/20 border border-gray-500/30 rounded-xl p-4">
                  <p className="text-gray-300 text-sm">
                    Ready to process transactions. Use the control panel to deposit, withdraw, or rebalance your portfolio.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DAppInterface;