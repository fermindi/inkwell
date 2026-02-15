import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Book, BookInsert, BookUpdate, BookFilters, BookStatus } from '@/lib/types';

export function useBooks(filters?: BookFilters) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('books')
        .select('*')
        .eq('is_deleted', false)
        .order('created_at', { ascending: false });

      // Apply status filter
      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      // Apply search filter
      if (filters?.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,author.ilike.%${filters.search}%,genre.ilike.%${filters.search}%`
        );
      }

      // Apply genre filter
      if (filters?.genre) {
        query = query.eq('genre', filters.genre);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setBooks(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  }, [filters?.status, filters?.search, filters?.genre]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const addBook = async (book: BookInsert): Promise<Book | null> => {
    try {
      const { data, error } = await supabase
        .from('books')
        .insert(book)
        .select()
        .single();

      if (error) throw error;

      setBooks(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add book');
      return null;
    }
  };

  const updateBook = async (id: string, updates: BookUpdate): Promise<Book | null> => {
    try {
      const { data, error } = await supabase
        .from('books')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setBooks(prev => prev.map(book => (book.id === id ? data : book)));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update book');
      return null;
    }
  };

  const deleteBook = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('books')
        .update({
          is_deleted: true,
          deleted_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      setBooks(prev => prev.filter(book => book.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete book');
      return false;
    }
  };

  const updateStatus = async (id: string, status: BookStatus): Promise<boolean> => {
    const updates: BookUpdate = { status };

    if (status === 'reading' && !books.find(b => b.id === id)?.start_date) {
      updates.start_date = new Date().toISOString().split('T')[0];
    }

    if (status === 'completed') {
      updates.completion_date = new Date().toISOString().split('T')[0];
    }

    const result = await updateBook(id, updates);
    return result !== null;
  };

  return {
    books,
    loading,
    error,
    refresh: fetchBooks,
    addBook,
    updateBook,
    deleteBook,
    updateStatus,
  };
}

// Hook for single book
export function useBook(id: string) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('books')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;
        setBook(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch book');
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchBook();
  }, [id]);

  return { book, loading, error };
}

// Hook for stats
export function useBookStats() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    reading: 0,
    toRead: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data, error } = await supabase
          .from('books')
          .select('status, pages')
          .eq('is_deleted', false);

        if (error) throw error;

        const books = data || [];
        setStats({
          total: books.length,
          completed: books.filter(b => b.status === 'completed').length,
          reading: books.filter(b => b.status === 'reading').length,
          toRead: books.filter(b => b.status === 'to_read').length,
          totalPages: books.reduce((sum, b) => sum + (b.pages || 0), 0),
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading };
}
