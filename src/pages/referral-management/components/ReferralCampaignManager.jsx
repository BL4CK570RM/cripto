import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ReferralCampaignManager = ({ campaigns = [] }) => {
  const [activeTab, setActiveTab] = useState('active');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    bonusAmount: '',
    startDate: '',
    endDate: '',
    targetAudience: 'all'
  });

  const mockCampaigns = [
    {
      id: 'camp-001',
      name: 'October Boost Campaign',
      description: 'Special bonus for referrals made in October 2024',
      status: 'active',
      bonusAmount: 25.00,
      baseCommission: 10,
      totalBonus: 35,
      startDate: '2024-10-01',
      endDate: '2024-10-31',
      referralsCount: 12,
      totalEarnings: 420.00,
      conversionRate: 78.5,
      targetAudience: 'all',
      createdDate: '2024-09-25'
    },
    {
      id: 'camp-002',
      name: 'New User Welcome',
      description: 'Extra rewards for first-time referrers',
      status: 'active',
      bonusAmount: 15.00,
      baseCommission: 10,
      totalBonus: 25,
      startDate: '2024-09-15',
      endDate: '2024-12-31',
      referralsCount: 8,
      totalEarnings: 200.00,
      conversionRate: 85.0,
      targetAudience: 'new_users',
      createdDate: '2024-09-10'
    },
    {
      id: 'camp-003',
      name: 'Summer Referral Blast',
      description: 'High-reward summer campaign',
      status: 'completed',
      bonusAmount: 30.00,
      baseCommission: 10,
      totalBonus: 40,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      referralsCount: 25,
      totalEarnings: 1000.00,
      conversionRate: 92.0,
      targetAudience: 'all',
      createdDate: '2024-05-20'
    },
    {
      id: 'camp-004',
      name: 'Holiday Special 2024',
      description: 'Upcoming holiday season campaign',
      status: 'scheduled',
      bonusAmount: 50.00,
      baseCommission: 10,
      totalBonus: 60,
      startDate: '2024-11-15',
      endDate: '2024-12-31',
      referralsCount: 0,
      totalEarnings: 0,
      conversionRate: 0,
      targetAudience: 'premium',
      createdDate: '2024-10-01'
    }
  ];

  const filteredCampaigns = mockCampaigns?.filter(campaign => {
    switch (activeTab) {
      case 'active':
        return campaign?.status === 'active';
      case 'scheduled':
        return campaign?.status === 'scheduled';
      case 'completed':
        return campaign?.status === 'completed';
      default:
        return true;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'scheduled':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'completed':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getAudienceLabel = (audience) => {
    switch (audience) {
      case 'all':
        return 'All Users';
      case 'new_users':
        return 'New Users';
      case 'premium':
        return 'Premium Users';
      default:
        return 'All Users';
    }
  };

  const handleCreateCampaign = (e) => {
    e?.preventDefault();
    // Mock campaign creation
    console.log('Creating campaign:', newCampaign);
    setShowCreateForm(false);
    setNewCampaign({
      name: '',
      description: '',
      bonusAmount: '',
      startDate: '',
      endDate: '',
      targetAudience: 'all'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-card rounded-lg border shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Campaign Manager</h3>
            <p className="text-sm text-muted-foreground">
              Create and manage referral campaigns with special bonuses
            </p>
          </div>

          <Button
            onClick={() => setShowCreateForm(true)}
            iconName="Plus"
            iconSize={16}
          >
            Create Campaign
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 mt-6 bg-muted rounded-lg p-1">
          {[
            { key: 'active', label: 'Active', count: mockCampaigns?.filter(c => c?.status === 'active')?.length },
            { key: 'scheduled', label: 'Scheduled', count: mockCampaigns?.filter(c => c?.status === 'scheduled')?.length },
            { key: 'completed', label: 'Completed', count: mockCampaigns?.filter(c => c?.status === 'completed')?.length }
          ]?.map((tab) => (
            <button
              key={tab?.key}
              onClick={() => setActiveTab(tab?.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                activeTab === tab?.key
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background'
              }`}
            >
              <span>{tab?.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                activeTab === tab?.key
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tab?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Create Campaign Form */}
      {showCreateForm && (
        <div className="p-6 border-b border-border bg-muted/30">
          <form onSubmit={handleCreateCampaign} className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-foreground">Create New Campaign</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowCreateForm(false)}
                iconName="X"
                iconSize={16}
              >
                Cancel
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Campaign Name"
                type="text"
                value={newCampaign?.name}
                onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e?.target?.value }))}
                placeholder="Enter campaign name"
                required
              />

              <Input
                label="Bonus Amount (USD)"
                type="number"
                value={newCampaign?.bonusAmount}
                onChange={(e) => setNewCampaign(prev => ({ ...prev, bonusAmount: e?.target?.value }))}
                placeholder="25.00"
                min="0"
                step="0.01"
                required
              />

              <Input
                label="Start Date"
                type="date"
                value={newCampaign?.startDate}
                onChange={(e) => setNewCampaign(prev => ({ ...prev, startDate: e?.target?.value }))}
                required
              />

              <Input
                label="End Date"
                type="date"
                value={newCampaign?.endDate}
                onChange={(e) => setNewCampaign(prev => ({ ...prev, endDate: e?.target?.value }))}
                required
              />
            </div>

            <Input
              label="Description"
              type="text"
              value={newCampaign?.description}
              onChange={(e) => setNewCampaign(prev => ({ ...prev, description: e?.target?.value }))}
              placeholder="Describe your campaign"
              required
            />

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create Campaign
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Campaigns List */}
      <div className="p-6">
        {filteredCampaigns?.length > 0 ? (
          <div className="space-y-4">
            {filteredCampaigns?.map((campaign) => (
              <div key={campaign?.id} className="border border-border rounded-lg p-6 hover:bg-muted/30 transition-smooth">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-foreground">
                        {campaign?.name}
                      </h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(campaign?.status)}`}>
                        {campaign?.status}
                      </span>
                      {campaign?.status === 'active' && calculateDaysRemaining(campaign?.endDate) <= 7 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning border border-warning/20">
                          <Icon name="Clock" size={12} className="mr-1" />
                          {calculateDaysRemaining(campaign?.endDate)} days left
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {campaign?.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {formatDate(campaign?.startDate)} - {formatDate(campaign?.endDate)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {getAudienceLabel(campaign?.targetAudience)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {formatCurrency(campaign?.bonusAmount)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Bonus Amount
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {campaign?.referralsCount}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Referrals
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {formatCurrency(campaign?.totalEarnings)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Total Earned
                      </div>
                    </div>

                    {campaign?.status !== 'scheduled' && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">
                          {campaign?.conversionRate?.toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Conversion
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {campaign?.status === 'active' && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Campaign Progress
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {campaign?.conversionRate?.toFixed(1)}% conversion rate
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(campaign?.conversionRate, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="Megaphone" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">
              No {activeTab} campaigns
            </h4>
            <p className="text-muted-foreground mb-6">
              {activeTab === 'active' ?'Create your first campaign to boost referral rewards'
                : `No ${activeTab} campaigns found`
              }
            </p>
            {activeTab === 'active' && (
              <Button
                onClick={() => setShowCreateForm(true)}
                iconName="Plus"
                iconSize={16}
              >
                Create Campaign
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralCampaignManager;