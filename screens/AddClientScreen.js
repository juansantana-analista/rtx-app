import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import { useClients } from '../hooks/useClients';

import CustomHeader from '../components/CustomHeader';
import ClientConfirmationModal from '../components/ClientConfirmationModal';
import createStyles from '../styles/AddClientStyles';

const AddClientScreen = ({ onBack, onNavigate }) => {
  const { themeColors } = useTheme();
  const { user } = useAuth();
  const { addClient } = useClients();
  const styles = createStyles(themeColors);
  
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    plan: '',
    initialInvestment: '',
    notes: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [plans, setPlans] = useState([]);

  // Dados mockados para planos (temporário)
  const mockPlans = [
    { id: 1, name: 'Plano Básico', description: 'Ideal para iniciantes', minInvestment: 1000.00 },
    { id: 2, name: 'Plano Standard', description: 'Para investidores intermediários', minInvestment: 3000.00 },
    { id: 3, name: 'Plano Premium', description: 'Para investidores experientes', minInvestment: 5000.00 },
    { id: 4, name: 'Plano VIP', description: 'Para grandes investidores', minInvestment: 10000.00 }
  ];

  useEffect(() => {
    const loadPlans = async () => {
      try {
        // Simular delay da API
        await new Promise(resolve => setTimeout(resolve, 500));
        setPlans(mockPlans);
      } catch (error) {
        // Em caso de erro, usar planos mockados como fallback
        setPlans(mockPlans);
      }
    };

    loadPlans();
  }, []);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!isValidCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (!formData.plan) {
      newErrors.plan = 'Plano é obrigatório';
    }

    if (!formData.initialInvestment.trim()) {
      newErrors.initialInvestment = 'Investimento inicial é obrigatório';
    } else if (parseFloat(formData.initialInvestment.replace(/[^\d,]/g, '').replace(',', '.')) <= 0) {
      newErrors.initialInvestment = 'Investimento deve ser maior que zero';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidCPF = (cpf) => {
    const cleanCPF = cpf.replace(/[^\d]/g, '');
    if (cleanCPF.length !== 11) return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
    
    // Validar dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false;
    
    return true;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formatCPF = (text) => {
    const numbers = text.replace(/[^\d]/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (text) => {
    const numbers = text.replace(/[^\d]/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const formatCurrency = (text) => {
    const numbers = text.replace(/[^\d,]/g, '');
    const value = parseFloat(numbers.replace(',', '.'));
    if (isNaN(value)) return '';
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert('Erro', 'Por favor, corrija os erros no formulário');
      return;
    }

    // Mostrar modal de confirmação
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    setIsLoading(true);
    setShowConfirmation(false);
    
    try {
      const cleanCPF = formData.cpf.replace(/[^\d]/g, '');
      const isCPFUnique = true; // Simular que o CPF é único
      
      if (!isCPFUnique) {
        Alert.alert('Erro', 'CPF já cadastrado no sistema');
        setIsLoading(false);
        return;
      }

      const clientData = {
        ...formData,
        cpf: cleanCPF,
        phone: formData.phone.replace(/[^\d]/g, ''),
        initialInvestment: parseFloat(formData.initialInvestment.replace(/[^\d,]/g, '').replace(',', '.')),
        gnId: user?.id // ID do GN que está cadastrando
      };

      console.log('➕ AddClient: Enviando dados do cliente:', clientData);
      const newClient = await addClient(clientData);

      Alert.alert(
        'Sucesso!',
        'Cliente cadastrado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navegar para a tela de detalhes do cliente ou voltar para a lista
              onNavigate('myClients');
            }
          }
        ]
      );
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      Alert.alert('Erro', error.message || 'Erro ao cadastrar cliente. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (field, label, placeholder, keyboardType = 'default', maxLength = null, formatFunction = null) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, errors[field] && styles.inputError]}
        placeholder={placeholder}
        placeholderTextColor={themeColors.textSecondary}
        value={formData[field]}
        onChangeText={(text) => updateFormData(field, formatFunction ? formatFunction(text) : text)}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
      {errors[field] && (
        <Text style={styles.errorText}>{errors[field]}</Text>
      )}
    </View>
  );

  const renderPlanSelector = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Plano *</Text>
      <View style={styles.planContainer}>
        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planOption,
              formData.plan === plan.id && styles.planOptionSelected
            ]}
            onPress={() => updateFormData('plan', plan.id)}
          >
            <View style={styles.planHeader}>
              <Text style={[
                styles.planName,
                formData.plan === plan.id && styles.planNameSelected
              ]}>
                {plan.name}
              </Text>
              {formData.plan === plan.id && (
                <Ionicons name="checkmark-circle" size={20} color={themeColors.primary} />
              )}
            </View>
            <Text style={[
              styles.planDescription,
              formData.plan === plan.id && styles.planDescriptionSelected
            ]}>
              {plan.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.plan && (
        <Text style={styles.errorText}>{errors.plan}</Text>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <CustomHeader
        title="Novo Cliente"
        leftIcon="arrow-back"
        leftAction={onBack}
      />

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          
          {renderInput('name', 'Nome Completo *', 'Digite o nome completo')}
          {renderInput('cpf', 'CPF *', '000.000.000-00', 'numeric', 14, formatCPF)}
          {renderInput('email', 'Email *', 'exemplo@email.com', 'email-address')}
          {renderInput('phone', 'Telefone *', '(00) 00000-0000', 'phone-pad', 15, formatPhone)}

          <Text style={styles.sectionTitle}>Endereço</Text>
          
          {renderInput('address', 'Endereço', 'Rua, número, complemento')}
          {renderInput('city', 'Cidade', 'Digite a cidade')}
          {renderInput('state', 'Estado', 'Digite o estado')}
          {renderInput('zipCode', 'CEP', '00000-000', 'numeric', 9)}

          <Text style={styles.sectionTitle}>Informações de Investimento</Text>
          
          {renderPlanSelector()}
          {renderInput('initialInvestment', 'Investimento Inicial *', 'R$ 0,00', 'numeric', null, formatCurrency)}

          <Text style={styles.sectionTitle}>Observações</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Observações</Text>
            <TextInput
              style={[styles.textArea, errors.notes && styles.inputError]}
              placeholder="Digite observações sobre o cliente..."
              placeholderTextColor={themeColors.textSecondary}
              value={formData.notes}
              onChangeText={(text) => updateFormData('notes', text)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={themeColors.white} size="small" />
            ) : (
              <>
                <Ionicons name="person-add" size={20} color={themeColors.white} />
                <Text style={styles.submitButtonText}>Cadastrar Cliente</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <ClientConfirmationModal
        isVisible={showConfirmation}
        clientData={formData}
        onConfirm={handleConfirmSubmit}
        onCancel={() => setShowConfirmation(false)}
        isLoading={isLoading}
      />
    </KeyboardAvoidingView>
  );
};

export default AddClientScreen;
