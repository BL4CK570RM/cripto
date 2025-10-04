import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LeaderboardTable = ({ users, activeTab, showTrend = false }) => {
  const getRankIcon = (position) => {
    switch (position) {
      case 1:
        return { icon: 'Crown', color: 'text-yellow-500' };
      case 2:
        return { icon: 'Medal', color: 'text-gray-400' };
      case 3:
        return { icon: 'Award', color: 'text-amber-600' };
      default:
        return null;
    }
  };

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(balance);
  };

  const getColumnHeader = () => {
    switch (activeTab) {
      case 'referrals':
        return 'Referrals';
      case 'recent':
        return 'Recent Activity';
      case 'monthly':
        return 'Monthly Tokens';
      default:
        return 'Total Balance';
    }
  };

  const getColumnValue = (user) => {
    switch (activeTab) {
      case 'referrals':
        return `${user?.referralCount} users`;
      case 'recent':
        return `${formatBalance(user?.recentActivity || 0)} EBNX`;
      case 'monthly':
        return `${formatBalance(user?.monthlyTokens || 0)} EBNX`;
      default:
        return `${formatBalance(user?.balance)} EBNX`;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden shadow-elevation-1">
      {/* Table Header */}
      <div className="bg-muted px-6 py-4 border-b border-border">
        <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-muted-foreground">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">User</div>
          <div className="col-span-3">{getColumnHeader()}</div>
          <div className="col-span-2">Tier</div>
          {showTrend && <div className="col-span-2">Trend</div>}
        </div>
      </div>
      {/* Table Body */}
      <div className="divide-y divide-border">
        {users?.map((user, index) => {
          const rank = index + 1;
          const rankIcon = getRankIcon(rank);

          return (
            <div
              key={user?.id}
              className="px-6 py-4 hover:bg-muted/50 transition-smooth"
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Rank */}
                <div className="col-span-1">
                  <div className="flex items-center justify-center w-8 h-8">
                    {rankIcon ? (
                      <Icon name={rankIcon?.icon} size={20} className={rankIcon?.color} />
                    ) : (
                      <span className="font-semibold text-muted-foreground">#{rank}</span>
                    )}
                  </div>
                </div>

                {/* User */}
                <div className="col-span-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={user?.avatar}
                        alt={user?.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-foreground truncate">
                        {user?.username}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {user?.country}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Value */}
                <div className="col-span-3">
                  <div className="font-mono font-semibold text-foreground">
                    {getColumnValue(user)}
                  </div>
                  {activeTab === 'referrals' && user?.referralEarnings && (
                    <div className="text-sm text-muted-foreground">
                      {formatBalance(user?.referralEarnings)} EBNX earned
                    </div>
                  )}
                </div>

                {/* Tier */}
                <div className="col-span-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      user?.tier === 'Diamond' ? 'bg-blue-500' :
                      user?.tier === 'Platinum' ? 'bg-purple-500' :
                      user?.tier === 'Gold' ? 'bg-yellow-500' :
                      user?.tier === 'Silver' ? 'bg-gray-400' : 'bg-amber-600'
                    }`}></div>
                    <span className="text-sm font-medium text-foreground">
                      {user?.tier}
                    </span>
                  </div>
                </div>

                {/* Trend */}
                {showTrend && (
                  <div className="col-span-2">
                    {user?.trend && (
                      <div className={`flex items-center space-x-1 ${
                        user?.trend > 0 ? 'text-success' : 
                        user?.trend < 0 ? 'text-error' : 'text-muted-foreground'
                      }`}>
                        <Icon 
                          name={user?.trend > 0 ? 'TrendingUp' : user?.trend < 0 ? 'TrendingDown' : 'Minus'} 
                          size={16} 
                        />
                        <span className="text-sm font-medium">
                          {user?.trend > 0 ? '+' : ''}{user?.trend}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Achievements Row */}
              {user?.achievements && user?.achievements?.length > 0 && (
                <div className="mt-3 flex items-center space-x-2">
                  <Icon name="Star" size={14} className="text-accent" />
                  <div className="flex flex-wrap gap-1">
                    {user?.achievements?.slice(0, 2)?.map((achievement, achIndex) => (
                      <span
                        key={achIndex}
                        className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full"
                      >
                        {achievement}
                      </span>
                    ))}
                    {user?.achievements?.length > 2 && (
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                        +{user?.achievements?.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderboardTable;