"use client";

import { motion } from "framer-motion";
import {
  Flame,
  Gem,
  Shield,
  Star,
  Trophy,
  User,
  Settings,
  UserPlus,
} from "lucide-react";

// --- TYPES ---
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

// --- SAMPLE DATA ---
const sampleStats: ProfileStats = {
  streak: 128,
  totalXP: 12450,
  league: "Diamond",
};

const sampleAchievements: Achievement[] = [
  { name: "Perfect", icon: Star, color: "text-yellow-500" },
  { name: "Scholar", icon: Trophy, color: "text-green-500" },
  { name: "Sharpshooter", icon: Shield, color: "text-blue-500" },
  { name: "Sage", icon: Gem, color: "text-purple-500" },
  { name: "Wildfire", icon: Flame, color: "text-orange-500" },
];

// --- PROPS INTERFACE ---
interface ProfileScreenProps {
  name?: string;
  avatar?: string;
  stats?: ProfileStats;
  achievements?: Achievement[];
}

export function ProfileScreen({
  name = "Alex",
  avatar = "🧑‍🚀",
  stats = sampleStats,
  achievements = sampleAchievements,
}: ProfileScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <div className="flex gap-4">
          <button className="text-gray-500 hover:text-gray-700">
            <UserPlus size={24} />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <Settings size={24} />
          </button>
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
          <StatItem
            icon={Flame}
            value={stats.streak}
            label="Day Streak"
            color="text-orange-500"
          />
          <StatItem
            icon={Star}
            value={stats.totalXP.toLocaleString()}
            label="Total XP"
            color="text-yellow-500"
          />
          <StatItem
            icon={Trophy}
            value={stats.league}
            label="League"
            color="text-purple-500"
          />
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-6">
        <h3 className="mb-2 text-lg font-bold text-gray-700">Achievements</h3>
        <div className="grid grid-cols-5 gap-4 rounded-lg bg-white p-4">
          {achievements.map((ach, index) => (
            <AchievementItem key={index} achievement={ach} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StatItem({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: React.ElementType;
  value: string | number;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <Icon className={`mb-1 ${color}`} size={28} />
      <span className="text-xl font-bold text-gray-800">{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

function AchievementItem({ achievement }: { achievement: Achievement }) {
  const { icon: Icon, name, color } = achievement;
  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex size-14 items-center justify-center rounded-full bg-gray-100 ${color}`}
      >
        <Icon size={32} />
      </div>
      <span className="mt-1 text-center text-xs font-medium text-gray-600">
        {name}
      </span>
    </div>
  );
}
