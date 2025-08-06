import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { getToken, storeToken, removeToken, validateToken, login as authServiceLogin } from '../services/authService';
import { validateDevice, registerFace, saveDevice } from '../services/deviceValidationService';
import DeviceService from '../services/deviceService';
import { registerGlobalLogout } from '../services/globalLogout';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [deviceValidated, setDeviceValidated] = useState(false);
  const [needsDeviceValidation, setNeedsDeviceValidation] = useState(false);
  const [hasFace, setHasFace] = useState(false);

  let globalLogout = null;

  // Verifica se o token está válido
  const checkTokenValidity = async (token) => {
    try {
      // Decodifica o JWT para verificar se expirou
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      if (payload.exp < currentTime) {
        return false;
      }
      
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
      // Erro ao decodificar JWT
      return null;
    }
  }

  // Valida o dispositivo após login bem-sucedido
  const validateDeviceAccess = async (userData) => {
    try {
      // Iniciando validação do dispositivo
      
      // Obter UUID do dispositivo
      const deviceUUID = await DeviceService.getDeviceUUID();
      // UUID do dispositivo obtido
      
      // Validar dispositivo na API
      const validation = await validateDevice(userData.pessoaid, deviceUUID);
      
      if (validation.valid) {
        // Dispositivo validado com sucesso
        setDeviceValidated(true);
        setNeedsDeviceValidation(false);
        setHasFace(validation.has_face);
        return { valid: true, hasFace: validation.has_face };
      } else {
        // Verificar se o usuário tem face cadastrada
        if (!validation.has_face) {
          // Primeiro acesso - precisa cadastrar face
          setDeviceValidated(false);
          setNeedsDeviceValidation(true);
          setHasFace(false);
          return { valid: false, hasFace: false, needsFaceRegistration: true };
        } else {
          // Dispositivo não autorizado, mas tem face cadastrada
          setDeviceValidated(false);
          setNeedsDeviceValidation(true);
          setHasFace(true);
          return { valid: false, hasFace: true, needsFaceRegistration: false };
        }
      }
    } catch (error) {
      // Erro silencioso - não afeta a funcionalidade
      // Erro silencioso - não afeta a funcionalidade
      setDeviceValidated(false);
      setNeedsDeviceValidation(true);
      setHasFace(false);
      return { valid: false, hasFace: false, needsFaceRegistration: false };
    }
  };

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
              pessoaid: decoded.pessoaid || decoded.pessoa_id || '2', // Fallback para pessoaid
              is_gn: decoded.is_gn || false,
            };
            setUser(userData);

            // Validar dispositivo automaticamente
            const deviceValidation = await validateDeviceAccess(userData);
            // O resultado é usado internamente para definir os estados
          } else {
            setUser(null);
          }
        } else {
          // Token inválido, remove do storage
          await removeToken();
          setToken(null);
          setIsAuthenticated(false);
          setUser(null);
          setDeviceValidated(false);
          setNeedsDeviceValidation(false);
        }
      } else {
        setIsAuthenticated(false);
        setToken(null);
        setUser(null);
        setDeviceValidated(false);
        setNeedsDeviceValidation(false);
      }
    } catch (error) {
      console.error('Erro ao inicializar autenticação:', error);
      setIsAuthenticated(false);
      setToken(null);
      setUser(null);
      setDeviceValidated(false);
      setNeedsDeviceValidation(false);
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
        // Armazena o token
        const tokenStored = await storeToken(result.data);
        
        if (tokenStored) {
          setToken(result.data);
          setIsAuthenticated(true);
          
          // Decodifica o JWT para pegar os dados reais do usuário
          const decoded = decodeJWT(result.data);
          if (decoded) {
            const userData = {
              id: decoded.userid,
              name: decoded.username,
              email: decoded.usermail,
              cpf: decoded.user,
              pessoaid: decoded.pessoaid || decoded.pessoa_id || '2', // Fallback para pessoaid
              is_gn: decoded.is_gn || false,
            };
            setUser(userData);

            // Validar dispositivo após login
            const deviceValidation = await validateDeviceAccess(userData);
            
            return { 
              success: true, 
              data: decoded,
              deviceValidated: deviceValidation.valid 
            };
          } else {
            setUser(null);
            return { success: false, error: 'Erro ao processar dados do usuário' };
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
          return { success: false, error: 'Erro ao salvar token' };
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        return { success: false, error: result.data || 'Credenciais inválidas' };
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      return { success: false, error: 'Erro de conexão' };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout do usuário
  const logout = async () => {
    try {
      await removeToken();
      setToken(null);
      setIsAuthenticated(false);
      setUser(null);
      setDeviceValidated(false);
      setNeedsDeviceValidation(false);
    } catch (error) {
      console.error('Erro no logout:', error);
      // Mesmo com erro, força o logout
      setToken(null);
      setIsAuthenticated(false);
      setUser(null);
      setDeviceValidated(false);
      setNeedsDeviceValidation(false);
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

  // Função para cadastrar face e liberar dispositivo
  const registerFaceAndCompleteValidation = async (photoUri) => {
    try {
      if (!user?.pessoaid) {
        throw new Error('Dados do usuário não disponíveis');
      }

      // Cadastrar a face
      const registrationResult = await registerFace(user.pessoaid, photoUri);
      
      if (registrationResult.registered) {
        // Face cadastrada com sucesso, agora salvar o dispositivo
        const deviceUUID = await DeviceService.getDeviceUUID();
        
        const saveResult = await saveDevice(user.pessoaid, deviceUUID);
        
        if (saveResult.success) {
          // Dispositivo salvo com sucesso - NÃO atualizar estados aqui
          // Os estados serão atualizados apenas quando o usuário clicar em "Continuar"
          return { success: true, message: 'Face cadastrada e dispositivo liberado com sucesso!' };
        } else {
          throw new Error('Erro ao salvar dispositivo após cadastro da face');
        }
      } else {
        throw new Error(registrationResult.message || 'Erro ao cadastrar face');
      }
    } catch (error) {
      throw new Error('Erro no cadastro da face: ' + error.message);
    }
  };

  // Função para revalidar dispositivo após validação bem-sucedida
  const completeDeviceValidation = () => {
    setDeviceValidated(true);
    setNeedsDeviceValidation(false);
    setHasFace(true); // Assumimos que se passou pela validação, tem face cadastrada
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
    deviceValidated,
    needsDeviceValidation,
    hasFace,
    login,
    logout,
    refreshToken,
    initializeAuth,
    completeDeviceValidation,
    registerFaceAndCompleteValidation
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