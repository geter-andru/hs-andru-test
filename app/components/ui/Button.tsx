'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

/**
 * Button - Advanced button component system
 * 
 * Features:
 * - Multiple variants (primary, secondary, outline, ghost, link, danger)
 * - Different sizes (xs, sm, md, lg, xl)
 * - Loading states with spinners
 * - Icon support (left and right)
 * - Disabled states
 * - Full width option
 * - Custom color themes
 * - Accessibility compliant
 * - Animation effects
 * - Button groups
 */

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger' | 'success' | 'warning';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
  animate?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  rounded = false,
  animate = true,
  disabled,
  className = '',
  children,
  ...props
}, ref) => {
  
  // Base button styles
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
    disabled:cursor-not-allowed disabled:opacity-50
    ${fullWidth ? 'w-full' : ''}
    ${rounded ? 'rounded-full' : 'rounded-lg'}
  `;

  // Size configurations
  const sizeStyles = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
    xl: 'px-6 py-3.5 text-lg'
  };

  // Variant configurations
  const variantStyles = {
    primary: `
      bg-blue-500 text-white border border-blue-500
      hover:bg-blue-600 hover:border-blue-600
      focus:ring-blue-500/50
      active:bg-blue-700
    `,
    secondary: `
      bg-gray-700 text-white border border-gray-700
      hover:bg-gray-600 hover:border-gray-600
      focus:ring-gray-500/50
      active:bg-gray-800
    `,
    outline: `
      bg-transparent text-gray-300 border border-gray-600
      hover:bg-gray-800 hover:text-white hover:border-gray-500
      focus:ring-gray-500/50
      active:bg-gray-700
    `,
    ghost: `
      bg-transparent text-gray-300 border border-transparent
      hover:bg-gray-800 hover:text-white
      focus:ring-gray-500/50
      active:bg-gray-700
    `,
    link: `
      bg-transparent text-blue-400 border border-transparent
      hover:text-blue-300 hover:underline
      focus:ring-blue-500/50
      active:text-blue-500
      p-0 h-auto font-normal
    `,
    danger: `
      bg-red-500 text-white border border-red-500
      hover:bg-red-600 hover:border-red-600
      focus:ring-red-500/50
      active:bg-red-700
    `,
    success: `
      bg-green-500 text-white border border-green-500
      hover:bg-green-600 hover:border-green-600
      focus:ring-green-500/50
      active:bg-green-700
    `,
    warning: `
      bg-yellow-500 text-white border border-yellow-500
      hover:bg-yellow-600 hover:border-yellow-600
      focus:ring-yellow-500/50
      active:bg-yellow-700
    `
  };

  // Loading spinner size based on button size
  const spinnerSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-5 h-5'
  };

  const combinedClassName = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `;

  const content = (
    <>
      {isLoading ? (
        <Loader2 className={`${spinnerSizes[size]} animate-spin`} />
      ) : leftIcon ? (
        <span className="flex-shrink-0">{leftIcon}</span>
      ) : null}
      
      <span className={isLoading ? 'opacity-70' : ''}>
        {isLoading && loadingText ? loadingText : children}
      </span>
      
      {!isLoading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </>
  );

  if (animate && !disabled && !isLoading) {
    return (
      <motion.button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || isLoading}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        {...props}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <button
      ref={ref}
      className={combinedClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

// Icon Button Component
export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'leftIcon' | 'rightIcon'> {
  icon: React.ReactNode;
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({
  icon,
  size = 'md',
  variant = 'ghost',
  rounded = true,
  className = '',
  ...props
}, ref) => {
  // Icon button specific sizing (square buttons)
  const iconSizeStyles = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14'
  };

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      rounded={rounded}
      className={`${iconSizeStyles[size]} p-0 ${className}`}
      {...props}
    >
      {icon}
    </Button>
  );
});

IconButton.displayName = 'IconButton';

// Button Group Component
export interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  size = 'md',
  variant = 'secondary',
  fullWidth = false,
  className = ''
}) => {
  const baseStyles = `
    inline-flex
    ${orientation === 'vertical' ? 'flex-col' : 'flex-row'}
    ${fullWidth ? 'w-full' : ''}
  `;

  return (
    <div className={`${baseStyles} ${className}`} role="group">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const isFirst = index === 0;
          const isLast = index === React.Children.count(children) - 1;
          
          const groupClassName = orientation === 'horizontal'
            ? `
                ${!isFirst ? '-ml-px' : ''}
                ${!isFirst && !isLast ? 'rounded-none' : ''}
                ${isFirst && !isLast ? 'rounded-r-none' : ''}
                ${isLast && !isFirst ? 'rounded-l-none' : ''}
              `
            : `
                ${!isFirst ? '-mt-px' : ''}
                ${!isFirst && !isLast ? 'rounded-none' : ''}
                ${isFirst && !isLast ? 'rounded-b-none' : ''}
                ${isLast && !isFirst ? 'rounded-t-none' : ''}
              `;

          return React.cloneElement(child, {
            size: child.props.size || size,
            variant: child.props.variant || variant,
            fullWidth: fullWidth,
            className: `${child.props.className || ''} ${groupClassName}`.trim()
          });
        }
        return child;
      })}
    </div>
  );
};

// Toggle Button Component
export interface ToggleButtonProps extends Omit<ButtonProps, 'variant'> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  pressedVariant?: ButtonVariant;
  unpressedVariant?: ButtonVariant;
}

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(({
  pressed = false,
  onPressedChange,
  pressedVariant = 'primary',
  unpressedVariant = 'outline',
  onClick,
  children,
  ...props
}, ref) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPressedChange?.(!pressed);
    onClick?.(event);
  };

  return (
    <Button
      ref={ref}
      variant={pressed ? pressedVariant : unpressedVariant}
      onClick={handleClick}
      aria-pressed={pressed}
      {...props}
    >
      {children}
    </Button>
  );
});

ToggleButton.displayName = 'ToggleButton';

// Floating Action Button Component
export interface FloatingActionButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
  size?: 'md' | 'lg';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  icon: React.ReactNode;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  size = 'lg',
  position = 'bottom-right',
  icon,
  className = '',
  ...props
}) => {
  const positionStyles = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6'
  };

  const fabSizes = {
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  return (
    <Button
      variant="primary"
      rounded={true}
      className={`
        ${positionStyles[position]}
        ${fabSizes[size]}
        p-0 shadow-lg hover:shadow-xl z-50
        ${className}
      `}
      animate={true}
      {...props}
    >
      {icon}
    </Button>
  );
};

export default Button;