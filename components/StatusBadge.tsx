import { View, Text, StyleSheet } from 'react-native';
import { BookStatus, STATUS_LABELS, STATUS_COLORS } from '@/lib/types';

interface StatusBadgeProps {
  status: BookStatus;
  size?: 'small' | 'medium';
}

export function StatusBadge({ status, size = 'small' }: StatusBadgeProps) {
  const isSmall = size === 'small';

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: STATUS_COLORS[status] + '20' },
        isSmall ? styles.small : styles.medium,
      ]}
    >
      <View
        style={[
          styles.dot,
          { backgroundColor: STATUS_COLORS[status] },
          isSmall ? styles.dotSmall : styles.dotMedium,
        ]}
      />
      <Text
        style={[
          styles.text,
          { color: STATUS_COLORS[status] },
          isSmall ? styles.textSmall : styles.textMedium,
        ]}
      >
        {STATUS_LABELS[status]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
  },
  small: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  medium: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dot: {
    borderRadius: 999,
  },
  dotSmall: {
    width: 6,
    height: 6,
    marginRight: 4,
  },
  dotMedium: {
    width: 8,
    height: 8,
    marginRight: 6,
  },
  text: {
    fontWeight: '600',
  },
  textSmall: {
    fontSize: 11,
  },
  textMedium: {
    fontSize: 13,
  },
});
