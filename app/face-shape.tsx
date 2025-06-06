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

export default function FaceShapeScreen() {
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
      const analysisResult = await performAnalysis(uri, 'face');
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
        instructionText="Singkirkan rambut dari wajah dan lihat langsung ke kamera"
        guideType="face"
      />
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Analisis Bentuk Wajah</Text>
      
      <Card style={styles.infoCard}>
        <View style={styles.infoIconContainer}>
          <Info size={24} color={colors.primary} />
        </View>
        <Text style={styles.infoTitle}>Temukan Bentuk Wajahmu</Text>
        <Text style={styles.infoDescription}>
          Ketahui bentuk wajahmu dan dapatkan rekomendasi gaya rambut, kacamata, dan aksesori yang melengkapi fitur wajahmu.
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
              <Text style={styles.instructionItem}>• Singkirkan rambut dari wajah</Text>
              <Text style={styles.instructionItem}>• Hadap kamera langsung</Text>
              <Text style={styles.instructionItem}>• Buat ekspresi netral</Text>
              <Text style={styles.instructionItem}>• Gunakan pencahayaan yang baik</Text>
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
              title="Unggah Foto"
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
          <Text style={styles.resultTitle}>Bentuk Wajahmu</Text>
          <Text style={styles.resultShape}>{result.title}</Text>
          
          <View style={styles.shapeImageContainer}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={styles.shapeImage}
                contentFit="cover"
              />
            ) : (
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' }}
                style={styles.shapeImage}
                contentFit="cover"
              />
            )}
            <View style={styles.shapeOverlay}>
              <View style={styles.shapePath} />
            </View>
          </View>
          
          <View style={styles.recommendationsContainer}>
            <Text style={styles.recommendationsTitle}>Rekomendasi</Text>
            {result.details.recommendations.map((recommendation: string, index: number) => (
              <View key={index} style={styles.recommendationItem}>
                <View style={styles.recommendationBullet} />
                <Text style={styles.recommendationText}>{recommendation}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.actionsContainer}>
            <Button
              title="Coba Aksesori Virtual"
              variant="primary"
              size="large"
              style={styles.actionButton}
              onPress={() => router.push('/virtual-try-on')}
            />
            
            <Button
              title="Belanja Produk Rekomendasi"
              variant="outline"
              size="large"
              style={styles.actionButton}
              onPress={() => router.push('/shop')}
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
  resultShape: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxl,
    color: colors.primary,
    marginBottom: layout.spacing.xl,
  },
  shapeImageContainer: {
    width: '100%',
    height: 300,
    borderRadius: layout.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: layout.spacing.xl,
    position: 'relative',
  },
  shapeImage: {
    width: '100%',
    height: '100%',
  },
  shapeOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shapePath: {
    width: '80%',
    height: '90%',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 150,
    transform: [{ scaleY: 1.2 }],
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