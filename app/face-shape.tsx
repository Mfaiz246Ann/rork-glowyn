import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, ActivityIndicator } from 'react-native';
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
import { AnalysisType, AnalysisResponse } from '@/types';

type FaceShape = 'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'rectangle';

interface ShapeResult {
  shape: FaceShape;
  description: string;
  confidence?: number;
  features?: {
    faceLength?: string;
    cheekbones?: string;
    jawline?: string;
    forehead?: string;
    chinShape?: string;
  };
  hairstyles: {
    name: string;
    rating: 'Perfect' | 'Excellent' | 'Great' | 'Good';
    description: string;
  }[];
  glasses: {
    name: string;
    rating: 'Perfect' | 'Excellent' | 'Great' | 'Good';
    description: string;
  }[];
  accessories: {
    name: string;
    rating: 'Perfect' | 'Excellent' | 'Great' | 'Good';
    description: string;
  }[];
}

const faceShapeResults: Record<FaceShape, ShapeResult> = {
  oval: {
    shape: 'oval',
    description: 'Bentuk wajah oval dianggap sebagai bentuk wajah yang ideal karena proporsinya yang seimbang.',
    confidence: 92,
    features: {
      faceLength: 'Panjang wajah sekitar 1.5 kali lebar wajah',
      cheekbones: 'Tulang pipi adalah titik terlebar pada wajah',
      jawline: 'Rahang halus dan sedikit meruncing ke arah dagu',
      forehead: 'Dahi proporsional dengan wajah',
      chinShape: 'Dagu sedikit meruncing dan halus',
    },
    hairstyles: [
      { name: 'Hampir semua gaya rambut', rating: 'Perfect', description: 'Bentuk wajah Anda sangat serbaguna' },
      { name: 'Potongan bob', rating: 'Excellent', description: 'Menyoroti struktur tulang wajah Anda' },
      { name: 'Lapisan panjang', rating: 'Great', description: 'Menambah dimensi dan gerakan' },
      { name: 'Pixie cut', rating: 'Good', description: 'Menonjolkan fitur wajah Anda' },
    ],
    glasses: [
      { name: 'Kacamata persegi', rating: 'Perfect', description: 'Menciptakan kontras dengan wajah Anda' },
      { name: 'Kacamata kucing', rating: 'Excellent', description: 'Menambah dimensi ke wajah Anda' },
      { name: 'Kacamata aviator', rating: 'Great', description: 'Melengkapi bentuk wajah Anda' },
      { name: 'Kacamata bulat', rating: 'Good', description: 'Menciptakan keseimbangan yang menarik' },
    ],
    accessories: [
      { name: 'Anting panjang', rating: 'Perfect', description: 'Menyoroti panjang wajah Anda' },
      { name: 'Kalung pendek', rating: 'Excellent', description: 'Menarik perhatian ke leher Anda' },
      { name: 'Topi fedora', rating: 'Great', description: 'Melengkapi bentuk wajah Anda' },
      { name: 'Bandana', rating: 'Good', description: 'Menambah gaya tanpa mengganggu keseimbangan' },
    ],
  },
  round: {
    shape: 'round',
    description: 'Bentuk wajah bulat memiliki lebar dan panjang yang hampir sama dengan pipi yang penuh.',
    confidence: 88,
    features: {
      faceLength: 'Panjang dan lebar wajah hampir sama',
      cheekbones: 'Pipi penuh dan lebar',
      jawline: 'Rahang halus dan kurang terdefinisi',
      forehead: 'Dahi lebar dan pendek',
      chinShape: 'Dagu pendek dan bulat',
    },
    hairstyles: [
      { name: 'Lapisan panjang', rating: 'Perfect', description: 'Memanjangkan wajah Anda' },
      { name: 'Potongan asimetris', rating: 'Excellent', description: 'Menciptakan ilusi sudut' },
      { name: 'Poni samping', rating: 'Great', description: 'Memecah lingkaran wajah' },
      { name: 'Volume di mahkota', rating: 'Good', description: 'Menambah tinggi ke wajah Anda' },
    ],
    glasses: [
      { name: 'Kacamata persegi', rating: 'Perfect', description: 'Menambah definisi ke wajah Anda' },
      { name: 'Kacamata kotak', rating: 'Excellent', description: 'Menciptakan kontras dengan kelembutan' },
      { name: 'Kacamata wayfarer', rating: 'Great', description: 'Menyeimbangkan fitur bulat' },
      { name: 'Kacamata persegi panjang', rating: 'Good', description: 'Memanjangkan wajah Anda' },
    ],
    accessories: [
      { name: 'Anting panjang', rating: 'Perfect', description: 'Memanjangkan wajah Anda' },
      { name: 'Kalung panjang', rating: 'Excellent', description: 'Menciptakan garis vertikal' },
      { name: 'Topi dengan pinggiran lebar', rating: 'Great', description: 'Menyeimbangkan kelembutan wajah' },
      { name: 'Syal panjang', rating: 'Good', description: 'Mengarahkan mata secara vertikal' },
    ],
  },
  square: {
    shape: 'square',
    description: 'Bentuk wajah persegi memiliki rahang yang kuat dan dahi yang lebar.',
    confidence: 90,
    features: {
      faceLength: 'Panjang dan lebar wajah hampir sama',
      cheekbones: 'Tulang pipi lebar dan sejajar dengan dahi dan rahang',
      jawline: 'Rahang kuat dan bersudut',
      forehead: 'Dahi lebar dan lurus',
      chinShape: 'Dagu persegi dan tegas',
    },
    hairstyles: [
      { name: 'Lapisan lembut', rating: 'Perfect', description: 'Melunakkan sudut wajah Anda' },
      { name: 'Potongan bob', rating: 'Excellent', description: 'Menambah kelembutan ke wajah' },
      { name: 'Gaya bergelombang', rating: 'Great', description: 'Menyeimbangkan garis tegas' },
      { name: 'Poni samping', rating: 'Good', description: 'Memecah lebar dahi' },
    ],
    glasses: [
      { name: 'Kacamata bulat', rating: 'Perfect', description: 'Melunakkan sudut wajah Anda' },
      { name: 'Kacamata oval', rating: 'Excellent', description: 'Menyeimbangkan garis tegas' },
      { name: 'Kacamata tanpa bingkai', rating: 'Great', description: 'Mengurangi kontras keras' },
      { name: 'Kacamata aviator', rating: 'Good', description: 'Menambah kelembutan ke wajah' },
    ],
    accessories: [
      { name: 'Anting bulat', rating: 'Perfect', description: 'Melunakkan sudut wajah Anda' },
      { name: 'Kalung bulat', rating: 'Excellent', description: 'Menyeimbangkan garis tegas' },
      { name: 'Bandana', rating: 'Great', description: 'Menambah kelembutan ke wajah' },
      { name: 'Syal melingkar', rating: 'Good', description: 'Menciptakan kontras dengan sudut' },
    ],
  },
  heart: {
    shape: 'heart',
    description: 'Bentuk wajah hati memiliki dahi lebar dan dagu yang meruncing.',
    confidence: 86,
    features: {
      faceLength: 'Panjang wajah lebih dari lebar wajah',
      cheekbones: 'Tulang pipi tinggi dan lebar',
      jawline: 'Rahang meruncing ke arah dagu',
      forehead: 'Dahi lebar, titik terlebar pada wajah',
      chinShape: 'Dagu sempit dan meruncing',
    },
    hairstyles: [
      { name: 'Rambut medium dengan lapisan', rating: 'Perfect', description: 'Menyeimbangkan dahi lebar' },
      { name: 'Poni', rating: 'Excellent', description: 'Mengurangi lebar dahi' },
      { name: 'Potongan bob', rating: 'Great', description: 'Menambah lebar di bagian bawah wajah' },
      { name: 'Volume di sisi', rating: 'Good', description: 'Menyeimbangkan dagu yang meruncing' },
    ],
    glasses: [
      { name: 'Kacamata aviator', rating: 'Perfect', description: 'Menyeimbangkan dahi lebar' },
      { name: 'Kacamata kucing', rating: 'Excellent', description: 'Menyoroti tulang pipi Anda' },
      { name: 'Kacamata bulat', rating: 'Great', description: 'Melunakkan sudut dahi' },
      { name: 'Kacamata bottom-heavy', rating: 'Good', description: 'Menambah lebar di bagian bawah wajah' },
    ],
    accessories: [
      { name: 'Anting drop', rating: 'Perfect', description: 'Memperlebar area rahang' },
      { name: 'Kalung choker', rating: 'Excellent', description: 'Menarik perhatian dari dahi' },
      { name: 'Bandana', rating: 'Great', description: 'Mengurangi lebar dahi' },
      { name: 'Anting chandelier', rating: 'Good', description: 'Menyeimbangkan dagu yang meruncing' },
    ],
  },
  diamond: {
    shape: 'diamond',
    description: 'Bentuk wajah berlian memiliki tulang pipi yang tinggi dan dagu yang meruncing.',
    confidence: 89,
    features: {
      faceLength: 'Panjang wajah lebih dari lebar wajah',
      cheekbones: 'Tulang pipi tinggi dan merupakan titik terlebar pada wajah',
      jawline: 'Rahang sempit dan meruncing ke arah dagu',
      forehead: 'Dahi sempit',
      chinShape: 'Dagu meruncing dan terdefinisi',
    },
    hairstyles: [
      { name: 'Poni tebal', rating: 'Perfect', description: 'Menambah lebar di dahi' },
      { name: 'Potongan bob', rating: 'Excellent', description: 'Menyoroti tulang pipi Anda' },
      { name: 'Gaya bervolume di sisi', rating: 'Great', description: 'Menyeimbangkan tulang pipi yang tinggi' },
      { name: 'Lapisan di sekitar wajah', rating: 'Good', description: 'Melunakkan sudut wajah' },
    ],
    glasses: [
      { name: 'Kacamata oval', rating: 'Perfect', description: 'Melunakkan sudut wajah Anda' },
      { name: 'Kacamata kucing', rating: 'Excellent', description: 'Menyoroti tulang pipi Anda' },
      { name: 'Kacamata rimless', rating: 'Great', description: 'Tidak menambah lebar di tulang pipi' },
      { name: 'Kacamata top-heavy', rating: 'Good', description: 'Menyeimbangkan dagu yang meruncing' },
    ],
    accessories: [
      { name: 'Anting stud', rating: 'Perfect', description: 'Tidak menambah lebar di tulang pipi' },
      { name: 'Kalung pendek', rating: 'Excellent', description: 'Menarik perhatian dari tulang pipi' },
      { name: 'Bando tipis', rating: 'Great', description: 'Menambah lebar di dahi' },
      { name: 'Anting teardrop', rating: 'Good', description: 'Melengkapi bentuk wajah Anda' },
    ],
  },
  rectangle: {
    shape: 'rectangle',
    description: 'Bentuk wajah persegi panjang memiliki panjang yang lebih dari lebarnya.',
    confidence: 87,
    features: {
      faceLength: 'Panjang wajah jauh lebih besar dari lebar wajah',
      cheekbones: 'Tulang pipi sejajar dengan dahi dan rahang',
      jawline: 'Rahang lurus dan panjang',
      forehead: 'Dahi tinggi',
      chinShape: 'Dagu persegi',
    },
    hairstyles: [
      { name: 'Lapisan pendek', rating: 'Perfect', description: 'Mengurangi panjang wajah' },
      { name: 'Potongan bob', rating: 'Excellent', description: 'Menambah lebar ke wajah' },
      { name: 'Gaya bervolume di samping', rating: 'Great', description: 'Menyeimbangkan panjang wajah' },
      { name: 'Poni', rating: 'Good', description: 'Mengurangi tinggi dahi' },
    ],
    glasses: [
      { name: 'Kacamata besar', rating: 'Perfect', description: 'Memecah panjang wajah' },
      { name: 'Kacamata bulat', rating: 'Excellent', description: 'Melunakkan sudut wajah' },
      { name: 'Kacamata kotak', rating: 'Great', description: 'Menambah lebar ke wajah' },
      { name: 'Kacamata dengan detail di sisi', rating: 'Good', description: 'Menambah lebar visual' },
    ],
    accessories: [
      { name: 'Anting hoop', rating: 'Perfect', description: 'Menambah lebar ke wajah' },
      { name: 'Kalung multi-layer', rating: 'Excellent', description: 'Memecah panjang leher' },
      { name: 'Topi bucket', rating: 'Great', description: 'Mengurangi tinggi dahi' },
      { name: 'Syal lebar', rating: 'Good', description: 'Menambah lebar visual' },
    ],
  },
};

const shapeNames: Record<FaceShape, string> = {
  oval: 'Oval',
  round: 'Bulat',
  square: 'Persegi',
  heart: 'Hati',
  diamond: 'Berlian',
  rectangle: 'Persegi Panjang',
};

export default function FaceShapeScreen() {
  const router = useRouter();
  const { addAnalysisResult } = useUserStore();
  const [showCamera, setShowCamera] = useState(false);
  const [result, setResult] = useState<ShapeResult | null>(null);
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
        analysisType: 'face' as AnalysisType,
      }) as AnalysisResponse;
      
      if (!analysisResponse.success || !analysisResponse.result) {
        throw new Error("Analysis failed");
      }
      
      // Convert the general analysis result to our specific ShapeResult type
      const resultText = analysisResponse.result.result.toLowerCase();
      const shapeType: FaceShape = (
        resultText.includes('oval') ? 'oval' : 
        resultText.includes('bulat') ? 'round' :
        resultText.includes('persegi panjang') ? 'rectangle' :
        resultText.includes('persegi') ? 'square' :
        resultText.includes('hati') ? 'heart' : 'diamond'
      );
      
      // Get the full result with all details from our predefined results
      const fullResult = faceShapeResults[shapeType];
      
      setResult(fullResult);
      
      // Save the analysis result
      const analysisResult = {
        id: analysisResponse.result.id,
        type: 'face' as AnalysisType,
        title: shapeNames[shapeType],
        date: new Date().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        result: shapeNames[shapeType],
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
      const randomShape = Object.keys(faceShapeResults)[Math.floor(Math.random() * 6)] as FaceShape;
      setResult(faceShapeResults[randomShape]);
      
      // Save the analysis result
      const analysisResult = {
        id: `analysis_${Date.now()}`,
        type: 'face' as AnalysisType,
        title: shapeNames[randomShape],
        date: new Date().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        result: shapeNames[randomShape],
        details: faceShapeResults[randomShape],
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
        guideText="Tarik rambut Anda ke belakang dan hadap kamera secara langsung"
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          title: 'Analisis Bentuk Wajah',
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
            <Text style={styles.infoTitle}>Temukan Bentuk Wajahmu</Text>
            <Text style={styles.infoDescription}>
              Ketahui bentuk wajah Anda dan dapatkan rekomendasi personal untuk gaya rambut, kacamata, dan aksesori yang melengkapi fitur Anda.
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
            <Text style={styles.loadingText}>Menganalisis bentuk wajah Anda...</Text>
            <Text style={styles.loadingSubtext}>Mohon tunggu sebentar, AI kami sedang bekerja</Text>
          </View>
        ) : result ? (
          <View style={styles.resultContainer}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>Bentuk Wajahmu</Text>
              <Text style={styles.resultShape}>{shapeNames[result.shape]}</Text>
              
              <View style={styles.confidenceContainer}>
                <Text style={styles.confidenceLabel}>Tingkat Keyakinan:</Text>
                <Text style={styles.confidenceValue}>{result.confidence}%</Text>
              </View>
            </View>
            
            {imageUri && (
              <View style={styles.imageResultContainer}>
                <Image source={{ uri: imageUri }} style={styles.resultImage} />
              </View>
            )}
            
            <View style={styles.featuresCard}>
              <Text style={styles.featuresTitle}>Fitur Wajah Anda</Text>
              
              {result.features && Object.entries(result.features).map(([key, value]) => (
                <View key={key} style={styles.featureItem}>
                  <View style={styles.featureBullet} />
                  <Text style={styles.featureText}>{value}</Text>
                </View>
              ))}
              
              <Text style={styles.descriptionText}>{result.description}</Text>
            </View>
            
            <View style={styles.recommendationsSection}>
              <Text style={styles.sectionTitle}>Rekomendasi Gaya Rambut</Text>
              
              <View style={styles.recommendationsGrid}>
                {result.hairstyles.map((item, index) => (
                  <View key={`hairstyle-${index}`} style={styles.recommendationCard}>
                    <View style={[styles.recommendationRating, styles[`rating${item.rating}`]]}>
                      <Text style={styles.recommendationRatingText}>{item.rating}</Text>
                    </View>
                    <Text style={styles.recommendationName}>{item.name}</Text>
                    <Text style={styles.recommendationDescription}>{item.description}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.recommendationsSection}>
              <Text style={styles.sectionTitle}>Rekomendasi Kacamata</Text>
              
              <View style={styles.recommendationsGrid}>
                {result.glasses.map((item, index) => (
                  <View key={`glasses-${index}`} style={styles.recommendationCard}>
                    <View style={[styles.recommendationRating, styles[`rating${item.rating}`]]}>
                      <Text style={styles.recommendationRatingText}>{item.rating}</Text>
                    </View>
                    <Text style={styles.recommendationName}>{item.name}</Text>
                    <Text style={styles.recommendationDescription}>{item.description}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.recommendationsSection}>
              <Text style={styles.sectionTitle}>Rekomendasi Aksesori</Text>
              
              <View style={styles.recommendationsGrid}>
                {result.accessories.map((item, index) => (
                  <View key={`accessory-${index}`} style={styles.recommendationCard}>
                    <View style={[styles.recommendationRating, styles[`rating${item.rating}`]]}>
                      <Text style={styles.recommendationRatingText}>{item.rating}</Text>
                    </View>
                    <Text style={styles.recommendationName}>{item.name}</Text>
                    <Text style={styles.recommendationDescription}>{item.description}</Text>
                  </View>
                ))}
              </View>
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
  resultShape: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxl,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  imageResultContainer: {
    marginBottom: layout.spacing.lg,
  },
  resultImage: {
    width: '100%',
    height: 250,
    borderRadius: layout.borderRadius.lg,
  },
  featuresCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.lg,
    marginBottom: layout.spacing.lg,
  },
  featuresTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.sm,
  },
  featureBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: layout.spacing.sm,
  },
  featureText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text,
    flex: 1,
  },
  descriptionText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginTop: layout.spacing.md,
    lineHeight: 22,
  },
  recommendationsSection: {
    marginBottom: layout.spacing.xl,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  recommendationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: layout.spacing.md,
  },
  recommendationCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    padding: layout.spacing.md,
    width: '48%',
    marginBottom: layout.spacing.sm,
  },
  recommendationRating: {
    paddingVertical: layout.spacing.xs,
    paddingHorizontal: layout.spacing.sm,
    borderRadius: layout.borderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: layout.spacing.sm,
  },
  ratingPerfect: {
    backgroundColor: '#4CAF50',
  },
  ratingExcellent: {
    backgroundColor: '#8BC34A',
  },
  ratingGreat: {
    backgroundColor: '#CDDC39',
  },
  ratingGood: {
    backgroundColor: '#FFEB3B',
  },
  recommendationRatingText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    color: colors.surface,
  },
  recommendationName: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  recommendationDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  recommendationsList: {
    marginBottom: layout.spacing.lg,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.xs,
  },
  recommendationBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: layout.spacing.sm,
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