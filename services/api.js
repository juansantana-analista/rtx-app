import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rtx.tecskill.com.br',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(config => {
  const token = 'Bearer Q0xJRU5UX0lEkKUDHAS5514DSYUdftOkVF9TRUNSRVQ=';
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Tratamento específico por status code
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
