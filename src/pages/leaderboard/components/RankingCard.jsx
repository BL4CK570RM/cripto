import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RankingCard = ({ user, rank, showTrend = false }) => {
  const getRankIcon = (position) => {
    switch (position) {
      case 1:
        return { icon: 'Crown', color: 'text-yellow-500', bg: 'bg-yellow-50' };
      case 2:
        return { icon: 'Medal', color: 'text-gray-400', bg: 'bg-gray-50' };
      case 3:
        return { icon: 'Award', color: 'text-amber-600', bg: 'bg-amber-50' };
      default:
        return { icon: 'Hash', color: 'text-muted-foreground', bg: 'bg-muted' };
    }
  };

  const getTierBadge = (balance) => {
    if (balance >= 100000) return { label: 'Diamond', color: 'bg-blue-500' };
    if (balance >= 50000) return { label: 'Platinum', color: 'bg-purple-500' };
    if (balance >= 25000) return { label: 'Gold', color: 'bg-yellow-500' };
    if (balance >= 10000) return { label: 'Silver', color: 'bg-gray-400' };
    return { label: 'Bronze', color: 'bg-amber-600' };
  };

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(balance);
  };

  const rankInfo = getRankIcon(rank);
  const tierInfo = getTierBadge(user?.balance);

  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-center space-x-4">
        {/* Rank */}
        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${rankInfo?.bg}`}>
          {rank <= 3 ? (
            <Icon name={rankInfo?.icon} size={20} className={rankInfo?.color} />
          ) : (
            <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={user?.avatar}
                alt={user?.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-foreground truncate">
                  {user?.username}
                </span>
                <div className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${tierInfo?.color}`}>
                  {tierInfo?.label}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {user?.country && (
                  <span className="flex items-center space-x-1">
                    <span>{user?.country}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="text-right">
          <div className="font-mono font-semibold text-foreground">
            {formatBalance(user?.balance)} EBNX
          </div>
          <div className="text-sm text-muted-foreground">
            {user?.referralCount} referrals
          </div>
          {showTrend && user?.trend && (
            <div className={`flex items-center justify-end space-x-1 text-xs ${
              user?.trend > 0 ? 'text-success' : user?.trend < 0 ? 'text-error' : 'text-muted-foreground'
            }`}>
              <Icon 
                name={user?.trend > 0 ? 'TrendingUp' : user?.trend < 0 ? 'TrendingDown' : 'Minus'} 
                size={12} 
              />
              <span>{Math.abs(user?.trend)}</span>
            </div>
          )}
        </div>
      </div>
      {/* Achievement Badges */}
      {user?.achievements && user?.achievements?.length > 0 && (
        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
          <Icon name="Star" size={14} className="text-accent" />
          <div className="flex flex-wrap gap-1">
            {user?.achievements?.slice(0, 3)?.map((achievement, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full"
              >
                {achievement}
              </span>
            ))}
            {user?.achievements?.length > 3 && (
              <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                +{user?.achievements?.length - 3}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RankingCard;