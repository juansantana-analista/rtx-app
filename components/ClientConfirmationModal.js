import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import createStyles from '../styles/ClientConfirmationModalStyles';

const ClientConfirmationModal = ({ 
  isVisible, 
  clientData, 
  onConfirm, 
  onCancel, 
  isLoading = false 
}) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatCPF = (cpf) => {
    const cleanCPF = cpf.replace(/[^\d]/g, '');
    return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (phone) => {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    if (cleanPhone.length <= 10) {
      return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const getPlanName = (planId) => {
    const plans = {
      'basic': 'Básico',
      'premium': 'Premium',
      'vip': 'VIP'
    };
    return plans[planId] || planId;
  };

  const handleConfirm = () => {
    Alert.alert(
      'Confirmar Cadastro',
      'Tem certeza que deseja cadastrar este cliente?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: onConfirm
        }
      ]
    );
  };

  if (!clientData) return null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Confirmar Dados do Cliente</Text>
            <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={themeColors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informações Pessoais</Text>
              
              <View style={styles.infoRow}>
                <Text style={styles.label}>Nome:</Text>
                <Text style={styles.value}>{clientData.name}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.label}>CPF:</Text>
                <Text style={styles.value}>{formatCPF(clientData.cpf)}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{clientData.email}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.label}>Telefone:</Text>
                <Text style={styles.value}>{formatPhone(clientData.phone)}</Text>
              </View>
            </View>

            {(clientData.address || clientData.city || clientData.state) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Endereço</Text>
                
                {clientData.address && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Endereço:</Text>
                    <Text style={styles.value}>{clientData.address}</Text>
                  </View>
                )}
                
                {clientData.city && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Cidade:</Text>
                    <Text style={styles.value}>{clientData.city}</Text>
                  </View>
                )}
                
                {clientData.state && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Estado:</Text>
                    <Text style={styles.value}>{clientData.state}</Text>
                  </View>
                )}
                
                {clientData.zipCode && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>CEP:</Text>
                    <Text style={styles.value}>{clientData.zipCode}</Text>
                  </View>
                )}
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informações de Investimento</Text>
              
              <View style={styles.infoRow}>
                <Text style={styles.label}>Plano:</Text>
                <Text style={styles.value}>{getPlanName(clientData.plan)}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.label}>Investimento Inicial:</Text>
                <Text style={[styles.value, styles.highlightValue]}>
                  {formatCurrency(clientData.initialInvestment)}
                </Text>
              </View>
            </View>

            {clientData.notes && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Observações</Text>
                <Text style={styles.notesText}>{clientData.notes}</Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.confirmButton, isLoading && styles.disabledButton]}
              onPress={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text style={styles.confirmButtonText}>Cadastrando...</Text>
              ) : (
                <>
                  <Ionicons name="checkmark" size={20} color={themeColors.white} />
                  <Text style={styles.confirmButtonText}>Confirmar Cadastro</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ClientConfirmationModal;
