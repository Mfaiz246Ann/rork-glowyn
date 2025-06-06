import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Camera, Upload, Info } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { ImageCapture } from '@/components/ImageCapture';

const MAKEUP_ITEMS = [
  { id: 'lipstik1', name: 'Coral Bliss', color: '#FF7F50', type: 'lipstik' },
  { id: 'lipstik2', name: 'Rose Petal', color: '#E8909B', type: 'lipstik' },
  { id: 'lipstik3', name: 'Berry Wine', color: '#8E354A', type: 'lipstik' },
  { id: 'blush1', name: 'Peach Glow', color: '#FFDAB9', type: 'blush' },
  { id: 'blush2', name: 'Rosy Cheeks', color: '#F08080', type: 'blush' },
  { id: 'eyeshadow1', name: 'Golden Bronze', color: '#CD853F', type: 'eyeshadow' },
  { id: 'eyeshadow2', name: 'Smoky Plum', color: '#5D3954', type: 'eyeshadow' },
];

export default function VirtualTryOnScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('lipstik');
  const [selectedItem, setSelectedItem] = useState(MAKEUP_ITEMS[0]);
  const [showCamera, setShowCamera] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  
  const filteredItems = MAKEUP_ITEMS.filter(item => item.type === selectedType);

  const handleStartCapture = () => {
    setShowCamera(true);
  };
  
  const handleImageCaptured = (uri: string) => {
    setShowCamera(false);
    setImageUri(uri);
  };
  
  const handleCancelCapture = () => {
    setShowCamera(false);
  };

  if (showCamera) {
    return (
      <ImageCapture 
        onImageCaptured={handleImageCaptured}
        onCancel={handleCancelCapture}
        instructionText="Posisikan wajah dalam frame untuk virtual try-on"
        guideType="face"
      />
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Virtual Try-On</Text>
      
      <Card style={styles.infoCard}>
        <View style={styles.infoIconContainer}>
          <Info size={24} color={colors.primary} />
        </View>
        <Text style={styles.infoTitle}>Coba Sebelum Membeli</Text>
        <Text style={styles.infoDescription}>
          Coba makeup dan aksesori secara virtual untuk melihat bagaimana tampilannya padamu sebelum membeli.
        </Text>
      </Card>
      
      <View style={styles.cameraContainer}>
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.cameraImage}
              contentFit="cover"
            />
          ) : (
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' }}
              style={styles.cameraImage}
              contentFit="cover"
            />
          )}
          {selectedType === 'lipstik' && (
            <View style={[styles.lipstickOverlay, { backgroundColor: selectedItem.color }]} />
          )}
          {selectedType === 'blush' && (
            <View style={[styles.blushOverlay, { backgroundColor: selectedItem.color }]} />
          )}
          {selectedType === 'eyeshadow' && (
            <View style={[styles.eyeshadowOverlay, { backgroundColor: selectedItem.color }]} />
          )}
        </View>
        
        <View style={styles.cameraControls}>
          <Button
            title="Ambil Foto"
            variant="primary"
            size="medium"
            icon={<Camera size={18} color={colors.surface} />}
            style={styles.cameraButton}
            onPress={handleStartCapture}
          />
          
          <Button
            title="Upload Foto"
            variant="outline"
            size="medium"
            icon={<Upload size={18} color={colors.primary} />}
            style={styles.cameraButton}
            onPress={handleStartCapture}
          />
        </View>
      </View>
      
      <View style={styles.typesContainer}>
        <Pressable 
          style={[
            styles.typeButton,
            selectedType === 'lipstik' && styles.selectedTypeButton
          ]}
          onPress={() => setSelectedType('lipstik')}
        >
          <Text 
            style={[
              styles.typeText,
              selectedType === 'lipstik' && styles.selectedTypeText
            ]}
          >
            Lipstik
          </Text>
        </Pressable>
        
        <Pressable 
          style={[
            styles.typeButton,
            selectedType === 'blush' && styles.selectedTypeButton
          ]}
          onPress={() => setSelectedType('blush')}
        >
          <Text 
            style={[
              styles.typeText,
              selectedType === 'blush' && styles.selectedTypeText
            ]}
          >
            Blush
          </Text>
        </Pressable>
        
        <Pressable 
          style={[
            styles.typeButton,
            selectedType === 'eyeshadow' && styles.selectedTypeButton
          ]}
          onPress={() => setSelectedType('eyeshadow')}
        >
          <Text 
            style={[
              styles.typeText,
              selectedType === 'eyeshadow' && styles.selectedTypeText
            ]}
          >
            Eyeshadow
          </Text>
        </Pressable>
      </View>
      
      <View style={styles.itemsContainer}>
        <Text style={styles.itemsTitle}>Pilih Warna</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.itemsList}
        >
          {filteredItems.map((item) => (
            <Pressable 
              key={item.id}
              style={[
                styles.itemButton,
                selectedItem.id === item.id && styles.selectedItemButton
              ]}
              onPress={() => setSelectedItem(item)}
            >
              <View 
                style={[
                  styles.colorSwatch,
                  { backgroundColor: item.color }
                ]}
              />
              <Text style={styles.itemName}>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.actionsContainer}>
        <Button
          title="Belanja Tampilan Ini"
          variant="primary"
          size="large"
          style={styles.actionButton}
          onPress={() => router.push('/shop')}
        />
        
        <Button
          title="Simpan ke Tampilanku"
          variant="outline"
          size="large"
          style={styles.actionButton}
          onPress={() => router.push('/profile')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: layout.spacing.lg,
    paddingBottom: layout.spacing.xxl,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxxl,
    color: colors.text,
    marginBottom: layout.spacing.lg,
  },
  infoCard: {
    marginBottom: layout.spacing.xl,
  },
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: layout.borderRadius.round,
    backgroundColor: colors.secondaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: layout.spacing.md,
  },
  infoTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginBottom: layout.spacing.sm,
  },
  infoDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.md,
  },
  cameraContainer: {
    marginBottom: layout.spacing.xl,
  },
  imageContainer: {
    width: '100%',
    height: 400,
    borderRadius: layout.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: layout.spacing.md,
    backgroundColor: colors.border,
    position: 'relative',
  },
  cameraImage: {
    width: '100%',
    height: '100%',
  },
  lipstickOverlay: {
    position: 'absolute',
    bottom: 120,
    left: '50%',
    width: 60,
    height: 25,
    borderRadius: 10,
    transform: [{ translateX: -30 }],
    opacity: 0.7,
  },
  blushOverlay: {
    position: 'absolute',
    top: 150,
    left: 80,
    width: 40,
    height: 40,
    borderRadius: 20,
    opacity: 0.3,
  },
  eyeshadowOverlay: {
    position: 'absolute',
    top: 120,
    left: '50%',
    width: 80,
    height: 30,
    borderRadius: 15,
    transform: [{ translateX: -40 }],
    opacity: 0.5,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: layout.spacing.md,
  },
  cameraButton: {
    flex: 1,
  },
  typesContainer: {
    flexDirection: 'row',
    marginBottom: layout.spacing.lg,
  },
  typeButton: {
    flex: 1,
    paddingVertical: layout.spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  selectedTypeButton: {
    borderBottomColor: colors.primary,
  },
  typeText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  selectedTypeText: {
    color: colors.primary,
  },
  itemsContainer: {
    marginBottom: layout.spacing.xl,
  },
  itemsTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    marginBottom: layout.spacing.md,
  },
  itemsList: {
    paddingBottom: layout.spacing.md,
  },
  itemButton: {
    alignItems: 'center',
    marginRight: layout.spacing.lg,
  },
  selectedItemButton: {
    transform: [{ scale: 1.1 }],
  },
  colorSwatch: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: layout.spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text,
    textAlign: 'center',
  },
  actionsContainer: {
    gap: layout.spacing.md,
  },
  actionButton: {
    width: '100%',
  },
});