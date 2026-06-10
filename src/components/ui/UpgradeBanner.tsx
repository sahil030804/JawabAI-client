import React from 'react';

interface UpgradeBannerProps {
  message?: string;
  ctaText?: string;
  onUpgrade?: () => void;
  variant?: 'info' | 'warning';
}

export const UpgradeBanner: React.FC<UpgradeBannerProps> = ({
  message = "You're in free mode — upgrade to activate auto-replies",
  ctaText = 'Upgrade Plan',
  onUpgrade,
  variant = 'info',
}) => {
  const variants = {
    info: 'bg-gradient-to-r from-[#25D366]/10 to-emerald-500/10 border-[#25D366]/30',
    warning: 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30',
  };

  return (
    <div className={`px-4 py-3 rounded-xl border ${variants[variant]} mb-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            variant === 'warning' ? 'bg-yellow-500' : 'bg-[#25D366]'
          }`} />
          <p className="text-sm font-medium text-[#0F172A]">{message}</p>
        </div>
        {onUpgrade && (
          <button
            onClick={onUpgrade}
            className="px-4 py-1.5 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#128C7E] transition-colors"
          >
            {ctaText}
          </button>
        )}
      </div>
    </div>
  );
};
