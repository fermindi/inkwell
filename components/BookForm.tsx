import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BookInsert, BookStatus, STATUS_LABELS, STATUS_COLORS } from '@/lib/types';

interface BookFormProps {
  initialData?: Partial<BookInsert>;
  onSubmit: (data: BookInsert) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function BookForm({ initialData, onSubmit, onCancel, loading }: BookFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [genre, setGenre] = useState(initialData?.genre || '');
  const [pages, setPages] = useState(initialData?.pages?.toString() || '');
  const [status, setStatus] = useState<BookStatus>(initialData?.status || 'to_read');
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [notes, setNotes] = useState(initialData?.notes || '');

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      original_title: null,
      author: author.trim() || null,
      genre: genre.trim() || null,
      pages: pages ? parseInt(pages, 10) : null,
      status,
      rating: rating || null,
      notes: notes.trim() || null,
      progress: null,
      start_date: status !== 'to_read' ? new Date().toISOString().split('T')[0] : null,
      completion_date: status === 'completed' ? new Date().toISOString().split('T')[0] : null,
      week: null,
      is_deleted: false,
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.field}>
        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Nome do livro"
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Autor</Text>
        <TextInput
          style={styles.input}
          value={author}
          onChangeText={setAuthor}
          placeholder="Nome do autor"
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.field, { flex: 1 }]}>
          <Text style={styles.label}>Gênero</Text>
          <TextInput
            style={styles.input}
            value={genre}
            onChangeText={setGenre}
            placeholder="Ex: Ficção"
            placeholderTextColor="#9ca3af"
          />
        </View>
        <View style={[styles.field, { width: 100 }]}>
          <Text style={styles.label}>Páginas</Text>
          <TextInput
            style={styles.input}
            value={pages}
            onChangeText={setPages}
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Status</Text>
        <View style={styles.statusRow}>
          {(['to_read', 'reading', 'completed'] as BookStatus[]).map(s => (
            <Pressable
              key={s}
              style={[
                styles.statusButton,
                status === s && { backgroundColor: STATUS_COLORS[s] + '20', borderColor: STATUS_COLORS[s] },
              ]}
              onPress={() => setStatus(s)}
            >
              <Text
                style={[
                  styles.statusText,
                  status === s && { color: STATUS_COLORS[s] },
                ]}
              >
                {STATUS_LABELS[s]}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Avaliação</Text>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map(star => (
            <Pressable key={star} onPress={() => setRating(star === rating ? 0 : star)}>
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={32}
                color={star <= rating ? '#f59e0b' : '#d1d5db'}
              />
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Notas</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Suas impressões sobre o livro..."
          placeholderTextColor="#9ca3af"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={[styles.submitButton, !title.trim() && styles.submitDisabled]}
          onPress={handleSubmit}
          disabled={!title.trim() || loading}
        >
          <Text style={styles.submitText}>
            {loading ? 'Salvando...' : 'Salvar'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statusButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6b7280',
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  submitButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  submitDisabled: {
    backgroundColor: '#c7d2fe',
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
