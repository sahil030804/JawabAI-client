// const API_BASE_URL = 'http://localhost:3120';
const API_BASE_URL = '';

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
  avatarUrl?: string;
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

// WhatsApp OAuth types
export interface AuthUrlResponse {
  success: boolean;
  url: string;
  state: string;
  message?: string;
}

export interface ExchangeTokenRequest {
  code: string;
  state?: string;
}

export interface WhatsAppAccount {
  id: number;
  waba_id: string;
  business_id: string;
  phone_number_id: string;
  webhook_id?: string;
  is_active: boolean;
  token_expires_at: string;
  created_at: string;
}

export interface ExchangeTokenResponse {
  success: boolean;
  account: WhatsAppAccount;
  message?: string;
}

export interface WhatsAppAccountsResponse {
  success: boolean;
  accounts: WhatsAppAccount[];
  message?: string;
}

// Knowledge Base types
export interface KnowledgeDocument {
  id: number;
  original_name: string;
  mime_type: string;
  file_size: number;
  status: 'pending' | 'processing' | 'ready' | 'failed';
  chunk_count: number;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface UploadDocumentResponse {
  success: boolean;
  document: {
    id: number;
    originalName: string;
    status: 'pending' | 'processing' | 'ready' | 'failed';
    fileSize: number;
    createdAt: string;
  };
  message?: string;
}

export interface DocumentListResponse {
  success: boolean;
  documents: KnowledgeDocument[];
  message?: string;
}

export interface DocumentDetailResponse {
  success: boolean;
  document: KnowledgeDocument;
  message?: string;
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

  // Remove Content-Type for FormData (browser sets it with boundary)
  if (options.body instanceof FormData || config.body instanceof FormData) {
    const headers = config.headers as Record<string, string>;
    delete headers['Content-Type'];
  }

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

  // WhatsApp OAuth endpoints
  getAuthUrl: () =>
    apiRequest<AuthUrlResponse>('/meta/auth-url'),

  exchangeToken: (data: ExchangeTokenRequest) =>
    apiRequest<ExchangeTokenResponse>('/meta/exchange-token', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getAccounts: () =>
    apiRequest<WhatsAppAccountsResponse>('/meta/accounts'),

  disconnectAccount: (id: number) =>
    apiRequest<ApiResponse>(`/meta/accounts/${id}`, {
      method: 'DELETE',
    }),

  // Knowledge Base endpoints
  uploadDocument: (file: File, waAccountId?: number) => {
    const formData = new FormData();
    formData.append('file', file);
    if (waAccountId !== undefined) {
      formData.append('waAccountId', String(waAccountId));
    }

    return apiRequest<UploadDocumentResponse>('/knowledge-base/upload', {
      method: 'POST',
      body: formData,
    });
  },

  listDocuments: () =>
    apiRequest<DocumentListResponse>('/knowledge-base/documents'),

  getDocument: (id: number) =>
    apiRequest<DocumentDetailResponse>(`/knowledge-base/documents/${id}`),

  deleteDocument: (id: number) =>
    apiRequest<ApiResponse>(`/knowledge-base/documents/${id}`, {
      method: 'DELETE',
    }),

  // System endpoints
  healthCheck: () =>
    apiRequest<ApiResponse>('/health-check'),
};

export { ApiError };
