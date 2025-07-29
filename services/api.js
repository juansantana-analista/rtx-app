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

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Se receber 401 (Unauthorized), pode ser que o token expirou
    if (error.response && error.response.status === 401) {
      console.log('Token expirado ou inválido');
      // Aqui você pode implementar refresh token ou logout automático
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
    throw new Error('Token não encontrado. Faça login novamente.');
  }

  // Monta o body
  const body = {
    class: classe,
    method: metodo,
    ...params
  };

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

  // Se o JWT for inválido, pode tratar aqui
  if (data.status === 'error' && data.data && typeof data.data === 'string' && data.data.includes('Signature verification failed')) {
    forceGlobalLogout();
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  return data;
}

export default api;