import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '@/types';
import { featuredProducts } from '@/mocks/products';

interface ProductState {
  products: Product[];
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: featuredProducts,
      wishlist: [],
      addToWishlist: (productId) => 
        set((state) => ({ 
          wishlist: [...state.wishlist, productId] 
        })),
      removeFromWishlist: (productId) => 
        set((state) => ({ 
          wishlist: state.wishlist.filter(id => id !== productId) 
        })),
      isWishlisted: (productId) => get().wishlist.includes(productId),
    }),
    {
      name: 'product-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);