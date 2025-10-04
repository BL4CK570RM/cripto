import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionMonitor = ({ transactions, onTransactionAction }) => {
  const [activeTab, setActiveTab] = useState('pending');

  const tabs = [
    { id: 'pending', label: 'Pending Settlements', count: transactions?.filter(t => t?.status === 'pending')?.length },
    { id: 'processing', label: 'Processing', count: transactions?.filter(t => t?.status === 'processing')?.length },
    { id: 'completed', label: 'Completed', count: transactions?.filter(t => t?.status === 'completed')?.length },
    { id: 'failed', label: 'Failed', count: transactions?.filter(t => t?.status === 'failed')?.length }
  ];

  const filteredTransactions = transactions?.filter(t => t?.status === activeTab);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-warning bg-warning/10 border-warning/20',
      processing: 'text-secondary bg-secondary/10 border-secondary/20',
      completed: 'text-success bg-success/10 border-success/20',
      failed: 'text-error bg-error/10 border-error/20'
    };
    return colors?.[status] || colors?.pending;
  };

  const getTypeIcon = (type) => {
    const icons = {
      withdrawal: 'ArrowUpRight',
      deposit: 'ArrowDownLeft',
      reward: 'Gift',
      referral: 'Users',
      settlement: 'Repeat'
    };
    return icons?.[type] || 'ArrowRightLeft';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error',
      medium: 'text-warning',
      low: 'text-muted-foreground'
    };
    return colors?.[priority] || colors?.low;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-foreground">Transaction Monitor</h3>
          <div className="flex items-center space-x-3">
            <Button variant="outline" iconName="RefreshCw" iconPosition="left">
              Refresh
            </Button>
            <Button variant="outline" iconName="Settings" iconPosition="left">
              Configure
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              <span>{tab?.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab?.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-foreground/10 text-foreground'
              }`}>
                {tab?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {filteredTransactions?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No {activeTab} transactions</h4>
            <p className="text-muted-foreground">
              All transactions in this category have been processed.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions?.map((transaction) => (
              <div
                key={transaction?.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-smooth"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(transaction?.status)}`}>
                    <Icon name={getTypeIcon(transaction?.type)} size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="text-sm font-medium text-foreground">
                        {transaction?.type?.charAt(0)?.toUpperCase() + transaction?.type?.slice(1)} - {transaction?.user}
                      </h4>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(transaction?.status)}`}>
                        {transaction?.status}
                      </span>
                      {transaction?.priority && (
                        <div className={`flex items-center space-x-1 ${getPriorityColor(transaction?.priority)}`}>
                          <Icon name="Flag" size={12} />
                          <span className="text-xs font-medium">{transaction?.priority}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Amount: {transaction?.amount?.toLocaleString()} EBNX</span>
                      <span>•</span>
                      <span>ID: {transaction?.id}</span>
                      <span>•</span>
                      <span>{new Date(transaction.timestamp)?.toLocaleString()}</span>
                      {transaction?.gasPrice && (
                        <>
                          <span>•</span>
                          <span>Gas: {transaction?.gasPrice} gwei</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {transaction?.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        iconName="Play"
                        onClick={() => onTransactionAction('process', transaction?.id)}
                      >
                        Process
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        iconName="X"
                        onClick={() => onTransactionAction('cancel', transaction?.id)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  
                  {transaction?.status === 'failed' && (
                    <Button
                      size="sm"
                      variant="outline"
                      iconName="RotateCcw"
                      onClick={() => onTransactionAction('retry', transaction?.id)}
                    >
                      Retry
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    iconName="ExternalLink"
                    onClick={() => onTransactionAction('view', transaction?.id)}
                  />
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    iconName="MoreHorizontal"
                    onClick={() => onTransactionAction('menu', transaction?.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {filteredTransactions?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Total value: {filteredTransactions?.reduce((sum, t) => sum + t?.amount, 0)?.toLocaleString()} EBNX
            </div>
            {activeTab === 'pending' && (
              <Button
                variant="outline"
                iconName="Zap"
                iconPosition="left"
                onClick={() => onTransactionAction('batchProcess', filteredTransactions?.map(t => t?.id))}
              >
                Batch Process All
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionMonitor;