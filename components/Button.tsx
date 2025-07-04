"use client";

import { cn } from "@/lib/utils";

type ButtonProps = {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

function Button({
  variant,
  children,
  className,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  const defaultClasses =
    "w-fit rounded-[16px] cursor-pointer font-[500] transition-all duration-300";

  const variantClasses = {
    primary:
      "bg-primary text-white text-lg md:text-xl px-8 md:px-16 py-2 md:py-5 hover:bg-white hover:text-primary border-2 border-primary",
    secondary:
      "border-2 border-primary text-primary bg-transparent text-base md:text-xl px-6 md:px-8 py-2 hover:bg-primary hover:text-white",
  };
  return (
    <button
      className={cn(defaultClasses, variantClasses[variant], className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
