# Sistema de UUID do Dispositivo

## Visão Geral

Este sistema gera e gerencia um UUID único (Universally Unique Identifier) para cada dispositivo que executa o aplicativo RTX. O UUID é usado para fins de segurança e validação de rosto.

## Características

- **UUID v4**: Gera UUIDs com 128 bits de entropia usando o padrão RFC 4122
- **Persistência**: O UUID é salvo no AsyncStorage do dispositivo
- **Único por dispositivo**: Cada dispositivo terá seu próprio UUID único
- **Recuperação**: Se o app for reinstalado, o UUID será regenerado
- **Logs detalhados**: Console logs para debug e monitoramento

## Estrutura de Arquivos

```
services/
├── deviceService.js          # Serviço principal para gerenciar UUID
hooks/
├── useDeviceUUID.js          # Hook React para usar UUID
components/
├── DeviceUUIDDisplay.js      # Componente de exemplo para debug
```

## Como Usar

### 1. Uso Básico no App Principal

O UUID é automaticamente inicializado quando o app é aberto:

```javascript
// App.js já está configurado para inicializar o UUID
import DeviceService from './services/deviceService';

// O UUID será gerado/recuperado automaticamente na inicialização
```

### 2. Usando o Hook Personalizado

```javascript
import useDeviceUUID from '../hooks/useDeviceUUID';

const MyComponent = () => {
  const { deviceUUID, isLoading, error, regenerateUUID, clearUUID } = useDeviceUUID();

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View>
      <Text>UUID: {deviceUUID}</Text>
      <Button title="Regenerar UUID" onPress={regenerateUUID} />
    </View>
  );
};
```

### 3. Usando o Serviço Diretamente

```javascript
import DeviceService from '../services/deviceService';

// Obter UUID atual
const uuid = await DeviceService.getDeviceUUID();

// Regenerar UUID
const newUUID = await DeviceService.regenerateDeviceUUID();

// Verificar se existe UUID
const hasUUID = await DeviceService.hasDeviceUUID();

// Limpar UUID
await DeviceService.clearDeviceUUID();
```

### 4. Componente de Debug

Para fins de desenvolvimento, você pode usar o componente `DeviceUUIDDisplay`:

```javascript
import DeviceUUIDDisplay from '../components/DeviceUUIDDisplay';

// Adicione em qualquer tela para visualizar e gerenciar o UUID
<DeviceUUIDDisplay />
```

## Logs do Console

O sistema gera logs detalhados no console:

- `🔐 Novo UUID do dispositivo gerado: [uuid]` - Quando um novo UUID é criado
- `🔐 UUID do dispositivo recuperado: [uuid]` - Quando um UUID existente é recuperado
- `🔄 UUID do dispositivo regenerado: [uuid]` - Quando o UUID é regenerado
- `🗑️ UUID do dispositivo removido do storage` - Quando o UUID é removido
- `❌ Erro ao gerenciar UUID do dispositivo: [erro]` - Em caso de erro

## Exemplo de UUID

Um UUID gerado terá o formato:
```
550e8400-e29b-41d4-a716-446655440000
```

## Segurança

- O UUID é armazenado localmente no dispositivo
- Não é transmitido automaticamente para servidores externos
- Pode ser usado como identificador único para validação de rosto
- Recomenda-se usar em conjunto com outras medidas de segurança

## Integração com API de Validação de Rosto

Para usar com sua API de validação de rosto:

```javascript
const { deviceUUID } = useDeviceUUID();

// Enviar para API
const response = await fetch('/api/face-validation', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    deviceUUID: deviceUUID,
    faceData: faceImageData,
    // outros dados necessários
  }),
});
```

## Troubleshooting

### UUID não está sendo gerado
- Verifique se o `expo-crypto` está funcionando
- Verifique se o AsyncStorage está funcionando
- Verifique os logs do console para erros

### UUID está sendo regenerado a cada inicialização
- Verifique se o AsyncStorage está persistindo os dados
- Verifique se não há código que limpa o storage

### Erro de permissão
- Verifique se o app tem permissão para acessar o storage
- Em alguns casos, pode ser necessário solicitar permissões explicitamente

## Dependências

- `expo-crypto`: Para geração de UUIDs seguros (já incluído no Expo)
- `@react-native-async-storage/async-storage`: Para persistência local

## Próximos Passos

1. Integrar com a API de validação de rosto
2. Implementar sincronização com servidor
3. Adicionar criptografia adicional se necessário
4. Implementar backup/restore do UUID 