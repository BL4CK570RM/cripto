import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import AuthenticationGateway from '../../components/ui/AuthenticationGateway';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import Web3Registration from './components/Web3Registration';
import SecurityFeatures from './components/SecurityFeatures';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Register = () => {
  const [activeTab, setActiveTab] = useState('form');
  const [showSecurity, setShowSecurity] = useState(false);

  const registrationTabs = [
    {
      id: 'form',
      label: 'Email Registration',
      icon: 'Mail',
      description: 'Create account with email and password'
    },
    {
      id: 'social',
      label: 'Social Login',
      icon: 'Users',
      description: 'Register with Google or GitHub'
    },
    {
      id: 'web3',
      label: 'Web3 Wallet',
      icon: 'Wallet',
      description: 'Connect your crypto wallet'
    }
  ];

  const handleRegistrationSuccess = (userData) => {
    console.log('Registration successful:', userData);
    // Handle successful registration
    // This would typically update global state or context
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'form':
        return <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />;
      case 'social':
        return <SocialRegistration onRegistrationSuccess={handleRegistrationSuccess} />;
      case 'web3':
        return <Web3Registration onRegistrationSuccess={handleRegistrationSuccess} />;
      default:
        return <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />;
    }
  };

  if (showSecurity) {
    return (
      <AuthenticationGateway>
        <Helmet>
          <title>Security Features - Ebonex Token Platform</title>
          <meta name="description" content="Learn about Ebonex's enterprise-grade security features and data protection measures." />
        </Helmet>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setShowSecurity(false)}
              className="p-0 h-auto"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Back to Registration
            </Button>
          </div>
          
          <SecurityFeatures />
        </div>
      </AuthenticationGateway>
    );
  }

  return (
    <AuthenticationGateway>
      <Helmet>
        <title>Create Account - Ebonex Token Platform</title>
        <meta name="description" content="Join Ebonex and start managing your cryptocurrency tokens. Create your account with email, social login, or Web3 wallet connection." />
        <meta name="keywords" content="cryptocurrency, token platform, register, create account, Web3, blockchain" />
        <meta property="og:title" content="Create Account - Ebonex Token Platform" />
        <meta property="og:description" content="Join Ebonex and start managing your cryptocurrency tokens with multiple registration options." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="space-y-6">
        {/* Registration Method Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-1" aria-label="Registration methods">
            {registrationTabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex-1 flex flex-col items-center space-y-2 px-3 py-4 text-sm font-medium rounded-t-lg transition-smooth ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab?.icon} size={20} />
                <div className="text-center">
                  <div className="font-medium">{tab?.label}</div>
                  <div className="text-xs opacity-80 hidden sm:block">
                    {tab?.description}
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {renderTabContent()}
        </div>

        {/* Security Information */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="ShieldCheck" size={20} className="text-success" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Enterprise-grade Security
                </p>
                <p className="text-xs text-muted-foreground">
                  Your data is protected with advanced encryption
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSecurity(true)}
              className="text-primary hover:text-primary/80"
            >
              Learn More
              <Icon name="ArrowRight" size={14} className="ml-1" />
            </Button>
          </div>
        </div>

        {/* Registration Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {[
            {
              icon: 'Coins',
              title: 'Welcome Bonus',
              description: 'Get free EBNX tokens upon registration'
            },
            {
              icon: 'Users',
              title: 'Referral Rewards',
              description: 'Earn more by inviting friends'
            },
            {
              icon: 'TrendingUp',
              title: 'Trading Access',
              description: 'Start trading immediately after verification'
            }
          ]?.map((benefit, index) => (
            <div key={index} className="text-center p-4 bg-muted rounded-lg">
              <Icon name={benefit?.icon} size={24} className="text-primary mx-auto mb-2" />
              <h3 className="font-medium text-foreground text-sm mb-1">
                {benefit?.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {benefit?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="text-center text-xs text-muted-foreground space-y-2">
          <p>
            By creating an account, you agree to our{' '}
            <button className="text-primary hover:text-primary/80 underline">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-primary hover:text-primary/80 underline">
              Privacy Policy
            </button>
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button className="hover:text-foreground transition-smooth">
              Help Center
            </button>
            <span>•</span>
            <button className="hover:text-foreground transition-smooth">
              Contact Support
            </button>
            <span>•</span>
            <button className="hover:text-foreground transition-smooth">
              Security
            </button>
          </div>
        </div>
      </div>
    </AuthenticationGateway>
  );
};

export default Register;