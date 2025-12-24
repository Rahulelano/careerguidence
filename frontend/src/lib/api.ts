// API utility for making requests to the backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      console.log('API Request to:', url);

      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      // Add authorization header if token exists
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      const response = await fetch(url, config);
      console.log('API Response status:', response.status);

      // Check if response is null or undefined
      if (!response) {
        return {
          success: false,
          error: 'No response received from server',
        };
      }

      let data;
      try {
        data = await response.json();
        console.log('API Response data:', data);
      } catch (parseError) {
        console.error('Parse error:', parseError);
        return {
          success: false,
          error: 'Invalid response format from server',
        };
      }

      if (!response.ok) {
        console.error('HTTP Error:', response.status, data);
        return {
          success: false,
          error: data?.message || `HTTP error! status: ${response.status}`,
        };
      }

      // Handle both response formats: direct data and wrapped response
      // For backend APIs that return data directly without success wrapper
      if (data.blogs !== undefined || data.blog !== undefined || data.message !== undefined) {
        return {
          success: true,
          data: data as T,
        };
      }

      // For wrapped responses (e.g., { success: true, data: {...} })
      if (data.success !== undefined) {
        return data as ApiResponse<T>;
      }

      // Default case - treat direct data as success
      return {
        success: true,
        data: data as T,
      };
    } catch (error) {
      console.error('Network error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Simple cache utility for API responses
const cache = new Map<string, { data: unknown; timestamp: number; ttl: number }>();

const getCacheKey = (endpoint: string, options: RequestInit = {}) => {
  return `${options.method || 'GET'}:${endpoint}:${JSON.stringify(options.body || {})}`;
};

const isCacheValid = (timestamp: number, ttl: number) => {
  return Date.now() - timestamp < ttl;
};

// Export a configured instance
export const apiClient = new ApiClient(API_BASE_URL);

// Enhanced API client with caching
export class CachedApiClient extends ApiClient {
  private defaultTTL: number;

  constructor(baseURL: string, defaultTTL = 5 * 60 * 1000) { // 5 minutes default
    super(baseURL);
    this.defaultTTL = defaultTTL;
  }

  async get<T>(endpoint: string, useCache = true, ttl?: number): Promise<ApiResponse<T>> {
    if (useCache) {
      const cacheKey = getCacheKey(endpoint, { method: 'GET' });
      const cached = cache.get(cacheKey);

      if (cached && isCacheValid(cached.timestamp, ttl || this.defaultTTL)) {
        return { success: true, data: cached.data as T };
      }
    }

    const response = await super.get<T>(endpoint);

    if (response.success && useCache) {
      const cacheKey = getCacheKey(endpoint, { method: 'GET' });
      cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
        ttl: ttl || this.defaultTTL
      });
    }

    return response;
  }

  clearCache() {
    cache.clear();
  }
}

// Export cached instance for blog data (longer cache time)
export const cachedApiClient = new CachedApiClient(API_BASE_URL, 10 * 60 * 1000); // 10 minutes for blog data

// Export the class for custom instances if needed
export { ApiClient };