import React from 'react';
import Icon from '../../../components/AppIcon';

const KYCStatusCard = ({ 
  kycStatus = {
    status: 'pending',
    level: 1,
    documentsSubmitted: false,
    withdrawalLimit: 1000,
    completedSteps: 2,
    totalSteps: 4
  },
  onStartKYC = () => {},
  onViewDetails = () => {}
}) => {
  const getStatusInfo = (status) => {
    switch (status) {
      case 'verified':
        return {
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          icon: 'CheckCircle',
          title: 'KYC Verified',
          description: 'Your identity has been successfully verified'
        };
      case 'pending':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          icon: 'Clock',
          title: 'KYC Pending',
          description: 'Your documents are being reviewed'
        };
      case 'rejected':
        return {
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          icon: 'XCircle',
          title: 'KYC Rejected',
          description: 'Please resubmit your documents'
        };
      case 'not_started':
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/50',
          borderColor: 'border-border',
          icon: 'FileText',
          title: 'KYC Required',
          description: 'Complete verification to unlock full features'
        };
    }
  };

  const statusInfo = getStatusInfo(kycStatus?.status);
  const progressPercentage = (kycStatus?.completedSteps / kycStatus?.totalSteps) * 100;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const kycSteps = [
    { id: 1, title: 'Personal Information', completed: kycStatus?.completedSteps >= 1 },
    { id: 2, title: 'Identity Document', completed: kycStatus?.completedSteps >= 2 },
    { id: 3, title: 'Address Verification', completed: kycStatus?.completedSteps >= 3 },
    { id: 4, title: 'Final Review', completed: kycStatus?.completedSteps >= 4 }
  ];

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">KYC Verification</h2>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${statusInfo?.bgColor}`}>
          <Icon name={statusInfo?.icon} size={24} className={statusInfo?.color} />
        </div>
      </div>
      <div className="space-y-6">
        {/* Status Overview */}
        <div className={`p-4 rounded-lg border ${statusInfo?.bgColor} ${statusInfo?.borderColor}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-medium ${statusInfo?.color}`}>{statusInfo?.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${statusInfo?.bgColor} ${statusInfo?.color}`}>
              Level {kycStatus?.level}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{statusInfo?.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Verification Progress</span>
            <span className="text-sm text-muted-foreground">
              {kycStatus?.completedSteps}/{kycStatus?.totalSteps} steps
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* KYC Steps */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground">Verification Steps</h3>
          {kycSteps?.map((step) => (
            <div key={step?.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/30 transition-smooth">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                step?.completed 
                  ? 'bg-success text-success-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {step?.completed ? (
                  <Icon name="Check" size={14} />
                ) : (
                  <span className="text-xs font-medium">{step?.id}</span>
                )}
              </div>
              <span className={`text-sm ${
                step?.completed ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step?.title}
              </span>
            </div>
          ))}
        </div>

        {/* Current Limits */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Current Limits</span>
            <Icon name="Shield" size={16} className="text-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-foreground">
                {formatCurrency(kycStatus?.withdrawalLimit)}
              </div>
              <div className="text-xs text-muted-foreground">Daily Withdrawal</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">
                {kycStatus?.status === 'verified' ? 'Unlimited' : 'Limited'}
              </div>
              <div className="text-xs text-muted-foreground">Trading Access</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {kycStatus?.status === 'not_started' || kycStatus?.status === 'rejected' ? (
            <button
              onClick={onStartKYC}
              className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary/90 transition-smooth"
            >
              {kycStatus?.status === 'rejected' ? 'Restart KYC' : 'Start Verification'}
            </button>
          ) : (
            <button
              onClick={onViewDetails}
              className="flex-1 bg-muted text-foreground py-2 px-4 rounded-lg text-sm font-medium hover:bg-muted/80 transition-smooth border border-border"
            >
              View Details
            </button>
          )}
          
          {kycStatus?.status === 'verified' && (
            <button className="px-4 py-2 bg-success/10 text-success rounded-lg text-sm font-medium border border-success/20">
              <Icon name="CheckCircle" size={16} className="inline mr-1" />
              Verified
            </button>
          )}
        </div>

        {/* Help Text */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Need Help?</p>
              <p className="text-muted-foreground">
                KYC verification typically takes 1-3 business days. Ensure all documents are clear and valid.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCStatusCard;