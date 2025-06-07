import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { ColorResult } from '@/types';
import { ArrowLeft, Check, Share2 } from 'lucide-react-native';

const mockColorResult: ColorResult = {
  season: 'autumn',
  tone: 'warm',
  confidence: 87,
  palette: ['#8B4513', '#CD853F', '#D2B48C', '#556B2F', '#8FBC8F', '#2F4F4F'],
  perfectColors: ['#8B4513', '#CD853F', '#D2B48C', '#556B2F'],
  goodColors: ['#8FBC8F', '#2F4F4F', '#A0522D', '#6B8E23'],
  sparinglyColors: ['#FF0000', '#00FFFF', '#FF00FF', '#FFFF00'],
  recommendations: 'Your warm autumn palette features earthy tones that complement your natural coloring.',
  makeupRecommendations: {
    lipstick: ['Terracotta', 'Warm Peach', 'Soft Brown'],
    eyeshadow: ['Copper', 'Bronze', 'Olive Green'],
    blush: ['Warm Peach', 'Terracotta', 'Soft Coral'],
  },
  clothingRecommendations: {
    tops: ['Olive Green', 'Rust', 'Camel', 'Warm Beige'],
    bottoms: ['Chocolate Brown', 'Olive', 'Camel', 'Khaki'],
    accessories: ['Tortoise Shell', 'Warm Gold', 'Copper'],
    metals: ['Gold', 'Bronze', 'Copper'],
  },
};

const ColorBox = ({ color, size = 40, label }: { color: string; size?: number; label?: string }) => (
  <View style={styles.colorBoxContainer}>
    <View style={[styles.colorBox, { backgroundColor: color, width: size, height: size }]} />
    {label && <Text style={styles.colorLabel}>{label}</Text>}
  </View>
);

export default function ColorAnalysisResult() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const result = mockColorResult; // In a real app, you would get this from params or API

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Color Analysis Result',
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
          <Text style={styles.title}>Your Personal Color Analysis</Text>
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              Your undertone is <Text style={styles.highlight}>{result.tone.charAt(0).toUpperCase() + result.tone.slice(1)}</Text> and you're a <Text style={styles.highlight}>{result.season.charAt(0).toUpperCase() + result.season.slice(1)}</Text>
            </Text>
            <View style={styles.confidenceContainer}>
              <Text style={styles.confidenceText}>{result.confidence}% Confidence</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Color Palettes</Text>
          
          <View style={styles.paletteSection}>
            <Text style={styles.paletteTitle}>Perfect Colors (Make you shine)</Text>
            <View style={styles.colorsRow}>
              {result.perfectColors?.map((color, index) => (
                <ColorBox key={`perfect-${index}`} color={color} />
              ))}
            </View>
          </View>
          
          <View style={styles.paletteSection}>
            <Text style={styles.paletteTitle}>Good Colors (Great variations)</Text>
            <View style={styles.colorsRow}>
              {result.goodColors?.map((color, index) => (
                <ColorBox key={`good-${index}`} color={color} />
              ))}
            </View>
          </View>
          
          <View style={styles.paletteSection}>
            <Text style={styles.paletteTitle}>Colors to Use Sparingly</Text>
            <View style={styles.colorsRow}>
              {result.sparinglyColors?.map((color, index) => (
                <ColorBox key={`sparingly-${index}`} color={color} />
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Makeup Recommendations</Text>
          
          <View style={styles.recommendationRow}>
            <View style={styles.recommendationColumn}>
              <Text style={styles.recommendationTitle}>Lipstick</Text>
              {result.makeupRecommendations?.lipstick.map((item, index) => (
                <View key={`lipstick-${index}`} style={styles.recommendationItem}>
                  <Check size={16} color={colors.primary} />
                  <Text style={styles.recommendationText}>{item}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.recommendationColumn}>
              <Text style={styles.recommendationTitle}>Eyeshadow</Text>
              {result.makeupRecommendations?.eyeshadow.map((item, index) => (
                <View key={`eyeshadow-${index}`} style={styles.recommendationItem}>
                  <Check size={16} color={colors.primary} />
                  <Text style={styles.recommendationText}>{item}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.recommendationColumn}>
              <Text style={styles.recommendationTitle}>Blush</Text>
              {result.makeupRecommendations?.blush.map((item, index) => (
                <View key={`blush-${index}`} style={styles.recommendationItem}>
                  <Check size={16} color={colors.primary} />
                  <Text style={styles.recommendationText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clothing Recommendations</Text>
          
          <View style={styles.recommendationRow}>
            <View style={styles.recommendationColumn}>
              <Text style={styles.recommendationTitle}>Tops</Text>
              {result.clothingRecommendations?.tops.map((item, index) => (
                <View key={`tops-${index}`} style={styles.recommendationItem}>
                  <Check size={16} color={colors.primary} />
                  <Text style={styles.recommendationText}>{item}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.recommendationColumn}>
              <Text style={styles.recommendationTitle}>Bottoms</Text>
              {result.clothingRecommendations?.bottoms.map((item, index) => (
                <View key={`bottoms-${index}`} style={styles.recommendationItem}>
                  <Check size={16} color={colors.primary} />
                  <Text style={styles.recommendationText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.recommendationRow}>
            <View style={styles.recommendationColumn}>
              <Text style={styles.recommendationTitle}>Accessories</Text>
              {result.clothingRecommendations?.accessories.map((item, index) => (
                <View key={`accessories-${index}`} style={styles.recommendationItem}>
                  <Check size={16} color={colors.primary} />
                  <Text style={styles.recommendationText}>{item}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.recommendationColumn}>
              <Text style={styles.recommendationTitle}>Metals</Text>
              {result.clothingRecommendations?.metals.map((item, index) => (
                <View key={`metals-${index}`} style={styles.recommendationItem}>
                  <Check size={16} color={colors.primary} />
                  <Text style={styles.recommendationText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
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
  paletteSection: {
    marginBottom: layout.spacing.lg,
  },
  paletteTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  colorsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layout.spacing.md,
  },
  colorBoxContainer: {
    alignItems: 'center',
  },
  colorBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  colorLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    color: colors.textAlt,
    marginTop: 4,
  },
  recommendationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  recommendationColumn: {
    flex: 1,
    minWidth: 150,
    marginBottom: layout.spacing.lg,
  },
  recommendationTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.sm,
  },
  recommendationText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text,
    marginLeft: layout.spacing.sm,
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