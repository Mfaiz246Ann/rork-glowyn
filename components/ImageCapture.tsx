import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Platform } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { Camera, Upload, X, Check } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';

interface ImageCaptureProps {
  onImageCaptured: (imageUri: string) => void;
  onCancel: () => void;
  instructionText?: string;
  showGuideOverlay?: boolean;
  guideType?: 'face' | 'color' | 'skin';
}

export const ImageCapture: React.FC<ImageCaptureProps> = ({
  onImageCaptured,
  onCancel,
  instructionText = "Posisikan wajah dalam frame",
  showGuideOverlay = true,
  guideType = 'face',
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('front');
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    requestPermission();
  }, []);

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;
    
    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
      setIsCameraActive(false);
    } catch (error) {
      console.error("Error taking picture:", error);
    } finally {
      setIsCapturing(false);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setCapturedImage(result.assets[0].uri);
        setIsCameraActive(false);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const confirmImage = () => {
    if (capturedImage) {
      onImageCaptured(capturedImage);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setIsCameraActive(true);
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>Izin Kamera Diperlukan</Text>
        <Text style={styles.permissionText}>
          Kami memerlukan izin untuk menggunakan kamera untuk analisis.
        </Text>
        <Button 
          title="Berikan Izin" 
          onPress={requestPermission} 
          variant="primary"
          style={styles.permissionButton}
        />
        <Button 
          title="Batal" 
          onPress={onCancel} 
          variant="outline"
          style={styles.permissionButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isCameraActive ? (
        <>
          <View style={styles.cameraContainer}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing={facing}
            >
              {showGuideOverlay && (
                <View style={styles.guideOverlay}>
                  {guideType === 'face' && <View style={styles.faceGuide} />}
                  {guideType === 'color' && <View style={styles.colorGuide} />}
                  {guideType === 'skin' && <View style={styles.skinGuide} />}
                </View>
              )}
              
              <View style={styles.cameraControls}>
                <Pressable style={styles.closeButton} onPress={onCancel}>
                  <X size={24} color={colors.surface} />
                </Pressable>
                
                <Pressable style={styles.flipButton} onPress={toggleCameraFacing}>
                  <Camera size={24} color={colors.surface} />
                </Pressable>
              </View>
              
              <Text style={styles.instructionText}>{instructionText}</Text>
            </CameraView>
          </View>
          
          <View style={styles.actionButtons}>
            <Button
              title="Ambil Foto"
              variant="primary"
              size="large"
              icon={<Camera size={20} color={colors.surface} />}
              style={styles.actionButton}
              onPress={takePicture}
              loading={isCapturing}
            />
            
            <Button
              title="Unggah Foto"
              variant="outline"
              size="large"
              icon={<Upload size={20} color={colors.primary} />}
              style={styles.actionButton}
              onPress={pickImage}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.previewContainer}>
            {capturedImage && (
              <Image
                source={{ uri: capturedImage }}
                style={styles.previewImage}
                contentFit="cover"
              />
            )}
            
            <View style={styles.previewControls}>
              <Pressable style={styles.previewButton} onPress={retakePhoto}>
                <X size={24} color={colors.surface} />
              </Pressable>
              
              <Pressable style={styles.previewButton} onPress={confirmImage}>
                <Check size={24} color={colors.surface} />
              </Pressable>
            </View>
          </View>
          
          <View style={styles.actionButtons}>
            <Button
              title="Ambil Ulang"
              variant="outline"
              size="large"
              style={styles.actionButton}
              onPress={retakePhoto}
            />
            
            <Button
              title="Gunakan Foto Ini"
              variant="primary"
              size="large"
              style={styles.actionButton}
              onPress={confirmImage}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.spacing.lg,
  },
  permissionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    marginBottom: layout.spacing.md,
    textAlign: 'center',
  },
  permissionText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: layout.spacing.xl,
    textAlign: 'center',
    lineHeight: typography.lineHeight.md,
  },
  permissionButton: {
    width: '100%',
    marginBottom: layout.spacing.md,
  },
  cameraContainer: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: layout.borderRadius.lg,
    marginBottom: layout.spacing.md,
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
    padding: layout.spacing.md,
  },
  guideOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceGuide: {
    width: 250,
    height: 300,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 150,
    opacity: 0.7,
  },
  colorGuide: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 100,
    opacity: 0.7,
  },
  skinGuide: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 75,
    opacity: 0.7,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.surface,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.md,
    borderRadius: layout.borderRadius.md,
    overflow: 'hidden',
    marginBottom: Platform.OS === 'ios' ? layout.spacing.xl : layout.spacing.md,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: layout.spacing.md,
    gap: layout.spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  previewContainer: {
    flex: 1,
    borderRadius: layout.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: layout.spacing.md,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  previewControls: {
    position: 'absolute',
    top: layout.spacing.md,
    right: layout.spacing.md,
    flexDirection: 'row',
    gap: layout.spacing.md,
  },
  previewButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});