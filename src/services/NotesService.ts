import AsyncStorage from '@react-native-async-storage/async-storage';

export type NoteCategory = 'Progress' | 'Side Effects' | 'Mood' | 'General';

export interface Note {
  id: string;
  category: NoteCategory;
  text: string;
  cycleId?: string;
  date: string;
  createdAt: string;
}

const STORAGE_KEY = '@trackersteroid_notes';

class NotesServiceClass {
  async addNote(category: NoteCategory, text: string, cycleId?: string, date?: string): Promise<Note> {
    try {
      const notes = await this.getNotes();
      const newNote: Note = {
        id: Date.now().toString(),
        category,
        text,
        cycleId,
        date: date || new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      notes.push(newNote);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      return newNote;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  }

  async getNotes(): Promise<Note[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting notes:', error);
      return [];
    }
  }

  async getNotesByCategory(category: NoteCategory): Promise<Note[]> {
    const notes = await this.getNotes();
    return notes.filter(note => note.category === category);
  }

  async getNotesByCycle(cycleId: string): Promise<Note[]> {
    const notes = await this.getNotes();
    return notes.filter(note => note.cycleId === cycleId);
  }

  async deleteNote(id: string): Promise<void> {
    try {
      const notes = await this.getNotes();
      const filtered = notes.filter(note => note.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }
}

const NotesService = new NotesServiceClass();
export default NotesService;
