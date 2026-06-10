'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';

interface SignupFormProps {
  onSuccess?: () => void;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    emailExists?: string;
    emailAvailable?: string;
    acceptTerms?: string;
  }>({});
  const [emailChecking, setEmailChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup, error } = useAuth();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{9,14}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'acceptTerms' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear email messages when email changes
    if (field === 'email') {
      setErrors(prev => ({ 
        ...prev, 
        emailExists: undefined,
        emailAvailable: undefined
      }));
      
      // Clear existing debounce
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      
      // Set new debounce for email checking (500ms delay)
      const emailValue = e.target.value;
      if (emailValue && /\S+@\S+\.\S+/.test(emailValue)) {
        debounceRef.current = setTimeout(() => {
          checkEmailExists(emailValue);
        }, 500);
      }
    }
  };

  const checkEmailExists = async (email: string) => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return;
    }

    try {
      setEmailChecking(true);
      const response = await api.checkEmail(email);
      
      if (response.success && response.exists) {
        setErrors(prev => ({ 
          ...prev, 
          emailExists: 'This email is already registered. Please use a different email address or try logging in.',
          emailAvailable: undefined
        }));
      } else {
        setErrors(prev => ({ 
          ...prev, 
          emailExists: undefined,
          emailAvailable: 'Email is available! ✓'
        }));
      }
    } catch (err) {
      // If email check fails, don't block signup
      console.error('Email check failed:', err);
      setErrors(prev => ({ 
        ...prev, 
        emailExists: undefined,
        emailAvailable: undefined
      }));
    } finally {
      setEmailChecking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      await signup(
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.firstName,
        formData.lastName,
        formData.phone,
        formData.acceptTerms
      );
      onSuccess?.();
    } catch (err) {
      // Error is handled by useAuth hook
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-gray-900 placeholder-gray-400"
              placeholder="First Name"
              disabled={isSubmitting}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-gray-900 placeholder-gray-400"
              placeholder="Last Name"
              disabled={isSubmitting}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="relative">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors border-gray-300 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400 pr-10"
            placeholder="Enter your email"
            disabled={isSubmitting}
          />
          {emailChecking && (
            <div className="absolute right-3 top-3">
              <svg className="animate-spin h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
          {errors.emailExists && (
            <p className="mt-1 text-sm text-red-600">{errors.emailExists}</p>
          )}
          {errors.emailAvailable && (
            <p className="mt-1 text-sm text-green-600 font-medium">{errors.emailAvailable}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange('phone')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-gray-900 placeholder-gray-400"
            placeholder="+91 98765 43210"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange('password')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-gray-900 placeholder-gray-400"
            placeholder="At least 6 characters"
            disabled={isSubmitting}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-gray-900 placeholder-gray-400"
            placeholder="Confirm your password"
            disabled={isSubmitting}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        <div>
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange('acceptTerms')}
              className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
              disabled={isSubmitting}
            />
            <span className="text-sm text-gray-700">
              I accept the{' '}
              <a href="/terms" className="text-green-600 hover:text-green-700 underline">
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-green-600 hover:text-green-700 underline">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || emailChecking || !!errors.emailExists}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
