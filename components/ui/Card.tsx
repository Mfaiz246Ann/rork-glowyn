import React from 'react';
import { 
  View, 
  StyleSheet, 
  ViewStyle, 
  TouchableOpacity, 
  TouchableOpacityProps 
} from 'react-native';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: number;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  style, 
  elevation = 1 
}) => {
  return (
    <View 
      style={[
        styles.card, 
        { 
          shadowOpacity: 0.1 * elevation,
          elevation: elevation,
        },
        style
      ]}
    >
      {children}
    </View>
  );
};

interface TouchableCardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: number;
}

export const TouchableCard: React.FC<TouchableCardProps> = ({ 
  children, 
  style, 
  elevation = 1,
  ...props 
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { 
          shadowOpacity: 0.1 * elevation,
          elevation: elevation,
        },
        style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    padding: layout.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
});