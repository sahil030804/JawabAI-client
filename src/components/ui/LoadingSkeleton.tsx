import React from 'react';

export const LoadingSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

export const TextSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <LoadingSkeleton className={`h-4 ${className}`} />
);

export const CardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <LoadingSkeleton className="h-6 w-3/4 mb-4" />
    <LoadingSkeleton className="h-4 w-full mb-2" />
    <LoadingSkeleton className="h-4 w-5/6 mb-4" />
    <LoadingSkeleton className="h-10 w-32" />
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <LoadingSkeleton className="h-10 w-10 rounded-full" />
        <LoadingSkeleton className="h-4 flex-1" />
        <LoadingSkeleton className="h-4 w-24" />
      </div>
    ))}
  </div>
);
