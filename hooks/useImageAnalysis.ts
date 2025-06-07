import { useState } from 'react';
import { analyzeImage } from '@/services/analysisService';
import { AnalysisResponse, AnalysisType } from '@/types';

export const useImageAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeImageWithType = async (imageBase64: string, analysisType: AnalysisType) => {
    try {
      setIsAnalyzing(true);
      setError(null);
      setAnalysisResult(null);

      const result = await analyzeImage(imageBase64, analysisType);
      
      // Set the result directly - it's already of type AnalysisResponse
      setAnalysisResult(result);
      
      if (!result.success) {
        setError(result.error);
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      
      // Create a proper error response
      const errorResponse: AnalysisResponse = {
        success: false,
        error: errorMessage
      };
      
      setAnalysisResult(errorResponse);
      return errorResponse;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analyzeImage: analyzeImageWithType,
    isAnalyzing,
    analysisResult,
    error,
    resetAnalysis: () => {
      setAnalysisResult(null);
      setError(null);
    },
  };
};