"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format } from "date-fns";
import { Edit2, Trash2, GripVertical } from "lucide-react";
import { motion } from "framer-motion";
import CustomCheckbox from "./custom-checkbox";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
  };
  onEdit?: () => void;
  onDelete?: () => void;
  onToggle?: () => void;
  isDragging?: boolean;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggle,
  isDragging,
}: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onToggle?.();
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm"
    >
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="flex-shrink-0 cursor-grab active:cursor-grabbing mt-1"
        >
          <GripVertical
            size={16}
            className="text-gray-400 dark:text-gray-500"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div onClick={(e) => e.stopPropagation()}>
              <CustomCheckbox
                checked={task.completed}
                onChange={handleToggle}
              />
            </div>
            <h3
              className={`font-medium ${
                task.completed
                  ? "text-gray-400 dark:text-gray-500 line-through"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {task.title}
            </h3>
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {task.description}
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            Due: {format(new Date(task.dueDate), "MMM d, yyyy")}
          </p>
        </div>

        {/* Actions */}
        {!isDragging && (
          <div className="flex gap-1 flex-shrink-0">
            <button
              onClick={handleEdit}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
