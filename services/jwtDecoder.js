// services/jwtDecoder.js
import { Buffer } from 'buffer';

/**
 * Decodifica um JWT e retorna o payload
 * @param {string} token - O token JWT
 * @returns {Object|null} - O payload decodificado ou null se inválido
 */
export const decodeJWT = (token) => {
  try {
    // Remove o prefixo "Bearer " se existir
    const cleanToken = token.replace('Bearer ', '');
    
    // Divide o token em suas partes
    const parts = cleanToken.split('.');
    
    if (parts.length !== 3) {
      console.error('Token JWT inválido: deve ter 3 partes');
      return null;
    }
    
    // Decodifica o payload (segunda parte)
    const payload = parts[1];
    
    // Adiciona padding se necessário para Base64
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    
    // Decodifica de Base64
    const decodedPayload = Buffer.from(paddedPayload, 'base64').toString('utf8');
    
    // Parse do JSON
    const parsedPayload = JSON.parse(decodedPayload);
    
    return parsedPayload;
  } catch (error) {
    console.error('Erro ao decodificar JWT:', error);
    return null;
  }
};

/**
 * Verifica se o token está expirado
 * @param {string} token - O token JWT
 * @returns {boolean} - true se expirado, false caso contrário
 */
export const isTokenExpired = (token) => {
  try {
    const payload = decodeJWT(token);
    
    if (!payload || !payload.expires) {
      return true;
    }
    
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > payload.expires;
  } catch (error) {
    console.error('Erro ao verificar expiração do token:', error);
    return true;
  }
};

/**
 * Extrai informações do usuário do token JWT
 * @param {string} token - O token JWT
 * @returns {Object|null} - Informações do usuário ou null se inválido
 */
export const getUserInfoFromToken = (token) => {
  try {
    const payload = decodeJWT(token);
    
    if (!payload) {
      return null;
    }
    
    return {
      user: payload.user || '',
      userid: payload.userid || '',
      username: payload.username || 'Usuário',
      usermail: payload.usermail || '',
      expires: payload.expires || 0
    };
  } catch (error) {
    console.error('Erro ao extrair informações do usuário:', error);
    return null;
  }
};