"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  lastReviewed?: string;
}

type Mode = "list" | "quiz" | "add" | "edit";

export default function FlashcardApp() {
  const [cards, setCards] = useState<Flashcard[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("flashcards");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [mode, setMode] = useState<Mode>("list");
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(cards));
  }, [cards]);

  function addCard(question: string, answer: string) {
    setCards((prev) => [
      ...prev,
      { id: Date.now().toString(), question, answer },
    ]);
    setMode("list");
  }

  function editCard(question: string, answer: string, id?: string) {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, question, answer } : card
      )
    );
    setMode("list");
  }

  function deleteCard(id: string) {
    setCards((prev) => prev.filter((card) => card.id !== id));
  }

  function startQuiz() {
    if (cards.length === 0) return;
    setQuizIndex(0);
    setScore({ correct: 0, total: 0 });
    setMode("quiz");
    setCurrentCard(cards[0]);
  }

  return (
    <div className="h-full min-h-[1000px] bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Flashcards
        </h1>
        {mode === "list" ? (
          <button
            onClick={() => setMode("add")}
            className="p-2 rounded-full bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
          >
            <Plus size={20} />
          </button>
        ) : (
          <button
            onClick={() => setMode("list")}
            className="p-2 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
          >
            <ChevronLeft size={20} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {mode === "list" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-auto p-4"
            >
              {cards.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    No flashcards yet. Add some to get started!
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-auto max-h-[600px] space-y-4 pb-10">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
                      >
                        <p className="text-gray-900 dark:text-white font-medium mb-2">
                          {card.question}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {card.answer}
                        </p>
                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            onClick={() => {
                              setCurrentCard(card);
                              setMode("edit");
                            }}
                            className="p-1.5 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteCard(card.id)}
                            className="p-1.5 rounded text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={startQuiz}
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Start Quiz
                  </button>
                </>
              )}
            </motion.div>
          )}

          {(mode === "add" || mode === "edit") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-auto p-4"
            >
              <CardForm
                card={mode === "edit" ? currentCard : null}
                onSubmit={mode === "edit" ? editCard : addCard}
              />
            </motion.div>
          )}

          {mode === "quiz" && currentCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full p-4"
            >
              <QuizMode
                card={currentCard}
                index={quizIndex}
                total={cards.length}
                score={score}
                onNext={() => {
                  if (quizIndex < cards.length - 1) {
                    setQuizIndex(quizIndex + 1);
                    setCurrentCard(cards[quizIndex + 1]);
                    setIsFlipped(false);
                  } else {
                    setMode("list");
                  }
                }}
                onAnswer={(correct) => {
                  setScore((prev) => ({
                    correct: prev.correct + (correct ? 1 : 0),
                    total: prev.total + 1,
                  }));
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CardForm({
  card,
  onSubmit,
}: {
  card: Flashcard | null;
  onSubmit: (question: string, answer: string, id?: string) => void;
}) {
  const [question, setQuestion] = useState(card?.question || "");
  const [answer, setAnswer] = useState(card?.answer || "");

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (card?.id) {
          onSubmit(question, answer, card.id);
        } else {
          onSubmit(question, answer);
        }
      }}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Question
        </label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Answer
        </label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
      >
        {card ? "Save Changes" : "Add Card"}
      </button>
    </motion.form>
  );
}

function QuizMode({
  card,
  index,
  total,
  score,
  onNext,
  onAnswer,
}: {
  card: Flashcard;
  index: number;
  total: number;
  score: { correct: number; total: number };
  onNext: () => void;
  onAnswer: (correct: boolean) => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  return (
    <div className="h-full flex flex-col">
      {/* Progress and Score */}
      <div className="text-center mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Card {index + 1} of {total}
        </p>
        <p className="text-sm text-indigo-600 dark:text-indigo-400">
          Score: {score.correct}/{score.total}
        </p>
      </div>

      {/* Card Container */}
      <div className="flex-1 flex items-center justify-center min-h-[300px] relative">
        <motion.div
          className="w-full h-full max-w-md mx-auto relative"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            perspective: 1000,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Question Side */}
          <div
            className={`absolute inset-0 bg-white dark:bg-gray-800 rounded-xl p-6 flex items-center justify-center text-center ${
              isFlipped ? "backface-hidden" : ""
            }`}
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <p className="text-xl text-gray-900 dark:text-white">
              {card.question}
            </p>
          </div>

          {/* Answer Side */}
          <div
            className={`absolute inset-0 bg-white dark:bg-gray-800 rounded-xl p-6 flex items-center justify-center text-center ${
              !isFlipped ? "backface-hidden" : ""
            }`}
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="text-xl text-gray-900 dark:text-white">
              {card.answer}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="mt-6 space-y-4">
        {!isFlipped ? (
          <button
            onClick={() => setIsFlipped(true)}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            Show Answer
          </button>
        ) : !hasAnswered ? (
          <div className="flex gap-4">
            <button
              onClick={() => {
                onAnswer(false);
                setHasAnswered(true);
              }}
              className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
            >
              Incorrect
            </button>
            <button
              onClick={() => {
                onAnswer(true);
                setHasAnswered(true);
              }}
              className="flex-1 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
            >
              Correct
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              onNext();
              setIsFlipped(false);
              setHasAnswered(false);
            }}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            Next Card
          </button>
        )}
      </div>
    </div>
  );
}
