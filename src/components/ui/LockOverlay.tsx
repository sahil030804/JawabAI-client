import React from 'react';

interface LockOverlayProps {
  children: React.ReactNode;
  message?: string;
  onUnlock?: () => void;
}

export const LockOverlay: React.FC<LockOverlayProps> = ({
  children,
  message = 'Upgrade to unlock this feature',
  onUnlock,
}) => (
  <div className="relative">
    <div className="filter blur-sm pointer-events-none select-none">
      {children}
    </div>
    <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-xl">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-[#25D366]/10 rounded-full">
          <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
          </svg>
        </div>
        <p className="text-sm font-medium text-[#0F172A] mb-3">{message}</p>
        {onUnlock && (
          <button
            onClick={onUnlock}
            className="px-4 py-2 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#128C7E] transition-colors"
          >
            Upgrade Now
          </button>
        )}
      </div>
    </div>
  </div>
);
