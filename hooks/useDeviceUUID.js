import { useState, useEffect } from 'react';
import DeviceService from '../services/deviceService';

const useDeviceUUID = () => {
  const [deviceUUID, setDeviceUUID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeUUID = async () => {
      try {
        setIsLoading(true);
        const uuid = await DeviceService.getDeviceUUID();
        setDeviceUUID(uuid);
        setError(null);
      } catch (err) {
        setError(err);
        console.error('❌ Erro ao inicializar UUID do dispositivo:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUUID();
  }, []);

  const regenerateUUID = async () => {
    try {
      setIsLoading(true);
      const newUUID = await DeviceService.regenerateDeviceUUID();
      setDeviceUUID(newUUID);
      setError(null);
      return newUUID;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearUUID = async () => {
    try {
      await DeviceService.clearDeviceUUID();
      setDeviceUUID(null);
      setError(null);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const hasUUID = async () => {
    return await DeviceService.hasDeviceUUID();
  };

  return {
    deviceUUID,
    isLoading,
    error,
    regenerateUUID,
    clearUUID,
    hasUUID
  };
};

export default useDeviceUUID; 