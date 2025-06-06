import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
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
import { useImageAnalysis } from '@/hooks/useImageAnalysis';
import { useProductRecommendations } from '@/hooks/useProductRecommendations';

// Define color type for palette
interface ColorItem {
  hex: string;
  name: string;
}

export default function ColorAnalysisScreen() {
  const router = useRouter();
  const [showCamera, setShowCamera] = useState(false);
  
  const {
    imageUri,
    result,
    isLoading,
    error,
    captureImage,
    selectImage,
    analyzeImageWithType,
    reset
  } = useImageAnalysis('color');
  
  const { products } = useProductRecommendations(
    result,
    'makeup',
    4
  );
  
  const handleStartCapture = () => {
    setShowCamera(true);
  };
  
  const handleImageCaptured = async (uri: string) => {
    setShowCamera(false);
    await analyzeImageWithType(uri);
  };
  
  const handleCancelCapture = () => {
    setShowCamera(false);
  };

  if (showCamera) {
    return (
      <ImageCapture 
        onImageCaptured={handleImageCaptured}
        onCancel={handleCancelCapture}
        instructionText="Posisikan wajah dengan pencahayaan baik tanpa makeup"
        guideType="color"
      />
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Analisis Warna</Text>
      
      <Card style={styles.infoCard}>
        <View style={styles.infoIconContainer}>
          <Info size={24} color={colors.primary} />
        </View>
        <Text style={styles.infoTitle}>Temukan Warna Sempurnamu</Text>
        <Text style={styles.infoDescription}>
          Temukan warna mana yang melengkapi fitur alami berdasarkan undertone kulit, rambut, dan warna mata.
        </Text>
      </Card>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
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
              <Text style={styles.instructionItem}>• Gunakan pencahayaan alami</Text>
              <Text style={styles.instructionItem}>• Lepas makeup tebal</Text>
              <Text style={styles.instructionItem}>• Hadap kamera langsung</Text>
              <Text style={styles.instructionItem}>• Pastikan wajah terlihat jelas</Text>
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
              loading={isLoading}
            />
            
            <Button
              title="Unggah Foto"
              variant="outline"
              size="large"
              icon={<Upload size={20} color={colors.primary} />}
              style={styles.button}
              onPress={selectImage}
              loading={isLoading}
            />
          </View>
        </>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Musim Warnamu</Text>
          <Text style={styles.resultType}>{result.title}</Text>
          
          <View style={styles.paletteContainer}>
            <Text style={styles.paletteTitle}>Palet Warnamu</Text>
            <View style={styles.colorsGrid}>
              {result.details.palette.map((color: ColorItem, index: number) => (
                <View key={index} style={styles.colorItem}>
                  <View 
                    style={[
                      styles.colorSwatch,
                      { backgroundColor: color.hex }
                    ]}
                  />
                  <Text style={styles.colorName}>{color.name}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.recommendationsContainer}>
            <Text style={styles.recommendationsTitle}>Rekomendasi</Text>
            <Text style={styles.recommendationText}>
              {result.details.description}
            </Text>
          </View>
          
          {products.length > 0 && (
            <View style={styles.productsContainer}>
              <Text style={styles.productsTitle}>Produk Rekomendasi</Text>
              <Text style={styles.productsDescription}>
                Berdasarkan analisis warna, produk ini akan melengkapi fitur alami:
              </Text>
              
              <View style={styles.productsList}>
                {products.slice(0, 2).map((product) => (
                  <Pressable 
                    key={product.id}
                    style={styles.productItem}
                    onPress={() => router.push(`/product/${product.id}`)}
                  >
                    <Image
                      source={{ uri: product.image }}
                      style={styles.productImage}
                      contentFit="cover"
                    />
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productBrand}>{product.brand}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
          
          <View style={styles.actionsContainer}>
            <Button
              title="Coba Makeup Virtual"
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
  errorContainer: {
    backgroundColor: colors.error + '20',
    padding: layout.spacing.md,
    borderRadius: layout.borderRadius.md,
    marginBottom: layout.spacing.lg,
  },
  errorText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.error,
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
  paletteContainer: {
    marginBottom: layout.spacing.xl,
  },
  paletteTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  colorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorItem: {
    width: '23%',
    marginBottom: layout.spacing.md,
    alignItems: 'center',
  },
  colorSwatch: {
    width: 60,
    height: 60,
    borderRadius: layout.borderRadius.md,
    marginBottom: layout.spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  colorName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text,
    textAlign: 'center',
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
  recommendationText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.md,
  },
  productsContainer: {
    marginBottom: layout.spacing.xl,
  },
  productsTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  productsDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: layout.spacing.lg,
  },
  productsList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: layout.borderRadius.md,
    marginBottom: layout.spacing.sm,
  },
  productName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  productBrand: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  actionsContainer: {
    gap: layout.spacing.md,
  },
  actionButton: {
    width: '100%',
  },
});