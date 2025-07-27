'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiRefreshCw, FiHome, FiMail } from 'react-icons/fi';
import Link from 'next/link';
import { HUB_CONFIG } from '@/lib/settings';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

class AdvancedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({ errorInfo });
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo);
    }
  }

  logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // Implement your error logging service here
    // Example: Sentry, LogRocket, etc.
    console.log('Logging error to service:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
      url: typeof window !== 'undefined' ? window.location.href : 'Server',
    });
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: this.state.retryCount + 1,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      const { error, errorInfo, retryCount } = this.state;
      const { showDetails = process.env.NODE_ENV === 'development' } = this.props;

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
              <div className="flex items-center space-x-3">
                <FiAlertTriangle className="w-8 h-8" />
                <h1 className="text-2xl font-bold">Oops! Something went wrong</h1>
              </div>
            </div>

            <div className="p-8">
              <p className="text-gray-700 mb-6 text-lg">
                We&apos;re sorry, but something unexpected happened. The error has been logged and we&apos;ll look into it.
              </p>

              {retryCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <p className="text-yellow-800">
                    Retry attempt {retryCount} failed. If the problem persists, please contact support.
                  </p>
                </motion.div>
              )}

              {showDetails && error && (
                <details className="mb-6">
                  <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800 transition-colors">
                    Show error details (for developers)
                  </summary>
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg overflow-auto">
                    <h3 className="font-semibold text-red-600 mb-2">{error.message}</h3>
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                      {error.stack}
                    </pre>
                    {errorInfo && (
                      <>
                        <h4 className="font-semibold mt-4 mb-2">Component Stack:</h4>
                        <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                          {errorInfo.componentStack}
                        </pre>
                      </>
                    )}
                  </div>
                </details>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={this.handleReset}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <FiRefreshCw className="w-5 h-5" />
                  Try Again
                </button>

                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <FiHome className="w-5 h-5" />
                  Go Home
                </Link>

                <a
                  href={`mailto:${HUB_CONFIG.EMAIL_ADDRESS}?subject=Error Report&body=I encountered an error on your website.%0A%0AError: ${error?.message || 'Unknown error'}%0A%0APlease describe what you were doing when the error occurred:`}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <FiMail className="w-5 h-5" />
                  Report Issue
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AdvancedErrorBoundary;