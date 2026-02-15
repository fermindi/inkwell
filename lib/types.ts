// Database types for Supabase
export type Database = {
  public: {
    Tables: {
      books: {
        Row: Book;
        Insert: BookInsert;
        Update: BookUpdate;
      };
    };
  };
};

// Book entity
export interface Book {
  id: string;
  title: string;
  original_title: string | null;
  author: string | null;
  genre: string | null;
  pages: number | null;
  status: BookStatus;
  rating: number | null;
  notes: string | null;
  progress: string | null;
  start_date: string | null;
  completion_date: string | null;
  week: number | null;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// For creating new books
export type BookInsert = Omit<Book, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

// For updating books
export type BookUpdate = Partial<BookInsert>;

// Status enum
export type BookStatus = 'to_read' | 'reading' | 'completed';

// Status labels in Portuguese
export const STATUS_LABELS: Record<BookStatus, string> = {
  to_read: 'Para Ler',
  reading: 'Lendo',
  completed: 'Concluído',
};

// Status colors
export const STATUS_COLORS: Record<BookStatus, string> = {
  to_read: '#6366f1', // indigo
  reading: '#f59e0b', // amber
  completed: '#10b981', // emerald
};

// Filter options
export interface BookFilters {
  status?: BookStatus | 'all';
  search?: string;
  genre?: string;
}
