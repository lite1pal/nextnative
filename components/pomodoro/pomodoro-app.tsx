"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "@/hooks/use-notification";

interface TimerState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  mode: "work" | "break";
}

export default function PomodoroApp() {
  const [settings, setSettings] = useState({
    workDuration: 25,
    breakDuration: 5,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [timer, setTimer] = useState<TimerState>({
    minutes: settings.workDuration,
    seconds: 0,
    isRunning: false,
    mode: "work",
  });

  const { requestPermission, sendNotification } = useNotification();

  const resetTimer = useCallback(() => {
    setTimer((prev) => ({
      ...prev,
      minutes:
        prev.mode === "work" ? settings.workDuration : settings.breakDuration,
      seconds: 0,
      isRunning: false,
    }));
  }, [settings]);

  const toggleTimer = () => {
    setTimer((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const switchMode = useCallback(() => {
    setTimer((prev) => ({
      ...prev,
      mode: prev.mode === "work" ? "break" : "work",
      minutes:
        prev.mode === "work" ? settings.breakDuration : settings.workDuration,
      seconds: 0,
      isRunning: false,
    }));
  }, [settings]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer.isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev.minutes === 0 && prev.seconds === 0) {
            const message =
              prev.mode === "work"
                ? "Work session completed! Time for a break!"
                : "Break time is over! Ready to work?";
            sendNotification("Pomodoro Timer", message);
            switchMode();
            return prev;
          }

          if (prev.seconds === 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          }

          return { ...prev, seconds: prev.seconds - 1 };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer.isRunning, switchMode, sendNotification]);

  // Update timer when settings change
  useEffect(() => {
    setTimer((prev) => ({
      ...prev,
      minutes:
        prev.mode === "work" ? settings.workDuration : settings.breakDuration,
      seconds: 0,
      isRunning: true,
    }));
  }, [settings.workDuration, settings.breakDuration]);

  return (
    <div className="relative h-full min-h-[1000px] bg-white dark:bg-black">
      {/* Main Timer Display */}
      <div className="flex flex-col items-center justify-center h-full pt-20 px-6 pb-20">
        {/* Mode Indicator */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {timer.mode === "work" ? "Focus Time" : "Break Time"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {timer.mode === "work"
              ? "Stay focused on your task"
              : "Take a short break"}
          </p>
        </div>

        {/* Timer Circle */}
        <div className="relative w-64 h-64 mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200 dark:text-gray-800"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={
                2 *
                Math.PI *
                120 *
                (1 -
                  (timer.minutes * 60 + timer.seconds) /
                    (timer.mode === "work"
                      ? settings.workDuration * 60
                      : settings.breakDuration * 60))
              }
              className="text-indigo-600 dark:text-indigo-500 transition-all duration-1000"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-sf-pro text-gray-900 dark:text-white">
              {`${timer.minutes.toString().padStart(2, "0")}:${timer.seconds
                .toString()
                .padStart(2, "0")}`}
            </span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={resetTimer}
            className="p-4 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Reset timer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
          <button
            onClick={toggleTimer}
            className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
            aria-label={timer.isRunning ? "Pause timer" : "Start timer"}
          >
            {timer.isRunning ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="p-4 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Open settings"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Settings Sheet with Backdrop */}
      <AnimatePresence>
        {showSettings && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
            />

            {/* Settings Panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-x-0 bottom-[200px] bg-white dark:bg-gray-900 rounded-t-3xl shadow-xl max-h-[70%] overflow-y-auto z-50"
              style={{
                paddingBottom: "env(safe-area-inset-bottom, 16px)",
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Timer Settings
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Settings Controls */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Work Duration (minutes)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={settings.workDuration}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          workDuration: Math.min(
                            60,
                            Math.max(1, +e.target.value)
                          ),
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Break Duration (minutes)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={settings.breakDuration}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          breakDuration: Math.min(
                            30,
                            Math.max(1, +e.target.value)
                          ),
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
