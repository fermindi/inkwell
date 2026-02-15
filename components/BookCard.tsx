import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Book } from '@/lib/types';
import { StatusBadge } from './StatusBadge';

interface BookCardProps {
  book: Book;
  onPress?: () => void;
}

export function BookCard({ book, onPress }: BookCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <StatusBadge status={book.status} />
      </View>

      {book.author && (
        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>
      )}

      <View style={styles.footer}>
        <View style={styles.meta}>
          {book.genre && (
            <View style={styles.metaItem}>
              <Ionicons name="bookmark-outline" size={14} color="#6b7280" />
              <Text style={styles.metaText}>{book.genre}</Text>
            </View>
          )}
          {book.pages && (
            <View style={styles.metaItem}>
              <Ionicons name="document-text-outline" size={14} color="#6b7280" />
              <Text style={styles.metaText}>{book.pages} pgs</Text>
            </View>
          )}
        </View>

        {book.rating && (
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map(star => (
              <Ionicons
                key={star}
                name={star <= book.rating! ? 'star' : 'star-outline'}
                size={14}
                color={star <= book.rating! ? '#f59e0b' : '#d1d5db'}
              />
            ))}
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    lineHeight: 22,
  },
  author: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  meta: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
  },
  rating: {
    flexDirection: 'row',
    gap: 2,
  },
});
