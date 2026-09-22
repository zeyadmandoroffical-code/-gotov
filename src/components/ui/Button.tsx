// src/components/ui/Button.tsx
import React from 'react';

export type ButtonVariant = 'primary' | 'white' | 'deep' | 'tint' | 'tint-strong';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  asAnchor = false,
  href,
  target,
  rel,
  className = '',
  children,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[var(--primary)] text-white hover:bg-[#48209e]';
      case 'white':
        return 'bg-white text-[var(--deep)] hover:bg-[#fbf9ff]';
      case 'deep':
        return 'bg-[var(--deep)] text-white hover:bg-[#2e056e]';
      case 'tint-strong':
        return 'bg-[var(--tint-strong)] text-[var(--ink)] hover:bg-[#cbbaed]';
      case 'tint':
        return 'bg-[var(--tint)] text-[var(--ink)] hover:bg-[#ded1f7]';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-7 py-3.5 text-lg';
      case 'md':
      default:
        return 'px-5 py-2.5 text-[15px]';
    }
  };

  const baseStyles =
    'inline-flex items-center justify-center font-heading font-bold rounded-2xl pressable-btn select-none';

  const combinedClass = `${baseStyles} ${getVariantStyles()} ${getSizeStyles()} ${className}`;

  if (asAnchor && href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={combinedClass}
        onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
};
