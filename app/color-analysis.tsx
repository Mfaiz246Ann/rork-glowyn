import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Info, Camera, Upload } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { ImageCapture } from '@/components/ImageCapture';

type ColorSeason = 'spring' | 'summer' | 'autumn' | 'winter';
type ColorTone = 'warm' | 'cool' | 'neutral';

interface ColorResult {
  season: ColorSeason;
  tone: ColorTone;
  palette: string[];
  recommendations: string;
}

const colorResults: Record<ColorSeason, ColorResult> = {
  spring: {
    season: 'spring',
    tone: 'warm',
    palette: ['#FF7F50', '#FFDAB9', '#FFFF00', '#8FBC8F', '#40E0D0'],
    recommendations: 'Warna-warna Anda hangat dan cerah, sempurna untuk menonjolkan kilau alami pada kulit Anda.',
  },
  summer: {
    season: 'summer',
    tone: 'cool',
    palette: ['#FFB6C1', '#ADD8E6', '#E6E6FA', '#98FB98', '#D3D3D3'],
    recommendations: 'Warna-warna Anda lembut dan sejuk, memberikan tampilan yang elegan dan menenangkan.',
  },
  autumn: {
    season: 'autumn',
    tone: 'warm',
    palette: ['#D2691E', '#F4A460', '#DAA520', '#556B2F', '#8B4513'],
    recommendations: 'Warna-warna Anda hangat dan dalam, menyatu dengan nuansa alami dan memberikan tampilan yang kaya.',
  },
  winter: {
    season: 'winter',
    tone: 'cool',
    palette: ['#DC143C', '#000080', '#FFFFFF', '#4B0082', '#2F4F4F'],
    recommendations: 'Warna-warna Anda kontras dan tajam, memberikan tampilan yang dramatis dan mencolok.',
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
  const [showCamera, setShowCamera] = useState(false);
  const [result, setResult] = useState<ColorResult | null>(colorResults.spring);
  const [analyzing, setAnalyzing] = useState(false);

  const handleCapture = async (uri: string) => {
    setShowCamera(false);
    setAnalyzing(true);
    
    // Simulasi analisis
    setTimeout(() => {
      setResult(colorResults.spring);
      setAnalyzing(false);
    }, 2000);
  };

  const handleUpload = async () => {
    setAnalyzing(true);
    
    // Simulasi analisis
    setTimeout(() => {
      setResult(colorResults.spring);
      setAnalyzing(false);
    }, 2000);
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
        {!result && (
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

        {analyzing ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Menganalisis warna Anda...</Text>
          </View>
        ) : result ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Musim Warnamu</Text>
            <Text style={[styles.resultSeason, { color: result.palette[0] }]}>
              {seasonNames[result.season]}
            </Text>

            <Text style={styles.paletteTitle}>Palet Warnamu</Text>
            <View style={styles.paletteContainer}>
              {result.palette.map((color, index) => (
                <View key={index} style={styles.colorItemContainer}>
                  <View style={[styles.colorSwatch, { backgroundColor: color }]} />
                  <Text style={styles.colorName}>{colorNames[color]}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.recommendationsTitle}>Rekomendasi</Text>
            <Text style={styles.recommendationsText}>{result.recommendations}</Text>

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
                  size="sm"
                />
              </View>
            </View>
          </View>
        ) : null}
      </ScrollView>

      {!result && (
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
  resultSeason: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxl,
    marginBottom: layout.spacing.xl,
  },
  paletteTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  paletteContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: layout.spacing.xl,
  },
  colorItemContainer: {
    alignItems: 'center',
    width: '20%',
    marginBottom: layout.spacing.md,
  },
  colorSwatch: {
    width: 60,
    height: 60,
    borderRadius: layout.borderRadius.lg,
    marginBottom: layout.spacing.xs,
  },
  colorName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text,
    textAlign: 'center',
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
});