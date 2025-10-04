import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthenticationGateway from '../../components/ui/AuthenticationGateway';
import LoginForm from './components/LoginForm';
import Web3LoginSection from './components/Web3LoginSection';
import SocialLoginSection from './components/SocialLoginSection';
import TwoFactorPrompt from './components/TwoFactorPrompt';
import SecurityNotice from './components/SecurityNotice';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loginState, setLoginState] = useState('form'); // 'form', '2fa', 'success'
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [walletError, setWalletError] = useState('');
  const [socialError, setSocialError] = useState('');
  const [twoFactorData, setTwoFactorData] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);

  // Mock user credentials for demo
  const mockCredentials = {
    email: 'user@ebonex.com',
    password: 'password123',
    adminEmail: 'admin@ebonex.com',
    adminPassword: 'admin123'
  };

  useEffect(() => {
    // Clear errors when component mounts
    setError('');
    setWalletError('');
    setSocialError('');
  }, []);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication logic
      const isValidUser = formData?.email === mockCredentials?.email && 
                         formData?.password === mockCredentials?.password;
      const isValidAdmin = formData?.email === mockCredentials?.adminEmail && 
                          formData?.password === mockCredentials?.adminPassword;

      if (isValidUser || isValidAdmin) {
        // Simulate 2FA requirement for some users
        if (formData?.email?.includes('admin') || Math.random() > 0.7) {
          setTwoFactorData({
            email: formData?.email,
            method: 'totp',
            tempToken: 'temp_' + Date.now()
          });
          setLoginState('2fa');
        } else {
          handleSuccessfulLogin(formData?.email, isValidAdmin ? 'admin' : 'user');
        }
      } else {
        setAttemptCount(prev => prev + 1);
        if (attemptCount >= 2) {
          setError(`Invalid credentials. Please use: ${mockCredentials?.email} / ${mockCredentials?.password} or ${mockCredentials?.adminEmail} / ${mockCredentials?.adminPassword}`);
        } else {
          setError('Invalid email or password. Please try again.');
        }
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletConnect = async (walletId) => {
    setIsConnecting(true);
    setWalletError('');

    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock wallet connection logic
      if (Math.random() > 0.3) {
        const mockWalletAddress = '0x742d35Cc6634C0532925a3b8D4C0C4e7C8C8C8C8';
        handleSuccessfulLogin(mockWalletAddress, 'user', 'wallet');
      } else {
        setWalletError(`Failed to connect to ${walletId}. Please make sure your wallet is installed and unlocked.`);
      }
    } catch (err) {
      setWalletError('Wallet connection failed. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSocialLogin = async (providerId) => {
    setIsLoading(true);
    setSocialError('');

    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock social login logic
      if (Math.random() > 0.2) {
        const mockEmail = `user@${providerId}.com`;
        handleSuccessfulLogin(mockEmail, 'user', 'social');
      } else {
        setSocialError(`${providerId} login failed. Please try again.`);
      }
    } catch (err) {
      setSocialError('Social login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorVerify = async (code) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate 2FA verification
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock 2FA verification (accept 123456 or 000000)
      if (code === '123456' || code === '000000') {
        const role = twoFactorData?.email?.includes('admin') ? 'admin' : 'user';
        handleSuccessfulLogin(twoFactorData?.email, role);
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessfulLogin = (identifier, role, method = 'email') => {
    setLoginState('success');
    
    // Store user data in localStorage (in real app, use secure storage)
    const userData = {
      id: Date.now(),
      email: method === 'wallet' ? `${identifier?.slice(0, 6)}...${identifier?.slice(-4)}@wallet.local` : identifier,
      name: role === 'admin' ? 'Admin User' : 'John Doe',
      role: role,
      balance: Math.floor(Math.random() * 10000) + 1000,
      walletAddress: method === 'wallet' ? identifier : null,
      loginMethod: method,
      lastLogin: new Date()?.toISOString()
    };

    localStorage.setItem('ebonex_user', JSON.stringify(userData));

    // Redirect based on role and intended destination
    const from = location?.state?.from?.pathname || (role === 'admin' ? '/admin-dashboard' : '/dashboard');
    
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 1000);
  };

  const handleTwoFactorCancel = () => {
    setLoginState('form');
    setTwoFactorData(null);
    setError('');
  };

  if (loginState === 'success') {
    return (
      <AuthenticationGateway>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Login Successful!</h3>
          <p className="text-muted-foreground">Redirecting to your dashboard...</p>
        </div>
      </AuthenticationGateway>
    );
  }

  if (loginState === '2fa') {
    return (
      <AuthenticationGateway>
        <TwoFactorPrompt
          onVerify={handleTwoFactorVerify}
          onCancel={handleTwoFactorCancel}
          isVerifying={isLoading}
          error={error}
          method={twoFactorData?.method}
        />
      </AuthenticationGateway>
    );
  }

  return (
    <AuthenticationGateway>
      <div className="space-y-8">
        <LoginForm
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          error={error}
        />

        <Web3LoginSection
          onWalletConnect={handleWalletConnect}
          isConnecting={isConnecting}
          walletError={walletError}
        />

        <SocialLoginSection
          onSocialLogin={handleSocialLogin}
          isLoading={isLoading}
          socialError={socialError}
        />

        <SecurityNotice />
      </div>
    </AuthenticationGateway>
  );
};

export default Login;