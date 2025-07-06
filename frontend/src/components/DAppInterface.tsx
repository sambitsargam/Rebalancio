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
import { Provider, Args, OperationStatus, bytesToStr } from '@massalabs/massa-web3';

interface DAppInterfaceProps {
  provider: Provider;
  userAddress: string;
  contractAddress: string;
  onDisconnect: () => void;
}

const DAppInterface: React.FC<DAppInterfaceProps> = ({ 
  provider, 
  userAddress, 
  contractAddress, 
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
      // Get user balance from contract
      const balanceResult = await provider.smartContracts.readSmartContract({
        func: "getBalance",
        target: contractAddress,
        parameter: new Args().addString(userAddress).serialize(),
      });
      
      const balance = parseInt(bytesToStr(balanceResult.value)) / 1000000000;
      setPortfolioValue(balance.toFixed(2));
      setTotalDeposited(balance.toFixed(2));
    } catch (err) {
      console.error('Error fetching portfolio data:', err);
    }
  }, [provider, contractAddress, userAddress]);

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

  const executeTransaction = async (functionName: string, amount?: string) => {
    if (!provider) return;

    setIsLoading(true);
    setError(null);
    setOperationId(null);

    try {
      let parameter = new Uint8Array();
      
      if (amount && (functionName === 'deposit' || functionName === 'withdraw')) {
        const amountInSmallestUnit = Math.floor(parseFloat(amount) * 1000000000);
        parameter = new Args().addU64(BigInt(amountInSmallestUnit)).serialize();
      }

      const operation = await provider.smartContracts.callSmartContract({
        parameter,
        func: functionName,
        target: contractAddress,
      });

      setOperationId(operation.id);

      const status = await operation.waitSpeculativeExecution();

      if (status === OperationStatus.SpeculativeSuccess) {
        // Clear input fields after successful transaction
        if (functionName === 'deposit') setDepositAmount('');
        if (functionName === 'withdraw') setWithdrawAmount('');
        
        // Refresh portfolio data
        await fetchPortfolioData();
        
        if (functionName === 'rebalance') {
          setLastRebalance('Just now');
        }
      } else {
        throw new Error(`Transaction failed with status: ${status}`);
      }
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
    executeTransaction('deposit', depositAmount);
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      setError('Please enter a valid withdrawal amount');
      return;
    }
    executeTransaction('withdraw', withdrawAmount);
  };

  const handleRebalance = () => {
    executeTransaction('rebalance');
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-4 mb-4 lg:mb-0">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Rebalancio</h1>
              <p className="text-gray-300">Portfolio Management Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                <Wallet className="h-4 w-4" />
                Connected Wallet
              </div>
              <div className="flex items-center gap-2">
                <code className="text-white font-mono text-sm">
                  {userAddress ? 
                    `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : 
                    'Loading...'
                  }
                </code>
                <button
                  onClick={copyAddress}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <button
              onClick={onDisconnect}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-4 py-2 rounded-xl border border-red-500/30 transition-all duration-300 flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Disconnect
            </button>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Portfolio Value</p>
                <p className="text-2xl font-bold text-white">{portfolioValue} MAS</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">24h Change</p>
                <p className="text-2xl font-bold text-green-400">+2.47%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Deposited</p>
                <p className="text-2xl font-bold text-white">{totalDeposited} MAS</p>
              </div>
              <ArrowDownCircle className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Last Rebalance</p>
                <p className="text-2xl font-bold text-white">{lastRebalance}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-400" />
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