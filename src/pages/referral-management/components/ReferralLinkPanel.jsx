import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReferralLinkPanel = ({ user = null }) => {
  const [copied, setCopied] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);
  const linkRef = useRef(null);

  const referralCode = user?.referralCode || 'EBNX2024USER';
  const referralLink = `https://ebonex.io/register?ref=${referralCode}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      if (linkRef?.current) {
        linkRef?.current?.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleSocialShare = (platform) => {
    const shareText = `Join me on Ebonex Token Platform and start earning cryptocurrency rewards! Use my referral link to get started.`;
    const encodedText = encodeURIComponent(shareText);
    const encodedLink = encodeURIComponent(referralLink);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedLink}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}&quote=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`,
      telegram: `https://t.me/share/url?url=${encodedLink}&text=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedLink}`,
      email: `mailto:?subject=Join Ebonex Token Platform&body=${shareText}%0A%0A${referralLink}`
    };

    if (shareUrls?.[platform]) {
      window.open(shareUrls?.[platform], '_blank', 'width=600,height=400');
    }
  };

  const generateQRCode = () => {
    // Using a QR code API service
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(referralLink)}`;
  };

  return (
    <div className="bg-card rounded-lg border shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Share" size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Share Your Referral Link</h3>
            <p className="text-sm text-muted-foreground">
              Earn rewards for every successful referral
            </p>
          </div>
        </div>

        {/* Referral Code Display */}
        <div className="bg-muted rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Your Referral Code</span>
            <span className="text-xs text-muted-foreground">Share this code</span>
          </div>
          <div className="flex items-center space-x-3">
            <code className="flex-1 text-lg font-mono font-bold text-primary bg-background rounded px-3 py-2 border">
              {referralCode}
            </code>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard?.writeText(referralCode);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              iconName={copied ? "Check" : "Copy"}
              iconSize={16}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>

        {/* Referral Link */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Your Referral Link
          </label>
          <div className="flex items-center space-x-2">
            <input
              ref={linkRef}
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button
              variant={copied ? "success" : "outline"}
              onClick={handleCopyLink}
              iconName={copied ? "Check" : "Copy"}
              iconSize={16}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">QR Code</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQrVisible(!qrVisible)}
              iconName={qrVisible ? "ChevronUp" : "ChevronDown"}
              iconSize={16}
            >
              {qrVisible ? 'Hide' : 'Show'} QR Code
            </Button>
          </div>
          
          {qrVisible && (
            <div className="flex justify-center p-4 bg-background rounded-lg border">
              <div className="text-center">
                <img
                  src={generateQRCode()}
                  alt="Referral QR Code"
                  className="w-48 h-48 mx-auto mb-3 rounded-lg border"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Scan to access referral link
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Social Sharing */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Share on Social Media</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <button
              onClick={() => handleSocialShare('twitter')}
              className="flex items-center justify-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted transition-smooth"
            >
              <Icon name="Twitter" size={18} className="text-blue-500" />
              <span className="text-sm font-medium text-foreground hidden sm:inline">Twitter</span>
            </button>

            <button
              onClick={() => handleSocialShare('facebook')}
              className="flex items-center justify-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted transition-smooth"
            >
              <Icon name="Facebook" size={18} className="text-blue-600" />
              <span className="text-sm font-medium text-foreground hidden sm:inline">Facebook</span>
            </button>

            <button
              onClick={() => handleSocialShare('linkedin')}
              className="flex items-center justify-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted transition-smooth"
            >
              <Icon name="Linkedin" size={18} className="text-blue-700" />
              <span className="text-sm font-medium text-foreground hidden sm:inline">LinkedIn</span>
            </button>

            <button
              onClick={() => handleSocialShare('telegram')}
              className="flex items-center justify-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted transition-smooth"
            >
              <Icon name="Send" size={18} className="text-blue-500" />
              <span className="text-sm font-medium text-foreground hidden sm:inline">Telegram</span>
            </button>

            <button
              onClick={() => handleSocialShare('whatsapp')}
              className="flex items-center justify-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted transition-smooth"
            >
              <Icon name="MessageCircle" size={18} className="text-green-500" />
              <span className="text-sm font-medium text-foreground hidden sm:inline">WhatsApp</span>
            </button>

            <button
              onClick={() => handleSocialShare('email')}
              className="flex items-center justify-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted transition-smooth"
            >
              <Icon name="Mail" size={18} className="text-gray-600" />
              <span className="text-sm font-medium text-foreground hidden sm:inline">Email</span>
            </button>
          </div>
        </div>
      </div>
      {/* Referral Benefits */}
      <div className="p-6 bg-muted/30">
        <h4 className="text-sm font-medium text-foreground mb-3">Referral Benefits</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">10%</strong> from Level 1 referrals
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">5%</strong> from Level 2 referrals
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">2.5%</strong> from Level 3 referrals
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-muted-foreground">
              Real-time earnings tracking
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralLinkPanel;