import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import DeviceService from '../services/deviceService';
import { 
  validateDevice, 
  requestDeviceAuthorization, 
  submitPhotoValidation, 
  checkValidationStatus 
} from '../services/deviceValidationService';

/**
 * Hook customizado para gerenciar validação de dispositivo
 */
const useDeviceValidation = (user) => {
  const [deviceUUID, setDeviceUUID] = useState('');
  const [deviceInfo, setDeviceInfo] = useState({});
  const [validationStatus, setValidationStatus] = useState('unknown'); // unknown, valid, invalid, pending
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Inicializar informações do dispositivo
  useEffect(() => {
    const initializeDevice = async () => {
      try {
        // Obter UUID do dispositivo
        const uuid = await DeviceService.getDeviceUUID();
        setDeviceUUID(uuid);

        // Obter informações do dispositivo
        const info = {
          platform: Platform.OS,
          version: Platform.Version?.toString() || 'unknown',
          model: Device.modelName || 'Unknown',
          brand: Device.brand || 'Unknown',
          deviceName: Device.deviceName || 'Unknown',
          osName: Device.osName || Platform.OS,
          osVersion: Device.osVersion || Platform.Version?.toString() || 'unknown',
          deviceType: Device.deviceType?.toString() || 'Unknown',
        };
        
        setDeviceInfo(info);
        // Informações do dispositivo obtidas
      } catch (err) {
        console.error('❌ Erro ao inicializar dispositivo:', err);
        setError('Erro ao obter informações do dispositivo');
      }
    };

    initializeDevice();
  }, []);

  // Validar dispositivo quando user e deviceUUID estiverem disponíveis
  useEffect(() => {
    if (user?.pessoaid && deviceUUID) {
      validateUserDevice();
    }
  }, [user, deviceUUID]);

  /**
   * Valida se o dispositivo está autorizado
   */
  const validateUserDevice = async () => {
    if (!user?.pessoaid || !deviceUUID) {
      // Dados insuficientes para validação
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Validando dispositivo para usuário
      
      const result = await validateDevice(user.pessoaid, deviceUUID);
      
      if (result.valid) {
        // Dispositivo válido
        setValidationStatus('valid');
        return true;
      } else {
        // Dispositivo não autorizado
        setValidationStatus('invalid');
        return false;
      }
    } catch (err) {
      console.error('❌ Erro na validação:', err);
      setError(err.message);
      setValidationStatus('invalid');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Solicita autorização para o dispositivo
   */
  const requestAuthorization = async () => {
    if (!user?.pessoaid || !deviceUUID) {
      throw new Error('Dados insuficientes para solicitar autorização');
    }

    setIsLoading(true);
    setError(null);

    try {
      // Solicitando autorização do dispositivo
      
      const result = await requestDeviceAuthorization(user.pessoaid, deviceUUID, deviceInfo);
      
      // Autorização solicitada com sucesso
      setValidationStatus('pending');
      
      return result;
    } catch (err) {
      console.error('❌ Erro ao solicitar autorização:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Envia foto para validação
   */
  const submitPhoto = async (photoUri) => {
    if (!user?.pessoaid || !deviceUUID) {
      throw new Error('Dados insuficientes para enviar foto');
    }

    setIsLoading(true);
    setError(null);

    try {
      // Enviando foto para validação
      
      const result = await submitPhotoValidation(user.pessoaid, deviceUUID, photoUri);
      
      // Foto enviada com sucesso
      setValidationStatus('pending');
      
      return result;
    } catch (err) {
      console.error('❌ Erro ao enviar foto:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Verifica status da validação
   */
  const checkStatus = async () => {
    if (!user?.pessoaid || !deviceUUID) {
      return null;
    }

    try {
      // Verificando status da validação
      
      const status = await checkValidationStatus(user.pessoaid, deviceUUID);
      
      // Status obtido com sucesso
      
      // Atualizar estado baseado no status
      if (status.approved) {
        setValidationStatus('valid');
      } else if (status.rejected) {
        setValidationStatus('invalid');
      } else {
        setValidationStatus('pending');
      }
      
      return status;
    } catch (err) {
      console.error('❌ Erro ao verificar status:', err);
      setError(err.message);
      return null;
    }
  };

  /**
   * Reinicia o processo de validação
   */
  const resetValidation = () => {
    setValidationStatus('unknown');
    setError(null);
    setIsLoading(false);
  };

  /**
   * Força revalidação do dispositivo
   */
  const revalidate = async () => {
    resetValidation();
    return await validateUserDevice();
  };

  return {
    deviceUUID,
    deviceInfo,
    validationStatus,
    isLoading,
    error,
    validateUserDevice,
    requestAuthorization,
    submitPhoto,
    checkStatus,
    resetValidation,
    revalidate,
    // Status helpers
    isValid: validationStatus === 'valid',
    isInvalid: validationStatus === 'invalid',
    isPending: validationStatus === 'pending',
    isUnknown: validationStatus === 'unknown',
  };
};

export default useDeviceValidation;