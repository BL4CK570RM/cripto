import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const NotificationPrompt = ({ 
  onEnable = () => {},
  onDismiss = () => {},
  autoShow = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    if (autoShow && permission === 'default') {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [autoShow, permission]);

  const handleEnable = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        onEnable();
        setIsVisible(false);
        
        // Show test notification
        new Notification('Ebonex Notifications Enabled', {
          body: 'You\'ll now receive reward reminders and important updates.',
          icon: '/favicon.ico',
          badge: '/favicon.ico'
        });
      }
    } catch (error) {
      console.error('Failed to enable notifications:', error);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss();
  };

  if (!isVisible || permission !== 'default') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-slide-up">
      <div className="bg-card border border-border rounded-xl shadow-elevation-4 p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Bell" size={24} className="text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enable notifications to get reminders when your rewards are ready to claim and receive important platform updates.
            </p>
            
            <div className="flex space-x-2">
              <button
                onClick={handleEnable}
                className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary/90 transition-smooth"
              >
                Enable Notifications
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Benefits List */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="space-y-2">
            {[
              'Reward claim reminders',
              'Referral milestone alerts',
              'Security notifications'
            ]?.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span className="text-xs text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPrompt;