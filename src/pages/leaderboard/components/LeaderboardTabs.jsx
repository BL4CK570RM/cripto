import React from 'react';
import Icon from '../../../components/AppIcon';

const LeaderboardTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'overall',
      label: 'Overall',
      icon: 'Trophy',
      description: 'Top token holders'
    },
    {
      id: 'referrals',
      label: 'Referrals',
      icon: 'Users',
      description: 'Best referrers'
    },
    {
      id: 'recent',
      label: 'Recent',
      icon: 'TrendingUp',
      description: 'Recent activity'
    },
    {
      id: 'monthly',
      label: 'Monthly',
      icon: 'Calendar',
      description: 'This month'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-1 shadow-elevation-1">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex flex-col items-center space-y-2 p-4 rounded-md transition-smooth ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground shadow-elevation-2'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon 
              name={tab?.icon} 
              size={20} 
              className={activeTab === tab?.id ? 'text-primary-foreground' : 'text-muted-foreground'} 
            />
            <div className="text-center">
              <div className="text-sm font-medium">{tab?.label}</div>
              <div className="text-xs opacity-80 hidden sm:block">{tab?.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardTabs;