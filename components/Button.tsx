import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'orange' | 'orange-dark' | 'danger';
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = 'orange',
  disabled = false,
  className = '',
}: ButtonProps) {
  // Si className contient déjà w-full ou flex-1, on ne force pas w-full
  const hasWidthClass = className.includes('w-full') || className.includes('flex-1') || className.includes('w-');
  const widthClasses = hasWidthClass ? '' : 'w-full sm:w-auto';
  
  const baseClasses =
    `${widthClasses} px-4 sm:px-6 py-2.5 sm:py-3 font-gaming font-bold text-sm sm:text-base md:text-lg uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation relative overflow-hidden`;
  
  const variantClasses = {
    orange: 'bg-transparent border-2 border-orange-neon text-orange-neon hover:bg-orange-neon hover:text-dark-bg glow-orange gaming-card-hover',
    'orange-dark': 'bg-transparent border-2 border-orange-deep text-orange-bright hover:bg-orange-deep hover:text-white glow-orange-intense gaming-card-hover',
    danger: 'bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(255,0,0,0.5)]',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'orange' && (
        <span className="absolute inset-0 bg-gradient-orange opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
      )}
    </button>
  );
}
