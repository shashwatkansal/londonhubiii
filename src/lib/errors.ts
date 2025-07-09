// Centralized error handling system for better maintainability

export class ApiError extends Error {
  constructor(
    public code: string,
    public message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class AuthError extends ApiError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('AUTH_ERROR', message, details);
    this.name = 'AuthError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('VALIDATION_ERROR', message, details);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends ApiError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('NETWORK_ERROR', message, details);
    this.name = 'NetworkError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`);
    this.name = 'NotFoundError';
  }
}

export class PermissionError extends ApiError {
  constructor(action: string) {
    super('PERMISSION_DENIED', `Permission denied for action: ${action}`);
    this.name = 'PermissionError';
  }
}

export function handleApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }
  
  if (error instanceof Error) {
    return new ApiError('UNKNOWN_ERROR', error.message, { originalError: error });
  }
  
  return new ApiError('UNKNOWN_ERROR', 'An unknown error occurred', { originalError: error });
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unknown error occurred';
}

// Error logging utility
export function logError(error: unknown, context?: string): void {
  const errorInfo = {
    message: getErrorMessage(error),
    context,
    timestamp: new Date().toISOString(),
    ...(isApiError(error) && { code: error.code, details: error.details })
  };
  
  console.error('Error logged:', errorInfo);
  
  // TODO: Integrate with external error monitoring service (e.g., Sentry)
  // Sentry.captureException(error, { extra: errorInfo });
}