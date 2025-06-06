import { create } from 'zustand';
import { FeedPost, Comment } from '@/types';
import { feedPosts, comments } from '@/mocks/feed';

interface FeedState {
  posts: FeedPost[];
  comments: Record<string, Comment[]>;
  likedPosts: string[];
  savedPosts: string[];
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
  savePost: (postId: string) => void;
  unsavePost: (postId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
  isLiked: (postId: string) => boolean;
  isSaved: (postId: string) => boolean;
}

export const useFeedStore = create<FeedState>()((set, get) => ({
  posts: feedPosts,
  comments: comments,
  likedPosts: [],
  savedPosts: [],
  likePost: (postId) => {
    set((state) => {
      // Update post likes count
      const updatedPosts = state.posts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      });
      
      return { 
        posts: updatedPosts,
        likedPosts: [...state.likedPosts, postId] 
      };
    });
  },
  unlikePost: (postId) => {
    set((state) => {
      // Update post likes count
      const updatedPosts = state.posts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: Math.max(0, post.likes - 1) };
        }
        return post;
      });
      
      return { 
        posts: updatedPosts,
        likedPosts: state.likedPosts.filter(id => id !== postId) 
      };
    });
  },
  savePost: (postId) => 
    set((state) => ({ 
      savedPosts: [...state.savedPosts, postId] 
    })),
  unsavePost: (postId) => 
    set((state) => ({ 
      savedPosts: state.savedPosts.filter(id => id !== postId) 
    })),
  addComment: (postId, comment) => 
    set((state) => {
      const postComments = state.comments[postId] || [];
      const updatedComments = {
        ...state.comments,
        [postId]: [...postComments, comment]
      };
      
      // Update post comment count
      const updatedPosts = state.posts.map(post => {
        if (post.id === postId) {
          return { ...post, comments: post.comments + 1 };
        }
        return post;
      });
      
      return { 
        comments: updatedComments,
        posts: updatedPosts
      };
    }),
  isLiked: (postId) => get().likedPosts.includes(postId),
  isSaved: (postId) => get().savedPosts.includes(postId),
}));