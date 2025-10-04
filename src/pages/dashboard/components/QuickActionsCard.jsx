import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const QuickActionsCard = ({ 
  onUploadAvatar = () => {},
  onLinkAccount = () => {},
  onOpenSettings = () => {},
  onWithdraw = () => {},
  onViewProfile = () => {},
  onEnableNotifications = () => {}
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleNotificationToggle = async () => {
    if (!notificationsEnabled) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setNotificationsEnabled(true);
          onEnableNotifications();
        }
      } catch (error) {
        console.error('Failed to enable notifications:', error);
      }
    } else {
      setNotificationsEnabled(false);
    }
  };

  const quickActions = [
    {
      id: 'upload-avatar',
      title: 'Upload Avatar',
      description: 'Personalize your profile',
      icon: 'User',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      onClick: onUploadAvatar
    },
    {
      id: 'link-account',
      title: 'Link Wallet',
      description: 'Connect external wallet',
      icon: 'Wallet',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      onClick: onLinkAccount
    },
    {
      id: 'withdraw',
      title: 'Withdraw Tokens',
      description: 'Transfer to wallet',
      icon: 'ArrowUpRight',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      onClick: onWithdraw
    },
    {
      id: 'settings',
      title: 'Account Settings',
      description: 'Manage preferences',
      icon: 'Settings',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      onClick: onOpenSettings
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={24} className="text-primary" />
        </div>
      </div>
      <div className="space-y-4">
        {/* Main Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.onClick}
              className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth text-left"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action?.bgColor}`}>
                <Icon name={action?.icon} size={20} className={action?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">{action?.title}</div>
                <div className="text-xs text-muted-foreground truncate">{action?.description}</div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Notification Settings */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Bell" size={16} className="text-accent" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Push Notifications</div>
                <div className="text-xs text-muted-foreground">Get reward reminders</div>
              </div>
            </div>
            <button
              onClick={handleNotificationToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationsEnabled ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {notificationsEnabled && (
            <div className="text-xs text-success bg-success/10 rounded px-2 py-1">
              Notifications enabled for reward claims and updates
            </div>
          )}
        </div>

        {/* Profile Completion */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Profile Completion</div>
                <div className="text-xs text-muted-foreground">75% complete</div>
              </div>
            </div>
            <button
              onClick={onViewProfile}
              className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-full hover:bg-primary/90 transition-smooth"
            >
              Complete
            </button>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full w-3/4 transition-all duration-300"></div>
          </div>
        </div>

        {/* Security Status */}
        <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg border border-success/10">
          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={16} className="text-success" />
            <div>
              <div className="text-sm font-medium text-foreground">Account Security</div>
              <div className="text-xs text-success">All security features enabled</div>
            </div>
          </div>
          <Icon name="CheckCircle" size={16} className="text-success" />
        </div>

        {/* Help & Support */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="HelpCircle" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Need help?</span>
            </div>
            <button className="text-xs text-primary hover:text-primary/80 transition-smooth">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsCard;