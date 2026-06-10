'use client';

import React, { useState } from 'react';

interface DisabledButtonProps {
  children: React.ReactNode;
  tooltip?: string;
  onClick?: () => void;
  className?: string;
}

export const DisabledButton: React.FC<DisabledButtonProps> = ({
  children,
  tooltip = 'Available in paid plans',
  onClick,
  className = '',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        disabled
        className={`px-4 py-2 bg-gray-100 text-gray-400 rounded-xl font-medium cursor-not-allowed ${className}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={onClick}
      >
        {children}
      </button>
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#0F172A] text-white text-xs rounded-lg whitespace-nowrap z-10">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0F172A]" />
        </div>
      )}
    </div>
  );
};
