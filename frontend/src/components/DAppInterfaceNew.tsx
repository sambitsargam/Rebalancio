import React, { useState, useEffect, useCallback } from 'react';
import { contractService } from '../services/contract';

interface TokenAllocation {
  token: string;
  percentage: number;
}

const DAppInterface: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [userDeposit, setUserDeposit] = useState('0');
  const [totalFunds, setTotalFunds] = useState('0');
  const [targetAllocations, setTargetAllocations] = useState<TokenAllocation[]>([]);
  const [currentAllocations, setCurrentAllocations] = useState<TokenAllocation[]>([]);
  const [lastRebalance, setLastRebalance] = useState('Never');
  
  // Form states
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const loadContractData = useCallback(async () => {
    try {
      const userDep = await contractService.getUserDeposit();
      const total = await contractService.getTotalBase();
      const indexAlloc = await contractService.getIndexAllocations();
      const currentAlloc = await contractService.getCurrentAllocations();
      const lastRebalanceTime = await contractService.getLastRebalanceTime();

      setUserDeposit(userDep);
      setTotalFunds(total);
      
      // Parse allocation strings
      if (indexAlloc) {
        const parsed = parseAllocations(indexAlloc);
        setTargetAllocations(parsed);
      }
      
      if (currentAlloc) {
        const parsed = parseAllocations(currentAlloc);
        setCurrentAllocations(parsed);
      }

      if (lastRebalanceTime && lastRebalanceTime !== '0') {
        const date = new Date(parseInt(lastRebalanceTime) * 1000);
        setLastRebalance(date.toLocaleString());
      }
    } catch (error) {
      console.error('Failed to load contract data:', error);
    }
  }, []);

  useEffect(() => {
    const initAndLoad = async () => {
      try {
        await contractService.initialize();
        // Set a simulated contract address for demo
        await contractService.deployContract();
        await loadContractData();
      } catch (error) {
        console.error('Failed to initialize contract:', error);
      }
    };
    
    initAndLoad();
  }, [loadContractData]);

  const parseAllocations = (allocString: string): TokenAllocation[] => {
    return allocString.split(',').map(pair => {
      const [token, percentage] = pair.split(':');
      return {
        token: token.trim(),
        percentage: parseFloat(percentage) || 0
      };
    });
  };

  const connectWallet = async () => {
    setLoading(true);
    try {
      const address = await contractService.connectWallet();
      setWalletAddress(address);
      setIsConnected(true);
      await loadContractData();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please make sure you have Massa wallet extension installed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      alert('Please enter a valid deposit amount');
      return;
    }

    setLoading(true);
    try {
      console.log('🚀 Starting deposit transaction...');
      const operation = await contractService.deposit(depositAmount);
      
      // Show detailed transaction information
      const message = `
🎉 DEPOSIT SUCCESSFUL!

📊 Transaction Details:
• Amount: ${depositAmount} MAS
• Transaction Hash: ${operation.transactionHash}
• Block Height: ${operation.blockHeight}
• Gas Used: ${operation.gasUsed?.toLocaleString()} units
• Transaction Fee: ${operation.fee?.toFixed(6)} MAS
• Operation ID: ${operation.id}
• Status: ${operation.status}
• Confirmations: ${operation.confirmations}
• Timestamp: ${new Date(operation.timestamp).toLocaleString()}

💡 Your funds have been deposited and are now earning yield!
Check the portfolio section to see your updated balance.
      `;
      
      alert(message);
      setDepositAmount('');
      await loadContractData();
    } catch (error) {
      console.error('❌ Deposit failed:', error);
      const errorMessage = `
❌ DEPOSIT FAILED!

Error: ${error instanceof Error ? error.message : 'Unknown error'}

Please check:
• Your wallet connection
• Sufficient balance for gas fees
• Network connectivity

Try again or contact support if the issue persists.
      `;
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert('Please enter a valid withdrawal amount');
      return;
    }

    if (parseFloat(withdrawAmount) > parseFloat(userDeposit)) {
      alert(`❌ INSUFFICIENT BALANCE!
      
Available Balance: ${userDeposit} MAS
Requested Amount: ${withdrawAmount} MAS

Please enter an amount less than or equal to your available balance.`);
      return;
    }

    setLoading(true);
    try {
      console.log('🚀 Starting withdrawal transaction...');
      const operation = await contractService.withdraw(withdrawAmount);
      
      // Show detailed transaction information
      const message = `
💰 WITHDRAWAL SUCCESSFUL!

📊 Transaction Details:
• Amount Withdrawn: ${withdrawAmount} MAS
• Transaction Hash: ${operation.transactionHash}
• Block Height: ${operation.blockHeight}
• Gas Used: ${operation.gasUsed?.toLocaleString()} units
• Transaction Fee: ${operation.fee?.toFixed(6)} MAS
• Operation ID: ${operation.id}
• Status: ${operation.status}
• Confirmations: ${operation.confirmations}
• Timestamp: ${new Date(operation.timestamp).toLocaleString()}

💡 Your funds have been withdrawn from the portfolio.
The remaining balance continues to earn yield automatically.
      `;
      
      alert(message);
      setWithdrawAmount('');
      await loadContractData();
    } catch (error) {
      console.error('❌ Withdrawal failed:', error);
      const errorMessage = `
❌ WITHDRAWAL FAILED!

Error: ${error instanceof Error ? error.message : 'Unknown error'}

Common issues:
• Insufficient balance
• Network congestion
• Gas estimation failure

Please verify your balance and try again.
      `;
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRebalance = async () => {
    setLoading(true);
    try {
      console.log('🔄 Starting portfolio rebalance...');
      const operation = await contractService.rebalance();
      
      // Extract additional properties if they exist
      const operationWithExtras = operation as typeof operation & {
        fee?: number;
        timestamp?: number;
      };
      
      // Show detailed rebalance information
      const message = `
⚖️ PORTFOLIO REBALANCED!

📊 Transaction Details:
• Transaction Hash: ${operation.transactionHash || 'N/A'}
• Block Height: ${operation.blockHeight || 'N/A'}
• Gas Used: ${operation.gasUsed?.toLocaleString() || 'N/A'} units
• Transaction Fee: ${operationWithExtras.fee?.toFixed(6) || 'N/A'} MAS
• Operation ID: ${operation.id}
• Status: ${operation.status}
• Timestamp: ${operationWithExtras.timestamp ? new Date(operationWithExtras.timestamp).toLocaleString() : 'N/A'}

🎯 Rebalancing Actions:
• Portfolio allocations adjusted to target percentages
• Token distributions optimized for maximum yield
• All positions rebalanced according to index strategy

💡 Your portfolio is now optimally balanced!
Future rebalancing will happen automatically based on market conditions.
      `;
      
      alert(message);
      await loadContractData();
    } catch (error) {
      console.error('❌ Rebalance failed:', error);
      const errorMessage = `
❌ REBALANCE FAILED!

Error: ${error instanceof Error ? error.message : 'Unknown error'}

Possible causes:
• No funds available to rebalance
• Network connectivity issues
• Insufficient gas for complex operations

Your funds remain safe. Please try again later.
      `;
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Rebalancio DeFi Platform</h1>
          <p className="text-xl text-blue-200 mb-6">Automated Portfolio Rebalancing on Massa Blockchain</p>
          
          {!isConnected ? (
            <button
              onClick={connectWallet}
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              {loading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
              <p className="text-green-300 font-semibold">✅ Connected</p>
              <p className="text-blue-200 text-sm font-mono">{walletAddress}</p>
            </div>
          )}
        </div>

        {isConnected && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Portfolio Overview */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Portfolio Overview</h2>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-300 mb-2">Your Deposit</h3>
                  <p className="text-3xl font-bold text-white">{userDeposit} MAS</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-300 mb-2">Total Pool</h3>
                  <p className="text-3xl font-bold text-white">{totalFunds} MAS</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">Last Rebalance</h3>
                  <p className="text-lg text-white">{lastRebalance}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Actions</h2>
              
              <div className="space-y-6">
                {/* Deposit */}
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-300 mb-3">Deposit Funds</h3>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="Amount in MAS"
                      className="flex-1 bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleDeposit}
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                      Deposit
                    </button>
                  </div>
                </div>

                {/* Withdraw */}
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-300 mb-3">Withdraw Funds</h3>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Amount in MAS"
                      max={userDeposit}
                      className="flex-1 bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleWithdraw}
                      disabled={loading}
                      className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                      Withdraw
                    </button>
                  </div>
                </div>

                {/* Rebalance */}
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">Portfolio Rebalancing</h3>
                  <button
                    onClick={handleRebalance}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    {loading ? 'Processing...' : 'Rebalance Portfolio'}
                  </button>
                </div>
              </div>
            </div>

            {/* Target Allocations */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Target Allocations</h2>
              <div className="space-y-3">
                {targetAllocations.map((allocation, index) => (
                  <div key={index} className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                    <span className="text-white font-semibold">{allocation.token}</span>
                    <span className="text-blue-300 font-bold">{allocation.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Allocations */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Current Allocations</h2>
              <div className="space-y-3">
                {currentAllocations.map((allocation, index) => (
                  <div key={index} className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                    <span className="text-white font-semibold">{allocation.token}</span>
                    <span className="text-green-300 font-bold">{allocation.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-blue-200 text-sm">
          <p>Powered by Massa Blockchain • Built with React & TypeScript</p>
          <p className="mt-2">Smart Contract: {contractService.isConnected() ? 'AS12BqZEQ6sByhRLyEuf0YbQmcF2PsDdkNNG1akBJu9XcjZA1eT' : 'Not Connected'}</p>
        </div>
      </div>
    </div>
  );
};

export default DAppInterface;
