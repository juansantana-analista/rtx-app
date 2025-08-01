import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { apiRequest } from '../services/api';

/**
 * Hook customizado para requisições API com tratamento automático de erros
 * @param {Function} onAuthError - Callback executado quando há erro de autenticação
 * @returns {Object} - { loading, error, data, executeRequest }
 */
export const useApiRequest = (onAuthError = null) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const executeRequest = useCallback(async (requestConfig) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiRequest(requestConfig);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      
      // Se for erro de autenticação, chama o callback
      if (err.message.includes('Sessão expirada') || 
          err.message.includes('Token') || 
          err.message.includes('login')) {
        console.log('Erro de autenticação detectado:', err.message);
        if (onAuthError) {
          onAuthError(err);
        }
      } else {
        // Para outros erros, mostra alerta
        Alert.alert(
          'Erro',
          err.message || 'Ocorreu um erro inesperado. Tente novamente.',
          [{ text: 'OK' }]
        );
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [onAuthError]);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    executeRequest,
    reset
  };
}; 