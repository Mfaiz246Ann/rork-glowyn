import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Info, Camera, Upload } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { ImageCapture } from '@/components/ImageCapture';

type ProductCategory = 'lipstick' | 'blush' | 'eyeshadow';

interface Product {
  id: string;
  name: string;
  brand: string;
  color: string;
  price: string;
  image: string;
}

const products: Record<ProductCategory, Product[]> = {
  lipstick: [
    {
      id: 'lip1',
      name: 'Lipstik Matte Merah',
      brand: 'BeautyGlow',
      color: '#D40000',
      price: 'Rp 189.000',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'lip2',
      name: 'Lipstik Satin Pink',
      brand: 'GlamourLips',
      color: '#FF69B4',
      price: 'Rp 210.000',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'lip3',
      name: 'Lipstik Nude',
      brand: 'NaturalGlow',
      color: '#CD7F32',
      price: 'Rp 175.000',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ],
  blush: [
    {
      id: 'blush1',
      name: 'Perona Pipi Peach',
      brand: 'BeautyGlow',
      color: '#FFDAB9',
      price: 'Rp 165.000',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'blush2',
      name: 'Perona Pipi Coral',
      brand: 'GlamourLips',
      color: '#FF7F50',
      price: 'Rp 185.000',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ],
  eyeshadow: [
    {
      id: 'eye1',
      name: 'Palet Eyeshadow Nude',
      brand: 'BeautyGlow',
      color: '#D2B48C',
      price: 'Rp 250.000',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'eye2',
      name: 'Palet Eyeshadow Smokey',
      brand: 'GlamourLips',
      color: '#696969',
      price: 'Rp 275.000',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ],
};

const categoryNames: Record<ProductCategory, string> = {
  lipstick: 'Lipstik',
  blush: 'Perona Pipi',
  eyeshadow: 'Eyeshadow',
};

export default function VirtualTryOnScreen() {
  const router = useRouter();
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('lipstick');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleCapture = async (uri: string) => {
    setShowCamera(false);
    setImage(uri);
    setSelectedProduct(products[selectedCategory][0]);
  };

  const handleUpload = async () => {
    // Simulasi unggah gambar
    setImage('https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80');
    setSelectedProduct(products[selectedCategory][0]);
  };

  const handleCategoryChange = (category: ProductCategory) => {
    setSelectedCategory(category);
    setSelectedProduct(products[category][0]);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  if (showCamera) {
    return (
      <ImageCapture 
        onCapture={handleCapture}
        onCancel={() => setShowCamera(false)}
        guideText="Pastikan wajah Anda terlihat jelas dengan pencahayaan yang baik"
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          title: 'Virtual Try-On',
          headerTitleStyle: {
            fontFamily: typography.fontFamily.semiBold,
          },
        }}
      />

      <ScrollView style={styles.scrollView}>
        {!image ? (
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Info size={24} color={colors.primary} />
            </View>
            <Text style={styles.infoTitle}>Coba Sebelum Beli</Text>
            <Text style={styles.infoDescription}>
              Coba makeup dan aksesori secara virtual untuk melihat bagaimana tampilannya pada Anda sebelum melakukan pembelian.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: image }} 
                style={styles.userImage}
              />
              {selectedProduct && (
                <View 
                  style={[
                    styles.productOverlay, 
                    selectedCategory === 'lipstick' && styles.lipstickOverlay,
                    selectedCategory === 'blush' && styles.blushOverlay,
                    selectedCategory === 'eyeshadow' && styles.eyeshadowOverlay,
                    { backgroundColor: selectedProduct.color }
                  ]} 
                />
              )}
            </View>

            <View style={styles.categoryTabsContainer}>
              {Object.keys(categoryNames).map((category) => (
                <Pressable
                  key={category}
                  style={[
                    styles.categoryTab,
                    selectedCategory === category && styles.selectedCategoryTab
                  ]}
                  onPress={() => handleCategoryChange(category as ProductCategory)}
                >
                  <Text 
                    style={[
                      styles.categoryTabText,
                      selectedCategory === category && styles.selectedCategoryTabText
                    ]}
                  >
                    {categoryNames[category as ProductCategory]}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.productsContainer}>
              {products[selectedCategory].map((product) => (
                <Pressable
                  key={product.id}
                  style={[
                    styles.productItem,
                    selectedProduct?.id === product.id && styles.selectedProductItem
                  ]}
                  onPress={() => handleProductSelect(product)}
                >
                  <Image 
                    source={{ uri: product.image }} 
                    style={styles.productImage}
                  />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productBrand}>{product.brand}</Text>
                    <Text style={styles.productPrice}>{product.price}</Text>
                  </View>
                </Pressable>
              ))}
            </View>

            <Button 
              title="Lihat Detail Produk" 
              onPress={() => selectedProduct && router.push(`/product/${selectedProduct.id}`)}
              style={styles.detailButton}
            />
          </>
        )}
      </ScrollView>

      {!image && (
        <View style={styles.buttonContainer}>
          <Button
            title="Ambil Foto"
            icon={<Camera size={20} color="#fff" />}
            onPress={() => setShowCamera(true)}
            style={styles.button}
          />
          <Button
            title="Unggah Foto"
            icon={<Upload size={20} color="#fff" />}
            onPress={handleUpload}
            style={styles.button}
            variant="secondary"
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    padding: layout.spacing.lg,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.xl,
    marginBottom: layout.spacing.xl,
    alignItems: 'center',
  },
  infoIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: layout.spacing.md,
  },
  infoTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginBottom: layout.spacing.sm,
    textAlign: 'center',
  },
  infoDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    padding: layout.spacing.lg,
    gap: layout.spacing.md,
  },
  button: {
    marginBottom: layout.spacing.sm,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 400,
    borderRadius: layout.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: layout.spacing.lg,
  },
  userImage: {
    width: '100%',
    height: '100%',
  },
  productOverlay: {
    position: 'absolute',
    opacity: 0.5,
  },
  lipstickOverlay: {
    bottom: '25%',
    left: '40%',
    right: '40%',
    height: '5%',
    borderRadius: 10,
  },
  blushOverlay: {
    top: '35%',
    left: '15%',
    right: '15%',
    height: '10%',
    borderRadius: 20,
  },
  eyeshadowOverlay: {
    top: '25%',
    left: '30%',
    right: '30%',
    height: '5%',
    borderRadius: 10,
  },
  categoryTabsContainer: {
    flexDirection: 'row',
    marginBottom: layout.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoryTab: {
    flex: 1,
    paddingVertical: layout.spacing.md,
    alignItems: 'center',
  },
  selectedCategoryTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  categoryTabText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  selectedCategoryTabText: {
    color: colors.primary,
  },
  productsContainer: {
    gap: layout.spacing.md,
    marginBottom: layout.spacing.lg,
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedProductItem: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  productImage: {
    width: 80,
    height: 80,
  },
  productInfo: {
    flex: 1,
    padding: layout.spacing.md,
  },
  productName: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  productBrand: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: layout.spacing.xs,
  },
  productPrice: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.primary,
  },
  detailButton: {
    marginBottom: layout.spacing.xl,
  },
});