import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { TouchableCard } from './Card';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';

interface CategoryCardProps {
  name: string;
  image: string;
  onPress: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  image,
  onPress,
}) => {
  return (
    <TouchableCard style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableCard>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    width: 120,
    height: 120,
    borderRadius: layout.borderRadius.lg,
    marginRight: layout.spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: colors.surface,
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    textAlign: 'center',
  },
});