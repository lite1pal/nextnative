"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Flame, Star, Target } from "lucide-react";
import { useState } from "react";

// --- TYPES ---
export interface Quest {
  id: string;
  title: string;
  goal: number;
  current: number;
  icon: React.ElementType;
  color: string;
  reward: { type: "gems" | "xp"; amount: number };
  claimed: boolean;
}

// --- SAMPLE DATA ---
const dailyQuests: Quest[] = [
  {
    id: "daily-1",
    title: "Earn 20 XP",
    goal: 20,
    current: 15, // Example progress
    icon: Star,
    color: "text-yellow-500",
    reward: { type: "gems", amount: 10 },
    claimed: false,
  },
  {
    id: "daily-2",
    title: "Complete 3 lessons",
    goal: 3,
    current: 2,
    icon: Target,
    color: "text-green-500",
    reward: { type: "gems", amount: 20 },
    claimed: false,
  },
  {
    id: "daily-3",
    title: "Maintain a 3-day streak",
    goal: 3,
    current: 3,
    icon: Flame,
    color: "text-orange-500",
    reward: { type: "xp", amount: 50 },
    claimed: false,
  },
];

const weeklyQuests: Quest[] = [
  {
    id: "weekly-1",
    title: "Earn 500 XP",
    goal: 500,
    current: 350,
    icon: Star,
    color: "text-yellow-500",
    reward: { type: "gems", amount: 100 },
    claimed: false,
  },
  {
    id: "weekly-2",
    title: "Complete 20 lessons",
    goal: 20,
    current: 15,
    icon: Target,
    color: "text-green-500",
    reward: { type: "xp", amount: 200 },
    claimed: false,
  },
];

// --- PROPS INTERFACE ---
interface QuestsScreenProps {
  daily?: Quest[];
  weekly?: Quest[];
  onClaim: (questId: string) => void;
}

export function QuestsScreen({
  daily = dailyQuests,
  weekly = weeklyQuests,
  onClaim,
}: QuestsScreenProps) {
  const [activeTab, setActiveTab] = useState("Daily");

  const questsToShow = activeTab === "Daily" ? daily : weekly;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Quests
      </h1>

      {/* Tabs */}
      <div className="mb-4 flex justify-center">
        <div className="flex rounded-lg bg-gray-200 p-1">
          <Tab
            label="Daily"
            isActive={activeTab === "Daily"}
            onClick={() => setActiveTab("Daily")}
          />
          <Tab
            label="Weekly"
            isActive={activeTab === "Weekly"}
            onClick={() => setActiveTab("Weekly")}
          />
        </div>
      </div>

      {/* Quests List */}
      <div className="space-y-3">
        {questsToShow.map((quest, index) => (
          <QuestItem key={index} quest={quest} onClaim={onClaim} />
        ))}
      </div>
    </motion.div>
  );
}

function Tab({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-md px-6 py-1 text-sm font-bold",
        isActive
          ? "bg-white text-blue-600 shadow"
          : "text-gray-600 hover:bg-gray-300",
      )}
    >
      {label}
    </button>
  );
}

function QuestItem({
  quest,
  onClaim,
}: {
  quest: Quest;
  onClaim: (questId: string) => void;
}) {
  const { icon: Icon, title, goal, current, color, id, claimed } = quest;
  const progress = (current / goal) * 100;
  const isComplete = current >= goal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-4 rounded-lg bg-white p-4"
    >
      <Icon className={cn("size-10 shrink-0", color)} />
      <div className="flex-grow">
        <p className="font-bold text-gray-800">{title}</p>
        <div className="mt-1 h-4 w-full rounded-full bg-gray-200">
          <motion.div
            className="h-4 rounded-full bg-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>
      <button
        onClick={() => onClaim(id)}
        disabled={!isComplete || claimed}
        className={cn(
          "rounded-lg px-4 py-2 font-bold text-white",
          isComplete && !claimed
            ? "bg-blue-500 hover:bg-blue-600"
            : "cursor-not-allowed bg-gray-300",
        )}
      >
        {claimed ? "Claimed" : isComplete ? "Claim" : `${current}/${goal}`}
      </button>
    </motion.div>
  );
}
