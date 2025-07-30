import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import CustomHeader from '../components/CustomHeader';
import createStyles from '../styles/AportesStyles';

const AportesScreen = ({ onBack, showFloatingNav = true }) => {
  const { themeColors } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const styles = createStyles();

  // Estados principais
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [balance, setBalance] = useState(0);

  // Produtos disponíveis (normalmente viriam de uma API)
  const availableProducts = [
    {
      id: 'demo',
      title: 'DEMO',
      subtitle: 'Produto demonstrativo',
      minAmount: 100,
      yield: '1% ao mês',
      period: '6 meses',
      risk: 'Baixo',
      color: '#4A90E2',
      description: 'Produto ideal para iniciantes que querem conhecer a plataforma.',
    },
    {
      id: 'private',
      title: 'PRIVATE',
      subtitle: 'Investimento exclusivo',
      minAmount: 1000,
      yield: '1.5% ao mês',
      period: '12 meses',
      risk: 'Baixo',
      color: '#7B68EE',
      description: 'Para investidores que buscam retornos consistentes com baixo risco.',
    },
    {
      id: 'pro',
      title: 'PRO',
      subtitle: 'Para investidores experientes',
      minAmount: 5000,
      yield: '2% ao mês',
      period: '18 meses',
      risk: 'Médio',
      color: '#FF6B6B',
      description: 'Produto profissional para investidores experientes.',
    },
    {
      id: 'select',
      title: 'SELECT',
      subtitle: 'Investimento selecionado',
      minAmount: 10000,
      yield: '2.5% ao mês',
      period: '24 meses',
      risk: 'Médio-Alto',
      color: '#4ECDC4',
      description: 'Investimento premium com excelente potencial de retorno.',
    },
    {
      id: 'evolve',
      title: 'EVOLVE',
      subtitle: 'Evolua seus investimentos',
      minAmount: 25000,
      yield: '3% ao mês',
      period: '36 meses',
      risk: 'Alto',
      color: '#45B7D1',
      description: 'Para investidores que buscam crescimento acelerado.',
    },
    {
      id: 'absolute',
      title: 'ABSOLUTE',
      subtitle: 'Performance absoluta',
      minAmount: 50000,
      yield: '3.5% ao mês',
      period: '48 meses',
      risk: 'Alto',
      color: '#96CEB4',
      description: 'O mais exclusivo produto da nossa carteira.',
    },
  ];

  // Simula busca de saldo (em produção viria da API)
  useEffect(() => {
    // Simular saldo disponível
    setBalance(15000);
  }, []);

  // Formata valor em reais
  const formatCurrency = (value) => {
    const numericValue = parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'));
    if (isNaN(numericValue)) return '';
    
    return numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  };

  // Converte string monetária para número
  const parseCurrency = (value) => {
    return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
  };

  // Manipula mudança no valor do aporte
  const handleAmountChange = (text) => {
    // Remove tudo exceto números e vírgula
    const numericText = text.replace(/[^\d,]/g, '');
    setAmount(numericText);
  };

  // Valida se o aporte pode ser realizado
  const validateContribution = () => {
    const numericAmount = parseCurrency(amount);
    
    if (!selectedProduct) {
      Alert.alert('Erro', 'Selecione um produto para investir.');
      return false;
    }
    
    if (numericAmount <= 0) {
      Alert.alert('Erro', 'Digite um valor válido para o aporte.');
      return false;
    }
    
    if (numericAmount < selectedProduct.minAmount) {
      Alert.alert(
        'Valor Mínimo',
        `O valor mínimo para ${selectedProduct.title} é ${formatCurrency(selectedProduct.minAmount.toString())}.`
      );
      return false;
    }
    
    if (numericAmount > balance) {
      Alert.alert('Saldo Insuficiente', 'Você não possui saldo suficiente para este aporte.');
      return false;
    }
    
    return true;
  };

  // Realiza o aporte
  const handleContribution = async () => {
    if (!validateContribution()) return;
    
    const numericAmount = parseCurrency(amount);
    
    Alert.alert(
      'Confirmar Aporte',
      `Confirma o aporte de ${formatCurrency(amount)} no produto ${selectedProduct.title}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            setIsLoading(true);
            try {
              // Aqui você faria a chamada para a API de aporte
              // const result = await apiRequest({
              //   classe: 'AporteRestService',
              //   metodo: 'realizarAporte',
              //   params: {
              //     usuario_id: user.id,
              //     produto_id: selectedProduct.id,
              //     valor: numericAmount
              //   }
              // });
              
              // Simular delay da API
              await new Promise(resolve => setTimeout(resolve, 2000));
              
              Alert.alert(
                'Aporte Realizado!',
                `Seu aporte de ${formatCurrency(amount)} foi realizado com sucesso no produto ${selectedProduct.title}.`,
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      setAmount('');
                      setSelectedProduct(null);
                      onBack();
                    }
                  }
                ]
              );
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível realizar o aporte. Tente novamente.');
            } finally {
              setIsLoading(false);
            }
          }
        }
      ]
    );
  };

  // Renderiza item do produto no modal
  const renderProductItem = (product) => (
    <TouchableOpacity
      key={product.id}
      style={[
        styles.productItem,
        selectedProduct?.id === product.id && styles.selectedProductItem
      ]}
      onPress={() => {
        setSelectedProduct(product);
        setShowProductModal(false);
      }}
      activeOpacity={0.7}
    >
      <View style={[styles.productIndicator, { backgroundColor: product.color }]} />
      
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productSubtitle}>{product.subtitle}</Text>
        <Text style={styles.productYield}>{product.yield}</Text>
        
        <View style={styles.productDetails}>
          <Text style={styles.productDetail}>Min: {formatCurrency(product.minAmount.toString())}</Text>
          <Text style={styles.productDetail}>Prazo: {product.period}</Text>
          <Text style={[styles.productDetail, { 
            color: product.risk === 'Alto' ? themeColors.error : 
                  product.risk === 'Médio' || product.risk === 'Médio-Alto' ? '#FF9500' : 
                  themeColors.success 
          }]}>
            Risco: {product.risk}
          </Text>
        </View>
      </View>
      
      {selectedProduct?.id === product.id && (
        <Ionicons name="checkmark-circle" size={24} color={themeColors.success} />
      )}
    </TouchableOpacity>
  );

  const rightActions = [
    { 
      icon: 'help-circle-outline', 
      onPress: () => Alert.alert('Ajuda', 'Escolha um produto e valor para realizar seu aporte.') 
    }
  ];

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Novo Aporte"
        leftIcon="arrow-back"
        leftAction={onBack}
        rightActions={rightActions}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card de Saldo Disponível */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo disponível para aporte</Text>
          <Text style={styles.balanceAmount}>{formatCurrency(balance.toString())}</Text>
        </View>

        {/* Seleção de Produto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecione o produto</Text>
          
          <TouchableOpacity
            style={styles.productSelector}
            onPress={() => setShowProductModal(true)}
            activeOpacity={0.7}
          >
            {selectedProduct ? (
              <View style={styles.selectedProductDisplay}>
                <View style={[styles.productIndicator, { backgroundColor: selectedProduct.color }]} />
                <View style={styles.selectedProductInfo}>
                  <Text style={styles.selectedProductTitle}>{selectedProduct.title}</Text>
                  <Text style={styles.selectedProductSubtitle}>{selectedProduct.subtitle}</Text>
                  <Text style={styles.selectedProductYield}>{selectedProduct.yield}</Text>
                </View>
              </View>
            ) : (
              <Text style={styles.productSelectorPlaceholder}>Toque para selecionar um produto</Text>
            )}
            <Ionicons name="chevron-down" size={24} color={themeColors.darkGray} />
          </TouchableOpacity>

          {selectedProduct && (
            <View style={styles.productDescriptionCard}>
              <Text style={styles.productDescription}>{selectedProduct.description}</Text>
              <View style={styles.productRequirements}>
                <Text style={styles.requirementText}>
                  • Aporte mínimo: {formatCurrency(selectedProduct.minAmount.toString())}
                </Text>
                <Text style={styles.requirementText}>
                  • Período: {selectedProduct.period}
                </Text>
                <Text style={styles.requirementText}>
                  • Rendimento: {selectedProduct.yield}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Valor do Aporte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Valor do aporte</Text>
          
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>R$</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={handleAmountChange}
              placeholder="0,00"
              placeholderTextColor={themeColors.darkGray}
              keyboardType="numeric"
              maxLength={12}
            />
          </View>

          {selectedProduct && amount && (
            <View style={styles.amountValidation}>
              {parseCurrency(amount) < selectedProduct.minAmount ? (
                <Text style={styles.validationError}>
                  Valor mínimo: {formatCurrency(selectedProduct.minAmount.toString())}
                </Text>
              ) : parseCurrency(amount) > balance ? (
                <Text style={styles.validationError}>
                  Saldo insuficiente
                </Text>
              ) : (
                <Text style={styles.validationSuccess}>
                  ✓ Valor válido para aporte
                </Text>
              )}
            </View>
          )}
        </View>

        {/* Valores Sugeridos */}
        {selectedProduct && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Valores sugeridos</Text>
            <View style={styles.suggestedAmounts}>
              {[
                selectedProduct.minAmount,
                selectedProduct.minAmount * 2,
                selectedProduct.minAmount * 5,
                Math.min(selectedProduct.minAmount * 10, balance)
              ].filter(value => value <= balance).map((suggestedAmount, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestedAmountButton}
                  onPress={() => setAmount(suggestedAmount.toString())}
                  activeOpacity={0.7}
                >
                  <Text style={styles.suggestedAmountText}>
                    {formatCurrency(suggestedAmount.toString())}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Resumo do Aporte */}
        {selectedProduct && amount && parseCurrency(amount) >= selectedProduct.minAmount && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Resumo do aporte</Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Produto:</Text>
              <Text style={styles.summaryValue}>{selectedProduct.title}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Valor:</Text>
              <Text style={styles.summaryValue}>{formatCurrency(amount)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Rendimento esperado:</Text>
              <Text style={styles.summaryValue}>{selectedProduct.yield}</Text>
            </View>
            
            <View style={[styles.summaryRow, styles.summaryTotal]}>
              <Text style={styles.summaryTotalLabel}>Saldo restante:</Text>
              <Text style={styles.summaryTotalValue}>
                {formatCurrency((balance - parseCurrency(amount)).toString())}
              </Text>
            </View>
          </View>
        )}
        {/* Botão de Confirmação - Dentro do ScrollView */}
        <View style={styles.contributeSection}>
          <TouchableOpacity
            style={[
              styles.contributeButton,
              (!selectedProduct || !amount || parseCurrency(amount) < (selectedProduct?.minAmount || 0) || parseCurrency(amount) > balance) && styles.contributeButtonDisabled
            ]}
            onPress={handleContribution}
            disabled={!selectedProduct || !amount || parseCurrency(amount) < (selectedProduct?.minAmount || 0) || parseCurrency(amount) > balance || isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color={themeColors.white} />
            ) : (
              <>
                <Ionicons name="add-circle" size={24} color={themeColors.white} />
                <Text style={styles.contributeButtonText}>Realizar Aporte</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Espaçamento final */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Modal de Seleção de Produto */}
      <Modal
        visible={showProductModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Selecione um produto</Text>
            <TouchableOpacity
              onPress={() => setShowProductModal(false)}
              style={styles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color={themeColors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {availableProducts.map(renderProductItem)}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default AportesScreen;