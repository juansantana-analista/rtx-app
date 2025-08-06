import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const DEVICE_UUID_KEY = '@rtx_device_uuid';

/**
 * Gera um UUID v4 usando expo-crypto
 * @returns {string} UUID v4
 */
const generateUUID = () => {
  const randomBytes = Crypto.getRandomValues(new Uint8Array(16));
  randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40;
  randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80;
  const hex = Array.from(randomBytes, byte => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
};

class DeviceService {
  /**
   * Obtém o UUID do dispositivo, gerando um novo se não existir
   * @returns {Promise<string>} UUID do dispositivo
   */
  static async getDeviceUUID() {
    try {
      // Tentar recuperar UUID existente
      const existingUUID = await AsyncStorage.getItem(DEVICE_UUID_KEY);
      
      if (existingUUID) {
        return existingUUID;
      }
      
      // Gerar novo UUID
      const newUUID = generateUUID();
      
      // Salvar no storage
      await AsyncStorage.setItem(DEVICE_UUID_KEY, newUUID);
      
      return newUUID;
    } catch (error) {
      // Erro ao gerenciar UUID do dispositivo
      throw error;
    }
  }

  /**
   * Regenera o UUID do dispositivo
   * @returns {Promise<string>} Novo UUID
   */
  static async regenerateDeviceUUID() {
    try {
      const newUUID = generateUUID();
      await AsyncStorage.setItem(DEVICE_UUID_KEY, newUUID);
      return newUUID;
    } catch (error) {
      // Erro ao regenerar UUID do dispositivo
      throw error;
    }
  }

  /**
   * Remove o UUID do dispositivo do storage
   */
  static async clearDeviceUUID() {
    try {
      await AsyncStorage.removeItem(DEVICE_UUID_KEY);
    } catch (error) {
      // Erro ao remover UUID do dispositivo
      throw error;
    }
  }

  /**
   * Verifica se existe um UUID salvo
   * @returns {Promise<boolean>} True se existe UUID salvo
   */
  static async hasDeviceUUID() {
    try {
      const uuid = await AsyncStorage.getItem(DEVICE_UUID_KEY);
      return !!uuid;
    } catch (error) {
      // Erro ao verificar UUID do dispositivo
      return false;
    }
  }
}

export default DeviceService; 