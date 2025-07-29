# RTX-APP

## Visão Geral
Este projeto é um app React Native que utiliza autenticação JWT e faz requisições dinâmicas para um backend PHP. O código foi estruturado para facilitar a manutenção, reutilização e expansão de funcionalidades.

---

## Estrutura de Requisições

### 1. Requisições Genéricas (API Principal)
- **Arquivo:** `services/api.js`
- **Função principal:** `apiRequest({ classe, metodo, params })`
- **Responsabilidade:**
  - Envia requisições autenticadas para a API principal (`rest.php`).
  - Usa o JWT salvo no AsyncStorage automaticamente.
  - Permite passar a classe, método e parâmetros de cada chamada.
  - Centraliza o tratamento de erros de autenticação (ex: JWT expirado).

#### Exemplo de uso:
```js
import { apiRequest } from '../services/api';

const resultado = await apiRequest({
  classe: 'CarteiraRestService',
  metodo: 'getCarteirasUsuario',
  params: { usuario_id: user.id }
});
```

- **Para adicionar novos endpoints:**
  - Basta chamar `apiRequest` com a nova classe, método e parâmetros.
- **Para tratar erros globais:**
  - Centralize no `apiRequest` para facilitar manutenção.

---

### 2. Autenticação (Login e Token)
- **Arquivo:** `services/authService.js`
- **Responsabilidade:**
  - Login do usuário (CPF/CNPJ e senha).
  - Armazena, recupera e remove o token JWT.
  - Não usa o `apiRequest`, pois o endpoint de login é diferente.
- **Funções principais:**
  - `login(credentials)`
  - `storeToken(token)`
  - `getToken()`
  - `removeToken()`

---

### 3. Contexto de Autenticação
- **Arquivo:** `constants/AuthContext.js`
- **Responsabilidade:**
  - Gerencia o estado global de autenticação e usuário.
  - Decodifica o JWT após login e ao abrir o app, preenchendo o contexto do usuário (`user`).
  - Exemplo de dados no contexto:
    ```js
    user = {
      id: decoded.userid,
      name: decoded.username,
      email: decoded.usermail,
      cpf: decoded.user,
    }
    ```

---

### 4. Exemplo prático de uso no app
- **Buscar saldo da carteira:**
  - Implementado em `HomeScreen.js` e `WalletScreen.js`:
  ```js
  import { apiRequest } from '../services/api';
  // ...
  const result = await apiRequest({
    classe: 'CarteiraRestService',
    metodo: 'getCarteirasUsuario',
    params: { usuario_id: user.id }
  });
  ```

---

## Fluxos do App

### Fluxo de Autenticação
1. Usuário faz login com CPF/CNPJ e senha.
2. O backend retorna um JWT.
3. O JWT é salvo no AsyncStorage e decodificado para preencher o contexto do usuário.
4. Ao abrir o app novamente, o JWT é restaurado e decodificado automaticamente.
5. Todas as requisições autenticadas usam esse JWT.

### Fluxo de Requisições Dinâmicas
1. O componente chama `apiRequest` passando a classe, método e parâmetros.
2. O JWT é adicionado automaticamente no header.
3. O backend responde e o resultado é tratado no componente.

### Fluxo de Exibição de Saldo
1. O componente Home ou Carteira chama `apiRequest` para buscar o saldo.
2. O saldo é exibido na tela, com loading e tratamento de erro.

---

## Funcionamento das Telas

- **`screens/HomeScreen.js`**
  - Exibe o saldo principal do usuário, atalhos, cards promocionais e oportunidades.
  - Busca o saldo dinamicamente ao montar a tela.
  - Usa o contexto de autenticação para obter o usuário logado.

- **`screens/WalletScreen.js`**
  - Exibe o saldo detalhado, breakdown de investimentos, gráfico e opções de resgate.
  - Busca o saldo dinamicamente ao montar a tela.

- **`screens/LoginScreen.js`**
  - Permite login com CPF ou CNPJ.
  - Integra biometria (opcional).
  - Salva o JWT e preenche o contexto do usuário após login.

- **`components/SideMenu.js`**
  - Exibe informações do usuário (nome, documento, email) e opções de navegação.

- **`components/FloatingBottomNav.js`**
  - Barra de navegação inferior flutuante, com ícones e labels dinâmicos.

---

## Estilização

- **Padrão:**
  - Todos os estilos ficam em arquivos separados na pasta `styles/`.
  - Cada tela ou componente tem seu próprio arquivo de estilos, por exemplo:
    - `styles/HomeStyles.js`
    - `styles/WalletStyles.js`
    - `styles/FloatingBottomNavStyles.js`
  - Os estilos são criados via função para receber o tema (cores dinâmicas).

- **Como usar:**
  ```js
  import createStyles from '../styles/HomeStyles';
  const styles = createStyles();
  // ...
  <View style={styles.container}>
  ```

- **Temas:**
  - O app suporta tema claro/escuro via contexto em `constants/ThemeContext.js`.

---

## Como Criar uma Nova Tela

1. **Crie o arquivo da tela em `screens/`:**
   - Exemplo: `screens/MinhaNovaTela.js`

2. **Crie o arquivo de estilos em `styles/`:**
   - Exemplo: `styles/MinhaNovaTelaStyles.js`

3. **Estruture o componente:**
   ```js
   import React from 'react';
   import { View, Text } from 'react-native';
   import createStyles from '../styles/MinhaNovaTelaStyles';

   const MinhaNovaTela = () => {
     const styles = createStyles();
     return (
       <View style={styles.container}>
         <Text>Minha Nova Tela</Text>
       </View>
     );
   };

   export default MinhaNovaTela;
   ```

4. **Adicione a navegação para a nova tela:**
   - Se usar React Navigation, registre a tela no seu navigator.
   - Se usar navegação manual, adicione a lógica no componente de menu ou onde desejar.

5. **Para requisições autenticadas:**
   - Importe e use `apiRequest` normalmente.

6. **Para acessar dados do usuário:**
   - Importe e use o hook `useAuth()`.

---

## Boas Práticas e Dicas de Manutenção
- **Sempre use `apiRequest` para requisições autenticadas.**
- **Para login e manipulação do token, use `authService.js`.**
- **Para acessar dados do usuário logado, use o contexto `useAuth()`.**
- **Para adicionar novos serviços:**
  - Crie funções utilitárias que usem `apiRequest` com os parâmetros adequados.
- **Para tratar erros de sessão expirada:**
  - O tratamento já está centralizado no `apiRequest`.
- **Para exibir dados do usuário:**
  - Use `user.name`, `user.cpf`, `user.email` do contexto.
- **Para garantir persistência após fechar o app:**
  - O contexto decodifica o JWT salvo ao abrir o app e preenche o usuário automaticamente.

---

## Estrutura de Pastas Relevante
```
services/
  api.js            # Função genérica para requisições autenticadas
  authService.js    # Login, armazenamento e recuperação do token JWT
constants/
  AuthContext.js    # Contexto global de autenticação e usuário
screens/
  HomeScreen.js     # Exemplo de uso do saldo dinâmico
  WalletScreen.js   # Exemplo de uso do saldo dinâmico
styles/
  HomeStyles.js     # Estilos da Home
  WalletStyles.js   # Estilos da Carteira
  ...
```

---

## Observações
- O JWT é decodificado tanto no login quanto ao abrir o app, garantindo que os dados do usuário estejam sempre disponíveis.
- Para requisições futuras, basta seguir o padrão do `apiRequest`.
- Caso o backend mude o formato do JWT ou dos endpoints, basta ajustar a decodificação e os parâmetros enviados.

---