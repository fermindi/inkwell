import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useBook, useBooks } from '@/hooks/useBooks';
import { StatusBadge } from '@/components/StatusBadge';
import { BookStatus, STATUS_LABELS, STATUS_COLORS } from '@/lib/types';

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { book, loading, error } = useBook(id);
  const { updateStatus, deleteBook } = useBooks();
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (newStatus: BookStatus) => {
    if (!book || book.status === newStatus) return;

    setUpdating(true);
    const success = await updateStatus(book.id, newStatus);
    setUpdating(false);

    if (!success) {
      Alert.alert('Erro', 'Não foi possível atualizar o status.');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Excluir livro',
      `Tem certeza que deseja excluir "${book?.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            if (!book) return;
            const success = await deleteBook(book.id);
            if (success) {
              router.back();
            } else {
              Alert.alert('Erro', 'Não foi possível excluir o livro.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (error || !book) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle" size={48} color="#ef4444" />
        <Text style={styles.errorText}>Livro não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{book.title}</Text>
        {book.original_title && (
          <Text style={styles.originalTitle}>{book.original_title}</Text>
        )}
        {book.author && <Text style={styles.author}>por {book.author}</Text>}
        <View style={styles.statusContainer}>
          <StatusBadge status={book.status} size="medium" />
        </View>
      </View>

      {/* Rating */}
      {book.rating && (
        <View style={styles.section}>
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map(star => (
              <Ionicons
                key={star}
                name={star <= book.rating! ? 'star' : 'star-outline'}
                size={28}
                color={star <= book.rating! ? '#f59e0b' : '#d1d5db'}
              />
            ))}
          </View>
        </View>
      )}

      {/* Info Grid */}
      <View style={styles.infoGrid}>
        {book.genre && (
          <View style={styles.infoItem}>
            <Ionicons name="bookmark-outline" size={20} color="#6b7280" />
            <Text style={styles.infoLabel}>Gênero</Text>
            <Text style={styles.infoValue}>{book.genre}</Text>
          </View>
        )}
        {book.pages && (
          <View style={styles.infoItem}>
            <Ionicons name="document-text-outline" size={20} color="#6b7280" />
            <Text style={styles.infoLabel}>Páginas</Text>
            <Text style={styles.infoValue}>{book.pages}</Text>
          </View>
        )}
        {book.start_date && (
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={20} color="#6b7280" />
            <Text style={styles.infoLabel}>Início</Text>
            <Text style={styles.infoValue}>{book.start_date}</Text>
          </View>
        )}
        {book.completion_date && (
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#6b7280" />
            <Text style={styles.infoLabel}>Conclusão</Text>
            <Text style={styles.infoValue}>{book.completion_date}</Text>
          </View>
        )}
      </View>

      {/* Notes */}
      {book.notes && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notas</Text>
          <Text style={styles.notes}>{book.notes}</Text>
        </View>
      )}

      {/* Status Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alterar Status</Text>
        <View style={styles.statusActions}>
          {(['to_read', 'reading', 'completed'] as BookStatus[]).map(status => (
            <Pressable
              key={status}
              style={[
                styles.statusButton,
                book.status === status && {
                  backgroundColor: STATUS_COLORS[status] + '20',
                  borderColor: STATUS_COLORS[status],
                },
              ]}
              onPress={() => handleStatusChange(status)}
              disabled={updating}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  book.status === status && { color: STATUS_COLORS[status] },
                ]}
              >
                {STATUS_LABELS[status]}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Delete */}
      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash-outline" size={20} color="#ef4444" />
        <Text style={styles.deleteText}>Excluir livro</Text>
      </Pressable>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 12,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  originalTitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
    fontStyle: 'italic',
  },
  author: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
  },
  statusContainer: {
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
  },
  infoGrid: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoItem: {
    width: '50%',
    padding: 8,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 2,
  },
  notes: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  statusActions: {
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
  statusButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6b7280',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    marginTop: 24,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
    backgroundColor: '#fef2f2',
  },
  deleteText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ef4444',
  },
  bottomPadding: {
    height: 40,
  },
});
