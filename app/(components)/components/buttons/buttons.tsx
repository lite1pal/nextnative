import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Crown } from "lucide-react";
import type { UiItem, UiVariant } from "../types";

type ButtonProps = {
  children: React.ReactNode;
  variant?: UiVariant;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

function DuolingoButton({
  children,
  variant = "primary",
  className,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  const base =
    "relative w-full max-w-md uppercase cursor-pointer rounded-lg px-4 py-3 font-[700]";
  const variants: Record<UiVariant, string> = {
    primary:
      "bg-indigo-700 text-white shadow-[0_4px_0_#1e1a4d] active:translate-y-[2px] active:shadow-none",
    secondary:
      "bg-orange-500 text-white shadow-[0_4px_0_#ca3500] active:translate-y-[2px] active:shadow-none",
    ghost: "text-indigo-700",
  };

  return (
    <button
      className={cn(base, variants[variant], className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

function PremiumButton({
  children,
  variant = "primary",
  className,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  const base =
    "flex items-center justify-center gap-3 rounded-xl px-4 py-6 text-xl font-[500] text-white cursor-pointer active:scale-[0.95] transition-transform duration-300";
  const variants: Record<UiVariant, string> = {
    primary: "bg-gradient-to-b from-blue-500 to-blue-600",
    secondary: "bg-gradient-to-b from-orange-500 to-orange-600",
    ghost: "bg-gray-200 text-gray-900",
  };

  return (
    <button
      className={cn(base, variants[variant], className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <Crown size={26} className="text-yellow-400" />
      {children}
    </button>
  );
}

function PillButton({
  children,
  icon = <ArrowRight size={18} />,
  variant = "primary",
  className,
  onClick,
  disabled,
  type = "button",
}: ButtonProps & { icon?: React.ReactNode }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold shadow-md active:scale-[0.97] transition-all";
  const variants: Record<UiVariant, string> = {
    primary: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white",
    secondary: "bg-gradient-to-r from-orange-500 to-pink-500 text-white",
    ghost: "bg-gray-200 text-gray-900",
  };

  return (
    <button
      className={cn(base, variants[variant], className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
      {icon}
    </button>
  );
}

// --- previews (kept tiny; scalable) ---
function DuolingoPreview() {
  return (
    <div className="flex flex-col gap-4 px-4 pt-16">
      <DuolingoButton>Try for 0,00 US$</DuolingoButton>
      <DuolingoButton variant="secondary">Get other app</DuolingoButton>
      <DuolingoButton variant="ghost">No thanks</DuolingoButton>
    </div>
  );
}

function PremiumPreview() {
  return (
    <div className="flex flex-col gap-4 px-4 pt-16">
      <PremiumButton>Unlock Premium Features</PremiumButton>
      <PremiumButton variant="secondary">Unlock Premium Features</PremiumButton>
    </div>
  );
}

function PillPreview() {
  return (
    <div className="flex flex-col gap-4 px-4 pt-16">
      <PillButton>Get started now</PillButton>
      <PillButton variant="secondary">Check prices first</PillButton>
      <PillButton variant="ghost">Go away</PillButton>
    </div>
  );
}

// --- code strings (crawlable) ---
const duolingoButtonCode = `import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export function DuolingoButton({
  children,
  variant = "primary",
  className,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  const base =
    "relative w-full max-w-md uppercase cursor-pointer rounded-lg px-4 py-3 font-[700]";

  const variants = {
    primary:
      "bg-indigo-700 text-white shadow-[0_4px_0_#1e1a4d] active:translate-y-[2px] active:shadow-none",
    secondary:
      "bg-orange-500 text-white shadow-[0_4px_0_#ca3500] active:translate-y-[2px] active:shadow-none",
    ghost: "text-indigo-700",
  };

  return (
    <button
      className={cn(base, variants[variant], className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}`;

const premiumButtonCode = `import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export function PremiumButton({
  children,
  variant = "primary",
  className,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  const base =
    "flex items-center justify-center gap-3 rounded-xl px-4 py-6 text-xl font-[500] text-white cursor-pointer active:scale-[0.95] transition-transform duration-300";

  const variants = {
    primary: "bg-gradient-to-b from-blue-500 to-blue-600",
    secondary: "bg-gradient-to-b from-orange-500 to-orange-600",
    ghost: "bg-gray-200 text-gray-900",
  };

  return (
    <button
      className={cn(base, variants[variant], className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <Crown size={26} className="text-yellow-400" />
      {children}
    </button>
  );
}`;

const pillButtonCode = `import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export function PillButton({
  children,
  icon = <ArrowRight size={18} />,
  variant = "primary",
  className,
  onClick,
  disabled,
  type = "button",
}: ButtonProps & { icon?: React.ReactNode }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold shadow-md active:scale-[0.97] transition-all";

  const variants = {
    primary: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white",
    secondary: "bg-gradient-to-r from-orange-500 to-pink-500 text-white",
    ghost: "bg-gray-200 text-gray-900",
  };

  return (
    <button
      className={cn(base, variants[variant], className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
      {icon}
    </button>
  );
}`;

export const buttonItems: UiItem[] = [
  {
    id: "duolingo",
    title: "Duolingo Button",
    description:
      "A bold, high-contrast mobile CTA button with satisfying pressed state—great for onboarding and paywalls.",
    tags: ["cta", "mobile", "duolingo", "pressed-state"],
    code: duolingoButtonCode,
    Preview: DuolingoPreview,
  },
  {
    id: "premium",
    title: "Premium Button",
    description:
      "A large premium CTA button with an icon—ideal for upsells, subscriptions, and feature unlocks.",
    tags: ["premium", "upsell", "cta", "subscription"],
    code: premiumButtonCode,
    Preview: PremiumPreview,
  },
  {
    id: "pill",
    title: "Pill Button",
    description:
      "A rounded pill-style action button that feels native in modern mobile UIs—great for quick actions.",
    tags: ["pill", "rounded", "actions", "mobile"],
    code: pillButtonCode,
    Preview: PillPreview,
  },
];
