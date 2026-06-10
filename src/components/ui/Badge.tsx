import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, { container: string; dot: string }> = {
  success: {
    container: 'bg-green-50 text-green-700 border-green-200',
    dot: 'bg-green-500',
  },
  warning: {
    container: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    dot: 'bg-yellow-500',
  },
  error: {
    container: 'bg-red-50 text-red-700 border-red-200',
    dot: 'bg-red-500',
  },
  info: {
    container: 'bg-blue-50 text-blue-700 border-blue-200',
    dot: 'bg-blue-500',
  },
  neutral: {
    container: 'bg-gray-100 text-gray-700 border-gray-200',
    dot: 'bg-gray-400',
  },
};

const statusMap: Record<string, BadgeVariant> = {
  ready: 'success',
  processing: 'warning',
  pending: 'info',
  failed: 'error',
  active: 'success',
  inactive: 'neutral',
  disconnected: 'neutral',
  connected: 'success',
  connecting: 'warning',
};

export function getStatusVariant(status: string): BadgeVariant {
  return statusMap[status.toLowerCase()] || 'neutral';
}

function formatStatusLabel(status: string): string {
  return status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  className = '',
  size = 'sm',
}) => {
  const styles = variantStyles[variant];
  const sizeStyles = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      className={`inline-flex items-center space-x-1.5 border rounded-full font-medium ${sizeStyles} ${styles.container} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
      <span>{typeof children === 'string' ? formatStatusLabel(children as string) : children}</span>
    </span>
  );
};

export const StatusBadge: React.FC<{ status: string; className?: string }> = ({
  status,
  className,
}) => (
  <Badge variant={getStatusVariant(status)} className={className}>
    {status}
  </Badge>
);
