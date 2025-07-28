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
    
    const response = await api.post('/auth_app_homolog.php', {
      userDoc: credentials.userDoc,
      userPassword: credentials.password
    }, {
      headers: {
        'Authorization': authToken,
        'authorization': authToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED') {
      return {
        status: 'error',
        data: 'Erro de conexão. Verifique sua internet.',
      };
    }
    
    if (error.response && error.response.data) {
      return error.response.data;
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