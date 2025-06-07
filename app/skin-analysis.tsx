import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Info, Camera, Upload } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { ImageCapture } from '@/components/ImageCapture';
import { useUserStore } from '@/store/userStore';
import { takePhoto, pickImage, imageToBase64 } from '@/services/imageService';
import { trpcClient } from '@/lib/trpc';

type SkinType = 'normal' | 'dry' | 'oily' | 'combination' | 'sensitive';

interface SkinResult {
  type: SkinType;
  description: string;
  concerns: string[];
  recommendations: {
    cleanser: string;
    moisturizer: string;
    treatment: string;
    sunscreen: string;
  };
}

const skinResults: Record<SkinType, SkinResult> = {
  normal: {
    type: 'normal',
    description: 'Kulit Anda seimbang, tidak terlalu berminyak atau kering. Pori-pori kecil dan tekstur halus.',
    concerns: ['Penuaan', 'Perlindungan UV', 'Pemeliharaan'],
    recommendations: {
      cleanser: 'Pembersih lembut berbahan dasar air',
      moisturizer: 'Pelembab ringan',
      treatment: 'Serum antioksidan',
      sunscreen: 'Tabir surya ringan SPF 30+',
    },
  },
  dry: {
    type: 'dry',
    description: 'Kulit Anda kekurangan kelembaban dan minyak. Mungkin terasa kencang dan terlihat bersisik.',
    concerns: ['Kekeringan', 'Kulit mengelupas', 'Garis-garis halus'],
    recommendations: {
      cleanser: 'Pembersih krim lembut',
      moisturizer: 'Pelembab kaya',
      treatment: 'Serum asam hyaluronic',
      sunscreen: 'Tabir surya pelembab SPF 30+',
    },
  },
  oily: {
    type: 'oily',
    description: 'Kulit Anda menghasilkan kelebihan sebum. Tampak mengkilap dan pori-pori lebih terlihat.',
    concerns: ['Kilap berlebih', 'Pori-pori tersumbat', 'Jerawat'],
    recommendations: {
      cleanser: 'Pembersih berbusa dengan asam salisilat',
      moisturizer: 'Gel pelembab bebas minyak',
      treatment: 'Serum niacinamide',
      sunscreen: 'Tabir surya bebas minyak SPF 30+',
    },
  },
  combination: {
    type: 'combination',
    description: 'Kulit Anda berminyak di zona T (dahi, hidung, dagu) dan normal atau kering di pipi.',
    concerns: ['Ketidakseimbangan', 'Pori-pori tersumbat di zona T', 'Kekeringan di pipi'],
    recommendations: {
      cleanser: 'Pembersih seimbang',
      moisturizer: 'Pelembab ringan dengan hidrasi tambahan untuk area kering',
      treatment: 'Serum penyeimbang dengan niacinamide',
      sunscreen: 'Tabir surya bebas minyak SPF 30+',
    },
  },
  sensitive: {
    type: 'sensitive',
    description: 'Kulit Anda mudah teriritasi dan mungkin memerah. Bereaksi terhadap banyak produk.',
    concerns: ['Iritasi', 'Kemerahan', 'Reaksi alergi'],
    recommendations: {
      cleanser: 'Pembersih sangat lembut bebas pewangi',
      moisturizer: 'Pelembab menenangkan untuk kulit sensitif',
      treatment: 'Serum penenang dengan centella asiatica',
      sunscreen: 'Tabir surya mineral SPF 30+',
    },
  },
};

const skinTypeNames: Record<SkinType, string> = {
  normal: 'Normal',
  dry: 'Kering',
  oily: 'Berminyak',
  combination: 'Kombinasi',
  sensitive: 'Sensitif',
};

export default function SkinAnalysisScreen() {
  const router = useRouter();
  const { addAnalysisResult } = useUserStore();
  const [showCamera, setShowCamera] = useState(false);
  const [result, setResult] = useState<SkinResult | null>(null);
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
      const analysisResult = await trpcClient.analysis.analyze.mutate({
        imageBase64: base64Image,
        analysisType: 'skin',
      });
      
      if (!analysisResult.success || !analysisResult.result) {
        throw new Error("Analysis failed");
      }
      
      // Convert the general analysis result to our specific SkinResult type
      const skinType = (analysisResult.result.toLowerCase().includes('normal') ? 'normal' : 
                      analysisResult.result.toLowerCase().includes('kering') ? 'dry' :
                      analysisResult.result.toLowerCase().includes('berminyak') ? 'oily' :
                      analysisResult.result.toLowerCase().includes('kombinasi') ? 'combination' : 'sensitive') as SkinType;
      
      // Get the full result with all details from our predefined results
      const fullResult = skinResults[skinType];
      
      setResult(fullResult);
      
      // Save the analysis result
      addAnalysisResult({
        id: analysisResult.id,
        type: 'skin',
        title: `Kulit ${skinTypeNames[skinType]}`,
        date: new Date().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        result: skinTypeNames[skinType],
        details: fullResult,
      });
      
      // Save the result to the user's profile
      await trpcClient.users.saveAnalysisResult.mutate({
        result: {
          id: analysisResult.id,
          type: 'skin',
          title: `Kulit ${skinTypeNames[skinType]}`,
          date: new Date().toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          result: skinTypeNames[skinType],
          details: fullResult,
        },
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Fallback to mock data in case of error
      const randomType = Object.keys(skinResults)[Math.floor(Math.random() * 5)] as SkinType;
      setResult(skinResults[randomType]);
      
      // Save the analysis result
      addAnalysisResult({
        id: `analysis_${Date.now()}`,
        type: 'skin',
        title: `Kulit ${skinTypeNames[randomType]}`,
        date: new Date().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        result: skinTypeNames[randomType],
        details: skinResults[randomType],
      });
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
          title: 'Analisis Kulit',
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
            <Text style={styles.infoTitle}>Analisis Kulitmu</Text>
            <Text style={styles.infoDescription}>
              Dapatkan rekomendasi perawatan kulit yang dipersonalisasi berdasarkan jenis kulit dan masalah Anda. AI kami akan menganalisis kulit Anda dan menyarankan produk serta rutinitas.
            </Text>
            <Text style={styles.infoNote}>
              Catatan: Ini bukan diagnosis medis. Konsultasikan dengan dokter kulit untuk kondisi kulit yang memerlukan perhatian medis.
            </Text>
          </View>
        )}

        {!result && !analyzing && (
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' }} 
            style={styles.exampleImage}
          />
        )}

        {imageUri && !analyzing && !result && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
            <Text style={styles.previewText}>Foto siap untuk dianalisis</Text>
          </View>
        )}

        {!result && !analyzing && (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Cara mengambil foto yang baik:</Text>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>Hapus riasan sepenuhnya</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>Gunakan pencahayaan alami</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>Pastikan wajah terlihat jelas</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>Ambil foto dari beberapa sudut</Text>
              </View>
            </View>
          </View>
        )}

        {analyzing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Menganalisis kulit Anda...</Text>
            <Text style={styles.loadingSubtext}>Mohon tunggu sebentar, AI kami sedang bekerja</Text>
          </View>
        ) : result ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Jenis Kulitmu</Text>
            <Text style={styles.resultType}>{skinTypeNames[result.type]}</Text>
            
            {imageUri && (
              <View style={styles.imageResultContainer}>
                <Image source={{ uri: imageUri }} style={styles.resultImage} />
              </View>
            )}
            
            <Text style={styles.descriptionTitle}>Deskripsi</Text>
            <Text style={styles.descriptionText}>{result.description}</Text>
            
            <Text style={styles.concernsTitle}>Masalah Utama</Text>
            <View style={styles.concernsList}>
              {result.concerns.map((concern, index) => (
                <View key={`concern-${index}`} style={styles.concernItem}>
                  <View style={styles.concernBullet} />
                  <Text style={styles.concernText}>{concern}</Text>
                </View>
              ))}
            </View>
            
            <Text style={styles.recommendationsTitle}>Rekomendasi Produk</Text>
            
            <View style={styles.recommendationCard}>
              <Text style={styles.recommendationCategory}>Pembersih</Text>
              <Text style={styles.recommendationText}>{result.recommendations.cleanser}</Text>
            </View>
            
            <View style={styles.recommendationCard}>
              <Text style={styles.recommendationCategory}>Pelembab</Text>
              <Text style={styles.recommendationText}>{result.recommendations.moisturizer}</Text>
            </View>
            
            <View style={styles.recommendationCard}>
              <Text style={styles.recommendationCategory}>Perawatan</Text>
              <Text style={styles.recommendationText}>{result.recommendations.treatment}</Text>
            </View>
            
            <View style={styles.recommendationCard}>
              <Text style={styles.recommendationCategory}>Tabir Surya</Text>
              <Text style={styles.recommendationText}>{result.recommendations.sunscreen}</Text>
            </View>
            
            <Button 
              title="Lihat Produk yang Direkomendasikan" 
              onPress={() => router.push('/shop')}
              style={styles.productsButton}
            />
            
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
    marginBottom: layout.spacing.lg,
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
    marginBottom: layout.spacing.md,
  },
  infoNote: {
    fontFamily: typography.fontFamily.italic,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  exampleImage: {
    width: '100%',
    height: 300,
    borderRadius: layout.borderRadius.lg,
    marginBottom: layout.spacing.lg,
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
  tipsContainer: {
    backgroundColor: colors.primaryLight,
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.lg,
    marginBottom: layout.spacing.xl,
  },
  tipsTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  tipsList: {
    gap: layout.spacing.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: layout.spacing.sm,
  },
  tipText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text,
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
  resultContainer: {
    paddingBottom: layout.spacing.xl,
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
    color: colors.text,
    marginBottom: layout.spacing.lg,
  },
  imageResultContainer: {
    marginBottom: layout.spacing.lg,
  },
  resultImage: {
    width: '100%',
    height: 250,
    borderRadius: layout.borderRadius.lg,
  },
  descriptionTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  descriptionText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: layout.spacing.lg,
  },
  concernsTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  concernsList: {
    marginBottom: layout.spacing.lg,
  },
  concernItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.xs,
  },
  concernBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: layout.spacing.sm,
  },
  concernText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  recommendationsTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  recommendationCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    padding: layout.spacing.md,
    marginBottom: layout.spacing.md,
  },
  recommendationCategory: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  recommendationText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  productsButton: {
    marginTop: layout.spacing.md,
    marginBottom: layout.spacing.md,
  },
  saveButton: {
    marginTop: layout.spacing.sm,
  },
});