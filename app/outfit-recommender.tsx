import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, ShoppingBag, Bookmark, CheckCircle2 } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { useUserStore } from '@/store/userStore';

// Types for the outfit recommender
type StylePreference = 'Minimalist' | 'Casual' | 'Edgy' | 'Formal' | 'Bohemian' | 'Sporty';
type BodyType = 'Hourglass' | 'Pear' | 'Apple' | 'Rectangle' | 'Inverted Triangle';
type Occasion = 'Work' | 'Casual' | 'Date Night' | 'Formal Event' | 'Workout';
type Weather = 'Hot' | 'Warm' | 'Cool' | 'Cold' | 'Rainy';

interface OutfitItem {
  type: 'Top' | 'Bottom' | 'Outerwear' | 'Shoes' | 'Accessories';
  name: string;
  color: string;
  imageUrl?: string;
}

interface OutfitRecommendation {
  title: string;
  matchScore: number;
  items: OutfitItem[];
  imageUrl?: string;
}

interface StylingTip {
  title: string;
  description: string;
}

// Mock data for outfit recommendations
const mockOutfits: Record<StylePreference, OutfitRecommendation[]> = {
  Minimalist: [
    {
      title: 'Minimalist Chic',
      matchScore: 95,
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      items: [
        { type: 'Top', name: 'White Silk Blouse', color: 'White' },
        { type: 'Bottom', name: 'Black High-Waisted Trousers', color: 'Black' },
        { type: 'Outerwear', name: 'Beige Oversized Blazer', color: 'Beige' },
        { type: 'Shoes', name: 'Black Leather Loafers', color: 'Black' },
        { type: 'Accessories', name: 'Gold Minimal Necklace', color: 'Gold' },
      ],
    },
    {
      title: 'Casual Minimalist',
      matchScore: 92,
      imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      items: [
        { type: 'Top', name: 'Gray Crew Neck T-shirt', color: 'Gray' },
        { type: 'Bottom', name: 'Dark Blue Straight Leg Jeans', color: 'Dark Blue' },
        { type: 'Outerwear', name: 'Black Leather Jacket', color: 'Black' },
        { type: 'Shoes', name: 'White Sneakers', color: 'White' },
        { type: 'Accessories', name: 'Silver Watch', color: 'Silver' },
      ],
    },
  ],
  Casual: [
    {
      title: 'Everyday Comfort',
      matchScore: 94,
      imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      items: [
        { type: 'Top', name: 'Striped Cotton T-shirt', color: 'Blue/White' },
        { type: 'Bottom', name: 'Light Wash Boyfriend Jeans', color: 'Light Blue' },
        { type: 'Outerwear', name: 'Denim Jacket', color: 'Medium Blue' },
        { type: 'Shoes', name: 'Canvas Sneakers', color: 'White' },
        { type: 'Accessories', name: 'Crossbody Bag', color: 'Tan' },
      ],
    },
    {
      title: 'Weekend Casual',
      matchScore: 90,
      imageUrl: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      items: [
        { type: 'Top', name: 'Graphic Print T-shirt', color: 'White' },
        { type: 'Bottom', name: 'Khaki Chino Shorts', color: 'Khaki' },
        { type: 'Outerwear', name: 'Lightweight Hoodie', color: 'Gray' },
        { type: 'Shoes', name: 'Slip-on Vans', color: 'Black' },
        { type: 'Accessories', name: 'Baseball Cap', color: 'Navy' },
      ],
    },
  ],
  Edgy: [
    {
      title: 'Urban Edge',
      matchScore: 93,
      imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      items: [
        { type: 'Top', name: 'Black Band T-shirt', color: 'Black' },
        { type: 'Bottom', name: 'Ripped Skinny Jeans', color: 'Black' },
        { type: 'Outerwear', name: 'Studded Leather Jacket', color: 'Black' },
        { type: 'Shoes', name: 'Combat Boots', color: 'Black' },
        { type: 'Accessories', name: 'Chunky Chain Necklace', color: 'Silver' },
      ],
    },
    {
      title: 'Grunge Revival',
      matchScore: 88,
      imageUrl: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      items: [
        { type: 'Top', name: 'Oversized Flannel Shirt', color: 'Red/Black' },
        { type: 'Bottom', name: 'Distressed Boyfriend Jeans', color: 'Medium Blue' },
        { type: 'Outerwear', name: 'Vintage Denim Jacket', color: 'Washed Black' },
        { type: 'Shoes', name: 'Platform Boots', color: 'Black' },
        { type: 'Accessories', name: 'Beanie', color: 'Black' },
      ],
    },
  ],
  Formal: [
    {
      title: 'Business Professional',
      matchScore: 96,
      imageUrl: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      items: [
        { type: 'Top', name: 'Tailored Button-Down Shirt', color: 'Light Blue' },
        { type: 'Bottom', name: 'Wool Dress Pants', color: 'Navy' },
        { type: 'Outerwear', name: 'Fitted Blazer', color: 'Navy' },
        { type: 'Shoes', name: 'Leather Oxford Shoes', color: 'Brown' },
        { type: 'Accessories', name: 'Leather Belt', color: 'Brown' },
      ],
    },
    {
      title: 'Evening Elegance',
      matchScore: 91,
      imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      items: [
        { type: 'Top', name: 'Silk Camisole', color: 'Black' },
        { type: 'Bottom', name: 'Midi Pencil Skirt', color: 'Black' },
        { type: 'Outerwear', name: 'Cropped Tuxedo Jacket', color: 'Black' },
        { type: 'Shoes', name: 'Stiletto Heels', color: 'Black' },
        { type: 'Accessories', name: 'Statement Earrings', color: 'Gold' },
      ],
    },
  ],
  Bohemian: [
    {
      title: 'Free Spirit',
      matchScore: 89,
      imageUrl: 'https://images.unsplash.com/photo-1509087859087-a384654eca4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      items: [
        { type: 'Top', name: 'Embroidered Peasant Blouse', color: 'Off-White' },
        { type: 'Bottom', name: 'Flowy Maxi Skirt', color: 'Rust' },
        { type: 'Outerwear', name: 'Fringed Suede Vest', color: 'Tan' },
        { type: 'Shoes', name: 'Leather Sandals', color: 'Brown' },
        { type: 'Accessories', name: 'Layered Necklaces', color: 'Mixed Metals' },
      ],
    },
    {
      title: 'Boho Casual',
      matchScore: 87,
      imageUrl: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      items: [
        { type: 'Top', name: 'Tie-Dye T-shirt', color: 'Multi' },
        { type: 'Bottom', name: 'Distressed Wide-Leg Jeans', color: 'Light Blue' },
        { type: 'Outerwear', name: 'Crochet Cardigan', color: 'Cream' },
        { type: 'Shoes', name: 'Ankle Boots', color: 'Brown' },
        { type: 'Accessories', name: 'Woven Bucket Bag', color: 'Natural' },
      ],
    },
  ],
  Sporty: [
    {
      title: 'Athleisure',
      matchScore: 92,
      imageUrl: 'https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      items: [
        { type: 'Top', name: 'Performance Tank Top', color: 'Black' },
        { type: 'Bottom', name: 'High-Waisted Leggings', color: 'Black' },
        { type: 'Outerwear', name: 'Zip-Up Track Jacket', color: 'Gray' },
        { type: 'Shoes', name: 'Running Sneakers', color: 'White/Neon' },
        { type: 'Accessories', name: 'Sports Watch', color: 'Black' },
      ],
    },
    {
      title: 'Sport Casual',
      matchScore: 85,
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      items: [
        { type: 'Top', name: 'Oversized Sweatshirt', color: 'Heather Gray' },
        { type: 'Bottom', name: 'Jogger Pants', color: 'Navy' },
        { type: 'Outerwear', name: 'Windbreaker', color: 'Red' },
        { type: 'Shoes', name: 'Retro Sneakers', color: 'White/Blue' },
        { type: 'Accessories', name: 'Baseball Cap', color: 'Black' },
      ],
    },
  ],
};

// Styling tips based on body type
const stylingTips: Record<BodyType, StylingTip[]> = {
  Hourglass: [
    { title: 'Highlight your waist', description: 'Choose fitted or belted styles that showcase your defined waistline.' },
    { title: 'Balance proportions', description: 'Wear clothing that maintains the balance between your upper and lower body.' },
    { title: 'Avoid boxy shapes', description: 'Steer clear of shapeless garments that hide your natural curves.' },
  ],
  Pear: [
    { title: 'Draw attention upward', description: 'Choose tops with interesting details, patterns, or bright colors.' },
    { title: 'A-line silhouettes', description: 'Opt for A-line skirts and dresses that skim over the hips.' },
    { title: 'Dark bottoms', description: 'Wear darker colors on the bottom half to create a slimming effect.' },
  ],
  Apple: [
    { title: 'Elongate your torso', description: 'Choose tops that create vertical lines to lengthen your upper body.' },
    { title: 'Show off your legs', description: 'Highlight your legs with shorter skirts or fitted pants.' },
    { title: 'Empire waistlines', description: 'Opt for empire waist dresses and tops that flow from just below the bust.' },
  ],
  Rectangle: [
    { title: 'Create curves', description: 'Use peplum tops, wrap dresses, and belted styles to create the illusion of curves.' },
    { title: 'Add volume', description: 'Choose pieces that add volume to your bust and hips to create an hourglass effect.' },
    { title: 'Layer strategically', description: 'Use layering to add dimension and create the appearance of curves.' },
  ],
  'Inverted Triangle': [
    { title: 'Balance your shoulders', description: 'Choose bottoms with volume or details to balance wider shoulders.' },
    { title: 'V-necks are your friend', description: 'Wear V-neck tops to elongate your upper body and draw the eye downward.' },
    { title: 'Avoid shoulder emphasis', description: 'Steer clear of shoulder pads, puffed sleeves, or boat necks.' },
  ],
};

export default function OutfitRecommenderScreen() {
  const router = useRouter();
  const { addAnalysisResult } = useUserStore();
  
  // Form state
  const [stylePreference, setStylePreference] = useState<StylePreference | ''>('');
  const [bodyType, setBodyType] = useState<BodyType | ''>('');
  const [occasion, setOccasion] = useState<Occasion | ''>('');
  const [weather, setWeather] = useState<Weather | ''>('');
  
  // Results state
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<OutfitRecommendation[]>([]);
  const [tips, setTips] = useState<StylingTip[]>([]);
  
  const handleSubmit = () => {
    if (!stylePreference) {
      alert('Please select a style preference');
      return;
    }
    
    // Get recommendations based on style preference
    const outfits = mockOutfits[stylePreference];
    setRecommendations(outfits);
    
    // Get styling tips based on body type
    if (bodyType) {
      setTips(stylingTips[bodyType]);
    }
    
    // Save the analysis result
    addAnalysisResult({
      id: `outfit_${Date.now()}`,
      type: 'outfit',
      title: `${stylePreference} Style`,
      date: new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      result: `${stylePreference} Style for ${bodyType || 'All'} Body Type`,
      details: {
        stylePreference,
        bodyType,
        occasion,
        weather,
        recommendations: outfits,
        tips: bodyType ? stylingTips[bodyType] : [],
      },
    });
    
    setShowResults(true);
  };
  
  const resetForm = () => {
    setStylePreference('');
    setBodyType('');
    setOccasion('');
    setWeather('');
    setShowResults(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          title: 'Smart Outfit Recommender',
          headerTitleStyle: {
            fontFamily: typography.fontFamily.semiBold,
          },
        }}
      />

      <ScrollView style={styles.scrollView}>
        {!showResults ? (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Personalisasi Rekomendasi Pakaian Anda</Text>
            <Text style={styles.formDescription}>
              Berikan informasi tentang preferensi gaya, bentuk tubuh, dan kesempatan untuk mendapatkan rekomendasi pakaian yang dipersonalisasi.
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Preferensi Gaya</Text>
              <Pressable 
                style={styles.dropdown}
                onPress={() => {
                  // In a real app, this would open a dropdown
                  // For this demo, we'll just cycle through options
                  const options: StylePreference[] = ['Minimalist', 'Casual', 'Edgy', 'Formal', 'Bohemian', 'Sporty'];
                  const currentIndex = options.indexOf(stylePreference as StylePreference);
                  const nextIndex = currentIndex === -1 || currentIndex === options.length - 1 ? 0 : currentIndex + 1;
                  setStylePreference(options[nextIndex]);
                }}
              >
                <Text style={styles.dropdownText}>
                  {stylePreference || 'Pilih preferensi gaya'}
                </Text>
                <ChevronDown size={20} color={colors.text} />
              </Pressable>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tipe Tubuh</Text>
              <Pressable 
                style={styles.dropdown}
                onPress={() => {
                  // In a real app, this would open a dropdown
                  const options: BodyType[] = ['Hourglass', 'Pear', 'Apple', 'Rectangle', 'Inverted Triangle'];
                  const currentIndex = options.indexOf(bodyType as BodyType);
                  const nextIndex = currentIndex === -1 || currentIndex === options.length - 1 ? 0 : currentIndex + 1;
                  setBodyType(options[nextIndex]);
                }}
              >
                <Text style={styles.dropdownText}>
                  {bodyType || 'Pilih tipe tubuh'}
                </Text>
                <ChevronDown size={20} color={colors.text} />
              </Pressable>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Kesempatan</Text>
              <Pressable 
                style={styles.dropdown}
                onPress={() => {
                  // In a real app, this would open a dropdown
                  const options: Occasion[] = ['Work', 'Casual', 'Date Night', 'Formal Event', 'Workout'];
                  const currentIndex = options.indexOf(occasion as Occasion);
                  const nextIndex = currentIndex === -1 || currentIndex === options.length - 1 ? 0 : currentIndex + 1;
                  setOccasion(options[nextIndex]);
                }}
              >
                <Text style={styles.dropdownText}>
                  {occasion || 'Pilih kesempatan'}
                </Text>
                <ChevronDown size={20} color={colors.text} />
              </Pressable>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Cuaca (opsional)</Text>
              <Pressable 
                style={styles.dropdown}
                onPress={() => {
                  // In a real app, this would open a dropdown
                  const options: Weather[] = ['Hot', 'Warm', 'Cool', 'Cold', 'Rainy'];
                  const currentIndex = options.indexOf(weather as Weather);
                  const nextIndex = currentIndex === -1 || currentIndex === options.length - 1 ? 0 : currentIndex + 1;
                  setWeather(options[nextIndex]);
                }}
              >
                <Text style={styles.dropdownText}>
                  {weather || 'Pilih cuaca'}
                </Text>
                <ChevronDown size={20} color={colors.text} />
              </Pressable>
            </View>
            
            <Button
              title="Dapatkan Rekomendasi"
              onPress={handleSubmit}
              style={styles.submitButton}
            />
          </View>
        ) : (
          <View style={styles.resultsContainer}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>
                Dibuat khusus untuk gaya {stylePreference.toLowerCase()} Anda
                {bodyType ? ` dan tipe tubuh ${bodyType.toLowerCase()}` : ''}
              </Text>
              
              {recommendations.length > 0 && (
                <View style={styles.matchScoreContainer}>
                  <Text style={styles.matchScoreLabel}>Match Score:</Text>
                  <Text style={styles.matchScoreValue}>{recommendations[0].matchScore}%</Text>
                </View>
              )}
            </View>
            
            {recommendations.map((outfit, index) => (
              <View key={index} style={styles.outfitCard}>
                {outfit.imageUrl && (
                  <Image 
                    source={{ uri: outfit.imageUrl }} 
                    style={styles.outfitImage}
                  />
                )}
                
                <View style={styles.outfitDetails}>
                  <Text style={styles.outfitTitle}>{outfit.title}</Text>
                  
                  {outfit.items.map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.outfitItem}>
                      <Text style={styles.outfitItemType}>{item.type}:</Text>
                      <Text style={styles.outfitItemName}>{item.name}</Text>
                    </View>
                  ))}
                  
                  <View style={styles.outfitActions}>
                    <Button
                      title="Save"
                      icon={<Bookmark size={16} color={colors.primary} />}
                      variant="outline"
                      size="small"
                      style={styles.outfitActionButton}
                    />
                    <Button
                      title="Shop"
                      icon={<ShoppingBag size={16} color={colors.surface} />}
                      size="small"
                      style={styles.outfitActionButton}
                      onPress={() => router.push('/shop')}
                    />
                  </View>
                </View>
              </View>
            ))}
            
            {recommendations.length > 1 && (
              <View style={styles.moreOptionsSection}>
                <Text style={styles.sectionTitle}>More Great Options</Text>
                
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.moreOptionsScroll}
                >
                  {recommendations.slice(1).map((outfit, index) => (
                    <View key={index} style={styles.moreOptionCard}>
                      {outfit.imageUrl && (
                        <Image 
                          source={{ uri: outfit.imageUrl }} 
                          style={styles.moreOptionImage}
                        />
                      )}
                      <View style={styles.moreOptionDetails}>
                        <Text style={styles.moreOptionTitle}>{outfit.title}</Text>
                        <Text style={styles.moreOptionScore}>{outfit.matchScore}% Match</Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
            
            {tips.length > 0 && (
              <View style={styles.tipsSection}>
                <Text style={styles.sectionTitle}>Styling Tips for You</Text>
                
                {tips.map((tip, index) => (
                  <View key={index} style={styles.tipCard}>
                    <View style={styles.tipIconContainer}>
                      <CheckCircle2 size={20} color={colors.primary} />
                    </View>
                    <View style={styles.tipContent}>
                      <Text style={styles.tipTitle}>{tip.title}</Text>
                      <Text style={styles.tipDescription}>{tip.description}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
            
            <Button
              title="Create New Outfit"
              variant="secondary"
              onPress={resetForm}
              style={styles.newOutfitButton}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: layout.spacing.lg,
  },
  formTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  formDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: layout.spacing.xl,
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: layout.spacing.lg,
  },
  inputLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    padding: layout.spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dropdownText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  submitButton: {
    marginTop: layout.spacing.md,
  },
  resultsContainer: {
    padding: layout.spacing.lg,
  },
  resultHeader: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.lg,
    marginBottom: layout.spacing.lg,
  },
  resultTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  matchScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchScoreLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginRight: layout.spacing.xs,
  },
  matchScoreValue: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
    color: colors.primary,
  },
  outfitCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: layout.spacing.lg,
  },
  outfitImage: {
    width: '100%',
    height: 200,
  },
  outfitDetails: {
    padding: layout.spacing.lg,
  },
  outfitTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  outfitItem: {
    flexDirection: 'row',
    marginBottom: layout.spacing.sm,
  },
  outfitItemType: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
    width: 100,
  },
  outfitItemName: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text,
    flex: 1,
  },
  outfitActions: {
    flexDirection: 'row',
    marginTop: layout.spacing.md,
    gap: layout.spacing.md,
  },
  outfitActionButton: {
    flex: 1,
  },
  moreOptionsSection: {
    marginBottom: layout.spacing.xl,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  moreOptionsScroll: {
    marginBottom: layout.spacing.md,
  },
  moreOptionCard: {
    width: 200,
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    overflow: 'hidden',
    marginRight: layout.spacing.md,
  },
  moreOptionImage: {
    width: '100%',
    height: 150,
  },
  moreOptionDetails: {
    padding: layout.spacing.md,
  },
  moreOptionTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  moreOptionScore: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.primary,
  },
  tipsSection: {
    marginBottom: layout.spacing.xl,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    padding: layout.spacing.md,
    marginBottom: layout.spacing.md,
  },
  tipIconContainer: {
    marginRight: layout.spacing.md,
    paddingTop: 2,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  tipDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  newOutfitButton: {
    marginBottom: layout.spacing.xl,
  },
});