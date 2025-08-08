import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../constants/AuthContext';

// Dados mockados temporários para clientes
const mockClients = [
  {
    id: 1,
    name: 'João Silva',
    cpf: '123.456.789-00',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    status: 'active',
    plan: 'Plano Premium',
    initialInvestment: 5000.00,
    totalInvested: 5000.00,
    currentBalance: 5500.00,
    totalBalance: 5500.00,
    yield: 10.0,
    lastActivity: '2024-01-15',
    registrationDate: '2024-01-01'
  },
  {
    id: 2,
    name: 'Maria Santos',
    cpf: '987.654.321-00',
    email: 'maria.santos@email.com',
    phone: '(11) 88888-8888',
    status: 'active',
    plan: 'Plano Básico',
    initialInvestment: 2000.00,
    totalInvested: 2000.00,
    currentBalance: 2100.00,
    totalBalance: 2100.00,
    yield: 5.0,
    lastActivity: '2024-01-14',
    registrationDate: '2024-01-05'
  },
  {
    id: 3,
    name: 'Pedro Oliveira',
    cpf: '456.789.123-00',
    email: 'pedro.oliveira@email.com',
    phone: '(11) 77777-7777',
    status: 'inactive',
    plan: 'Plano Standard',
    initialInvestment: 3000.00,
    totalInvested: 3000.00,
    currentBalance: 3000.00,
    totalBalance: 3000.00,
    yield: 0.0,
    lastActivity: '2024-01-10',
    registrationDate: '2024-01-03'
  }
];

// Estatísticas mockadas
const mockStatistics = {
  totalClients: 3,
  activeClients: 2,
  inactiveClients: 1,
  totalInvested: 10000.00,
  totalCurrentBalance: 10600.00,
  averageInvestment: 3333.33
};

export const useClients = () => {
  const { user, isAuthenticated } = useAuth();
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [statistics, setStatistics] = useState(null);

  // Buscar clientes (mockado temporariamente)
  const fetchClients = useCallback(async () => {
    if (!isAuthenticated || !user?.id) {
      setClients([]);
      setError('');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setClients(mockClients);
    } catch (error) {
      setError('Erro ao carregar clientes. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user?.id]);

  // Buscar estatísticas (mockado temporariamente)
  const fetchStatistics = useCallback(async () => {
    if (!isAuthenticated || !user?.id) {
      setStatistics(null);
      return;
    }
    
    try {
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 500));
      setStatistics(mockStatistics);
    } catch (error) {
      // noop
    }
  }, [isAuthenticated, user?.id]);

  // Adicionar novo cliente (mockado temporariamente)
  const addClient = useCallback(async (clientData) => {
    try {
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newClient = {
        id: Date.now(), // ID único baseado no timestamp
        ...clientData,
        status: 'ativo',
        registrationDate: new Date().toISOString().split('T')[0],
        lastActivity: new Date().toISOString().split('T')[0],
        currentBalance: clientData.initialInvestment || 0,
        totalInvested: clientData.initialInvestment || 0,
        totalBalance: clientData.initialInvestment || 0,
        yield: 0
      };
      
      // Atualizar lista de clientes
      setClients(prev => [newClient, ...prev]);
      return newClient;
    } catch (error) {
      throw error;
    }
  }, [fetchClients]);

  // Buscar detalhes de um cliente (mockado temporariamente)
  const getClient = useCallback(async (clientId) => {
    try {
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const client = mockClients.find(c => c.id === clientId);
      if (!client) {
        throw new Error('Cliente não encontrado');
      }
      
      return client;
    } catch (error) {
      throw error;
    }
  }, []);

  // Atualizar cliente (mockado temporariamente)
  const updateClientData = useCallback(async (clientId, clientData) => {
    try {
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedClient = { id: clientId, ...clientData };
      
      // Atualizar lista de clientes
      await fetchClients();
      return updatedClient;
    } catch (error) {
      throw error;
    }
  }, [fetchClients]);

  // Atualizar cliente na lista local
  const updateClientInList = useCallback((clientId, updatedData) => {
    setClients(prevClients => 
      prevClients.map(client => 
        client.id === clientId ? { ...client, ...updatedData } : client
      )
    );
  }, []);

  // Remover cliente da lista local
  const removeClientFromList = useCallback((clientId) => {
    setClients(prevClients => 
      prevClients.filter(client => client.id !== clientId)
    );
  }, []);

  // Carregar dados iniciais
  useEffect(() => {
    fetchClients();
    fetchStatistics();
  }, [fetchClients, fetchStatistics]);

  return {
    clients,
    isLoading,
    error,
    statistics,
    fetchClients,
    fetchStatistics,
    addClient,
    getClient,
    updateClientData,
    updateClientInList,
    removeClientFromList,
  };
};
