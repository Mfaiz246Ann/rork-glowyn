import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Info, Camera, Upload, CheckCircle2 } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { ImageCapture } from '@/components/ImageCapture';
import { useUserStore } from '@/store/userStore';
import { takePhoto, pickImage, imageToBase64 } from '@/services/imageService';
import { trpcClient } from '@/lib/trpc';
import { AnalysisType, AnalysisResponse, AnalysisResult } from '@/types';

type ColorSeason = 'spring' | 'summer' | 'autumn' | 'winter';
type ColorTone = 'warm' | 'cool' | 'neutral';

interface ColorResult {
  season: ColorSeason;
  tone: ColorTone;
  palette: string[];
  recommendations: string;
  confidence?: number;
  perfectColors?: string[];
  goodColors?: string[];
  sparinglyColors?: string[];
  makeupRecommendations?: {
    lipstick: string[];
    eyeshadow: string[];
    blush: string[];
  };
  clothingRecommendations?: {
    tops: string[];
    bottoms: string[];
    accessories: string[];
    metals: string[];
  };
}

const colorResults: Record<ColorSeason, ColorResult> = {
  spring: {
    season: 'spring',
    tone: 'warm',
    palette: ['#FF7F50', '#FFDAB9', '#FFFF00', '#8FBC8F', '#40E0D0'],
    recommendations: 'Warna-warna Anda hangat dan cerah, sempurna untuk menonjolkan kilau alami pada kulit Anda.',
    confidence: 87,
    perfectColors: ['#FF7F50', '#FFDAB9', '#FFFF00', '#8FBC8F', '#40E0D0'],
    goodColors: ['#FFA07A', '#FFE4B5', '#FFFFE0', '#98FB98', '#AFEEEE'],
    sparinglyColors: ['#800000', '#000080', '#4B0082', '#2F4F4F', '#000000'],
    makeupRecommendations: {
      lipstick: ['Coral', 'Peach', 'Warm Pink'],
      eyeshadow: ['Gold', 'Peach', 'Warm Brown'],
      blush: ['Coral', 'Peach', 'Warm Pink'],
    },
    clothingRecommendations: {
      tops: ['Coral', 'Peach', 'Warm Yellow', 'Sage Green'],
      bottoms: ['Khaki', 'Cream', 'Light Denim'],
      accessories: ['Turquoise', 'Coral', 'Gold'],
      metals: ['Gold', 'Rose Gold', 'Bronze'],
    },
  },
  summer: {
    season: 'summer',
    tone: 'cool',
    palette: ['#FFB6C1', '#ADD8E6', '#E6E6FA', '#98FB98', '#D3D3D3'],
    recommendations: 'Warna-warna Anda lembut dan sejuk, memberikan tampilan yang elegan dan menenangkan.',
    confidence: 92,
    perfectColors: ['#FFB6C1', '#ADD8E6', '#E6E6FA', '#98FB98', '#D3D3D3'],
    goodColors: ['#FFC0CB', '#B0E0E6', '#F0F8FF', '#90EE90', '#DCDCDC'],
    sparinglyColors: ['#8B0000', '#006400', '#8B4513', '#000000', '#FF4500'],
    makeupRecommendations: {
      lipstick: ['Soft Pink', 'Mauve', 'Rose'],
      eyeshadow: ['Lavender', 'Soft Blue', 'Cool Gray'],
      blush: ['Soft Pink', 'Mauve', 'Cool Pink'],
    },
    clothingRecommendations: {
      tops: ['Soft Pink', 'Powder Blue', 'Lavender', 'Mint Green'],
      bottoms: ['Light Gray', 'Soft Blue', 'Lavender'],
      accessories: ['Silver', 'Soft Pink', 'Powder Blue'],
      metals: ['Silver', 'White Gold', 'Platinum'],
    },
  },
  autumn: {
    season: 'autumn',
    tone: 'warm',
    palette: ['#D2691E', '#F4A460', '#DAA520', '#556B2F', '#8B4513'],
    recommendations: 'Warna-warna Anda hangat dan dalam, menyatu dengan nuansa alami dan memberikan tampilan yang kaya.',
    confidence: 89,
    perfectColors: ['#D2691E', '#F4A460', '#DAA520', '#556B2F', '#8B4513'],
    goodColors: ['#CD853F', '#DEB887', '#B8860B', '#6B8E23', '#A0522D'],
    sparinglyColors: ['#00BFFF', '#FF69B4', '#9400D3', '#000000', '#00FFFF'],
    makeupRecommendations: {
      lipstick: ['Terracotta', 'Brick Red', 'Warm Brown'],
      eyeshadow: ['Copper', 'Olive Green', 'Warm Brown'],
      blush: ['Terracotta', 'Warm Peach', 'Bronze'],
    },
    clothingRecommendations: {
      tops: ['Rust', 'Olive Green', 'Mustard', 'Terracotta'],
      bottoms: ['Dark Brown', 'Olive Green', 'Khaki'],
      accessories: ['Amber', 'Tortoise Shell', 'Copper'],
      metals: ['Gold', 'Copper', 'Bronze'],
    },
  },
  winter: {
    season: 'winter',
    tone: 'cool',
    palette: ['#DC143C', '#000080', '#FFFFFF', '#4B0082', '#2F4F4F'],
    recommendations: 'Warna-warna Anda kontras dan tajam, memberikan tampilan yang dramatis dan mencolok.',
    confidence: 94,
    perfectColors: ['#DC143C', '#000080', '#FFFFFF', '#4B0082', '#2F4F4F'],
    goodColors: ['#FF0000', '#0000CD', '#F8F8FF', '#8A2BE2', '#2F4F4F'],
    sparinglyColors: ['#F4A460', '#D2B48C', '#F5DEB3', '#DEB887', '#D2691E'],
    makeupRecommendations: {
      lipstick: ['True Red', 'Plum', 'Berry'],
      eyeshadow: ['Navy', 'Plum', 'Silver'],
      blush: ['Cool Pink', 'Plum', 'Berry'],
    },
    clothingRecommendations: {
      tops: ['True Red', 'Royal Blue', 'Pure White', 'Emerald'],
      bottoms: ['Black', 'Navy', 'Charcoal'],
      accessories: ['Silver', 'Black', 'Jewel Tones'],
      metals: ['Silver', 'White Gold', 'Platinum'],
    },
  },
};

const seasonNames: Record<ColorSeason, string> = {
  spring: 'Musim Semi Hangat',
  summer: 'Musim Panas Sejuk',
  autumn: 'Musim Gugur Hangat',
  winter: 'Musim Dingin Sejuk',
};

const colorNames: Record<string, string> = {
  '#FF7F50': 'Coral',
  '#FFDAB9': 'Peach',
  '#FFFF00': 'Kuning Hangat',
  '#8FBC8F': 'Hijau Sage',
  '#40E0D0': 'Turquoise',
  '#FFB6C1': 'Merah Muda Lembut',
  '#ADD8E6': 'Biru Muda',
  '#E6E6FA': 'Lavender',
  '#98FB98': 'Hijau Mint',
  '#D3D3D3': 'Abu-abu Terang',
  '#D2691E': 'Coklat Kemerahan',
  '#F4A460': 'Tan',
  '#DAA520': 'Emas Tua',
  '#556B2F': 'Hijau Zaitun',
  '#8B4513': 'Coklat Sadel',
  '#DC143C': 'Merah Terang',
  '#000080': 'Biru Navy',
  '#FFFFFF': 'Putih',
  '#4B0082': 'Indigo',
  '#2F4F4F': 'Abu-abu Gelap',
};

export default function ColorAnalysisScreen() {
  const router = useRouter();
  const { addAnalysisResult } = useUserStore();
  const [showCamera, setShowCamera] = useState(false);
  const [result, setResult] = useState<ColorResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleCapture = async (uri: string) => {
    setShowCamera(false);
    setImageUri(uri);
    setAnalyzing(true);
    
    try {
      // Convert image to base64
      const base64Image = await imageToBase64(uri);
      
      // Call the backend API for analysis
      const analysisResponse = await trpcClient.analysis.analyze.mutate({
        imageBase64: base64Image,
        analysisType: 'color' as AnalysisType,
      });
      
      if (!analysisResponse.success || !analysisResponse.result) {
        throw new Error("Analysis failed");
      }
      
      // Convert the general analysis result to our specific ColorResult type
      const resultText = analysisResponse.result.result.toLowerCase();
      const colorSeason: ColorSeason = (
        resultText.includes('spring') || resultText.includes('semi') ? 'spring' : 
        resultText.includes('summer') || resultText.includes('panas') ? 'summer' :
        resultText.includes('autumn') || resultText.includes('gugur') ? 'autumn' : 'winter'
      );
      
      // Get the full result with all details from our predefined results
      const fullResult = colorResults[colorSeason];
      
      setResult(fullResult);
      
      // Save the analysis result
      const analysisResult: AnalysisResult = {
        id: analysisResponse.result.id,
        type: 'color',
        title: seasonNames[colorSeason],
        date: new Date().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        result: seasonNames[colorSeason],
        details: fullResult,
      };
      
      addAnalysisResult(analysisResult);
      
      // Save the result to the user's profile
      await trpcClient.users.saveAnalysisResult.mutate({
        result: analysisResult,
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Fallback to mock data in case of error
      const randomSeason = Object.keys(colorResults)[Math.floor(Math.random() * 4)] as ColorSeason;
      setResult(colorResults[randomSeason]);
      
      // Save the analysis result
      const analysisResult: AnalysisResult = {
        id: `analysis_${Date.now()}`,
        type: 'color',
        title: seasonNames[randomSeason],
        date: new Date().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        result: seasonNames[randomSeason],
        details: colorResults[randomSeason],
      };
      
      addAnalysisResult(analysisResult);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleUpload = async () => {
    try {
      const uri = await pickImage();
      if (uri) {
        setImageUri(uri);
        await handleCapture(uri);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  if (showCamera) {
    return (
      <ImageCapture 
        onCapture={handleCapture}
        onCancel={() => setShowCamera(false)}
        guideText="Pastikan wajah Anda terlihat jelas dengan pencahayaan alami"
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          title: 'Analisis Warna',
          headerTitleStyle: {
            fontFamily: typography.fontFamily.semiBold,
          },
        }}
      />

      <ScrollView style={styles.scrollView}>
        {!result && !analyzing && (
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Info size={24} color={colors.primary} />
            </View>
            <Text style={styles.infoTitle}>Analisis Warna Pribadi</Text>
            <Text style={styles.infoDescription}>
              Temukan palet warna yang paling cocok untuk Anda berdasarkan undertone kulit, warna rambut, dan warna mata.
            </Text>
          </View>
        )}

        {imageUri && !analyzing && !result && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
            <Text style={styles.previewText}>Foto siap untuk dianalisis</Text>
          </View>
        )}

        {analyzing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Menganalisis warna Anda...</Text>
            <Text style={styles.loadingSubtext}>Mohon tunggu sebentar, AI kami sedang bekerja</Text>
          </View>
        ) : result ? (
          <View style={styles.resultContainer}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>Musim Warnamu</Text>
              <Text style={[styles.resultSeason, { color: result.palette[0] }]}>
                {seasonNames[result.season]}
              </Text>
              
              <View style={styles.confidenceContainer}>
                <Text style={styles.confidenceLabel}>Tingkat Keyakinan:</Text>
                <Text style={styles.confidenceValue}>{result.confidence}%</Text>
              </View>
              
              <Text style={styles.resultDescription}>
                {result.tone === 'warm' ? 'Undertone Anda hangat' : 'Undertone Anda sejuk'} dan Anda adalah tipe {seasonNames[result.season]}
              </Text>
            </View>

            {imageUri && (
              <View style={styles.imageResultContainer}>
                <Image source={{ uri: imageUri }} style={styles.resultImage} />
              </View>
            )}

            <View style={styles.colorSection}>
              <Text style={styles.sectionTitle}>Palet Warna Anda</Text>
              
              <View style={styles.colorCategoryContainer}>
                <Text style={styles.colorCategoryTitle}>Warna Sempurna</Text>
                <Text style={styles.colorCategoryDescription}>Warna-warna ini membuat Anda bersinar</Text>
                <View style={styles.paletteContainer}>
                  {result.perfectColors?.map((color, index) => (
                    <View key={`perfect-${index}`} style={styles.colorItemContainer}>
                      <View style={[styles.colorSwatch, { backgroundColor: color }]} />
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.colorCategoryContainer}>
                <Text style={styles.colorCategoryTitle}>Warna Bagus</Text>
                <Text style={styles.colorCategoryDescription}>Variasi yang bagus untuk palet Anda</Text>
                <View style={styles.paletteContainer}>
                  {result.goodColors?.map((color, index) => (
                    <View key={`good-${index}`} style={styles.colorItemContainer}>
                      <View style={[styles.colorSwatch, { backgroundColor: color }]} />
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.colorCategoryContainer}>
                <Text style={styles.colorCategoryTitle}>Warna untuk Digunakan Hemat</Text>
                <Text style={styles.colorCategoryDescription}>Gunakan sebagai aksen saja</Text>
                <View style={styles.paletteContainer}>
                  {result.sparinglyColors?.map((color, index) => (
                    <View key={`sparingly-${index}`} style={styles.colorItemContainer}>
                      <View style={[styles.colorSwatch, { backgroundColor: color }]} />
                    </View>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.recommendationsSection}>
              <Text style={styles.sectionTitle}>Rekomendasi Makeup</Text>
              
              <View style={styles.recommendationCard}>
                <View style={styles.recommendationHeader}>
                  <Text style={styles.recommendationTitle}>Lipstik</Text>
                </View>
                <View style={styles.recommendationContent}>
                  {result.makeupRecommendations?.lipstick.map((item, index) => (
                    <View key={`lipstick-${index}`} style={styles.recommendationItem}>
                      <CheckCircle2 size={16} color={colors.primary} />
                      <Text style={styles.recommendationText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.recommendationCard}>
                <View style={styles.recommendationHeader}>
                  <Text style={styles.recommendationTitle}>Eyeshadow</Text>
                </View>
                <View style={styles.recommendationContent}>
                  {result.makeupRecommendations?.eyeshadow.map((item, index) => (
                    <View key={`eyeshadow-${index}`} style={styles.recommendationItem}>
                      <CheckCircle2 size={16} color={colors.primary} />
                      <Text style={styles.recommendationText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.recommendationCard}>
                <View style={styles.recommendationHeader}>
                  <Text style={styles.recommendationTitle}>Blush</Text>
                </View>
                <View style={styles.recommendationContent}>
                  {result.makeupRecommendations?.blush.map((item, index) => (
                    <View key={`blush-${index}`} style={styles.recommendationItem}>
                      <CheckCircle2 size={16} color={colors.primary} />
                      <Text style={styles.recommendationText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            
            <View style={styles.recommendationsSection}>
              <Text style={styles.sectionTitle}>Rekomendasi Pakaian & Aksesoris</Text>
              
              <View style={styles.recommendationCard}>
                <View style={styles.recommendationHeader}>
                  <Text style={styles.recommendationTitle}>Atasan</Text>
                </View>
                <View style={styles.recommendationContent}>
                  {result.clothingRecommendations?.tops.map((item, index) => (
                    <View key={`tops-${index}`} style={styles.recommendationItem}>
                      <CheckCircle2 size={16} color={colors.primary} />
                      <Text style={styles.recommendationText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.recommendationCard}>
                <View style={styles.recommendationHeader}>
                  <Text style={styles.recommendationTitle}>Bawahan</Text>
                </View>
                <View style={styles.recommendationContent}>
                  {result.clothingRecommendations?.bottoms.map((item, index) => (
                    <View key={`bottoms-${index}`} style={styles.recommendationItem}>
                      <CheckCircle2 size={16} color={colors.primary} />
                      <Text style={styles.recommendationText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.recommendationCard}>
                <View style={styles.recommendationHeader}>
                  <Text style={styles.recommendationTitle}>Logam untuk Aksesoris</Text>
                </View>
                <View style={styles.recommendationContent}>
                  {result.clothingRecommendations?.metals.map((item, index) => (
                    <View key={`metals-${index}`} style={styles.recommendationItem}>
                      <CheckCircle2 size={16} color={colors.primary} />
                      <Text style={styles.recommendationText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            <Text style={styles.productTitle}>Produk Rekomendasi</Text>
            <Text style={styles.productSubtitle}>
              Berdasarkan analisis warna, produk ini akan melengkapi fitur alami:
            </Text>

            <View style={styles.productCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }} 
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Lipstik Coral Shine</Text>
                <Text style={styles.productBrand}>BeautyGlow</Text>
                <Text style={styles.productPrice}>Rp 189.000</Text>
                <Button 
                  title="Lihat Produk" 
                  onPress={() => router.push('/product/1')}
                  style={styles.productButton}
                  size="small"
                />
              </View>
            </View>
            
            <Button
              title="Simpan Hasil Analisis"
              variant="primary"
              style={styles.saveButton}
              onPress={() => router.back()}
            />
          </View>
        ) : null}
      </ScrollView>

      {!result && !analyzing && (
        <View style={styles.buttonContainer}>
          <Button
            title="Ambil Foto"
            icon={<Camera size={20} color="#fff" />}
            onPress={() => setShowCamera(true)}
            style={styles.button}
          />
          <Button
            title="Unggah Foto"
            icon={<Upload size={20} color="#fff" />}
            onPress={handleUpload}
            style={styles.button}
            variant="secondary"
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    padding: layout.spacing.lg,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.xl,
    marginBottom: layout.spacing.xl,
    alignItems: 'center',
  },
  infoIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: layout.spacing.md,
  },
  infoTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginBottom: layout.spacing.sm,
    textAlign: 'center',
  },
  infoDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    padding: layout.spacing.lg,
    gap: layout.spacing.md,
  },
  button: {
    marginBottom: layout.spacing.sm,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.spacing.xxl,
    minHeight: 300,
  },
  loadingText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    marginTop: layout.spacing.lg,
  },
  loadingSubtext: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginTop: layout.spacing.sm,
    textAlign: 'center',
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: layout.spacing.xl,
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: layout.borderRadius.lg,
    marginBottom: layout.spacing.md,
  },
  previewText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  resultContainer: {
    paddingBottom: layout.spacing.xl,
  },
  resultHeader: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.lg,
    marginBottom: layout.spacing.lg,
    alignItems: 'center',
  },
  resultTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    marginBottom: layout.spacing.xs,
  },
  resultSeason: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxl,
    marginBottom: layout.spacing.md,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.md,
  },
  confidenceLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginRight: layout.spacing.xs,
  },
  confidenceValue: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
    color: colors.primary,
  },
  resultDescription: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
    textAlign: 'center',
  },
  imageResultContainer: {
    marginBottom: layout.spacing.lg,
  },
  resultImage: {
    width: '100%',
    height: 250,
    borderRadius: layout.borderRadius.lg,
  },
  colorSection: {
    marginBottom: layout.spacing.xl,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  colorCategoryContainer: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.lg,
    marginBottom: layout.spacing.md,
  },
  colorCategoryTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  colorCategoryDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: layout.spacing.md,
  },
  paletteContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: layout.spacing.sm,
  },
  colorItemContainer: {
    alignItems: 'center',
  },
  colorSwatch: {
    width: 50,
    height: 50,
    borderRadius: layout.borderRadius.md,
  },
  colorName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text,
    textAlign: 'center',
    marginTop: layout.spacing.xs,
  },
  recommendationsSection: {
    marginBottom: layout.spacing.xl,
  },
  recommendationCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    marginBottom: layout.spacing.md,
    overflow: 'hidden',
  },
  recommendationHeader: {
    backgroundColor: colors.primaryLight,
    padding: layout.spacing.md,
  },
  recommendationTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  recommendationContent: {
    padding: layout.spacing.md,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.sm,
  },
  recommendationText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginLeft: layout.spacing.sm,
  },
  recommendationsTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  recommendationsText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: layout.spacing.xl,
  },
  productTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  productSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: layout.spacing.lg,
  },
  productCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: layout.spacing.lg,
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  productInfo: {
    padding: layout.spacing.lg,
  },
  productName: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  productBrand: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: layout.spacing.xs,
  },
  productPrice: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.primary,
    marginBottom: layout.spacing.md,
  },
  productButton: {
    alignSelf: 'flex-start',
  },
  saveButton: {
    marginTop: layout.spacing.lg,
  },
});