import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

interface WalletStatus {
  extensionInstalled: boolean;
  extensionLoaded: boolean;
  accounts: any[];
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
        
        // Check if extension is installed
        const massaProvider = (window as any).massa;
        
        if (!massaProvider) {
          // Wait a bit for extension to load
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const massaProviderRetry = (window as any).massa;
          
          if (!massaProviderRetry) {
            setStatus({
              extensionInstalled: false,
              extensionLoaded: false,
              accounts: [],
              error: 'MassaWallet extension not found'
            });
            return;
          }
        }

        const provider = (window as any).massa;
        
        setStatus(prev => ({
          ...prev,
          extensionInstalled: true,
          extensionLoaded: true
        }));

        // Try to get accounts
        try {
          const accounts = await provider.request({
            method: 'wallet_accounts'
          });

          setStatus(prev => ({
            ...prev,
            accounts: accounts || []
          }));
        } catch (error) {
          setStatus(prev => ({
            ...prev,
            error: `Account access failed: ${error instanceof Error ? error.message : 'Unknown error'}`
          }));
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
            MassaWallet Extension {status.extensionInstalled ? 'Installed' : 'Not Found'}
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
            MassaWallet extension is required to connect.
          </p>
          <a 
            href="https://chrome.google.com/webstore" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
          >
            Install MassaWallet Extension
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
