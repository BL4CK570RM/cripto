import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const UserPositionCard = ({ currentUser, userRank, nextTierInfo }) => {
  const formatBalance = (balance) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(balance);
  };

  const calculateProgress = () => {
    if (!nextTierInfo) return 100;
    const current = currentUser?.balance;
    const target = nextTierInfo?.requirement;
    const previous = nextTierInfo?.previousRequirement || 0;
    return Math.min(100, ((current - previous) / (target - previous)) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Your Position</h3>
        <div className="flex items-center space-x-2 text-primary">
          <Icon name="User" size={20} />
          <span className="font-medium">Rank #{userRank}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Stats */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
              <Image
                src={currentUser?.avatar}
                alt={currentUser?.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium text-foreground">{currentUser?.username}</div>
              <div className="text-sm text-muted-foreground">{currentUser?.email}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-lg p-3 border border-border">
              <div className="text-sm text-muted-foreground">Balance</div>
              <div className="font-mono font-semibold text-foreground">
                {formatBalance(currentUser?.balance)} EBNX
              </div>
            </div>
            <div className="bg-card rounded-lg p-3 border border-border">
              <div className="text-sm text-muted-foreground">Referrals</div>
              <div className="font-semibold text-foreground">
                {currentUser?.referralCount}
              </div>
            </div>
          </div>
        </div>

        {/* Progress to Next Tier */}
        {nextTierInfo && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Progress to {nextTierInfo?.tier}
              </span>
              <span className="text-sm text-muted-foreground">
                {progress?.toFixed(1)}%
              </span>
            </div>

            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Current: {formatBalance(currentUser?.balance)}
              </span>
              <span className="text-muted-foreground">
                Target: {formatBalance(nextTierInfo?.requirement)}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Need {formatBalance(nextTierInfo?.requirement - currentUser?.balance)} more EBNX
            </div>
          </div>
        )}
      </div>
      {/* Recent Achievements */}
      {currentUser?.recentAchievements && currentUser?.recentAchievements?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Trophy" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Recent Achievements</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentUser?.recentAchievements?.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
              >
                <Icon name="Star" size={12} />
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPositionCard;