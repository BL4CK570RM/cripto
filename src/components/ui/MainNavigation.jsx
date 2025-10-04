import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const MainNavigation = ({ user = null, onLogout = () => {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      roles: ['user', 'admin']
    },
    {
      label: 'Referrals',
      path: '/referral-management',
      icon: 'Users',
      roles: ['user', 'admin']
    },
    {
      label: 'Leaderboard',
      path: '/leaderboard',
      icon: 'Trophy',
      roles: ['user', 'admin']
    },
    {
      label: 'Admin',
      path: '/admin-dashboard',
      icon: 'Settings',
      roles: ['admin']
    }
  ];

  const filteredNavItems = navigationItems?.filter(item => 
    !user?.role || item?.roles?.includes(user?.role)
  );

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event?.target?.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-3 transition-smooth hover:opacity-80">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-foreground">Ebonex</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {filteredNavItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <div className="relative user-menu-container">
                <button
                  onClick={handleUserMenuToggle}
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-smooth"
                >
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-secondary-foreground" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-foreground">
                      {user?.name || 'User'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {user?.email || 'user@example.com'}
                    </div>
                  </div>
                  <Icon 
                    name="ChevronDown" 
                    size={16} 
                    className={`text-muted-foreground transition-transform ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-elevation-3 animate-slide-down">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-border">
                        <div className="text-sm font-medium text-popover-foreground">
                          {user?.name || 'User'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {user?.email || 'user@example.com'}
                        </div>
                        {user?.balance !== undefined && (
                          <div className="text-xs font-mono text-accent mt-1">
                            Balance: {user?.balance} EBNX
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          // Handle profile navigation
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                      >
                        <Icon name="User" size={16} className="mr-3" />
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          // Handle settings navigation
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                      >
                        <Icon name="Settings" size={16} className="mr-3" />
                        Settings
                      </button>
                      <div className="border-t border-border">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onLogout();
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-muted transition-smooth"
                        >
                          <Icon name="LogOut" size={16} className="mr-3" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMobileMenuToggle}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleMobileMenuToggle} />
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-card border-l border-border shadow-elevation-4 animate-slide-down">
            <div className="flex items-center justify-between p-4 border-b border-border">
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
                <span className="text-lg font-semibold text-foreground">Ebonex</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleMobileMenuToggle}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={24} />
              </Button>
            </div>

            <div className="flex flex-col h-full">
              {/* User Info */}
              {user && (
                <div className="p-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-secondary-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {user?.name || 'User'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {user?.email || 'user@example.com'}
                      </div>
                      {user?.balance !== undefined && (
                        <div className="text-xs font-mono text-accent mt-1">
                          Balance: {user?.balance} EBNX
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Items */}
              <nav className="flex-1 p-4 space-y-2">
                {filteredNavItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={handleNavClick}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Mobile User Actions */}
              {user && (
                <div className="p-4 border-t border-border space-y-2">
                  <button
                    onClick={() => {
                      handleNavClick();
                      // Handle profile navigation
                    }}
                    className="flex items-center w-full space-x-3 px-4 py-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="User" size={20} />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      handleNavClick();
                      // Handle settings navigation
                    }}
                    className="flex items-center w-full space-x-3 px-4 py-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="Settings" size={20} />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      handleNavClick();
                      onLogout();
                    }}
                    className="flex items-center w-full space-x-3 px-4 py-3 rounded-md text-sm font-medium text-destructive hover:bg-muted transition-smooth"
                  >
                    <Icon name="LogOut" size={20} />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainNavigation;