'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { api, User, WhatsAppAccount } from '@/lib/api';
import { ApiError } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  whatsappAccounts: WhatsAppAccount[];
  activeWhatsappAccountId: number | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, confirmPassword: string, firstName: string, lastName: string, phone: string, acceptTerms: boolean) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [whatsappAccounts, setWhatsappAccounts] = useState<WhatsAppAccount[]>([]);
  const [activeWhatsappAccountId, setActiveWhatsappAccountId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  console.log('AuthProvider - User:', user, 'Loading:', loading); // Debug log

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.getPrivileges();
        console.log('AuthProvider - getPrivileges response:', response); // Debug log
        if (response.success && response.data) {
          setUser(response.data.user);
          setWhatsappAccounts(response.data.whatsappAccounts);
          setActiveWhatsappAccountId(response.data.activeWhatsappAccountId);
        }
      } catch (err) {
        console.log('AuthProvider - No authenticated user found'); // Debug log
        // User is not authenticated, that's ok
      } finally {
        setLoading(false);
        console.log('AuthProvider - Auth check completed'); // Debug log
      }
    };

    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.getPrivileges();
      if (response.success && response.data) {
        setUser(response.data.user);
        setWhatsappAccounts(response.data.whatsappAccounts);
        setActiveWhatsappAccountId(response.data.activeWhatsappAccountId);
      } else {
        setUser(null);
        setWhatsappAccounts([]);
        setActiveWhatsappAccountId(null);
      }
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setUser(null);
        setWhatsappAccounts([]);
        setActiveWhatsappAccountId(null);
      } else {
        setError(err instanceof Error ? err.message : 'Failed to check authentication');
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.login({ email, password });
      
      console.log('Login response:', response); // Debug log
      console.log('User data from response:', response.user); // Debug log
      
      if (response.success && response.user) {
        setUser(response.user);
        // Force redirect with a small delay to ensure state is set
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 100);
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, confirmPassword: string, firstName: string, lastName: string, phone: string, acceptTerms: boolean) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.signup({ email, password, firstName, lastName, phone, acceptTerms, confirmPassword });
      
      if (response.success && response.user) {
        setUser(response.user);
        // Force redirect with a small delay to ensure state is set
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 100);
      } else {
        setError(response.message || 'Signup failed');
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Signup failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
      router.push('/login');
    } catch (err) {
      // Even if logout fails, clear local state
      setUser(null);
      router.push('/login');
    }
  };

  const value: AuthContextType = {
    user,
    whatsappAccounts,
    activeWhatsappAccountId,
    loading,
    error,
    login,
    signup,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
