import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { getToken, storeToken, removeToken, validateToken, login as authServiceLogin } from '../services/authService';
import { registerGlobalLogout } from '../services/globalLogout';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  let globalLogout = null;

  // Verifica se o token está válido
  const checkTokenValidity = async (token) => {
    try {
      // Decodifica o JWT para verificar se expirou
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      if (payload.exp < currentTime) {
        console.log('Token expirado');
        return false;
      }
      
      // Aqui você pode adicionar uma chamada para validar o token no servidor
      // const response = await validateToken(token);
      // return response.valid;
      
      return true;
    } catch (error) {
      console.error('Erro ao validar token:', error);
      return false;
    }
  };

  // Função para decodificar JWT (base64)
  function decodeJWT(token) {
    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('❌ Erro ao decodificar JWT:', e);
      return null;
    }
  }

  // Inicializa a autenticação ao abrir o app
  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      
      const storedToken = await getToken();
      
      if (storedToken) {
        const isValid = await checkTokenValidity(storedToken);
        
        if (isValid) {
          setToken(storedToken);
          setIsAuthenticated(true);
                     // Decodifica o JWT restaurado e popula o user
           const decoded = decodeJWT(storedToken);
           if (decoded) {
             const userData = {
               id: decoded.userid,
               name: decoded.username,
               email: decoded.usermail,
               cpf: decoded.user,
               is_gn: decoded.is_gn || false,
             };
             setUser(userData);
           } else {
             setUser(null);
           }
          // Aqui você pode buscar dados do usuário se necessário
          // const userData = await getUserData(storedToken);
          // setUser(userData);
        } else {
          // Token inválido, remove do storage
          await removeToken();
          setToken(null);
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false); // <-- Finaliza loading imediatamente após logout
          return; // <-- Sai da função para não setar loading novamente
        }
      } else {
        setIsAuthenticated(false);
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Erro ao inicializar autenticação:', error);
      setIsAuthenticated(false);
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login do usuário
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      
      // Usa o authService que já está configurado corretamente
      const result = await authServiceLogin(credentials);
      
      if (result.status === 'success' && result.data) {
        // Decodificar o JWT
        const decoded = decodeJWT(result.data);
        
        // Verificar se o dispositivo está liberado
        if (decoded && decoded.dispositivo === false) {
          // Dispositivo não liberado - mostrar tela de ativação
          setIsLoading(false);
          return { 
            success: true, 
            data: {
              ...decoded,
              token: result.data
            },
            requiresDeviceActivation: true 
          };
        }
        
        // Dispositivo liberado - fazer login normal
        const tokenStored = await storeToken(result.data);
        
        if (tokenStored) {
          setToken(result.data);
          setIsAuthenticated(true);
          
          if (decoded) {
            const userData = {
              id: decoded.userid,
              name: decoded.username,
              email: decoded.usermail,
              cpf: decoded.user,
              is_gn: decoded.is_gn || false,
            };
            setUser(userData);
          }
          
          return { success: true, data: decoded };
        } else {
          return { success: false, error: 'Erro ao salvar token' };
        }
      } else {
        return { success: false, error: result.data || 'Credenciais inválidas' };
      }
    } catch (error) {
      return { success: false, error: 'Erro de conexão' };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout do usuário
  const logout = async () => {
    try {
      console.log('Executando logout...');
      await removeToken();
      setToken(null);
      setIsAuthenticated(false);
      setUser(null);
      console.log('Logout concluído com sucesso');
    } catch (error) {
      console.error('Erro no logout:', error);
      // Mesmo com erro, força o logout
      setToken(null);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Renova o token (se necessário)
  const refreshToken = async () => {
    try {
      if (!token) return false;
      
      const isValid = await checkTokenValidity(token);
      
      if (!isValid) {
        await logout();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      await logout();
      return false;
    }
  };

  // Inicializa a autenticação quando o app é aberto
  useEffect(() => {
    initializeAuth();
  }, []);

  // Verifica periodicamente se o token ainda é válido
  useEffect(() => {
    if (isAuthenticated && token) {
      const interval = setInterval(async () => {
        const isValid = await checkTokenValidity(token);
        if (!isValid) {
          console.log('Token expirado na verificação periódica - Forçando logout');
          await logout();
        }
      }, 30000); // Verifica a cada 30 segundos

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, token]);



  useEffect(() => {
    registerGlobalLogout(logout);
  }, [logout]);

  const value = {
    isAuthenticated,
    isLoading,
    user,
    token,
    login,
    logout,
    refreshToken,
    initializeAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 