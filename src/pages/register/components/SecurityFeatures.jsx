import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFeatures = () => {
  const [securityChecks, setSecurityChecks] = useState({
    deviceFingerprint: false,
    ipValidation: false,
    recaptcha: false,
    emailValidation: false
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate security checks
    const runSecurityChecks = async () => {
      setIsLoading(true);
      
      // Device fingerprinting
      setTimeout(() => {
        setSecurityChecks(prev => ({ ...prev, deviceFingerprint: true }));
      }, 500);

      // IP validation
      setTimeout(() => {
        setSecurityChecks(prev => ({ ...prev, ipValidation: true }));
      }, 1000);

      // reCAPTCHA simulation
      setTimeout(() => {
        setSecurityChecks(prev => ({ ...prev, recaptcha: true }));
      }, 1500);

      // Email validation setup
      setTimeout(() => {
        setSecurityChecks(prev => ({ ...prev, emailValidation: true }));
        setIsLoading(false);
      }, 2000);
    };

    runSecurityChecks();
  }, []);

  const securityFeatures = [
    {
      id: 'encryption',
      icon: 'Lock',
      title: 'End-to-End Encryption',
      description: 'All data is encrypted using AES-256 encryption',
      status: 'active'
    },
    {
      id: 'fingerprint',
      icon: 'Fingerprint',
      title: 'Device Fingerprinting',
      description: 'Unique device identification for fraud prevention',
      status: securityChecks?.deviceFingerprint ? 'active' : 'loading'
    },
    {
      id: 'shield',
      icon: 'Shield',
      title: 'DDoS Protection',
      description: 'Advanced protection against malicious attacks',
      status: 'active'
    },
    {
      id: 'verification',
      icon: 'CheckCircle',
      title: 'Email Verification',
      description: 'Secure email verification for account activation',
      status: securityChecks?.emailValidation ? 'active' : 'loading'
    },
    {
      id: 'monitoring',
      icon: 'Eye',
      title: 'Real-time Monitoring',
      description: '24/7 security monitoring and threat detection',
      status: 'active'
    },
    {
      id: 'backup',
      icon: 'Database',
      title: 'Secure Backup',
      description: 'Encrypted backups with disaster recovery',
      status: 'active'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'loading':
        return <Icon name="Loader2" size={16} className="text-primary animate-spin" />;
      default:
        return <Icon name="Clock" size={16} className="text-muted-foreground" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'loading':
        return 'Initializing...';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="ShieldCheck" size={32} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Enterprise Security</h3>
        <p className="text-muted-foreground">
          Your account is protected by multiple layers of security
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {securityFeatures?.map((feature) => (
          <div
            key={feature?.id}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-smooth"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={20} className="text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-foreground text-sm">{feature?.title}</h4>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(feature?.status)}
                    <span className="text-xs text-muted-foreground">
                      {getStatusText(feature?.status)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Security Certifications */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="Award" size={16} className="mr-2 text-primary" />
          Security Certifications
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { name: 'SOC 2', icon: 'Shield' },
            { name: 'ISO 27001', icon: 'Lock' },
            { name: 'GDPR', icon: 'Eye' },
            { name: 'PCI DSS', icon: 'CreditCard' }
          ]?.map((cert) => (
            <div key={cert?.name} className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={cert?.icon} size={14} className="text-primary" />
              </div>
              <span className="text-xs font-medium text-foreground">{cert?.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Security Tips */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-warning mb-1">Security Best Practices</p>
            <ul className="text-warning/80 space-y-1 text-xs">
              <li>• Use a strong, unique password for your account</li>
              <li>• Enable two-factor authentication when available</li>
              <li>• Never share your login credentials with anyone</li>
              <li>• Always log out from shared or public devices</li>
            </ul>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="text-center py-4">
          <Icon name="Loader2" size={24} className="text-primary animate-spin mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Initializing security protocols...
          </p>
        </div>
      )}
    </div>
  );
};

export default SecurityFeatures;