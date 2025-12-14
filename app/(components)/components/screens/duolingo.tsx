"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  BarChart,
  BookOpen,
  Crown,
  Flame,
  Flag,
  Gem,
  Shield,
  Star,
  Store,
  User,
  Check,
  Lock,
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { LeaderboardScreen } from "./duolingo/leaderboard";
import { ProfileScreen } from "./duolingo/profile";
import { Quest, QuestsScreen } from "./duolingo/quests";
import { ShopItem, ShopScreen } from "./duolingo/shop";
import { LessonPage, LessonData } from "./duolingo/lesson";

// --- TYPES ---
interface Lesson {
  type: "star" | "book" | "chest" | "crown";
  label: string;
  status: "completed" | "current" | "locked";
}

interface BottomNavItem {
  name: string;
  icon: React.ElementType;
}

interface UserState {
  name: string;
  language: string;
  streak: number;
  gems: number;
  xp: number;
  lessons: Lesson[];
  quests: {
    daily: Quest[];
    weekly: Quest[];
  };
  shopItems: ShopItem[];
}

// --- SAMPLE DATA ---
const initialUserState: UserState = {
  name: "Alex",
  language: "Spanish",
  streak: 128,
  gems: 5400,
  xp: 12450,
  lessons: [
    { type: "star", label: "Unit 1", status: "completed" },
    { type: "book", label: "Intro", status: "completed" },
    { type: "book", label: "Phrases", status: "completed" },
    { type: "chest", label: "Bonus", status: "completed" },
    { type: "crown", label: "Unit 1 Review", status: "current" },
    { type: "star", label: "Unit 2", status: "locked" },
    { type: "book", label: "Food", status: "locked" },
    { type: "book", label: "Animals", status: "locked" },
    { type: "chest", label: "Bonus", status: "locked" },
    { type: "crown", label: "Unit 2 Review", status: "locked" },
  ],
  quests: {
    daily: [
      {
        id: "daily-1",
        title: "Earn 20 XP",
        goal: 20,
        current: 15,
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
        icon: BookOpen,
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
    ],
    weekly: [
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
        icon: BookOpen,
        color: "text-green-500",
        reward: { type: "xp", amount: 200 },
        claimed: false,
      },
    ],
  },
  shopItems: [
    {
      id: "streak-freeze",
      title: "Streak Freeze",
      description: "Protect your streak for one day of inactivity.",
      price: 200,
      icon: Shield,
      color: "text-red-500",
    },
    {
      id: "double-xp",
      title: "Double XP Boost",
      description: "Earn double XP for the next 15 minutes.",
      price: 500,
      icon: Flame,
      color: "text-yellow-500",
    },
    {
      id: "gem-pack-1",
      title: "Gem Pack (Small)",
      description: "A small pouch of 100 gems.",
      price: 100,
      icon: Gem,
      color: "text-blue-500",
    },
  ],
};

const sampleLessonData: LessonData[] = [
  {
    id: "Unit 1 Review",
    questions: [
      {
        type: "multiple-choice",
        text: "Which of these is 'the apple'?",
        options: ["La manzana", "El pan", "La mujer", "El hombre"],
        correctAnswer: "La manzana",
        xp: 10,
      },
      {
        type: "multiple-choice",
        text: "What is 'bread' in Spanish?",
        options: ["El niño", "La leche", "El pan", "El agua"],
        correctAnswer: "El pan",
        xp: 10,
      },
    ],
  },
  {
    id: "Food",
    questions: [
      {
        type: "multiple-choice",
        text: "How do you say 'I eat bread'?",
        options: [
          "Yo como pan",
          "Tú bebes agua",
          "Ella come manzana",
          "Nosotros somos niños",
        ],
        correctAnswer: "Yo como pan",
        xp: 10,
      },
      {
        type: "multiple-choice",
        text: "What does 'Tú bebes leche' mean?",
        options: [
          "You drink water",
          "She drinks milk",
          "You drink milk",
          "I drink milk",
        ],
        correctAnswer: "You drink milk",
        xp: 10,
      },
    ],
  },
];

const sampleNavItems: BottomNavItem[] = [
  { name: "Learn", icon: BookOpen },
  { name: "Leaderboards", icon: BarChart },
  { name: "Quests", icon: Shield },
  { name: "Shop", icon: Store },
  { name: "Profile", icon: User },
];

// --- PROPS INTERFACE ---
interface DuolingoProps {
  initialState?: UserState;
  onStateChange?: (newState: UserState) => void;
}

function Duolingo({
  initialState = initialUserState,
  onStateChange,
}: DuolingoProps) {
  const [userState, setUserState] = useState(initialState);
  const [activeTab, setActiveTab] = useState("Learn");
  const [isLoading, setIsLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState<LessonData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (onStateChange) {
      onStateChange(userState);
    }
  }, [userState, onStateChange]);

  const handleLessonClick = (clickedLesson: Lesson, index: number) => {
    if (clickedLesson.status === "current") {
      // Find lesson data by label (or use a better id if available)
      const lesson = sampleLessonData.find((l) => l.id === clickedLesson.label);
      if (lesson) {
        setActiveLesson(lesson);
      } else {
        toast.error("Lesson content not found!");
      }
    }
  };

  const handleLessonComplete = (xpGained: number) => {
    setUserState((prevState) => {
      const newLessons = [...prevState.lessons];
      const completedLessonIndex = newLessons.findIndex(
        (l) => l.label === (activeLesson ? activeLesson.id : ""),
      );
      if (completedLessonIndex !== -1) {
        newLessons[completedLessonIndex].status = "completed";
      }
      const nextLessonIndex = newLessons.findIndex(
        (l) => l.status === "locked",
      );
      if (nextLessonIndex !== -1) {
        newLessons[nextLessonIndex].status = "current";
      }
      toast.success(`Lesson Complete! +${xpGained} XP`);
      return {
        ...prevState,
        lessons: newLessons,
        xp: prevState.xp + xpGained,
        streak: prevState.streak + 1,
      };
    });
    setTimeout(() => setActiveLesson(null), 0);
  };

  const handleClaimQuest = (questId: string) => {
    setUserState((prevState) => {
      const { daily, weekly } = prevState.quests;
      const allQuests = [...daily, ...weekly];
      const quest = allQuests.find((q) => q.id === questId);

      if (quest && quest.current >= quest.goal && !quest.claimed) {
        const newQuests = {
          daily: prevState.quests.daily.map((q) =>
            q.id === questId ? { ...q, claimed: true } : q,
          ),
          weekly: prevState.quests.weekly.map((q) =>
            q.id === questId ? { ...q, claimed: true } : q,
          ),
        };

        const reward = quest.reward;
        let newGems = prevState.gems;
        let newXp = prevState.xp;

        if (reward.type === "gems") {
          newGems += reward.amount;
          toast.success(`+${reward.amount} Gems!`);
        } else {
          newXp += reward.amount;
          toast.success(`+${reward.amount} XP!`);
        }

        return {
          ...prevState,
          gems: newGems,
          xp: newXp,
          quests: newQuests,
        };
      }
      return prevState;
    });
  };

  const handlePurchaseItem = (itemId: string) => {
    setUserState((prevState) => {
      const item = prevState.shopItems.find((i) => i.id === itemId);

      if (item && prevState.gems >= item.price) {
        const newGems = prevState.gems - item.price;
        toast.success(`Purchased ${item.title}!`);
        // Here you would typically add the item to a user's inventory
        return { ...prevState, gems: newGems };
      } else {
        toast.error("Not enough gems!");
      }
      return prevState;
    });
  };

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const renderContent = () => {
    if (isLoading && activeTab === "Learn") {
      return <LessonPathSkeleton />;
    }
    if (activeTab === "Learn" && activeLesson) {
      return (
        <LessonPage lesson={activeLesson} onComplete={handleLessonComplete} />
      );
    }
    switch (activeTab) {
      case "Learn":
        return (
          <LessonPath
            lessons={userState.lessons}
            onLessonClick={handleLessonClick}
          />
        );
      case "Leaderboards":
        return <LeaderboardScreen />;
      case "Quests":
        return (
          <QuestsScreen
            daily={userState.quests.daily}
            weekly={userState.quests.weekly}
            onClaim={handleClaimQuest}
          />
        );
      case "Shop":
        return (
          <ShopScreen
            items={userState.shopItems}
            userGems={userState.gems}
            onPurchase={handlePurchaseItem}
          />
        );
      case "Profile":
        return (
          <ProfileScreen
            name={userState.name}
            stats={{
              streak: userState.streak,
              totalXP: userState.xp,
              league: "Diamond", // Assuming static for now
            }}
          />
        );
      default:
        return (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">{activeTab} Screen</p>
          </div>
        );
    }
  };

  return (
    <div className="relative h-[800px] bg-white font-sans tracking-[-3%]">
      <div className="scrollbar-hide relative h-full overflow-auto pb-24">
        <Header
          language={userState.language}
          streak={userState.streak}
          gems={userState.gems}
          userName={userState.name}
          lessons={userState.lessons}
        />
        {renderContent()}
      </div>
      {!(activeTab === "Learn" && activeLesson) && (
        <BottomNav
          navItems={sampleNavItems}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
      )}
    </div>
  );
}

function Header({
  language,
  streak,
  gems,
  userName,
  lessons,
}: {
  language: string;
  streak: number;
  gems: number;
  userName: string;
  lessons: Lesson[];
}) {
  const completedLessons = lessons.filter(
    (l) => l.status === "completed",
  ).length;
  const totalLessons = lessons.length;

  const motivationalMessages = [
    `You're on fire, ${userName}! 🔥`,
    `Keep up the great work, ${userName}!`,
    `Nothing can stop you now, ${userName}!`,
    `Another day, another lesson!`,
  ];
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(
      motivationalMessages[
        Math.floor(Math.random() * motivationalMessages.length)
      ],
    );
  }, [userName]);

  return (
    <div className="sticky top-0 z-20 flex flex-col gap-4 bg-white/80 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flag className="text-blue-500" size={28} />
          <span className="text-xl font-bold text-gray-700">{language}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 font-bold text-orange-500">
            <Flame size={24} />
            <span>{streak}</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-red-500">
            <Gem size={24} />
            <span>{gems}</span>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="font-bold text-gray-700">{message}</p>
        <p className="text-sm text-gray-500">
          {completedLessons} / {totalLessons} lessons completed
        </p>
      </div>
    </div>
  );
}

function LessonPath({
  lessons,
  onLessonClick,
}: {
  lessons: Lesson[];
  onLessonClick: (lesson: Lesson, index: number) => void;
}) {
  const currentLessonIndex = lessons.findIndex((l) => l.status === "current");

  const nodeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const completedLessonsCount = lessons.filter(
    (l) => l.status === "completed",
  ).length;
  const progress =
    lessons.length > 1
      ? (completedLessonsCount / (lessons.length - 1)) * 100
      : 0;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative flex flex-col items-center gap-8">
        {/* Path line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-gray-200"
          style={{ zIndex: -1 }}
        />
        <motion.div
          className="absolute top-0 w-1 bg-green-500"
          style={{ zIndex: -1, originY: 0, height: "100%" }}
          initial={{ scaleY: 0 }}
          animate={{
            scaleY: progress / 100,
            transition: { duration: 1, ease: "easeOut" },
          }}
        />

        {lessons.map((lesson, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={nodeVariants}
          >
            <LessonNode
              lesson={lesson}
              onClick={() => onLessonClick(lesson, i)}
              isCurrent={i === currentLessonIndex}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LessonNode({
  lesson,
  onClick,
  isCurrent,
}: {
  lesson: Lesson;
  onClick: () => void;
  isCurrent: boolean;
}) {
  const { type, label, status } = lesson;

  const getNodeStyles = () => {
    const baseIconColor = "text-white";
    switch (type) {
      case "star":
        return {
          icon: <Star size={32} className={baseIconColor} />,
          bgColor: "bg-yellow-400",
          textColor: "text-yellow-800",
        };
      case "book":
        return {
          icon: <BookOpen size={32} className={baseIconColor} />,
          bgColor: "bg-green-500",
          textColor: "text-green-800",
        };
      case "chest":
        return {
          icon: <Gem size={32} className={baseIconColor} />,
          bgColor: "bg-purple-600",
          textColor: "text-purple-800",
        };
      case "crown":
        return {
          icon: <Crown size={32} className={baseIconColor} />,
          bgColor: "bg-amber-500",
          textColor: "text-amber-800",
        };
    }
  };

  const { icon, bgColor, textColor } = getNodeStyles();

  const pulseAnimation = isCurrent
    ? { scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity } }
    : {};

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      whileHover={status !== "locked" ? { scale: 1.05 } : {}}
      whileTap={status !== "locked" ? { scale: 0.95 } : {}}
      animate={pulseAnimation}
    >
      <div
        onClick={onClick}
        className={cn(
          "relative flex size-20 items-center justify-center rounded-full border-8",
          status === "completed"
            ? "border-green-500 bg-green-500"
            : "border-gray-200",
          status === "locked" ? "bg-gray-300" : bgColor,
          status !== "locked" && "cursor-pointer",
        )}
      >
        {status === "completed" ? (
          <Check size={32} className="text-white" />
        ) : status === "locked" ? (
          <Lock size={32} className="text-gray-500" />
        ) : (
          icon
        )}
      </div>
      <span
        className={cn(
          "font-bold",
          status === "locked" ? "text-gray-400" : textColor,
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}

function BottomNav({
  navItems,
  activeTab,
  onTabClick,
}: {
  navItems: BottomNavItem[];
  activeTab: string;
  onTabClick: (tabName: string) => void;
}) {
  return (
    <div className="absolute right-0 bottom-0 left-0 z-10 flex h-20 w-full items-center justify-around border-t border-gray-200 bg-white">
      {navItems.map((item) => (
        <div
          key={item.name}
          onClick={() => onTabClick(item.name)}
          className={cn(
            "flex cursor-pointer flex-col items-center gap-1",
            activeTab === item.name ? "text-green-500" : "text-gray-400",
          )}
        >
          <item.icon size={28} />
          <span className="text-xs font-bold">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

function LessonPathSkeleton() {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative flex flex-col items-center gap-8">
        <div
          className="absolute top-0 bottom-0 w-1 bg-gray-200"
          style={{ zIndex: -1 }}
        />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="size-20 animate-pulse rounded-full bg-gray-300"></div>
            <div className="h-4 w-20 animate-pulse rounded bg-gray-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Duolingo;
