import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialLoginSection = ({ onSocialLogin, isLoading, socialError }) => {
  const [selectedProvider, setSelectedProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-500',
      bgColor: 'hover:bg-red-50'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      color: 'text-gray-900',
      bgColor: 'hover:bg-gray-50'
    }
  ];

  const handleSocialLogin = async (providerId) => {
    setSelectedProvider(providerId);
    await onSocialLogin(providerId);
    setSelectedProvider(null);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">Quick sign in</span>
        </div>
      </div>
      {socialError && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-error">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm font-medium">{socialError}</span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            onClick={() => handleSocialLogin(provider?.id)}
            loading={isLoading && selectedProvider === provider?.id}
            disabled={isLoading}
            className={`${provider?.bgColor} transition-smooth`}
          >
            <div className="flex items-center space-x-2">
              <Icon name={provider?.icon} size={16} className={provider?.color} />
              <span className="text-sm font-medium">{provider?.name}</span>
            </div>
          </Button>
        ))}
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our{' '}
          <button className="text-primary hover:text-primary/80 transition-smooth">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-primary hover:text-primary/80 transition-smooth">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};

export default SocialLoginSection;