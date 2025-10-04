import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TransactionHistoryCard = ({ 
  transactions = [],
  onViewAll = () => {}
}) => {
  const [filter, setFilter] = useState('all');

  const mockTransactions = [
    {
      id: 'tx_001',
      type: 'reward_claim',
      amount: 125.50,
      status: 'completed',
      timestamp: new Date(Date.now() - 3600000),
      description: 'Daily reward claim'
    },
    {
      id: 'tx_002',
      type: 'referral_bonus',
      amount: 50.25,
      status: 'completed',
      timestamp: new Date(Date.now() - 7200000),
      description: 'Level 1 referral bonus'
    },
    {
      id: 'tx_003',
      type: 'withdrawal',
      amount: -200.00,
      status: 'pending',
      timestamp: new Date(Date.now() - 10800000),
      description: 'Withdrawal to wallet'
    },
    {
      id: 'tx_004',
      type: 'signup_bonus',
      amount: 100.00,
      status: 'completed',
      timestamp: new Date(Date.now() - 86400000),
      description: 'Welcome bonus'
    },
    {
      id: 'tx_005',
      type: 'referral_bonus',
      amount: 25.75,
      status: 'completed',
      timestamp: new Date(Date.now() - 172800000),
      description: 'Level 2 referral bonus'
    }
  ];

  const displayTransactions = transactions?.length > 0 ? transactions : mockTransactions;

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'reward_claim':
        return { icon: 'Gift', color: 'text-success' };
      case 'referral_bonus':
        return { icon: 'Users', color: 'text-secondary' };
      case 'withdrawal':
        return { icon: 'ArrowUpRight', color: 'text-warning' };
      case 'signup_bonus':
        return { icon: 'Star', color: 'text-accent' };
      default:
        return { icon: 'Activity', color: 'text-muted-foreground' };
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'failed':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatAmount = (amount) => {
    const sign = amount >= 0 ? '+' : '';
    return `${sign}${new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(amount)}`;
  };

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(timestamp);
  };

  const filteredTransactions = displayTransactions?.filter(tx => {
    if (filter === 'all') return true;
    return tx?.type === filter;
  });

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Transactions</h2>
        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Activity" size={24} className="text-accent" />
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {[
          { key: 'all', label: 'All' },
          { key: 'reward_claim', label: 'Rewards' },
          { key: 'referral_bonus', label: 'Referrals' },
          { key: 'withdrawal', label: 'Withdrawals' }
        ]?.map((tab) => (
          <button
            key={tab?.key}
            onClick={() => setFilter(tab?.key)}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-smooth ${
              filter === tab?.key
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab?.label}
          </button>
        ))}
      </div>
      {/* Transaction List */}
      <div className="space-y-3 mb-4">
        {filteredTransactions?.slice(0, 5)?.map((transaction) => {
          const iconInfo = getTransactionIcon(transaction?.type);
          return (
            <div key={transaction?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-background flex items-center justify-center ${iconInfo?.color}`}>
                  <Icon name={iconInfo?.icon} size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{transaction?.description}</div>
                  <div className="text-xs text-muted-foreground">{formatTime(transaction?.timestamp)}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  transaction?.amount >= 0 ? 'text-success' : 'text-warning'
                }`}>
                  {formatAmount(transaction?.amount)} EBNX
                </div>
                <div className={`text-xs px-2 py-1 rounded-full border ${getStatusBadge(transaction?.status)}`}>
                  {transaction?.status}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* View All Button */}
      <button
        onClick={onViewAll}
        className="w-full py-2 px-4 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-smooth border border-border"
      >
        View All Transactions
      </button>
    </div>
  );
};

export default TransactionHistoryCard;