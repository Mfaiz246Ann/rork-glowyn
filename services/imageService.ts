import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import { trpcClient } from '@/lib/trpc';

// Convert image URI to base64
export const imageToBase64 = async (uri: string): Promise<string> => {
  try {
    if (Platform.OS === 'web') {
      // For web, we need to use fetch and convert to base64
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to convert image to base64'));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } else {
      // For native platforms, use FileSystem
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64}`;
    }
  } catch (error) {
    console.error("Error converting image to base64:", error);
    // Fallback to mock base64 for demo purposes
    return "data:image/jpeg;base64,mockBase64String";
  }
};

// Request camera permissions
export const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'web') {
    return true; // Web handles permissions differently
  }
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status === 'granted';
};

// Request media library permissions
export const requestMediaLibraryPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'web') {
    return true; // Web handles permissions differently
  }
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
      base64: true,
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
      base64: true,
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