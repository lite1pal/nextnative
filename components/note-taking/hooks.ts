import { useState, useEffect } from "react";
import { noteStore } from "./store";
import type { Note } from "./types";

export function useNoteStore() {
  const [notes, setNotes] = useState<Note[]>(noteStore.notes);
  const [folders, setFolders] = useState<string[]>(noteStore.folders);
  const [tags, setTags] = useState<string[]>(noteStore.tags);

  useEffect(() => {
    // Setup storage event listener for cross-tab synchronization
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "note-storage") {
        const data = JSON.parse(event.newValue || "{}");
        setNotes(data.notes || []);
        setFolders(data.folders || []);
        setTags(data.tags || []);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addNote = (note: Omit<Note, "id" | "date" | "lastModified">) => {
    noteStore.addNote(note);
    setNotes(noteStore.notes);
  };

  const updateNote = (note: Note) => {
    noteStore.updateNote(note);
    setNotes(noteStore.notes);
  };

  const deleteNote = (id: string) => {
    noteStore.deleteNote(id);
    setNotes(noteStore.notes);
  };

  const addTag = (tag: string) => {
    noteStore.addTag(tag);
    setTags(noteStore.tags);
  };

  const removeTag = (tag: string) => {
    noteStore.removeTag(tag);
    setTags(noteStore.tags);
    setNotes(noteStore.notes);
  };

  const addFolder = (folder: string) => {
    noteStore.addFolder(folder);
    setFolders(noteStore.folders);
  };

  const removeFolder = (folder: string) => {
    noteStore.removeFolder(folder);
    setFolders(noteStore.folders);
    setNotes(noteStore.notes);
  };

  return {
    notes,
    folders,
    tags,
    addNote,
    updateNote,
    deleteNote,
    addTag,
    removeTag,
    addFolder,
    removeFolder,
  };
}
