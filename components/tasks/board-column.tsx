"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, MoreVertical, Edit2, Trash2 } from "lucide-react";
import TaskCard from "./task-card";
import { motion, AnimatePresence } from "framer-motion";

interface BoardColumnProps {
  board: {
    id: string;
    title: string;
    tasks: Array<{
      id: string;
      title: string;
      description: string;
      dueDate: string;
      completed: boolean;
    }>;
  };
  onAddTask: () => void;
  onEditTask: (task: any) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleTask: (taskId: string) => void;
  onRenameBoard: (title: string) => void;
  onDeleteBoard: () => void;
}

export default function BoardColumn({
  board,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleTask,
  onRenameBoard,
  onDeleteBoard,
}: BoardColumnProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [title, setTitle] = useState(board.title);
  const { setNodeRef } = useDroppable({
    id: board.id,
  });

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onRenameBoard(title);
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <form onSubmit={handleRename} className="flex-1 mr-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              onBlur={() => {
                setIsEditing(false);
                setTitle(board.title);
              }}
              className="w-full px-2 py-1 text-lg font-semibold bg-transparent border-b-2 border-indigo-500 focus:outline-none text-gray-900 dark:text-white"
            />
          </form>
        ) : (
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {board.title}
          </h2>
        )}
        <div className="flex items-center gap-1">
          <button
            onClick={onAddTask}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
          >
            <Plus size={20} />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            >
              <MoreVertical size={20} />
            </button>
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-700 rounded-lg shadow-lg py-1 z-10"
                >
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <Edit2 size={14} />
                    Rename Board
                  </button>
                  <button
                    onClick={() => {
                      onDeleteBoard();
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <Trash2 size={14} />
                    Delete Board
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div ref={setNodeRef} className="space-y-3">
        {/* @ts-ignore */}
        <SortableContext
          items={board.tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {board.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task.id)}
              onToggle={() => onToggleTask(task.id)}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
