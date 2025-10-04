import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AdminSecurityGate = ({ 
  user = null, 
  onAccessGranted = () => {},
  onAccessDenied = () => {},
  children,
  requiresAdditionalAuth = true 
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState('role-check');
  const [securityCode, setSecurityCode] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(null);

  const MAX_ATTEMPTS = 3;
  const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    if (!user) {
      setVerificationStep('unauthorized');
      return;
    }

    if (user?.role !== 'admin') {
      setVerificationStep('insufficient-role');
      onAccessDenied();
      return;
    }

    if (!requiresAdditionalAuth) {
      setVerificationStep('granted');
      onAccessGranted();
      return;
    }

    setVerificationStep('security-verification');
  }, [user, requiresAdditionalAuth, onAccessGranted, onAccessDenied]);

  useEffect(() => {
    let timer;
    if (isLocked && lockoutTime) {
      timer = setInterval(() => {
        const remaining = lockoutTime - Date.now();
        if (remaining <= 0) {
          setIsLocked(false);
          setLockoutTime(null);
          setAttempts(0);
          setError('');
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked, lockoutTime]);

  const handleSecurityVerification = async (e) => {
    e?.preventDefault();
    
    if (isLocked) return;

    setIsVerifying(true);
    setError('');

    try {
      // Simulate security verification
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock verification logic - in real app, this would be an API call
      const isValidCode = securityCode === '123456' || securityCode === 'admin2024';

      if (isValidCode) {
        setVerificationStep('granted');
        setAttempts(0);
        onAccessGranted();
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= MAX_ATTEMPTS) {
          setIsLocked(true);
          setLockoutTime(Date.now() + LOCKOUT_DURATION);
          setError(`Too many failed attempts. Access locked for ${LOCKOUT_DURATION / 60000} minutes.`);
        } else {
          setError(`Invalid security code. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`);
        }
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const formatLockoutTime = () => {
    if (!lockoutTime) return '';
    const remaining = Math.max(0, lockoutTime - Date.now());
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const renderVerificationStep = () => {
    switch (verificationStep) {
      case 'unauthorized':
        return (
          <div className="text-center py-12">
            <Icon name="Lock" size={48} className="text-error mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Authentication Required</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to access this area.
            </p>
            <Button onClick={() => window.location.href = '/login'}>
              Sign In
            </Button>
          </div>
        );

      case 'insufficient-role':
        return (
          <div className="text-center py-12">
            <Icon name="ShieldX" size={48} className="text-warning mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-6">
              You don't have sufficient permissions to access the admin dashboard.
            </p>
            <Button variant="outline" onClick={() => window.history?.back()}>
              Go Back
            </Button>
          </div>
        );

      case 'security-verification':
        return (
          <div className="max-w-md mx-auto py-12">
            <div className="text-center mb-8">
              <Icon name="ShieldCheck" size={48} className="text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Additional Security Required</h2>
              <p className="text-muted-foreground">
                Please enter your admin security code to continue.
              </p>
            </div>
            <form onSubmit={handleSecurityVerification} className="space-y-6">
              <Input
                label="Security Code"
                type="password"
                value={securityCode}
                onChange={(e) => setSecurityCode(e?.target?.value)}
                placeholder="Enter your security code"
                error={error}
                disabled={isLocked || isVerifying}
                required
                className="text-center font-mono"
              />

              {isLocked && (
                <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-error">
                    <Icon name="Clock" size={16} />
                    <span className="text-sm font-medium">
                      Access locked. Try again in {formatLockoutTime()}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history?.back()}
                  disabled={isVerifying}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={isVerifying}
                  disabled={isLocked || !securityCode?.trim()}
                  className="flex-1"
                >
                  Verify Access
                </Button>
              </div>
            </form>
            <div className="mt-8 bg-muted rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Security Notice</p>
                  <p className="text-muted-foreground">
                    Admin access requires additional verification for security purposes. 
                    Contact your system administrator if you've forgotten your security code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'granted':
        return children;

      default:
        return (
          <div className="text-center py-12">
            <Icon name="Loader2" size={48} className="text-primary mx-auto mb-4 animate-spin" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Verifying Access</h2>
            <p className="text-muted-foreground">
              Please wait while we verify your permissions...
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {renderVerificationStep()}
      </div>
    </div>
  );
};

export default AdminSecurityGate;