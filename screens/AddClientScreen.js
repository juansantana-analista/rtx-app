import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import CustomHeader from '../components/CustomHeader';
import FloatingLoader from '../components/FloatingLoader';
import createStyles from '../styles/AddClientStyles';

const AddClientScreen = ({ onBack, onNavigate }) => {
  const { themeColors } = useTheme();
  const { user } = useAuth();
  const styles = createStyles(themeColors);

  // Estados do formulário
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dados do cliente
  const [clientData, setClientData] = useState({
    // Passo 1 - Dados básicos
    name: '',
    cpf: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Passo 2 - Investimento
    selectedProduct: null,
    investmentAmount: '',
    
    // Passo 3 - Contrato
    contractAccepted: false,
  });

  // Lista de produtos de investimento
  const investmentProducts = [
    {
      id: 'demo',
      name: 'DEMO',
      title: 'Produto Demonstração',
      description: 'Produto ideal para iniciantes com baixo risco',
      minAmount: 1000,
      maxAmount: 50000,
      yield: '5,0% a.a.',
      risk: 'Baixo',
      color: '#28A745',
    },
    {
      id: 'pro',
      name: 'PRO',
      title: 'Produto Profissional',
      description: 'Para investidores com experiência intermediária',
      minAmount: 5000,
      maxAmount: 100000,
      yield: '8,5% a.a.',
      risk: 'Médio',
      color: '#113334',
    },
    {
      id: 'private',
      name: 'PRIVATE',
      title: 'Produto Exclusivo',
      description: 'Investimento premium com alta rentabilidade',
      minAmount: 25000,
      maxAmount: 500000,
      yield: '12,0% a.a.',
      risk: 'Alto',
      color: '#FFD700',
    },
    {
      id: 'select',
      name: 'SELECT',
      title: 'Produto Selecionado',
      description: 'Para grandes investidores institucionais',
      minAmount: 100000,
      maxAmount: 1000000,
      yield: '15,0% a.a.',
      risk: 'Alto',
      color: '#DC3545',
    },
    {
      id: 'evolve',
      name: 'EVOLVE',
      title: 'Produto Evolutivo',
      description: 'Investimento com crescimento progressivo',
      minAmount: 50000,
      maxAmount: 750000,
      yield: '10,5% a.a.',
      risk: 'Médio-Alto',
      color: '#9B59B6',
    },
  ];

  // Funções de validação
  const validateStep1 = () => {
    const { name, cpf, email, phone } = clientData;
    if (!name || !cpf || !email || !phone) {
      Alert.alert('Dados Incompletos', 'Por favor, preencha todos os campos obrigatórios.');
      return false;
    }
    
    // Validação básica de CPF (11 dígitos)
    const cpfNumbers = cpf.replace(/\D/g, '');
    if (cpfNumbers.length !== 11) {
      Alert.alert('CPF Inválido', 'Por favor, insira um CPF válido com 11 dígitos.');
      return false;
    }
    
    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Email Inválido', 'Por favor, insira um email válido.');
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    const { selectedProduct, investmentAmount } = clientData;
    if (!selectedProduct || !investmentAmount) {
      Alert.alert('Investimento Incompleto', 'Por favor, selecione um produto e defina o valor do investimento.');
      return false;
    }
    
    const amount = parseFloat(investmentAmount.replace(/[^\d,]/g, '').replace(',', '.'));
    const product = investmentProducts.find(p => p.id === selectedProduct);
    
    if (amount < product.minAmount || amount > product.maxAmount) {
      Alert.alert('Valor Inválido', `O valor deve estar entre ${formatCurrency(product.minAmount)} e ${formatCurrency(product.maxAmount)}.`);
      return false;
    }
    
    return true;
  };

  // Formatação de valores
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  // Navegação entre passos
  const handleNextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Submissão do formulário
  const handleSubmit = async () => {
    if (!clientData.contractAccepted) {
      Alert.alert('Contrato', 'Por favor, aceite os termos do contrato para continuar.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simula chamada da API
      // const result = await apiRequest({
      //   classe: 'GerenteNegocioRestService',
      //   metodo: 'addCliente',
      //   params: {
      //     gerente_id: user.id,
      //     cliente_data: clientData
      //   }
      // });

      // Simula delay da API
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        '✅ Cliente Cadastrado!',
        `${clientData.name} foi cadastrado com sucesso com um investimento de ${clientData.investmentAmount} no produto ${clientData.selectedProduct?.toUpperCase()}.`,
        [
          {
            text: 'OK',
            onPress: () => onBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o cliente. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Renderização dos passos
  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map((step) => (
        <View key={step} style={styles.stepIndicatorContainer}>
          <View style={[
            styles.stepCircle,
            { backgroundColor: step <= currentStep ? themeColors.primary : themeColors.lightGray }
          ]}>
            <Text style={[
              styles.stepNumber,
              { color: step <= currentStep ? themeColors.white : themeColors.textSecondary }
            ]}>
              {step}
            </Text>
          </View>
          {step < 3 && (
            <View style={[
              styles.stepLine,
              { backgroundColor: step < currentStep ? themeColors.primary : themeColors.lightGray }
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Dados Básicos do Cliente</Text>
      <Text style={styles.stepSubtitle}>Preencha as informações pessoais do cliente</Text>

      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nome Completo *</Text>
          <TextInput
            style={styles.textInput}
            value={clientData.name}
            onChangeText={(text) => setClientData({ ...clientData, name: text })}
            placeholder="Digite o nome completo"
            placeholderTextColor={themeColors.textSecondary}
          />
        </View>

        <View style={styles.inputRow}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.inputLabel}>CPF *</Text>
            <TextInput
              style={styles.textInput}
              value={clientData.cpf}
              onChangeText={(text) => {
                const formatted = formatCPF(text);
                setClientData({ ...clientData, cpf: formatted });
              }}
              placeholder="000.000.000-00"
              placeholderTextColor={themeColors.textSecondary}
              keyboardType="numeric"
              maxLength={14}
            />
          </View>
          
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.inputLabel}>Data de Nascimento</Text>
            <TextInput
              style={styles.textInput}
              value={clientData.birthDate}
              onChangeText={(text) => setClientData({ ...clientData, birthDate: text })}
              placeholder="DD/MM/AAAA"
              placeholderTextColor={themeColors.textSecondary}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email *</Text>
          <TextInput
            style={styles.textInput}
            value={clientData.email}
            onChangeText={(text) => setClientData({ ...clientData, email: text.toLowerCase() })}
            placeholder="email@exemplo.com"
            placeholderTextColor={themeColors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Telefone *</Text>
          <TextInput
            style={styles.textInput}
            value={clientData.phone}
            onChangeText={(text) => {
              const formatted = formatPhone(text);
              setClientData({ ...clientData, phone: formatted });
            }}
            placeholder="(11) 99999-9999"
            placeholderTextColor={themeColors.textSecondary}
            keyboardType="phone-pad"
            maxLength={15}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Endereço</Text>
          <TextInput
            style={styles.textInput}
            value={clientData.address}
            onChangeText={(text) => setClientData({ ...clientData, address: text })}
            placeholder="Rua, número, bairro"
            placeholderTextColor={themeColors.textSecondary}
          />
        </View>

        <View style={styles.inputRow}>
          <View style={[styles.inputGroup, { flex: 2, marginRight: 8 }]}>
            <Text style={styles.inputLabel}>Cidade</Text>
            <TextInput
              style={styles.textInput}
              value={clientData.city}
              onChangeText={(text) => setClientData({ ...clientData, city: text })}
              placeholder="Cidade"
              placeholderTextColor={themeColors.textSecondary}
            />
          </View>
          
          <View style={[styles.inputGroup, { flex: 1, marginHorizontal: 4 }]}>
            <Text style={styles.inputLabel}>Estado</Text>
            <TextInput
              style={styles.textInput}
              value={clientData.state}
              onChangeText={(text) => setClientData({ ...clientData, state: text.toUpperCase() })}
              placeholder="UF"
              placeholderTextColor={themeColors.textSecondary}
              maxLength={2}
            />
          </View>
          
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.inputLabel}>CEP</Text>
            <TextInput
              style={styles.textInput}
              value={clientData.zipCode}
              onChangeText={(text) => setClientData({ ...clientData, zipCode: text })}
              placeholder="00000-000"
              placeholderTextColor={themeColors.textSecondary}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Selecionar Investimento</Text>
      <Text style={styles.stepSubtitle}>Escolha o produto e defina o valor do investimento</Text>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Produtos Disponíveis</Text>
        
        {investmentProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={[
              styles.productCard,
              clientData.selectedProduct === product.id && styles.selectedProductCard
            ]}
            onPress={() => setClientData({ ...clientData, selectedProduct: product.id })}
            activeOpacity={0.7}
          >
            <View style={styles.productHeader}>
              <View style={[styles.productIndicator, { backgroundColor: product.color }]} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
              </View>
              <View style={styles.productMeta}>
                <Text style={styles.productYield}>{product.yield}</Text>
                <Text style={styles.productRisk}>Risco: {product.risk}</Text>
              </View>
            </View>
            
            <View style={styles.productLimits}>
              <Text style={styles.productLimitText}>
                Min: {formatCurrency(product.minAmount)} - Max: {formatCurrency(product.maxAmount)}
              </Text>
            </View>

            {clientData.selectedProduct === product.id && (
              <View style={styles.selectedIndicator}>
                <Ionicons name="checkmark-circle" size={24} color={themeColors.success} />
              </View>
            )}
          </TouchableOpacity>
        ))}

        {clientData.selectedProduct && (
          <View style={styles.amountSection}>
            <Text style={styles.inputLabel}>Valor do Investimento *</Text>
            <View style={styles.currencyInputContainer}>
              <Text style={styles.currencySymbol}>R$</Text>
              <TextInput
                style={styles.currencyInput}
                value={clientData.investmentAmount}
                onChangeText={(text) => {
                  // Formata o valor como moeda
                  const numbers = text.replace(/\D/g, '');
                  const formatted = new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(numbers / 100);
                  setClientData({ ...clientData, investmentAmount: formatted });
                }}
                placeholder="0,00"
                placeholderTextColor={themeColors.textSecondary}
                keyboardType="numeric"
              />
            </View>
            
            {clientData.selectedProduct && (
              <View style={styles.amountLimits}>
                <Text style={styles.limitText}>
                  Valor mínimo: {formatCurrency(investmentProducts.find(p => p.id === clientData.selectedProduct)?.minAmount || 0)}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );

  const renderStep3 = () => {
    const selectedProduct = investmentProducts.find(p => p.id === clientData.selectedProduct);
    
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Revisão e Contrato</Text>
        <Text style={styles.stepSubtitle}>Confirme os dados e aceite os termos</Text>

        <View style={styles.formSection}>
          {/* Resumo do Cliente */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Dados do Cliente</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Nome:</Text>
              <Text style={styles.summaryValue}>{clientData.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>CPF:</Text>
              <Text style={styles.summaryValue}>{clientData.cpf}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Email:</Text>
              <Text style={styles.summaryValue}>{clientData.email}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Telefone:</Text>
              <Text style={styles.summaryValue}>{clientData.phone}</Text>
            </View>
          </View>

          {/* Resumo do Investimento */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Detalhes do Investimento</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Produto:</Text>
              <Text style={styles.summaryValue}>{selectedProduct?.name} - {selectedProduct?.title}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Valor:</Text>
              <Text style={[styles.summaryValue, { color: themeColors.success, fontWeight: 'bold' }]}>
                R$ {clientData.investmentAmount}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Rentabilidade:</Text>
              <Text style={styles.summaryValue}>{selectedProduct?.yield}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Nível de Risco:</Text>
              <Text style={styles.summaryValue}>{selectedProduct?.risk}</Text>
            </View>
          </View>

          {/* Termos do Contrato */}
          <View style={styles.contractSection}>
            <Text style={styles.contractTitle}>Termos e Condições</Text>
            <ScrollView style={styles.contractScroll} showsVerticalScrollIndicator={true}>
              <Text style={styles.contractText}>
                1. OBJETO DO CONTRATO{'\n'}
                Este contrato tem por objeto a aplicação de recursos financeiros do CLIENTE nos produtos de investimento oferecidos pela RTX OPERAÇÕES.{'\n\n'}
                
                2. VALOR DO INVESTIMENTO{'\n'}
                O valor total do investimento é de R$ {clientData.investmentAmount}, aplicado no produto {selectedProduct?.name}.{'\n\n'}
                
                3. RENTABILIDADE{'\n'}
                A rentabilidade estimada é de {selectedProduct?.yield}, podendo variar conforme as condições de mercado.{'\n\n'}
                
                4. RISCOS{'\n'}
                O CLIENTE está ciente de que todo investimento possui riscos inerentes e que a rentabilidade passada não garante resultados futuros.{'\n\n'}
                
                5. PRAZO{'\n'}
                O investimento possui prazo mínimo de 12 (doze) meses, podendo ser renovado automaticamente.{'\n\n'}
                
                6. RESGATE{'\n'}
                O resgate pode ser solicitado a qualquer momento, respeitando as condições específicas do produto contratado.{'\n\n'}
                
                7. RESPONSABILIDADES{'\n'}
                A RTX OPERAÇÕES compromete-se a gerir os recursos com diligência e transparência, fornecendo relatórios periódicos ao CLIENTE.{'\n\n'}
                
                8. FORO{'\n'}
                Fica eleito o foro da comarca de São Paulo/SP para dirimir quaisquer questões oriundas deste contrato.
              </Text>
            </ScrollView>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setClientData({ ...clientData, contractAccepted: !clientData.contractAccepted })}
              activeOpacity={0.7}
            >
              <View style={[
                styles.checkbox,
                clientData.contractAccepted && styles.checkboxChecked
              ]}>
                {clientData.contractAccepted && (
                  <Ionicons name="checkmark" size={16} color={themeColors.white} />
                )}
              </View>
              <Text style={styles.checkboxText}>
                Li e aceito os termos e condições do contrato de investimento
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Dados Básicos';
      case 2: return 'Investimento';
      case 3: return 'Contrato';
      default: return 'Cadastro';
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={`${getStepTitle()} (${currentStep}/3)`}
        leftIcon="arrow-back"
        leftAction={currentStep === 1 ? onBack : handlePreviousStep}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStepIndicator()}
        
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        <View style={styles.buttonSection}>
          {currentStep < 3 ? (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextStep}
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>Continuar</Text>
              <Ionicons name="arrow-forward" size={20} color={themeColors.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.submitButton,
                !clientData.contractAccepted && styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={!clientData.contractAccepted || isSubmitting}
              activeOpacity={0.8}
            >
              <Ionicons name="person-add" size={20} color={themeColors.white} />
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar Cliente'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {isSubmitting && <FloatingLoader message="Cadastrando cliente..." />}
    </View>
  );
};

export default AddClientScreen;