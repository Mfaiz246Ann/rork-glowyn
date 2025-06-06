import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Heart, MessageCircle, Bookmark } from 'lucide-react-native';
import { TouchableAvatar } from './Avatar';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { FeedPost as FeedPostType } from '@/types';
import { useFeedStore } from '@/store/feedStore';

interface FeedPostProps {
  post: FeedPostType;
  onUserPress: (userId: string) => void;
  onPostPress: (postId: string) => void;
  onCommentPress: (postId: string) => void;
}

export const FeedPost: React.FC<FeedPostProps> = ({
  post,
  onUserPress,
  onPostPress,
  onCommentPress,
}) => {
  const { likePost, unlikePost, savePost, unsavePost, isLiked, isSaved } = useFeedStore();
  const liked = isLiked(post.id);
  const saved = isSaved(post.id);

  const handleLike = () => {
    if (liked) {
      unlikePost(post.id);
    } else {
      likePost(post.id);
    }
  };

  const handleSave = () => {
    if (saved) {
      unsavePost(post.id);
    } else {
      savePost(post.id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableAvatar
          source={post.userImage}
          size={40}
          onPress={() => onUserPress(post.userId)}
        />
        <Text 
          style={styles.username}
          onPress={() => onUserPress(post.userId)}
        >
          {post.username}
        </Text>
      </View>
      
      <Pressable onPress={() => onPostPress(post.id)}>
        <Image
          source={{ uri: post.image }}
          style={styles.image}
          contentFit="cover"
        />
      </Pressable>
      
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <Pressable style={styles.actionButton} onPress={handleLike}>
            <Heart
              size={24}
              color={liked ? colors.primary : colors.text}
              fill={liked ? colors.primary : 'transparent'}
            />
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => onCommentPress(post.id)}>
            <MessageCircle size={24} color={colors.text} />
          </Pressable>
        </View>
        <Pressable style={styles.actionButton} onPress={handleSave}>
          <Bookmark
            size={24}
            color={saved ? colors.primary : colors.text}
            fill={saved ? colors.primary : 'transparent'}
          />
        </Pressable>
      </View>
      
      <Text style={styles.likes}>{post.likes} likes</Text>
      
      <View style={styles.captionContainer}>
        <Text style={styles.captionUsername}>{post.username}</Text>
        <Text style={styles.caption}>{post.caption}</Text>
      </View>
      
      {post.comments > 0 && (
        <Text 
          style={styles.viewComments}
          onPress={() => onCommentPress(post.id)}
        >
          View all {post.comments} comments
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: layout.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: layout.spacing.md,
  },
  username: {
    marginLeft: layout.spacing.md,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: layout.spacing.md,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: layout.spacing.md,
  },
  likes: {
    paddingHorizontal: layout.spacing.md,
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  captionContainer: {
    flexDirection: 'row',
    paddingHorizontal: layout.spacing.md,
    marginBottom: layout.spacing.sm,
  },
  captionUsername: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginRight: layout.spacing.xs,
  },
  caption: {
    flex: 1,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  viewComments: {
    paddingHorizontal: layout.spacing.md,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
});