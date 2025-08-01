import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

const TOKEN_KEY = '@RTX:authToken';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    return true;
  } catch (error) {
    console.error('Error storing token:', error);
    return false;
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

export const login = async (credentials) => {
  try {
    const authToken = 'Bearer Q0xJRU5UX0lEkKUDHAS5514DSYUdftOkVF9TRUNSRVQ=';
    
    // Teste com fetch diretamente para evitar problemas do axios
    const url = 'https://rtx.tecskill.com.br/auth_app_homolog.php';
    
    // Teste de conectividade primeiro
    const isConnected = await testApiConnection();
    if (!isConnected) {
      return {
        status: 'error',
        data: 'Não foi possível conectar ao servidor. Verifique sua internet.',
      };
    }
    
    // Criar um timeout para a requisição
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': authToken,
        'authorization': authToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        userDoc: credentials.userDoc,
        userPassword: credentials.password,
        deviceUuid: credentials.deviceUuid
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Verificar se a resposta tem o campo dispositivo
    if (data && data.user && !data.hasOwnProperty('dispositivo')) {
      console.log('⚠️ Resposta da API não tem campo dispositivo, assumindo não liberado');
      data.dispositivo = false;
    }
    
    return data;
  } catch (error) {
    console.error('Erro na requisição de login:', error);
    
    // Tratamento específico para diferentes tipos de erro
    if (error.name === 'AbortError') {
      return {
        status: 'error',
        data: 'Timeout da requisição. Tente novamente.',
      };
    }
    
    if (error.message && error.message.includes('Network request failed')) {
      return {
        status: 'error',
        data: 'Erro de conexão. Verifique sua internet e tente novamente.',
      };
    }
    
    if (error.message && error.message.includes('HTTP error')) {
      return {
        status: 'error',
        data: `Erro do servidor: ${error.message}`,
      };
    }
    
    if (error.message) {
      return {
        status: 'error',
        data: error.message,
      };
    }
    
    return {
      status: 'error',
      data: 'Erro de conexão com o servidor',
    };
  }
};

export const validateToken = async (token) => {
  try {
    const response = await api.get('/validate_token', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função para criar uma instância do axios com token automaticamente
export const createAuthenticatedApi = async () => {
  const token = await getToken();
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return api;
};

// Função para testar conectividade com a API
export const testApiConnection = async () => {
  try {
    const url = 'https://rtx.tecskill.com.br/auth_app_homolog.php';
    
    const response = await fetch(url, {
      method: 'OPTIONS', // Teste simples de conectividade
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return response.ok;
  } catch (error) {
    return false;
  }
};