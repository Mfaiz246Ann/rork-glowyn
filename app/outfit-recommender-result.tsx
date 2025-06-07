import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { OutfitResult, OutfitRecommendation, OutfitItem, StylingTip } from '@/types';
import { ArrowLeft, Bookmark, Check, Share2, ShoppingBag } from 'lucide-react-native';

const mockOutfitResult: OutfitResult = {
  stylePreference: 'Minimalist',
  bodyType: 'Hourglass',
  occasion: 'Work',
  weather: 'Cool',
  recommendations: [
    {
      title: 'Modern Professional',
      matchScore: 95,
      items: [
        { type: 'Top', name: 'White Silk Blouse', color: 'White' },
        { type: 'Bottom', name: 'High-Waisted Black Trousers', color: 'Black' },
        { type: 'Outerwear', name: 'Camel Blazer', color: 'Camel' },
        { type: 'Shoes', name: 'Black Leather Loafers', color: 'Black' },
        { type: 'Accessories', name: 'Gold Minimal Necklace', color: 'Gold' },
      ],
      imageUrl: 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWluaW1hbGlzdCUyMG91dGZpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
      title: 'Chic Professional',
      matchScore: 92,
      items: [
        { type: 'Top', name: 'Cream Turtleneck Sweater', color: 'Cream' },
        { type: 'Bottom', name: 'Charcoal Pencil Skirt', color: 'Charcoal' },
        { type: 'Outerwear', name: 'Beige Trench Coat', color: 'Beige' },
        { type: 'Shoes', name: 'Nude Pointed Heels', color: 'Nude' },
        { type: 'Accessories', name: 'Pearl Stud Earrings', color: 'Pearl' },
      ],
      imageUrl: 'https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWluaW1hbGlzdCUyMG91dGZpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
      title: 'Romantic Feminine',
      matchScore: 88,
      items: [
        { type: 'Top', name: 'Blush Silk Blouse', color: 'Blush' },
        { type: 'Bottom', name: 'Navy A-Line Skirt', color: 'Navy' },
        { type: 'Outerwear', name: 'Cream Cardigan', color: 'Cream' },
        { type: 'Shoes', name: 'Nude Ankle Strap Heels', color: 'Nude' },
        { type: 'Accessories', name: 'Rose Gold Watch', color: 'Rose Gold' },
      ],
      imageUrl: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
  ],
  tips: [
    {
      title: 'Highlight Your Waist',
      description: 'Your hourglass body type looks great in high-waisted bottoms and belted pieces that accentuate your natural waistline.',
    },
    {
      title: 'Balance Proportions',
      description: 'Choose fitted tops that follow your curves and pair them with structured bottoms for a balanced silhouette.',
    },
    {
      title: 'Minimalist Color Palette',
      description: 'Stick to a cohesive color palette of 2-3 neutral colors with occasional pops of a single accent color.',
    },
    {
      title: 'Quality Over Quantity',
      description: 'Invest in fewer, high-quality pieces that can be mixed and matched rather than many trendy items.',
    },
  ],
};

const OutfitCard = ({ 
  recommendation,
  isMain = false,
}: { 
  recommendation: OutfitRecommendation;
  isMain?: boolean;
}) => {
  return (
    <View style={[styles.outfitCard, isMain && styles.mainOutfitCard]}>
      {isMain && (
        <View style={styles.matchScoreContainer}>
          <Text style={styles.matchScoreText}>{recommendation.matchScore}% Match</Text>
        </View>
      )}
      
      <Text style={styles.outfitTitle}>{recommendation.title}</Text>
      
      {recommendation.imageUrl && (
        <Image 
          source={{ uri: recommendation.imageUrl }} 
          style={styles.outfitImage}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.itemsContainer}>
        {recommendation.items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemType}>{item.type}</Text>
            <Text style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              {item.color && <Text style={styles.itemColor}> • {item.color}</Text>}
            </Text>
          </View>
        ))}
      </View>
      
      {isMain && (
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Bookmark size={20} color={colors.primary} />
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.primaryActionButton]}>
            <ShoppingBag size={20} color={colors.surface} />
            <Text style={styles.primaryActionText}>Shop</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const TipCard = ({ tip }: { tip: StylingTip }) => (
  <View style={styles.tipCard}>
    <Text style={styles.tipTitle}>{tip.title}</Text>
    <Text style={styles.tipDescription}>{tip.description}</Text>
  </View>
);

export default function OutfitRecommenderResult() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const result = mockOutfitResult; // In a real app, you would get this from params or API
  
  // Get the main recommendation and other recommendations
  const mainRecommendation = result.recommendations[0];
  const otherRecommendations = result.recommendations.slice(1);

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Your Outfit Recommendations',
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
          <Text style={styles.title}>Your Perfect Outfits</Text>
          <Text style={styles.subtitle}>
            Curated specifically for your {result.stylePreference.toLowerCase()} style
            {result.bodyType && ` and ${result.bodyType.toLowerCase()} body type`}
            {result.occasion && `, perfect for ${result.occasion.toLowerCase()}`}
            {result.weather && ` in ${result.weather.toLowerCase()} weather`}.
          </Text>
        </View>

        <View style={styles.mainRecommendationContainer}>
          <OutfitCard recommendation={mainRecommendation} isMain={true} />
        </View>

        {otherRecommendations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>More Great Options</Text>
            <View style={styles.otherRecommendationsContainer}>
              {otherRecommendations.map((recommendation, index) => (
                <OutfitCard 
                  key={index} 
                  recommendation={recommendation}
                />
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Styling Tips for You</Text>
          <View style={styles.tipsContainer}>
            {result.tips.map((tip, index) => (
              <TipCard key={index} tip={tip} />
            ))}
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.fullActionButton} 
            onPress={() => router.push('/shop')}
          >
            <Text style={styles.fullActionButtonText}>Browse More Outfit Ideas</Text>
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
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textAlt,
    lineHeight: 22,
  },
  mainRecommendationContainer: {
    padding: layout.spacing.lg,
  },
  section: {
    padding: layout.spacing.lg,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  otherRecommendationsContainer: {
    gap: layout.spacing.lg,
  },
  outfitCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mainOutfitCard: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  matchScoreContainer: {
    position: 'absolute',
    top: layout.spacing.md,
    right: layout.spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
    borderRadius: layout.borderRadius.full,
    zIndex: 1,
  },
  matchScoreText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.sm,
    color: colors.surface,
  },
  outfitTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  outfitImage: {
    width: '100%',
    height: 200,
    borderRadius: layout.borderRadius.md,
    marginBottom: layout.spacing.md,
  },
  itemsContainer: {
    gap: layout.spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: layout.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemType: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
    width: 100,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  itemColor: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textAlt,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: layout.spacing.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.md,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary,
    flex: 1,
    marginHorizontal: layout.spacing.xs,
  },
  primaryActionButton: {
    backgroundColor: colors.primary,
  },
  actionText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.primary,
    marginLeft: layout.spacing.sm,
  },
  primaryActionText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.surface,
    marginLeft: layout.spacing.sm,
  },
  tipsContainer: {
    gap: layout.spacing.md,
  },
  tipCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    padding: layout.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  tipTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  tipDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textAlt,
    lineHeight: 20,
  },
  actionButtons: {
    padding: layout.spacing.lg,
  },
  fullActionButton: {
    backgroundColor: colors.primary,
    borderRadius: layout.borderRadius.md,
    paddingVertical: layout.spacing.md,
    alignItems: 'center',
  },
  fullActionButtonText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.surface,
  },
});