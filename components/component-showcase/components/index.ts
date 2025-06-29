import { SimpleNavbar } from "./navbar/simple-navbar";
import { FeatureGrid } from "./features/feature-grid";
import { SimpleFooter } from "./footer/simple-footer";
import { SimpleTestimonial } from "./testimonials/simple-testimonial";
import { DarkHero } from "./hero/dark-hero";
import { CodeHero } from "./hero/code-hero";
import { FeatureCards } from "./features/feature-cards";
import { ModernPricing } from "./pricing/modern-pricing";
import { ContactForm } from "./forms/contact-form";
import { GradientInput } from "./forms/gradient-input";
import { GlassInput } from "./forms/glass-input";
import { WaitlistHero } from "./hero/waitlist-hero";
import { BusinessHero } from "./hero/business-hero";
import { TemplateGrid } from "./features/template-grid";
import { DarkPricing } from "./pricing/dark-pricing";
import { CurvedCta } from "./cta/curved-cta";
import { NotepadHero } from "./hero/notepad-hero";
import { VideoHero } from "./hero/video-hero";
import { StartupHero } from "./hero/startup-hero";
import { GradientHeroAlt } from "./hero/gradient-hero-alt";
import { ModernPricingAlt } from "./pricing/modern-pricing-alt";
import { LandingTemplates } from "./templates/landing-templates";
import { NoteShowcase } from "./note-taking/note-showcase";
import { IndiePricing } from "./pricing/indie-pricing";
import { AnimatedHamburger } from "./navbar/animated-hamburger";
import { PomodoroShowcase } from "./pomodoro/pomodoro-showcase";
import { FlashcardShowcase } from "./flashcards/flashcard-showcase";
import { ExpenseShowcase } from "./expenses/expense-showcase";
import { TaskShowcase } from "./tasks/task-showcase";
import dynamic from "next/dynamic";

const Galaxy = dynamic(() => import("@/components/portfolio/galaxy"), {
  ssr: false,
});

export const components = [
  // SimpleHero,
  // GradientHero,
  DarkHero,
  CodeHero,
  WaitlistHero,
  BusinessHero,
  NotepadHero,
  VideoHero,
  StartupHero,
  GradientHeroAlt,
  SimpleNavbar,
  AnimatedHamburger,
  // DropdownNavbar,
  // SimplePricing,
  ModernPricing,
  ModernPricingAlt,
  DarkPricing,
  IndiePricing,
  FeatureGrid,
  FeatureCards,
  // FeatureTabs,
  // FeatureGridDark,
  // FeatureCarousel,
  TemplateGrid,
  LandingTemplates,
  ContactForm,
  // TerminalForm,
  GradientInput,
  GlassInput,
  SimpleFooter,
  // SimpleCTA,
  CurvedCta,
  SimpleTestimonial,
  // TwitterWall,
  NoteShowcase,
  PomodoroShowcase,
  FlashcardShowcase,
  ExpenseShowcase,
  TaskShowcase,
  {
    id: "galaxy",
    name: "Galaxy",
    description: "A 3D galaxy component",
    category: "3d",
    component: Galaxy,
    code: "",
  },
] as const;

export type ComponentCategory =
  | "hero"
  | "navbar"
  | "features"
  | "pricing"
  | "cta"
  | "testimonials"
  | "footer"
  | "forms"
  | "cards"
  | "mobile-apps"
  | "3d";

export interface ShowcaseComponent {
  id: string;
  name: string;
  description: string;
  category: ComponentCategory;
  component: React.FC;
  code: string;
}
