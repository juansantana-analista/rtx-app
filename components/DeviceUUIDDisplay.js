import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import useDeviceUUID from '../hooks/useDeviceUUID';

/**
 * Componente de exemplo para exibir e gerenciar o UUID do dispositivo
 * Este componente pode ser usado para fins de desenvolvimento/debug
 */
const DeviceUUIDDisplay = () => {
  const { deviceUUID, isLoading, error, regenerateUUID, clearUUID } = useDeviceUUID();

  const handleRegenerateUUID = async () => {
    try {
      Alert.alert(
        'Regenerar UUID',
        'Tem certeza que deseja gerar um novo UUID para este dispositivo?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Confirmar',
            onPress: async () => {
              try {
                await regenerateUUID();
                Alert.alert('Sucesso', 'UUID regenerado com sucesso!');
              } catch (error) {
                Alert.alert('Erro', 'Falha ao regenerar UUID');
              }
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Falha ao regenerar UUID');
    }
  };

  const handleClearUUID = async () => {
    try {
      Alert.alert(
        'Limpar UUID',
        'Tem certeza que deseja remover o UUID deste dispositivo?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Confirmar',
            onPress: async () => {
              try {
                await clearUUID();
                Alert.alert('Sucesso', 'UUID removido com sucesso!');
              } catch (error) {
                Alert.alert('Erro', 'Falha ao remover UUID');
              }
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Falha ao remover UUID');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando UUID do dispositivo...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UUID do Dispositivo</Text>
      
      <View style={styles.uuidContainer}>
        <Text style={styles.uuidLabel}>UUID:</Text>
        <Text style={styles.uuidText} selectable>
          {deviceUUID || 'Não disponível'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.regenerateButton]}
          onPress={handleRegenerateUUID}
        >
          <Text style={styles.buttonText}>Regenerar UUID</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={handleClearUUID}
        >
          <Text style={styles.buttonText}>Limpar UUID</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.infoText}>
        Este UUID é único para este dispositivo e será usado para validação de segurança.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  uuidContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  uuidLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#666',
  },
  uuidText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#333',
    backgroundColor: '#f8f8f8',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  regenerateButton: {
    backgroundColor: '#007AFF',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  errorText: {
    textAlign: 'center',
    color: '#FF3B30',
    fontSize: 14,
  },
});

export default DeviceUUIDDisplay; 