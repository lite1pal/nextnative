import type { Note, NoteStore } from "./types";

class NoteManager implements NoteStore {
  private static instance: NoteManager;
  notes: Note[] = [];
  folders: string[] = ["Personal", "Work", "Ideas"];
  tags: string[] = [];

  private constructor() {
    this.loadFromStorage();
  }

  static getInstance(): NoteManager {
    if (!NoteManager.instance) {
      NoteManager.instance = new NoteManager();
    }
    return NoteManager.instance;
  }

  private saveToStorage() {
    localStorage.setItem(
      "note-storage",
      JSON.stringify({
        notes: this.notes,
        folders: this.folders,
        tags: this.tags,
      })
    );
  }

  private loadFromStorage() {
    const data = localStorage.getItem("note-storage");
    if (data) {
      const parsed = JSON.parse(data);
      this.notes = parsed.notes;
      this.folders = parsed.folders;
      this.tags = parsed.tags;
    }
  }

  addNote(note: Omit<Note, "id" | "date" | "lastModified">) {
    const newNote = {
      ...note,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };
    this.notes = [newNote, ...this.notes];
    this.saveToStorage();
  }

  updateNote(updatedNote: Note) {
    this.notes = this.notes.map((note) =>
      note.id === updatedNote.id
        ? { ...updatedNote, lastModified: new Date().toISOString() }
        : note
    );
    this.saveToStorage();
  }

  deleteNote(id: string) {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.saveToStorage();
  }

  addTag(tag: string) {
    if (!this.tags.includes(tag)) {
      this.tags = [...this.tags, tag];
      this.saveToStorage();
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((t) => t !== tag);
    this.notes = this.notes.map((note) => ({
      ...note,
      tags: note.tags.filter((t) => t !== tag),
    }));
    this.saveToStorage();
  }

  addFolder(folder: string) {
    if (!this.folders.includes(folder)) {
      this.folders = [...this.folders, folder];
      this.saveToStorage();
    }
  }

  removeFolder(folder: string) {
    this.folders = this.folders.filter((f) => f !== folder);
    this.notes = this.notes.map((note) => ({
      ...note,
      folder: note.folder === folder ? "Personal" : note.folder,
    }));
    this.saveToStorage();
  }
}

export const noteStore = NoteManager.getInstance();
