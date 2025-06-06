import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { CameraView, CameraType } from 'expo-camera';
import { X, Camera, RotateCcw } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { layout } from '@/constants/layout';
import { Button } from '@/components/ui/Button';

interface ImageCaptureProps {
  onCapture: (uri: string) => void;
  onCancel: () => void;
  guideText?: string;
}

export function ImageCapture({ onCapture, onCancel, guideText }: ImageCaptureProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState<any>(null);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Memuat kamera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Kami membutuhkan izin Anda untuk menggunakan kamera</Text>
        <Button 
          title="Berikan Izin" 
          onPress={requestPermission} 
          style={styles.permissionButton}
        />
        <Button 
          title="Batal" 
          onPress={onCancel} 
          variant="secondary"
          style={styles.permissionButton}
        />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        onCapture(photo.uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={(ref) => setCameraRef(ref)}
      >
        <View style={styles.topBar}>
          <Pressable style={styles.closeButton} onPress={onCancel}>
            <X size={24} color="#fff" />
          </Pressable>
          <Pressable style={styles.flipButton} onPress={toggleCameraFacing}>
            <RotateCcw size={24} color="#fff" />
          </Pressable>
        </View>

        {guideText && (
          <View style={styles.guideContainer}>
            <Text style={styles.guideText}>{guideText}</Text>
          </View>
        )}

        <View style={styles.bottomBar}>
          <Pressable style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureButtonInner} />
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: layout.spacing.md,
    paddingTop: Platform.OS === 'ios' ? 50 : layout.spacing.md,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideContainer: {
    padding: layout.spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.5)',
    margin: layout.spacing.lg,
    borderRadius: layout.borderRadius.md,
  },
  guideText: {
    color: '#fff',
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: layout.spacing.xl,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fff',
  },
  permissionText: {
    color: colors.text,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    textAlign: 'center',
    marginBottom: layout.spacing.lg,
    padding: layout.spacing.lg,
  },
  permissionButton: {
    marginHorizontal: layout.spacing.lg,
    marginBottom: layout.spacing.md,
  },
});