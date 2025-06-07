import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { Camera, Palette, User, Shirt } from 'lucide-react-native';

export default function AnalyzePage() {
  const router = useRouter();

  const analysisOptions = [
    {
      id: 'color',
      title: 'Personal Color Analysis',
      description: 'Discover your seasonal color palette and get personalized recommendations.',
      icon: <Palette size={24} color={colors.primary} />,
      route: '/color-analysis',
      resultRoute: '/color-analysis-result',
    },
    {
      id: 'face',
      title: 'Face Shape Analysis',
      description: 'Find your face shape and get recommendations for hairstyles, glasses, and accessories.',
      icon: <User size={24} color={colors.primary} />,
      route: '/face-shape',
      resultRoute: '/face-shape-result',
    },
    {
      id: 'skin',
      title: 'Skin Analysis',
      description: 'Analyze your skin type and concerns to get personalized skincare recommendations.',
      icon: <Camera size={24} color={colors.primary} />,
      route: '/skin-analysis',
    },
    {
      id: 'outfit',
      title: 'Smart Outfit Recommender',
      description: 'Get personalized outfit recommendations based on your style, body type, and occasion.',
      icon: <Shirt size={24} color={colors.primary} />,
      route: '/outfit-recommender-input',
    },
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'Analyze Your Style' }} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Discover Your Personal Style</Text>
          <Text style={styles.subtitle}>
            Use our AI-powered tools to analyze your features and get personalized style recommendations.
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {analysisOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={() => router.push(option.route)}
            >
              <View style={styles.optionIconContainer}>
                {option.icon}
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.recentAnalysisContainer}>
          <Text style={styles.sectionTitle}>Recent Analysis</Text>
          
          <TouchableOpacity 
            style={styles.recentAnalysisCard}
            onPress={() => router.push('/color-analysis-result')}
          >
            <View style={styles.recentAnalysisContent}>
              <Text style={styles.recentAnalysisTitle}>Personal Color Analysis</Text>
              <Text style={styles.recentAnalysisResult}>Warm Autumn • 87% Confidence</Text>
              <Text style={styles.recentAnalysisDate}>June 5, 2023</Text>
            </View>
            <View style={styles.colorPaletteContainer}>
              <View style={[styles.colorSwatch, { backgroundColor: '#8B4513' }]} />
              <View style={[styles.colorSwatch, { backgroundColor: '#CD853F' }]} />
              <View style={[styles.colorSwatch, { backgroundColor: '#D2B48C' }]} />
              <View style={[styles.colorSwatch, { backgroundColor: '#556B2F' }]} />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.recentAnalysisCard}
            onPress={() => router.push('/face-shape-result')}
          >
            <View style={styles.recentAnalysisContent}>
              <Text style={styles.recentAnalysisTitle}>Face Shape Analysis</Text>
              <Text style={styles.recentAnalysisResult}>Oval • 92% Confidence</Text>
              <Text style={styles.recentAnalysisDate}>May 28, 2023</Text>
            </View>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60' }} 
              style={styles.recentAnalysisImage}
            />
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
  optionsContainer: {
    padding: layout.spacing.lg,
    gap: layout.spacing.md,
  },
  optionCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: layout.spacing.md,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: 4,
  },
  optionDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textAlt,
    lineHeight: 20,
  },
  recentAnalysisContainer: {
    padding: layout.spacing.lg,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  recentAnalysisCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.md,
    marginBottom: layout.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recentAnalysisContent: {
    flex: 1,
    justifyContent: 'center',
  },
  recentAnalysisTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: 4,
  },
  recentAnalysisResult: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    marginBottom: 4,
  },
  recentAnalysisDate: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    color: colors.textAlt,
  },
  colorPaletteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recentAnalysisImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});