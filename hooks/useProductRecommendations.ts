import { useState, useEffect } from 'react';
import { Product, AnalysisResult } from '@/types';
import { trpcClient } from '@/lib/trpc';

export const useProductRecommendations = (
  analysisResult: AnalysisResult | null,
  category?: 'makeup' | 'skincare' | 'fashion' | 'accessories',
  limit: number = 10
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!analysisResult) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await trpcClient.products.getRecommendations.query({
          analysisType: analysisResult.type,
          analysisResult: analysisResult.result,
          limit,
          category,
        });
        
        if (!response.success) {
          throw new Error("Failed to fetch recommendations");
        }
        
        setProducts(response.products);
      } catch (err) {
        setError("Failed to fetch product recommendations");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [analysisResult, category, limit]);

  return {
    products,
    isLoading,
    error,
  };
};