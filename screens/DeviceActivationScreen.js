import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Camera } from 'expo-camera';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import useDeviceUUID from '../hooks/useDeviceUUID';
import FaceValidationService from '../services/faceValidationService';

const { width, height } = Dimensions.get('window');

const DeviceActivationScreen = ({ onBack, onSuccess, userToken }) => {
  const { theme } = useTheme();
  const { login } = useAuth();
  const { deviceUUID } = useDeviceUUID();
  
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        setIsCapturing(true);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
        });
        setCapturedImage(photo);
        setIsCapturing(false);
      } catch (error) {
        console.error('Erro ao capturar foto:', error);
        setIsCapturing(false);
        Alert.alert('Erro', 'Não foi possível capturar a foto. Tente novamente.');
      }
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
  };

  const processDeviceActivation = async () => {
    if (!capturedImage) {
      Alert.alert('Erro', 'Por favor, tire uma foto primeiro.');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Validar rosto usando a API
      const validationResult = await FaceValidationService.validateFace(
        deviceUUID,
        capturedImage.base64,
        userToken
      );

      if (validationResult.success) {
        // Ativar dispositivo
        const activationResult = await FaceValidationService.activateDevice(
          deviceUUID,
          userToken
        );

        if (activationResult.success) {
          Alert.alert(
            'Sucesso!',
            'Dispositivo liberado com sucesso!',
            [
              {
                text: 'OK',
                onPress: () => {
                  setIsProcessing(false);
                  onSuccess();
                },
              },
            ]
          );
        } else {
          Alert.alert(
            'Erro na Ativação',
            activationResult.error || 'Erro ao ativar dispositivo. Tente novamente.',
            [
              {
                text: 'Tentar Novamente',
                onPress: () => {
                  setIsProcessing(false);
                  retakePicture();
                },
              },
            ]
          );
        }
      } else {
        Alert.alert(
          'Falha na Validação',
          validationResult.error || 'Não foi possível validar sua identidade. Certifique-se de que:\n\n• Sua face está bem iluminada\n• Você está olhando diretamente para a câmera\n• Não há obstáculos na frente do seu rosto\n\nTente novamente.',
          [
            {
              text: 'Tentar Novamente',
              onPress: () => {
                setIsProcessing(false);
                retakePicture();
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error('Erro ao processar ativação:', error);
      setIsProcessing(false);
      Alert.alert('Erro', 'Erro ao processar a ativação. Tente novamente.');
    }
  };

  const styles = getStyles(theme);

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Solicitando permissão da câmera...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Permissão Negada</Text>
          <Text style={styles.errorText}>
            É necessário permitir o acesso à câmera para ativar o dispositivo.
          </Text>
          <TouchableOpacity style={styles.button} onPress={onBack}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ativação do Dispositivo</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Camera Container */}
      <View style={styles.cameraContainer}>
        {!capturedImage ? (
          <>
            <Camera
              ref={cameraRef}
              style={styles.camera}
              type={cameraType}
              ratio="4:3"
            >
              <View style={styles.cameraOverlay}>
                {/* Face Frame */}
                <View style={styles.faceFrame}>
                  <View style={styles.corner} />
                  <View style={[styles.corner, styles.cornerTopRight]} />
                  <View style={[styles.corner, styles.cornerBottomLeft]} />
                  <View style={[styles.corner, styles.cornerBottomRight]} />
                </View>
                
                {/* Instructions */}
                <View style={styles.instructionsContainer}>
                  <Text style={styles.instructionsTitle}>Instruções</Text>
                  <Text style={styles.instructionsText}>
                    • Posicione seu rosto dentro da moldura{'\n'}
                    • Certifique-se de que está bem iluminado{'\n'}
                    • Olhe diretamente para a câmera{'\n'}
                    • Mantenha uma expressão neutra
                  </Text>
                </View>
              </View>
            </Camera>

            {/* Camera Controls */}
            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={styles.switchButton}
                onPress={() => {
                  setCameraType(
                    cameraType === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Text style={styles.switchButtonText}>Trocar Câmera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.captureButton, isCapturing && styles.captureButtonDisabled]}
                onPress={takePicture}
                disabled={isCapturing}
              >
                {isCapturing ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.captureButtonText}>Capturar</Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {/* Preview */}
            <View style={styles.previewContainer}>
              <Text style={styles.previewTitle}>Foto Capturada</Text>
              <View style={styles.imagePreview}>
                <Text style={styles.previewText}>Imagem capturada com sucesso!</Text>
              </View>
            </View>

            {/* Preview Controls */}
            <View style={styles.previewControls}>
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={retakePicture}
                disabled={isProcessing}
              >
                <Text style={styles.retakeButtonText}>Tirar Nova Foto</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.processButton, isProcessing && styles.processButtonDisabled]}
                onPress={processDeviceActivation}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.processButtonText}>Processar</Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>UUID do Dispositivo</Text>
        <Text style={styles.uuidText}>{deviceUUID}</Text>
        <Text style={styles.infoText}>
          Este processo é necessário para garantir a segurança do seu dispositivo.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  placeholder: {
    width: 60,
  },
  cameraContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: theme.colors.card,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceFrame: {
    width: 250,
    height: 300,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: theme.colors.primary,
    top: 0,
    left: 0,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    left: 'auto',
    borderLeftWidth: 0,
    borderRightWidth: 3,
  },
  cornerBottomLeft: {
    bottom: 0,
    top: 'auto',
    borderTopWidth: 0,
    borderBottomWidth: 3,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    top: 'auto',
    left: 'auto',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 10,
  },
  instructionsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instructionsText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.card,
  },
  switchButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
  },
  switchButtonText: {
    color: theme.colors.text,
    fontWeight: '600',
  },
  captureButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  captureButtonDisabled: {
    opacity: 0.6,
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 20,
  },
  imagePreview: {
    width: 250,
    height: 300,
    backgroundColor: theme.colors.border,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderStyle: 'dashed',
  },
  previewText: {
    color: theme.colors.text,
    textAlign: 'center',
    fontSize: 16,
  },
  previewControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.card,
  },
  retakeButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retakeButtonText: {
    color: theme.colors.text,
    fontWeight: '600',
  },
  processButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  processButtonDisabled: {
    opacity: 0.6,
  },
  processButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: theme.colors.card,
    margin: 20,
    borderRadius: 15,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 10,
  },
  uuidText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: theme.colors.primary,
    backgroundColor: theme.colors.background,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: theme.colors.text,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.error,
    marginBottom: 15,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeviceActivationScreen; 