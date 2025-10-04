import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Web3Registration = ({ onRegistrationSuccess = () => {} }) => {
  const navigate = useNavigate();
  const [walletState, setWalletState] = useState({
    isConnecting: false,
    isConnected: false,
    address: null,
    provider: null,
    error: null
  });

  const [supportedWallets] = useState([
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: 'Wallet',
      description: 'Connect using MetaMask browser extension',
      installed: typeof window !== 'undefined' && window.ethereum?.isMetaMask
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: 'Smartphone',
      description: 'Connect using WalletConnect protocol',
      installed: true // WalletConnect is always available
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: 'CreditCard',
      description: 'Connect using Coinbase Wallet',
      installed: typeof window !== 'undefined' && window.ethereum?.isCoinbaseWallet
    }
  ]);

  useEffect(() => {
    // Check if wallet is already connected
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum?.request({ method: 'eth_accounts' })?.then(accounts => {
          if (accounts?.length > 0) {
            setWalletState(prev => ({
              ...prev,
              isConnected: true,
              address: accounts?.[0]
            }));
          }
        })?.catch(console.error);
    }
  }, []);

  const connectWallet = async (walletId) => {
    setWalletState(prev => ({ 
      ...prev, 
      isConnecting: true, 
      error: null,
      provider: walletId 
    }));

    try {
      let accounts = [];

      if (walletId === 'metamask') {
        if (!window.ethereum?.isMetaMask) {
          throw new Error('MetaMask is not installed');
        }
        accounts = await window.ethereum?.request({ 
          method: 'eth_requestAccounts' 
        });
      } else if (walletId === 'walletconnect') {
        // Simulate WalletConnect connection
        await new Promise(resolve => setTimeout(resolve, 2000));
        accounts = ['0x742d35Cc6634C0532925a3b8D0C9C0E3C8d4c8dB']; // Mock address
      } else if (walletId === 'coinbase') {
        if (!window.ethereum?.isCoinbaseWallet) {
          throw new Error('Coinbase Wallet is not installed');
        }
        accounts = await window.ethereum?.request({ 
          method: 'eth_requestAccounts' 
        });
      }

      if (accounts?.length === 0) {
        throw new Error('No accounts found');
      }

      const address = accounts?.[0];
      
      // Simulate SIWE (Sign-In with Ethereum) process
      await new Promise(resolve => setTimeout(resolve, 1500));

      setWalletState(prev => ({
        ...prev,
        isConnected: true,
        address: address,
        isConnecting: false
      }));

      // Create user account with Web3 registration
      const userData = {
        id: Date.now(),
        email: `${address?.slice(0, 6)}...${address?.slice(-4)}@web3.local`,
        name: `Web3 User ${address?.slice(-4)}`,
        walletAddress: address,
        balance: 50, // Higher bonus for Web3 registration
        provider: walletId,
        createdAt: new Date()?.toISOString(),
        emailVerified: true, // Web3 accounts are considered verified
        role: 'user'
      };

      onRegistrationSuccess(userData);
      navigate('/dashboard', { 
        state: { 
          message: 'Web3 wallet connected successfully!',
          bonus: 50 
        }
      });

    } catch (error) {
      console.error('Wallet connection failed:', error);
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
        error: error?.message || 'Failed to connect wallet'
      }));
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      isConnecting: false,
      isConnected: false,
      address: null,
      provider: null,
      error: null
    });
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  if (walletState?.isConnected) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Wallet Connected</h3>
          <p className="text-muted-foreground">
            Your wallet is connected and ready for registration
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Wallet" size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{walletState?.provider}</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {formatAddress(walletState?.address)}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={disconnectWallet}
            >
              Disconnect
            </Button>
          </div>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Coins" size={20} className="text-primary" />
            <div>
              <p className="font-medium text-primary">Web3 Registration Bonus</p>
              <p className="text-sm text-primary/80">
                You'll receive 50 EBNX tokens for connecting your wallet
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => connectWallet(walletState?.provider)}
          className="w-full"
        >
          Complete Registration
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">Or connect your wallet</span>
        </div>
      </div>
      <div className="space-y-3">
        {supportedWallets?.map((wallet) => (
          <div key={wallet?.id} className="space-y-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => connectWallet(wallet?.id)}
              loading={walletState?.isConnecting && walletState?.provider === wallet?.id}
              disabled={walletState?.isConnecting || !wallet?.installed}
              className="w-full justify-start"
            >
              <div className="flex items-center space-x-3">
                <Icon name={wallet?.icon} size={20} />
                <div className="text-left">
                  <div className="font-medium">{wallet?.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {wallet?.description}
                  </div>
                </div>
              </div>
            </Button>
            
            {!wallet?.installed && wallet?.id !== 'walletconnect' && (
              <p className="text-xs text-warning px-4">
                {wallet?.name} is not installed. Please install the extension first.
              </p>
            )}
          </div>
        ))}
      </div>
      {walletState?.error && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error" />
            <div>
              <p className="font-medium text-error">Connection Failed</p>
              <p className="text-sm text-error/80">{walletState?.error}</p>
            </div>
          </div>
        </div>
      )}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Secure Web3 Registration</p>
            <p className="text-muted-foreground">
              Connect your wallet to register securely using blockchain technology. 
              Get 50 EBNX bonus tokens for Web3 registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Web3Registration;