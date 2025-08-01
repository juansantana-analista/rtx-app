# RTX-APP

## 📱 Visão Geral
O **RTX-APP** é um aplicativo React Native completo para gestão de investimentos, desenvolvido com foco em experiência do usuário, segurança e funcionalidades avançadas. O app oferece uma plataforma completa para investidores gerenciarem seus aportes, acompanharem rentabilidades e acessarem informações do mercado financeiro.

---

## 🚀 Funcionalidades Principais

### 🔐 **Sistema de Autenticação**
- **Login seguro** com CPF/CNPJ e senha
- **Autenticação JWT** com persistência de sessão
- **Biometria opcional** para acesso rápido
- **Logout global** com limpeza automática de dados
- **Validação de token** com redirecionamento automático
- **Controle de perfil** (Gerente de Negócios vs Cliente)

### 🏠 **Tela Inicial (HomeScreen)**
- **Saldo total em operação** com visibilidade controlada
- **Meus Investimentos** - Cards com produtos ativos do usuário
- **Preview de Notícias** - Últimas 4 notícias em scroll horizontal
- **Menu de ações rápidas**: Aporte, Notícias, Escritórios
- **Card de Participação Disponível** com período de disponibilidade
- **Navegação intuitiva** com FloatingBottomNav

### 💰 **Tela de Carteira (WalletScreen)**
- **Saldo total em operação** com título descritivo
- **Saldo disponível para resgate** com controle independente de visibilidade
- **Cartões de investimento** estilo cartão de crédito com:
  - Logo da empresa
  - Nome do produto
  - Valor investido (ocultável)
  - Período e rentabilidade
  - Status ativo/inativo
- **Funcionalidade de Resgate** com modal bottom sheet:
  - Seleção de valor ou porcentagem
  - Botões de sugestão (25%, 50%, 75%, 100%)
  - Confirmação com modal de sucesso animado
- **Extrato de transações** com histórico completo
- **Botão "+ Novo Aporte"** para investimentos
- **Opção de impressão** do extrato em PDF

### 📈 **Tela de Aportes (AportesScreen)**
- **Fluxo unificado** de investimento (valor → produto → pagamento)
- **Seleção de valor** com máscara de moeda em tempo real
- **Catálogo de produtos** com informações detalhadas:
  - DEMO, PRIVATE, PRO, SELECT, EVOLVE, ABSOLUTE
  - Rentabilidade, período, risco e valor mínimo
- **Métodos de pagamento**:
  - **PIX** com QR Code e código copia e cola
  - **Transferência bancária** com dados da conta
- **Upload de comprovantes** (imagens e documentos)
- **Validação automática** de valores mínimos
- **Auto-scroll** para botão de confirmação

### 📰 **Tela de Notícias (NewsScreen)**
- **Categorias de notícias** com filtros
- **Pull-to-refresh** para atualização
- **Cards de notícias** com:
  - Imagem destacada
  - Categoria e tempo de leitura
  - Data de publicação
  - Título e resumo
- **Notícias em destaque** com badge especial
- **Navegação fluida** entre notícias

### 🏢 **Tela de Escritórios (OfficesScreen)**
- **Lista de escritórios** da empresa
- **Informações completas**:
  - Foto do escritório
  - Endereço completo
  - Telefone e email
  - Horário de funcionamento
- **Ações rápidas**:
  - Ligar diretamente
  - Abrir WhatsApp
  - Enviar email
- **Pull-to-refresh** para atualização
- **Integração com API** `EscritorioRestService.loadAll`

### 📄 **Tela de Extrato PDF (ExtractPdfScreen)**
- **Extrato completo** em formato PDF
- **Informações detalhadas**:
  - Dados do cliente
  - Resumo financeiro
  - Histórico de transações
  - Totais e saldos
- **Funcionalidades de exportação**:
  - Download do PDF
  - Compartilhamento
  - Impressão
- **Design profissional** similar a bancos digitais

### 👤 **Tela de Perfil (ProfileScreen)**
- **Dados pessoais** do usuário
- **Configurações** da conta
- **Preferências** de privacidade
- **Histórico** de atividades

### 👥 **Tela Meus Clientes (MyClientsScreen)** - *Apenas para Gerentes de Negócios*
- **Lista de clientes** do gerente
- **Resumo financeiro** consolidado
- **Status dos clientes** (ativo/inativo)
- **Informações de contato** e valores investidos
- **Pull-to-refresh** para atualização
- **Busca e filtros** (futuro)

### 📋 **Tela Detalhes do Cliente (ClientDetailsScreen)** - *Apenas para Gerentes de Negócios*
- **Informações completas** do cliente
- **Resumo financeiro** detalhado
- **Lista de investimentos** com rentabilidades
- **Histórico de transações** completo
- **Ações de contato** (ligar, WhatsApp, email)
- **Dados de cadastro** e última atividade

### 📊 **Tela de Investimentos (InvestmentsScreen)**
- **Visão detalhada** dos investimentos
- **Análises** e relatórios
- **Comparativos** de rentabilidade
- **Projeções** futuras

---

## 🛠️ Arquitetura Técnica

### **Estrutura de Requisições**
- **API Centralizada** (`services/api.js`)
- **Função genérica** `apiRequest({ classe, metodo, params })`
- **Autenticação automática** com JWT
- **Tratamento de erros** centralizado
- **Interceptors** para respostas HTTP

### **Sistema de Autenticação**
- **Context API** (`constants/AuthContext.js`)
- **Persistência** com AsyncStorage
- **Decodificação JWT** automática
- **Validação de token** periódica
- **Logout global** (`services/globalLogout.js`)

### **Gerenciamento de Estado**
- **Context para tema** (`constants/ThemeContext.js`)
- **Context para autenticação** (`constants/AuthContext.js`)
- **Estados locais** com useState
- **Efeitos** com useEffect para sincronização

### **Navegação**
- **Sistema customizado** sem React Navigation
- **FloatingBottomNav** para navegação principal
- **SideMenu** para opções adicionais
- **Modais** para ações específicas

---

## 📁 Estrutura do Projeto

```
RTX-APP/
├── 📱 screens/                    # Telas principais
│   ├── HomeScreen.js             # Tela inicial
│   ├── WalletScreen.js           # Carteira e investimentos
│   ├── AportesScreen.js          # Fluxo de aportes
│   ├── NewsScreen.js             # Notícias do mercado
│   ├── OfficesScreen.js          # Escritórios da empresa
│   ├── ExtractPdfScreen.js       # Extrato em PDF
│   ├── ProfileScreen.js          # Perfil do usuário
│   ├── MyClientsScreen.js        # Clientes do Gerente de Negócios
│   ├── ClientDetailsScreen.js    # Detalhes do cliente
│   ├── InvestmentsScreen.js      # Detalhes de investimentos
│   └── LoginScreen.js            # Autenticação
├── 🧩 components/                 # Componentes reutilizáveis
│   ├── CustomHeader.js           # Header personalizado
│   ├── FloatingBottomNav.js      # Navegação inferior
│   ├── SideMenu.js               # Menu lateral
│   ├── NavigationMenu.js         # Menu de navegação
│   ├── SplashScreen.js           # Tela de carregamento
│   └── LoadingScreen.js          # Componente de loading
├── 🔧 services/                   # Serviços e APIs
│   ├── api.js                    # Requisições genéricas
│   ├── authService.js            # Autenticação
│   ├── globalLogout.js           # Logout global
│   └── jwtDecoder.js             # Decodificação JWT
├── 🎨 styles/                     # Estilos das telas
│   ├── HomeStyles.js             # Estilos da Home
│   ├── WalletStyles.js           # Estilos da Carteira
│   ├── AportesStyles.js          # Estilos de Aportes
│   ├── NewsStyles.js             # Estilos de Notícias
│   ├── OfficesStyles.js          # Estilos de Escritórios
│   ├── ExtractPdfStyles.js       # Estilos do Extrato
│   ├── ProfileStyles.js          # Estilos do Perfil
│   ├── MyClientsStyles.js        # Estilos dos Clientes
│   ├── ClientDetailsStyles.js    # Estilos dos Detalhes do Cliente
│   ├── InvestmentsStyles.js      # Estilos de Investimentos
│   ├── LoginStyles.js            # Estilos do Login
│   └── FloatingBottomNavStyles.js # Estilos da navegação
├── 🔄 constants/                  # Contextos e constantes
│   ├── AuthContext.js            # Contexto de autenticação
│   ├── ThemeContext.js           # Contexto de tema
│   ├── colors.js                 # Paleta de cores
│   └── apiTypes.js               # Tipos da API
├── 🎣 hooks/                      # Hooks customizados
│   ├── useNavigationBar.js       # Hook de navegação
│   └── useUser.js                # Hook de usuário
├── 🛠️ utils/                      # Utilitários
│   └── SystemUIManager.js        # Gerenciamento de UI
└── 📦 assets/                     # Recursos visuais
    ├── icon.png                  # Ícone do app
    ├── splash-icon.png           # Ícone de splash
    ├── logortx.png               # Logo RTX
    ├── rtx-x.png                 # Logo RTX X
    └── user.png                  # Avatar padrão
```

---

## 🎨 Sistema de Design

### **Temas e Cores**
- **Tema claro/escuro** com toggle automático
- **Paleta de cores** consistente
- **Tipografia** padronizada
- **Espaçamentos** uniformes
- **Sombras e elevações** consistentes

### **Componentes Visuais**
- **Cards** com bordas arredondadas
- **Botões** com estados visuais
- **Modais** com animações suaves
- **Loading states** informativos
- **Feedback visual** para ações

### **Responsividade**
- **Layout adaptativo** para diferentes telas
- **Scroll views** otimizados
- **Touch targets** adequados
- **Acessibilidade** considerada

---

## 🔌 Integração com APIs

### **Endpoints Principais**
```javascript
// Autenticação
POST /rest.php (class: 'AuthRestService', method: 'login')

// Carteira
POST /rest.php (class: 'CarteiraRestService', method: 'getCarteirasUsuario')

// Escritórios
POST /rest.php (class: 'EscritorioRestService', method: 'loadAll')

// Aportes
POST /rest.php (class: 'AporteRestService', method: 'create')

// Resgates
POST /rest.php (class: 'ResgateRestService', method: 'create')
```

### **Estrutura de Resposta**
```javascript
{
  "status": "success",
  "data": {
    "saldo": "2977",
    "saldo_bloqueado": "198497", 
    "saldo_total": "201474",
    "rentabilidade_acumulada": "0",
    "data_ultima_movimentacao": "2025-07-29"
  }
    }
    ```

---

## 🚀 Como Executar

### **Pré-requisitos**
- Node.js 16+
- Expo CLI
- React Native development environment

### **Instalação**
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Instale as dependências
npm install

# Execute o projeto
expo start
```

### **Dependências Principais**
```json
{
  "expo": "^49.0.0",
  "react-native": "0.72.6",
  "@expo/vector-icons": "^13.0.0",
  "expo-document-picker": "~11.5.4",
  "expo-file-system": "~15.4.5",
  "expo-print": "~12.4.1",
  "expo-sharing": "~11.5.0",
  "@react-native-async-storage/async-storage": "1.18.2"
}
  ```

---

## 🔧 Funcionalidades Avançadas

### **Sistema de Modais**
- **Bottom sheet modais** para ações
- **Modais de confirmação** com animações
- **Modais de sucesso** com feedback visual
- **Controle de visibilidade** da navegação

### **Upload de Arquivos**
- **Seleção de imagens** e documentos
- **Preview** de arquivos selecionados
- **Validação** de tipos e tamanhos
- **Upload** para servidor

### **Geração de PDFs**
- **Extrato completo** em formato PDF
- **Design profissional** similar a bancos
- **Download** e compartilhamento
- **Compatibilidade** multiplataforma

### **Animações**
- **Transições suaves** entre telas
- **Animações de loading** personalizadas
- **Feedback visual** para interações
- **Modais animados** com entrada/saída

---

## 🛡️ Segurança

### **Autenticação**
- **JWT tokens** com expiração
- **Validação** automática de sessão
- **Logout** automático em caso de expiração
- **Proteção** de rotas sensíveis

### **Dados Sensíveis**
- **Ocultação** de valores monetários
- **Controle de visibilidade** independente
- **Criptografia** de dados locais
- **Limpeza** automática no logout

### **Validações**
- **Input validation** em formulários
- **Sanitização** de dados
- **Tratamento de erros** robusto
- **Feedback** de validação

---

## 📱 Experiência do Usuário

### **Navegação Intuitiva**
- **FloatingBottomNav** sempre acessível
- **SideMenu** para opções avançadas
- **Breadcrumbs** visuais
- **Feedback** de navegação

### **Performance**
- **Lazy loading** de componentes
- **Otimização** de imagens
- **Cache** de dados
- **Loading states** informativos

### **Acessibilidade**
- **Touch targets** adequados
- **Contraste** de cores
- **Feedback** tátil
- **Navegação** por teclado

---

## 🔄 Fluxos Principais

### **Fluxo de Aporte**
1. Usuário seleciona valor do aporte
2. Escolhe produto de investimento
3. Seleciona método de pagamento (PIX/Transferência)
4. Faz upload do comprovante
5. Confirma o aporte
6. Recebe confirmação

### **Fluxo de Resgate**
1. Usuário acessa carteira
2. Clica em "Resgatar"
3. Seleciona valor ou porcentagem
4. Confirma o resgate
5. Recebe confirmação de sucesso

### **Fluxo de Notícias**
1. Usuário acessa notícias
2. Filtra por categoria (opcional)
3. Lê notícias em destaque
4. Acessa notícia completa
5. Compartilha (opcional)

---

## 🎯 Próximas Funcionalidades

### **Planejadas**
- [ ] **Push notifications** para atualizações
- [ ] **Biometria** para login rápido
- [ ] **Offline mode** para dados básicos
- [ ] **Analytics** de uso
- [ ] **Testes automatizados**
- [ ] **PWA** para web

### **Melhorias**
- [ ] **Performance** otimizada
- [ ] **Acessibilidade** aprimorada
- [ ] **Internacionalização** (i18n)
- [ ] **Temas customizáveis**
- [ ] **Modo escuro** automático

---

## 📞 Suporte

Para dúvidas, sugestões ou problemas:
- **Email**: suporte@rtx.com.br
- **Telefone**: (11) 9999-9999
- **Documentação**: [docs.rtx.com.br](https://docs.rtx.com.br)

---

## 📄 Licença

Este projeto é proprietário da RTX Investimentos. Todos os direitos reservados.

---

*Desenvolvido com ❤️ pela equipe RTX*