import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Share,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useTheme } from '../constants/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import FloatingLoader from '../components/FloatingLoader';
import { createStyles } from '../styles/ExtractPdfStyles';

const ExtractPdfScreen = ({ onBack, transactionHistory = [] }) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [isLoading, setIsLoading] = useState(false);

  // Formata a data para exibição
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Formata o valor monetário
  const formatCurrency = (amount) => {
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  };

  // Calcula o saldo total
  const calculateTotalBalance = () => {
    return transactionHistory.reduce((total, transaction) => {
      return total + (transaction.isPositive ? transaction.amount : -transaction.amount);
    }, 0);
  };

  // Gera o HTML do extrato
  const generateExtractHTML = () => {
    const transactionsHTML = transactionHistory.map(transaction => `
      <tr style="border-bottom: 1px solid #e0e0e0; padding: 12px 0;">
        <td style="padding: 8px; text-align: left;">
          <div style="font-weight: 600; color: #333;">${transaction.title}</div>
          <div style="font-size: 12px; color: #666;">${formatDate(transaction.date)}</div>
          <div style="font-size: 10px; color: #999; text-transform: uppercase;">${transaction.type}</div>
        </td>
        <td style="padding: 8px; text-align: right;">
          ${transaction.percentage ? `<div style="font-size: 12px; color: #55b880; margin-bottom: 4px;">${transaction.percentage}</div>` : ''}
          <div style="font-weight: bold; color: ${transaction.isPositive ? '#55b880' : '#e74c3c'};">
            ${transaction.isPositive ? '+' : '-'} ${formatCurrency(transaction.amount)}
          </div>
        </td>
      </tr>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Extrato RTX App</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { width: 60px; height: 60px; background: #55b880; border-radius: 30px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px; }
          .title { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 8px; }
          .subtitle { font-size: 14px; color: #666; margin-bottom: 12px; }
          .date { font-size: 12px; color: #999; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 16px; font-weight: bold; color: #333; margin-bottom: 15px; text-align: center; border-bottom: 2px solid #55b880; padding-bottom: 8px; }
          .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .info-label { font-weight: 500; color: #666; }
          .info-value { font-weight: 600; color: #333; }
          .transactions-table { width: 100%; border-collapse: collapse; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">RTX</div>
            <div class="title">EXTRATO DE MOVIMENTAÇÕES</div>
            <div class="subtitle">Carteira de Investimentos</div>
            <div class="date">Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>

          <div class="section">
            <div class="section-title">INFORMAÇÕES DO CLIENTE</div>
            <div class="info-row">
              <span class="info-label">Nome:</span>
              <span class="info-value">João Silva</span>
            </div>
            <div class="info-row">
              <span class="info-label">CPF:</span>
              <span class="info-value">123.456.789-00</span>
            </div>
            <div class="info-row">
              <span class="info-label">Conta:</span>
              <span class="info-value">001234567-8</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">RESUMO FINANCEIRO</div>
            <div class="info-row">
              <span class="info-label">Saldo Atual:</span>
              <span class="info-value">${formatCurrency(calculateTotalBalance())}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Total de Transações:</span>
              <span class="info-value">${transactionHistory.length}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">MOVIMENTAÇÕES</div>
            <table class="transactions-table">
              ${transactionsHTML}
            </table>
          </div>

          <div class="footer">
            <p>Este documento é gerado automaticamente pelo sistema RTX App.</p>
            <p>Para dúvidas, entre em contato: suporte@rtxapp.com</p>
            <p>Documento válido para fins fiscais e contábeis.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      if (Platform.OS === 'web') {
        // Para web, gerar HTML e fazer download
        const htmlContent = generateExtractHTML();
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `extrato_rtx_${timestamp}.html`;
        
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        Alert.alert(
          'Download Concluído',
          'Arquivo do extrato foi baixado com sucesso!',
          [{ text: 'OK' }]
        );
        setIsLoading(false);
      } else {
        // Para mobile, gerar PDF real usando expo-print
        try {
          // Gerar o HTML do extrato
          const htmlContent = generateExtractHTML();
          
          // Gerar PDF usando expo-print
          const { uri } = await Print.printToFileAsync({
            html: htmlContent,
            base64: false
          });
          
          // Verificar se o compartilhamento está disponível
          const isAvailable = await Sharing.isAvailableAsync();
          
          if (isAvailable) {
            // Compartilhar o PDF gerado
            await Sharing.shareAsync(uri, {
              mimeType: 'application/pdf',
              dialogTitle: 'Compartilhar Extrato RTX App',
              UTI: 'com.adobe.pdf'
            });
          } else {
            // Fallback: mostrar alert com informações
            Alert.alert(
              'PDF Gerado',
              'PDF do extrato foi gerado com sucesso!',
              [{ text: 'OK' }]
            );
          }
          
          setIsLoading(false);
        } catch (printError) {
          console.error('Erro ao gerar PDF:', printError);
          
          // Fallback: usar o método anterior de compartilhamento de texto
          try {
            const extractSummary = `
📊 EXTRATO RTX APP
📅 Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}

👤 INFORMAÇÕES DO CLIENTE
Nome: João Silva
CPF: 123.456.789-00
Conta: 001234567-8

💰 RESUMO FINANCEIRO
Saldo Atual: ${formatCurrency(calculateTotalBalance())}
Total de Transações: ${transactionHistory.length}

📋 MOVIMENTAÇÕES
${transactionHistory.map(transaction => 
  `${transaction.isPositive ? '➕' : '➖'} ${transaction.title}
   📅 ${formatDate(transaction.date)}
   💰 ${transaction.isPositive ? '+' : '-'}${formatCurrency(transaction.amount)}
   ${transaction.percentage ? `📈 ${transaction.percentage}` : ''}
   ───────────────────────`
).join('\n\n')}

📞 Para dúvidas: suporte@rtxapp.com
✅ Documento válido para fins fiscais e contábeis
            `.trim();

            await Share.share({
              title: 'Extrato RTX App',
              message: extractSummary,
            });
          } catch (shareError) {
            Alert.alert(
              'Erro',
              'Erro ao gerar PDF. Tente novamente.',
              [{ text: 'OK' }]
            );
          }
          
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Erro no download:', error);
      Alert.alert('Erro', 'Erro ao gerar e baixar o extrato. Tente novamente.');
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      if (Platform.OS === 'web') {
        // Para web, simular compartilhamento
        Alert.alert('Compartilhar', 'Abrindo opções de compartilhamento...');
      } else {
        // Para mobile, tentar gerar PDF primeiro
        try {
          const htmlContent = generateExtractHTML();
          
          // Gerar PDF usando expo-print
          const { uri } = await Print.printToFileAsync({
            html: htmlContent,
            base64: false
          });
          
          // Verificar se o compartilhamento está disponível
          const isAvailable = await Sharing.isAvailableAsync();
          
          if (isAvailable) {
            // Compartilhar o PDF gerado
            await Sharing.shareAsync(uri, {
              mimeType: 'application/pdf',
              dialogTitle: 'Compartilhar Extrato RTX App',
              UTI: 'com.adobe.pdf'
            });
          } else {
            // Fallback para texto
            const extractSummary = `
📊 EXTRATO RTX APP
📅 Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}

👤 INFORMAÇÕES DO CLIENTE
Nome: João Silva
CPF: 123.456.789-00
Conta: 001234567-8

💰 RESUMO FINANCEIRO
Saldo Atual: ${formatCurrency(calculateTotalBalance())}
Total de Transações: ${transactionHistory.length}

📋 MOVIMENTAÇÕES
${transactionHistory.map(transaction => 
  `${transaction.isPositive ? '➕' : '➖'} ${transaction.title}
   📅 ${formatDate(transaction.date)}
   💰 ${transaction.isPositive ? '+' : '-'}${formatCurrency(transaction.amount)}
   ${transaction.percentage ? `📈 ${transaction.percentage}` : ''}
   ───────────────────────`
).join('\n\n')}

📞 Para dúvidas: suporte@rtxapp.com
✅ Documento válido para fins fiscais e contábeis
            `.trim();

            await Share.share({
              title: 'Extrato RTX App',
              message: extractSummary,
            });
          }
        } catch (printError) {
          console.error('Erro ao gerar PDF para compartilhamento:', printError);
          
          // Fallback para texto
          const extractSummary = `
📊 EXTRATO RTX APP
📅 Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}

👤 INFORMAÇÕES DO CLIENTE
Nome: João Silva
CPF: 123.456.789-00
Conta: 001234567-8

💰 RESUMO FINANCEIRO
Saldo Atual: ${formatCurrency(calculateTotalBalance())}
Total de Transações: ${transactionHistory.length}

📋 MOVIMENTAÇÕES
${transactionHistory.map(transaction => 
  `${transaction.isPositive ? '➕' : '➖'} ${transaction.title}
   📅 ${formatDate(transaction.date)}
   💰 ${transaction.isPositive ? '+' : '-'}${formatCurrency(transaction.amount)}
   ${transaction.percentage ? `📈 ${transaction.percentage}` : ''}
   ───────────────────────`
).join('\n\n')}

📞 Para dúvidas: suporte@rtxapp.com
✅ Documento válido para fins fiscais e contábeis
          `.trim();

          await Share.share({
            title: 'Extrato RTX App',
            message: extractSummary,
          });
        }
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao compartilhar extrato.');
    }
  };

  const rightActions = [
    { 
      icon: 'download-outline', 
      onPress: handleDownload 
    },
    { 
      icon: 'share-outline', 
      onPress: handleShare 
    }
  ];

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Extrato"
        leftIcon="arrow-back"
        leftAction={onBack}
        rightActions={rightActions}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cabeçalho do Extrato */}
        <View style={styles.extractHeader}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>RTX</Text>
          </View>
          <Text style={styles.extractTitle}>EXTRATO DE MOVIMENTAÇÕES</Text>
          <Text style={styles.extractSubtitle}>Carteira de Investimentos</Text>
          <Text style={styles.extractDate}>
            Gerado em: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>

        {/* Informações do Cliente */}
        <View style={styles.clientInfo}>
          <Text style={styles.clientInfoTitle}>INFORMAÇÕES DO CLIENTE</Text>
          <View style={styles.clientInfoRow}>
            <Text style={styles.clientInfoLabel}>Nome:</Text>
            <Text style={styles.clientInfoValue}>João Silva</Text>
          </View>
          <View style={styles.clientInfoRow}>
            <Text style={styles.clientInfoLabel}>CPF:</Text>
            <Text style={styles.clientInfoValue}>123.456.789-00</Text>
          </View>
          <View style={styles.clientInfoRow}>
            <Text style={styles.clientInfoLabel}>Conta:</Text>
            <Text style={styles.clientInfoValue}>001234567-8</Text>
          </View>
        </View>

        {/* Resumo Financeiro */}
        <View style={styles.financialSummary}>
          <Text style={styles.sectionTitle}>RESUMO FINANCEIRO</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Saldo Atual:</Text>
            <Text style={styles.summaryValue}>{formatCurrency(calculateTotalBalance())}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total de Transações:</Text>
            <Text style={styles.summaryValue}>{transactionHistory.length}</Text>
          </View>
        </View>

        {/* Lista de Transações */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>MOVIMENTAÇÕES</Text>
          
          {transactionHistory.map((transaction, index) => (
            <View key={transaction.id} style={styles.transactionRow}>
              <View style={styles.transactionLeft}>
                <Text style={styles.transactionTitle}>{transaction.title}</Text>
                <Text style={styles.transactionDate}>{formatDate(transaction.date)}</Text>
                <Text style={styles.transactionType}>{transaction.type.toUpperCase()}</Text>
              </View>
              <View style={styles.transactionRight}>
                {transaction.percentage && (
                  <Text style={styles.transactionPercentage}>{transaction.percentage}</Text>
                )}
                <Text style={[
                  styles.transactionAmount,
                  transaction.isPositive ? styles.positiveAmount : styles.negativeAmount
                ]}>
                  {transaction.isPositive ? '+' : '-'} {formatCurrency(transaction.amount)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Este documento é gerado automaticamente pelo sistema RTX App.
          </Text>
          <Text style={styles.footerText}>
            Para dúvidas, entre em contato: suporte@rtxapp.com
          </Text>
          <Text style={styles.footerText}>
            Documento válido para fins fiscais e contábeis.
          </Text>
        </View>

        {/* Botões de Ação */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.downloadButton]} 
            onPress={handleDownload}
            disabled={isLoading}
          >
            <Ionicons name="download-outline" size={20} color={themeColors.white} />
            <Text style={styles.actionButtonText}>
              {isLoading ? 'Gerando PDF...' : 'Baixar PDF'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.shareButton]} 
            onPress={handleShare}
          >
            <Ionicons name="share-outline" size={20} color={themeColors.secondary} />
            <Text style={[styles.actionButtonText, { color: themeColors.secondary }]}>
              Compartilhar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Espaçamento para a FloatingBottomNav */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Loader flutuante */}
      {isLoading && <FloatingLoader message="Gerando PDF..." />}
    </View>
  );
};

export default ExtractPdfScreen; 