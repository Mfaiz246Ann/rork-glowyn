import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { Product } from "@/types";
import { featuredProducts } from "@/mocks/products";

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
    
    // In a real app, this would filter products based on the analysis results
    // For this demo, we'll just return some products from our mock data
    
    let filteredProducts = [...featuredProducts];
    
    // Filter by category if provided
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    // Limit the number of results
    const limitedProducts = filteredProducts.slice(0, limit);
    
    return {
      success: true,
      products: limitedProducts,
      totalCount: filteredProducts.length,
    };
  });

export default getRecommendationsProcedure;