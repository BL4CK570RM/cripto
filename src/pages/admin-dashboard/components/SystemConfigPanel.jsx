import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SystemConfigPanel = ({ config, onConfigUpdate }) => {
  const [activeSection, setActiveSection] = useState('rewards');
  const [editingConfig, setEditingConfig] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  const sections = [
    { id: 'rewards', label: 'Reward System', icon: 'Gift' },
    { id: 'referrals', label: 'Referral Program', icon: 'Users' },
    { id: 'kyc', label: 'KYC Settings', icon: 'Shield' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'features', label: 'Feature Flags', icon: 'Flag' },
    { id: 'maintenance', label: 'Maintenance', icon: 'Settings' }
  ];

  const handleConfigChange = (section, key, value) => {
    const newConfig = {
      ...editingConfig,
      [section]: {
        ...editingConfig?.[section],
        [key]: value
      }
    };
    setEditingConfig(newConfig);
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    onConfigUpdate(editingConfig);
    setHasChanges(false);
  };

  const handleResetChanges = () => {
    setEditingConfig({});
    setHasChanges(false);
  };

  const getCurrentValue = (section, key) => {
    return editingConfig?.[section]?.[key] ?? config?.[section]?.[key] ?? '';
  };

  const renderRewardsSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Base Reward Rate (per second)"
          type="number"
          value={getCurrentValue('rewards', 'baseRate')}
          onChange={(e) => handleConfigChange('rewards', 'baseRate', parseFloat(e?.target?.value))}
          description="EBNX tokens earned per second"
        />
        
        <Input
          label="Claim Cooldown (hours)"
          type="number"
          value={getCurrentValue('rewards', 'claimCooldown')}
          onChange={(e) => handleConfigChange('rewards', 'claimCooldown', parseInt(e?.target?.value))}
          description="Hours between reward claims"
        />
        
        <Input
          label="Maximum Daily Rewards"
          type="number"
          value={getCurrentValue('rewards', 'maxDaily')}
          onChange={(e) => handleConfigChange('rewards', 'maxDaily', parseFloat(e?.target?.value))}
          description="Maximum EBNX per user per day"
        />
        
        <Input
          label="Reward Pool Balance"
          type="number"
          value={getCurrentValue('rewards', 'poolBalance')}
          onChange={(e) => handleConfigChange('rewards', 'poolBalance', parseFloat(e?.target?.value))}
          description="Total EBNX in reward pool"
        />
      </div>

      <div className="bg-muted/30 rounded-lg p-4">
        <h5 className="text-sm font-medium text-foreground mb-3">Bonus Multipliers</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="KYC Verified Bonus"
            type="number"
            step="0.1"
            value={getCurrentValue('rewards', 'kycBonus')}
            onChange={(e) => handleConfigChange('rewards', 'kycBonus', parseFloat(e?.target?.value))}
            description="Multiplier for verified users"
          />
          
          <Input
            label="Referral Bonus"
            type="number"
            step="0.1"
            value={getCurrentValue('rewards', 'referralBonus')}
            onChange={(e) => handleConfigChange('rewards', 'referralBonus', parseFloat(e?.target?.value))}
            description="Multiplier for active referrers"
          />
          
          <Input
            label="Loyalty Bonus"
            type="number"
            step="0.1"
            value={getCurrentValue('rewards', 'loyaltyBonus')}
            onChange={(e) => handleConfigChange('rewards', 'loyaltyBonus', parseFloat(e?.target?.value))}
            description="Multiplier for long-term users"
          />
        </div>
      </div>
    </div>
  );

  const renderReferralsSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Level 1 Commission (%)"
          type="number"
          step="0.1"
          value={getCurrentValue('referrals', 'level1Commission')}
          onChange={(e) => handleConfigChange('referrals', 'level1Commission', parseFloat(e?.target?.value))}
          description="Direct referral commission"
        />
        
        <Input
          label="Level 2 Commission (%)"
          type="number"
          step="0.1"
          value={getCurrentValue('referrals', 'level2Commission')}
          onChange={(e) => handleConfigChange('referrals', 'level2Commission', parseFloat(e?.target?.value))}
          description="Second level referral commission"
        />
        
        <Input
          label="Level 3 Commission (%)"
          type="number"
          step="0.1"
          value={getCurrentValue('referrals', 'level3Commission')}
          onChange={(e) => handleConfigChange('referrals', 'level3Commission', parseFloat(e?.target?.value))}
          description="Third level referral commission"
        />
        
        <Input
          label="Signup Bonus"
          type="number"
          value={getCurrentValue('referrals', 'signupBonus')}
          onChange={(e) => handleConfigChange('referrals', 'signupBonus', parseFloat(e?.target?.value))}
          description="EBNX bonus for new signups"
        />
      </div>

      <div className="bg-muted/30 rounded-lg p-4">
        <h5 className="text-sm font-medium text-foreground mb-3">Referral Limits</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Maximum Referrals per User"
            type="number"
            value={getCurrentValue('referrals', 'maxReferrals')}
            onChange={(e) => handleConfigChange('referrals', 'maxReferrals', parseInt(e?.target?.value))}
            description="0 for unlimited"
          />
          
          <Input
            label="Daily Commission Cap"
            type="number"
            value={getCurrentValue('referrals', 'dailyCap')}
            onChange={(e) => handleConfigChange('referrals', 'dailyCap', parseFloat(e?.target?.value))}
            description="Maximum EBNX per day from referrals"
          />
        </div>
      </div>
    </div>
  );

  const renderFeatureFlagsSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {config?.features && Object.entries(config?.features)?.map(([feature, enabled]) => (
          <div key={feature} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <h5 className="text-sm font-medium text-foreground capitalize">
                {feature?.replace(/([A-Z])/g, ' $1')?.trim()}
              </h5>
              <p className="text-xs text-muted-foreground">
                {feature === 'kycRequired' && 'Require KYC verification for withdrawals'}
                {feature === 'referralProgram' && 'Enable multi-level referral system'}
                {feature === 'rewardClaiming' && 'Allow users to claim rewards'}
                {feature === 'walletConnections' && 'Enable Web3 wallet connections'}
                {feature === 'maintenanceMode' && 'Put platform in maintenance mode'}
                {feature === 'newRegistrations' && 'Allow new user registrations'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={getCurrentValue('features', feature)}
                onChange={(e) => handleConfigChange('features', feature, e?.target?.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMaintenanceSection = () => (
    <div className="space-y-6">
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-foreground mb-1">Maintenance Mode</h5>
            <p className="text-sm text-muted-foreground">
              When enabled, the platform will display a maintenance message to users and restrict access to core features.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Input
          label="Maintenance Message"
          type="text"
          value={getCurrentValue('maintenance', 'message')}
          onChange={(e) => handleConfigChange('maintenance', 'message', e?.target?.value)}
          description="Message displayed to users during maintenance"
        />
        
        <Input
          label="Estimated Duration"
          type="text"
          value={getCurrentValue('maintenance', 'duration')}
          onChange={(e) => handleConfigChange('maintenance', 'duration', e?.target?.value)}
          description="Expected maintenance duration (e.g., '2 hours')"
        />
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'rewards':
        return renderRewardsSection();
      case 'referrals':
        return renderReferralsSection();
      case 'features':
        return renderFeatureFlagsSection();
      case 'maintenance':
        return renderMaintenanceSection();
      default:
        return (
          <div className="text-center py-12">
            <Icon name="Settings" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">Configuration Section</h4>
            <p className="text-muted-foreground">
              Select a section from the sidebar to configure system settings.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-foreground">System Configuration</h3>
          <div className="flex items-center space-x-3">
            {hasChanges && (
              <>
                <Button variant="outline" onClick={handleResetChanges}>
                  Reset Changes
                </Button>
                <Button onClick={handleSaveChanges} iconName="Save" iconPosition="left">
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-border p-4">
          <nav className="space-y-2">
            {sections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => setActiveSection(section?.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  activeSection === section?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={section?.icon} size={16} />
                <span>{section?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default SystemConfigPanel;