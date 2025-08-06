import { apiRequest } from './api';
import { getToken } from './authService';

/**
 * Serviço para validação de dispositivos
 */

/**
 * Valida se o dispositivo está autorizado para o usuário
 * @param {string|number} pessoaId - ID da pessoa
 * @param {string} deviceUUID - UUID do dispositivo
 * @returns {Promise<{valid: boolean, device_id?: string}>}
 */
export const validateDevice = async (pessoaId, deviceUUID) => {
  try {
    const result = await apiRequest({
      classe: 'DispositivosRestService',
      metodo: 'onValidateDevice',
      params: {
        pessoa_id: parseInt(pessoaId) || 2, // Fallback para pessoa_id 2
        device_uuid: deviceUUID
      }
    });

    if (result.status === 'success' && result.data) {
      const response = {
        valid: result.data.valid,
        device_id: result.data.device_id,
        has_face: result.data.has_face || false
      };
      return response;
    } else {
      const response = {
        valid: false,
        has_face: false,
        message: result.data || 'Dispositivo não encontrado'
      };
      return response;
    }
  } catch (error) {
          // Erro na validação de dispositivo
    throw new Error('Erro ao validar dispositivo: ' + error.message);
  }
};

/**
 * Solicita autorização para um novo dispositivo
 * @param {string|number} pessoaId - ID da pessoa
 * @param {string} deviceUUID - UUID do dispositivo
 * @param {Object} deviceInfo - Informações do dispositivo
 * @returns {Promise<Object>}
 */
export const requestDeviceAuthorization = async (pessoaId, deviceUUID, deviceInfo = {}) => {
  try {
    const result = await apiRequest({
      classe: 'DispositivosRestService',
      metodo: 'requestDeviceAuthorization',
      params: {
        pessoa_id: parseInt(pessoaId) || 2, // Fallback para pessoa_id 2
        device_uuid: deviceUUID,
        device_info: {
          platform: deviceInfo.platform || 'unknown',
          model: deviceInfo.model || 'unknown',
          version: deviceInfo.version || 'unknown',
          ...deviceInfo
        }
      }
    });

    if (result.status === 'success') {
      return result.data;
    } else {
      throw new Error(result.data || 'Erro ao solicitar autorização');
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Cadastra foto da face do usuário (primeiro acesso)
 * @param {string|number} pessoaId - ID da pessoa
 * @param {string} photoUri - URI da foto capturada
 * @returns {Promise<Object>}
 */
export const registerFace = async (pessoaId, photoUri) => {
  try {
    // Criar FormData para envio de arquivo
    const formData = new FormData();
    formData.append('acao', 'cadastrar');
    formData.append('id', pessoaId.toString());
    
    // Adicionar foto
    const imageFile = {
      uri: photoUri,
      type: 'image/jpeg',
      name: `face_registration_${Date.now()}.jpg`
    };
    formData.append('imagem', imageFile);
    
    // Fazer requisição com FormData
    const response = await fetch('https://rtx.tecskill.com.br/faceapi_proxy.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    });

    const result = await response.json();

    if (result.status === 'success' && result.data && result.data.face_descriptor) {
      return {
        success: true,
        registered: true,
        message: 'Face cadastrada com sucesso'
      };
    } else {
      return {
        success: true,
        registered: false,
        message: result.mensagem || result.data?.message || 'Erro ao cadastrar face'
      };
    }
  } catch (error) {
          // Erro capturado no registerFace
    throw new Error('Erro ao cadastrar face: ' + error.message);
  }
};

/**
 * Envia foto para validação facial
 * @param {string|number} pessoaId - ID da pessoa
 * @param {string} photoUri - URI da foto capturada
 * @returns {Promise<Object>}
 */
export const submitPhotoValidation = async (pessoaId, photoUri) => {
  try {
    // Criar FormData para envio de arquivo
    const formData = new FormData();
    formData.append('acao', 'validar');
    formData.append('id', pessoaId.toString());
    
    // Adicionar foto
    const imageFile = {
      uri: photoUri,
      type: 'image/jpeg',
      name: `face_validation_${Date.now()}.jpg`
    };
    formData.append('imagem', imageFile);
    
    // Fazer requisição com FormData
    const response = await fetch('https://rtx.tecskill.com.br/faceapi_proxy.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    });

    const result = await response.json();

    if (result.validado === true) {
      return {
        success: true,
        validated: true,
        distance: result.distancia,
        message: 'Face validada com sucesso'
      };
    } else {
      return {
        success: true,
        validated: false,
        distance: result.distancia,
        message: 'Face não reconhecida'
      };
    }
  } catch (error) {
    throw new Error('Erro ao validar face: ' + error.message);
  }
};

/**
 * Salva o dispositivo após validação facial bem-sucedida
 * @param {string|number} pessoaId - ID da pessoa
 * @param {string} deviceUUID - UUID do dispositivo
 * @returns {Promise<Object>}
 */
export const saveDevice = async (pessoaId, deviceUUID) => {
  try {
    const result = await apiRequest({
      classe: 'DispositivosRestService',
      metodo: 'onSaveDevice',
      params: {
        pessoa_id: parseInt(pessoaId) || 2, // Fallback para pessoa_id 2
        device_uuid: deviceUUID
      }
    });

    if (result.status === 'success' && result.data) {
      return {
        success: true,
        deviceData: result.data.data,
        message: 'Dispositivo salvo com sucesso'
      };
    } else {
      throw new Error(result.data || 'Erro ao salvar dispositivo');
    }
  } catch (error) {
    throw new Error('Erro ao salvar dispositivo: ' + error.message);
  }
};

/**
 * Verifica o status da validação do dispositivo
 * @param {string|number} pessoaId - ID da pessoa
 * @param {string} deviceUUID - UUID do dispositivo
 * @returns {Promise<Object>}
 */
export const checkValidationStatus = async (pessoaId, deviceUUID) => {
  try {
    const result = await apiRequest({
      classe: 'DispositivosRestService',
      metodo: 'checkValidationStatus',
      params: {
        pessoa_id: parseInt(pessoaId) || 2, // Fallback para pessoa_id 2
        device_uuid: deviceUUID
      }
    });

    if (result.status === 'success') {
      return result.data;
    } else {
      throw new Error(result.data || 'Erro ao verificar status');
    }
  } catch (error) {
    throw error;
  }
};