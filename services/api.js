import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { forceGlobalLogout } from './globalLogout';

// Configuração base do axios
const api = axios.create({
  baseURL: 'https://rtx.tecskill.com.br',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Função para verificar se o JWT expirou
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    // Erro ao verificar expiração do token
    return true; // Considera como expirado se não conseguir decodificar
  }
};

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Se receber 401 (Unauthorized), força logout
    if (error.response && error.response.status === 401) {
      forceGlobalLogout();
    }
    
    return Promise.reject(error);
  }
);

const API_URL = 'https://rtx.tecskill.com.br/rest.php';

/**
 * Função genérica para requisições autenticadas à API RTX
 * @param {Object} options
 * @param {string} options.classe - Nome da classe do backend
 * @param {string} options.metodo - Nome do método do backend
 * @param {Object} options.params - Parâmetros adicionais
 * @returns {Promise<Object>} - Resposta da API
 */
export async function apiRequest({ classe, metodo, params = {} }) {
  // Recupera o token JWT salvo
  const token = await AsyncStorage.getItem('@RTX:authToken');
  if (!token) {
    forceGlobalLogout();
    throw new Error('Token não encontrado. Faça login novamente.');
  }

  // Verifica se o token expirou antes de fazer a requisição
  if (isTokenExpired(token)) {
    forceGlobalLogout();
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  // Monta o body
  const body = {
    class: classe,
    method: metodo,
    ...params
  };



  try {
    // Faz a requisição
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    // Verifica se a resposta indica token inválido
    if (data.status === 'error' && data.data && typeof data.data === 'string' && 
        (data.data.includes('Signature verification failed') || 
         data.data.includes('Token expired') ||
         data.data.includes('Invalid token'))) {
      forceGlobalLogout();
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    // Verifica se recebeu 401
    if (response.status === 401) {
      forceGlobalLogout();
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    return data;
  } catch (error) {
    // Se for erro de rede ou outro tipo, verifica se é relacionado a autenticação
    if (error.message.includes('Sessão expirada') || error.message.includes('Token')) {
      throw error; // Re-throw para não duplicar o logout
    }
    
    // Para outros erros, verifica se o token ainda é válido
    if (token && isTokenExpired(token)) {
      forceGlobalLogout();
      throw new Error('Sessão expirada. Faça login novamente.');
    }
    
    throw error;
  }
}

export default api;