import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered';
}

export const Card: React.FC<CardProps> = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: 'bg-white rounded-xl shadow-sm',
    elevated: 'bg-white rounded-xl shadow-lg',
    bordered: 'bg-white rounded-xl border border-gray-200',
  };
  
  return (
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`p-6 border-b border-gray-100 ${className}`}>
    {children}
  </div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`p-6 border-t border-gray-100 ${className}`}>
    {children}
  </div>
);
