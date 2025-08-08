import { apiRequest } from './api';

// Buscar clientes do GN
export const getClients = async (gnId) => {
  try {
    const requestData = {
      classe: 'Cliente',
      metodo: 'listarClientes',
      params: { gnId }
    };

    const response = await apiRequest(requestData);

    if (response.success) {
      return response.data || [];
    } else {
      throw new Error(response.message || 'Erro ao buscar clientes');
    }
  } catch (error) {
    throw error;
  }
};

// Cadastrar novo cliente
export const createClient = async (clientData) => {
  try {
    const response = await apiRequest({
      classe: 'Cliente',
      metodo: 'cadastrarCliente',
      params: clientData
    });

    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Erro ao cadastrar cliente');
    }
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    throw error;
  }
};

// Buscar detalhes de um cliente específico
export const getClientDetails = async (clientId) => {
  try {
    const response = await apiRequest({
      classe: 'Cliente',
      metodo: 'obterDetalhesCliente',
      params: { clientId }
    });

    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Erro ao buscar detalhes do cliente');
    }
  } catch (error) {
    console.error('Erro ao buscar detalhes do cliente:', error);
    throw error;
  }
};

// Atualizar dados do cliente
export const updateClient = async (clientId, clientData) => {
  try {
    const response = await apiRequest({
      classe: 'Cliente',
      metodo: 'atualizarCliente',
      params: { clientId, ...clientData }
    });

    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Erro ao atualizar cliente');
    }
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw error;
  }
};

// Buscar planos disponíveis
export const getAvailablePlans = async () => {
  try {
    const response = await apiRequest({
      classe: 'Plano',
      metodo: 'listarPlanos',
      params: {}
    });

    if (response.success) {
      return response.data || [];
    } else {
      throw new Error(response.message || 'Erro ao buscar planos');
    }
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    throw error;
  }
};

// Buscar investimentos do cliente
export const getClientInvestments = async (clientId) => {
  try {
    const response = await apiRequest({
      classe: 'Cliente',
      metodo: 'obterInvestimentosCliente',
      params: { clientId }
    });

    if (response.success) {
      return response.data || [];
    } else {
      throw new Error(response.message || 'Erro ao buscar investimentos do cliente');
    }
  } catch (error) {
    console.error('Erro ao buscar investimentos do cliente:', error);
    throw error;
  }
};

// Buscar histórico de transações do cliente
export const getClientTransactionHistory = async (clientId) => {
  try {
    const response = await apiRequest({
      classe: 'Cliente',
      metodo: 'obterHistoricoTransacoes',
      params: { clientId }
    });

    if (response.success) {
      return response.data || [];
    } else {
      throw new Error(response.message || 'Erro ao buscar histórico de transações');
    }
  } catch (error) {
    console.error('Erro ao buscar histórico de transações:', error);
    throw error;
  }
};

// Validar CPF único
export const validateUniqueCPF = async (cpf, excludeClientId = null) => {
  try {
    const response = await apiRequest({
      classe: 'Cliente',
      metodo: 'validarCPFUnico',
      params: { cpf, excludeClientId }
    });

    if (response.success) {
      return response.data.isUnique;
    } else {
      throw new Error(response.message || 'Erro ao validar CPF');
    }
  } catch (error) {
    console.error('Erro ao validar CPF:', error);
    throw error;
  }
};

// Buscar estatísticas dos clientes do GN
export const getClientStatistics = async (gnId) => {
  try {
    const requestData = {
      classe: 'Cliente',
      metodo: 'obterEstatisticasClientes',
      params: { gnId }
    };

    const response = await apiRequest(requestData);

    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Erro ao buscar estatísticas');
    }
  } catch (error) {
    throw error;
  }
};
