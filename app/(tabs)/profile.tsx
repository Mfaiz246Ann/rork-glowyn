import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Settings, Grid, Bookmark, Heart } from 'lucide-react-native';
import { Image } from 'expo-image';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { TouchableCard } from '@/components/ui/Card';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { useUserStore } from '@/store/userStore';
import { featuredProducts } from '@/mocks/products';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, analysisResults } = useUserStore();
  const [activeTab, setActiveTab] = useState('posts');
  
  const navigateToAnalysis = (type: string) => {
    switch (type) {
      case 'color':
        router.push('/color-analysis');
        break;
      case 'face':
        router.push('/face-shape');
        break;
      default:
        break;
    }
  };

  // Handle case where user or analysisResults might be undefined
  const safeAnalysisResults = analysisResults || [];
  const safeUser = user || {
    id: 'default',
    name: 'User',
    email: 'user@example.com',
    avatar: 'https://images.pexels.com/photos/7958942/pexels-photo-7958942.jpeg',
    displayName: 'User',
    bio: 'Welcome to your profile',
    followers: 0,
    following: 0,
    posts: 0,
    profileImage: 'https://images.pexels.com/photos/7958942/pexels-photo-7958942.jpeg'
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Pressable style={styles.settingsButton}>
          <Settings size={24} color={colors.text} />
        </Pressable>
      </View>
      
      <View style={styles.profileContainer}>
        <Avatar 
          source={safeUser.profileImage || safeUser.avatar || ''} 
          size={100} 
          gradient 
        />
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{safeUser.posts || 0}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{safeUser.followers || 0}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{safeUser.following || 0}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.bioContainer}>
        <Text style={styles.displayName}>
          {safeUser.displayName || safeUser.name || 'User'}
        </Text>
        <Text style={styles.bio}>{safeUser.bio}</Text>
        
        <Button
          title="Edit Profile"
          variant="outline"
          size="medium"
          style={styles.editButton}
          onPress={() => {}}
        />
      </View>
      
      {safeAnalysisResults.length > 0 && (
        <View style={styles.analysisContainer}>
          <Text style={styles.analysisTitle}>Your Beauty Analysis</Text>
          
          <View style={styles.analysisCardsContainer}>
            {safeAnalysisResults.slice(0, 2).map((analysis) => (
              <TouchableCard 
                key={analysis.id}
                style={[
                  styles.analysisCard,
                  analysis.type === 'color' && { backgroundColor: colors.primaryLight }
                ]}
                onPress={() => navigateToAnalysis(analysis.type)}
              >
                <Text style={styles.analysisCardTitle}>{analysis.title}</Text>
                <Text style={styles.analysisCardDate}>{analysis.date}</Text>
                <View style={styles.analysisCardArrow}>
                  <Text style={styles.analysisCardArrowText}>›</Text>
                </View>
              </TouchableCard>
            ))}
          </View>
        </View>
      )}
      
      <View style={styles.tabsContainer}>
        <Pressable 
          style={[
            styles.tabButton,
            activeTab === 'posts' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('posts')}
        >
          <Grid 
            size={24} 
            color={activeTab === 'posts' ? colors.primary : colors.textLight} 
          />
        </Pressable>
        
        <Pressable 
          style={[
            styles.tabButton,
            activeTab === 'saved' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('saved')}
        >
          <Bookmark 
            size={24} 
            color={activeTab === 'saved' ? colors.primary : colors.textLight} 
          />
        </Pressable>
        
        <Pressable 
          style={[
            styles.tabButton,
            activeTab === 'liked' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('liked')}
        >
          <Heart 
            size={24} 
            color={activeTab === 'liked' ? colors.primary : colors.textLight} 
          />
        </Pressable>
      </View>
      
      <View style={styles.gridContainer}>
        {featuredProducts.map((product) => (
          <Pressable 
            key={product.id}
            style={styles.gridItem}
            onPress={() => router.push(`/product/${product.id}`)}
          >
            <Image
              source={{ uri: product.image }}
              style={styles.gridImage}
              contentFit="cover"
            />
          </Pressable>
        ))}
      </View>
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
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxxl,
    color: colors.text,
  },
  settingsButton: {
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
  profileContainer: {
    alignItems: 'center',
    paddingHorizontal: layout.spacing.lg,
    paddingBottom: layout.spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: layout.spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
  },
  statLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  bioContainer: {
    paddingHorizontal: layout.spacing.lg,
    paddingBottom: layout.spacing.lg,
  },
  displayName: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  bio: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: layout.spacing.md,
    lineHeight: typography.lineHeight.md,
  },
  editButton: {
    width: '100%',
  },
  analysisContainer: {
    paddingHorizontal: layout.spacing.lg,
    paddingBottom: layout.spacing.lg,
  },
  analysisTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  analysisCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  analysisCard: {
    width: '48%',
    padding: layout.spacing.md,
  },
  analysisCardTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  analysisCardDate: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  analysisCardArrow: {
    position: 'absolute',
    bottom: layout.spacing.sm,
    right: layout.spacing.sm,
  },
  analysisCardArrowText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxl,
    color: colors.primary,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: layout.spacing.md,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 1,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
});