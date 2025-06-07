import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList, ActivityIndicator, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SearchBar } from '@/components/ui/SearchBar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { CollectionCard } from '@/components/ui/CollectionCard';
import { ProductCard } from '@/components/ui/ProductCard';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import { typography } from '@/constants/typography';
import { trpcClient } from '@/lib/trpc';
import { Product, Category, Collection } from '@/types';

// Import categories and collections directly from mocks
import { productCategories, productCollections } from '@/mocks/products';

export default function ShopScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Ensure categories and collections are defined with default empty arrays
  const safeCategories: Category[] = productCategories || [];
  const safeCollections: Collection[] = productCollections || [];
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await trpcClient.products.getRecommendations.query({
          limit: 10,
        });
        
        if (!response.success) {
          throw new Error("Gagal memuat produk");
        }
        
        setProducts(response.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Gagal memuat produk. Silakan coba lagi.");
        // Set empty array to prevent undefined errors
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const navigateToCategory = (id: string) => {
    router.push(`/category/${id}`);
  };
  
  const navigateToCollection = (id: string) => {
    router.push(`/collection/${id}`);
  };
  
  const navigateToProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Cari produk..."
          onFilterPress={() => {}}
          style={styles.searchBar}
        />
      </View>
      
      <SectionHeader title="Kategori" />
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {safeCategories && safeCategories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            image={category.image}
            onPress={() => navigateToCategory(category.id)}
          />
        ))}
      </ScrollView>
      
      <SectionHeader 
        title="Koleksi Unggulan" 
        onSeeAll={() => {}}
        style={styles.sectionHeader}
      />
      
      <View style={styles.featuredContainer}>
        {safeCollections && safeCollections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            onPress={() => navigateToCollection(collection.id)}
          />
        ))}
      </View>
      
      <SectionHeader 
        title="Rekomendasi Untukmu" 
        onSeeAll={() => {}}
        style={styles.sectionHeader}
      />
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigateToProduct(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsContainer}
          scrollEnabled={true}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Tidak ada produk ditemukan</Text>
            </View>
          }
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: layout.spacing.lg,
    paddingBottom: layout.spacing.xxl,
  },
  header: {
    marginBottom: layout.spacing.lg,
  },
  searchBar: {
    marginBottom: 0,
  },
  categoriesContainer: {
    paddingBottom: layout.spacing.lg,
  },
  sectionHeader: {
    marginTop: layout.spacing.lg,
  },
  featuredContainer: {
    marginBottom: layout.spacing.md,
  },
  productsContainer: {
    paddingBottom: layout.spacing.lg,
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.spacing.lg,
  },
  errorText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.error,
    textAlign: 'center',
  },
  emptyContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
});