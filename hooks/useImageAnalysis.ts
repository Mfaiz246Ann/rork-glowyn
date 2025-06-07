import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { AnalysisResponse, AnalysisType } from '@/types';

export function useImageAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  
  const analyzeMutation = trpc.analysis.analyze.useMutation({
    onSuccess: (data) => {
      setResult(data);
      setIsLoading(false);
      setError(null);
    },
    onError: (err) => {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze image');
      setIsLoading(false);
    }
  });
  
  const analyzeImage = async (imageBase64: string, analysisType: AnalysisType) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Add a timeout to prevent hanging requests
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), 30000);
      });
      
      // Race the actual request against the timeout
      await Promise.race([
        analyzeMutation.mutateAsync({ imageBase64, analysisType }),
        timeoutPromise
      ]);
      
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze image');
      setIsLoading(false);
    }
  };
  
  const resetAnalysis = () => {
    setResult(null);
    setError(null);
    setIsLoading(false);
  };
  
  return {
    analyzeImage,
    resetAnalysis,
    isLoading,
    error,
    result
  };
}