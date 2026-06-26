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
  id: string;
  email: string;
  fullName: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  role: string;
  status: string;
  plan: string;
  onboardingCompleted?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
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
  display_phone_number?: string;
  webhook_id?: string;
  is_active: boolean;
  auto_reply_enabled: boolean;
  token_expires_at: string;
  created_at: string;
}

export interface ExchangeTokenResponse {
  success: boolean;
  account: WhatsAppAccount;
  message?: string;
}

// Embedded Signup (Coexistence)
export interface EmbeddedSignupConfig {
  appId: string;
  configId: string;
  graphApiVersion: string;
  featureType: string;
  configured: boolean;
}

export interface EmbeddedSignupConfigResponse {
  success: boolean;
  config: EmbeddedSignupConfig;
  message?: string;
}

export interface EmbeddedSignupRequest {
  code: string;
  wabaId: string;
  phoneNumberId?: string;
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

// Webhook debug types
export interface WebhookEventItem {
  id: number;
  object: string | null;
  field: string | null;
  phone_number_id: string | null;
  from_number: string | null;
  wa_message_id: string | null;
  message_type: string | null;
  matched_account_id: number | null;
  direction: string;
  processing_status: string;
  signature_valid: boolean | null;
  payload: any;
  error_message: string | null;
  created_at: string;
}

export interface WebhookEventsResponse {
  success: boolean;
  events: WebhookEventItem[];
  message?: string;
}

// Business profile + agent persona
export interface BusinessProfileData {
  user_id?: string;
  business_name: string | null;
  industry: string | null;
  description: string | null;
  website: string | null;
  assistant_name: string;
  tone: string;
  fallback_message: string | null;
  business_hours: string | null;
  escalation_note: string | null;
}

export interface BusinessProfileResponse {
  success: boolean;
  profile: BusinessProfileData;
  message?: string;
}

export interface AiTestResponse {
  success: boolean;
  reply: string;
  usedKnowledge: boolean;
  chunkCount: number;
  hasAccount: boolean;
  message?: string;
}

// Conversations
export interface ConversationListItem {
  id: number;
  wa_account_id: number;
  customer_name: string | null;
  customer_phone: string;
  unread_count: number;
  last_message: string | null;
  last_message_role: 'user' | 'assistant' | null;
  last_message_at: string | null;
}

export interface ConversationsListResponse {
  success: boolean;
  conversations: ConversationListItem[];
  message?: string;
}

export interface ConversationMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  wa_message_id: string | null;
  created_at: string;
}

export interface ConversationMessagesResponse {
  success: boolean;
  conversation: {
    id: number;
    customer_name: string | null;
    customer_phone: string;
    wa_account_id: number;
  };
  messages: ConversationMessage[];
  message?: string;
}

// User Privileges types
export interface UserPrivilegesData {
  user: User;
  whatsappAccounts: WhatsAppAccount[];
  activeWhatsappAccountId: number | null;
}

export interface UserPrivilegesResponse {
  success: boolean;
  data: UserPrivilegesData;
}

export interface UsageData {
  aiRepliesUsed: number;
  aiRepliesLimit: number;
  documentsUploaded: number;
  documentsLimit: number;
}

export interface UsageResponse {
  success: boolean;
  usage: UsageData;
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

  updateProfile: (data: UpdateProfileData) =>
    apiRequest<ApiResponse<User>>('/user/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

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

  getEmbeddedSignupConfig: () =>
    apiRequest<EmbeddedSignupConfigResponse>('/meta/embedded-signup/config'),

  embeddedSignup: (data: EmbeddedSignupRequest) =>
    apiRequest<ExchangeTokenResponse>('/meta/embedded-signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getAccounts: () =>
    apiRequest<WhatsAppAccountsResponse>('/meta/accounts'),

  disconnectAccount: (id: number) =>
    apiRequest<ApiResponse>(`/meta/accounts/${id}`, {
      method: 'DELETE',
    }),

  // Webhook debug: recent inbound events (diagnose delivery vs. silent drops)
  getWebhookEvents: (limit = 50) =>
    apiRequest<WebhookEventsResponse>(`/meta/webhook/events?limit=${limit}`),

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

  toggleAutoReply: (id: number, enabled: boolean) =>
    apiRequest<{ success: boolean; auto_reply_enabled: boolean; message?: string }>(`/meta/accounts/${id}/auto-reply`, {
      method: 'PATCH',
      body: JSON.stringify({ enabled }),
    }),

  // Business profile + agent persona
  getBusinessProfile: () =>
    apiRequest<BusinessProfileResponse>('/user/business-profile'),

  updateBusinessProfile: (data: Partial<BusinessProfileData>) =>
    apiRequest<BusinessProfileResponse>('/user/business-profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  testAI: (message: string) =>
    apiRequest<AiTestResponse>('/user/ai-test', {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),

  // Conversations
  getConversations: () =>
    apiRequest<ConversationsListResponse>('/conversations'),

  getConversationMessages: (id: number) =>
    apiRequest<ConversationMessagesResponse>(`/conversations/${id}/messages`),

  // User Privileges
  getPrivileges: () =>
    apiRequest<UserPrivilegesResponse>('/user/privileges'),

  // Usage
  getUsage: () =>
    apiRequest<UsageResponse>('/user/usage'),

  // System endpoints
  healthCheck: () =>
    apiRequest<ApiResponse>('/health-check'),
};

export { ApiError };
