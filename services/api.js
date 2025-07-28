import axios from 'axios';
import { Platform } from 'react-native';

const api = axios.create({
  baseURL: 'https://rtx.tecskill.com.br',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': `RTX-Mobile-App/1.0.0 (${Platform.OS})`,
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': 'Bearer Q0xJRU5UX0lEkKUDHAS5514DSYUdftOkVF9TRUNSRVQ='
  }
});

// Interceptor para garantir que o token esteja sempre presente
api.interceptors.request.use(
  config => {
    const token = 'Bearer Q0xJRU5UX0lEkKUDHAS5514DSYUdftOkVF9TRUNSRVQ=';
    config.headers['Authorization'] = token;
    config.headers['authorization'] = token;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Não autorizado');
          break;
        case 500:
          console.error('Erro no servidor');
          break;
        default:
          console.error('Erro na requisição');
      }
    }
    return Promise.reject(error);
  }
);

export default api;