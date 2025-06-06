import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Info, Camera, Upload } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { ImageCapture } from '@/components/ImageCapture';

type FaceShape = 'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'rectangle';

interface ShapeResult {
  shape: FaceShape;
  description: string;
  hairstyles: string[];
  glasses: string[];
  accessories: string[];
}

const faceShapeResults: Record<FaceShape, ShapeResult> = {
  oval: {
    shape: 'oval',
    description: 'Bentuk wajah oval dianggap sebagai bentuk wajah yang ideal karena proporsinya yang seimbang.',
    hairstyles: ['Hampir semua gaya rambut', 'Potongan bob', 'Lapisan panjang'],
    glasses: ['Kacamata persegi', 'Kacamata kucing', 'Kacamata aviator'],
    accessories: ['Anting panjang', 'Kalung pendek', 'Topi fedora'],
  },
  round: {
    shape: 'round',
    description: 'Bentuk wajah bulat memiliki lebar dan panjang yang hampir sama dengan pipi yang penuh.',
    hairstyles: ['Lapisan panjang', 'Potongan asimetris', 'Poni samping'],
    glasses: ['Kacamata persegi', 'Kacamata kotak', 'Kacamata wayfarer'],
    accessories: ['Anting panjang', 'Kalung panjang', 'Topi dengan pinggiran lebar'],
  },
  square: {
    shape: 'square',
    description: 'Bentuk wajah persegi memiliki rahang yang kuat dan dahi yang lebar.',
    hairstyles: ['Lapisan lembut', 'Potongan bob', 'Gaya bergelombang'],
    glasses: ['Kacamata bulat', 'Kacamata oval', 'Kacamata tanpa bingkai'],
    accessories: ['Anting bulat', 'Kalung bulat', 'Bandana'],
  },
  heart: {
    shape: 'heart',
    description: 'Bentuk wajah hati memiliki dahi lebar dan dagu yang meruncing.',
    hairstyles: ['Rambut medium dengan lapisan', 'Poni', 'Potongan bob'],
    glasses: ['Kacamata aviator', 'Kacamata kucing', 'Kacamata bulat'],
    accessories: ['Anting drop', 'Kalung choker', 'Bandana'],
  },
  diamond: {
    shape: 'diamond',
    description: 'Bentuk wajah berlian memiliki tulang pipi yang tinggi dan dagu yang meruncing.',
    hairstyles: ['Poni tebal', 'Potongan bob', 'Gaya bervolume di sisi'],
    glasses: ['Kacamata oval', 'Kacamata kucing', 'Kacamata rimless'],
    accessories: ['Anting stud', 'Kalung pendek', 'Bando tipis'],
  },
  rectangle: {
    shape: 'rectangle',
    description: 'Bentuk wajah persegi panjang memiliki panjang yang lebih dari lebarnya.',
    hairstyles: ['Lapisan pendek', 'Potongan bob', 'Gaya bervolume di samping'],
    glasses: ['Kacamata besar', 'Kacamata bulat', 'Kacamata kotak'],
    accessories: ['Anting hoop', 'Kalung multi-layer', 'Topi bucket'],
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
  const [showCamera, setShowCamera] = useState(false);
  const [result, setResult] = useState<ShapeResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleCapture = async (uri: string) => {
    setShowCamera(false);
    setAnalyzing(true);
    
    // Simulasi analisis
    setTimeout(() => {
      setResult(faceShapeResults.oval);
      setAnalyzing(false);
    }, 2000);
  };

  const handleUpload = async () => {
    setAnalyzing(true);
    
    // Simulasi analisis
    setTimeout(() => {
      setResult(faceShapeResults.oval);
      setAnalyzing(false);
    }, 2000);
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
        {!result && (
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

        {analyzing ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Menganalisis bentuk wajah Anda...</Text>
          </View>
        ) : result ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Bentuk Wajahmu</Text>
            <Text style={styles.resultShape}>{shapeNames[result.shape]}</Text>
            
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' }} 
              style={styles.faceImage}
            />
            
            <Text style={styles.descriptionTitle}>Deskripsi</Text>
            <Text style={styles.descriptionText}>{result.description}</Text>
            
            <Text style={styles.recommendationsTitle}>Gaya Rambut yang Direkomendasikan</Text>
            <View style={styles.recommendationsList}>
              {result.hairstyles.map((item, index) => (
                <View key={`hairstyle-${index}`} style={styles.recommendationItem}>
                  <View style={styles.recommendationBullet} />
                  <Text style={styles.recommendationText}>{item}</Text>
                </View>
              ))}
            </View>
            
            <Text style={styles.recommendationsTitle}>Kacamata yang Direkomendasikan</Text>
            <View style={styles.recommendationsList}>
              {result.glasses.map((item, index) => (
                <View key={`glasses-${index}`} style={styles.recommendationItem}>
                  <View style={styles.recommendationBullet} />
                  <Text style={styles.recommendationText}>{item}</Text>
                </View>
              ))}
            </View>
            
            <Text style={styles.recommendationsTitle}>Aksesori yang Direkomendasikan</Text>
            <View style={styles.recommendationsList}>
              {result.accessories.map((item, index) => (
                <View key={`accessory-${index}`} style={styles.recommendationItem}>
                  <View style={styles.recommendationBullet} />
                  <Text style={styles.recommendationText}>{item}</Text>
                </View>
              ))}
            </View>
            
            <Button 
              title="Lihat Produk yang Direkomendasikan" 
              onPress={() => router.push('/shop')}
              style={styles.productsButton}
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
  },
  loadingText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
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
  resultShape: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxl,
    color: colors.text,
    marginBottom: layout.spacing.lg,
  },
  faceImage: {
    width: '100%',
    height: 300,
    borderRadius: layout.borderRadius.lg,
    marginBottom: layout.spacing.lg,
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
  recommendationsTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.sm,
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
  },
});