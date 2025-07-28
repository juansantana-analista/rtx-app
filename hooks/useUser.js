// hooks/useUser.js
import { useState, useEffect } from 'react';
import { getToken } from '../services/authService';
import { getUserInfoFromToken, isTokenExpired } from '../services/jwtDecoder';

export const useUser = () => {
  const [userInfo, setUserInfo] = useState({
    user: '',
    userid: '',
    username: 'Usuário RTX',
    usermail: '',
    expires: 0,
    isAuthenticated: false,
    isLoading: true
  });

  const loadUserInfo = async () => {
    try {
      setUserInfo(prev => ({ ...prev, isLoading: true }));
      
      const token = await getToken();
      
      if (!token) {
        setUserInfo({
          user: '',
          userid: '',
          username: 'Usuário RTX',
          usermail: '',
          expires: 0,
          isAuthenticated: false,
          isLoading: false
        });
        return;
      }

      // Verifica se o token está expirado
      if (isTokenExpired(token)) {
        console.log('Token expirado');
        setUserInfo({
          user: '',
          userid: '',
          username: 'Usuário RTX',
          usermail: '',
          expires: 0,
          isAuthenticated: false,
          isLoading: false
        });
        return;
      }

      const userData = getUserInfoFromToken(token);
      
      if (userData) {
        setUserInfo({
          ...userData,
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        setUserInfo({
          user: '',
          userid: '',
          username: 'Usuário RTX',
          usermail: '',
          expires: 0,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } catch (error) {
      console.error('Erro ao carregar informações do usuário:', error);
      setUserInfo({
        user: '',
        userid: '',
        username: 'Usuário RTX',
        usermail: '',
        expires: 0,
        isAuthenticated: false,
        isLoading: false
      });
    }
  };

  const refreshUserInfo = () => {
    loadUserInfo();
  };

  const clearUserInfo = () => {
    setUserInfo({
      user: '',
      userid: '',
      username: 'Usuário RTX',
      usermail: '',
      expires: 0,
      isAuthenticated: false,
      isLoading: false
    });
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  return {
    ...userInfo,
    refreshUserInfo,
    clearUserInfo
  };
};