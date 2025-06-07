import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { Product } from "@/types";

// Mock products data with Rupiah prices
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Hydrating Serum",
    description: "Serum ringan yang memberikan hidrasi mendalam untuk kulit",
    price: 299000,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1287&auto=format&fit=crop",
    category: "skincare",
    rating: 4.8,
    reviews: 124,
    brand: "GlowSkin",
    currency: "IDR",
    isEditorsPick: true,
  },
  {
    id: "2",
    name: "Matte Lipstick",
    description: "Lipstik matte tahan lama dengan warna pink yang cantik",
    price: 189000,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1315&auto=format&fit=crop",
    category: "makeup",
    rating: 4.5,
    reviews: 89,
    brand: "ColorPop",
    currency: "IDR",
  },
  {
    id: "3",
    name: "Silk Blouse",
    description: "Blus sutra elegan yang cocok untuk berbagai kesempatan",
    price: 799000,
    image: "https://images.unsplash.com/photo-1551163943-3f7aefc7a33e?q=80&w=1364&auto=format&fit=crop",
    category: "fashion",
    rating: 4.7,
    reviews: 56,
    brand: "ElegantWear",
    currency: "IDR",
  },
];

const getProductDetailsProcedure = publicProcedure
  .input(z.object({ productId: z.string() }))
  .query(({ input }) => {
    const { productId } = input;
    
    try {
      // Try to import the featured products, but use mock data if it fails
      let featuredProducts;
      try {
        // Dynamic import to avoid circular dependencies
        featuredProducts = require("@/mocks/products").featuredProducts;
      } catch (error) {
        console.warn("Could not import featuredProducts, using mock data instead");
        featuredProducts = mockProducts;
      }
      
      // Find the product by ID
      const product = featuredProducts.find((p: Product) => p.id === productId);
      
      if (!product) {
        return {
          success: false,
          error: "Product not found",
        };
      }
      
      return {
        success: true,
        product,
      };
    } catch (error) {
      console.error("Error in getProductDetails:", error);
      return {
        success: false,
        error: "Failed to fetch product details",
      };
    }
  });

export default getProductDetailsProcedure;