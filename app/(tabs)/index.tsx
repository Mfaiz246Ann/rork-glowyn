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

// Style feed users dengan foto dan nama pengguna baru
const styleFeedUsers = [
  {
    id: 'user1',
    username: 'Kamu',
    image: 'https://images.pexels.com/photos/7958942/pexels-photo-7958942.jpeg',
  },
  {
    id: 'user2',
    username: 'Elegant Style',
    image: 'https://images.pexels.com/photos/32455529/pexels-photo-32455529/free-photo-of-charming-young-woman-with-bouquet-in-hanoi.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'user3',
    username: 'Sweet Casual',
    image: 'https://images.pexels.com/photos/16270616/pexels-photo-16270616/free-photo-of-young-brunette-woman-posing-with-both-hands-by-her-face.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'user4',
    username: 'Cool Tomboy',
    image: 'https://images.pexels.com/photos/14795560/pexels-photo-14795560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'user5',
    username: 'Cosplay Girl',
    image: 'https://images.pexels.com/photos/30475370/pexels-photo-30475370/free-photo-of-vibrant-cosplay-with-bamboo-hat-and-fan-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'user6',
    username: 'Hijabi Style',
    image: 'https://images.pexels.com/photos/7123635/pexels-photo-7123635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

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

  const handleUserPress = (id: string) => {
    if (id === 'user1') {
      router.push('/profile');
    } else {
      navigateToUser(id);
    }
  };

  const handleSeeAllAnalyze = () => {
    router.push('/analyze');
  };

  const handleSeeAllStyleFeed = () => {
    router.push('/style-feed');
  };

  const handleSeeAllShop = () => {
    router.push('/shop');
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
        onSeeAll={handleSeeAllAnalyze}
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
        onSeeAll={handleSeeAllStyleFeed}
        style={styles.sectionHeader}
      />

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesContainer}
      >
        {styleFeedUsers.map((user) => (
          <Pressable 
            key={user.id}
            style={styles.storyItem}
            onPress={() => handleUserPress(user.id)}
          >
            <Avatar 
              source={user.image} 
              size={64} 
              gradient 
            />
            <Text style={styles.storyUsername}>{user.username}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.trendingPostsContainer}>
        {feedPosts.slice(0, 2).map((post) => (
          <FeedPost
            key={`home-feed-${post.id}`}
            post={post}
            onUserPress={() => navigateToUser(post.userId)}
            onPostPress={() => navigateToPost(post.id)}
            onCommentPress={() => navigateToPost(post.id)}
          />
        ))}
      </View>

      <SectionHeader 
        title="Rekomendasi Untukmu" 
        onSeeAll={handleSeeAllShop}
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