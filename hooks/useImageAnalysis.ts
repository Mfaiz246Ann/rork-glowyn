import { useState } from 'react';
import { AnalysisResult, AnalysisType } from '@/types';
import { takePhoto, pickImage, analyzeImage } from '@/services/imageService';
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
      
      // Use the local mock service for now
      // In a real app, we would use the backend API
      // const analysisResult = await analyzeImage(uri, analysisType);
      
      // For demo purposes, use the local mock service
      const analysisResult = await trpcClient.analysis.analyze.mutate({
        imageBase64: "mockBase64String",
        analysisType,
      });
      
      if (!analysisResult.success || !analysisResult.result) {
        throw new Error("Analysis failed");
      }
      
      setResult(analysisResult.result);
      addAnalysisResult(analysisResult.result);
      
      // Save the result to the user's profile
      await trpcClient.users.saveAnalysisResult.mutate({
        result: analysisResult.result,
      });
      
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
      console.error(err);
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