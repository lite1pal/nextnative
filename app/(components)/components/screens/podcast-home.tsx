"use client";

import { cn } from "@/lib/utils";
import {
  Blocks,
  ChevronRight,
  Home,
  Library,
  Search,
  Play,
  Clock,
  Headphones,
} from "lucide-react";
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
    <div
      className={cn(
        "flex items-center justify-center",
        variants[variant],
        className,
      )}
    >
      <Headphones className="size-1/3 text-white/30" />
    </div>
  );
}

function PodcastHome() {
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
            <EpisodeCard
              title="Building Better Habits"
              podcast="The Productivity Show"
              duration="45 min"
              variant="default"
            />
            <EpisodeCard
              title="Startup Stories: From Zero to IPO"
              podcast="Founders Weekly"
              duration="1 hr 12 min"
              variant="gradient"
            />
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader desc="Based on your listening">
            You Might Like
          </SectionHeader>
          <SectionContent>
            <PodcastCard
              title="Self-Improvement"
              subtitle="Updated weekly"
              variant="pattern"
            />
            <PodcastCard
              title="Tech News Daily"
              subtitle="New episodes daily"
            />
            <PodcastCard
              title="Mindful Minutes"
              subtitle="Short meditations"
              variant="gradient"
            />
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader>Popular in Technology</SectionHeader>
          <SectionContent>
            <PodcastCard title="Code Stories" subtitle="Developer tales" />
            <PodcastCard
              title="AI Today"
              subtitle="Latest in AI"
              variant="gradient"
            />
            <PodcastCard
              title="Startup Grind"
              subtitle="Entrepreneur interviews"
              variant="pattern"
            />
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader>New Releases</SectionHeader>
          <SectionContent>
            <EpisodeCard
              title="The Future of Work"
              podcast="Business Insights"
              duration="38 min"
              variant="pattern"
            />
            <EpisodeCard
              title="Morning Motivation"
              podcast="Daily Boost"
              duration="15 min"
              variant="default"
            />
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
        <div className="flex h-full items-center justify-center text-sm font-medium text-white">
          JD
        </div>
      </div>
    </div>
  );
}

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabs = ["All", "Self-Improvement", "Technology", "Business", "Health"];

  const handleClick = (index: number) => {
    setActiveTab(index);
    const el = tabRefs.current[index];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  return (
    <div className="scrollbar-hide mt-3 flex gap-2 overflow-auto">
      {tabs.map((tab, i) => (
        <div
          key={i}
          onClick={() => handleClick(i)}
          ref={(el) => {
            tabRefs.current[i] = el;
          }}
          className={cn(
            "shrink-0 cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition duration-200",
            activeTab === i
              ? "bg-white text-black"
              : "bg-white/10 text-white hover:bg-white/20",
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
        <div className="absolute right-0 bottom-0 left-0 p-4">
          <p className="text-xs font-medium text-white/70">NOW PLAYING</p>
          <h3 className="mt-1 text-lg font-semibold text-white">
            How to Build a Second Brain
          </h3>
          <p className="text-sm text-white/70">The Knowledge Project</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Clock size={14} />
          <span>32 min remaining</span>
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

function SectionHeader({
  children,
  desc,
}: {
  children: ReactNode;
  desc?: string;
}) {
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
  return (
    <div className="scrollbar-hide flex gap-3 overflow-auto">{children}</div>
  );
}

function EpisodeCard({
  title,
  podcast,
  duration,
  variant = "default",
}: {
  title: string;
  podcast: string;
  duration: string;
  variant?: "default" | "gradient" | "pattern";
}) {
  return (
    <div className="flex w-[260px] shrink-0 flex-col">
      <div className="relative overflow-hidden rounded-xl">
        <PlaceholderImage className="h-[140px] w-full" variant={variant} />
        <button className="absolute right-2 bottom-2 flex size-8 items-center justify-center rounded-full bg-white shadow-lg">
          <Play size={14} className="ml-0.5 text-black" fill="black" />
        </button>
      </div>
      <h4 className="mt-2 line-clamp-1 text-sm font-semibold">{title}</h4>
      <p className="line-clamp-1 text-xs opacity-70">{podcast}</p>
      <div className="mt-1 flex items-center gap-1 text-xs opacity-50">
        <Clock size={12} />
        {duration}
      </div>
    </div>
  );
}

function PodcastCard({
  title,
  subtitle,
  variant = "default",
}: {
  title: string;
  subtitle: string;
  variant?: "default" | "gradient" | "pattern";
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
  const iconSize = 26;
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
          className={cn(
            "flex flex-col items-center gap-1",
            activeTab === key ? "text-[#B03EFF]" : "text-white/50",
          )}
        >
          <Icon size={iconSize} />
          <span className="text-[10px] font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}

export default PodcastHome;
