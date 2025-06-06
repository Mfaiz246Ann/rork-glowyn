import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Grid, Bookmark, Heart } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { useUserStore } from '@/store/userStore';
import { popularUsers } from '@/mocks/users';
import { feedPosts } from '@/mocks/feed';

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user: currentUser } = useUserStore();
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Find the user by id
  const user = id === currentUser?.id 
    ? currentUser 
    : popularUsers.find(u => u.id === id);
  
  if (!user) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>User not found</Text>
      </View>
    );
  }
  
  // Get user's posts
  const userPosts = feedPosts.filter(post => post.userId === user.id);
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.profileContainer}>
        <Avatar source={user.profileImage} size={100} gradient />
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.bioContainer}>
        <Text style={styles.displayName}>{user.displayName}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
        
        {user.id !== currentUser?.id && (
          <Button
            title={isFollowing ? "Following" : "Follow"}
            variant={isFollowing ? "outline" : "primary"}
            size="medium"
            style={styles.followButton}
            onPress={handleFollow}
          />
        )}
      </View>
      
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
        {userPosts.map((post) => (
          <Pressable 
            key={`user-post-${post.id}`}
            style={styles.gridItem}
            onPress={() => router.push(`/post/${post.id}`)}
          >
            <Image
              source={{ uri: post.image }}
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
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.spacing.lg,
  },
  notFoundText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
  },
  profileContainer: {
    alignItems: 'center',
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.xl,
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
  followButton: {
    width: '100%',
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