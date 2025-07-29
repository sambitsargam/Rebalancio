import { 
  JsonRPCClient,
  OperationStatus,
  Args
} from '@massalabs/massa-web3';

interface WalletProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, handler: (data: any) => void) => void;
}

interface OperationResult {
  id: string;
  status: OperationStatus;
  transactionHash?: string;
  blockHeight?: string | number;
  gasUsed?: number;
  timestamp?: number;
  amount?: number;
  fee?: number;
  confirmations?: number;
}

export class RebalancioContract {
  private client: JsonRPCClient | null = null;
  private walletProvider: WalletProvider | null = null;
  private connectedAddress: string | null = null;
  private contractAddress: string = 'AS12BqZEQ6sByhRLyEuf0YbQmcF2PsDdkNNG1akBJu9XcjZA1eT';

  async initialize() {
    try {
      console.log('🔗 Connecting to Massa blockchain...');
      
      // Initialize real Massa Web3 client for testnet
      this.client = JsonRPCClient.testnet();
      
      console.log('✅ Connected to Massa testnet');
      
      return true;
    } catch (error) {
      console.error('❌ Failed to connect to Massa network:', error);
      return false;
    }
  }

  async connectWallet() {
    try {
      console.log('🔐 Connecting to Massa wallet...');
      
      // Check if Massa wallet extension is available
      const massaProvider = (window as any).massa;
      if (!massaProvider) {
        throw new Error('Massa wallet extension not found. Please install MassaWallet.');
      }

      this.walletProvider = massaProvider;

      // Request account access
      const accounts = await this.walletProvider.request({
        method: 'wallet_accounts'
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please create an account in your wallet.');
      }

      this.connectedAddress = accounts[0].address;
      
      console.log('✅ Wallet connected successfully');
      console.log(`👤 Address: ${this.connectedAddress}`);
      
      return this.connectedAddress;
    } catch (error) {
      console.error('❌ Failed to connect wallet:', error);
      throw new Error(`Wallet connection failed: ${error instanceof Error ? error.message : 'Please install MassaWallet extension'}`);
    }
  }

  async deposit(amount: string): Promise<OperationResult> {
    if (!this.client || !this.walletProvider || !this.connectedAddress) {
      throw new Error('Please connect your wallet first');
    }

    try {
      console.log(`🔄 Starting real deposit transaction...`);
      console.log(`📊 Amount: ${amount} MAS`);
      console.log(`📍 Contract: ${this.contractAddress}`);
      console.log(`👤 From: ${this.connectedAddress}`);
      
      // Convert amount to nanoMAS (1 MAS = 1,000,000,000 nanoMAS)
      const amountInNanoMAS = BigInt(Math.floor(parseFloat(amount) * 1_000_000_000));
      
      console.log(`⏳ Step 1/4: Preparing transaction parameters...`);
      
      // Prepare function arguments for the deposit call
      const args = new Args().addString(amount);
      const serializedArgs = args.serialize();
      
      console.log(`⏳ Step 2/4: Creating smart contract call...`);
      
      // Create the smart contract call transaction
      const callData = {
        method: 'wallet_callSmartContract',
        params: [{
          nickname: 'Rebalancio Deposit',
          targetAddress: this.contractAddress,
          functionName: 'deposit',
          parameter: Array.from(serializedArgs),
          maxGas: '3000000',
          coins: amountInNanoMAS.toString()
        }]
      };

      console.log(`⏳ Step 3/4: Broadcasting to Massa network...`);
      
      // Send transaction through wallet
      const operationIds = await this.walletProvider.request(callData);
      
      if (!operationIds || operationIds.length === 0) {
        throw new Error('Transaction was rejected or failed');
      }

      const operationId = operationIds[0];
      console.log(`📄 Operation ID: ${operationId}`);
      
      console.log(`⏳ Step 4/4: Waiting for confirmation...`);
      
      // Wait for confirmation
      let attempts = 0;
      const maxAttempts = 30;
      let confirmed = false;
      let operationInfo: any = null;
      
      while (!confirmed && attempts < maxAttempts) {
        try {
          const operations = await this.client.getOperations([operationId]);
          operationInfo = operations[0];
          
          if (operationInfo && operationInfo.in_blocks && operationInfo.in_blocks.length > 0) {
            confirmed = true;
            break;
          }
        } catch (error) {
          console.log(`Waiting for confirmation... (${attempts + 1}/${maxAttempts})`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        attempts++;
      }
      
      if (!confirmed) {
        throw new Error('Transaction confirmation timeout. Please check your transaction status manually.');
      }

      console.log(`✅ Transaction confirmed!`);
      
      const result: OperationResult = {
        id: operationId,
        status: OperationStatus.Success,
        transactionHash: operationId,
        blockHeight: operationInfo?.in_blocks?.[0]?.block_id || 'Confirmed',
        gasUsed: Number(operationInfo?.operation_status?.Success || 0),
        timestamp: Date.now(),
        amount: parseFloat(amount),
        fee: Number(operationInfo?.fee || 0) / 1_000_000_000,
        confirmations: 1
      };

      console.log(`📄 Transaction Hash: ${result.transactionHash}`);
      console.log(`🔗 Block: ${result.blockHeight}`);
      console.log(`⛽ Gas Used: ${result.gasUsed?.toLocaleString() || 'Unknown'}`);
      console.log(`💸 Fee: ${result.fee?.toFixed(6) || '0.000000'} MAS`);
      
      return result;
      
    } catch (error) {
      console.error('❌ Deposit transaction failed:', error);
      throw new Error(`Deposit failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async withdraw(amount: string): Promise<OperationResult> {
    if (!this.client || !this.walletProvider || !this.connectedAddress) {
      throw new Error('Please connect your wallet first');
    }

    try {
      console.log(`🔄 Starting real withdrawal transaction...`);
      console.log(`📊 Amount: ${amount} MAS`);
      console.log(`📍 Contract: ${this.contractAddress}`);
      
      // First, check if user has sufficient balance by calling the smart contract
      console.log(`⏳ Step 1/5: Checking balance...`);
      
      try {
        const balanceArgs = new Args().addString(this.connectedAddress);
        const balanceResult = await this.client.smartContractsQuery({
          smartContractAddress: this.contractAddress,
          functionName: 'getUserDeposit',
          parameter: Array.from(balanceArgs.serialize())
        });
        
        // Parse balance from result
        const userBalance = balanceResult ? parseFloat(balanceResult.toString()) : 0;
        console.log(`💰 Current balance: ${userBalance} MAS`);
        
        if (parseFloat(amount) > userBalance) {
          throw new Error(`Insufficient balance. Available: ${userBalance} MAS, Requested: ${amount} MAS`);
        }
      } catch (balanceError) {
        console.warn('Could not verify balance, proceeding with withdrawal...');
      }
      
      console.log(`⏳ Step 2/5: Preparing withdrawal parameters...`);
      
      const args = new Args().addString(amount);
      const serializedArgs = args.serialize();
      
      console.log(`⏳ Step 3/5: Creating withdrawal transaction...`);
      
      const callData = {
        method: 'wallet_callSmartContract',
        params: [{
          nickname: 'Rebalancio Withdrawal',
          targetAddress: this.contractAddress,
          functionName: 'withdraw',
          parameter: Array.from(serializedArgs),
          maxGas: '3000000',
          coins: '0' // No coins sent for withdrawal
        }]
      };

      console.log(`⏳ Step 4/5: Broadcasting to network...`);
      
      const operationIds = await this.walletProvider.request(callData);
      
      if (!operationIds || operationIds.length === 0) {
        throw new Error('Withdrawal transaction was rejected');
      }

      const operationId = operationIds[0];
      console.log(`📄 Operation ID: ${operationId}`);
      
      console.log(`⏳ Step 5/5: Waiting for confirmation...`);
      
      // Wait for confirmation (similar to deposit)
      let attempts = 0;
      const maxAttempts = 30;
      let confirmed = false;
      let operationInfo: any = null;
      
      while (!confirmed && attempts < maxAttempts) {
        try {
          const operations = await this.client.getOperations([operationId]);
          operationInfo = operations[0];
          
          if (operationInfo && operationInfo.in_blocks && operationInfo.in_blocks.length > 0) {
            confirmed = true;
            break;
          }
        } catch (error) {
          console.log(`Waiting for confirmation... (${attempts + 1}/${maxAttempts})`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        attempts++;
      }
      
      if (!confirmed) {
        throw new Error('Withdrawal confirmation timeout. Please check your transaction status manually.');
      }

      console.log(`✅ Withdrawal confirmed!`);
      
      const result: OperationResult = {
        id: operationId,
        status: OperationStatus.Success,
        transactionHash: operationId,
        blockHeight: operationInfo?.in_blocks?.[0]?.block_id || 'Confirmed',
        gasUsed: Number(operationInfo?.operation_status?.Success || 0),
        timestamp: Date.now(),
        amount: parseFloat(amount),
        fee: Number(operationInfo?.fee || 0) / 1_000_000_000,
        confirmations: 1
      };

      console.log(`📄 Transaction Hash: ${result.transactionHash}`);
      console.log(`🔗 Block: ${result.blockHeight}`);
      console.log(`💸 Fee: ${result.fee?.toFixed(6) || '0.000000'} MAS`);
      
      return result;
      
    } catch (error) {
      console.error('❌ Withdrawal failed:', error);
      throw new Error(`Withdrawal failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async rebalance(): Promise<OperationResult> {
    if (!this.client || !this.walletProvider || !this.connectedAddress) {
      throw new Error('Please connect your wallet first');
    }

    try {
      console.log(`🔄 Starting real rebalance operation...`);
      console.log(`📍 Contract: ${this.contractAddress}`);
      
      console.log(`⏳ Step 1/4: Analyzing current portfolio...`);
      
      // Get current allocations from smart contract
      try {
        const allocationsResult = await this.client.smartContractsQuery({
          smartContractAddress: this.contractAddress,
          functionName: 'getCurrentAllocations',
          parameter: []
        });
        console.log(`📊 Current allocations retrieved`);
      } catch (error) {
        console.warn('Could not retrieve current allocations, proceeding...');
      }
      
      console.log(`⏳ Step 2/4: Calculating optimal rebalancing...`);
      
      const callData = {
        method: 'wallet_callSmartContract',
        params: [{
          nickname: 'Rebalancio Rebalance',
          targetAddress: this.contractAddress,
          functionName: 'rebalance',
          parameter: [],
          maxGas: '5000000', // Higher gas for complex rebalancing
          coins: '0'
        }]
      };

      console.log(`⏳ Step 3/4: Executing rebalancing...`);
      
      const operationIds = await this.walletProvider.request(callData);
      
      if (!operationIds || operationIds.length === 0) {
        throw new Error('Rebalance transaction was rejected');
      }

      const operationId = operationIds[0];
      console.log(`📄 Operation ID: ${operationId}`);
      
      console.log(`⏳ Step 4/4: Waiting for confirmation...`);
      
      // Wait for confirmation
      let attempts = 0;
      const maxAttempts = 45; // Longer timeout for rebalancing
      let confirmed = false;
      let operationInfo: any = null;
      
      while (!confirmed && attempts < maxAttempts) {
        try {
          const operations = await this.client.getOperations([operationId]);
          operationInfo = operations[0];
          
          if (operationInfo && operationInfo.in_blocks && operationInfo.in_blocks.length > 0) {
            confirmed = true;
            break;
          }
        } catch (error) {
          console.log(`Waiting for rebalance confirmation... (${attempts + 1}/${maxAttempts})`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        attempts++;
      }
      
      if (!confirmed) {
        throw new Error('Rebalance confirmation timeout. The operation may still be processing.');
      }

      console.log(`✅ Rebalancing completed!`);
      
      const result: OperationResult = {
        id: operationId,
        status: OperationStatus.Success,
        transactionHash: operationId,
        blockHeight: operationInfo?.in_blocks?.[0]?.block_id || 'Confirmed',
        gasUsed: Number(operationInfo?.operation_status?.Success || 0),
        timestamp: Date.now(),
        fee: Number(operationInfo?.fee || 0) / 1_000_000_000,
        confirmations: 1
      };

      console.log(`📄 Transaction Hash: ${result.transactionHash}`);
      console.log(`🔗 Block: ${result.blockHeight}`);
      console.log(`⛽ Gas Used: ${result.gasUsed?.toLocaleString() || 'Unknown'}`);
      console.log(`💸 Fee: ${result.fee?.toFixed(6) || '0.000000'} MAS`);
      
      return result;
      
    } catch (error) {
      console.error('❌ Rebalancing failed:', error);
      throw new Error(`Rebalancing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getUserBalance(): Promise<string> {
    if (!this.client || !this.connectedAddress) {
      return '0';
    }

    try {
      const args = new Args().addString(this.connectedAddress);
      const result = await this.client.smartContractsQuery({
        smartContractAddress: this.contractAddress,
        functionName: 'getUserDeposit',
        parameter: Array.from(args.serialize())
      });
      
      return result ? result.toString() : '0';
    } catch (error) {
      console.error('Failed to get user balance:', error);
      return '0';
    }
  }

  async getTotalValueLocked(): Promise<string> {
    if (!this.client) {
      return '0';
    }

    try {
      const result = await this.client.smartContractsQuery({
        smartContractAddress: this.contractAddress,
        functionName: 'getTotalBase',
        parameter: []
      });
      
      return result ? result.toString() : '0';
    } catch (error) {
      console.error('Failed to get TVL:', error);
      return '0';
    }
  }

  async getCurrentAllocations(): Promise<any> {
    if (!this.client) {
      return null;
    }

    try {
      const result = await this.client.smartContractsQuery({
        smartContractAddress: this.contractAddress,
        functionName: 'getCurrentAllocations',
        parameter: []
      });
      
      return result;
    } catch (error) {
      console.error('Failed to get allocations:', error);
      return null;
    }
  }

  getConnectedAddress(): string | null {
    return this.connectedAddress;
  }

  isConnected(): boolean {
    return this.client !== null && this.walletProvider !== null && this.connectedAddress !== null;
  }

  setContractAddress(address: string) {
    this.contractAddress = address;
    console.log(`📍 Contract address updated: ${address}`);
  }
}
