import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ReferralTreeVisualization = ({ referralData = [], currentUser = null }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set(['root']));
  const [viewMode, setViewMode] = useState('tree'); // 'tree' or 'list'

  const mockReferralTree = [
    {
      id: 'user-1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      level: 1,
      joinDate: '2024-09-15',
      status: 'active',
      earnings: 125.50,
      directReferrals: 3,
      totalReferrals: 8,
      children: [
        {
          id: 'user-2',
          name: 'Mike Chen',
          email: 'mike.c@email.com',
          level: 2,
          joinDate: '2024-09-20',
          status: 'active',
          earnings: 45.25,
          directReferrals: 2,
          totalReferrals: 2,
          children: [
            {
              id: 'user-3',
              name: 'Emma Wilson',
              email: 'emma.w@email.com',
              level: 3,
              joinDate: '2024-09-25',
              status: 'inactive',
              earnings: 0,
              directReferrals: 0,
              totalReferrals: 0,
              children: []
            }
          ]
        },
        {
          id: 'user-4',
          name: 'David Rodriguez',
          email: 'david.r@email.com',
          level: 2,
          joinDate: '2024-09-18',
          status: 'active',
          earnings: 78.90,
          directReferrals: 1,
          totalReferrals: 3,
          children: [
            {
              id: 'user-5',
              name: 'Lisa Park',
              email: 'lisa.p@email.com',
              level: 3,
              joinDate: '2024-09-28',
              status: 'active',
              earnings: 22.15,
              directReferrals: 0,
              totalReferrals: 2,
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 'user-6',
      name: 'Alex Thompson',
      email: 'alex.t@email.com',
      level: 1,
      joinDate: '2024-09-12',
      status: 'active',
      earnings: 89.75,
      directReferrals: 1,
      totalReferrals: 4,
      children: [
        {
          id: 'user-7',
          name: 'Maria Garcia',
          email: 'maria.g@email.com',
          level: 2,
          joinDate: '2024-09-22',
          status: 'active',
          earnings: 34.60,
          directReferrals: 3,
          totalReferrals: 3,
          children: []
        }
      ]
    }
  ];

  const levelPercentages = {
    1: 10, // 10% for level 1
    2: 5,  // 5% for level 2
    3: 2.5 // 2.5% for level 3
  };

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded?.has(nodeId)) {
      newExpanded?.delete(nodeId);
    } else {
      newExpanded?.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'inactive':
        return 'text-muted-foreground';
      case 'pending':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 1:
        return 'bg-primary/10 text-primary border-primary/20';
      case 2:
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 3:
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const renderTreeNode = (node, depth = 0) => {
    const isExpanded = expandedNodes?.has(node?.id);
    const hasChildren = node?.children && node?.children?.length > 0;

    return (
      <div key={node?.id} className="relative">
        <div className={`flex items-center space-x-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-smooth ${depth > 0 ? 'ml-8' : ''}`}>
          {hasChildren && (
            <button
              onClick={() => toggleNode(node?.id)}
              className="flex-shrink-0 w-6 h-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-smooth"
            >
              <Icon 
                name={isExpanded ? "ChevronDown" : "ChevronRight"} 
                size={14} 
                className="text-muted-foreground"
              />
            </button>
          )}
          
          {!hasChildren && <div className="w-6" />}

          <div className="flex-shrink-0 w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <Icon name="User" size={20} className="text-secondary-foreground" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="text-sm font-medium text-foreground truncate">
                {node?.name}
              </h4>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getLevelColor(node?.level)}`}>
                L{node?.level}
              </span>
              <span className={`text-xs font-medium ${getStatusColor(node?.status)}`}>
                {node?.status}
              </span>
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {node?.email}
            </p>
          </div>

          <div className="text-right">
            <div className="text-sm font-medium text-foreground">
              ${node?.earnings?.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">
              {levelPercentages?.[node?.level]}% rate
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm font-medium text-foreground">
              {node?.directReferrals}
            </div>
            <div className="text-xs text-muted-foreground">
              direct
            </div>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-2">
            {node?.children?.map(child => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const renderListView = () => {
    const flattenTree = (nodes, result = []) => {
      nodes?.forEach(node => {
        result?.push(node);
        if (node?.children && node?.children?.length > 0) {
          flattenTree(node?.children, result);
        }
      });
      return result;
    };

    const flatReferrals = flattenTree(mockReferralTree);

    return (
      <div className="space-y-3">
        {flatReferrals?.map(referral => (
          <div key={referral?.id} className="flex items-center space-x-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-smooth">
            <div className="flex-shrink-0 w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={20} className="text-secondary-foreground" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-sm font-medium text-foreground">
                  {referral?.name}
                </h4>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getLevelColor(referral?.level)}`}>
                  Level {referral?.level}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {referral?.email} • Joined {new Date(referral.joinDate)?.toLocaleDateString()}
              </p>
            </div>

            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                ${referral?.earnings?.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground">
                {referral?.directReferrals} referrals
              </div>
            </div>

            <div className={`text-xs font-medium ${getStatusColor(referral?.status)}`}>
              {referral?.status}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Referral Network</h3>
            <p className="text-sm text-muted-foreground">
              Track your multi-level referral tree and earnings
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('tree')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-smooth ${
                viewMode === 'tree' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name="GitBranch" size={16} className="mr-1.5" />
              Tree
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-smooth ${
                viewMode === 'list' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name="List" size={16} className="mr-1.5" />
              List
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Level 1 (10%)</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {mockReferralTree?.length}
            </div>
            <div className="text-xs text-muted-foreground">Direct referrals</div>
          </div>

          <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/10">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="UserPlus" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-secondary">Level 2 (5%)</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {mockReferralTree?.reduce((acc, user) => acc + (user?.children?.length || 0), 0)}
            </div>
            <div className="text-xs text-muted-foreground">Second level</div>
          </div>

          <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Network" size={16} className="text-accent" />
              <span className="text-sm font-medium text-accent">Level 3 (2.5%)</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {mockReferralTree?.reduce((acc, user) => 
                acc + (user?.children?.reduce((childAcc, child) => 
                  childAcc + (child?.children?.length || 0), 0) || 0), 0
              )}
            </div>
            <div className="text-xs text-muted-foreground">Third level</div>
          </div>
        </div>
      </div>
      <div className="p-6">
        {viewMode === 'tree' ? (
          <div className="space-y-3">
            {mockReferralTree?.map(node => renderTreeNode(node))}
          </div>
        ) : (
          renderListView()
        )}

        {mockReferralTree?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No Referrals Yet</h4>
            <p className="text-muted-foreground mb-6">
              Start sharing your referral link to build your network and earn rewards
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralTreeVisualization;