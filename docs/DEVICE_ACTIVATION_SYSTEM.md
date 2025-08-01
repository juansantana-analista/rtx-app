# Sistema de Ativação de Dispositivo

## Visão Geral

Este sistema implementa uma validação de segurança baseada em reconhecimento facial para ativar dispositivos. Quando um usuário faz login pela primeira vez em um dispositivo, ele precisa passar por um processo de validação de rosto para liberar o acesso.

## Fluxo do Sistema

### 1. Login Inicial
```
Usuário faz login → Sistema verifica dispositivo → 
Se dispositivo não liberado → Mostra tela de ativação
Se dispositivo liberado → Login normal
```

### 2. Processo de Ativação
```
Tela de ativação → Captura foto → Validação de rosto → 
Ativação do dispositivo → Login completo
```

## Estrutura de Arquivos

```
screens/
├── LoginScreen.js                    # Tela de login modificada
├── DeviceActivationScreen.js         # Tela de ativação de dispositivo
services/
├── authService.js                    # Serviço de autenticação (modificado)
├── faceValidationService.js          # Serviço de validação de rosto
├── deviceService.js                  # Serviço de UUID do dispositivo
constants/
├── AuthContext.js                    # Contexto de autenticação (modificado)
hooks/
├── useDeviceUUID.js                  # Hook para UUID do dispositivo
```

## Como Funciona

### 1. Geração do UUID
- Cada dispositivo gera um UUID único na primeira inicialização
- O UUID é salvo no AsyncStorage do dispositivo
- O UUID é usado para identificar o dispositivo no servidor

### 2. Login com Verificação de Dispositivo
- O login envia: `userDoc`, `userPassword` e `deviceUuid`
- O servidor retorna um JWT com o campo `dispositivo: true/false`
- Se `dispositivo: false`, o app mostra a tela de ativação

### 3. Tela de Ativação
- Interface com câmera para captura de foto
- Instruções claras para o usuário
- Validação de rosto via API
- Ativação do dispositivo após validação

## APIs Necessárias

### 1. Login Modificado
```javascript
POST /auth_app_homolog.php
{
  "userDoc": "10008907919",
  "userPassword": "Ruan.9127",
  "deviceUuid": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Resposta:**
```javascript
{
  "user": "10008907919",
  "userid": "4",
  "username": "Juan Santana da Silva",
  "usermail": "juansantana.analista@gmail.com",
  "is_gn": true,
  "dispositivo": false,  // ou true
  "expires": 1754069801
}
```

### 2. Validação de Rosto
```javascript
POST /face-validation
{
  "deviceUuid": "550e8400-e29b-41d4-a716-446655440000",
  "faceImage": "base64_encoded_image"
}
```

**Resposta:**
```javascript
{
  "success": true,
  "message": "Rosto validado com sucesso",
  "confidence": 0.95
}
```

### 3. Ativação de Dispositivo
```javascript
POST /device-activation
{
  "deviceUuid": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Resposta:**
```javascript
{
  "success": true,
  "message": "Dispositivo ativado com sucesso"
}
```

## Implementação no Frontend

### 1. LoginScreen Modificada
```javascript
const handleLogin = async () => {
  const result = await login({
    userDoc: docNumbers,
    password: password,
    deviceUuid: deviceUUID
  });
  
  if (result.requiresDeviceActivation) {
    setShowDeviceActivation(true);
    return;
  }
  
  // Login normal...
};
```

### 2. DeviceActivationScreen
```javascript
const processDeviceActivation = async () => {
  // 1. Validar rosto
  const validationResult = await FaceValidationService.validateFace(
    deviceUUID,
    capturedImage.base64,
    userToken
  );

  if (validationResult.success) {
    // 2. Ativar dispositivo
    const activationResult = await FaceValidationService.activateDevice(
      deviceUUID,
      userToken
    );
    
    if (activationResult.success) {
      onSuccess(); // Volta para login
    }
  }
};
```

## Segurança

### 1. UUID Único
- Cada dispositivo tem um UUID único
- UUID é persistente no dispositivo
- UUID é usado para rastrear dispositivos autorizados

### 2. Validação de Rosto
- Foto é capturada em tempo real
- Imagem é enviada em base64
- Servidor valida a identidade do usuário

### 3. Token de Sessão
- Token JWT contém informações do dispositivo
- Token expira automaticamente
- Verificação periódica de validade

## Configuração

### 1. Dependências
```json
{
  "expo-camera": "~16.1.4",
  "expo-crypto": "~14.1.5",
  "@react-native-async-storage/async-storage": "2.1.2"
}
```

### 2. Permissões
```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "O app precisa acessar a câmera para validação de rosto."
        }
      ]
    ]
  }
}
```

## Testes

### 1. Teste de UUID
```javascript
// Verificar se UUID é gerado
const { deviceUUID } = useDeviceUUID();
console.log('UUID:', deviceUUID);
```

### 2. Teste de Login
```javascript
// Simular login com dispositivo não liberado
const result = await login({
  userDoc: "10008907919",
  password: "Ruan.9127",
  deviceUuid: "test-uuid"
});
```

### 3. Teste de Ativação
```javascript
// Simular validação de rosto
const result = await FaceValidationService.validateFace(
  deviceUUID,
  "base64_image",
  userToken
);
```

## Troubleshooting

### 1. UUID não está sendo gerado
- Verifique se `expo-crypto` está funcionando
- Verifique os logs do console
- Reinicie o app

### 2. Câmera não funciona
- Verifique permissões da câmera
- Teste em dispositivo físico (não emulador)
- Verifique se `expo-camera` está instalado

### 3. API não responde
- Verifique conectividade de internet
- Verifique URLs das APIs
- Verifique headers de autorização

### 4. Validação sempre falha
- Verifique qualidade da foto
- Verifique iluminação
- Verifique se o rosto está bem posicionado

## Próximos Passos

1. **Implementar APIs no backend**
2. **Adicionar logs detalhados**
3. **Implementar retry automático**
4. **Adicionar fallback para dispositivos sem câmera**
5. **Implementar cache de validação**
6. **Adicionar métricas de uso**

## Exemplo de Uso Completo

```javascript
// 1. Usuário faz login
const loginResult = await login({
  userDoc: "10008907919",
  password: "Ruan.9127",
  deviceUuid: deviceUUID
});

// 2. Se dispositivo não liberado, mostrar ativação
if (loginResult.requiresDeviceActivation) {
  setShowDeviceActivation(true);
  return;
}

// 3. Login bem-sucedido
console.log('Login realizado com sucesso!');
```

Este sistema garante que apenas dispositivos autorizados e usuários validados possam acessar o aplicativo, aumentando significativamente a segurança da aplicação. 