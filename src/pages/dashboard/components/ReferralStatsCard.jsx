import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ReferralStatsCard = ({ 
  referralStats = {
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarnings: 0,
    monthlyEarnings: 0,
    referralCode: 'EBNX123456',
    levels: []
  },
  onShareReferral = () => {},
  onViewDetails = () => {}
}) => {
  const chartData = [
    { name: 'Jan', earnings: 120.50 },
    { name: 'Feb', earnings: 245.30 },
    { name: 'Mar', earnings: 189.75 },
    { name: 'Apr', earnings: 356.20 },
    { name: 'May', earnings: 298.45 },
    { name: 'Jun', earnings: 412.80 }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(amount);
  };

  const copyReferralLink = async () => {
    const referralLink = `https://ebonex.io/register?ref=${referralStats?.referralCode}`;
    try {
      await navigator.clipboard?.writeText(referralLink);
      // Show success notification
    } catch (err) {
      console.error('Failed to copy referral link:', err);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Referral Performance</h2>
        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="Users" size={24} className="text-secondary" />
        </div>
      </div>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{referralStats?.totalReferrals}</div>
            <div className="text-xs text-muted-foreground">Total Referrals</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success">{referralStats?.activeReferrals}</div>
            <div className="text-xs text-muted-foreground">Active Users</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent">{formatCurrency(referralStats?.totalEarnings)}</div>
            <div className="text-xs text-muted-foreground">Total Earnings</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{formatCurrency(referralStats?.monthlyEarnings)}</div>
            <div className="text-xs text-muted-foreground">This Month</div>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="text-sm font-medium text-foreground mb-4">Monthly Earnings</h3>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="earnings" 
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Referral Link Sharing */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Your Referral Code</span>
            <Icon name="Gift" size={16} className="text-accent" />
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex-1 bg-background border border-border rounded-lg px-3 py-2">
              <span className="font-mono text-sm text-foreground">{referralStats?.referralCode}</span>
            </div>
            <button
              onClick={copyReferralLink}
              className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth"
            >
              <Icon name="Copy" size={16} />
            </button>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={onShareReferral}
              className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded-lg text-sm font-medium hover:bg-secondary/90 transition-smooth"
            >
              Share Link
            </button>
            <button
              onClick={onViewDetails}
              className="flex-1 bg-muted text-foreground py-2 px-4 rounded-lg text-sm font-medium hover:bg-muted/80 transition-smooth border border-border"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Level Breakdown */}
        {referralStats?.levels && referralStats?.levels?.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-foreground">Level Breakdown</h3>
            {referralStats?.levels?.map((level, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">{index + 1}</span>
                  </div>
                  <span className="text-sm text-foreground">Level {index + 1}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{level?.count} users</div>
                  <div className="text-xs text-muted-foreground">{formatCurrency(level?.earnings)} earned</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralStatsCard;