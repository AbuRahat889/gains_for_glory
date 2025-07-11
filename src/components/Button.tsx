import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  className?: string;
  link?: string | null;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  link = null,
  variant = "primary",
  size = "md",
  disabled,
}: ButtonProps) {
  const baseClasses = "px-4 py-2  focus:outline-none transition duration-200";
  const variantClasses = {
    primary:
      "bg-[#d05353] text-white px-4 py-2 rounded-md hover:bg-[#b84545] transition-colors",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    outline:
      " text-[#58c0d7] border border-[#58c0d7] text-center text-md px-4 py-1 rounded-[4px] bg-white",
    ghost:
      "border border-secondaryColor text-secondaryColor text-center text-md px-4 py-1 rounded-[4px] bg-dark-ash",
  };
  const sizeClasses = {
    sm: "text-sm px-2 py-1",
    md: "text-md px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  // Render Link if href is provided
  if (link) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={buttonClasses}
        disabled={disabled}
      >
        <Link href={link}>{children}</Link>
      </button>
    );
  }

  // Render button if no href is provided
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
