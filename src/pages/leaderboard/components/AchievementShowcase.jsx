import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementShowcase = ({ achievements, onShare }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (achievements?.length > 1) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % achievements?.length);
          setIsAnimating(false);
        }, 300);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [achievements?.length]);

  if (!achievements || achievements?.length === 0) {
    return null;
  }

  const currentAchievement = achievements?.[currentIndex];

  const getAchievementIcon = (type) => {
    switch (type) {
      case 'milestone':
        return { icon: 'Trophy', color: 'text-yellow-500', bg: 'bg-yellow-50' };
      case 'referral':
        return { icon: 'Users', color: 'text-blue-500', bg: 'bg-blue-50' };
      case 'streak':
        return { icon: 'Flame', color: 'text-orange-500', bg: 'bg-orange-50' };
      case 'special':
        return { icon: 'Star', color: 'text-purple-500', bg: 'bg-purple-50' };
      default:
        return { icon: 'Award', color: 'text-accent', bg: 'bg-accent/10' };
    }
  };

  const achievementInfo = getAchievementIcon(currentAchievement?.type);

  const handleShare = () => {
    if (onShare) {
      onShare(currentAchievement);
    } else {
      // Default share functionality
      if (navigator.share) {
        navigator.share({
          title: `Achievement Unlocked: ${currentAchievement?.title}`,
          text: currentAchievement?.description,
          url: window.location?.href
        });
      } else {
        // Fallback to clipboard
        navigator.clipboard?.writeText(
          `🏆 Achievement Unlocked: ${currentAchievement?.title}\n${currentAchievement?.description}\n\nCheck out the Ebonex leaderboard: ${window.location?.href}`
        );
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg border border-border p-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 w-16 h-16 bg-accent rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-primary rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-secondary rounded-full"></div>
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full ${achievementInfo?.bg} flex items-center justify-center`}>
              <Icon name={achievementInfo?.icon} size={24} className={achievementInfo?.color} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Featured Achievement</h3>
              <p className="text-sm text-muted-foreground">
                {achievements?.length > 1 ? `${currentIndex + 1} of ${achievements?.length}` : 'Latest milestone'}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            iconName="Share"
            iconPosition="left"
          >
            Share
          </Button>
        </div>

        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'}`}>
          <div className="mb-4">
            <h4 className="text-xl font-bold text-foreground mb-2">
              {currentAchievement?.title}
            </h4>
            <p className="text-muted-foreground">
              {currentAchievement?.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Achieved by:</span>
                <span className="font-medium text-foreground ml-1">
                  {currentAchievement?.achievedBy}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium text-foreground ml-1">
                  {new Date(currentAchievement.date)?.toLocaleDateString()}
                </span>
              </div>
            </div>

            {currentAchievement?.reward && (
              <div className="flex items-center space-x-2 bg-accent/10 text-accent px-3 py-1 rounded-full">
                <Icon name="Gift" size={16} />
                <span className="text-sm font-medium">
                  +{currentAchievement?.reward} EBNX
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Dots */}
        {achievements?.length > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-6">
            {achievements?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-smooth ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementShowcase;