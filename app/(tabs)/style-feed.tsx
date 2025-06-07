import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { FeedPost } from '@/components/ui/FeedPost';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { useFeedStore } from '@/store/feedStore';
import { useUserStore } from '@/store/userStore';
import { trpc, trpcClient } from '@/lib/trpc';
import { FeedPost as FeedPostType } from '@/types';

export default function StyleFeedScreen() {
  const router = useRouter();
  const { user } = useUserStore();
  const [posts, setPosts] = useState<FeedPostType[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await trpcClient.social.getPosts.query({
        limit: 10,
      });
      
      if (!response.success) {
        throw new Error("Gagal memuat postingan");
      }
      
      setPosts(response.posts || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Gagal memuat postingan. Silakan coba lagi.");
      // Set empty array to prevent undefined errors
      setPosts([]);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };
  
  const navigateToUser = (userId: string) => {
    router.push(`/user/${userId}`);
  };
  
  const navigateToPost = (postId: string) => {
    router.push(`/post/${postId}`);
  };
  
  const navigateToComments = (postId: string) => {
    router.push(`/post/${postId}`);
  };
  
  if (isLoading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  
  if (error && posts.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => `style-feed-${item.id}`}
        renderItem={({ item }) => (
          <FeedPost
            post={item}
            onUserPress={navigateToUser}
            onPostPress={() => navigateToPost(item.id)}
            onCommentPress={() => navigateToComments(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada postingan</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: layout.spacing.md,
    paddingBottom: layout.spacing.xxl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.spacing.lg,
    backgroundColor: colors.background,
  },
  errorText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    color: colors.error,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.spacing.xl,
    marginTop: layout.spacing.xxl,
  },
  emptyText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});