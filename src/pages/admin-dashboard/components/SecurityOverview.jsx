import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecurityOverview = ({ securityData, onSecurityAction }) => {
  const [activeAlert, setActiveAlert] = useState(null);

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'text-error bg-error/10 border-error/20',
      high: 'text-warning bg-warning/10 border-warning/20',
      medium: 'text-secondary bg-secondary/10 border-secondary/20',
      low: 'text-success bg-success/10 border-success/20'
    };
    return colors?.[severity] || colors?.low;
  };

  const getSeverityIcon = (severity) => {
    const icons = {
      critical: 'AlertTriangle',
      high: 'AlertCircle',
      medium: 'Info',
      low: 'CheckCircle'
    };
    return icons?.[severity] || 'Info';
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-error',
      investigating: 'text-warning',
      resolved: 'text-success',
      dismissed: 'text-muted-foreground'
    };
    return colors?.[status] || colors?.active;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-foreground">Security Overview</h3>
          <div className="flex items-center space-x-3">
            <Button variant="outline" iconName="Shield" iconPosition="left">
              Security Settings
            </Button>
            <Button variant="outline" iconName="Download" iconPosition="left">
              Export Report
            </Button>
          </div>
        </div>

        {/* Security Metrics */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Threat Level</span>
            </div>
            <div className="text-lg font-semibold text-success">Low</div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Eye" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Active Monitors</span>
            </div>
            <div className="text-lg font-semibold text-foreground">{securityData?.activeMonitors}</div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Ban" size={16} className="text-error" />
              <span className="text-sm font-medium text-foreground">Blocked IPs</span>
            </div>
            <div className="text-lg font-semibold text-foreground">{securityData?.blockedIPs}</div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="UserX" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Flagged Users</span>
            </div>
            <div className="text-lg font-semibold text-foreground">{securityData?.flaggedUsers}</div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Recent Security Alerts</h4>
        
        {securityData?.alerts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="ShieldCheck" size={48} className="text-success mx-auto mb-4" />
            <h5 className="text-lg font-medium text-foreground mb-2">All Clear</h5>
            <p className="text-muted-foreground">No active security alerts at this time.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {securityData?.alerts?.map((alert) => (
              <div
                key={alert?.id}
                className={`p-4 rounded-lg border transition-smooth cursor-pointer ${
                  activeAlert === alert?.id ? 'bg-muted/50' : 'bg-muted/20 hover:bg-muted/30'
                }`}
                onClick={() => setActiveAlert(activeAlert === alert?.id ? null : alert?.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getSeverityColor(alert?.severity)}`}>
                      <Icon name={getSeverityIcon(alert?.severity)} size={16} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h5 className="text-sm font-medium text-foreground">{alert?.title}</h5>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(alert?.severity)}`}>
                          {alert?.severity}
                        </span>
                        <span className={`text-xs font-medium ${getStatusColor(alert?.status)}`}>
                          {alert?.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{alert?.description}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{new Date(alert.timestamp)?.toLocaleString()}</span>
                        <span>•</span>
                        <span>Source: {alert?.source}</span>
                        {alert?.affectedUsers && (
                          <>
                            <span>•</span>
                            <span>Affected: {alert?.affectedUsers} users</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {alert?.status === 'active' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          iconName="Eye"
                          onClick={(e) => {
                            e?.stopPropagation();
                            onSecurityAction('investigate', alert?.id);
                          }}
                        >
                          Investigate
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          iconName="Ban"
                          onClick={(e) => {
                            e?.stopPropagation();
                            onSecurityAction('block', alert?.id);
                          }}
                        >
                          Block
                        </Button>
                      </>
                    )}
                    
                    {alert?.status === 'investigating' && (
                      <Button
                        size="sm"
                        variant="outline"
                        iconName="CheckCircle"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onSecurityAction('resolve', alert?.id);
                        }}
                      >
                        Resolve
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      iconName="MoreHorizontal"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onSecurityAction('menu', alert?.id);
                      }}
                    />
                  </div>
                </div>

                {activeAlert === alert?.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-sm font-medium text-foreground mb-2">Details</h6>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div>Alert ID: {alert?.id}</div>
                          <div>Detection Method: {alert?.detectionMethod}</div>
                          <div>Risk Score: {alert?.riskScore}/100</div>
                          {alert?.ipAddress && <div>IP Address: {alert?.ipAddress}</div>}
                          {alert?.userAgent && <div>User Agent: {alert?.userAgent}</div>}
                        </div>
                      </div>
                      
                      <div>
                        <h6 className="text-sm font-medium text-foreground mb-2">Actions Taken</h6>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {alert?.actions?.map((action, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Icon name="CheckCircle" size={12} className="text-success" />
                              <span>{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Last security scan: {new Date(securityData.lastScan)?.toLocaleString()}
          </div>
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={() => onSecurityAction('runScan')}
          >
            Run Security Scan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecurityOverview;