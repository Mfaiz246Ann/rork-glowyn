import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Bell, ChevronRight, Palette, User2, FileText, Camera } from 'lucide-react-native';
import { TouchableCard } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProductCard } from '@/components/ui/ProductCard';
import { FeedPost } from '@/components/ui/FeedPost';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { useUserStore } from '@/store/userStore';
import { featuredProducts } from '@/mocks/products';
import { feedPosts } from '@/mocks/feed';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUserStore();
  
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

  const navigateToProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

  const navigateToUser = (id: string) => {
    router.push(`/user/${id}`);
  };

  const navigateToPost = (id: string) => {
    router.push(`/post/${id}`);
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Halo, Cantik!</Text>
          <Text style={styles.subGreeting}>Temukan gaya sempurnamu</Text>
        </View>
        <Pressable style={styles.notificationButton}>
          <Bell size={24} color={colors.text} />
        </Pressable>
      </View>

      <SectionHeader 
        title="Temukan Kecantikanmu" 
        onSeeAll={() => router.push('/analyze')}
        style={styles.sectionHeader}
      />

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.analysisCardsContainer}
      >
        <TouchableCard 
          style={[styles.analysisCard, { backgroundColor: colors.primaryLight }]}
          onPress={() => navigateToAnalysis('color')}
        >
          <View style={styles.analysisIconContainer}>
            <Palette size={24} color={colors.primary} />
          </View>
          <Text style={styles.analysisTitle}>Analisis Warna</Text>
          <Text style={styles.analysisDescription}>Temukan palet warna sempurnamu</Text>
          <ChevronRight size={20} color={colors.primary} style={styles.analysisArrow} />
        </TouchableCard>

        <TouchableCard 
          style={styles.analysisCard}
          onPress={() => navigateToAnalysis('face')}
        >
          <View style={styles.analysisIconContainer}>
            <User2 size={24} color={colors.primary} />
          </View>
          <Text style={styles.analysisTitle}>Bentuk Wajah</Text>
          <Text style={styles.analysisDescription}>Temukan bentuk wajah dan gaya ideal</Text>
          <ChevronRight size={20} color={colors.primary} style={styles.analysisArrow} />
        </TouchableCard>
      </ScrollView>

      <SectionHeader 
        title="Trending di Style Feed" 
        onSeeAll={() => router.push('/style-feed')}
        style={styles.sectionHeader}
      />

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesContainer}
      >
        <Pressable style={styles.storyItem} onPress={() => router.push('/profile')}>
          <Avatar source={user?.profileImage || ''} size={64} gradient />
          <Text style={styles.storyUsername}>Kamu</Text>
        </Pressable>
        
        {feedPosts.map((post) => (
          <Pressable 
            key={`home-story-${post.id}`} 
            style={styles.storyItem}
            onPress={() => navigateToUser(post.userId)}
          >
            <Avatar source={post.userImage} size={64} gradient />
            <Text style={styles.storyUsername}>{post.username}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.trendingPostsContainer}>
        {feedPosts.slice(0, 2).map((post) => (
          <FeedPost
            key={`home-feed-${post.id}`}
            post={post}
            onUserPress={navigateToUser}
            onPostPress={navigateToPost}
            onCommentPress={(id) => router.push(`/post/${id}`)}
          />
        ))}
      </View>

      <SectionHeader 
        title="Rekomendasi Untukmu" 
        onSeeAll={() => router.push('/shop')}
        style={styles.sectionHeader}
      />

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsContainer}
      >
        {featuredProducts.map((product) => (
          <ProductCard
            key={`home-product-${product.id}`}
            product={product}
            onPress={() => navigateToProduct(product.id)}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.lg,
    paddingTop: layout.spacing.lg,
    paddingBottom: layout.spacing.md,
  },
  greeting: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxxl,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  subGreeting: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: layout.borderRadius.round,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    paddingHorizontal: layout.spacing.lg,
    marginTop: layout.spacing.lg,
  },
  analysisCardsContainer: {
    paddingHorizontal: layout.spacing.lg,
    paddingBottom: layout.spacing.md,
  },
  analysisCard: {
    width: 240,
    marginRight: layout.spacing.md,
    padding: layout.spacing.lg,
  },
  analysisIconContainer: {
    width: 48,
    height: 48,
    borderRadius: layout.borderRadius.round,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: layout.spacing.md,
  },
  analysisTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  analysisDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: layout.spacing.md,
  },
  analysisArrow: {
    alignSelf: 'flex-end',
  },
  storiesContainer: {
    paddingHorizontal: layout.spacing.lg,
    paddingBottom: layout.spacing.lg,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: layout.spacing.lg,
  },
  storyUsername: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text,
    marginTop: layout.spacing.xs,
  },
  trendingPostsContainer: {
    paddingHorizontal: layout.spacing.lg,
  },
  productsContainer: {
    paddingHorizontal: layout.spacing.lg,
    paddingBottom: layout.spacing.xl,
  },
});