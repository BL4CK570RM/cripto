import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Web3LoginSection = ({ onWalletConnect, isConnecting, walletError }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);

  const walletOptions = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: 'Wallet',
      description: 'Connect using MetaMask browser extension',
      color: 'text-orange-500'
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: 'Smartphone',
      description: 'Scan with WalletConnect to connect',
      color: 'text-blue-500'
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: 'CreditCard',
      description: 'Connect using Coinbase Wallet',
      color: 'text-blue-600'
    }
  ];

  const handleWalletConnect = async (walletId) => {
    setSelectedWallet(walletId);
    await onWalletConnect(walletId);
    setSelectedWallet(null);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
        </div>
      </div>
      {walletError && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-error">
            <Icon name="AlertTriangle" size={16} />
            <span className="text-sm font-medium">{walletError}</span>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {walletOptions?.map((wallet) => (
          <Button
            key={wallet?.id}
            variant="outline"
            fullWidth
            onClick={() => handleWalletConnect(wallet?.id)}
            loading={isConnecting && selectedWallet === wallet?.id}
            disabled={isConnecting}
            className="justify-start h-auto p-4"
          >
            <div className="flex items-center space-x-3 w-full">
              <div className={`p-2 rounded-lg bg-muted ${wallet?.color}`}>
                <Icon name={wallet?.icon} size={20} />
              </div>
              <div className="text-left flex-1">
                <div className="font-medium text-foreground">{wallet?.name}</div>
                <div className="text-xs text-muted-foreground">{wallet?.description}</div>
              </div>
              {isConnecting && selectedWallet === wallet?.id ? (
                <Icon name="Loader2" size={16} className="animate-spin" />
              ) : (
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              )}
            </div>
          </Button>
        ))}
      </div>
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Web3 Wallet Connection</p>
            <p className="text-muted-foreground">
              Connect your Web3 wallet to access advanced features like token claiming, 
              staking rewards, and decentralized transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Web3LoginSection;