import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Heart } from 'lucide-react-native';
import { TouchableCard } from './Card';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { Product } from '@/types';
import { useProductStore } from '@/store/productStore';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
}) => {
  const { addToWishlist, removeFromWishlist, isWishlisted } = useProductStore();
  const wishlisted = isWishlisted(product.id);

  const handleWishlist = (e: any) => {
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const formatPrice = (price: number, currency = 'IDR') => {
    if (currency === 'IDR') {
      return `Rp ${price.toLocaleString('id-ID')}`;
    }
    return `${currency} ${price}`;
  };

  return (
    <TouchableCard style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="cover"
        />
        <Pressable 
          style={styles.wishlistButton}
          onPress={handleWishlist}
        >
          <Heart
            size={20}
            color={wishlisted ? colors.primary : colors.textLight}
            fill={wishlisted ? colors.primary : 'transparent'}
          />
        </Pressable>
        {product.isEditorsPick && (
          <View style={styles.editorsPick}>
            <Text style={styles.editorsPickText}>Editor's Pick</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.price}>
          {formatPrice(product.price, product.currency)}
        </Text>
      </View>
    </TouchableCard>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    width: 160,
    marginRight: layout.spacing.md,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wishlistButton: {
    position: 'absolute',
    top: layout.spacing.sm,
    right: layout.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: layout.borderRadius.round,
    padding: layout.spacing.xs,
  },
  editorsPick: {
    position: 'absolute',
    bottom: layout.spacing.sm,
    left: layout.spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: layout.borderRadius.sm,
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.xs,
  },
  editorsPickText: {
    color: colors.surface,
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
  },
  content: {
    padding: layout.spacing.md,
  },
  brand: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: layout.spacing.xs,
  },
  name: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  price: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
});