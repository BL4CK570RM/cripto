import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const BalanceCard = ({ 
  balance = 0, 
  rewardRate = 0.0001, 
  nextClaimTime = null,
  onClaimRewards = () => {} 
}) => {
  const [currentBalance, setCurrentBalance] = useState(balance);
  const [timeUntilClaim, setTimeUntilClaim] = useState('');
  const [canClaim, setCanClaim] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBalance(prev => prev + rewardRate);
    }, 1000);

    return () => clearInterval(interval);
  }, [rewardRate]);

  useEffect(() => {
    if (!nextClaimTime) {
      setCanClaim(true);
      return;
    }

    const updateTimer = () => {
      const now = new Date()?.getTime();
      const claimTime = new Date(nextClaimTime)?.getTime();
      const difference = claimTime - now;

      if (difference <= 0) {
        setCanClaim(true);
        setTimeUntilClaim('');
      } else {
        setCanClaim(false);
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeUntilClaim(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [nextClaimTime]);

  const formatBalance = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6
    })?.format(amount);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Token Balance</h2>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Coins" size={24} className="text-primary" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground font-mono mb-2">
            {formatBalance(currentBalance)} EBNX
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span>+{formatBalance(rewardRate)}/sec</span>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Reward Claiming</span>
            {canClaim ? (
              <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded-full">
                Available
              </span>
            ) : (
              <span className="text-xs bg-warning text-warning-foreground px-2 py-1 rounded-full">
                Cooldown
              </span>
            )}
          </div>

          {!canClaim && timeUntilClaim && (
            <div className="text-center mb-4">
              <div className="text-lg font-mono text-foreground">{timeUntilClaim}</div>
              <div className="text-xs text-muted-foreground">until next claim</div>
            </div>
          )}

          <button
            onClick={onClaimRewards}
            disabled={!canClaim}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-smooth ${
              canClaim
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted-foreground/20 text-muted-foreground cursor-not-allowed'
            }`}
          >
            {canClaim ? 'Claim Rewards' : 'Claim Unavailable'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-lg font-semibold text-foreground">24h</div>
            <div className="text-xs text-muted-foreground">Rewards Earned</div>
            <div className="text-sm font-mono text-accent">
              +{formatBalance(rewardRate * 86400)} EBNX
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-lg font-semibold text-foreground">7d</div>
            <div className="text-xs text-muted-foreground">Projected</div>
            <div className="text-sm font-mono text-accent">
              +{formatBalance(rewardRate * 604800)} EBNX
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;