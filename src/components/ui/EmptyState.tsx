import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => (
  <div className={`flex flex-col items-center justify-center text-center py-12 px-4 ${className}`}>
    {icon && (
      <div className="w-16 h-16 mb-4 flex items-center justify-center text-gray-400">
        {icon}
      </div>
    )}
    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{title}</h3>
    {description && (
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>
    )}
    {action && <div>{action}</div>}
  </div>
);
