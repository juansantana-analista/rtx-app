import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import CustomHeader from '../components/CustomHeader';
import FloatingLoader from '../components/FloatingLoader';
import StatusScreen from '../components/StatusScreen';
import { submitPhotoValidation, saveDevice, registerFace } from '../services/deviceValidationService';
import DeviceService from '../services/deviceService';
import createStyles from '../styles/DeviceValidationStyles';

const { width, height } = Dimensions.get('window');


const DeviceValidationScreen = ({ isFaceRegistration: initialIsFaceRegistration = false }) => {
  const { themeColors } = useTheme();
  const { user, completeDeviceValidation, registerFaceAndCompleteValidation, logout } = useAuth();
  const styles = createStyles();
  
  const [step, setStep] = useState('instructions'); // instructions, camera, photo_taken, submitting, status
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deviceUUID, setDeviceUUID] = useState('');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isFaceRegistration, setIsFaceRegistration] = useState(initialIsFaceRegistration); // true = cadastro, false = validação
  
  // Estado para a tela de status
  const [statusConfig, setStatusConfig] = useState({
    type: 'success',
    title: '',
    message: '',
    primaryButton: '',
    secondaryButton: '',
    onPrimaryPress: null,
    onSecondaryPress: null,
  });

  useEffect(() => {
    // Obter UUID do dispositivo
    const getDeviceUUID = async () => {
      try {
        const uuid = await DeviceService.getDeviceUUID();
        setDeviceUUID(uuid);
      } catch (error) {
        // Erro silencioso - não afeta a funcionalidade
      }
    };

    getDeviceUUID();
  }, []);

  // Atualizar o estado de cadastro de face quando a prop mudar
  useEffect(() => {
    setIsFaceRegistration(initialIsFaceRegistration);
  }, [initialIsFaceRegistration]);


  const handleStartCamera = () => {
    // Verificar permissão antes de abrir câmera
    if (!permission) {
      setStatusConfig({
        type: 'info',
        title: '📸 Aguarde',
        message: 'Solicitando permissão da câmera...',
        primaryButton: 'OK',
        onPrimaryPress: () => setStep('instructions'),
      });
      setStep('status');
      return;
    }
    
    if (!permission.granted) {
      setStatusConfig({
        type: 'warning',
        title: '📸 Permissão da Câmera Necessária',
        message: 'Para realizar a validação facial, precisamos acessar sua câmera frontal. Esta permissão é essencial para garantir sua segurança.',
        primaryButton: 'Permitir Acesso',
        secondaryButton: 'Cancelar',
        onPrimaryPress: async () => {
          const result = await requestPermission();
          if (result.granted) {
            setStep('camera');
          } else {
            setStep('instructions');
          }
        },
        onSecondaryPress: () => setStep('instructions'),
      });
      setStep('status');
      return;
    }
    
    setStep('camera');
  };

  const handleTakePhoto = async () => {
    try {
      setIsLoading(true);
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync({ 
          quality: 0.8,
          base64: false 
        });
        setCapturedPhoto(photo);
        setStep('photo_taken');
      }
    } catch (error) {
      setStatusConfig({
        type: 'error',
        title: '📸 Erro na Câmera',
        message: 'Não foi possível capturar a foto. Tente novamente.',
        primaryButton: 'OK',
        onPrimaryPress: () => setStep('camera'),
      });
      setStep('status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetakePhoto = () => {
    setCapturedPhoto(null);
    setStep('camera');
  };

  const handleSubmitPhoto = async () => {
    if (!capturedPhoto || !user?.pessoaid || !deviceUUID) {
      setStatusConfig({
        type: 'error',
        title: 'Dados Insuficientes',
        message: 'Não foi possível obter todas as informações necessárias. Tente novamente.',
        primaryButton: 'OK',
        onPrimaryPress: () => setStep('instructions'),
      });
      setStep('status');
      return;
    }

    setIsLoading(true);
    setStep('submitting');

    try {
      if (isFaceRegistration) {
        // CADASTRO DE FACE (primeiro acesso)
        const registrationResult = await registerFaceAndCompleteValidation(capturedPhoto.uri);
        
        if (registrationResult.success) {
          // Face cadastrada e dispositivo liberado com sucesso
          setStatusConfig({
            type: 'success',
            title: '🎉 Cadastro Concluído com Sucesso!',
            message: 'Parabéns! Sua face foi cadastrada e seu dispositivo foi liberado com segurança. Você já pode acessar todas as funcionalidades do aplicativo.',
            primaryButton: 'Continuar',
            onPrimaryPress: () => {
              completeDeviceValidation();
            },
          });
          setStep('status');
        } else {
          throw new Error(registrationResult.message || 'Erro no cadastro da face');
        }
      } else {
        // VALIDAÇÃO FACIAL (acessos subsequentes)
        const validationResult = await submitPhotoValidation(user.pessoaid, capturedPhoto.uri);
        
        if (validationResult.validated) {
          // Face validada com sucesso - agora salvar o dispositivo
          const saveResult = await saveDevice(user.pessoaid, deviceUUID);
          
          if (saveResult.success) {
            // Dispositivo salvo com sucesso
            setStatusConfig({
              type: 'success',
              title: '🎉 Validação Concluída com Sucesso!',
              message: 'Parabéns! Sua identidade foi confirmada e seu dispositivo foi registrado com segurança. Você já pode acessar todas as funcionalidades do aplicativo.',
              primaryButton: 'Continuar',
              onPrimaryPress: () => {
                completeDeviceValidation();
              },
            });
            setStep('status');
          } else {
            // Erro ao salvar dispositivo
            setStatusConfig({
              type: 'warning',
              title: '⚠️ Erro no Registro',
              message: 'Sua identidade foi confirmada com sucesso, mas houve um problema ao registrar seu dispositivo. Isso pode acontecer devido a instabilidade na conexão.',
              primaryButton: 'Tentar Novamente',
              secondaryButton: 'Cancelar',
              onPrimaryPress: () => setStep('photo_taken'),
              onSecondaryPress: () => setStep('instructions'),
            });
            setStep('status');
          }
        } else {
          // Face não validada
          setStatusConfig({
            type: 'error',
            title: '🔍 Identidade Não Confirmada',
            message: 'Não foi possível confirmar sua identidade com a foto enviada. Isso pode acontecer por:\n\n• Foto muito escura ou desfocada\n• Ângulo inadequado\n• Iluminação insuficiente\n\nTente novamente com uma foto mais nítida e bem iluminada.',
            primaryButton: 'Tentar Novamente',
            secondaryButton: 'Cancelar',
            onPrimaryPress: () => setStep('photo_taken'),
            onSecondaryPress: () => setStep('instructions'),
          });
          setStep('status');
        }
      }
      
    } catch (error) {
      // Se o erro for relacionado a sessão expirada, mostrar mensagem específica
      if (error.message && error.message.includes('Sessão expirada')) {
        setStatusConfig({
          type: 'error',
          title: '🔐 Sessão Expirada',
          message: 'Sua sessão expirou. Você será redirecionado para fazer login novamente.',
          primaryButton: 'OK',
          onPrimaryPress: () => logout(),
        });
      } else {
        const errorTitle = isFaceRegistration ? '📸 Foto Não Atende aos Requisitos' : '📸 Foto Não Atende aos Requisitos';
        const errorMessage = isFaceRegistration 
          ? 'A foto não atende aos requisitos de iluminação, qualidade e posição. Certifique-se de:\n\n• Posicionar-se de frente para a câmera\n• Manter boa iluminação (não muito escura/clara)\n• Manter a cabeça reta e centralizada\n• Tirar uma foto nítida e sem borrão\n\nTente novamente com uma foto mais adequada.'
          : 'A foto não atende aos requisitos de iluminação, qualidade e posição. Certifique-se de:\n\n• Posicionar-se de frente para a câmera\n• Manter boa iluminação (não muito escura/clara)\n• Manter a cabeça reta e centralizada\n• Tirar uma foto nítida e sem borrão\n\nTente novamente com uma foto mais adequada.';
        

        
        setStatusConfig({
          type: 'error',
          title: errorTitle,
          message: errorMessage,
          primaryButton: 'Tentar Novamente',
          secondaryButton: 'Cancelar',
          onPrimaryPress: () => setStep('photo_taken'),
          onSecondaryPress: () => setStep('instructions'),
        });
      }
      setStep('status');
    } finally {
      setIsLoading(false);
    }
  };


  const handleLogout = () => {
    setStatusConfig({
      type: 'warning',
      title: '🚪 Sair do Aplicativo',
      message: 'Tem certeza que deseja sair? Você precisará realizar a validação facial novamente no próximo acesso.',
      primaryButton: 'Sair',
      secondaryButton: 'Cancelar',
      onPrimaryPress: logout,
      onSecondaryPress: () => setStep('instructions'),
    });
    setStep('status');
  };

  const renderInstructions = () => {
    const isRegistration = isFaceRegistration;
    const title = isRegistration ? 'Cadastro Facial' : 'Validação Facial';
    const subtitle = isRegistration 
      ? 'Este é seu primeiro acesso! Precisamos cadastrar sua face para garantir a segurança do seu dispositivo.'
      : 'Por segurança, precisamos confirmar sua identidade através de uma foto da câmera frontal antes de registrar este dispositivo.';
    
    const step3Title = isRegistration ? 'Cadastro e liberação' : 'Validação e registro';
    const step3Description = isRegistration 
      ? 'Sua face será cadastrada no sistema e o dispositivo será liberado automaticamente'
      : 'Sua identidade será validada automaticamente e o dispositivo será registrado com segurança';

    return (
      <View style={styles.instructionsContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.deviceIcon}>
            <Ionicons name="phone-portrait" size={32} color={themeColors.primary} />
            <View style={styles.shieldIcon}>
              <Ionicons name="shield-checkmark" size={16} color={themeColors.white} />
            </View>
          </View>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>Como funciona:</Text>
          
          <View style={styles.instructionsList}>
            <View style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.instructionContent}>
                <Text style={styles.instructionTitle}>Tire uma foto</Text>
                <Text style={styles.instructionDescription}>
                  Clique no botão abaixo para abrir a câmera frontal e posicionar seu rosto
                </Text>
              </View>
            </View>

            <View style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.instructionContent}>
                <Text style={styles.instructionTitle}>Confirme a foto</Text>
                <Text style={styles.instructionDescription}>
                  Verifique se a foto ficou nítida e confirme para enviar para {isRegistration ? 'cadastro' : 'validação'}
                </Text>
              </View>
            </View>

            <View style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.instructionContent}>
                <Text style={styles.instructionTitle}>{step3Title}</Text>
                <Text style={styles.instructionDescription}>
                  {step3Description}
                </Text>
              </View>
            </View>
          </View>
        </View>



        <View style={styles.securityInfo}>
          <Ionicons name="lock-closed" size={16} color={themeColors.success} />
          <Text style={styles.securityText}>
            Suas informações são seguras e protegidas por criptografia
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartCamera}
            activeOpacity={0.8}
          >
            <Ionicons name="camera" size={20} color={themeColors.white} />
            <Text style={styles.startButtonText}>Abrir Câmera Frontal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutButtonText}>Sair do App</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCamera = () => {
    if (!permission) {
      return (
        <View style={styles.cameraContainer}>
          <Text style={styles.cameraText}>Solicitando permissão da câmera...</Text>
        </View>
      );
    }

    if (!permission.granted) {
      return (
        <View style={styles.cameraContainer}>
          <Text style={styles.cameraText}>Sem acesso à câmera</Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Solicitar Permissão</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="front"
          ref={cameraRef}
          mirror={true}
        />
        <View style={styles.cameraOverlay}>
          <View style={styles.cameraHeader}>
            <TouchableOpacity
              style={styles.cameraBackButton}
              onPress={() => setStep('instructions')}
            >
              <Ionicons name="arrow-back" size={24} color={themeColors.white} />
            </TouchableOpacity>
            
            <Text style={styles.cameraTitle}>Tire uma foto</Text>
          </View>

          <View style={styles.cameraGuide}>
            <View style={styles.faceGuide}>
              <Ionicons name="person" size={80} color={themeColors.white} />
              <Text style={styles.guideText}>
                Posicione seu rosto no centro da tela
              </Text>
            </View>
          </View>

          <View style={styles.cameraFooter}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleTakePhoto}
              disabled={isLoading}
            >
              <View style={styles.captureButtonInner}>
                {isLoading ? (
                  <View style={styles.captureLoading} />
                ) : (
                  <Ionicons name="camera" size={32} color={themeColors.white} />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderPhotoTaken = () => (
    <View style={styles.photoContainer}>
      <View style={styles.photoHeader}>
        <Text style={styles.photoTitle}>Foto Capturada</Text>
        <Text style={styles.photoSubtitle}>Verifique se a foto ficou nítida</Text>
      </View>

      <View style={styles.photoPreview}>
        <Image source={{ uri: capturedPhoto?.uri }} style={styles.photoImage} />
      </View>

      <View style={styles.photoActions}>
        <TouchableOpacity
          style={styles.retakeButton}
          onPress={handleRetakePhoto}
          activeOpacity={0.8}
        >
          <Ionicons name="camera" size={18} color={themeColors.primary} />
          <Text style={styles.retakeButtonText}>Tirar Novamente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitPhoto}
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark" size={18} color={themeColors.white} />
          <Text style={styles.submitButtonText}>Enviar Foto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSubmitting = () => {
    const isRegistration = isFaceRegistration;
    const title = isRegistration ? 'Cadastrando Face' : 'Validando e Registrando';
    const description = isRegistration 
      ? 'Aguarde enquanto cadastramos sua face e liberamos o dispositivo...'
      : 'Aguarde enquanto validamos sua identidade e registramos o dispositivo...';

    return (
      <View style={styles.statusContainer}>
        <View style={styles.statusIcon}>
          <View style={styles.loadingSpinner}>
            <Ionicons name="person" size={40} color={themeColors.primary} />
          </View>
        </View>
        
        <Text style={styles.statusTitle}>{title}</Text>
        <Text style={styles.statusDescription}>
          {description}
        </Text>
      </View>
    );
  };


  const renderStatus = () => (
    <StatusScreen
      type={statusConfig.type}
      title={statusConfig.title}
      message={statusConfig.message}
      primaryButton={statusConfig.primaryButton}
      secondaryButton={statusConfig.secondaryButton}
      onPrimaryPress={statusConfig.onPrimaryPress}
      onSecondaryPress={statusConfig.onSecondaryPress}
      onClose={() => setStep('instructions')}
    />
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 'instructions':
        return renderInstructions();
      case 'camera':
        return renderCamera();
      case 'photo_taken':
        return renderPhotoTaken();
      case 'submitting':
        return renderSubmitting();
      case 'status':
        return renderStatus();
      default:
        return renderInstructions();
    }
  };

  return (
    <View style={styles.container}>
      {step !== 'camera' && step !== 'status' && (
        <CustomHeader 
          title={isFaceRegistration ? 'Cadastro Facial' : 'Validação Facial'}
          rightActions={[
            { 
              icon: 'log-out-outline', 
              onPress: handleLogout 
            }
          ]}
        />
      )}

      {renderCurrentStep()}

      {isLoading && step !== 'submitting' && step !== 'status' && (
        <FloatingLoader message="Processando..." />
      )}
    </View>
  );
};

export default DeviceValidationScreen;