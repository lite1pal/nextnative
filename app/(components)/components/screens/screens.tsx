import type { UiItem } from "../types";
import {
  PodcastHomePreview,
  LeaderboardPreview,
  ProfilePreview,
  QuestsPreview,
  ShopPreview,
} from "./screen-previews";

// --- Code Strings (crawlable for SEO) ---
const podcastHomeCode = `"use client";

import { cn } from "@/lib/utils";
import { ChevronRight, Home, Blocks, Library, Search, Play, Clock, Headphones } from "lucide-react";
import { ReactNode, useRef, useState } from "react";

// Placeholder image component for podcast artwork
function PlaceholderImage({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "gradient" | "pattern";
}) {
  const variants = {
    default: "bg-gradient-to-br from-purple-500 to-indigo-600",
    gradient: "bg-gradient-to-br from-orange-400 to-pink-500",
    pattern: "bg-gradient-to-br from-emerald-400 to-cyan-500",
  };

  return (
    <div className={cn("flex items-center justify-center", variants[variant], className)}>
      <Headphones className="size-1/3 text-white/30" />
    </div>
  );
}

export function PodcastHomeScreen() {
  return (
    <div className="relative h-[800px] tracking-[-0.03em]">
      <div className="scrollbar-hide relative h-full overflow-auto pb-36">
        <Header>Home</Header>
        <Tabs />
        
        {/* Featured Episode */}
        <Section>
          <SectionHeader>Continue Listening</SectionHeader>
          <FeaturedEpisode />
        </Section>

        <Section>
          <SectionHeader>Up Next</SectionHeader>
          <SectionContent>
            <EpisodeCard title="Building Better Habits" podcast="The Productivity Show" duration="45 min" />
            <EpisodeCard title="Startup Stories" podcast="Founders Weekly" duration="1 hr 12 min" variant="gradient" />
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader desc="Based on your listening">You Might Like</SectionHeader>
          <SectionContent>
            <PodcastCard title="Self-Improvement" subtitle="Updated weekly" variant="pattern" />
            <PodcastCard title="Tech News Daily" subtitle="New episodes daily" />
            <PodcastCard title="Mindful Minutes" subtitle="Short meditations" variant="gradient" />
          </SectionContent>
        </Section>
      </div>
      <BottomNav />
    </div>
  );
}

function Header({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-[32px] font-semibold">{children}</div>
      <div className="size-[39px] overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="flex h-full items-center justify-center text-sm font-medium text-white">JD</div>
      </div>
    </div>
  );
}

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabs = ["All", "Self-Improvement", "Technology", "Business", "Health"];

  return (
    <div className="scrollbar-hide mt-3 flex gap-2 overflow-auto">
      {tabs.map((tab, i) => (
        <div
          key={i}
          onClick={() => setActiveTab(i)}
          className={cn(
            "shrink-0 cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition",
            activeTab === i ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
          )}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}

function FeaturedEpisode() {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl bg-white/10">
      <div className="relative aspect-[2/1] w-full">
        <PlaceholderImage className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-xs font-medium text-white/70">NOW PLAYING</p>
          <h3 className="mt-1 text-lg font-semibold text-white">How to Build a Second Brain</h3>
          <p className="text-sm text-white/70">The Knowledge Project</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Clock size={14} /><span>32 min remaining</span>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full bg-white">
          <Play size={18} className="ml-0.5 text-black" fill="black" />
        </button>
      </div>
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <div className="mt-6 flex flex-col gap-3">{children}</div>;
}

function SectionHeader({ children, desc }: { children: ReactNode; desc?: string }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center text-lg font-semibold">
        {children} <ChevronRight size={20} className="mt-0.5 opacity-70" />
      </div>
      {desc && <div className="text-sm font-medium opacity-70">{desc}</div>}
    </div>
  );
}

function SectionContent({ children }: { children: ReactNode }) {
  return <div className="scrollbar-hide flex gap-3 overflow-auto">{children}</div>;
}

function EpisodeCard({ title, podcast, duration, variant = "default" }: { 
  title: string; podcast: string; duration: string; variant?: "default" | "gradient" | "pattern" 
}) {
  return (
    <div className="flex w-[260px] shrink-0 flex-col">
      <div className="relative overflow-hidden rounded-xl">
        <PlaceholderImage className="h-[140px] w-full" variant={variant} />
        <button className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-white shadow-lg">
          <Play size={14} className="ml-0.5 text-black" fill="black" />
        </button>
      </div>
      <h4 className="mt-2 line-clamp-1 text-sm font-semibold">{title}</h4>
      <p className="line-clamp-1 text-xs opacity-70">{podcast}</p>
      <div className="mt-1 flex items-center gap-1 text-xs opacity-50"><Clock size={12} />{duration}</div>
    </div>
  );
}

function PodcastCard({ title, subtitle, variant = "default" }: { 
  title: string; subtitle: string; variant?: "default" | "gradient" | "pattern" 
}) {
  return (
    <div className="flex shrink-0 flex-col">
      <PlaceholderImage className="size-[150px] rounded-xl" variant={variant} />
      <h4 className="mt-2 text-sm font-medium">{title}</h4>
      <p className="text-xs opacity-70">{subtitle}</p>
    </div>
  );
}

function BottomNav() {
  const [activeTab, setActiveTab] = useState("home");
  const navItems = [
    { key: "home", Icon: Home, label: "Home" },
    { key: "browse", Icon: Blocks, label: "Browse" },
    { key: "library", Icon: Library, label: "Library" },
    { key: "search", Icon: Search, label: "Search" },
  ];

  return (
    <div className="absolute right-0 bottom-0 left-0 z-10 flex h-20 w-full items-center justify-evenly border-t border-white/10 bg-black/95 backdrop-blur">
      {navItems.map(({ key, Icon, label }) => (
        <button
          key={key}
          onClick={() => setActiveTab(key)}
          className={cn("flex flex-col items-center gap-1", activeTab === key ? "text-[#B03EFF]" : "text-white/50")}
        >
          <Icon size={26} />
          <span className="text-[10px] font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}`;

const leaderboardScreenCode = `"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

interface User {
  rank: number;
  name: string;
  xp: number;
  avatar: string;
  isCurrentUser?: boolean;
}

const sampleUsers: User[] = [
  { rank: 1, name: "Alex", xp: 4520, avatar: "🧑‍🚀" },
  { rank: 2, name: "Maria", xp: 4210, avatar: "👩‍🎨" },
  { rank: 3, name: "David", xp: 3980, avatar: "👨‍💻" },
  { rank: 4, name: "You", xp: 3850, avatar: "😊", isCurrentUser: true },
  { rank: 5, name: "Sophia", xp: 3720, avatar: "👩‍🔬" },
];

export function LeaderboardScreen({ users = sampleUsers }: { users?: User[] }) {
  const currentUser = users.find((u) => u.isCurrentUser);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4"
    >
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Leaderboard
      </h1>
      <div className="space-y-2">
        {users.map((user, index) => (
          <motion.div
            key={user.rank}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "flex items-center rounded-lg p-3",
              user.isCurrentUser ? "border-2 border-blue-400 bg-blue-100" : "bg-white"
            )}
          >
            <span className="w-8 text-lg font-bold text-gray-600">{user.rank}</span>
            <div className="relative mr-4 flex size-12 items-center justify-center rounded-full bg-gray-200 text-3xl">
              <span>{user.avatar}</span>
              {user.rank === 1 && (
                <Crown className="absolute -top-2 -right-2 text-yellow-500" size={24} fill="currentColor" />
              )}
            </div>
            <span className="flex-grow font-bold text-gray-800">{user.name}</span>
            <span className="font-bold text-yellow-600">{user.xp} XP</span>
          </motion.div>
        ))}
      </div>
      {currentUser && (
        <div className="mt-4 border-t-2 border-gray-200 bg-white p-4 text-center">
          <p className="text-gray-600">
            You are rank <span className="font-bold text-blue-500">{currentUser.rank}</span>{" "}
            with <span className="font-bold text-yellow-600">{currentUser.xp} XP</span>.
          </p>
        </div>
      )}
    </motion.div>
  );
}`;

const profileScreenCode = `"use client";

import { motion } from "framer-motion";
import { Flame, Gem, Shield, Star, Trophy, Settings, UserPlus } from "lucide-react";

interface Achievement {
  name: string;
  icon: React.ElementType;
  color: string;
}

interface ProfileStats {
  streak: number;
  totalXP: number;
  league: string;
}

const sampleStats: ProfileStats = { streak: 128, totalXP: 12450, league: "Diamond" };

const sampleAchievements: Achievement[] = [
  { name: "Perfect", icon: Star, color: "text-yellow-500" },
  { name: "Scholar", icon: Trophy, color: "text-green-500" },
  { name: "Sharpshooter", icon: Shield, color: "text-blue-500" },
  { name: "Sage", icon: Gem, color: "text-purple-500" },
  { name: "Wildfire", icon: Flame, color: "text-orange-500" },
];

export function ProfileScreen({
  name = "Alex",
  avatar = "🧑‍🚀",
  stats = sampleStats,
  achievements = sampleAchievements,
}: {
  name?: string;
  avatar?: string;
  stats?: ProfileStats;
  achievements?: Achievement[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <div className="flex gap-4">
          <button className="text-gray-500 hover:text-gray-700"><UserPlus size={24} /></button>
          <button className="text-gray-500 hover:text-gray-700"><Settings size={24} /></button>
        </div>
      </div>

      {/* User Info */}
      <div className="mt-6 flex flex-col items-center">
        <div className="relative mb-2 flex size-24 items-center justify-center rounded-full bg-gray-200 text-6xl">
          {avatar}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">Joined August 2025</p>
      </div>

      {/* Stats */}
      <div className="mt-6">
        <h3 className="mb-2 text-lg font-bold text-gray-700">Statistics</h3>
        <div className="grid grid-cols-3 gap-4 rounded-lg bg-white p-4">
          <StatItem icon={Flame} value={stats.streak} label="Day Streak" color="text-orange-500" />
          <StatItem icon={Star} value={stats.totalXP.toLocaleString()} label="Total XP" color="text-yellow-500" />
          <StatItem icon={Shield} value={stats.league} label="League" color="text-blue-500" />
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-6">
        <h3 className="mb-2 text-lg font-bold text-gray-700">Achievements</h3>
        <div className="grid grid-cols-5 gap-2">
          {achievements.map((a) => (
            <div key={a.name} className="flex flex-col items-center rounded-lg bg-white p-2">
              <a.icon className={\`size-8 \${a.color}\`} />
              <span className="mt-1 text-xs text-gray-600">{a.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StatItem({ icon: Icon, value, label, color }: { icon: React.ElementType; value: string | number; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center">
      <Icon className={\`size-6 \${color}\`} />
      <span className="text-lg font-bold text-gray-800">{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}`;

const questsScreenCode = `"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Flame, Star, Target, Gem } from "lucide-react";
import { useState } from "react";

interface Quest {
  id: string;
  title: string;
  goal: number;
  current: number;
  icon: React.ElementType;
  color: string;
  reward: { type: "gems" | "xp"; amount: number };
  claimed: boolean;
}

const dailyQuests: Quest[] = [
  { id: "daily-1", title: "Earn 20 XP", goal: 20, current: 15, icon: Star, color: "text-yellow-500", reward: { type: "gems", amount: 10 }, claimed: false },
  { id: "daily-2", title: "Complete 3 lessons", goal: 3, current: 2, icon: Target, color: "text-green-500", reward: { type: "gems", amount: 20 }, claimed: false },
  { id: "daily-3", title: "Maintain streak", goal: 3, current: 3, icon: Flame, color: "text-orange-500", reward: { type: "xp", amount: 50 }, claimed: false },
];

export function QuestsScreen({ daily = dailyQuests, onClaim }: { daily?: Quest[]; onClaim: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState("Daily");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4">
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">Quests</h1>

      {/* Tabs */}
      <div className="mb-4 flex gap-2">
        {["Daily", "Weekly"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 rounded-full py-2 font-semibold transition-colors",
              activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Quest Cards */}
      <div className="space-y-3">
        {daily.map((quest) => {
          const progress = Math.min(100, (quest.current / quest.goal) * 100);
          const isComplete = quest.current >= quest.goal;
          const Icon = quest.icon;

          return (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div className={cn("flex size-10 items-center justify-center rounded-full bg-gray-100", quest.color)}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{quest.title}</p>
                  <p className="text-sm text-gray-500">{quest.current}/{quest.goal}</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-blue-500">
                  <Gem size={14} /> {quest.reward.amount}
                </div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: \`\${progress}%\` }} />
              </div>
              {isComplete && !quest.claimed && (
                <button
                  onClick={() => onClaim(quest.id)}
                  className="mt-3 w-full rounded-lg bg-green-500 py-2 font-semibold text-white"
                >
                  Claim Reward
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}`;

const shopScreenCode = `"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Gem, Heart, Zap } from "lucide-react";

interface ShopItem {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: React.ElementType;
  color: string;
}

const shopItems: ShopItem[] = [
  { id: "streak-freeze", title: "Streak Freeze", description: "Protect your streak for one day.", price: 200, icon: Heart, color: "text-red-500" },
  { id: "double-xp", title: "Double XP Boost", description: "Earn double XP for 15 minutes.", price: 500, icon: Zap, color: "text-yellow-500" },
  { id: "gem-pack", title: "Gem Pack", description: "A small pouch of 100 gems.", price: 100, icon: Gem, color: "text-blue-500" },
];

export function ShopScreen({
  items = shopItems,
  onPurchase,
  userGems,
}: {
  items?: ShopItem[];
  onPurchase: (id: string) => void;
  userGems: number;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Shop</h1>
        <div className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1">
          <Gem className="size-5 text-blue-500" />
          <span className="font-bold text-blue-600">{userGems}</span>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon;
          const canAfford = userGems >= item.price;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center rounded-xl bg-white p-4"
            >
              <div className={cn("flex size-12 items-center justify-center rounded-full bg-gray-100", item.color)}>
                <Icon size={24} />
              </div>
              <div className="ml-3 flex-1">
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <button
                onClick={() => canAfford && onPurchase(item.id)}
                disabled={!canAfford}
                className={cn(
                  "flex items-center gap-1 rounded-full px-4 py-2 font-semibold transition-colors",
                  canAfford ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-400"
                )}
              >
                <Gem size={14} />
                {item.price}
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}`;

// --- Exported Screen Items (SEO-focused) ---
export const screenItems: UiItem[] = [
  {
    id: "podcast-home",
    title: "Podcast App Home Screen",
    description:
      "A dark-themed podcast app home screen with featured episodes, horizontal scrolling sections, category tabs, and a sticky bottom navigation bar—perfect for media and audio content apps.",
    tags: [
      "podcasts",
      "media",
      "dark-theme",
      "navigation",
      "home-screen",
      "audio",
    ],
    code: podcastHomeCode,
    Preview: PodcastHomePreview,
  },
  {
    id: "leaderboard",
    title: "Gamified Leaderboard Screen",
    description:
      "A competitive leaderboard screen with animated rankings, user avatars, and XP tracking—ideal for gamification, fitness apps, and learning platforms.",
    tags: ["leaderboard", "gamification", "ranking", "duolingo", "competition"],
    code: leaderboardScreenCode,
    Preview: LeaderboardPreview,
  },
  {
    id: "profile",
    title: "User Profile Screen",
    description:
      "A comprehensive user profile screen with stats grid, achievements display, and settings—great for social apps, fitness trackers, and gamified experiences.",
    tags: ["profile", "user", "stats", "achievements", "settings"],
    code: profileScreenCode,
    Preview: ProfilePreview,
  },
  {
    id: "quests",
    title: "Daily Quests Screen",
    description:
      "A quest and challenges screen with progress bars, reward indicators, and claim buttons—perfect for habit trackers, games, and engagement-focused apps.",
    tags: ["quests", "challenges", "progress", "rewards", "gamification"],
    code: questsScreenCode,
    Preview: QuestsPreview,
  },
  {
    id: "shop",
    title: "In-App Shop Screen",
    description:
      "A virtual currency shop screen with item cards, pricing, and purchase buttons—essential for freemium apps, games, and subscription-based products.",
    tags: ["shop", "store", "in-app-purchase", "monetization", "gems"],
    code: shopScreenCode,
    Preview: ShopPreview,
  },
];
