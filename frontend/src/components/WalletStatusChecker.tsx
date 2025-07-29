import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

interface WalletStatus {
  extensionInstalled: boolean;
  extensionLoaded: boolean;
  accounts: any[];
  walletName?: string;
  error?: string;
}

const WalletStatusChecker: React.FC = () => {
  const [status, setStatus] = useState<WalletStatus>({
    extensionInstalled: false,
    extensionLoaded: false,
    accounts: []
  });
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkWalletStatus = async () => {
      try {
        setChecking(true);
        
        // Import getWallets from wallet-provider
        const { getWallets } = await import('@massalabs/wallet-provider');
        
        // Check for available wallets using the official API
        try {
          const wallets = await getWallets();
          
          if (wallets.length === 0) {
            setStatus({
              extensionInstalled: false,
              extensionLoaded: false,
              accounts: [],
              error: 'No Massa wallets found. Please install MassaStation or Bearby wallet.'
            });
            return;
          }

          // Found wallet(s)
          setStatus(prev => ({
            ...prev,
            extensionInstalled: true,
            extensionLoaded: true,
            walletName: wallets[0].name()
          }));

          // Try to get accounts from the first wallet
          try {
            const wallet = wallets[0];
            const providers = await wallet.accounts();

            setStatus(prev => ({
              ...prev,
              accounts: providers || [],
              error: providers.length === 0 ? `${wallet.name()} wallet found but no accounts. Please create an account.` : undefined
            }));
          } catch (error) {
            setStatus(prev => ({
              ...prev,
              error: `Failed to get accounts: ${error instanceof Error ? error.message : 'Unknown error'}`
            }));
          }

        } catch (error) {
          // Fallback: check for direct wallet provider access
          const massaProvider = (window as any).massa;
          const bearbyProvider = (window as any).bearby;
          
          if (massaProvider || bearbyProvider) {
            setStatus({
              extensionInstalled: true,
              extensionLoaded: true,
              accounts: [],
              error: 'Wallet detected but getWallets() failed. This may be a compatibility issue.'
            });
          } else {
            setStatus({
              extensionInstalled: false,
              extensionLoaded: false,
              accounts: [],
              error: 'No wallet extensions found'
            });
          }
        }

      } catch (error) {
        setStatus({
          extensionInstalled: false,
          extensionLoaded: false,
          accounts: [],
          error: `Status check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      } finally {
        setChecking(false);
      }
    };

    checkWalletStatus();
  }, []);

  const StatusIcon: React.FC<{ success: boolean }> = ({ success }) => {
    return success ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <AlertCircle className="w-5 h-5 text-red-500" />
    );
  };

  if (checking) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-center">
          <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full mr-3"></div>
          <span className="text-blue-700">Checking wallet status...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
      <h3 className="font-semibold text-gray-800 mb-3">Wallet Status</h3>
      
      <div className="space-y-2">
        <div className="flex items-center">
          <StatusIcon success={status.extensionInstalled} />
          <span className="ml-2 text-sm">
            {status.extensionInstalled 
              ? `${status.walletName || 'Massa'} Wallet Extension Installed` 
              : 'Massa Wallet Extension Not Found'
            }
          </span>
        </div>
        
        <div className="flex items-center">
          <StatusIcon success={status.extensionLoaded} />
          <span className="ml-2 text-sm">
            Extension {status.extensionLoaded ? 'Loaded' : 'Not Loaded'}
          </span>
        </div>
        
        <div className="flex items-center">
          <StatusIcon success={status.accounts.length > 0} />
          <span className="ml-2 text-sm">
            {status.accounts.length > 0 
              ? `${status.accounts.length} account(s) found` 
              : 'No accounts found'
            }
          </span>
        </div>
      </div>

      {status.error && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          {status.error}
        </div>
      )}

      {!status.extensionInstalled && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800 mb-2">
            No Massa wallet found. Please install a compatible wallet:
          </p>
          <div className="space-y-1 text-sm">
            <div>• <strong>Bearby Wallet</strong> - Most popular Massa wallet</div>
            <div>• <strong>MassaStation</strong> - Official Massa wallet</div>
          </div>
          <a 
            href="https://bearby.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm mt-2"
          >
            Install Bearby Wallet
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      )}

      {status.extensionInstalled && status.accounts.length === 0 && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            No accounts found. Please create an account in your MassaWallet extension.
          </p>
        </div>
      )}
    </div>
  );
};

export default WalletStatusChecker;
