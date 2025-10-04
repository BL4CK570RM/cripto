import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AuditLogViewer = ({ auditLogs, onExportLogs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  const logTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'user_action', label: 'User Actions' },
    { value: 'admin_action', label: 'Admin Actions' },
    { value: 'system_event', label: 'System Events' },
    { value: 'security_event', label: 'Security Events' },
    { value: 'transaction', label: 'Transactions' },
    { value: 'config_change', label: 'Configuration Changes' }
  ];

  const severityLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'info', label: 'Info' },
    { value: 'warning', label: 'Warning' },
    { value: 'error', label: 'Error' },
    { value: 'critical', label: 'Critical' }
  ];

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const filteredLogs = auditLogs?.filter(log => {
    const matchesSearch = log?.action?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         log?.user?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         log?.details?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    const matchesType = filterType === 'all' || log?.type === filterType;
    const matchesSeverity = filterSeverity === 'all' || log?.severity === filterSeverity;
    
    return matchesSearch && matchesType && matchesSeverity;
  });

  const getSeverityColor = (severity) => {
    const colors = {
      info: 'text-primary bg-primary/10',
      warning: 'text-warning bg-warning/10',
      error: 'text-error bg-error/10',
      critical: 'text-error bg-error/20 font-semibold'
    };
    return colors?.[severity] || colors?.info;
  };

  const getSeverityIcon = (severity) => {
    const icons = {
      info: 'Info',
      warning: 'AlertTriangle',
      error: 'AlertCircle',
      critical: 'AlertOctagon'
    };
    return icons?.[severity] || 'Info';
  };

  const getTypeIcon = (type) => {
    const icons = {
      user_action: 'User',
      admin_action: 'Shield',
      system_event: 'Settings',
      security_event: 'Lock',
      transaction: 'CreditCard',
      config_change: 'Edit'
    };
    return icons?.[type] || 'Activity';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date?.toLocaleDateString(),
      time: date?.toLocaleTimeString()
    };
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h3 className="text-lg font-semibold text-foreground">Audit Log Viewer</h3>
            <div className="flex items-center space-x-3">
              <Button variant="outline" iconName="RefreshCw" iconPosition="left">
                Refresh
              </Button>
              <Button variant="outline" iconName="Download" iconPosition="left" onClick={onExportLogs}>
                Export Logs
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              type="search"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e?.target?.value)}
              className="px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {logTypes?.map(type => (
                <option key={type?.value} value={type?.value}>{type?.label}</option>
              ))}
            </select>
            
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e?.target?.value)}
              className="px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {severityLevels?.map(level => (
                <option key={level?.value} value={level?.value}>{level?.label}</option>
              ))}
            </select>
            
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e?.target?.value)}
              className="px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {dateRanges?.map(range => (
                <option key={range?.value} value={range?.value}>{range?.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="p-6">
        {filteredLogs?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No logs found</h4>
            <p className="text-muted-foreground">
              No audit logs match your current filters.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLogs?.map((log) => {
              const timestamp = formatTimestamp(log?.timestamp);
              return (
                <div
                  key={log?.id}
                  className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg border border-border hover:bg-muted/30 transition-smooth"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getSeverityColor(log?.severity)}`}>
                    <Icon name={getSeverityIcon(log?.severity)} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="text-sm font-medium text-foreground">{log?.action}</h4>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(log?.severity)}`}>
                        {log?.severity}
                      </span>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Icon name={getTypeIcon(log?.type)} size={12} />
                        <span className="text-xs">{log?.type?.replace('_', ' ')}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{log?.details}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="User" size={12} />
                        <span>{log?.user}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>{timestamp?.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{timestamp?.time}</span>
                      </div>
                      {log?.ipAddress && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Globe" size={12} />
                          <span>{log?.ipAddress}</span>
                        </div>
                      )}
                      {log?.sessionId && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Key" size={12} />
                          <span>Session: {log?.sessionId?.substring(0, 8)}...</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      iconName="Eye"
                      onClick={() => {/* Handle view details */}}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      iconName="ExternalLink"
                      onClick={() => {/* Handle external link */}}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {filteredLogs?.length} of {auditLogs?.length} log entries</span>
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

export default AuditLogViewer;