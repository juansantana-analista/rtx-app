import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const DEVICE_UUID_KEY = '@rtx_device_uuid';

/**
 * Gera um UUID v4 usando expo-crypto
 * @returns {string} UUID v4
 */
const generateUUID = () => {
  // Gera 16 bytes aleatórios
  const randomBytes = Crypto.getRandomValues(new Uint8Array(16));
  
  // Define a versão (4) e variante
  randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40; // versão 4
  randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80; // variante RFC 4122
  
  // Converte para string hexadecimal
  const hex = Array.from(randomBytes, byte => byte.toString(16).padStart(2, '0')).join('');
  
  // Formata como UUID
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
};

class DeviceService {
  /**
   * Gera ou recupera o UUID único do dispositivo
   * @returns {Promise<string>} UUID do dispositivo
   */
  static async getDeviceUUID() {
    try {
      // Tenta recuperar o UUID existente do storage
      let deviceUUID = await AsyncStorage.getItem(DEVICE_UUID_KEY);
      
             // Se não existir, gera um novo UUID v4
       if (!deviceUUID) {
         deviceUUID = generateUUID();
         
         // Salva o novo UUID no storage
         await AsyncStorage.setItem(DEVICE_UUID_KEY, deviceUUID);
         
         console.log('🔐 Novo UUID do dispositivo gerado:', deviceUUID);
       } else {
         console.log('🔐 UUID do dispositivo recuperado:', deviceUUID);
       }
       
       return deviceUUID;
     } catch (error) {
       console.error('❌ Erro ao gerenciar UUID do dispositivo:', error);
       
       // Em caso de erro, gera um UUID temporário
       const fallbackUUID = generateUUID();
       console.log('⚠️ UUID temporário gerado devido a erro:', fallbackUUID);
       
       return fallbackUUID;
    }
  }

  /**
   * Força a regeneração do UUID do dispositivo
   * @returns {Promise<string>} Novo UUID gerado
   */
  static async regenerateDeviceUUID() {
    try {
      const newUUID = generateUUID();
      await AsyncStorage.setItem(DEVICE_UUID_KEY, newUUID);
      
      console.log('🔄 UUID do dispositivo regenerado:', newUUID);
      return newUUID;
    } catch (error) {
      console.error('❌ Erro ao regenerar UUID do dispositivo:', error);
      throw error;
    }
  }

  /**
   * Remove o UUID do dispositivo do storage
   * @returns {Promise<void>}
   */
  static async clearDeviceUUID() {
    try {
      await AsyncStorage.removeItem(DEVICE_UUID_KEY);
      console.log('🗑️ UUID do dispositivo removido do storage');
    } catch (error) {
      console.error('❌ Erro ao remover UUID do dispositivo:', error);
      throw error;
    }
  }

  /**
   * Verifica se o dispositivo já possui um UUID salvo
   * @returns {Promise<boolean>}
   */
  static async hasDeviceUUID() {
    try {
      const deviceUUID = await AsyncStorage.getItem(DEVICE_UUID_KEY);
      return !!deviceUUID;
    } catch (error) {
      console.error('❌ Erro ao verificar UUID do dispositivo:', error);
      return false;
    }
  }
}

export default DeviceService; 