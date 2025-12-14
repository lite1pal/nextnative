"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useState } from "react";

// --- TYPES ---
export interface Question {
  type: "multiple-choice";
  text: string;
  options: string[];
  correctAnswer: string;
  xp: number;
}

export interface LessonData {
  id: string;
  questions: Question[];
}

interface LessonPageProps {
  lesson: LessonData;
  onComplete: (xpGained: number) => void;
}

// --- COMPONENT ---
export function LessonPage({ lesson, onComplete }: LessonPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [totalXp, setTotalXp] = useState(0);

  const question = lesson.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / lesson.questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    if (isCorrect !== null) return; // Prevent changing answer after checking
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setTotalXp((prev) => prev + question.xp);
      toast.success(`Correct! +${question.xp} XP`);
    } else {
      toast.error("Incorrect. Try again!");
    }
  };

  const handleContinue = () => {
    setIsCorrect(null);
    setSelectedAnswer(null);

    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Lesson finished
      setTimeout(() => onComplete(totalXp), 0); // Defer state update
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex h-full flex-col p-4"
    >
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-4 w-full rounded-full bg-gray-200">
          <motion.div
            className="h-4 rounded-full bg-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Question */}
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        {question.text}
      </h2>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswerSelect(option)}
            disabled={isCorrect !== null}
            className={cn(
              "rounded-lg border-2 p-4 text-center font-bold text-gray-700 transition",
              selectedAnswer === option
                ? "border-blue-500 bg-blue-100"
                : "border-gray-200 bg-white hover:bg-gray-50",
              isCorrect !== null &&
                (option === question.correctAnswer
                  ? "border-green-500 bg-green-100"
                  : "border-red-500 bg-red-100"),
            )}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-16">
        {isCorrect !== null ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex items-center justify-between rounded-t-2xl p-4",
              isCorrect ? "bg-green-100" : "bg-red-100",
            )}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <Check className="size-6 text-green-600" />
              ) : (
                <X className="size-6 text-red-600" />
              )}
              <p
                className={cn(
                  "font-bold",
                  isCorrect ? "text-green-600" : "text-red-600",
                )}
              >
                {isCorrect ? "Correct!" : "Incorrect"}
              </p>
            </div>
            <button
              onClick={handleContinue}
              className={cn(
                "rounded-lg px-8 py-3 font-bold text-white",
                isCorrect ? "bg-green-500" : "bg-red-500",
              )}
            >
              Continue
            </button>
          </motion.div>
        ) : (
          <button
            onClick={handleCheckAnswer}
            disabled={!selectedAnswer}
            className="w-full rounded-lg bg-blue-500 py-4 font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Check
          </button>
        )}
      </div>
    </motion.div>
  );
}

// We need to import toast, so let's add a placeholder for now.
// In a real scenario, you'd import it from 'react-hot-toast'.
const toast = {
  success: (message: string) => console.log(`Success: ${message}`),
  error: (message: string) => console.log(`Error: ${message}`),
};
