import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

// Function to take a photo using the camera
export const takePhoto = async (): Promise<string | null> => {
  try {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      console.error('Camera permission not granted');
      return null;
    }
    
    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    
    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }
    
    return result.assets[0].uri;
  } catch (error) {
    console.error('Error taking photo:', error);
    return null;
  }
};

// Function to pick an image from the gallery
export const pickImage = async (): Promise<string | null> => {
  try {
    // Request media library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      console.error('Media library permission not granted');
      return null;
    }
    
    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    
    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }
    
    return result.assets[0].uri;
  } catch (error) {
    console.error('Error picking image:', error);
    return null;
  }
};

// Function to convert image to base64
export const imageToBase64 = async (uri: string): Promise<string> => {
  try {
    // For web platform, handle differently
    if (Platform.OS === 'web') {
      return await fetchImageAsBase64(uri);
    }
    
    // For native platforms, use FileSystem
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    return base64;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
};

// Helper function for web platform
const fetchImageAsBase64 = async (uri: string): Promise<string> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        } else {
          reject(new Error('Failed to convert to base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error fetching image as base64:', error);
    throw error;
  }
};

// Function to analyze image (placeholder for actual analysis)
export const analyzeImage = async (uri: string, type: string): Promise<string> => {
  // This function would normally send the image to a server for analysis
  // For now, we'll just return the base64 string
  return await imageToBase64(uri);
};