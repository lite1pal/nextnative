"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

// --- TYPES ---
interface User {
  rank: number;
  name: string;
  xp: number;
  avatar: string; // Assuming simple emoji avatars for now
  isCurrentUser?: boolean;
}

// --- SAMPLE DATA ---
const sampleUsers: User[] = [
  { rank: 1, name: "Alex", xp: 4520, avatar: "🧑‍🚀" },
  { rank: 2, name: "Maria", xp: 4210, avatar: "👩‍🎨" },
  { rank: 3, name: "David", xp: 3980, avatar: "👨‍💻" },
  {
    rank: 4,
    name: "You",
    xp: 3850,
    avatar: "😊",
    isCurrentUser: true,
  },
  { rank: 5, name: "Sophia", xp: 3720, avatar: "👩‍🔬" },
  { rank: 6, name: "James", xp: 3510, avatar: "👨‍🚀" },
  { rank: 7, name: "Isabella", xp: 3340, avatar: "👩‍🏫" },
  { rank: 8, name: "Liam", xp: 3100, avatar: "👨‍🎨" },
  { rank: 9, name: "Olivia", xp: 2980, avatar: "👩‍💻" },
  { rank: 10, name: "Noah", xp: 2750, avatar: "👨‍🔬" },
];

// --- PROPS INTERFACE ---
interface LeaderboardProps {
  users?: User[];
}

export function LeaderboardScreen({ users = sampleUsers }: LeaderboardProps) {
  const currentUser = users.find((u) => u.isCurrentUser);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
              user.isCurrentUser
                ? "border-2 border-blue-400 bg-blue-100"
                : "bg-white",
            )}
          >
            <span className="w-8 text-lg font-bold text-gray-600">
              {user.rank}
            </span>
            <div className="relative mr-4 flex size-12 items-center justify-center rounded-full bg-gray-200 text-3xl">
              <span>{user.avatar}</span>
              {user.rank === 1 && (
                <Crown
                  className="absolute -top-2 -right-2 text-yellow-500"
                  size={24}
                  fill="currentColor"
                />
              )}
            </div>
            <span className="flex-grow font-bold text-gray-800">
              {user.name}
            </span>
            <span className="font-bold text-yellow-600">{user.xp} XP</span>
          </motion.div>
        ))}
      </div>
      {currentUser && (
        <div className="mt-4 border-t-2 border-gray-200 bg-white p-4 text-center">
          <h2 className="text-lg font-bold">Your Ranking</h2>
          <p className="text-gray-600">
            You are rank{" "}
            <span className="font-bold text-blue-500">{currentUser.rank}</span>{" "}
            with{" "}
            <span className="font-bold text-yellow-600">
              {currentUser.xp} XP
            </span>
            .
          </p>
        </div>
      )}
    </motion.div>
  );
}
