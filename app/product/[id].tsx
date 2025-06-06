import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Heart, ShoppingBag, Star } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProductCard } from '@/components/ui/ProductCard';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { useProductStore } from '@/store/productStore';
import { trpcClient } from '@/lib/trpc';
import { Product } from '@/types';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useProductStore();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await trpcClient.products.getProductDetails.query({
          productId: id as string,
        });
        
        if (!response.success) {
          throw new Error(response.error || "Gagal memuat detail produk");
        }
        
        // Fix: Check if product exists before setting it
        if (response.product) {
          setProduct(response.product);
        
          // Fetch recommended products
          setIsLoadingRecommendations(true);
          const recommendationsResponse = await trpcClient.products.getRecommendations.query({
            category: response.product.category,
            limit: 5,
          });
          
          if (recommendationsResponse.success) {
            // Filter out the current product
            const filteredProducts = recommendationsResponse.products.filter(
              p => p.id !== response.product?.id
            );
            setRecommendedProducts(filteredProducts);
          }
        }
        
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Gagal memuat produk. Silakan coba lagi.");
      } finally {
        setIsLoading(false);
        setIsLoadingRecommendations(false);
      }
    };
    
    if (id) {
      fetchProductDetails();
    }
  }, [id]);
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  
  if (error || !product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || "Produk tidak ditemukan"}</Text>
      </View>
    );
  }
  
  const wishlisted = isWishlisted(product.id);
  
  const handleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };
  
  const formatPrice = (price: number, currency: string) => {
    if (currency === 'IDR') {
      return `Rp ${price.toLocaleString('id-ID')}`;
    }
    return `${currency} ${price}`;
  };
  
  const navigateToProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="cover"
        />
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>{product.brand}</Text>
            <Text style={styles.name}>{product.name}</Text>
          </View>
          
          <Pressable 
            style={styles.wishlistButton}
            onPress={handleWishlist}
          >
            <Heart
              size={24}
              color={wishlisted ? colors.primary : colors.textLight}
              fill={wishlisted ? colors.primary : 'transparent'}
            />
          </Pressable>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {formatPrice(product.price, product.currency)}
          </Text>
          
          {product.rating && (
            <View style={styles.ratingContainer}>
              <Star size={16} color={colors.warning} fill={colors.warning} />
              <Text style={styles.rating}>{product.rating}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Deskripsi</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
        
        <View style={styles.actionsContainer}>
          <Button
            title="Tambah ke Keranjang"
            variant="primary"
            size="large"
            icon={<ShoppingBag size={20} color={colors.surface} />}
            style={styles.addButton}
            onPress={() => {}}
          />
          
          <Button
            title={wishlisted ? "Sudah di Wishlist" : "Tambah ke Wishlist"}
            variant={wishlisted ? "outline" : "secondary"}
            size="large"
            icon={
              <Heart
                size={20}
                color={wishlisted ? colors.primary : colors.text}
                fill={wishlisted ? colors.primary : 'transparent'}
              />
            }
            style={styles.wishlistButtonLarge}
            onPress={handleWishlist}
          />
        </View>
        
        <SectionHeader 
          title="Mungkin Kamu Suka" 
          style={styles.sectionHeader}
        />
        
        {isLoadingRecommendations ? (
          <View style={styles.loadingRecommendationsContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : recommendedProducts.length > 0 ? (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendationsContainer}
          >
            {recommendedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => navigateToProduct(product.id)}
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noRecommendationsText}>
            Tidak ada produk serupa ditemukan
          </Text>
        )}
      </View>
    </ScrollView>
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
  imageContainer: {
    width: '100%',
    height: 400,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: layout.spacing.lg,
    paddingBottom: layout.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: layout.spacing.md,
  },
  brand: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: layout.spacing.xs,
  },
  name: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxl,
    color: colors.text,
  },
  wishlistButton: {
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.lg,
  },
  price: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.primary,
    marginRight: layout.spacing.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginLeft: layout.spacing.xs,
  },
  descriptionContainer: {
    marginBottom: layout.spacing.xl,
  },
  descriptionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  description: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.md,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginBottom: layout.spacing.xl,
    gap: layout.spacing.md,
  },
  addButton: {
    flex: 2,
  },
  wishlistButtonLarge: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 0,
  },
  loadingRecommendationsContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationsContainer: {
    paddingBottom: layout.spacing.lg,
  },
  noRecommendationsText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    padding: layout.spacing.lg,
  },
});