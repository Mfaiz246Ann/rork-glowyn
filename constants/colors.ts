import { ColorValue } from 'react-native';

export const colors = {
  primary: '#F48FB1', // Soft pink
  primaryLight: '#FFC1E3',
  primaryDark: '#BF5F82',
  secondary: '#E1BEE7', // Soft lavender
  secondaryLight: '#FFF1FF',
  secondaryDark: '#AF8EB5',
  background: '#FFF9F9',
  backgroundAlt: '#F5F5F5', // For alternate background
  surface: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  textLight: '#9E9E9E',
  textAlt: '#757575', // For alternate text
  border: '#E0E0E0',
  error: '#B00020',
  success: '#4CAF50',
  warning: '#FFC107',
  info: '#2196F3',
};

// Fix gradient types to match what LinearGradient expects
export const gradients = {
  primary: ['#F48FB1', '#FFC1E3'] as readonly [ColorValue, ColorValue],
  secondary: ['#E1BEE7', '#FFF1FF'] as readonly [ColorValue, ColorValue],
  accent: ['#F48FB1', '#E1BEE7'] as readonly [ColorValue, ColorValue],
};