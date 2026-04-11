const API_BASE_URL = 'http://localhost:3120';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  user?: T;
  data?: T;
}

export interface EmailCheckResponse {
  success: boolean;
  message: string;
  email: string;
  exists: boolean;
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  phone: string;
  isActive: boolean;
  role: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
  phone: string;
  acceptTerms: boolean;
  confirmPassword: string;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: 'Something went wrong' };
      }
      
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof Error) {
      throw new ApiError(error.message, 0);
    }
    
    throw new ApiError('An unexpected error occurred', 0);
  }
}

export const api = {
  // Auth endpoints
  login: (credentials: LoginCredentials) =>
    apiRequest<ApiResponse<User>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  signup: (credentials: SignupCredentials) =>
    apiRequest<ApiResponse<User>>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  logout: () =>
    apiRequest<ApiResponse>('/auth/logout', {
      method: 'POST',
    }),

  getProfile: () =>
    apiRequest<ApiResponse<User>>('/auth/profile'),

  checkEmail: (email: string) =>
    apiRequest<EmailCheckResponse>(`/auth/check-email/${email}`),

  // System endpoints
  healthCheck: () =>
    apiRequest<ApiResponse>('/health-check'),
};

export { ApiError };
