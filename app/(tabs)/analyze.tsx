import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Palette, User2, FileText, Camera } from 'lucide-react-native';
import { AnalysisCard } from '@/components/ui/AnalysisCard';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { Image } from 'expo-image';
import { useUserStore } from '@/store/userStore';

export default function AnalyzeScreen() {
  const router = useRouter();
  const { analysisResults } = useUserStore();
  
  const navigateToAnalysis = (type: string) => {
    switch (type) {
      case 'color':
        router.push('/color-analysis');
        break;
      case 'face':
        router.push('/face-shape');
        break;
      case 'skin':
        router.push('/skin-analysis');
        break;
      case 'virtual':
        router.push('/virtual-try-on');
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Analisis Kecantikan</Text>
      
      <View style={styles.introContainer}>
        <Text style={styles.introTitle}>Temukan Kecantikanmu</Text>
        <Text style={styles.introDescription}>
          Gunakan analisis bertenaga AI untuk mendapatkan rekomendasi kecantikan dan fashion yang dipersonalisasi
        </Text>
      </View>
      
      <View style={styles.cardsContainer}>
        <AnalysisCard
          title="Analisis Warna"
          description="Temukan warna sempurna berdasarkan undertone kulitmu"
          icon={<Palette size={24} color={colors.primary} />}
          onPress={() => navigateToAnalysis('color')}
        />
        
        <AnalysisCard
          title="Bentuk Wajah"
          description="Temukan bentuk wajah dan gaya ideal"
          icon={<User2 size={24} color={colors.primary} />}
          onPress={() => navigateToAnalysis('face')}
        />
        
        <AnalysisCard
          title="Analisis Kulit"
          description="Dapatkan rekomendasi perawatan kulit yang dipersonalisasi"
          icon={<FileText size={24} color={colors.primary} />}
          onPress={() => navigateToAnalysis('skin')}
        />
        
        <AnalysisCard
          title="Virtual Try-On"
          description="Coba makeup dan aksesori secara virtual"
          icon={<Camera size={24} color={colors.primary} />}
          onPress={() => navigateToAnalysis('virtual')}
        />
      </View>
      
      {analysisResults.length > 0 && (
        <View style={styles.recentContainer}>
          <Text style={styles.recentTitle}>Analisis Terbaru</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentScrollView}>
            {analysisResults.slice(0, 3).map((analysis, index) => (
              <Pressable 
                key={analysis.id} 
                style={styles.recentCard}
                onPress={() => {
                  switch (analysis.type) {
                    case 'color':
                      router.push('/color-analysis');
                      break;
                    case 'face':
                      router.push('/face-shape');
                      break;
                    case 'skin':
                      router.push('/skin-analysis');
                      break;
                    default:
                      break;
                  }
                }}
              >
                <View style={styles.recentCardContent}>
                  <Text style={styles.recentCardType}>Analisis {analysis.type === 'color' ? 'Warna' : analysis.type === 'face' ? 'Wajah' : 'Kulit'}</Text>
                  <Text style={styles.recentCardResult}>{analysis.result}</Text>
                  <Text style={styles.recentCardDate}>{analysis.date}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
      
      <Button
        title="Pindai Cepat"
        variant="primary"
        gradient
        size="large"
        style={styles.quickScanButton}
        icon={<Camera size={20} color={colors.surface} />}
        onPress={() => navigateToAnalysis('color')}
      />
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
  introContainer: {
    marginBottom: layout.spacing.xl,
  },
  introTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxl,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  introDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.md,
  },
  cardsContainer: {
    marginBottom: layout.spacing.xl,
  },
  recentContainer: {
    marginBottom: layout.spacing.xl,
  },
  recentTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  recentScrollView: {
    marginBottom: layout.spacing.md,
  },
  recentCard: {
    width: 250,
    height: 150,
    borderRadius: layout.borderRadius.lg,
    marginRight: layout.spacing.md,
    overflow: 'hidden',
    backgroundColor: colors.primaryLight,
  },
  recentCardContent: {
    padding: layout.spacing.md,
    flex: 1,
    justifyContent: 'space-between',
  },
  recentCardType: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  recentCardResult: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginVertical: layout.spacing.sm,
  },
  recentCardDate: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  recentImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: layout.borderRadius.lg,
    overflow: 'hidden',
  },
  recentImage: {
    width: '100%',
    height: '100%',
  },
  quickScanButton: {
    width: '100%',
  },
});