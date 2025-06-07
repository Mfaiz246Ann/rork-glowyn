import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { FeedPost as FeedPostType, Product } from '@/types';
import { Avatar } from './Avatar';
import { Card } from './Card';

interface FeedPostProps {
  post: FeedPostType;
  onUserPress: (userId: string) => void;
  onPostPress: () => void;
  onCommentPress: () => void;
}

export const FeedPost: React.FC<FeedPostProps> = ({
  post,
  onUserPress,
  onPostPress,
  onCommentPress,
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatPrice = (price: number, currency = 'IDR') => {
    if (currency === 'IDR') {
      return `Rp ${price.toLocaleString('id-ID')}`;
    }
    return `${currency} ${price}`;
  };

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() => onUserPress(post.userId)}
        >
          <Avatar
            source={{ uri: post.userAvatar }}
            size={40}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.userName}>{post.userName}</Text>
            <Text style={styles.date}>{formatDate(post.date)}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Pressable onPress={onPostPress}>
        <Image
          source={{ uri: post.image }}
          style={styles.postImage}
          contentFit="cover"
        />
      </Pressable>

      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Heart
              size={24}
              color={liked ? colors.primary : colors.textSecondary}
              fill={liked ? colors.primary : 'transparent'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onCommentPress}>
            <MessageCircle size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
          <Bookmark
            size={24}
            color={saved ? colors.primary : colors.textSecondary}
            fill={saved ? colors.primary : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.likes}>{likesCount} suka</Text>
        <Text style={styles.caption}>
          <Text style={styles.userName}>{post.userName}</Text> {post.caption}
        </Text>
        <TouchableOpacity onPress={onCommentPress}>
          <Text style={styles.comments}>
            Lihat semua {post.comments} komentar
          </Text>
        </TouchableOpacity>
      </View>

      {post.products && post.products.length > 0 && (
        <View style={styles.productsContainer}>
          <Text style={styles.productsTitle}>Produk dalam post ini:</Text>
          {post.products.map((product: Product) => (
            <View key={product.id} style={styles.productItem}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
                contentFit="cover"
              />
              <View style={styles.productInfo}>
                <Text style={styles.productBrand}>{product.brand}</Text>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>
                  {formatPrice(product.price, product.currency)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: layout.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: layout.spacing.sm,
  },
  userName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  date: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: layout.spacing.md,
  },
  content: {
    paddingHorizontal: layout.spacing.md,
    paddingBottom: layout.spacing.md,
  },
  likes: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  caption: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  comments: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  productsContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.md,
  },
  productsTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: layout.spacing.md,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: layout.borderRadius.md,
  },
  productInfo: {
    marginLeft: layout.spacing.md,
    flex: 1,
  },
  productBrand: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  productName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginVertical: layout.spacing.xs,
  },
  productPrice: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
    color: colors.primary,
  },
});