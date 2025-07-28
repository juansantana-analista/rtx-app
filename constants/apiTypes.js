/**
 * Tipos de resposta da API de autenticação
 */

/**
 * @typedef {Object} LoginResponse
 * @property {'success'|'error'} status - Status da resposta
 * @property {string} [data] - Token JWT quando status for 'success'
 * @property {string} [message] - Mensagem de erro quando status for 'error'
 */

/**
 * @typedef {Object} LoginCredentials 
 * @property {string} username - Nome de usuário
 * @property {string} password - Senha do usuário
 */

/**
 * @typedef {Object} ErrorResponse
 * @property {'error'} status
 * @property {string} data - Mensagem de erro
 */

/**
 * @typedef {Object} ValidationResponse
 * @property {boolean} isValid - Indica se o token é válido
 * @property {string} [username] - Nome do usuário (se válido)
 * @property {number} [expires] - Timestamp de expiração
 */
