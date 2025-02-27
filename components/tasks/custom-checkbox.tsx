"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: any;
}

export default function CustomCheckbox({
  checked,
  onChange,
}: CustomCheckboxProps) {
  return (
    <button
      onClick={onChange}
      className={`relative flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors ${
        checked
          ? "bg-indigo-600 border-indigo-600"
          : "bg-transparent border-gray-300 dark:border-gray-600 hover:border-indigo-600 dark:hover:border-indigo-500"
      }`}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="text-white"
        >
          <Check size={12} strokeWidth={3} />
        </motion.div>
      )}
    </button>
  );
}
