"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export function Button({
                           children,
                           variant = 'primary',
                           size = 'md',
                           className = '',
                           ...props
                       }: ButtonProps) {
    const baseClasses = "font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
        primary: "bg-[rgba(246,108,105,0.8)] hover:bg-[rgba(246,108,105,0.9)] text-white",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        outline: "border-2 border-[rgba(246,108,105,0.8)] text-[rgba(246,108,105,0.8)] hover:bg-[rgba(246,108,105,0.8)] hover:text-white"
    };
    const sizeClasses = {
        sm: "py-2 px-3 text-sm",
        md: "py-3 px-4 text-base",
        lg: "py-4 px-4 text-xl"
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}