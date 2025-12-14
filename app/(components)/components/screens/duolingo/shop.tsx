"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Gem, Heart, Zap } from "lucide-react";

// --- TYPES ---
export interface ShopItem {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: React.ElementType;
  color: string;
}

// --- SAMPLE DATA ---
const shopItems: ShopItem[] = [
  {
    id: "streak-freeze",
    title: "Streak Freeze",
    description: "Protect your streak for one day of inactivity.",
    price: 200,
    icon: Heart,
    color: "text-red-500",
  },
  {
    id: "double-xp",
    title: "Double XP Boost",
    description: "Earn double XP for the next 15 minutes.",
    price: 500,
    icon: Zap,
    color: "text-yellow-500",
  },
  {
    id: "gem-pack-1",
    title: "Gem Pack (Small)",
    description: "A small pouch of 100 gems.",
    price: 100, // Note: This is a gem-for-gem purchase, which is unusual.
    // In a real app, this would be a real-money purchase.
    // For this demo, we'll allow buying gems with gems.
    icon: Gem,
    color: "text-blue-500",
  },
];

// --- PROPS INTERFACE ---
interface ShopScreenProps {
  items?: ShopItem[];
  onPurchase: (itemId: string) => void;
  userGems: number;
}

export function ShopScreen({
  items = shopItems,
  onPurchase,
  userGems,
}: ShopScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Shop</h1>
        <div className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1">
          <Gem className="size-5 text-blue-500" />
          <span className="font-bold text-blue-600">{userGems}</span>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <ShopItemCard
            key={index}
            item={item}
            onPurchase={onPurchase}
            userGems={userGems}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ShopItemCard({
  item,
  onPurchase,
  userGems,
}: {
  item: ShopItem;
  onPurchase: (itemId: string) => void;
  userGems: number;
}) {
  const { icon: Icon, title, description, price, color, id } = item;
  const canAfford = userGems >= price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-4 rounded-lg bg-white p-4"
    >
      <Icon className={cn("size-12 shrink-0", color)} />
      <div className="flex-grow">
        <p className="font-bold text-gray-800">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={() => onPurchase(id)}
        disabled={!canAfford}
        className={cn(
          "flex items-center gap-2 rounded-lg px-4 py-2 font-bold text-white",
          canAfford
            ? "bg-green-500 hover:bg-green-600"
            : "cursor-not-allowed bg-gray-300",
        )}
      >
        <Gem className="size-4" />
        {price}
      </button>
    </motion.div>
  );
}
