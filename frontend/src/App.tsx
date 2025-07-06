import { useState, useEffect, useCallback } from "react";
import { getWallets, WalletName } from "@massalabs/wallet-provider";
import { Provider, Args, OperationStatus, bytesToStr } from "@massalabs/massa-web3";
import LandingPage from './components/LandingPage';
import DAppInterface from './components/DAppInterface';

const CONTRACT_ADDRESS = "AS12BqZEQ6sByhRLyEuf0YbQmcF2PsDdkNNG1akBJu9XcjZA1eT";

function App() {
  const [provider, setProvider] = useState<Provider>();
  const [userAddress, setUserAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const walletList = await getWallets();
      const wallet = walletList.find(
        (provider) => provider.name() === WalletName.MassaWallet
      );
      
      if (!wallet) {
        throw new Error('No Massa wallet found. Please install MassaStation or another compatible wallet.');
      }

      const accounts = await wallet.accounts();

      if (accounts.length === 0) {
        throw new Error('No accounts found in wallet. Please create an account first.');
      }

      const account = accounts[0];
      const massaProvider = await wallet.connect([account]);
      
      setProvider(massaProvider);
      setUserAddress(account.address);
      
      console.log('Connected address:', account.address);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
      console.error('Wallet connection failed:', err);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setProvider(undefined);
    setUserAddress("");
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {!provider ? (
        <LandingPage 
          onConnect={connectWallet}
          isConnecting={isConnecting}
          error={error}
        />
      ) : (
        <DAppInterface 
          provider={provider}
          userAddress={userAddress}
          contractAddress={CONTRACT_ADDRESS}
          onDisconnect={disconnectWallet}
        />
      )}
    </div>
  );
}

export default App;