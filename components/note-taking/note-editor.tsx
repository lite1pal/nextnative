"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import type { Note } from "./types";
import { useNoteStore } from "./hooks";

interface NoteEditorProps {
  note?: Omit<Note, "lastModified">;
  onClose: () => void;
  onSave: (note: Omit<Note, "id" | "date" | "lastModified">) => void;
  onDelete?: () => void;
}

export default function NoteEditor({
  note,
  onClose,
  onSave,
  onDelete,
}: NoteEditorProps) {
  const { folders } = useNoteStore();
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [folder, setFolder] = useState(note?.folder || "Personal");
  const [isSaving, setIsSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [cursorPosition, setCursorPosition] = useState<{
    start: number;
    end: number;
  } | null>(null);
  const [tags, setTags] = useState(note?.tags || []);
  const [tagInput, setTagInput] = useState("");

  // Debounce save function
  const saveTimeoutRef = useRef<NodeJS.Timeout>(null);

  const debouncedSave = useCallback(
    (updates: {
      title?: string;
      content?: string;
      folder?: string;
      tags?: string[];
    }) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(() => {
        // Only save if we have a note (editing mode)
        if (note) {
          onSave({
            title: updates.title ?? title,
            content: updates.content ?? content,
            folder: updates.folder ?? folder,
            tags: updates.tags ?? tags,
            isPinned: note.isPinned || false,
          });
        }
      }, 1000);
    },
    [title, content, folder, tags, note, onSave]
  );

  // Extract tags from content (words starting with #)
  const extractTags = (text: string): string[] => {
    const matches = text.match(/#[\w-]+/g) || [];
    return [...new Set(matches.map((tag) => tag.slice(1)))];
  };

  // Highlight tags in the content
  const getHighlightedContent = (text: string): React.ReactNode => {
    const parts = text.split(/(#[\w-]+)/g);
    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith("#")) {
            return (
              <span key={index} className="text-blue-500 font-medium">
                {part}
              </span>
            );
          }
          return part;
        })}
      </>
    );
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(content.length, content.length);
    }
  }, [content]);

  // Update handlers to use debounced save
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debouncedSave({ title: newTitle });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    const newPosition = {
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
    };
    setContent(newContent);
    setCursorPosition(newPosition);
    debouncedSave({ content: newContent });
  };

  const handleFolderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFolder = e.target.value;
    setFolder(newFolder);
    debouncedSave({ folder: newFolder });
  };

  useEffect(() => {
    if (cursorPosition && textareaRef.current) {
      textareaRef.current.selectionStart = cursorPosition.start;
      textareaRef.current.selectionEnd = cursorPosition.end;
    }
  }, [content, cursorPosition]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Save on Cmd/Ctrl + S
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      handleSave();
      return;
    }

    // Handle Enter key
    if (e.key === "Enter") {
      const textarea = e.currentTarget;
      const { selectionStart, selectionEnd } = textarea;
      const beforeCursor = content.substring(0, selectionStart);
      const afterCursor = content.substring(selectionEnd);

      setContent(beforeCursor + "\n" + afterCursor);
      setCursorPosition({
        start: selectionStart + 1,
        end: selectionStart + 1,
      });
      e.preventDefault();
      return;
    }

    // Add tag on # press
    if (e.key === "#") {
      const textarea = e.currentTarget;
      const { selectionStart, selectionEnd } = textarea;
      // Add space before # if not at start and previous char isn't space
      if (selectionStart > 0 && content[selectionStart - 1] !== " ") {
        const newContent =
          content.slice(0, selectionStart) + " #" + content.slice(selectionEnd);
        setContent(newContent);
        setCursorPosition({
          start: selectionStart + 2,
          end: selectionStart + 2,
        });
        e.preventDefault();
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const tags = extractTags(content);
    await onSave({
      title,
      content,
      folder,
      tags,
      isPinned: note?.isPinned || false,
    });
    setIsSaving(false);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Manual save for both new and existing notes
  const handleManualSave = async () => {
    setIsSaving(true);
    await onSave({
      title,
      content,
      folder,
      tags: extractTags(content),
      isPinned: note?.isPinned || false,
    });
    setIsSaving(false);
    if (!note) {
      onClose(); // Only close if it's a new note
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 md:relative bg-white dark:bg-gray-900 z-50"
    >
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-gray-900 backdrop-blur-xl border-b border-gray-200 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-400"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <select
                value={folder}
                onChange={handleFolderChange}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
              >
                {folders.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              {onDelete && (
                <button
                  onClick={() => {
                    onDelete();
                    onClose(); // Close editor after delete
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={handleManualSave}
                disabled={isSaving}
                className="flex items-center gap-1 px-4 py-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : (
                  "Done"
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Editor */}
      <div className="p-4">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
          className="w-full text-2xl font-semibold mb-4 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            placeholder="Start writing... (Use # to create tags)"
            className="w-full h-[calc(100vh-180px)] md:h-[600px] bg-transparent focus:outline-none resize-none text-gray-700 leading-relaxed dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            style={{ whiteSpace: "pre-wrap" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none text-gray-700 leading-relaxed whitespace-pre-wrap dark:text-white"
          >
            {getHighlightedContent(content)}
          </div>
        </div>
      </div>

      {/* Tag Preview */}
      {/* <div className="fixed bottom-0 left-0 right-0 md:absolute border-t border-gray-200 bg-white/80 dark:bg-gray-800 backdrop-blur-xl">
        <div className="px-4 py-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/50"
              onClick={() => setTags(tags.filter((t) => t !== tag))}
            >
              #{tag}
            </span>
          ))}
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Add tag..."
            className="flex-1 min-w-[100px] bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
          />
        </div>
      </div> */}
    </motion.div>
  );
}
