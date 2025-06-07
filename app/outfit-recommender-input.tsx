import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { StylePreference, BodyType, Occasion, Weather } from '@/types';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react-native';

export default function OutfitRecommenderInput() {
  const router = useRouter();
  const [stylePreference, setStylePreference] = useState<StylePreference | null>(null);
  const [bodyType, setBodyType] = useState<BodyType | null>(null);
  const [occasion, setOccasion] = useState<Occasion | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleSubmit = () => {
    if (!stylePreference) {
      alert('Please select a style preference');
      return;
    }
    
    // Navigate to results page with parameters
    router.push({
      pathname: '/outfit-recommender-result',
      params: {
        stylePreference,
        bodyType: bodyType || undefined,
        occasion: occasion || undefined,
        weather: weather || undefined,
      }
    });
  };

  const renderDropdown = <T extends string>(
    title: string, 
    options: T[], 
    value: T | null, 
    setValue: (value: T) => void,
    isRequired: boolean = true
  ) => {
    const isOpen = openDropdown === title;
    
    return (
      <View style={styles.dropdownContainer}>
        <TouchableOpacity 
          style={styles.dropdownHeader} 
          onPress={() => toggleDropdown(title)}
        >
          <View>
            <Text style={styles.dropdownTitle}>
              {title} {!isRequired && <Text style={styles.optionalText}>(optional)</Text>}
            </Text>
            {value ? (
              <Text style={styles.selectedValue}>{value}</Text>
            ) : (
              <Text style={styles.placeholderText}>Select {title.toLowerCase()}</Text>
            )}
          </View>
          {isOpen ? (
            <ChevronUp size={24} color={colors.text} />
          ) : (
            <ChevronDown size={24} color={colors.text} />
          )}
        </TouchableOpacity>
        
        {isOpen && (
          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionItem,
                  value === option && styles.selectedOption
                ]}
                onPress={() => {
                  setValue(option);
                  toggleDropdown(title);
                }}
              >
                <Text 
                  style={[
                    styles.optionText,
                    value === option && styles.selectedOptionText
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Smart Outfit Recommender',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Customize Your Outfit Recommendations</Text>
          <Text style={styles.subtitle}>
            Tell us about your preferences and we'll create personalized outfit recommendations just for you.
          </Text>
        </View>

        <View style={styles.formContainer}>
          {renderDropdown<StylePreference>(
            'Style Preference', 
            ['Minimalist', 'Casual', 'Edgy', 'Formal', 'Bohemian', 'Sporty'], 
            stylePreference, 
            setStylePreference
          )}
          
          {renderDropdown<BodyType>(
            'Body Type', 
            ['Hourglass', 'Pear', 'Apple', 'Rectangle', 'Inverted Triangle'], 
            bodyType, 
            setBodyType
          )}
          
          {renderDropdown<Occasion>(
            'Occasion', 
            ['Work', 'Casual', 'Date Night', 'Formal Event', 'Workout'], 
            occasion, 
            setOccasion
          )}
          
          {renderDropdown<Weather>(
            'Weather', 
            ['Hot', 'Warm', 'Cool', 'Cold', 'Rainy'], 
            weather, 
            setWeather,
            false
          )}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[
              styles.actionButton,
              (!stylePreference) && styles.disabledButton
            ]} 
            onPress={handleSubmit}
            disabled={!stylePreference}
          >
            <Text style={styles.actionButtonText}>Get Recommendations</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: layout.spacing.lg,
    backgroundColor: colors.surface,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textAlt,
    lineHeight: 22,
  },
  formContainer: {
    padding: layout.spacing.lg,
    gap: layout.spacing.lg,
  },
  dropdownContainer: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: layout.spacing.md,
  },
  dropdownTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: 4,
  },
  optionalText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textAlt,
  },
  selectedValue: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.primary,
  },
  placeholderText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textAlt,
  },
  optionsContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  optionItem: {
    padding: layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedOption: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  optionText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  selectedOptionText: {
    fontFamily: typography.fontFamily.medium,
    color: colors.primary,
  },
  actionButtons: {
    padding: layout.spacing.lg,
    gap: layout.spacing.md,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: layout.borderRadius.md,
    paddingVertical: layout.spacing.md,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors.textAlt,
    opacity: 0.7,
  },
  actionButtonText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.surface,
  },
});