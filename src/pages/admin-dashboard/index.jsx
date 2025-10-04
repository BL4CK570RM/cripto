import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavigation from '../../components/ui/MainNavigation';
import AdminSecurityGate from '../../components/ui/AdminSecurityGate';
import UserContextIndicator from '../../components/ui/UserContextIndicator';
import SystemMetricsCard from './components/SystemMetricsCard';
import UserManagementTable from './components/UserManagementTable';
import TransactionMonitor from './components/TransactionMonitor';
import SecurityOverview from './components/SecurityOverview';
import SystemConfigPanel from './components/SystemConfigPanel';
import AuditLogViewer from './components/AuditLogViewer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeData, setRealTimeData] = useState({});
  const [walletConnected, setWalletConnected] = useState(false);

  // Mock admin user data
  const adminUser = {
    id: 'admin_001',
    name: 'Admin User',
    email: 'admin@ebonex.com',
    role: 'admin',
    balance: 50000,
    avatar: null
  };

  // Mock system metrics data
  const systemMetrics = [
    {
      title: 'Active Users',
      value: '12,847',
      change: '+5.2%',
      changeType: 'increase',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Transaction Volume',
      value: '2.4M EBNX',
      change: '+12.8%',
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'success'
    },
    {
      title: 'Reward Pool',
      value: '850K EBNX',
      change: '-2.1%',
      changeType: 'decrease',
      icon: 'Gift',
      color: 'warning'
    },
    {
      title: 'Platform Health',
      value: '99.9%',
      change: '+0.1%',
      changeType: 'increase',
      icon: 'Activity',
      color: 'success'
    },
    {
      title: 'Pending KYC',
      value: '234',
      change: '+18',
      changeType: 'increase',
      icon: 'Shield',
      color: 'secondary'
    },
    {
      title: 'Support Tickets',
      value: '42',
      change: '-8',
      changeType: 'decrease',
      icon: 'MessageCircle',
      color: 'primary'
    }
  ];

  // Mock users data
  const usersData = [
    {
      id: 'user_001',
      name: 'John Smith',
      email: 'john.smith@email.com',
      balance: 15420,
      status: 'active',
      riskLevel: 'low',
      joinDate: '2024-09-15T10:30:00Z'
    },
    {
      id: 'user_002',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      balance: 8750,
      status: 'active',
      riskLevel: 'low',
      joinDate: '2024-09-20T14:15:00Z'
    },
    {
      id: 'user_003',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      balance: 25600,
      status: 'suspended',
      riskLevel: 'medium',
      joinDate: '2024-08-10T09:45:00Z'
    },
    {
      id: 'user_004',
      name: 'Emma Wilson',
      email: 'emma.w@email.com',
      balance: 3200,
      status: 'pending',
      riskLevel: 'low',
      joinDate: '2024-10-01T16:20:00Z'
    },
    {
      id: 'user_005',
      name: 'David Rodriguez',
      email: 'd.rodriguez@email.com',
      balance: 45800,
      status: 'banned',
      riskLevel: 'high',
      joinDate: '2024-07-25T11:10:00Z'
    }
  ];

  // Mock transactions data
  const transactionsData = [
    {
      id: 'tx_001',
      type: 'withdrawal',
      user: 'John Smith',
      amount: 5000,
      status: 'pending',
      priority: 'high',
      timestamp: '2024-10-04T05:30:00Z',
      gasPrice: 25
    },
    {
      id: 'tx_002',
      type: 'reward',
      user: 'Sarah Johnson',
      amount: 150,
      status: 'processing',
      priority: 'medium',
      timestamp: '2024-10-04T05:25:00Z',
      gasPrice: 20
    },
    {
      id: 'tx_003',
      type: 'referral',
      user: 'Mike Chen',
      amount: 75,
      status: 'completed',
      priority: 'low',
      timestamp: '2024-10-04T05:15:00Z',
      gasPrice: 18
    },
    {
      id: 'tx_004',
      type: 'settlement',
      user: 'System',
      amount: 25000,
      status: 'failed',
      priority: 'high',
      timestamp: '2024-10-04T05:00:00Z',
      gasPrice: 30
    }
  ];

  // Mock security data
  const securityData = {
    activeMonitors: 12,
    blockedIPs: 45,
    flaggedUsers: 8,
    lastScan: '2024-10-04T05:40:00Z',
    alerts: [
      {
        id: 'alert_001',
        title: 'Suspicious Login Activity',
        description: 'Multiple failed login attempts detected from IP 192.168.1.100',
        severity: 'high',
        status: 'active',
        timestamp: '2024-10-04T05:35:00Z',
        source: 'Authentication System',
        affectedUsers: 1,
        detectionMethod: 'Rate Limiting',
        riskScore: 85,
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        actions: ['IP temporarily blocked', 'User account locked', 'Admin notification sent']
      },
      {
        id: 'alert_002',
        title: 'Unusual Transaction Pattern',
        description: 'Large withdrawal request outside normal user behavior',
        severity: 'medium',
        status: 'investigating',
        timestamp: '2024-10-04T05:20:00Z',
        source: 'Transaction Monitor',
        affectedUsers: 1,
        detectionMethod: 'ML Anomaly Detection',
        riskScore: 65,
        actions: ['Transaction flagged for review', 'User contacted for verification']
      }
    ]
  };

  // Mock system configuration
  const systemConfig = {
    rewards: {
      baseRate: 0.001,
      claimCooldown: 12,
      maxDaily: 100,
      poolBalance: 850000,
      kycBonus: 1.5,
      referralBonus: 1.2,
      loyaltyBonus: 1.1
    },
    referrals: {
      level1Commission: 10,
      level2Commission: 5,
      level3Commission: 2,
      signupBonus: 50,
      maxReferrals: 0,
      dailyCap: 500
    },
    features: {
      kycRequired: true,
      referralProgram: true,
      rewardClaiming: true,
      walletConnections: true,
      maintenanceMode: false,
      newRegistrations: true
    },
    maintenance: {
      message: 'System maintenance in progress. Please check back later.',
      duration: '2 hours'
    }
  };

  // Mock audit logs
  const auditLogs = [
    {
      id: 'log_001',
      action: 'User Account Suspended',
      type: 'admin_action',
      severity: 'warning',
      user: 'Admin User',
      details: 'Suspended user account mike.chen@email.com due to suspicious activity',
      timestamp: '2024-10-04T05:40:00Z',
      ipAddress: '10.0.0.1',
      sessionId: 'sess_abc123def456'
    },
    {
      id: 'log_002',
      action: 'Configuration Updated',
      type: 'config_change',
      severity: 'info',
      user: 'Admin User',
      details: 'Updated reward pool balance from 800K to 850K EBNX',
      timestamp: '2024-10-04T05:35:00Z',
      ipAddress: '10.0.0.1',
      sessionId: 'sess_abc123def456'
    },
    {
      id: 'log_003',
      action: 'Security Alert Generated',
      type: 'security_event',
      severity: 'critical',
      user: 'System',
      details: 'Multiple failed login attempts detected from IP 192.168.1.100',
      timestamp: '2024-10-04T05:30:00Z',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'log_004',
      action: 'Batch Transaction Processed',
      type: 'system_event',
      severity: 'info',
      user: 'System',
      details: 'Processed batch of 150 reward transactions totaling 12,500 EBNX',
      timestamp: '2024-10-04T05:25:00Z'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'transactions', label: 'Transactions', icon: 'CreditCard' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'config', label: 'Configuration', icon: 'Settings' },
    { id: 'audit', label: 'Audit Logs', icon: 'FileText' }
  ];

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        lastUpdate: new Date()?.toISOString()
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleConnectWallet = () => {
    setWalletConnected(true);
  };

  const handleDisconnectWallet = () => {
    setWalletConnected(false);
  };

  const handleUserAction = (action, userIds) => {
    console.log(`User action: ${action}`, userIds);
    // Handle user management actions
  };

  const handleTransactionAction = (action, transactionId) => {
    console.log(`Transaction action: ${action}`, transactionId);
    // Handle transaction actions
  };

  const handleSecurityAction = (action, alertId) => {
    console.log(`Security action: ${action}`, alertId);
    // Handle security actions
  };

  const handleConfigUpdate = (newConfig) => {
    console.log('Config updated:', newConfig);
    // Handle configuration updates
  };

  const handleExportLogs = () => {
    console.log('Exporting audit logs...');
    // Handle log export
  };

  const handleAccessGranted = () => {
    console.log('Admin access granted');
  };

  const handleAccessDenied = () => {
    console.log('Admin access denied');
    navigate('/dashboard');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* System Metrics */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">System Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {systemMetrics?.map((metric, index) => (
                  <SystemMetricsCard key={index} {...metric} />
                ))}
              </div>
            </div>
            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2"
                  iconName="UserPlus"
                  onClick={() => setActiveTab('users')}
                >
                  <span>Manage Users</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2"
                  iconName="CreditCard"
                  onClick={() => setActiveTab('transactions')}
                >
                  <span>View Transactions</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2"
                  iconName="Shield"
                  onClick={() => setActiveTab('security')}
                >
                  <span>Security Center</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2"
                  iconName="Settings"
                  onClick={() => setActiveTab('config')}
                >
                  <span>System Config</span>
                </Button>
              </div>
            </div>
            {/* Recent Activity */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">Recent Activity</h2>
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="space-y-4">
                  {auditLogs?.slice(0, 5)?.map((log) => (
                    <div key={log?.id} className="flex items-center space-x-4 p-3 bg-muted/20 rounded-lg">
                      <Icon name="Activity" size={16} className="text-muted-foreground" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">{log?.action}</div>
                        <div className="text-xs text-muted-foreground">
                          {log?.user} • {new Date(log.timestamp)?.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">User Management</h2>
            <UserManagementTable users={usersData} onUserAction={handleUserAction} />
          </div>
        );

      case 'transactions':
        return (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Transaction Monitor</h2>
            <TransactionMonitor transactions={transactionsData} onTransactionAction={handleTransactionAction} />
          </div>
        );

      case 'security':
        return (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Security Overview</h2>
            <SecurityOverview securityData={securityData} onSecurityAction={handleSecurityAction} />
          </div>
        );

      case 'config':
        return (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">System Configuration</h2>
            <SystemConfigPanel config={systemConfig} onConfigUpdate={handleConfigUpdate} />
          </div>
        );

      case 'audit':
        return (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Audit Logs</h2>
            <AuditLogViewer auditLogs={auditLogs} onExportLogs={handleExportLogs} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AdminSecurityGate
      user={adminUser}
      onAccessGranted={handleAccessGranted}
      onAccessDenied={handleAccessDenied}
      requiresAdditionalAuth={true}
    >
      <div className="min-h-screen bg-background">
        <MainNavigation user={adminUser} onLogout={handleLogout} />
        
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Comprehensive platform management and system oversight
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <UserContextIndicator
                  user={adminUser}
                  walletConnected={walletConnected}
                  onConnectWallet={handleConnectWallet}
                  onDisconnectWallet={handleDisconnectWallet}
                  realTimeBalance={realTimeData?.balance}
                />
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-border mb-8">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="pb-8">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/3 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-secondary/3 rounded-full blur-3xl"></div>
        </div>
      </div>
    </AdminSecurityGate>
  );
};

export default AdminDashboard;