import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Send } from 'lucide-react-native';
import { FeedPost } from '@/components/ui/FeedPost';
import { Avatar } from '@/components/ui/Avatar';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { useFeedStore } from '@/store/feedStore';
import { useUserStore } from '@/store/userStore';
import { trpcClient } from '@/lib/trpc';
import { Comment, FeedPost as FeedPostType } from '@/types';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useUserStore();
  const [commentText, setCommentText] = useState('');
  const [post, setPost] = useState<FeedPostType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await trpcClient.social.getPostDetails.query({
          postId: id as string,
        });
        
        if (!response.success) {
          throw new Error(response.error || "Gagal memuat detail postingan");
        }
        
        if (response.post) {
          setPost(response.post);
        }
        
        if (response.comments) {
          setComments(response.comments || []);
        }
      } catch (err) {
        console.error("Error fetching post details:", err);
        setError("Gagal memuat postingan. Silakan coba lagi.");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchPostDetails();
    }
  }, [id]);
  
  const handleAddComment = async () => {
    if (!commentText.trim() || !user || isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      const response = await trpcClient.social.createComment.mutate({
        postId: id as string,
        text: commentText,
        userId: user.id,
        username: user.username,
        userImage: user.profileImage,
      });
      
      if (!response.success) {
        throw new Error("Gagal menambahkan komentar");
      }
      
      // Add the new comment to the list
      if (response.comment) {
        setComments(prev => [...prev, response.comment]);
      
        // Update the post comment count
        if (post) {
          setPost(prevPost => {
            if (!prevPost) return null;
            return {
              ...prevPost,
              comments: (prevPost.comments || 0) + 1,
            };
          });
        }
      }
      
      // Clear the input
      setCommentText('');
    } catch (err) {
      console.error("Error adding comment:", err);
      // Show error message
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const navigateToUser = (userId: string) => {
    router.push(`/user/${userId}`);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || "Postingan tidak ditemukan"}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <FeedPost
          post={post}
          onUserPress={navigateToUser}
          onPostPress={() => {}}
          onCommentPress={() => {}}
        />
        
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsTitle}>Komentar</Text>
          
          {comments.length === 0 ? (
            <Text style={styles.noCommentsText}>Belum ada komentar. Jadilah yang pertama berkomentar!</Text>
          ) : (
            comments.map((comment) => (
              <View key={`comment-${comment.id}`} style={styles.commentItem}>
                <Avatar 
                  source={comment.userImage} 
                  size={40}
                  style={styles.commentAvatar}
                />
                <View style={styles.commentContent}>
                  <Text style={styles.commentUsername}>{comment.username}</Text>
                  <Text style={styles.commentText}>{comment.text}</Text>
                  <Text style={styles.commentTime}>
                    {new Date(comment.timestamp).toLocaleDateString('id-ID')}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <Avatar 
          source={user?.profileImage || ''} 
          size={36}
          style={styles.inputAvatar}
        />
        <TextInput
          style={styles.input}
          value={commentText}
          onChangeText={setCommentText}
          placeholder="Tambahkan komentar..."
          placeholderTextColor={colors.textLight}
          multiline
        />
        <Pressable 
          style={[
            styles.sendButton,
            (!commentText.trim() || isSubmitting) && styles.sendButtonDisabled
          ]}
          onPress={handleAddComment}
          disabled={!commentText.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Send 
              size={20} 
              color={!commentText.trim() ? colors.textLight : colors.primary} 
            />
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: layout.spacing.xxl,
  },
  commentsContainer: {
    padding: layout.spacing.lg,
  },
  commentsTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginBottom: layout.spacing.lg,
  },
  noCommentsText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: layout.spacing.lg,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: layout.spacing.lg,
  },
  commentAvatar: {
    marginRight: layout.spacing.md,
  },
  commentContent: {
    flex: 1,
  },
  commentUsername: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  commentText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text,
    lineHeight: typography.lineHeight.md,
    marginBottom: layout.spacing.xs,
  },
  commentTime: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textLight,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: layout.spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  inputAvatar: {
    marginRight: layout.spacing.md,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: colors.border,
    borderRadius: layout.borderRadius.md,
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: layout.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: layout.spacing.sm,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});