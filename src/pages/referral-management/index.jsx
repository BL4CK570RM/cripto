import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MainNavigation from '../../components/ui/MainNavigation';
import UserContextIndicator from '../../components/ui/UserContextIndicator';
import ReferralTreeVisualization from './components/ReferralTreeVisualization';
import ReferralLinkPanel from './components/ReferralLinkPanel';
import ReferralStatisticsTable from './components/ReferralStatisticsTable';
import EarningsSummaryCards from './components/EarningsSummaryCards';
import ReferralCampaignManager from './components/ReferralCampaignManager';

const ReferralManagement = () => {
  const [user, setUser] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [realTimeBalance, setRealTimeBalance] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [notifications, setNotifications] = useState([]);

  // Mock user data
  useEffect(() => {
    const mockUser = {
      id: 'user-123',
      name: 'John Anderson',
      email: 'john.anderson@email.com',
      role: 'user',
      balance: 1247.85,
      referralCode: 'EBNX2024JOHN',
      joinDate: '2024-08-15',
      totalReferrals: 15,
      activeReferrals: 12,
      totalEarnings: 361.85,
      pendingRewards: 28.90
    };

    setUser(mockUser);
    setRealTimeBalance(mockUser?.balance);
    setWalletConnected(true);

    // Mock real-time notifications
    const mockNotifications = [
      {
        id: 'notif-1',
        type: 'new_referral',
        message: 'Sarah Johnson joined using your referral link',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        read: false
      },
      {
        id: 'notif-2',
        type: 'earnings',
        message: 'You earned $12.50 from Level 2 referrals',
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        read: false
      }
    ];

    setNotifications(mockNotifications);

    // Simulate real-time balance updates
    const balanceInterval = setInterval(() => {
      setRealTimeBalance(prev => prev + (Math.random() * 0.1));
    }, 30000);

    return () => clearInterval(balanceInterval);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setWalletConnected(false);
    setRealTimeBalance(null);
    // Redirect to login would happen here
  };

  const handleConnectWallet = () => {
    setWalletConnected(true);
  };

  const handleDisconnectWallet = () => {
    setWalletConnected(false);
  };

  const sectionTabs = [
    {
      key: 'overview',
      label: 'Overview',
      icon: 'LayoutDashboard',
      description: 'Summary and quick actions'
    },
    {
      key: 'network',
      label: 'Network',
      icon: 'GitBranch',
      description: 'Referral tree visualization'
    },
    {
      key: 'statistics',
      label: 'Statistics',
      icon: 'BarChart3',
      description: 'Detailed performance data'
    },
    {
      key: 'campaigns',
      label: 'Campaigns',
      icon: 'Megaphone',
      description: 'Manage promotional campaigns'
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <EarningsSummaryCards user={user} />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <ReferralTreeVisualization currentUser={user} />
              </div>
              <div>
                <ReferralLinkPanel user={user} />
              </div>
            </div>
          </div>
        );
      case 'network':
        return <ReferralTreeVisualization currentUser={user} />;
      case 'statistics':
        return <ReferralStatisticsTable />;
      case 'campaigns':
        return <ReferralCampaignManager />;
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="text-primary mx-auto mb-4 animate-spin" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we load your referral data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation 
        user={user} 
        onLogout={handleLogout}
      />
      <div className="pt-16">
        {/* Header Section */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Referral Management</h1>
                  <p className="text-muted-foreground">
                    Track your network, share links, and maximize earnings
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <UserContextIndicator
                  user={user}
                  walletConnected={walletConnected}
                  onConnectWallet={handleConnectWallet}
                  onDisconnectWallet={handleDisconnectWallet}
                  realTimeBalance={realTimeBalance}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Users" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Total Referrals</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{user?.totalReferrals}</div>
              </div>

              <div className="bg-success/5 rounded-lg p-4 border border-success/10">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="UserCheck" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">Active Users</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{user?.activeReferrals}</div>
              </div>

              <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="DollarSign" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-accent">Total Earned</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  ${user?.totalEarnings?.toFixed(2)}
                </div>
              </div>

              <div className="bg-warning/5 rounded-lg p-4 border border-warning/10">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Clock" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-warning">Pending</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  ${user?.pendingRewards?.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Notifications */}
            {notifications?.filter(n => !n?.read)?.length > 0 && (
              <div className="mt-6 bg-primary/5 border border-primary/10 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Bell" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Recent Activity</span>
                </div>
                <div className="space-y-2">
                  {notifications?.filter(n => !n?.read)?.slice(0, 2)?.map(notification => (
                    <div key={notification?.id} className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-foreground">{notification?.message}</span>
                      <span className="text-muted-foreground text-xs ml-auto">
                        {notification?.timestamp?.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 overflow-x-auto">
              {sectionTabs?.map((tab) => (
                <button
                  key={tab?.key}
                  onClick={() => setActiveSection(tab?.key)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-smooth whitespace-nowrap ${
                    activeSection === tab?.key
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderActiveSection()}
        </main>

        {/* Quick Actions Floating Button (Mobile) */}
        <div className="fixed bottom-6 right-6 md:hidden">
          <div className="relative">
            <Button
              size="lg"
              className="rounded-full shadow-elevation-3"
              iconName="Share"
              iconSize={20}
              onClick={() => {
                // Quick share action
                if (navigator.share) {
                  navigator.share({
                    title: 'Join Ebonex Token Platform',
                    text: 'Start earning cryptocurrency rewards with me!',
                    url: `https://ebonex.io/register?ref=${user?.referralCode}`
                  });
                }
              }}
            >
              Share
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                >
                  ← Back to Dashboard
                </Link>
                <span className="text-muted-foreground">|</span>
                <Link 
                  to="/leaderboard" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                >
                  View Leaderboard
                </Link>
              </div>
              
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} Ebonex Token Platform. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ReferralManagement;