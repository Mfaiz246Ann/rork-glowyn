import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Camera, Upload, Info } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { useUserStore } from '@/store/userStore';
import { ImageCapture } from '@/components/ImageCapture';
import { performAnalysis } from '@/services/analysisService';
import { AnalysisResult } from '@/types';

export default function SkinAnalysisScreen() {
  const router = useRouter();
  const { addAnalysisResult } = useUserStore();
  const [analyzing, setAnalyzing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  
  const handleStartCapture = () => {
    setShowCamera(true);
  };
  
  const handleImageCaptured = async (uri: string) => {
    setShowCamera(false);
    setImageUri(uri);
    await handleAnalyze(uri);
  };
  
  const handleCancelCapture = () => {
    setShowCamera(false);
  };
  
  const handleAnalyze = async (uri: string) => {
    try {
      setAnalyzing(true);
      const analysisResult = await performAnalysis(uri, 'skin');
      setResult(analysisResult);
      addAnalysisResult(analysisResult);
    } catch (error) {
      console.error("Analysis error:", error);
      // Handle error state here
    } finally {
      setAnalyzing(false);
    }
  };

  if (showCamera) {
    return (
      <ImageCapture 
        onImageCaptured={handleImageCaptured}
        onCancel={handleCancelCapture}
        instructionText="Ambil foto close-up kulit bersih dengan pencahayaan yang baik"
        guideType="skin"
      />
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Analisis Kulit</Text>
      
      <Card style={styles.infoCard}>
        <View style={styles.infoIconContainer}>
          <Info size={24} color={colors.primary} />
        </View>
        <Text style={styles.infoTitle}>Analisis Kulitmu</Text>
        <Text style={styles.infoDescription}>
          Dapatkan rekomendasi perawatan kulit yang dipersonalisasi berdasarkan jenis kulit dan masalahmu. AI kami akan menganalisis kulitmu dan menyarankan produk serta rutinitas.
        </Text>
        <Text style={styles.disclaimer}>
          Catatan: Ini bukan diagnosis medis. Konsultasikan dengan dokter kulit untuk kondisi kulit yang memerlukan perhatian medis.
        </Text>
      </Card>
      
      {!result ? (
        <>
          <View style={styles.uploadContainer}>
            <View style={styles.imageContainer}>
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={styles.placeholderImage}
                  contentFit="cover"
                />
              ) : (
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' }}
                  style={styles.placeholderImage}
                  contentFit="cover"
                />
              )}
            </View>
            
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsTitle}>Cara mengambil foto yang baik:</Text>
              <Text style={styles.instructionItem}>• Bersihkan makeup sepenuhnya</Text>
              <Text style={styles.instructionItem}>• Gunakan pencahayaan alami</Text>
              <Text style={styles.instructionItem}>• Foto seluruh wajah</Text>
              <Text style={styles.instructionItem}>• Hindari menggunakan filter</Text>
            </View>
          </View>
          
          <View style={styles.buttonsContainer}>
            <Button
              title="Ambil Foto"
              variant="primary"
              size="large"
              icon={<Camera size={20} color={colors.surface} />}
              style={styles.button}
              onPress={handleStartCapture}
              loading={analyzing}
            />
            
            <Button
              title="Upload Foto"
              variant="outline"
              size="large"
              icon={<Upload size={20} color={colors.primary} />}
              style={styles.button}
              onPress={handleStartCapture}
              loading={analyzing}
            />
          </View>
        </>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Jenis Kulitmu</Text>
          <Text style={styles.resultType}>{result.title}</Text>
          
          <View style={styles.concernsContainer}>
            <Text style={styles.concernsTitle}>Masalah yang Teridentifikasi</Text>
            {result.details.concerns.map((concern: string, index: number) => (
              <View key={index} style={styles.concernItem}>
                <View style={styles.concernBullet} />
                <Text style={styles.concernText}>{concern}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.recommendationsContainer}>
            <Text style={styles.recommendationsTitle}>Rutinitas yang Direkomendasikan</Text>
            {result.details.recommendations.map((recommendation: string, index: number) => (
              <View key={index} style={styles.recommendationItem}>
                <View style={styles.recommendationBullet} />
                <Text style={styles.recommendationText}>{recommendation}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.actionsContainer}>
            <Button
              title="Belanja Produk Rekomendasi"
              variant="primary"
              size="large"
              style={styles.actionButton}
              onPress={() => router.push('/shop')}
            />
            
            <Button
              title="Simpan ke Profilku"
              variant="outline"
              size="large"
              style={styles.actionButton}
              onPress={() => router.push('/profile')}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: layout.spacing.lg,
    paddingBottom: layout.spacing.xxl,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxxl,
    color: colors.text,
    marginBottom: layout.spacing.lg,
  },
  infoCard: {
    marginBottom: layout.spacing.xl,
  },
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: layout.borderRadius.round,
    backgroundColor: colors.secondaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: layout.spacing.md,
  },
  infoTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  infoDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.md,
    marginBottom: layout.spacing.md,
  },
  disclaimer: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  uploadContainer: {
    marginBottom: layout.spacing.xl,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: layout.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: layout.spacing.md,
    backgroundColor: colors.border,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
  },
  instructionsContainer: {
    padding: layout.spacing.md,
    backgroundColor: colors.secondaryLight,
    borderRadius: layout.borderRadius.md,
  },
  instructionsTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  instructionItem: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: layout.spacing.xs,
    lineHeight: typography.lineHeight.md,
  },
  buttonsContainer: {
    gap: layout.spacing.md,
  },
  button: {
    width: '100%',
  },
  resultContainer: {
    marginTop: layout.spacing.lg,
  },
  resultTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    marginBottom: layout.spacing.xs,
  },
  resultType: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxl,
    color: colors.primary,
    marginBottom: layout.spacing.xl,
  },
  concernsContainer: {
    marginBottom: layout.spacing.xl,
  },
  concernsTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  concernItem: {
    flexDirection: 'row',
    marginBottom: layout.spacing.md,
    alignItems: 'flex-start',
  },
  concernBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginRight: layout.spacing.sm,
  },
  concernText: {
    flex: 1,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.md,
  },
  recommendationsContainer: {
    marginBottom: layout.spacing.xl,
  },
  recommendationsTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: layout.spacing.md,
    alignItems: 'flex-start',
  },
  recommendationBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginRight: layout.spacing.sm,
  },
  recommendationText: {
    flex: 1,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.md,
  },
  actionsContainer: {
    gap: layout.spacing.md,
  },
  actionButton: {
    width: '100%',
  },
});