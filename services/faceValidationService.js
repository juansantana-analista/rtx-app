import api from './api';

/**
 * Serviço para validação de rosto e ativação de dispositivo
 */
class FaceValidationService {
  /**
   * Envia foto do rosto para validação
   * @param {string} deviceUuid - UUID do dispositivo
   * @param {string} faceImageBase64 - Imagem do rosto em base64
   * @param {string} userToken - Token do usuário
   * @returns {Promise<Object>} Resultado da validação
   */
  static async validateFace(deviceUuid, faceImageBase64, userToken) {
    try {
      const response = await api.post('/face-validation', {
        deviceUuid: deviceUuid,
        faceImage: faceImageBase64,
      }, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Erro na validação de rosto:', error);
      
      if (error.response) {
        // Erro do servidor
        return {
          success: false,
          error: error.response.data?.message || 'Erro na validação de rosto',
          status: error.response.status,
        };
      } else if (error.request) {
        // Erro de rede
        return {
          success: false,
          error: 'Erro de conexão. Verifique sua internet.',
        };
      } else {
        // Outro erro
        return {
          success: false,
          error: 'Erro interno na validação de rosto',
        };
      }
    }
  }

  /**
   * Ativa o dispositivo após validação bem-sucedida
   * @param {string} deviceUuid - UUID do dispositivo
   * @param {string} userToken - Token do usuário
   * @returns {Promise<Object>} Resultado da ativação
   */
  static async activateDevice(deviceUuid, userToken) {
    try {
      const response = await api.post('/device-activation', {
        deviceUuid: deviceUuid,
      }, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Erro na ativação do dispositivo:', error);
      
      if (error.response) {
        return {
          success: false,
          error: error.response.data?.message || 'Erro na ativação do dispositivo',
          status: error.response.status,
        };
      } else if (error.request) {
        return {
          success: false,
          error: 'Erro de conexão. Verifique sua internet.',
        };
      } else {
        return {
          success: false,
          error: 'Erro interno na ativação do dispositivo',
        };
      }
    }
  }

  /**
   * Verifica o status de ativação do dispositivo
   * @param {string} deviceUuid - UUID do dispositivo
   * @param {string} userToken - Token do usuário
   * @returns {Promise<Object>} Status do dispositivo
   */
  static async checkDeviceStatus(deviceUuid, userToken) {
    try {
      const response = await api.get(`/device-status/${deviceUuid}`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Erro ao verificar status do dispositivo:', error);
      
      if (error.response) {
        return {
          success: false,
          error: error.response.data?.message || 'Erro ao verificar status do dispositivo',
          status: error.response.status,
        };
      } else if (error.request) {
        return {
          success: false,
          error: 'Erro de conexão. Verifique sua internet.',
        };
      } else {
        return {
          success: false,
          error: 'Erro interno ao verificar status do dispositivo',
        };
      }
    }
  }
}

export default FaceValidationService; 