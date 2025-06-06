import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { trpcClient } from '@/lib/trpc';

// Convert image URI to base64
export const imageToBase64 = async (uri: string): Promise<string> => {
  try {
    // In a real app, you would use FileSystem to read the file and convert to base64
    // For this demo, we'll just return a mock base64 string
    return "data:image/jpeg;base64,mockBase64String";
  } catch (error) {
    console.error("Error converting image to base64:", error);
    throw error;
  }
};

// Request camera permissions
export const requestCameraPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status === 'granted';
};

// Request media library permissions
export const requestMediaLibraryPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status === 'granted';
};

// Take a photo using the camera
export const takePhoto = async (): Promise<string | null> => {
  try {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      throw new Error("Camera permission not granted");
    }
    
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    
    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }
    
    return result.assets[0].uri;
  } catch (error) {
    console.error("Error taking photo:", error);
    throw error;
  }
};

// Pick an image from the media library
export const pickImage = async (): Promise<string | null> => {
  try {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) {
      throw new Error("Media library permission not granted");
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    
    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }
    
    return result.assets[0].uri;
  } catch (error) {
    console.error("Error picking image:", error);
    throw error;
  }
};

// Analyze image using the backend API
export const analyzeImage = async (
  imageUri: string, 
  analysisType: 'color' | 'face' | 'skin' | 'outfit'
) => {
  try {
    // Convert image to base64
    const imageBase64 = await imageToBase64(imageUri);
    
    // Call the backend API
    const response = await trpcClient.analysis.analyze.mutate({
      imageBase64,
      analysisType,
    });
    
    if (!response.success) {
      throw new Error(response.error || "Analysis failed");
    }
    
    return response.result;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};