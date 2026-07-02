export interface NoteTheme {
  bg: string;
  handle: string;
  border: string;
  text: string;
}

export interface Note {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  zIndex: number;
  color: NoteTheme;
}

export type NoteUpdate = Partial<Omit<Note, "id">>;