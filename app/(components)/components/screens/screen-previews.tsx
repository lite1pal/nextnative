"use client";

import dynamic from "next/dynamic";

// Dynamic imports for client components
const PodcastHome = dynamic(() => import("./podcast-home"), { ssr: false });

// Duolingo screens - wrapped in simple preview components
const DuolingoLeaderboard = dynamic(
  () =>
    import("./duolingo/leaderboard").then((mod) => ({
      default: mod.LeaderboardScreen,
    })),
  { ssr: false },
);

const DuolingoProfile = dynamic(
  () =>
    import("./duolingo/profile").then((mod) => ({
      default: mod.ProfileScreen,
    })),
  { ssr: false },
);

const DuolingoQuests = dynamic(
  () =>
    import("./duolingo/quests").then((mod) => ({
      default: () => mod.QuestsScreen({ onClaim: () => {} }),
    })),
  { ssr: false },
);

const DuolingoShop = dynamic(
  () =>
    import("./duolingo/shop").then((mod) => ({
      default: () => mod.ShopScreen({ onPurchase: () => {}, userGems: 5400 }),
    })),
  { ssr: false },
);

// Pricing screens
const SubscriptionPricing = dynamic(
  () =>
    import("./pricing-screens/pricing-components").then((mod) => ({
      default: mod.SubscriptionPricingScreen,
    })),
  { ssr: false },
);

const TieredPricing = dynamic(
  () =>
    import("./pricing-screens/pricing-components").then((mod) => ({
      default: mod.TieredPricingScreen,
    })),
  { ssr: false },
);

const Paywall = dynamic(
  () =>
    import("./pricing-screens/pricing-components").then((mod) => ({
      default: mod.PaywallScreen,
    })),
  { ssr: false },
);

// --- Preview Components ---
export function PodcastHomePreview() {
  return (
    <div className="h-[800px]">
      <PodcastHome />
    </div>
  );
}

export function LeaderboardPreview() {
  return (
    <div className="min-h-[600px] bg-gray-50">
      <DuolingoLeaderboard />
    </div>
  );
}

export function ProfilePreview() {
  return (
    <div className="min-h-[600px] bg-gray-50">
      <DuolingoProfile />
    </div>
  );
}

export function QuestsPreview() {
  return (
    <div className="min-h-[600px] bg-gray-50">
      <DuolingoQuests />
    </div>
  );
}

export function ShopPreview() {
  return (
    <div className="min-h-[600px] bg-gray-50">
      <DuolingoShop />
    </div>
  );
}

// --- Pricing Screen Previews ---
export function SubscriptionPricingPreview() {
  return (
    <div className="min-h-[700px]">
      <SubscriptionPricing />
    </div>
  );
}

export function TieredPricingPreview() {
  return (
    <div className="min-h-[700px]">
      <TieredPricing />
    </div>
  );
}

export function PaywallPreview() {
  return (
    <div className="min-h-[700px]">
      <Paywall />
    </div>
  );
}
