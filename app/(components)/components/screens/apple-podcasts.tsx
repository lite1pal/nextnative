"use client";

import { cn } from "@/lib/utils";
import { Blocks, ChevronRight, Home, Library, Search } from "lucide-react";
import { ReactNode, useRef, useState } from "react";

function ApplePodcasts() {
  return (
    <div className={`relative h-[800px] tracking-[-3%]`}>
      <div className={`scrollbar-hide relative h-full overflow-auto pb-36`}>
        <Header>Home</Header>

        <Tabs />

        <Section>
          <SectionHeader>Up Next</SectionHeader>
          <SectionContent>
            <Card size="large" />
            <Card size="large" />
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader desc="Based on your listening">
            You Might Like
          </SectionHeader>
          <SectionContent>
            <Card>
              <CardTitle>Self-Improvement</CardTitle>
              <CardDesc>Updated weekly</CardDesc>
            </Card>
            <Card />
            <Card />
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
      <div className="text-[32px] font-[600]">{children}</div>
      <div className="size-[39px] rounded-full bg-indigo-600"></div>
    </div>
  );
}

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  const tabs = ["Books", "Self-Improvement", "Exercise", "Meditation"];

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
    <div id="tabs" className="scrollbar-hide mt-3 flex gap-3 overflow-auto">
      {tabs.map((tab, i) => (
        <Tab
          key={i}
          onClick={() => handleClick(i)}
          ref={(el: any) => (tabRefs.current[i] = el)}
        >
          {tab}
        </Tab>
      ))}
    </div>
  );
}

function Tab({
  children,
  onClick,
  ref,
}: {
  children: ReactNode;
  onClick: () => void;
  ref: any;
}) {
  return (
    <div
      onClick={onClick}
      className="shrink-0 cursor-pointer rounded-md bg-white px-4 py-1.5 font-[500] text-black transition duration-200 hover:bg-black hover:text-white"
      ref={ref}
    >
      {children}
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-3">{children}</div>;
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
      <div className="mt-7 flex items-center text-[20px] font-[500]">
        {children} <ChevronRight size={24} className="mt-0.5 opacity-70" />
      </div>
      {desc && <div className="text-[16px] font-[500] opacity-70">{desc}</div>}
    </div>
  );
}

function SectionContent({ children }: { children: ReactNode }) {
  return (
    <div className="scrollbar-hide flex gap-3 overflow-auto">{children}</div>
  );
}

function Card({
  children,
  size = "medium",
}: {
  children?: ReactNode;
  size?: "small" | "medium" | "large";
}) {
  const defaultClasses = "shrink-0 bg-white";

  let sizeClasses = "";

  switch (size) {
    case "small":
      sizeClasses = "h-[260px] w-[223.45px] rounded-[12px]";
      break;
    case "large":
      sizeClasses = "h-[260px] w-[223.45px] rounded-[12px]";
      break;
    default:
      sizeClasses = "h-[150px] w-[150px] rounded-[12px]";
      break;
  }

  return (
    <div className="flex flex-col">
      <div className={cn(defaultClasses, sizeClasses)}></div>
      {children}
    </div>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  return <div className="mt-1.5 text-[14px]">{children}</div>;
}

function CardDesc({ children }: { children: ReactNode }) {
  return <div className="text-[14px] opacity-70">{children}</div>;
}

function BottomNav() {
  const iconSize = 32;
  const activeTabColor = "text-[#B03EFF]";

  const [activeTab, setActiveTab] = useState("home");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className="absolute right-0 bottom-0 left-0 z-10 flex h-[73px] w-full items-center justify-evenly gap-7 bg-black">
      <div
        onClick={() => handleTabClick("home")}
        className={`${activeTab === "home" ? activeTabColor : "opacity-70"} flex flex-col items-center text-[12px]`}
      >
        <Home size={iconSize} />
      </div>
      <div
        onClick={() => handleTabClick("browse")}
        className={`${activeTab === "browse" ? activeTabColor : "opacity-70"} flex flex-col items-center text-[12px]`}
      >
        <Blocks size={iconSize} />
      </div>
      <div
        onClick={() => handleTabClick("library")}
        className={`${activeTab === "library" ? activeTabColor : "opacity-70"} flex flex-col items-center text-[12px]`}
      >
        <Library size={iconSize} />
      </div>
      <div
        onClick={() => handleTabClick("search")}
        className={`${activeTab === "search" ? activeTabColor : "opacity-70"} flex flex-col items-center text-[12px]`}
      >
        <Search size={iconSize} />
      </div>
    </div>
  );
}

export default ApplePodcasts;
