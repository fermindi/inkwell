import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBookStats } from '@/hooks/useBooks';
import { STATUS_COLORS } from '@/lib/types';

export default function StatsScreen() {
  const { stats, loading } = useBookStats();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  const completionRate = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  return (
    <View style={styles.container}>
      {/* Main Stats */}
      <View style={styles.mainCard}>
        <Text style={styles.mainNumber}>{stats.total}</Text>
        <Text style={styles.mainLabel}>Livros na biblioteca</Text>
      </View>

      {/* Status Grid */}
      <View style={styles.grid}>
        <View style={[styles.statCard, { borderLeftColor: STATUS_COLORS.reading }]}>
          <Ionicons name="book" size={24} color={STATUS_COLORS.reading} />
          <Text style={styles.statNumber}>{stats.reading}</Text>
          <Text style={styles.statLabel}>Lendo</Text>
        </View>

        <View style={[styles.statCard, { borderLeftColor: STATUS_COLORS.to_read }]}>
          <Ionicons name="time" size={24} color={STATUS_COLORS.to_read} />
          <Text style={styles.statNumber}>{stats.toRead}</Text>
          <Text style={styles.statLabel}>Para Ler</Text>
        </View>

        <View style={[styles.statCard, { borderLeftColor: STATUS_COLORS.completed }]}>
          <Ionicons name="checkmark-circle" size={24} color={STATUS_COLORS.completed} />
          <Text style={styles.statNumber}>{stats.completed}</Text>
          <Text style={styles.statLabel}>Concluídos</Text>
        </View>

        <View style={[styles.statCard, { borderLeftColor: '#8b5cf6' }]}>
          <Ionicons name="document-text" size={24} color="#8b5cf6" />
          <Text style={styles.statNumber}>{stats.totalPages.toLocaleString('pt-BR')}</Text>
          <Text style={styles.statLabel}>Páginas</Text>
        </View>
      </View>

      {/* Completion Rate */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Taxa de Conclusão</Text>
          <Text style={styles.progressPercent}>{completionRate}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${completionRate}%` },
            ]}
          />
        </View>
        <Text style={styles.progressSubtext}>
          {stats.completed} de {stats.total} livros concluídos
        </Text>
      </View>

      {/* Tips */}
      <View style={styles.tipCard}>
        <Ionicons name="bulb" size={20} color="#f59e0b" />
        <Text style={styles.tipText}>
          {stats.reading === 0
            ? 'Que tal começar a ler um livro hoje?'
            : stats.reading === 1
            ? 'Você está lendo 1 livro. Continue assim!'
            : `Você está lendo ${stats.reading} livros simultaneamente.`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainCard: {
    backgroundColor: '#6366f1',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  mainNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: '#fff',
  },
  mainLabel: {
    fontSize: 16,
    color: '#c7d2fe',
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6366f1',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  progressSubtext: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 8,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#92400e',
  },
});
