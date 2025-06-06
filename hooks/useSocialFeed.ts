import { useState, useEffect } from 'react';
import { FeedPost, Comment } from '@/types';
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
      
      if (!response.success) {
        throw new Error("Failed to fetch posts");
      }
      
      if (cursor) {
        setPosts(prev => [...prev, ...response.posts]);
      } else {
        setPosts(response.posts);
      }
      
      setNextCursor(response.nextCursor);
    } catch (err) {
      setError("Failed to fetch social feed");
      console.error(err);
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
        username: user.username,
        userImage: user.profileImage,
      });
      
      if (!response.success) {
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