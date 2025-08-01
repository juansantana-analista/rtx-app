import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import CustomHeader from '../components/CustomHeader';
import FloatingLoader from '../components/FloatingLoader';
import createStyles from '../styles/AportesStyles';

const AportesScreen = ({ onBack, showFloatingNav = true }) => {
  const { themeColors } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const styles = createStyles();
  const scrollViewRef = useRef(null);

  // Estados principais
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [pixQRCode, setPixQRCode] = useState(null);
  const [pixCopyPaste, setPixCopyPaste] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [pixStatus, setPixStatus] = useState('pending'); // pending, confirmed, error


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

  // Métodos de pagamento disponíveis
  const paymentMethods = [
    {
      id: 'pix',
      title: 'PIX',
      subtitle: 'Confirmação instantânea',
      icon: 'flash',
      color: '#4ECDC4',
      description: 'Transfira via PIX e seu aporte será realizado automaticamente.',
      instantaneous: true,
    },
    {
      id: 'transfer',
      title: 'Transferência Bancária',
      subtitle: 'Análise em até 2 horas úteis',
      icon: 'card',
      color: '#FF6B6B',
      description: 'Faça uma transferência e anexe o comprovante para análise.',
      instantaneous: false,
    },
  ];

  // Dados bancários para transferência
  const bankData = {
    bank: 'Banco RTX',
    agency: '1234',
    account: '12345-6',
    cnpj: '12.345.678/0001-90',
    accountHolder: 'RTX Operações Ltda',
  };



  // Formata valor em reais
  const formatCurrency = (value) => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return '';
    
    return numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  };

  // Converte string monetária para número
  const parseCurrency = (value) => {
    // Remove pontos e vírgulas e converte para número
    const cleanValue = value.replace(/[^\d]/g, '');
    return cleanValue ? parseFloat(cleanValue) / 100 : 0;
  };

  // Manipula mudança no valor do aporte
  const handleAmountChange = (text) => {
    // Remove tudo exceto números
    const numericText = text.replace(/[^\d]/g, '');
    
    // Se não há números, retorna vazio
    if (numericText === '') {
      setAmount('');
      return;
    }
    
    // Converte para número
    const numericValue = parseInt(numericText, 10);
    
    // Formata como moeda brasileira
    const formattedValue = (numericValue / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    
    setAmount(formattedValue);
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
    
    if (numericAmount > 50000) {
      Alert.alert('Valor Máximo', 'O valor máximo por transação é R$ 50.000,00.');
      return false;
    }
    
    return true;
  };

  // Selecionar arquivo/comprovante
  const selectFile = async () => {
    Alert.alert(
      'Selecionar Comprovante',
      'Escolha o tipo de arquivo para anexar:',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Imagem (JPG/PNG)', onPress: () => selectImageFile() },
        { text: 'Documento (PDF)', onPress: () => selectDocumentFile() },
        { text: 'Qualquer arquivo', onPress: () => selectAnyFile() },
      ]
    );
  };

  // Selecionar apenas imagens
  const selectImageFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/jpeg', 'image/png', 'image/jpg'],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setAttachedFile({
          uri: file.uri,
          name: file.name,
          type: file.mimeType || 'image/jpeg',
          size: file.size,
        });
        
        Alert.alert('Sucesso', 'Imagem selecionada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Erro ao selecionar imagem. Tente novamente.');
    }
  };

  // Selecionar apenas PDFs
  const selectDocumentFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf'],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setAttachedFile({
          uri: file.uri,
          name: file.name,
          type: file.mimeType || 'application/pdf',
          size: file.size,
        });
        
        Alert.alert('Sucesso', 'Documento selecionado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao selecionar documento:', error);
      Alert.alert('Erro', 'Erro ao selecionar documento. Tente novamente.');
    }
  };

  // Selecionar qualquer tipo de arquivo
  const selectAnyFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        
        // Verificar se é um tipo aceito
        const acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
        const fileType = file.mimeType || '';
        
        if (!acceptedTypes.includes(fileType)) {
          Alert.alert(
            'Tipo não suportado', 
            'Por favor, selecione apenas arquivos JPG, PNG ou PDF.'
          );
          return;
        }
        
        setAttachedFile({
          uri: file.uri,
          name: file.name,
          type: fileType,
          size: file.size,
        });
        
        Alert.alert('Sucesso', 'Arquivo selecionado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao selecionar arquivo:', error);
      Alert.alert('Erro', 'Erro ao selecionar arquivo. Tente novamente.');
    }
  };

  // Processa PIX
  const handlePixPayment = async () => {
    if (!validateContribution()) return;
    
    setIsLoading(true);
    try {
      // Simular geração de PIX (futuramente será API real)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular QR Code e PIX copia e cola
      setPixQRCode('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
      setPixCopyPaste('00020126360014BR.GOV.BCB.PIX0114+5511999999999520400005303986540510.005802BR5913RTX Operacoes6008BRASILIA62070503***63041234');
      
      setShowPixModal(true);
      setPixStatus('pending');
      
      // Simular confirmação do PIX após 10 segundos
      setTimeout(() => {
        setPixStatus('confirmed');
        Alert.alert(
          'PIX Confirmado!',
          `Seu aporte de ${formatCurrency(parseCurrency(amount).toString())} no produto ${selectedProduct.title} foi realizado com sucesso!`,
          [
            {
              text: 'OK',
              onPress: () => {
                setShowPixModal(false);
                onBack();
              }
            }
          ]
        );
      }, 10000);
      
    } catch (error) {
      setPixStatus('error');
      Alert.alert('Erro', 'Não foi possível gerar o PIX. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Processa transferência bancária
  const handleBankTransfer = async () => {
    if (!validateContribution()) return;
    
    if (selectedMethod?.id === 'transfer' && !attachedFile) {
      Alert.alert('Comprovante Obrigatório', 'Anexe o comprovante da transferência.');
      return;
    }
    
    setIsLoading(true);
    try {
      // Simular envio de comprovante (futuramente será API real)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      Alert.alert(
        'Comprovante Enviado!',
        `Seu comprovante foi enviado com sucesso. O aporte de ${formatCurrency(parseCurrency(amount).toString())} no produto ${selectedProduct.title} será analisado e realizado em até 2 horas úteis.`,
        [
          {
            text: 'OK',
            onPress: () => onBack()
          }
        ]
      );
      
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar o comprovante. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Copia PIX para clipboard
  const copyPixToClipboard = async () => {
    Alert.alert('Copiado!', 'Código PIX copiado para a área de transferência.');
  };

  // Formatar tamanho do arquivo
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Rola a tela para baixo para mostrar o botão de confirmação
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 300);
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
        scrollToBottom();
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
      onPress: () => Alert.alert('Ajuda', 'Escolha um produto, valor e método de pagamento para realizar seu aporte.') 
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

      <ScrollView 
        ref={scrollViewRef}
        style={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        {/* Valor do Aporte */}
        <View style={[styles.section, styles.firstSection]}>
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

          <View style={styles.amountLimits}>
            <Text style={styles.limitText}>Mín: R$ 10,00 • Máx: R$ 50.000,00</Text>
          </View>


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

          {selectedProduct && amount && (
            <View style={styles.amountValidation}>
              {parseCurrency(amount) < selectedProduct.minAmount ? (
                <Text style={styles.validationError}>
                  Valor mínimo: {formatCurrency(selectedProduct.minAmount.toString())}
                </Text>
              ) : parseCurrency(amount) > 50000 ? (
                <Text style={styles.validationError}>
                  Valor máximo: R$ 50.000,00
                </Text>
              ) : (
                <Text style={styles.validationSuccess}>
                  ✓ Valor válido para aporte
                </Text>
              )}
            </View>
          )}


        </View>

        {/* Métodos de Pagamento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Método de pagamento</Text>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                selectedMethod?.id === method.id && styles.selectedPaymentMethod
              ]}
              onPress={() => {
                setSelectedMethod(method);
                scrollToBottom();
              }}
              activeOpacity={0.7}
            >
              <View style={[styles.paymentIcon, { backgroundColor: method.color }]}>
                <Ionicons name={method.icon} size={24} color={themeColors.white} />
              </View>
              
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentTitle}>{method.title}</Text>
                <Text style={styles.paymentSubtitle}>{method.subtitle}</Text>
                <Text style={styles.paymentDescription}>{method.description}</Text>
              </View>
              
              {method.instantaneous && (
                <View style={styles.instantBadge}>
                  <Text style={styles.instantBadgeText}>Instantâneo</Text>
                </View>
              )}
              
              {selectedMethod?.id === method.id && (
                <Ionicons name="checkmark-circle" size={24} color={themeColors.success} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Seção específica para transferência bancária */}
        {selectedMethod?.id === 'transfer' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dados bancários</Text>
            
            <View style={styles.bankDataCard}>
              <View style={styles.bankDataRow}>
                <Text style={styles.bankDataLabel}>Banco:</Text>
                <Text style={styles.bankDataValue}>{bankData.bank}</Text>
              </View>
              <View style={styles.bankDataRow}>
                <Text style={styles.bankDataLabel}>Agência:</Text>
                <Text style={styles.bankDataValue}>{bankData.agency}</Text>
              </View>
              <View style={styles.bankDataRow}>
                <Text style={styles.bankDataLabel}>Conta:</Text>
                <Text style={styles.bankDataValue}>{bankData.account}</Text>
              </View>
              <View style={styles.bankDataRow}>
                <Text style={styles.bankDataLabel}>CNPJ:</Text>
                <Text style={styles.bankDataValue}>{bankData.cnpj}</Text>
              </View>
              <View style={styles.bankDataRow}>
                <Text style={styles.bankDataLabel}>Titular:</Text>
                <Text style={styles.bankDataValue}>{bankData.accountHolder}</Text>
              </View>
            </View>

            <Text style={styles.transferInstruction}>
              Faça a transferência para os dados acima e anexe o comprovante abaixo.
            </Text>

            {/* Anexar Comprovante */}
            <TouchableOpacity
              style={styles.attachButton}
              onPress={selectFile}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={attachedFile ? "document-attach" : "add-circle-outline"} 
                size={24} 
                color={themeColors.secondary} 
              />
              <Text style={styles.attachButtonText}>
                {attachedFile ? `Arquivo: ${attachedFile.name}` : 'Anexar Comprovante'}
              </Text>
            </TouchableOpacity>

            {attachedFile && (
              <View style={styles.attachedFileInfo}>
                <Ionicons name="checkmark-circle" size={16} color={themeColors.success} />
                <View style={styles.attachedFileDetails}>
                  <Text style={styles.attachedFileText}>Comprovante anexado com sucesso</Text>
                  <Text style={styles.attachedFileSize}>
                    {attachedFile.size ? formatFileSize(attachedFile.size) : 'Tamanho desconhecido'}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setAttachedFile(null)}>
                  <Ionicons name="close-circle" size={16} color={themeColors.error} />
                </TouchableOpacity>
              </View>
            )}
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
              <Text style={styles.summaryValue}>{formatCurrency(parseCurrency(amount).toString())}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Rendimento esperado:</Text>
              <Text style={styles.summaryValue}>{selectedProduct.yield}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Método de pagamento:</Text>
              <Text style={styles.summaryValue}>{selectedMethod?.title || 'Não selecionado'}</Text>
            </View>
          </View>
        )}

        {/* Botão de Confirmação */}
        {selectedProduct && selectedMethod && (
          <View style={styles.contributeSection}>
            <TouchableOpacity
              style={[
                styles.contributeButton,
                (!amount || parseCurrency(amount) < selectedProduct.minAmount || 
                 parseCurrency(amount) > 50000 || 
                 (selectedMethod?.id === 'transfer' && !attachedFile)) && styles.contributeButtonDisabled
              ]}
              onPress={selectedMethod?.id === 'pix' ? handlePixPayment : handleBankTransfer}
              disabled={!amount || parseCurrency(amount) < selectedProduct.minAmount || 
                       parseCurrency(amount) > 50000 || 
                       (selectedMethod?.id === 'transfer' && !attachedFile) || isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color={themeColors.white} />
              ) : (
                <>
                  <Ionicons 
                    name={selectedMethod?.id === 'pix' ? 'flash' : 'card'} 
                    size={24} 
                    color={themeColors.white} 
                  />
                  <Text style={styles.contributeButtonText}>
                    {selectedMethod?.id === 'pix' ? 'Gerar PIX' : 'Enviar Comprovante'}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}

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

      {/* Modal do PIX */}
      <Modal
        visible={showPixModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>PIX Gerado</Text>
            <TouchableOpacity
              onPress={() => setShowPixModal(false)}
              style={styles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color={themeColors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} contentContainerStyle={styles.pixModalContent}>
            {/* Status do PIX */}
            <View style={styles.pixStatusCard}>
              <Ionicons 
                name={pixStatus === 'confirmed' ? 'checkmark-circle' : 
                      pixStatus === 'error' ? 'close-circle' : 'time'} 
                size={48} 
                color={pixStatus === 'confirmed' ? themeColors.success : 
                       pixStatus === 'error' ? themeColors.error : '#FF9500'} 
              />
              <Text style={styles.pixStatusText}>
                {pixStatus === 'confirmed' ? 'PIX Confirmado!' : 
                 pixStatus === 'error' ? 'Erro no PIX' : 'Aguardando Pagamento'}
              </Text>
              <Text style={styles.pixAmountText}>{formatCurrency(parseCurrency(amount).toString())}</Text>
              <Text style={styles.pixProductText}>{selectedProduct?.title}</Text>
            </View>

            {pixStatus === 'pending' && (
              <>
                {/* QR Code */}
                <View style={styles.qrCodeSection}>
                  <Text style={styles.qrCodeTitle}>Escaneie o QR Code</Text>
                  <View style={styles.qrCodeContainer}>
                    <View style={styles.qrCodePlaceholder}>
                      <Ionicons name="qr-code" size={120} color={themeColors.darkGray} />
                    </View>
                  </View>
                </View>

                {/* PIX Copia e Cola */}
                <View style={styles.pixCopySection}>
                  <Text style={styles.pixCopyTitle}>Ou copie o código PIX</Text>
                  <TouchableOpacity 
                    style={styles.pixCopyButton}
                    onPress={copyPixToClipboard}
                  >
                    <Text style={styles.pixCopyCode} numberOfLines={3}>
                      {pixCopyPaste}
                    </Text>
                    <Ionicons name="copy" size={20} color={themeColors.secondary} />
                  </TouchableOpacity>
                </View>

                {/* Instruções */}
                <View style={styles.pixInstructions}>
                  <Text style={styles.instructionTitle}>Como pagar:</Text>
                  <Text style={styles.instructionText}>1. Abra o app do seu banco</Text>
                  <Text style={styles.instructionText}>2. Escaneie o QR Code ou cole o código</Text>
                  <Text style={styles.instructionText}>3. Confirme o pagamento</Text>
                  <Text style={styles.instructionText}>4. Seu aporte será realizado automaticamente</Text>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>

      {/* Loader flutuante */}
      {isLoading && <FloatingLoader message="Processando aporte..." />}
    </View>
  );
};

export default AportesScreen;