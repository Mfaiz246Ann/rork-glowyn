import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { Product } from "@/types";

// Mock products data if the import fails
const mockProducts = [
  {
    id: "1",
    name: "Hydrating Serum",
    description: "A lightweight serum that deeply hydrates skin",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1287&auto=format&fit=crop",
    category: "skincare",
    rating: 4.8,
    reviews: 124,
    brand: "GlowSkin",
  },
  {
    id: "2",
    name: "Matte Lipstick",
    description: "Long-lasting matte lipstick in a beautiful pink shade",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1315&auto=format&fit=crop",
    category: "makeup",
    rating: 4.5,
    reviews: 89,
    brand: "ColorPop",
  },
  {
    id: "3",
    name: "Silk Blouse",
    description: "Elegant silk blouse perfect for any occasion",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1551163943-3f7aefc7a33e?q=80&w=1364&auto=format&fit=crop",
    category: "fashion",
    rating: 4.7,
    reviews: 56,
    brand: "ElegantWear",
  },
];

// Input schema for product recommendations
const recommendationsSchema = z.object({
  analysisType: z.enum(['color', 'face', 'skin']).optional(),
  analysisResult: z.string().optional(),
  limit: z.number().min(1).max(20).optional().default(10),
  category: z.enum(['makeup', 'skincare', 'fashion', 'accessories']).optional(),
});

const getRecommendationsProcedure = publicProcedure
  .input(recommendationsSchema)
  .query(({ input }) => {
    const { analysisType, analysisResult, limit, category } = input;
    
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
      
      // Filter by category if provided
      let filteredProducts = [...featuredProducts];
      if (category) {
        filteredProducts = filteredProducts.filter((p: { category: string }) => p.category === category);
      }
      
      // Limit the number of results
      const limitedProducts = filteredProducts.slice(0, limit);
      
      return {
        success: true,
        products: limitedProducts,
        totalCount: filteredProducts.length,
      };
    } catch (error) {
      console.error("Error in getRecommendations:", error);
      return {
        success: false,
        error: "Failed to fetch product recommendations",
        products: [],
        totalCount: 0,
      };
    }
  });

export default getRecommendationsProcedure;