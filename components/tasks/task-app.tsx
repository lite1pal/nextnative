"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Plus, ChevronLeft } from "lucide-react";
import BoardColumn from "./board-column";
import TaskCard from "./task-card";
import TaskForm from "./task-form";
import BoardForm from "./board-form";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

interface Board {
  id: string;
  title: string;
  tasks: Task[];
}

type Mode = "list" | "addBoard" | "addTask" | "editTask";

interface TaskAppProps {
  isDark?: boolean;
}

export default function TaskApp({ isDark = true }: TaskAppProps) {
  const [mode, setMode] = useState<Mode>("list");
  const [boards, setBoards] = useState<Board[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("taskBoards");
      return saved
        ? JSON.parse(saved)
        : [
            { id: "todo", title: "To Do", tasks: [] },
            { id: "inProgress", title: "In Progress", tasks: [] },
            { id: "done", title: "Done", tasks: [] },
          ];
    }
    return [];
  });

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    localStorage.setItem("taskBoards", JSON.stringify(boards));
  }, [boards]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = boards
      .flatMap((board) => board.tasks)
      .find((task) => task.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTaskId = active.id;
    const overBoardId = over.id;

    // Find the source board (where the task is coming from)
    const sourceBoard = boards.find((board) =>
      board.tasks.some((task) => task.id === activeTaskId)
    );

    // Find the target board (where the task is being dropped)
    const targetBoard = boards.find((board) => board.id === overBoardId);

    // If either board is not found, or it's the same board, do nothing
    if (!sourceBoard || !targetBoard || sourceBoard.id === targetBoard.id) {
      return;
    }

    // Move the task from source to target board
    setBoards((boards) =>
      boards.map((board) => {
        // Remove task from source board
        if (board.id === sourceBoard.id) {
          return {
            ...board,
            tasks: board.tasks.filter((task) => task.id !== activeTaskId),
          };
        }
        // Add task to target board
        if (board.id === targetBoard.id) {
          const task = sourceBoard.tasks.find((t) => t.id === activeTaskId)!;
          return {
            ...board,
            tasks: [...board.tasks, task],
          };
        }
        return board;
      })
    );

    setActiveTask(null);
  };

  return (
    <div className={`h-full ${isDark ? "dark" : ""}`}>
      <div className="h-full min-h-[1000px] bg-white dark:bg-gray-900 flex flex-col relative">
        <AnimatePresence mode="wait">
          {mode === "list" ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col h-full"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 shadow-sm">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Task Manager
                </h1>
                <button
                  onClick={() => setMode("addBoard")}
                  className="p-2 rounded-full bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/70"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Boards Container */}
              <div className="flex-1 overflow-y-auto p-4">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCorners}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex flex-col gap-4">
                    {boards.map((board) => (
                      <BoardColumn
                        key={board.id}
                        board={board}
                        onAddTask={() => {
                          setEditingBoardId(board.id);
                          setMode("addTask");
                        }}
                        onEditTask={(task) => {
                          setEditingTask(task);
                          setEditingBoardId(board.id);
                          setMode("editTask");
                        }}
                        onDeleteTask={(taskId) => {
                          setBoards((boards) =>
                            boards.map((b) =>
                              b.id === board.id
                                ? {
                                    ...b,
                                    tasks: b.tasks.filter(
                                      (t) => t.id !== taskId
                                    ),
                                  }
                                : b
                            )
                          );
                        }}
                        onToggleTask={(taskId) => {
                          setBoards((boards) =>
                            boards.map((b) =>
                              b.id === board.id
                                ? {
                                    ...b,
                                    tasks: b.tasks.map((t) =>
                                      t.id === taskId
                                        ? { ...t, completed: !t.completed }
                                        : t
                                    ),
                                  }
                                : b
                            )
                          );
                        }}
                        onRenameBoard={(title) => {
                          setBoards((boards) =>
                            boards.map((b) =>
                              b.id === board.id ? { ...b, title } : b
                            )
                          );
                        }}
                        onDeleteBoard={() => {
                          setBoards((boards) =>
                            boards.filter((b) => b.id !== board.id)
                          );
                        }}
                      />
                    ))}
                  </div>
                  {/* @ts-ignore */}
                  <DragOverlay>
                    {activeTask && (
                      <TaskCard task={activeTask} isDragging={true} />
                    )}
                  </DragOverlay>
                </DndContext>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 shadow-sm">
                <button
                  onClick={() => {
                    setMode("list");
                    setEditingTask(null);
                    setEditingBoardId(null);
                  }}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                >
                  <ChevronLeft size={20} />
                </button>
                <h1 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {mode === "addBoard"
                    ? "New Board"
                    : mode === "editTask"
                    ? "Edit Task"
                    : "New Task"}
                </h1>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                {mode === "addBoard" ? (
                  <BoardForm
                    onSubmit={(title) => {
                      setBoards((boards) => [
                        ...boards,
                        { id: Date.now().toString(), title, tasks: [] },
                      ]);
                      setMode("list");
                    }}
                  />
                ) : (
                  <TaskForm
                    task={editingTask}
                    onSubmit={(task) => {
                      if (editingTask) {
                        setBoards((boards) =>
                          boards.map((b) =>
                            b.id === editingBoardId
                              ? {
                                  ...b,
                                  tasks: b.tasks.map((t) =>
                                    t.id === editingTask.id
                                      ? { ...task, id: t.id }
                                      : t
                                  ),
                                }
                              : b
                          )
                        );
                      } else {
                        setBoards((boards) =>
                          boards.map((b) =>
                            b.id === editingBoardId
                              ? {
                                  ...b,
                                  tasks: [
                                    ...b.tasks,
                                    { ...task, id: Date.now().toString() },
                                  ],
                                }
                              : b
                          )
                        );
                      }
                      setMode("list");
                      setEditingTask(null);
                      setEditingBoardId(null);
                    }}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
