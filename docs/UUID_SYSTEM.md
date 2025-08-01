# Sistema de UUID do Dispositivo

## Visão Geral

Este sistema gera e gerencia um UUID único para cada dispositivo que executa o aplicativo. O UUID é gerado usando a API nativa do Expo (`expo-crypto`) e é persistido no AsyncStorage.

## Funcionalidades

- ✅ Geração automática de UUID v4 (128-bit de entropia)
- ✅ Persistência no AsyncStorage
- ✅ Recuperação automática ao reiniciar o app
- ✅ Regeneração manual do UUID
- ✅ Limpeza do UUID do storage
- ✅ Hook React para fácil integração
- ✅ Logs no console para visualização

## Estrutura de Arquivos

```
services/
├── deviceService.js          # Serviço principal para gerenciar UUID
hooks/
├── useDeviceUUID.js          # Hook React para usar o UUID
docs/
├── UUID_SYSTEM.md           # Esta documentação
```

## Como Usar

### 1. Hook React (Recomendado)

```javascript
import useDeviceUUID from '../hooks/useDeviceUUID';

const MyComponent = () => {
  const { deviceUUID, isLoading, error, regenerateUUID, clearUUID } = useDeviceUUID();

  if (isLoading) return <Text>Carregando...</Text>;
  if (error) return <Text>Erro: {error.message}</Text>;

  return (
    <View>
      <Text>UUID: {deviceUUID}</Text>
      <Button onPress={regenerateUUID} title="Regenerar UUID" />
    </View>
  );
};
```

### 2. Serviço Direto

```javascript
import DeviceService from '../services/deviceService';

// Obter UUID (gera novo se não existir)
const uuid = await DeviceService.getDeviceUUID();

// Regenerar UUID
const newUuid = await DeviceService.regenerateDeviceUUID();

// Verificar se existe UUID
const hasUuid = await DeviceService.hasDeviceUUID();

// Limpar UUID
await DeviceService.clearDeviceUUID();
```



## Logs no Console

O sistema gera logs informativos no console:

- `🔐 UUID do dispositivo recuperado: [uuid]` - UUID existente recuperado
- `🔐 Novo UUID do dispositivo gerado: [uuid]` - Novo UUID gerado
- `🔐 UUID do dispositivo regenerado: [uuid]` - UUID regenerado
- `🔐 UUID do dispositivo removido` - UUID removido
- `❌ Erro ao gerenciar UUID do dispositivo: [error]` - Erro ocorrido

## Segurança

- O UUID é gerado usando `expo-crypto.getRandomValues()` que é criptograficamente seguro
- O UUID é armazenado localmente no dispositivo usando AsyncStorage
- Não há transmissão automática do UUID para servidores externos
- O UUID pode ser regenerado ou removido pelo usuário

## Dependências

- `@react-native-async-storage/async-storage` - Para persistência
- `expo-crypto` - Para geração segura de números aleatórios

## Notas Técnicas

- O UUID segue o padrão RFC 4122 v4
- Formato: `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`
- Onde `x` é um dígito hexadecimal e `y` é um dos dígitos `8`, `9`, `A`, ou `B`
- O UUID é único por dispositivo e persistente entre sessões do app 