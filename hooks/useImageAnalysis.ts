import { useState } from 'react';
import { AnalysisResult, AnalysisType, AnalysisResponse } from '@/types';
import { takePhoto, pickImage, imageToBase64 } from '@/services/imageService';
import { useUserStore } from '@/store/userStore';
import { trpcClient } from '@/lib/trpc';

export const useImageAnalysis = (analysisType: AnalysisType) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addAnalysisResult } = useUserStore();

  const captureImage = async () => {
    try {
      setError(null);
      const uri = await takePhoto();
      if (uri) {
        setImageUri(uri);
        await analyzeImageWithType(uri);
      }
    } catch (err) {
      setError("Failed to capture image. Please try again.");
      console.error(err);
    }
  };

  const selectImage = async () => {
    try {
      setError(null);
      const uri = await pickImage();
      if (uri) {
        setImageUri(uri);
        await analyzeImageWithType(uri);
      }
    } catch (err) {
      setError("Failed to select image. Please try again.");
      console.error(err);
    }
  };

  const analyzeImageWithType = async (uri: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Convert image to base64
      const base64Image = await imageToBase64(uri);
      
      // Use the backend API for analysis
      const response = await trpcClient.analysis.analyze.mutate({
        imageBase64: base64Image,
        analysisType,
      });
      
      if (!response.success || !response.result) {
        throw new Error("Analysis failed");
      }
      
      // Get the result from the response
      const analysisResult = response.result;
      
      setResult(analysisResult);
      addAnalysisResult(analysisResult);
      
      // Save the result to the user's profile
      await trpcClient.users.saveAnalysisResult.mutate({
        result: analysisResult,
      });
      
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
      console.error(err);
      
      // Create a fallback mock result for development
      const mockResult: AnalysisResult = {
        id: `mock_${Date.now()}`,
        type: analysisType,
        title: `Mock ${analysisType} analysis`,
        result: `Mock ${analysisType} result`,
        date: new Date().toLocaleDateString(),
        details: { mockData: true }
      };
      
      setResult(mockResult);
      addAnalysisResult(mockResult);
      
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setImageUri(null);
    setResult(null);
    setError(null);
  };

  return {
    imageUri,
    result,
    isLoading,
    error,
    captureImage,
    selectImage,
    analyzeImageWithType,
    reset,
  };
};