import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const EarningsSummaryCards = ({ user = null, timeFilter = '30d' }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(timeFilter);
  const [isAnimating, setIsAnimating] = useState(false);

  const mockEarningsData = {
    '7d': {
      totalEarnings: 45.75,
      pendingRewards: 12.30,
      thisWeek: 45.75,
      lastWeek: 38.20,
      level1Earnings: 28.50,
      level2Earnings: 12.25,
      level3Earnings: 5.00,
      totalReferrals: 8,
      activeReferrals: 6,
      conversionRate: 75.0
    },
    '30d': {
      totalEarnings: 361.85,
      pendingRewards: 28.90,
      thisMonth: 361.85,
      lastMonth: 298.45,
      level1Earnings: 215.25,
      level2Earnings: 89.75,
      level3Earnings: 56.85,
      totalReferrals: 15,
      activeReferrals: 12,
      conversionRate: 80.0
    },
    '90d': {
      totalEarnings: 1247.60,
      pendingRewards: 67.40,
      thisQuarter: 1247.60,
      lastQuarter: 892.30,
      level1Earnings: 748.56,
      level2Earnings: 311.90,
      level3Earnings: 187.14,
      totalReferrals: 28,
      activeReferrals: 22,
      conversionRate: 78.6
    },
    '1y': {
      totalEarnings: 4892.35,
      pendingRewards: 156.80,
      thisYear: 4892.35,
      lastYear: 2145.90,
      level1Earnings: 2935.41,
      level2Earnings: 1223.09,
      level3Earnings: 733.85,
      totalReferrals: 45,
      activeReferrals: 38,
      conversionRate: 84.4
    }
  };

  const currentData = mockEarningsData?.[selectedPeriod];
  const previousPeriodKey = selectedPeriod === '7d' ? 'lastWeek' : 
                           selectedPeriod === '30d' ? 'lastMonth' : 
                           selectedPeriod === '90d' ? 'lastQuarter' : 'lastYear';
  
  const currentPeriodKey = selectedPeriod === '7d' ? 'thisWeek' : 
                          selectedPeriod === '30d' ? 'thisMonth' : 
                          selectedPeriod === '90d' ? 'thisQuarter' : 'thisYear';

  const calculateGrowth = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100);
  };

  const growth = calculateGrowth(currentData?.[currentPeriodKey], currentData?.[previousPeriodKey]);

  const handlePeriodChange = (period) => {
    if (period !== selectedPeriod) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedPeriod(period);
        setIsAnimating(false);
      }, 150);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatPercentage = (value) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value?.toFixed(1)}%`;
  };

  const getPeriodLabel = (period) => {
    switch (period) {
      case '7d': return 'Last 7 Days';
      case '30d': return 'Last 30 Days';
      case '90d': return 'Last 90 Days';
      case '1y': return 'Last Year';
      default: return 'Last 30 Days';
    }
  };

  const summaryCards = [
    {
      title: 'Total Earnings',
      value: formatCurrency(currentData?.totalEarnings),
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      growth: growth,
      description: `From ${currentData?.totalReferrals} referrals`
    },
    {
      title: 'Pending Rewards',
      value: formatCurrency(currentData?.pendingRewards),
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      growth: null,
      description: 'Awaiting settlement'
    },
    {
      title: 'Active Referrals',
      value: currentData?.activeReferrals?.toString(),
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      growth: null,
      description: `${currentData?.conversionRate}% conversion rate`
    },
    {
      title: 'Level 1 Earnings',
      value: formatCurrency(currentData?.level1Earnings),
      icon: 'Target',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
      growth: null,
      description: '10% commission rate'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Earnings Summary</h3>
          <p className="text-sm text-muted-foreground">
            Track your referral income and performance metrics
          </p>
        </div>
        
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {['7d', '30d', '90d', '1y']?.map((period) => (
            <button
              key={period}
              onClick={() => handlePeriodChange(period)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-smooth ${
                selectedPeriod === period
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background'
              }`}
            >
              {getPeriodLabel(period)?.split(' ')?.[1]}
            </button>
          ))}
        </div>
      </div>
      {/* Summary Cards Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-150 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
        {summaryCards?.map((card, index) => (
          <div
            key={card?.title}
            className={`bg-card rounded-lg border p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-smooth ${card?.borderColor}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card?.bgColor}`}>
                <Icon name={card?.icon} size={20} className={card?.color} />
              </div>
              {card?.growth !== null && (
                <div className={`flex items-center space-x-1 text-xs font-medium ${
                  card?.growth >= 0 ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={card?.growth >= 0 ? "TrendingUp" : "TrendingDown"} 
                    size={14} 
                  />
                  <span>{formatPercentage(card?.growth)}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                {card?.title}
              </h4>
              <div className="text-2xl font-bold text-foreground">
                {card?.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {card?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Level Breakdown */}
        <div className="bg-card rounded-lg border p-6 shadow-elevation-1">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={20} className="text-accent" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground">Level Breakdown</h4>
              <p className="text-sm text-muted-foreground">
                Earnings by referral level
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">1</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Level 1</div>
                  <div className="text-xs text-muted-foreground">10% commission</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-foreground">
                  {formatCurrency(currentData?.level1Earnings)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {((currentData?.level1Earnings / currentData?.totalEarnings) * 100)?.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg border border-secondary/10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-secondary-foreground">2</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Level 2</div>
                  <div className="text-xs text-muted-foreground">5% commission</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-foreground">
                  {formatCurrency(currentData?.level2Earnings)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {((currentData?.level2Earnings / currentData?.totalEarnings) * 100)?.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg border border-accent/10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-accent-foreground">3</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Level 3</div>
                  <div className="text-xs text-muted-foreground">2.5% commission</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-foreground">
                  {formatCurrency(currentData?.level3Earnings)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {((currentData?.level3Earnings / currentData?.totalEarnings) * 100)?.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-card rounded-lg border p-6 shadow-elevation-1">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground">Performance Metrics</h4>
              <p className="text-sm text-muted-foreground">
                Key performance indicators
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Conversion Rate</span>
                <span className="text-sm font-bold text-foreground">
                  {currentData?.conversionRate?.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all duration-500"
                  style={{ width: `${currentData?.conversionRate}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">
                  {currentData?.totalReferrals}
                </div>
                <div className="text-xs text-muted-foreground">
                  Total Referrals
                </div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">
                  {currentData?.activeReferrals}
                </div>
                <div className="text-xs text-muted-foreground">
                  Active Users
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Average per referral:</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(currentData?.totalEarnings / currentData?.totalReferrals)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsSummaryCards;