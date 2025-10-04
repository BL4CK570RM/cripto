import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityNotice = () => {
  const securityFeatures = [
    {
      icon: 'Lock',
      title: 'End-to-End Encryption',
      description: 'Your data is protected with military-grade encryption'
    },
    {
      icon: 'Shield',
      title: 'Multi-Factor Authentication',
      description: 'Additional security layers protect your account'
    },
    {
      icon: 'Eye',
      title: 'Privacy First',
      description: 'We never store your private keys or sensitive data'
    },
    {
      icon: 'Clock',
      title: 'Session Management',
      description: 'Automatic logout and secure session handling'
    }
  ];

  return (
    <div className="bg-muted rounded-lg p-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Icon name="ShieldCheck" size={20} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Bank-Level Security
        </h3>
        <p className="text-muted-foreground text-sm">
          Your account and assets are protected by enterprise-grade security measures
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={14} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">
                {feature?.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={12} className="text-success" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={12} className="text-success" />
            <span>SOC 2 Compliant</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={12} className="text-success" />
            <span>GDPR Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityNotice;