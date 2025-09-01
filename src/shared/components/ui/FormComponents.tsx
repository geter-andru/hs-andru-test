'use client';

import React, { ReactNode, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

// Form Container
interface FormProps {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, className = '' }) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`}>
      {children}
    </form>
  );
};

// Form Field Container
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  children: ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  helpText,
  children,
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-white">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-400 flex items-center space-x-1">
          <span>⚠️</span>
          <span>{error}</span>
        </p>
      )}
      {helpText && !error && (
        <p className="text-sm text-slate-400">{helpText}</p>
      )}
    </div>
  );
};

// Input Component
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  size = 'md',
  error = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };

  const baseClasses = `
    w-full rounded-lg border transition-all duration-200
    bg-slate-700 text-white placeholder-slate-400
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    default: error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
      : 'border-slate-600 focus:border-blue-500 focus:ring-blue-500/50',
    outlined: error
      ? 'border-2 border-red-500 bg-transparent focus:border-red-500 focus:ring-red-500/50'
      : 'border-2 border-slate-500 bg-transparent focus:border-blue-500 focus:ring-blue-500/50',
    filled: error
      ? 'border-slate-600 bg-slate-800 focus:border-red-500 focus:ring-red-500/50'
      : 'border-slate-600 bg-slate-800 focus:border-blue-500 focus:ring-blue-500/50'
  };

  return (
    <div className="relative">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
          {leftIcon}
        </div>
      )}
      <input
        className={`
          ${baseClasses}
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${leftIcon ? 'pl-10' : ''}
          ${rightIcon ? 'pr-10' : ''}
          ${className}
        `}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
          {rightIcon}
        </div>
      )}
    </div>
  );
};

// Select Component
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  variant = 'default',
  size = 'md',
  error = false,
  children,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };

  const baseClasses = `
    w-full rounded-lg border transition-all duration-200
    bg-slate-700 text-white
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
    disabled:opacity-50 disabled:cursor-not-allowed
    appearance-none cursor-pointer
  `;

  const variantClasses = {
    default: error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
      : 'border-slate-600 focus:border-blue-500 focus:ring-blue-500/50',
    outlined: error
      ? 'border-2 border-red-500 bg-transparent focus:border-red-500 focus:ring-red-500/50'
      : 'border-2 border-slate-500 bg-transparent focus:border-blue-500 focus:ring-blue-500/50',
    filled: error
      ? 'border-slate-600 bg-slate-800 focus:border-red-500 focus:ring-red-500/50'
      : 'border-slate-600 bg-slate-800 focus:border-blue-500 focus:ring-blue-500/50'
  };

  return (
    <div className="relative">
      <select
        className={`
          ${baseClasses}
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

// Textarea Component
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea: React.FC<TextareaProps> = ({
  variant = 'default',
  size = 'md',
  error = false,
  resize = 'vertical',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };

  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize'
  };

  const baseClasses = `
    w-full rounded-lg border transition-all duration-200
    bg-slate-700 text-white placeholder-slate-400
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    default: error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
      : 'border-slate-600 focus:border-blue-500 focus:ring-blue-500/50',
    outlined: error
      ? 'border-2 border-red-500 bg-transparent focus:border-red-500 focus:ring-red-500/50'
      : 'border-2 border-slate-500 bg-transparent focus:border-blue-500 focus:ring-blue-500/50',
    filled: error
      ? 'border-slate-600 bg-slate-800 focus:border-red-500 focus:ring-red-500/50'
      : 'border-slate-600 bg-slate-800 focus:border-blue-500 focus:ring-blue-500/50'
  };

  return (
    <textarea
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${resizeClasses[resize]}
        ${className}
      `}
      {...props}
    />
  );
};

// Form Actions
interface FormActionsProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right' | 'between';
  className?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  children,
  align = 'right',
  className = ''
}) => {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between'
  };

  return (
    <div className={`flex items-center space-x-3 ${alignClasses[align]} ${className}`}>
      {children}
    </div>
  );
};

// Form Group for organizing related fields
interface FormGroupProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  title,
  description,
  children,
  className = ''
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <div className="border-b border-slate-700 pb-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {description && (
            <p className="text-sm text-slate-400 mt-1">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

// Export all components as default
export default {
  Form,
  FormField,
  FormGroup,
  FormActions,
  Input,
  Select,
  Textarea
};