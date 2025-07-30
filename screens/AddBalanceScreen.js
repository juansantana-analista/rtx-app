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
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import CustomHeader from '../components/CustomHeader';
import createStyles from '../styles/AddBalanceStyles';

const AddBalanceScreen = ({ onBack }) => {
  const { themeColors } = useTheme();
  const { user } = useAuth();
  const styles = createStyles();

  // Estados principais
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [pixQRCode, setPixQRCode] = useState(null);
  const [pixCopyPaste, setPixCopyPaste] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [pixStatus, setPixStatus] = useState('pending'); // pending, confirmed, error

  // Métodos de pagamento disponíveis
  const paymentMethods = [
    {
      id: 'pix',
      title: 'PIX',
      subtitle: 'Confirmação instantânea',
      icon: 'flash',
      color: '#4ECDC4',
      description: 'Transfira via PIX e seu saldo será creditado automaticamente.',
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

  // Manipula mudança no valor
  const handleAmountChange = (text) => {
    const numericText = text.replace(/[^\d,]/g, '');
    setAmount(numericText);
  };

  // Valida se o valor é válido
  const validateAmount = () => {
    const numericAmount = parseCurrency(amount);
    
    if (numericAmount <= 0) {
      Alert.alert('Erro', 'Digite um valor válido.');
      return false;
    }
    
    if (numericAmount < 10) {
      Alert.alert('Valor Mínimo', 'O valor mínimo para adicionar saldo é R$ 10,00.');
      return false;
    }
    
    if (numericAmount > 50000) {
      Alert.alert('Valor Máximo', 'O valor máximo por transação é R$ 50.000,00.');
      return false;
    }
    
    return true;
  };

  // Processa PIX
  const handlePixPayment = async () => {
    if (!validateAmount()) return;
    
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
          `Seu saldo de ${formatCurrency(amount)} foi creditado com sucesso!`,
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

  // Selecionar arquivo/comprovante usando apenas DocumentPicker
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

      console.log('Image selection result:', result);

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

      console.log('Document selection result:', result);

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

      console.log('Any file selection result:', result);

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

  // Processa transferência bancária
  const handleBankTransfer = async () => {
    if (!validateAmount()) return;
    
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
        `Seu comprovante foi enviado com sucesso. O saldo de ${formatCurrency(amount)} será analisado e creditado em até 2 horas úteis.`,
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
    // Usar Clipboard do React Native ou Expo
    // await Clipboard.setStringAsync(pixCopyPaste);
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

  const rightActions = [
    { 
      icon: 'help-circle-outline', 
      onPress: () => Alert.alert('Ajuda', 'Escolha um método de pagamento e adicione saldo à sua conta.') 
    }
  ];

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Adicionar Saldo"
        leftIcon="arrow-back"
        leftAction={onBack}
        rightActions={rightActions}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Valor do Depósito */}
        <View style={[styles.section, styles.firstSection]}>
          <Text style={styles.sectionTitle}>Valor do depósito</Text>
          
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

          {/* Valores Sugeridos */}
          <View style={styles.suggestedAmounts}>
            {[100, 500, 1000, 5000].map((suggestedAmount, index) => (
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
              onPress={() => setSelectedMethod(method)}
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

        {/* Botão de Confirmação - Apenas se método selecionado */}
        {selectedMethod && (
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                (!amount || parseCurrency(amount) < 10 || 
                 (selectedMethod?.id === 'transfer' && !attachedFile)) && styles.actionButtonDisabled
              ]}
              onPress={selectedMethod?.id === 'pix' ? handlePixPayment : handleBankTransfer}
              disabled={!amount || parseCurrency(amount) < 10 || 
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
                  <Text style={styles.actionButtonText}>
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
              <Text style={styles.pixAmountText}>{formatCurrency(amount)}</Text>
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
                  <Text style={styles.instructionText}>4. Seu saldo será creditado automaticamente</Text>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default AddBalanceScreen;