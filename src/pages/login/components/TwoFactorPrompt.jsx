import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TwoFactorPrompt = ({ onVerify, onCancel, isVerifying, error, method = 'totp' }) => {
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (method === 'sms' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [method, timeLeft]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (code?.length === 6) {
      onVerify(code);
    }
  };

  const handleResend = () => {
    setTimeLeft(30);
    setCanResend(false);
    // Trigger resend logic
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Shield" size={24} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Two-Factor Authentication
        </h3>
        <p className="text-muted-foreground text-sm">
          {method === 'totp' ?'Enter the 6-digit code from your authenticator app' :'Enter the 6-digit code sent to your phone'
          }
        </p>
      </div>
      {error && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-error">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Verification Code"
          type="text"
          value={code}
          onChange={(e) => setCode(e?.target?.value?.replace(/\D/g, '')?.slice(0, 6))}
          placeholder="000000"
          maxLength={6}
          className="text-center font-mono text-lg tracking-widest"
          disabled={isVerifying}
          required
        />

        {method === 'sms' && (
          <div className="text-center">
            {!canResend ? (
              <p className="text-sm text-muted-foreground">
                Resend code in {formatTime(timeLeft)}
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-sm text-primary hover:text-primary/80 transition-smooth"
              >
                Resend verification code
              </button>
            )}
          </div>
        )}

        <div className="flex space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isVerifying}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isVerifying}
            disabled={code?.length !== 6}
            className="flex-1"
          >
            Verify
          </Button>
        </div>
      </form>
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="HelpCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Having trouble?</p>
            <p className="text-muted-foreground">
              {method === 'totp' ?'Make sure your authenticator app time is synchronized and try again.' :'Check your phone for the SMS message. It may take a few minutes to arrive.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorPrompt;