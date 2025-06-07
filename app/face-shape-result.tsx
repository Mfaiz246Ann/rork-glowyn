import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { ShapeResult } from '@/types';
import { ArrowLeft, Share2, Star } from 'lucide-react-native';

const mockShapeResult: ShapeResult = {
  shape: 'oval',
  description: 'The oval face shape is considered the most versatile and balanced face shape.',
  confidence: 92,
  features: {
    faceLength: 'Balanced',
    cheekbones: 'Slightly wider than forehead',
    jawline: 'Gently rounded',
    forehead: 'Proportional',
    chinShape: 'Rounded, not too pointed',
  },
  hairstyles: [
    {
      name: 'Long Layers',
      rating: 'Perfect',
      description: 'Enhances your natural bone structure',
    },
    {
      name: 'Shoulder Length Bob',
      rating: 'Excellent',
      description: 'Frames your face beautifully',
    },
    {
      name: 'Side-Swept Bangs',
      rating: 'Great',
      description: 'Adds dimension to your face',
    },
    {
      name: 'Pixie Cut',
      rating: 'Good',
      description: 'Can highlight your facial features',
    },
  ],
  glasses: [
    {
      name: 'Rectangular Frames',
      rating: 'Perfect',
      description: 'Adds contrast to your soft features',
    },
    {
      name: 'Cat-Eye Frames',
      rating: 'Excellent',
      description: 'Enhances your cheekbones',
    },
    {
      name: 'Aviator Frames',
      rating: 'Great',
      description: 'Complements your balanced proportions',
    },
  ],
  accessories: [
    {
      name: 'Hoop Earrings',
      rating: 'Perfect',
      description: 'Complements your face shape beautifully',
    },
    {
      name: 'Chandelier Earrings',
      rating: 'Excellent',
      description: 'Adds elegance to your look',
    },
    {
      name: 'Stud Earrings',
      rating: 'Great',
      description: 'Simple yet flattering for your face shape',
    },
  ],
};

const RatingBadge = ({ rating }: { rating: string }) => {
  const getBadgeColor = () => {
    switch (rating) {
      case 'Perfect': return '#4CAF50';
      case 'Excellent': return '#8BC34A';
      case 'Great': return '#CDDC39';
      case 'Good': return '#FFC107';
      default: return colors.primary;
    }
  };
  
  return (
    <View style={[styles.ratingBadge, { backgroundColor: getBadgeColor() }]}>
      <Text style={styles.ratingText}>{rating}</Text>
    </View>
  );
};

const RecommendationCard = ({ 
  title, 
  items 
}: { 
  title: string; 
  items: { name: string; rating: string; description: string }[] 
}) => (
  <View style={styles.recommendationCard}>
    <Text style={styles.recommendationTitle}>{title}</Text>
    {items.map((item, index) => (
      <View key={index} style={styles.recommendationItem}>
        <View style={styles.recommendationHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <RatingBadge rating={item.rating} />
        </View>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    ))}
  </View>
);

export default function FaceShapeResult() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const result = mockShapeResult; // In a real app, you would get this from params or API

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Face Shape Analysis',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Share')}>
              <Share2 size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Face Shape Analysis</Text>
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              Your face shape is <Text style={styles.highlight}>{result.shape.charAt(0).toUpperCase() + result.shape.slice(1)}</Text>
            </Text>
            <View style={styles.confidenceContainer}>
              <Text style={styles.confidenceText}>{result.confidence}% Confidence</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Face Features</Text>
          <View style={styles.featuresContainer}>
            {Object.entries(result.features || {}).map(([key, value]) => (
              <View key={key} style={styles.featureItem}>
                <Text style={styles.featureLabel}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                </Text>
                <Text style={styles.featureValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{result.description}</Text>
        </View>

        <View style={styles.recommendationsContainer}>
          <RecommendationCard title="Recommended Hairstyles" items={result.hairstyles} />
          <RecommendationCard title="Recommended Glasses" items={result.glasses} />
          <RecommendationCard title="Recommended Accessories" items={result.accessories} />
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/shop')}>
            <Text style={styles.actionButtonText}>Shop Recommendations</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]} 
            onPress={() => router.push('/(tabs)/profile')}
          >
            <Text style={styles.secondaryButtonText}>Save to Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: layout.spacing.lg,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  resultContainer: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.lg,
  },
  resultText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    textAlign: 'center',
  },
  highlight: {
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  confidenceContainer: {
    marginTop: layout.spacing.md,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: layout.borderRadius.md,
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.md,
    alignSelf: 'center',
  },
  confidenceText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.textAlt,
  },
  section: {
    padding: layout.spacing.lg,
    backgroundColor: colors.surface,
    marginTop: layout.spacing.md,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  featuresContainer: {
    gap: layout.spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: layout.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  featureLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  featureValue: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textAlt,
  },
  descriptionText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text,
    lineHeight: 24,
  },
  recommendationsContainer: {
    padding: layout.spacing.lg,
    gap: layout.spacing.lg,
  },
  recommendationCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.lg,
    marginBottom: layout.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendationTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  recommendationItem: {
    marginBottom: layout.spacing.md,
    paddingBottom: layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.sm,
  },
  itemName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  ratingBadge: {
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: layout.borderRadius.sm,
  },
  ratingText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    color: colors.surface,
  },
  itemDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textAlt,
  },
  actionButtons: {
    padding: layout.spacing.lg,
    gap: layout.spacing.md,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: layout.borderRadius.md,
    paddingVertical: layout.spacing.md,
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.surface,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.primary,
  },
});