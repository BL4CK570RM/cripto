import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavigation from '../../components/ui/MainNavigation';
import UserContextIndicator from '../../components/ui/UserContextIndicator';
import BalanceCard from './components/BalanceCard';
import ReferralStatsCard from './components/ReferralStatsCard';
import TransactionHistoryCard from './components/TransactionHistoryCard';
import KYCStatusCard from './components/KYCStatusCard';
import QuickActionsCard from './components/QuickActionsCard';
import NotificationPrompt from './components/NotificationPrompt';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [realTimeBalance, setRealTimeBalance] = useState(null);
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(true);

  // Mock user data
  useEffect(() => {
    const mockUser = {
      id: 'user_001',
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      role: 'user',
      balance: 1247.856234,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      joinDate: new Date('2024-01-15'),
      kycStatus: 'pending',
      referralCode: 'ALEX2024'
    };
    setUser(mockUser);
    setRealTimeBalance(mockUser?.balance);
  }, []);

  // Mock data for components
  const mockReferralStats = {
    totalReferrals: 23,
    activeReferrals: 18,
    totalEarnings: 1456.75,
    monthlyEarnings: 342.50,
    referralCode: 'ALEX2024',
    levels: [
      { count: 15, earnings: 890.25 },
      { count: 6, earnings: 425.50 },
      { count: 2, earnings: 141.00 }
    ]
  };

  const mockKYCStatus = {
    status: 'pending',
    level: 1,
    documentsSubmitted: true,
    withdrawalLimit: 1000,
    completedSteps: 2,
    totalSteps: 4
  };

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
    }
  ];

  // Calculate next claim time (12 hours from last claim)
  const getNextClaimTime = () => {
    const lastClaim = new Date(Date.now() - 8 * 60 * 60 * 1000); // 8 hours ago
    return new Date(lastClaim.getTime() + 12 * 60 * 60 * 1000); // 12 hours later
  };

  // Handlers
  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const handleConnectWallet = () => {
    setWalletConnected(true);
  };

  const handleDisconnectWallet = () => {
    setWalletConnected(false);
  };

  const handleClaimRewards = () => {
    // Mock reward claiming
    const rewardAmount = 125.50;
    setRealTimeBalance(prev => prev + rewardAmount);
    
    // Show success notification if available
    if (Notification.permission === 'granted') {
      new Notification('Rewards Claimed!', {
        body: `You've successfully claimed ${rewardAmount} EBNX tokens.`,
        icon: '/favicon.ico'
      });
    }
  };

  const handleShareReferral = () => {
    const referralLink = `https://ebonex.io/register?ref=${mockReferralStats?.referralCode}`;
    if (navigator.share) {
      navigator.share({
        title: 'Join Ebonex Token Platform',
        text: 'Join me on Ebonex and start earning cryptocurrency rewards!',
        url: referralLink
      });
    } else {
      navigator.clipboard?.writeText(referralLink);
    }
  };

  const handleViewReferralDetails = () => {
    navigate('/referral-management');
  };

  const handleViewAllTransactions = () => {
    // Navigate to transaction history page
    console.log('Navigate to transaction history');
  };

  const handleStartKYC = () => {
    // Navigate to KYC verification
    console.log('Start KYC process');
  };

  const handleViewKYCDetails = () => {
    // Navigate to KYC details
    console.log('View KYC details');
  };

  const handleUploadAvatar = () => {
    // Open avatar upload modal
    console.log('Upload avatar');
  };

  const handleLinkAccount = () => {
    // Open account linking modal
    console.log('Link account');
  };

  const handleOpenSettings = () => {
    // Navigate to settings
    console.log('Open settings');
  };

  const handleWithdraw = () => {
    // Navigate to withdrawal page
    console.log('Navigate to withdrawal');
  };

  const handleViewProfile = () => {
    // Navigate to profile page
    console.log('View profile');
  };

  const handleEnableNotifications = () => {
    setShowNotificationPrompt(false);
  };

  const handleDismissNotifications = () => {
    setShowNotificationPrompt(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation user={user} onLogout={handleLogout} />
      <main className="pt-16">
        {/* Header Section */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-muted-foreground mt-1">
                  Monitor your tokens, claim rewards, and track your referral performance.
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <UserContextIndicator
                  user={user}
                  walletConnected={walletConnected}
                  onConnectWallet={handleConnectWallet}
                  onDisconnectWallet={handleDisconnectWallet}
                  realTimeBalance={realTimeBalance}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Balance Card */}
              <BalanceCard
                balance={realTimeBalance}
                rewardRate={0.0001}
                nextClaimTime={getNextClaimTime()}
                onClaimRewards={handleClaimRewards}
              />

              {/* Referral Stats */}
              <ReferralStatsCard
                referralStats={mockReferralStats}
                onShareReferral={handleShareReferral}
                onViewDetails={handleViewReferralDetails}
              />

              {/* Transaction History */}
              <TransactionHistoryCard
                transactions={mockTransactions}
                onViewAll={handleViewAllTransactions}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* KYC Status */}
              <KYCStatusCard
                kycStatus={mockKYCStatus}
                onStartKYC={handleStartKYC}
                onViewDetails={handleViewKYCDetails}
              />

              {/* Quick Actions */}
              <QuickActionsCard
                onUploadAvatar={handleUploadAvatar}
                onLinkAccount={handleLinkAccount}
                onOpenSettings={handleOpenSettings}
                onWithdraw={handleWithdraw}
                onViewProfile={handleViewProfile}
                onEnableNotifications={handleEnableNotifications}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Notification Prompt */}
      {showNotificationPrompt && (
        <NotificationPrompt
          onEnable={handleEnableNotifications}
          onDismiss={handleDismissNotifications}
          autoShow={true}
        />
      )}
    </div>
  );
};

export default Dashboard;