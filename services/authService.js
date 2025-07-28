import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@RTX:authToken';

export const storeToken = async (token) => {
  try {
    console.log('Armazenando token:', token);
    await AsyncStorage.setItem(TOKEN_KEY, token);
    const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
    console.log('Token armazenado com sucesso:', storedToken === token);
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
    console.log('Tentando login com:', credentials);
    const response = await api.post('/auth_app_homolog.php', {
      userDoc: credentials.userDoc,
      userPassword: credentials.password
    }, {
      headers: {
        'Authorization': 'Bearer Q0xJRU5FX0lEkKUDHAS5514DSYUdftOkVF9TRUNSRVQ=',
        'Content-Type': 'application/json'
      },
      validateStatus: (status) => status < 500 // Aceita status codes menores que 500
    });
    
    console.log('Status da resposta:', response.status);
    console.log('Resposta do servidor:', response.data);

    // Retorna o objeto completo da resposta para tratamento no componente
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    
    // Se houve erro de rede ou timeout
    if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED') {
      return {
        status: 'error',
        data: 'Erro de conexão. Verifique sua internet.',
      };
    }
    
    // Se a resposta tem dados (erro HTTP)
    if (error.response && error.response.data) {
      console.log('Dados do erro:', error.response.data);
      return error.response.data;
    }
    
    // Erro genérico
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