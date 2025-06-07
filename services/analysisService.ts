import { AnalysisResponse, AnalysisType } from '@/types';

// Base URL for API requests
const API_BASE_URL = 'https://toolkit.rork.com';

/**
 * Analyzes an image for a specific analysis type
 * @param imageBase64 Base64 encoded image
 * @param analysisType Type of analysis to perform
 * @returns Analysis result
 */
export const analyzeImage = async (
  imageBase64: string,
  analysisType: AnalysisType
): Promise<AnalysisResponse> => {
  try {
    // Use trpc client for analysis
    const response = await fetch(`${API_BASE_URL}/api/trpc/analysis.analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        json: {
          imageBase64,
          analysisType,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Analysis failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the actual response from the tRPC wrapper
    const result = data.result?.data;
    
    if (!result) {
      return {
        success: false,
        error: 'Invalid response format',
      };
    }
    
    return result as AnalysisResponse;
  } catch (error) {
    console.error('Error in analyzeImage:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};