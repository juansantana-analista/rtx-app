# Funcionalidades de Cliente - RTX APP

## Visão Geral

Este documento descreve as funcionalidades implementadas para gerenciamento de clientes no aplicativo RTX, permitindo que Gerentes de Negócio (GN) cadastrem e gerenciem seus clientes.

## Funcionalidades Implementadas

### 1. Listagem de Clientes (`MyClientsScreen`)

**Localização:** `screens/MyClientsScreen.js`

**Funcionalidades:**
- Exibe lista de clientes do GN logado
- Mostra informações resumidas: nome, CPF, email, telefone
- Exibe dados financeiros: total investido, saldo atual, rentabilidade
- Status do cliente (ativo/inativo)
- Última atividade do cliente
- Pull-to-refresh para atualizar dados
- Skeleton loading durante carregamento
- Estado vazio quando não há clientes

**Componentes utilizados:**
- `CustomHeader` com botão de adicionar cliente
- `FloatingLoader` para loading
- Cards personalizados para cada cliente

### 2. Cadastro de Novo Cliente (`AddClientScreen`)

**Localização:** `screens/AddClientScreen.js`

**Funcionalidades:**
- Formulário completo de cadastro
- Validação de campos obrigatórios
- Validação de CPF único
- Validação de email
- Formatação automática de CPF, telefone e valores
- Seleção de plano de investimento
- Modal de confirmação antes do cadastro
- Integração com API para persistência

**Campos do formulário:**
- **Informações Pessoais:**
  - Nome completo (obrigatório)
  - CPF (obrigatório, com validação)
  - Email (obrigatório, com validação)
  - Telefone (obrigatório)

- **Endereço:**
  - Endereço completo
  - Cidade
  - Estado
  - CEP

- **Informações de Investimento:**
  - Plano escolhido (obrigatório)
  - Investimento inicial (obrigatório)

- **Observações:**
  - Campo de texto livre para observações

### 3. Modal de Confirmação (`ClientConfirmationModal`)

**Localização:** `components/ClientConfirmationModal.js`

**Funcionalidades:**
- Exibe todos os dados do cliente antes do cadastro
- Formatação adequada dos dados
- Confirmação dupla para evitar erros
- Interface responsiva e acessível

### 4. Serviços de Cliente (`clientService.js`)

**Localização:** `services/clientService.js`

**Métodos implementados:**
- `getClients(gnId)` - Buscar clientes do GN
- `createClient(clientData)` - Cadastrar novo cliente
- `getClientDetails(clientId)` - Buscar detalhes de um cliente
- `updateClient(clientId, clientData)` - Atualizar dados do cliente
- `getAvailablePlans()` - Buscar planos disponíveis
- `getClientInvestments(clientId)` - Buscar investimentos do cliente
- `getClientTransactionHistory(clientId)` - Buscar histórico de transações
- `validateUniqueCPF(cpf, excludeClientId)` - Validar CPF único
- `getClientStatistics(gnId)` - Buscar estatísticas dos clientes

### 5. Hook Personalizado (`useClients.js`)

**Localização:** `hooks/useClients.js`

**Funcionalidades:**
- Gerenciamento de estado dos clientes
- Operações CRUD centralizadas
- Cache local de dados
- Tratamento de erros
- Loading states
- Estatísticas dos clientes

**Métodos disponíveis:**
- `clients` - Lista de clientes
- `isLoading` - Estado de carregamento
- `error` - Erro atual
- `statistics` - Estatísticas dos clientes
- `fetchClients()` - Buscar clientes
- `addClient(clientData)` - Adicionar cliente
- `getClient(clientId)` - Buscar cliente específico
- `updateClientData(clientId, clientData)` - Atualizar cliente
- `updateClientInList(clientId, updatedData)` - Atualizar na lista local
- `removeClientFromList(clientId)` - Remover da lista local

## Estrutura de Dados

### Cliente
```javascript
{
  id: number,
  name: string,
  cpf: string,
  email: string,
  phone: string,
  address?: string,
  city?: string,
  state?: string,
  zipCode?: string,
  plan: string,
  initialInvestment: number,
  notes?: string,
  totalInvested: number,
  totalBalance: number,
  yield: number,
  status: 'active' | 'inactive',
  lastActivity: string,
  gnId: number
}
```

### Plano
```javascript
{
  id: string,
  name: string,
  description: string
}
```

## Navegação

### Fluxo de Navegação
1. **Home** → **Meus Clientes** (botão no menu lateral)
2. **Meus Clientes** → **Novo Cliente** (botão + no header)
3. **Novo Cliente** → **Confirmação** (modal)
4. **Confirmação** → **Meus Clientes** (após cadastro)

### Rotas no App.js
- `myClients` - Tela de listagem de clientes
- `addClient` - Tela de cadastro de novo cliente
- `clientDetails` - Tela de detalhes do cliente (já existente)

## Validações Implementadas

### CPF
- Formato: XXX.XXX.XXX-XX
- Validação de dígitos verificadores
- Verificação de CPF único no sistema
- Prevenção de CPFs com dígitos iguais

### Email
- Formato válido de email
- Validação de domínio

### Telefone
- Formato: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
- Apenas números permitidos

### Investimento Inicial
- Valor maior que zero
- Formatação em reais (R$)
- Validação de formato numérico

## Estilos e Temas

### Arquivos de Estilo
- `styles/MyClientsStyles.js` - Estilos da tela de clientes
- `styles/AddClientStyles.js` - Estilos da tela de cadastro
- `styles/ClientConfirmationModalStyles.js` - Estilos do modal

### Características
- Design responsivo
- Suporte a tema claro/escuro
- Cores consistentes com o design system
- Animações suaves
- Estados de loading e erro

## Integração com API

### Endpoints Utilizados
- `Cliente.listarClientes` - Listar clientes do GN
- `Cliente.cadastrarCliente` - Cadastrar novo cliente
- `Cliente.obterDetalhesCliente` - Buscar detalhes
- `Cliente.atualizarCliente` - Atualizar cliente
- `Cliente.validarCPFUnico` - Validar CPF
- `Cliente.obterEstatisticasClientes` - Buscar estatísticas
- `Plano.listarPlanos` - Listar planos disponíveis

### Tratamento de Erros
- Validação de conectividade
- Mensagens de erro amigáveis
- Fallback para dados mockados (desenvolvimento)
- Retry automático em caso de falha

## Próximas Implementações

### Funcionalidades Planejadas
1. **Edição de Cliente** - Permitir editar dados do cliente
2. **Busca e Filtros** - Buscar clientes por nome, CPF, etc.
3. **Detalhes Avançados** - Mais informações sobre investimentos
4. **Relatórios** - Relatórios de performance dos clientes
5. **Notificações** - Alertas sobre clientes
6. **Exportação** - Exportar dados dos clientes

### Melhorias Técnicas
1. **Cache Offline** - Armazenar dados localmente
2. **Sincronização** - Sincronizar dados quando online
3. **Performance** - Otimizar carregamento de listas grandes
4. **Acessibilidade** - Melhorar suporte a leitores de tela

## Como Usar

### Para Desenvolvedores
1. Importe o hook `useClients` onde precisar gerenciar clientes
2. Use os componentes `MyClientsScreen` e `AddClientScreen`
3. Configure as rotas no `App.js`
4. Implemente os endpoints da API conforme especificado

### Para Usuários (GN)
1. Acesse "Meus Clientes" no menu lateral
2. Clique no botão "+" para adicionar novo cliente
3. Preencha os dados obrigatórios
4. Confirme os dados no modal
5. Cliente será cadastrado e aparecerá na lista

## Considerações de Segurança

- Validação de CPF no frontend e backend
- Verificação de permissões do GN
- Sanitização de dados de entrada
- Logs de auditoria para operações críticas
- Criptografia de dados sensíveis
