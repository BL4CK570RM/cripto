import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserManagementTable = ({ users, onUserAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sortField, setSortField] = useState('joinDate');
  const [sortDirection, setSortDirection] = useState('desc');

  const filteredUsers = users?.filter(user =>
    user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    user?.id?.toString()?.includes(searchTerm)
  );

  const sortedUsers = [...filteredUsers]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    const direction = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'string') {
      return aValue?.localeCompare(bValue) * direction;
    }
    return (aValue - bValue) * direction;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev =>
      prev?.includes(userId)
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers?.length === sortedUsers?.length
        ? []
        : sortedUsers?.map(user => user?.id)
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-success bg-success/10',
      suspended: 'text-warning bg-warning/10',
      banned: 'text-error bg-error/10',
      pending: 'text-secondary bg-secondary/10'
    };
    return colors?.[status] || colors?.pending;
  };

  const getRiskLevel = (level) => {
    const levels = {
      low: { color: 'text-success', icon: 'Shield' },
      medium: { color: 'text-warning', icon: 'AlertTriangle' },
      high: { color: 'text-error', icon: 'AlertCircle' }
    };
    return levels?.[level] || levels?.low;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-foreground">User Management</h3>
          <div className="flex items-center space-x-3">
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-64"
            />
            <Button variant="outline" iconName="Filter" iconPosition="left">
              Filter
            </Button>
            <Button variant="outline" iconName="Download" iconPosition="left">
              Export
            </Button>
          </div>
        </div>

        {selectedUsers?.length > 0 && (
          <div className="mt-4 flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">
              {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
            </span>
            <Button size="sm" variant="outline" onClick={() => onUserAction('suspend', selectedUsers)}>
              Suspend
            </Button>
            <Button size="sm" variant="outline" onClick={() => onUserAction('activate', selectedUsers)}>
              Activate
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onUserAction('ban', selectedUsers)}>
              Ban
            </Button>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4">
                <input
                  type="checkbox"
                  checked={selectedUsers?.length === sortedUsers?.length && sortedUsers?.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>User</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('balance')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Balance</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-muted-foreground">Risk Level</span>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('joinDate')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Join Date</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers?.map((user) => {
              const riskInfo = getRiskLevel(user?.riskLevel);
              return (
                <tr key={user?.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers?.includes(user?.id)}
                      onChange={() => handleSelectUser(user?.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} className="text-secondary-foreground" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{user?.name}</div>
                        <div className="text-xs text-muted-foreground">{user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-mono font-medium text-foreground">
                      {user?.balance?.toLocaleString()} EBNX
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user?.status)}`}>
                      {user?.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className={`flex items-center space-x-1 ${riskInfo?.color}`}>
                      <Icon name={riskInfo?.icon} size={14} />
                      <span className="text-xs font-medium capitalize">{user?.riskLevel}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-muted-foreground">
                      {new Date(user.joinDate)?.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        iconName="Eye"
                        onClick={() => onUserAction('view', [user?.id])}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        iconName="Edit"
                        onClick={() => onUserAction('edit', [user?.id])}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        iconName="MoreHorizontal"
                        onClick={() => onUserAction('menu', [user?.id])}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {sortedUsers?.length} of {users?.length} users</span>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" disabled>
              Previous
            </Button>
            <span className="px-3 py-1 bg-primary text-primary-foreground rounded">1</span>
            <Button size="sm" variant="outline">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTable;