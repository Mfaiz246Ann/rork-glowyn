import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { TouchableCard } from './Card';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { Collection } from '@/types';

interface CollectionCardProps {
  collection: Collection;
  onPress: () => void;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  onPress,
}) => {
  return (
    <TouchableCard style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: collection.image }}
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.overlay}>
        {collection.isEditorsPick && (
          <View style={styles.editorsPick}>
            <Text style={styles.editorsPickText}>Editor's Pick</Text>
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.name}>{collection.name}</Text>
          {collection.subtitle && (
            <Text style={styles.subtitle}>{collection.subtitle}</Text>
          )}
        </View>
      </View>
    </TouchableCard>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    width: '100%',
    height: 200,
    borderRadius: layout.borderRadius.lg,
    marginBottom: layout.spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'space-between',
    padding: layout.spacing.md,
  },
  editorsPick: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: layout.borderRadius.sm,
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.xs,
  },
  editorsPickText: {
    color: colors.surface,
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
  },
  content: {
    alignItems: 'flex-start',
  },
  name: {
    color: colors.surface,
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    marginBottom: layout.spacing.xs,
  },
  subtitle: {
    color: colors.surface,
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
  },
});