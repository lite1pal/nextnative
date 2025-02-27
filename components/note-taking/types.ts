export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  folder: string;
  isPinned: boolean;
  lastModified: string;
}

export interface NoteStore {
  notes: Note[];
  folders: string[];
  tags: string[];
  addNote: (note: Omit<Note, "id" | "date" | "lastModified">) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  addFolder: (folder: string) => void;
  removeFolder: (folder: string) => void;
}

export type SortOption = "date" | "title" | "modified" | "folder";
