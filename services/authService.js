import api from './api';

export const login = async (credentials) => {
  try {
    console.log('Tentando login com:', credentials);
    const response = await api.post('/auth_app_homolog.php', {
      userName: credentials.userName, // Corrigido para match com o backend
      userPassword: credentials.password
    }, {
      headers: {
        'apiToken': 'Bearer Q0xJRU5UX0lEkKUDHAS5514DSYUdftOkVF9TRUNSRVQ='
      }
    });
    console.log('Resposta do servidor:', response.data);

    return {
      status: 'success',
      data: response.data
    };
  } catch (error) {
    if (error.response) {
      return {
        status: 'error',
        message: error.response.data.error || 'Erro na autenticação'
      };
    }
    return {
      status: 'error',
      message: 'Erro de conexão'
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
