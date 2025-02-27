"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useRef, useEffect } from "react";
import { useNoteStore } from "./hooks";
import NoteEditor from "./note-editor";
import type { Note, SortOption } from "./types";

function formatDate(date: string): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return d.toLocaleDateString();
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return <>{text}</>;

  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="bg-yellow-200">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

interface NoteListProps {
  isDark?: boolean;
}

export default function NoteList({ isDark = false }: NoteListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("All Notes");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [isEditing, setIsEditing] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [isFoldersExpanded, setIsFoldersExpanded] = useState(false);

  const { notes, folders, tags, addNote, updateNote, deleteNote, addFolder } =
    useNoteStore();

  const visibleFolders = isFoldersExpanded ? folders : folders.slice(0, 3);

  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) => {
        const matchesSearch =
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFolder =
          selectedFolder === "All Notes" || note.folder === selectedFolder;
        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.every((tag) => note.tags.includes(tag));
        return matchesSearch && matchesFolder && matchesTags;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "title":
            return a.title.localeCompare(b.title);
          case "modified":
            return (
              new Date(b.lastModified).getTime() -
              new Date(a.lastModified).getTime()
            );
          case "folder":
            return a.folder.localeCompare(b.folder);
          default:
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      });
  }, [notes, searchQuery, selectedFolder, selectedTags, sortBy]);

  useEffect(() => {
    if (isAddingFolder && folderInputRef.current) {
      folderInputRef.current.focus();
    }
  }, [isAddingFolder]);

  const handleCreateNote = () => {
    setEditingNote(null);
    setIsEditing(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsEditing(true);
  };

  const handleSaveNote = async (
    note: Omit<Note, "id" | "date" | "lastModified">
  ) => {
    if (editingNote) {
      await updateNote({
        ...note,
        id: editingNote.id,
        date: editingNote.date,
        lastModified: new Date().toISOString(),
      });
    } else {
      await addNote(note);
      setIsEditing(false);
      setEditingNote(null);
    }
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
    setSelectedFolder("All Notes");
    setIsEditing(false);
    setEditingNote(null);
  };

  const handleAddFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      addFolder(newFolderName.trim());
      setNewFolderName("");
      setIsAddingFolder(false);
    }
  };

  // Group notes by tag and count them
  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>();
    notes.forEach((note) => {
      note.tags.forEach((tag) => {
        counts.set(tag, (counts.get(tag) || 0) + 1);
      });
    });
    return counts;
  }, [notes]);

  return (
    <div className={`h-full ${isDark ? "dark" : ""}`}>
      <div className="h-full min-h-[1000px] bg-white dark:bg-gray-900 flex flex-col">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <NoteEditor
              key="editor"
              note={editingNote || undefined}
              onClose={() => {
                setIsEditing(false);
                setEditingNote(null);
              }}
              onSave={handleSaveNote}
              onDelete={
                editingNote ? () => handleDeleteNote(editingNote.id) : undefined
              }
            />
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col h-full"
            >
              {/* Header */}
              <header className="sticky top-0 bg-white dark:bg-gray-900 backdrop-blur-xl z-0">
                <div className="px-4 pt-3">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Notes
                    </h1>
                    <button
                      onClick={handleCreateNote}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors"
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
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Search and Sort */}
                  <div className="flex gap-2 mb-4">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-200/70 dark:bg-gray-800/70 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                      <svg
                        className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="px-3 py-2 bg-gray-200/70 dark:bg-gray-800/70 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="date">Date</option>
                      <option value="modified">Modified</option>
                      <option value="title">Title</option>
                      <option value="folder">Folder</option>
                    </select>
                  </div>

                  {/* Folders - Compact UI */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedFolder("All Notes")}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          selectedFolder === "All Notes"
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        All Notes
                      </button>
                      {visibleFolders.map((folder) => (
                        <button
                          key={folder}
                          onClick={() => setSelectedFolder(folder)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                            selectedFolder === folder
                              ? "bg-indigo-500 text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          {folder}
                        </button>
                      ))}
                      {folders.length > 3 && (
                        <button
                          onClick={() =>
                            setIsFoldersExpanded(!isFoldersExpanded)
                          }
                          className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          {isFoldersExpanded
                            ? "Show Less"
                            : `+${folders.length - 3} More`}
                        </button>
                      )}
                      <button
                        onClick={() => setIsAddingFolder(true)}
                        className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        New
                      </button>
                    </div>

                    {/* Add Folder Form */}
                    <AnimatePresence>
                      {isAddingFolder && (
                        <motion.form
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          onSubmit={handleAddFolder}
                          className="mt-2"
                        >
                          <div className="flex gap-2">
                            <input
                              ref={folderInputRef}
                              type="text"
                              value={newFolderName}
                              onChange={(e) => setNewFolderName(e.target.value)}
                              onBlur={() => {
                                if (!newFolderName.trim()) {
                                  setIsAddingFolder(false);
                                }
                              }}
                              placeholder="New folder name..."
                              className="flex-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            />
                            <button
                              type="submit"
                              className="px-3 py-1.5 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600"
                            >
                              Add
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setIsAddingFolder(false);
                                setNewFolderName("");
                              }}
                              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex gap-2 mt-2 overflow-x-auto pb-2 scrollbar-hide">
                      {tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() =>
                            setSelectedTags((prev) =>
                              prev.includes(tag)
                                ? prev.filter((t) => t !== tag)
                                : [...prev, tag]
                            )
                          }
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selectedTags.includes(tag)
                              ? "bg-green-500 text-white"
                              : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </header>

              {/* Notes List */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <AnimatePresence>
                  {filteredNotes.map((note) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="group px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      onClick={() => handleEditNote(note)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h2 className="font-medium text-gray-900 dark:text-white">
                          {highlightText(note.title, searchQuery)}
                        </h2>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(note.date)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {highlightText(note.content, searchQuery)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {note.folder}
                        </span>
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Tag Cloud */}
              <div className="mt-auto">
                <div className="px-4 py-3">
                  {/* <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    All Tags
                  </h2> */}
                  <div className="flex flex-wrap gap-2">
                    {Array.from(tagCounts.entries())
                      .sort((a, b) => b[1] - a[1])
                      .map(([tag, count]) => (
                        <button
                          key={tag}
                          onClick={() => {
                            setSelectedTags((prev) =>
                              prev.includes(tag)
                                ? prev.filter((t) => t !== tag)
                                : [...prev, tag]
                            );
                          }}
                          className={`group px-3 py-1.5 rounded-lg text-sm transition-colors ${
                            selectedTags.includes(tag)
                              ? "bg-indigo-500 text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          <span>#{tag}</span>
                          <span
                            className={`ml-1.5 text-xs ${
                              selectedTags.includes(tag)
                                ? "text-indigo-200"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
