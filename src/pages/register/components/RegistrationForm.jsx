import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = ({ onRegistrationSuccess = () => {} }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    subscribeNewsletter: true
  });

  const [formState, setFormState] = useState({
    isSubmitting: false,
    errors: {},
    passwordStrength: 0,
    referralValid: null,
    referralBonus: 0,
    showPassword: false,
    showConfirmPassword: false
  });

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Mock referral codes with bonuses
  const validReferralCodes = {
    'WELCOME2024': { bonus: 100, description: 'Welcome Bonus' },
    'FRIEND50': { bonus: 50, description: 'Friend Referral' },
    'CRYPTO25': { bonus: 25, description: 'Crypto Enthusiast' },
    'EARLY100': { bonus: 100, description: 'Early Adopter' }
  };

  const passwordRequirements = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /[A-Z]/, text: 'One uppercase letter' },
    { regex: /[a-z]/, text: 'One lowercase letter' },
    { regex: /\d/, text: 'One number' },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, text: 'One special character' }
  ];

  useEffect(() => {
    const strength = passwordRequirements?.reduce((acc, req) => {
      return acc + (req?.regex?.test(formData?.password) ? 1 : 0);
    }, 0);
    setFormState(prev => ({ ...prev, passwordStrength: strength }));
  }, [formData?.password]);

  useEffect(() => {
    if (formData?.referralCode) {
      const isValid = validReferralCodes?.[formData?.referralCode?.toUpperCase()];
      setFormState(prev => ({
        ...prev,
        referralValid: !!isValid,
        referralBonus: isValid ? isValid?.bonus : 0
      }));
    } else {
      setFormState(prev => ({
        ...prev,
        referralValid: null,
        referralBonus: 0
      }));
    }
  }, [formData?.referralCode]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific field errors
    if (formState?.errors?.[field]) {
      setFormState(prev => ({
        ...prev,
        errors: { ...prev?.errors, [field]: '' }
      }));
    }
  };

  const validateStep = (stepNumber) => {
    const errors = {};

    if (stepNumber === 1) {
      if (!formData?.email) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
        errors.email = 'Please enter a valid email address';
      }

      if (!formData?.password) {
        errors.password = 'Password is required';
      } else if (formState?.passwordStrength < 3) {
        errors.password = 'Password must meet at least 3 requirements';
      }

      if (!formData?.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    if (stepNumber === 3) {
      if (!formData?.agreeToTerms) {
        errors.agreeToTerms = 'You must agree to the Terms of Service';
      }
      if (!formData?.agreeToPrivacy) {
        errors.agreeToPrivacy = 'You must agree to the Privacy Policy';
      }
    }

    setFormState(prev => ({ ...prev, errors }));
    return Object.keys(errors)?.length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateStep(step)) return;

    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful registration
      const userData = {
        id: Date.now(),
        email: formData?.email,
        name: formData?.email?.split('@')?.[0],
        balance: formState?.referralBonus,
        referralCode: formData?.referralCode,
        createdAt: new Date()?.toISOString(),
        emailVerified: false,
        role: 'user'
      };

      onRegistrationSuccess(userData);
      navigate('/dashboard', { 
        state: { 
          message: 'Registration successful! Please check your email for verification.',
          bonus: formState?.referralBonus 
        }
      });

    } catch (error) {
      setFormState(prev => ({
        ...prev,
        errors: { submit: 'Registration failed. Please try again.' }
      }));
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const getPasswordStrengthColor = () => {
    if (formState?.passwordStrength <= 1) return 'bg-error';
    if (formState?.passwordStrength <= 3) return 'bg-warning';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (formState?.passwordStrength <= 1) return 'Weak';
    if (formState?.passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Create Your Account</h2>
        <p className="text-muted-foreground">Enter your credentials to get started</p>
      </div>

      <Input
        label="Email Address"
        type="email"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        placeholder="Enter your email address"
        error={formState?.errors?.email}
        required
        disabled={formState?.isSubmitting}
      />

      <div className="space-y-2">
        <Input
          label="Password"
          type={formState?.showPassword ? 'text' : 'password'}
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          placeholder="Create a strong password"
          error={formState?.errors?.password}
          required
          disabled={formState?.isSubmitting}
        />
        
        {formData?.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Password strength:</span>
              <span className={`font-medium ${
                formState?.passwordStrength <= 1 ? 'text-error' :
                formState?.passwordStrength <= 3 ? 'text-warning' : 'text-success'
              }`}>
                {getPasswordStrengthText()}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${getPasswordStrengthColor()}`}
                style={{ width: `${(formState?.passwordStrength / 5) * 100}%` }}
              />
            </div>
            <div className="space-y-1">
              {passwordRequirements?.map((req, index) => (
                <div key={index} className="flex items-center space-x-2 text-xs">
                  <Icon
                    name={req?.regex?.test(formData?.password) ? "CheckCircle" : "Circle"}
                    size={12}
                    className={req?.regex?.test(formData?.password) ? 'text-success' : 'text-muted-foreground'}
                  />
                  <span className={req?.regex?.test(formData?.password) ? 'text-success' : 'text-muted-foreground'}>
                    {req?.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Input
        label="Confirm Password"
        type={formState?.showConfirmPassword ? 'text' : 'password'}
        value={formData?.confirmPassword}
        onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
        placeholder="Confirm your password"
        error={formState?.errors?.confirmPassword}
        required
        disabled={formState?.isSubmitting}
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Referral Code</h2>
        <p className="text-muted-foreground">Have a referral code? Enter it to earn bonus tokens!</p>
      </div>

      <div className="space-y-4">
        <Input
          label="Referral Code (Optional)"
          type="text"
          value={formData?.referralCode}
          onChange={(e) => handleInputChange('referralCode', e?.target?.value?.toUpperCase())}
          placeholder="Enter referral code"
          disabled={formState?.isSubmitting}
        />

        {formState?.referralValid === true && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Gift" size={20} className="text-success" />
              <div>
                <p className="font-medium text-success">Valid Referral Code!</p>
                <p className="text-sm text-success/80">
                  You'll receive {formState?.referralBonus} EBNX bonus tokens
                </p>
              </div>
            </div>
          </div>
        )}

        {formState?.referralValid === false && formData?.referralCode && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="AlertCircle" size={20} className="text-error" />
              <div>
                <p className="font-medium text-error">Invalid Referral Code</p>
                <p className="text-sm text-error/80">
                  Please check the code and try again
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-2">Available Bonus Codes:</h3>
          <div className="space-y-2 text-sm">
            {Object.entries(validReferralCodes)?.map(([code, info]) => (
              <div key={code} className="flex justify-between items-center">
                <span className="font-mono text-muted-foreground">{code}</span>
                <span className="text-accent font-medium">{info?.bonus} EBNX</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Terms & Conditions</h2>
        <p className="text-muted-foreground">Please review and accept our terms to continue</p>
      </div>

      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service"
          checked={formData?.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
          error={formState?.errors?.agreeToTerms}
          required
        />

        <Checkbox
          label="I agree to the Privacy Policy"
          checked={formData?.agreeToPrivacy}
          onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
          error={formState?.errors?.agreeToPrivacy}
          required
        />

        <Checkbox
          label="Subscribe to newsletter for updates and promotions"
          checked={formData?.subscribeNewsletter}
          onChange={(e) => handleInputChange('subscribeNewsletter', e?.target?.checked)}
        />
      </div>

      {formState?.referralBonus > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Coins" size={20} className="text-primary" />
            <div>
              <p className="font-medium text-primary">Registration Bonus</p>
              <p className="text-sm text-primary/80">
                You'll receive {formState?.referralBonus} EBNX tokens upon email verification
              </p>
            </div>
          </div>
        </div>
      )}

      {formState?.errors?.submit && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error" />
            <p className="text-error">{formState?.errors?.submit}</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2 mb-8">
        {Array.from({ length: totalSteps }, (_, index) => (
          <React.Fragment key={index}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              index + 1 <= step 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {index + 1 <= step ? (
                <Icon name="Check" size={16} />
              ) : (
                index + 1
              )}
            </div>
            {index < totalSteps - 1 && (
              <div className={`w-8 h-0.5 ${
                index + 1 < step ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Step Content */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {/* Navigation Buttons */}
      <div className="flex space-x-3 pt-6">
        {step > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevStep}
            disabled={formState?.isSubmitting}
            className="flex-1"
          >
            Previous
          </Button>
        )}
        
        {step < totalSteps ? (
          <Button
            type="button"
            onClick={handleNextStep}
            disabled={formState?.isSubmitting}
            className="flex-1"
          >
            Next
          </Button>
        ) : (
          <Button
            type="submit"
            loading={formState?.isSubmitting}
            disabled={!formData?.agreeToTerms || !formData?.agreeToPrivacy}
            className="flex-1"
          >
            Create Account
          </Button>
        )}
      </div>
      {/* Login Link */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
            Sign in here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;