import React from 'react';
import { 
  View, 
  StyleSheet, 
  ViewStyle, 
  TouchableOpacity, 
  TouchableOpacityProps,
  ColorValue,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '@/constants/colors';
import { layout } from '@/constants/layout';

interface AvatarProps {
  source: string;
  size?: number;
  bordered?: boolean;
  gradient?: boolean;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  source, 
  size = 48, 
  bordered = false,
  gradient = false,
  style 
}) => {
  const avatarSize = { width: size, height: size, borderRadius: size / 2 };
  
  if (gradient) {
    const gradientSize = size + 8;
    return (
      <View style={[styles.container, style]}>
        <LinearGradient
          colors={gradients.primary}
          style={[
            styles.gradient,
            { width: gradientSize, height: gradientSize, borderRadius: gradientSize / 2 }
          ]}
        >
          <Image
            source={{ uri: source }}
            style={avatarSize}
            contentFit="cover"
          />
        </LinearGradient>
      </View>
    );
  }
  
  return (
    <View 
      style={[
        styles.container,
        bordered && styles.bordered,
        avatarSize,
        style
      ]}
    >
      <Image
        source={{ uri: source }}
        style={avatarSize}
        contentFit="cover"
      />
    </View>
  );
};

interface TouchableAvatarProps extends TouchableOpacityProps {
  source: string;
  size?: number;
  bordered?: boolean;
  gradient?: boolean;
  style?: ViewStyle;
}

export const TouchableAvatar: React.FC<TouchableAvatarProps> = ({ 
  source, 
  size = 48, 
  bordered = false,
  gradient = false,
  style,
  ...props 
}) => {
  const avatarSize = { width: size, height: size, borderRadius: size / 2 };
  
  if (gradient) {
    const gradientSize = size + 8;
    return (
      <TouchableOpacity 
        style={[styles.container, style]}
        activeOpacity={0.7}
        {...props}
      >
        <LinearGradient
          colors={gradients.primary}
          style={[
            styles.gradient,
            { width: gradientSize, height: gradientSize, borderRadius: gradientSize / 2 }
          ]}
        >
          <Image
            source={{ uri: source }}
            style={avatarSize}
            contentFit="cover"
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        bordered && styles.bordered,
        avatarSize,
        style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <Image
        source={{ uri: source }}
        style={avatarSize}
        contentFit="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bordered: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});