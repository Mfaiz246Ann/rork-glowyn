import { useState, useEffect } from 'react';
import { FeedPost, Comment, SocialPostsResponse } from '@/types';
import { trpcClient } from '@/lib/trpc';
import { useUserStore } from '@/store/userStore';

export const useSocialFeed = (userId?: string, limit: number = 10) => {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const { user } = useUserStore();

  const fetchPosts = async (cursor?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await trpcClient.social.getPosts.query({
        userId,
        limit,
        cursor,
      });
      
      // Check if response exists and has the expected structure
      if (!response || typeof response !== 'object') {
        throw new Error("Invalid response format");
      }
      
      // Handle the response based on its structure
      let postsData: FeedPost[] = [];
      let nextCursorData: string | null = null;
      
      // Type guard to check if response has success property
      if ('success' in response) {
        const successResponse = response as SocialPostsResponse;
        if (!successResponse.success) {
          throw new Error('error' in successResponse ? successResponse.error : "Failed to fetch posts");
        }
        // TypeScript now knows this is the success case
        postsData = successResponse.posts;
        nextCursorData = successResponse.nextCursor;
      } else if ('posts' in response) {
        // Legacy format without success field - cast to expected type
        const legacyResponse = response as { posts: FeedPost[]; nextCursor: string | null };
        postsData = legacyResponse.posts;
        nextCursorData = legacyResponse.nextCursor;
      } else {
        throw new Error("Unexpected response format");
      }
      
      if (cursor) {
        setPosts(prev => [...prev, ...postsData]);
      } else {
        setPosts(postsData);
      }
      
      setNextCursor(nextCursorData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch social feed";
      setError(errorMessage);
      console.error("Error fetching posts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMorePosts = () => {
    if (nextCursor && !isLoading) {
      fetchPosts(nextCursor);
    }
  };

  const likePost = async (postId: string) => {
    if (!user) return;
    
    try {
      await trpcClient.social.likePost.mutate({
        postId,
        userId: user.id,
        action: 'like',
      });
      
      // Update the local state
      setPosts(prev => 
        prev.map(post => 
          post.id === postId 
            ? { ...post, likes: post.likes + 1 } 
            : post
        )
      );
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  const unlikePost = async (postId: string) => {
    if (!user) return;
    
    try {
      await trpcClient.social.likePost.mutate({
        postId,
        userId: user.id,
        action: 'unlike',
      });
      
      // Update the local state
      setPosts(prev => 
        prev.map(post => 
          post.id === postId 
            ? { ...post, likes: Math.max(0, post.likes - 1) } 
            : post
        )
      );
    } catch (err) {
      console.error("Failed to unlike post:", err);
    }
  };

  const addComment = async (postId: string, text: string) => {
    if (!user || !text.trim()) return;
    
    try {
      const response = await trpcClient.social.createComment.mutate({
        postId,
        text,
        userId: user.id,
        username: user.name,
        userImage: user.avatar,
      });
      
      if (!response || !response.success) {
        throw new Error("Failed to add comment");
      }
      
      // Update the local state
      setPosts(prev => 
        prev.map(post => 
          post.id === postId 
            ? { ...post, comments: post.comments + 1 } 
            : post
        )
      );
      
      return response.comment;
    } catch (err) {
      console.error("Failed to add comment:", err);
      return null;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userId, limit]);

  return {
    posts,
    isLoading,
    error,
    hasMore: !!nextCursor,
    fetchMorePosts,
    likePost,
    unlikePost,
    addComment,
    refresh: () => fetchPosts(),
  };
};