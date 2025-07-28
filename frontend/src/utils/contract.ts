import { Provider } from '@massalabs/massa-web3';

// Contract configuration
export const CONTRACT_CONFIG = {
  // You'll need to deploy the contract and update this address
  CONTRACT_ADDRESS: 'AS1...',  // Replace with actual deployed contract address
  BASE_TOKEN: 'AS12BqZEQ6sByhRLyEuf0YbQmcF2PsDdkNNG1akBJu9XcjZA1eT',
  INDEX_TOKENS: [
    { address: 'AS12LmTm4zRYkUQZusw7eevvV5ySzSwndJpENQ7EZHcmDbWafx96T', percentage: 50, name: 'Token A' },
    { address: 'AS12UBnqTHDQALpocVBnkPNy7y5CndUJQTLutaVDDFgMJcq5kQiKq', percentage: 30, name: 'Token B' },
    { address: 'AS12BqZEQ6sByhRLyEuf0YbQmcF2PsDdkNNG1akBJu9XcjZA1eT', percentage: 20, name: 'Token C' }
  ]
};

export interface OperationResult {
  operationId: string;
}

export interface ContractReadResult {
  value: string;
}

export class RebalancioContract {
  private provider: Provider;
  private contractAddress: string;

  constructor(provider: Provider, contractAddress: string) {
    this.provider = provider;
    this.contractAddress = contractAddress;
  }

  /**
   * Deposit base tokens into the rebalancing contract
   */
  async deposit(): Promise<string> {
    try {
      // Use the provider's call method (actual API may vary)
      const result = await this.provider.call({
        contractAddress: this.contractAddress,
        functionName: 'deposit',
        parameters: [],
        maxGas: 1000000n,
        fee: 100000n
      });
      
      return result.operationId;
    } catch (error) {
      console.error('Deposit failed:', error);
      throw new Error(`Deposit failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Withdraw deposited tokens from the contract
   */
  async withdraw(): Promise<string> {
    try {
      const result = await this.provider.call({
        contractAddress: this.contractAddress,
        functionName: 'withdraw',
        parameters: [],
        maxGas: 1000000n,
        fee: 100000n
      });
      
      return result.operationId;
    } catch (error) {
      console.error('Withdraw failed:', error);
      throw new Error(`Withdraw failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Trigger rebalancing of the portfolio
   */
  async rebalance(): Promise<string> {
    try {
      const result = await this.provider.call({
        contractAddress: this.contractAddress,
        functionName: 'rebalance',
        parameters: [],
        maxGas: 2000000n,
        fee: 200000n
      });
      
      return result.operationId;
    } catch (error) {
      console.error('Rebalance failed:', error);
      throw new Error(`Rebalance failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get user's deposit amount
   */
  async getUserDeposit(userAddress: string): Promise<string> {
    try {
      const result = await this.provider.readContract({
        contractAddress: this.contractAddress,
        functionName: 'getUserDeposit',
        parameters: [userAddress]
      });
      
      return result.value || '0';
    } catch (error) {
      console.error('Failed to get user deposit:', error);
      return '0';
    }
  }

  /**
   * Get total base amount in the contract
   */
  async getTotalBase(): Promise<string> {
    try {
      const result = await this.provider.readContract({
        contractAddress: this.contractAddress,
        functionName: 'getTotalBase',
        parameters: []
      });
      
      return result.value || '0';
    } catch (error) {
      console.error('Failed to get total base:', error);
      return '0';
    }
  }

  /**
   * Get index token allocations
   */
  async getIndexAllocations(): Promise<Array<{ token: string; percentage: number }>> {
    try {
      const result = await this.provider.readContract({
        contractAddress: this.contractAddress,
        functionName: 'getIndexAllocations',
        parameters: []
      });
      
      const allocationsStr = result.value || '';
      
      // Parse the result: "token1:50,token2:30,token3:20"
      if (!allocationsStr) return [];
      
      const allocations = allocationsStr.split(',').map(item => {
        const [token, percentageStr] = item.split(':');
        return {
          token,
          percentage: parseInt(percentageStr)
        };
      });
      
      return allocations;
    } catch (error) {
      console.error('Failed to get index allocations:', error);
      return [];
    }
  }

  /**
   * Get base token balance for a user
   */
  async getBaseTokenBalance(userAddress: string): Promise<string> {
    try {
      // This would call the base token contract's balanceOf function
      const result = await this.provider.readContract({
        contractAddress: CONTRACT_CONFIG.BASE_TOKEN,
        functionName: 'balanceOf',
        parameters: [userAddress]
      });
      
      return result.value || '0';
    } catch (error) {
      console.error('Failed to get base token balance:', error);
      return '0';
    }
  }

  /**
   * Check operation status
   */
  async getOperationStatus(operationId: string): Promise<{ status: string; isSuccess: boolean }> {
    try {
      const result = await this.provider.getOperationStatus(operationId);
      return {
        status: result.status || 'pending',
        isSuccess: result.isSuccess || false
      };
    } catch (error) {
      console.error('Failed to get operation status:', error);
      return { status: 'error', isSuccess: false };
    }
  }
}
