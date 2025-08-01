import { useState, useEffect } from 'react';
import DeviceService from '../services/deviceService';

/**
 * Hook personalizado para gerenciar o UUID do dispositivo
 * @returns {Object} Objeto contendo o UUID e funções de gerenciamento
 */
const useDeviceUUID = () => {
  const [deviceUUID, setDeviceUUID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inicializa o UUID do dispositivo
  useEffect(() => {
    const initializeUUID = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const uuid = await DeviceService.getDeviceUUID();
        setDeviceUUID(uuid);
      } catch (err) {
        setError(err.message);
        console.error('❌ Erro no hook useDeviceUUID:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUUID();
  }, []);

  // Função para regenerar o UUID
  const regenerateUUID = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const newUUID = await DeviceService.regenerateDeviceUUID();
      setDeviceUUID(newUUID);
      
      return newUUID;
    } catch (err) {
      setError(err.message);
      console.error('❌ Erro ao regenerar UUID:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Função para limpar o UUID
  const clearUUID = async () => {
    try {
      await DeviceService.clearDeviceUUID();
      setDeviceUUID(null);
    } catch (err) {
      setError(err.message);
      console.error('❌ Erro ao limpar UUID:', err);
      throw err;
    }
  };

  // Função para verificar se o dispositivo tem UUID
  const hasUUID = async () => {
    try {
      return await DeviceService.hasDeviceUUID();
    } catch (err) {
      setError(err.message);
      console.error('❌ Erro ao verificar UUID:', err);
      return false;
    }
  };

  return {
    deviceUUID,
    isLoading,
    error,
    regenerateUUID,
    clearUUID,
    hasUUID,
  };
};

export default useDeviceUUID; 