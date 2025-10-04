import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const UserContextIndicator = ({ 
  user = null, 
  walletConnected = false, 
  onConnectWallet = () => {},
  onDisconnectWallet = () => {},
  realTimeBalance = null 
}) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (realTimeBalance !== null) {
      setLastUpdate(new Date());
    }
  }, [realTimeBalance]);

  const formatBalance = (balance) => {
    if (balance === null || balance === undefined) return '0.00';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    })?.format(balance);
  };

  const getConnectionStatus = () => {
    if (!isOnline) return { status: 'offline', color: 'text-error', icon: 'WifiOff' };
    if (!walletConnected) return { status: 'disconnected', color: 'text-warning', icon: 'Wallet' };
    return { status: 'connected', color: 'text-success', icon: 'CheckCircle' };
  };

  const connectionInfo = getConnectionStatus();

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Balance Display */}
      <div className="hidden sm:flex items-center space-x-2 bg-muted rounded-lg px-3 py-2">
        <Icon name="Coins" size={16} className="text-accent" />
        <div className="text-right">
          <div className="text-sm font-mono font-medium text-foreground">
            {formatBalance(realTimeBalance || user?.balance)} EBNX
          </div>
          <div className="text-xs text-muted-foreground">
            Balance
          </div>
        </div>
      </div>
      {/* Connection Status */}
      <div className="flex items-center space-x-2">
        <div className={`flex items-center space-x-1 ${connectionInfo?.color}`}>
          <Icon 
            name={connectionInfo?.icon} 
            size={16} 
            className={walletConnected ? 'pulse-status' : ''} 
          />
          <span className="hidden md:inline text-xs font-medium capitalize">
            {connectionInfo?.status}
          </span>
        </div>

        {/* Wallet Actions */}
        {isOnline && (
          <div className="flex items-center space-x-1">
            {!walletConnected ? (
              <button
                onClick={onConnectWallet}
                className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90 transition-smooth"
              >
                Connect
              </button>
            ) : (
              <button
                onClick={onDisconnectWallet}
                className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded hover:bg-muted/80 transition-smooth"
              >
                Disconnect
              </button>
            )}
          </div>
        )}
      </div>
      {/* User Role Indicator */}
      {user?.role && (
        <div className="hidden lg:flex items-center space-x-1">
          <Icon 
            name={user?.role === 'admin' ? 'Crown' : 'User'} 
            size={14} 
            className={user?.role === 'admin' ? 'text-warning' : 'text-muted-foreground'} 
          />
          <span className="text-xs text-muted-foreground capitalize">
            {user?.role}
          </span>
        </div>
      )}
      {/* Last Update Indicator */}
      {realTimeBalance !== null && (
        <div className="hidden xl:flex items-center space-x-1 text-xs text-muted-foreground">
          <Icon name="RefreshCw" size={12} />
          <span>
            {lastUpdate?.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit'
            })}
          </span>
        </div>
      )}
      {/* Mobile Balance */}
      <div className="sm:hidden flex items-center space-x-1 bg-muted rounded px-2 py-1">
        <Icon name="Coins" size={14} className="text-accent" />
        <span className="text-xs font-mono font-medium text-foreground">
          {formatBalance(realTimeBalance || user?.balance)}
        </span>
      </div>
    </div>
  );
};

export default UserContextIndicator;