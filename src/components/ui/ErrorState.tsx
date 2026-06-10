import React from 'react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  className = '',
}) => (
  <div className={`flex flex-col items-center justify-center text-center py-12 px-4 ${className}`}>
    <div className="w-16 h-16 mb-4 flex items-center justify-center text-red-500">
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{title}</h3>
    <p className="text-gray-600 mb-6 max-w-md">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-[#25D366] text-white rounded-xl hover:bg-[#128C7E] transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);
