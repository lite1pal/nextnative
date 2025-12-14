"use client";

import Link from "next/link";
import Logo from "./Logo";
import { trackEvent } from "@/services/custom-analytics";

interface FooterLink {
  label: string;
  href: string;
  target?: string;
}

const productLinks: FooterLink[] = [
  // {
  //   label: "Affiliates - Earn 30%",
  //   href: "https://nextnative.affonso.io/auth",
  //   target: "_blank",
  // },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "https://nextnative.dev/docs" },
  { label: "Showcase", href: "/showcase" },
  { label: "Contact", href: "/contact" },
  { label: "Comparisons", href: "/comparisons" },
  { label: "Tutorials", href: "/tutorials" },
  { label: "Alternatives", href: "/alternatives" },
  { label: "Use Cases", href: "/use-cases" },

  {
    label: "MVP Agency",
    href: "/mvp-app-development",
  },
  { label: "Blog", href: "/blog" },
];

const freeToolsLinks: FooterLink[] = [
  { label: "App Idea Generator", href: "/free-tools/app-idea-generator" },
  { label: "App Name Generator", href: "/free-tools/app-name-generator" },
  {
    label: "App Revenue Calculator",
    href: "/free-tools/app-revenue-calculator",
  },
  {
    label: "App Store Connect API Setup",
    href: "/free-tools/app-store-connect-api",
  },
  {
    label: "App Store Fees Calculator",
    href: "/free-tools/app-store-fees",
  },
  // {
  //   label: "App Store Keyword Research",
  //   href: "/free-tools/app-store-keyword-research",
  // },
  {
    label: "App Store Metadata Generator",
    href: "/free-tools/app-store-metadata-generator",
  },
  {
    label: "App Store Screenshot Generator",
    href: "/free-tools/app-store-screenshot-generator",
  },
  {
    label: "App Store Screenshot Sizes",
    href: "/free-tools/app-store-screenshot-sizes",
  },
  // {
  //   label: "Capacitor Config Generator",
  //   href: "/free-tools/capacitor-config-generator",
  // },
  // {
  //   label: "Create Android Keystore",
  //   href: "/free-tools/create-android-keystore",
  // },
  // {
  //   label: "iOS Bundle ID Generator",
  //   href: "/free-tools/ios-bundle-id-generator",
  // },
  {
    label: "Play Store Privacy Policy",
    href: "/free-tools/play-store-privacy-policy",
  },
  {
    label: "Privacy Policy Generator",
    href: "/free-tools/app-privacy-policy-generator",
  },
  {
    label: "Preview Website on Mobile Device",
    href: "/convert-website-to-app",
  },
  {
    label: "PWA Manifest Generator",
    href: "/free-tools/pwa-manifest-generator",
  },
  {
    label: "Splash Screen Generator",
    href: "/free-tools/app-icon-splash-generator",
  },
];

const examplesLinks: FooterLink[] = [
  {
    label: "Pomodoro Timer & Focus App",
    href: "/use-cases/pomodoro-timer-app",
  },
  {
    label: "Expense Tracker & Budget Manager App",
    href: "/use-cases/expense-tracker-app",
  },
  {
    label: "Flashcard & Spaced Repetition Learning App",
    href: "/use-cases/flashcard-learning-app",
  },
  {
    label: "AI Plant Identification App",
    href: "/use-cases/ai-plant-identifier-app",
  },
  {
    label: "Food Delivery & Restaurant App",
    href: "/use-cases/food-delivery-app",
  },
  {
    label: "Fitness & Workout Tracking App",
    href: "/use-cases/fitness-app",
  },
];

const costGuideLinks: FooterLink[] = [
  {
    label: "How Much Does It Cost to Build an App?",
    href: "/cost/how-much-does-it-cost-to-build-an-app",
  },
  {
    label: "App Development Cost Calculator",
    href: "/cost/app-development-cost-calculator",
  },
  {
    label: "React Native Developer Salary",
    href: "/cost/react-native-developer-salary",
  },
  {
    label: "Cost to Publish App on App Store",
    href: "/cost/cost-to-publish-app-on-app-store",
  },
];

const tutorialsLinks: FooterLink[] = [
  {
    label: "API Routes & Fetching from a Next.js Mobile App",
    href: "/docs/features/nextjs-api",
  },
  {
    label: "Connect Supabase in a Next.js Mobile App",
    href: "/docs/features/database",
  },
  {
    label: "Firebase Authentication Setup for iOS & Android",
    href: "/docs/features/authorization",
  },
  {
    label: "Set Up In-App Purchases & Subscriptions with RevenueCat",
    href: "/docs/features/in-app-purchases",
  },
];

const legalLinks: FooterLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "License", href: "/license" },
];
const freeComponentsLinks: FooterLink[] = [
  { label: "Buttons", href: "/components/buttons" },
  { label: "Pricing Screens", href: "/components/screens/pricing-screens" },
];

function FooterLinkGroup({
  title,
  links,
  titleLink,
}: {
  title: string;
  links: FooterLink[];
  titleLink?: string;
}) {
  const isLegal = title.toLowerCase().includes("legal");

  const header = titleLink ? (
    <h3 className="text-lg font-[500]">
      <Link
        onClick={() => trackEvent(`Footer_${title}_clicked`)}
        prefetch={false}
        href={titleLink}
        className="hover:underline"
      >
        {title}
      </Link>
    </h3>
  ) : (
    <h3 className="text-lg font-[500]">{title}</h3>
  );

  return (
    <div className="flex flex-col gap-4">
      {/* <h3 className="text-lg font-[500]">{title}</h3> */}
      {header}
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            prefetch={false}
            key={link.label}
            href={link.href}
            target={link.target || "_self"}
            rel={isLegal ? "nofollow noopener" : undefined}
            onClick={() => trackEvent(`Footer_${link.label}_clicked`)}
            className="text-gray hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-gray/20 mt-20 border-t">
      <div className="mx-auto px-4 py-16 md:px-0">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Logo and social section */}
          <div className="col-span-1 flex flex-col gap-6 md:col-span-4">
            <Logo />
            <p className="text-gray">Launch mobile apps faster with Next.js</p>
            <div className="flex gap-4">
              <a
                aria-label="Visit Denis on X"
                onClick={() => trackEvent("Footer_X_clicked")}
                href="https://x.com/shipwithdenis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray hover:text-foreground"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                aria-label="View GitHub profile"
                onClick={() => trackEvent("Footer_GitHub_clicked")}
                href="https://github.com/lite1pal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray hover:text-foreground"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
              </a>
              <a
                aria-label="View LinkedIn profile"
                onClick={() => trackEvent("Footer_LinkedIn_clicked")}
                href="https://www.linkedin.com/in/denis-tarasenko-nextnative/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin-icon lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
            <div className="mt-5 hidden flex-col gap-y-16 md:flex">
              <FooterLinkGroup title="Legal" links={legalLinks} />

              <FooterLinkGroup title="Cost Guides" links={costGuideLinks} />
              <FooterLinkGroup
                title="Free Components"
                titleLink="/components"
                links={freeComponentsLinks}
              />
            </div>
          </div>

          {/* Links sections */}
          <div className="col-span-1 md:col-span-8 md:ml-auto">
            <div className="grid grid-cols-1 gap-12 gap-y-16 md:grid-cols-2">
              <FooterLinkGroup title="Product" links={productLinks} />
              <FooterLinkGroup
                title="Free Tools"
                titleLink="/free-tools"
                links={freeToolsLinks}
              />
              <FooterLinkGroup
                title="Tutorials"
                titleLink="/docs"
                links={tutorialsLinks}
              />
              <FooterLinkGroup
                title="App Examples"
                titleLink="/use-cases"
                links={examplesLinks}
              />
              <div className="block md:hidden">
                <FooterLinkGroup title="Legal" links={legalLinks} />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-gray/20 mt-16 border-t pt-8">
          <p className="text-gray text-sm">
            © {new Date().getFullYear()} NextNative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
