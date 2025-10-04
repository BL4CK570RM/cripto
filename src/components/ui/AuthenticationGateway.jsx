import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationGateway = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location?.pathname === '/login';
  const isRegisterPage = location?.pathname === '/register';

  if (!isLoginPage && !isRegisterPage) {
    return children;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full bg-card border-b border-border shadow-elevation-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-foreground">Ebonex Token Platform</span>
            </div>

            {/* Auth Navigation */}
            <nav className="flex items-center space-x-4">
              <Link
                to="/login"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isLoginPage
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isRegisterPage
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
                }`}
              >
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              {isLoginPage ? 'Welcome Back' : 'Join Ebonex'}
            </h1>
            <p className="text-muted-foreground">
              {isLoginPage 
                ? 'Sign in to access your cryptocurrency portfolio and manage your tokens' :'Create your account to start trading and managing digital assets'
              }
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-card rounded-lg border border-border shadow-elevation-2 p-6">
            {children}
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-smooth">
                Help Center
              </button>
              <button className="hover:text-foreground transition-smooth">
                Privacy Policy
              </button>
              <button className="hover:text-foreground transition-smooth">
                Terms of Service
              </button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 bg-muted rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">Secure Platform</p>
                <p className="text-muted-foreground">
                  Your data is protected with enterprise-grade security. We use advanced encryption 
                  and never store your private keys.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default AuthenticationGateway;