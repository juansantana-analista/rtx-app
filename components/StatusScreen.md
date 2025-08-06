# StatusScreen Component

Componente genérico para substituir alerts e mostrar mensagens de status no aplicativo.

## Uso Básico

```javascript
import StatusScreen from '../components/StatusScreen';

// Exemplo de uso
<StatusScreen
  type="success"
  title="Operação Concluída"
  message="Sua operação foi realizada com sucesso!"
  primaryButton="Continuar"
  onPrimaryPress={() => navigation.goBack()}
/>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `type` | string | 'success' | Tipo de status: 'success', 'error', 'warning', 'info' |
| `title` | string | - | Título da mensagem |
| `message` | string | - | Mensagem detalhada |
| `icon` | string | - | Ícone customizado (opcional) |
| `primaryButton` | string | - | Texto do botão principal |
| `secondaryButton` | string | - | Texto do botão secundário |
| `onPrimaryPress` | function | - | Função executada ao pressionar botão principal |
| `onSecondaryPress` | function | - | Função executada ao pressionar botão secundário |
| `onClose` | function | - | Função executada ao fechar |
| `showCloseButton` | boolean | true | Mostra botão de fechar |

## Tipos de Status

### Success (Sucesso)
- Ícone: checkmark-circle
- Cor: Verde (#28A745)
- Uso: Operações concluídas com sucesso

### Error (Erro)
- Ícone: close-circle
- Cor: Vermelho (#DC3545)
- Uso: Erros e falhas

### Warning (Aviso)
- Ícone: warning
- Cor: Amarelo (#FFC107)
- Uso: Confirmações e avisos

### Info (Informação)
- Ícone: information-circle
- Cor: Azul primário (#113334)
- Uso: Informações gerais

## Exemplos de Implementação

### Sucesso
```javascript
setStatusConfig({
  type: 'success',
  title: '🎉 Validação Concluída!',
  message: 'Seu dispositivo foi registrado com sucesso.',
  primaryButton: 'Continuar',
  onPrimaryPress: () => navigation.navigate('Home'),
});
```

### Erro
```javascript
setStatusConfig({
  type: 'error',
  title: '❌ Erro de Conexão',
  message: 'Verifique sua internet e tente novamente.',
  primaryButton: 'Tentar Novamente',
  secondaryButton: 'Cancelar',
  onPrimaryPress: () => retryOperation(),
  onSecondaryPress: () => navigation.goBack(),
});
```

### Confirmação
```javascript
setStatusConfig({
  type: 'warning',
  title: '🚪 Sair do Aplicativo',
  message: 'Tem certeza que deseja sair?',
  primaryButton: 'Sair',
  secondaryButton: 'Cancelar',
  onPrimaryPress: () => logout(),
  onSecondaryPress: () => setStep('previous'),
});
```

## Integração com Navegação

Para integrar com React Navigation, você pode usar o componente como uma tela:

```javascript
// No seu navigator
<Stack.Screen 
  name="Status" 
  component={StatusScreen}
  options={{ headerShown: false }}
/>

// Navegar para a tela
navigation.navigate('Status', {
  type: 'success',
  title: 'Sucesso!',
  message: 'Operação realizada.',
  primaryButton: 'OK',
  onPrimaryPress: () => navigation.goBack(),
});
``` 