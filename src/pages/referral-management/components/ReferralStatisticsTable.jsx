import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ReferralStatisticsTable = ({ referrals = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'joinDate', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const mockReferrals = [
    {
      id: 'ref-001',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      joinDate: '2024-09-15T10:30:00Z',
      status: 'active',
      level: 1,
      totalEarnings: 125.50,
      lastActivity: '2024-10-03T14:22:00Z',
      referralCount: 3,
      conversionRate: 85.7
    },
    {
      id: 'ref-002',
      name: 'Mike Chen',
      email: 'mike.c@email.com',
      joinDate: '2024-09-20T16:45:00Z',
      status: 'active',
      level: 2,
      totalEarnings: 45.25,
      lastActivity: '2024-10-04T09:15:00Z',
      referralCount: 2,
      conversionRate: 66.7
    },
    {
      id: 'ref-003',
      name: 'Emma Wilson',
      email: 'emma.w@email.com',
      joinDate: '2024-09-25T08:20:00Z',
      status: 'inactive',
      level: 3,
      totalEarnings: 0,
      lastActivity: '2024-09-28T12:00:00Z',
      referralCount: 0,
      conversionRate: 0
    },
    {
      id: 'ref-004',
      name: 'David Rodriguez',
      email: 'david.r@email.com',
      joinDate: '2024-09-18T11:10:00Z',
      status: 'active',
      level: 2,
      totalEarnings: 78.90,
      lastActivity: '2024-10-04T11:30:00Z',
      referralCount: 1,
      conversionRate: 100
    },
    {
      id: 'ref-005',
      name: 'Lisa Park',
      email: 'lisa.p@email.com',
      joinDate: '2024-09-28T13:55:00Z',
      status: 'active',
      level: 3,
      totalEarnings: 22.15,
      lastActivity: '2024-10-03T16:45:00Z',
      referralCount: 0,
      conversionRate: 0
    },
    {
      id: 'ref-006',
      name: 'Alex Thompson',
      email: 'alex.t@email.com',
      joinDate: '2024-09-12T09:30:00Z',
      status: 'active',
      level: 1,
      totalEarnings: 89.75,
      lastActivity: '2024-10-04T08:20:00Z',
      referralCount: 1,
      conversionRate: 50
    },
    {
      id: 'ref-007',
      name: 'Maria Garcia',
      email: 'maria.g@email.com',
      joinDate: '2024-09-22T14:15:00Z',
      status: 'active',
      level: 2,
      totalEarnings: 34.60,
      lastActivity: '2024-10-02T10:30:00Z',
      referralCount: 3,
      conversionRate: 75
    },
    {
      id: 'ref-008',
      name: 'James Wilson',
      email: 'james.w@email.com',
      joinDate: '2024-09-30T17:20:00Z',
      status: 'pending',
      level: 1,
      totalEarnings: 0,
      lastActivity: '2024-09-30T17:20:00Z',
      referralCount: 0,
      conversionRate: 0
    }
  ];

  const filteredAndSortedReferrals = useMemo(() => {
    let filtered = mockReferrals?.filter(referral =>
      referral?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      referral?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'joinDate' || sortConfig?.key === 'lastActivity') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, sortConfig]);

  const paginatedReferrals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedReferrals?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedReferrals, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedReferrals?.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'inactive':
        return 'bg-muted text-muted-foreground border-border';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
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

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Join Date', 'Status', 'Level', 'Total Earnings', 'Referrals', 'Conversion Rate'];
    const csvData = filteredAndSortedReferrals?.map(referral => [
      referral?.name,
      referral?.email,
      formatDate(referral?.joinDate),
      referral?.status,
      referral?.level,
      referral?.totalEarnings,
      referral?.referralCount,
      `${referral?.conversionRate}%`
    ]);

    const csvContent = [headers, ...csvData]?.map(row => row?.map(field => `"${field}"`)?.join(','))?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link?.setAttribute('href', url);
    link?.setAttribute('download', `referral-statistics-${new Date()?.toISOString()?.split('T')?.[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  return (
    <div className="bg-card rounded-lg border shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Referral Statistics</h3>
            <p className="text-sm text-muted-foreground">
              Detailed performance data for all your referrals
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search referrals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="pl-10 w-64"
              />
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
            </div>
            
            <Button
              variant="outline"
              onClick={exportToCSV}
              iconName="Download"
              iconSize={16}
            >
              Export CSV
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Referral</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('joinDate')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Join Date</span>
                  {getSortIcon('joinDate')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th className="text-left p-4 font-medium text-foreground">Level</th>
              <th className="text-right p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('totalEarnings')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth ml-auto"
                >
                  <span>Earnings</span>
                  {getSortIcon('totalEarnings')}
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('referralCount')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth ml-auto"
                >
                  <span>Referrals</span>
                  {getSortIcon('referralCount')}
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('lastActivity')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth ml-auto"
                >
                  <span>Last Activity</span>
                  {getSortIcon('lastActivity')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedReferrals?.map((referral, index) => (
              <tr key={referral?.id} className={`border-b border-border hover:bg-muted/30 transition-smooth ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}`}>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="User" size={16} className="text-secondary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-foreground truncate">
                        {referral?.name}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {referral?.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">
                    {formatDate(referral?.joinDate)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatTime(referral?.joinDate)}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(referral?.status)}`}>
                    {referral?.status}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(referral?.level)}`}>
                    Level {referral?.level}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="font-medium text-foreground">
                    ${referral?.totalEarnings?.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    EBNX
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-medium text-foreground">
                    {referral?.referralCount}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {referral?.conversionRate}% rate
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="text-sm text-foreground">
                    {formatDate(referral?.lastActivity)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatTime(referral?.lastActivity)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {paginatedReferrals?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No Results Found</h4>
          <p className="text-muted-foreground">
            {searchTerm ? `No referrals match "${searchTerm}"` : 'No referral data available'}
          </p>
        </div>
      )}
      {totalPages > 1 && (
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedReferrals?.length)} of {filteredAndSortedReferrals?.length} results
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
                iconSize={16}
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded text-sm font-medium transition-smooth ${
                        currentPage === pageNum
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconSize={16}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralStatisticsTable;