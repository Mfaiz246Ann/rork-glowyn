import { trpcClient } from '@/lib/trpc';
import { AnalysisResponse, AnalysisType } from '@/types';

/**
 * Service for handling image analysis operations
 */
export const analysisService = {
  /**
   * Analyze an image with the specified analysis type
   * @param imageBase64 - Base64 encoded image data
   * @param analysisType - Type of analysis to perform
   * @returns Analysis response with results
   */
  async analyzeImage(imageBase64: string, analysisType: AnalysisType): Promise<AnalysisResponse> {
    try {
      // Create an AbortController for timeout handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      // Make the request with the tRPC client
      const result = await trpcClient.analysis.analyze.mutate({ 
        imageBase64, 
        analysisType 
      });
      
      // Clear the timeout
      clearTimeout(timeoutId);
      
      return result;
    } catch (error: any) {
      console.error('Analysis service error:', error);
      
      // Handle specific error types
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: 'Request timed out. Please try again.'
        };
      } else if (error.message === 'Failed to fetch') {
        return {
          success: false,
          error: 'Network connection error. Please check your internet connection.'
        };
      }
      
      // Return a standardized error response
      return {
        success: false,
        error: error.message || 'Failed to analyze image'
      };
    }
  },
  
  /**
   * Get mock analysis result for testing
   * @param analysisType - Type of analysis to mock
   * @returns Mocked analysis response
   */
  getMockAnalysisResult(analysisType: AnalysisType): AnalysisResponse {
    return {
      success: true,
      result: {
        id: `mock_${Date.now()}`,
        type: analysisType,
        title: `Mock ${analysisType} analysis`,
        result: `Mock ${analysisType} result`,
        date: new Date().toLocaleDateString(),
        details: { mockData: true }
      }
    };
  }
};