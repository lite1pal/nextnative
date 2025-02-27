"use client";

import { motion } from "framer-motion";
import NoteList from "./note-list";

export default function IPhoneMockup({
  children,
  isDark = false,
}: {
  children: React.ReactNode;
  isDark?: boolean;
}) {
  return (
    <div className="p-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        {/* iPhone mockup using DaisyUI with custom styling */}
        <div className="mockup-phone">
          <div className="mockup-phone-camera"></div>
          <div className="mockup-phone-display relative">
            {/* Status bar */}
            <div className="artboard artboard-demo phone-1">
              <div
                className={`pt-4 pb-3 rounded-t-3xl backdrop-blur-xl z-50 flex items-center justify-between px-4 ${
                  isDark ? "bg-black" : "bg-white"
                }`}
              >
                <div
                  className={`text-xs font-medium ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  9:41
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ color: isDark ? "white" : "black" }}
                  >
                    <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z" />
                  </svg>
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ color: isDark ? "white" : "black" }}
                  >
                    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                  </svg>
                  <div
                    className={`w-6 h-3  rounded-sm relative ${
                      isDark ? "bg-gray-700" : "bg-gray-300"
                    }`}
                  >
                    <div className="absolute right-0.5 top-0.5 bottom-0.5 left-1 bg-base-100 rounded-sm" />
                  </div>
                </div>
              </div>

              {/* Note app content */}
              <div className="h-full overflow-hidden">{children}</div>

              {/* Home indicator */}
              <div className="absolute bottom-2 right-0 left-0 w-full z-[90] flex items-center justify-center">
                <div
                  className={`w-32 h-1 rounded-full ${
                    isDark ? "bg-gray-700" : "bg-gray-300"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
