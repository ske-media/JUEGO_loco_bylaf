import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'cyan' | 'magenta' | 'danger';
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = 'cyan',
  disabled = false,
  className = '',
}: ButtonProps) {
  // Si className contient déjà w-full ou flex-1, on ne force pas w-full
  const hasWidthClass = className.includes('w-full') || className.includes('flex-1') || className.includes('w-');
  const widthClasses = hasWidthClass ? '' : 'w-full sm:w-auto';
  
  const baseClasses =
    `${widthClasses} px-4 sm:px-6 py-2.5 sm:py-3 font-bold text-sm sm:text-base md:text-lg uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation`;
  
  const variantClasses = {
    cyan: 'bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark-bg glow-cyan',
    magenta: 'bg-transparent border-2 border-neon-magenta text-neon-magenta hover:bg-neon-magenta hover:text-dark-bg glow-magenta',
    danger: 'bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
