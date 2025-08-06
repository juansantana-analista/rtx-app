import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import CustomHeader from '../components/CustomHeader';
import createStyles from '../styles/NotificationsStyles';

const NotificationDetailScreen = ({ route, onBack, showFloatingNav = false }) => {
  const { themeColors, theme } = useTheme();
  const { user } = useAuth();
  const styles = createStyles(themeColors, theme, showFloatingNav);
  const { notification } = route.params || {};

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleActionPress = () => {
    Alert.alert(
      'Ação',
      `Executando ação: ${notification.action}`,
      [{ text: 'OK' }]
    );
  };

  const handleSecondaryAction = () => {
    Alert.alert(
      'Ação Secundária',
      'Executando ação secundária...',
      [{ text: 'OK' }]
    );
  };

  if (!notification) {
    return (
      <View style={styles.container}>
        <CustomHeader 
          title="Detalhes"
          leftIcon="arrow-back"
          leftAction={onBack}
          rightActions={[]}
        />
        <View style={styles.emptyState}>
          <Ionicons name="alert-circle" style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>Notificação não encontrada</Text>
          <Text style={styles.emptyMessage}>
            A notificação solicitada não foi encontrada ou foi removida.
          </Text>
        </View>
      </View>
    );
  }

  const rightActions = [
    { 
      icon: 'share-outline', 
      onPress: () => Alert.alert('Compartilhar', 'Funcionalidade de compartilhamento em desenvolvimento') 
    },
    { 
      icon: 'bookmark-outline', 
      onPress: () => Alert.alert('Favoritar', 'Funcionalidade de favoritar em desenvolvimento') 
    }
  ];

  return (
    <View style={styles.detailContainer}>
      <CustomHeader 
        title="Detalhes"
        leftIcon="arrow-back"
        leftAction={onBack}
        rightActions={rightActions}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.detailHeader}>
          <View style={[styles.notificationIcon, { backgroundColor: notification.iconColor + '20' }]}>
            <Ionicons name={notification.icon} size={24} color={notification.iconColor} />
          </View>
          
          <Text style={styles.detailTitle}>{notification.title}</Text>
          
          <View style={styles.detailMeta}>
            <Text style={styles.detailTime}>{formatTime(notification.time)}</Text>
            <View style={styles.detailCategory}>
              <Text style={styles.detailCategoryText}>{notification.category}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailContent}>
          <Text style={styles.detailMessage}>
            {notification.message}
          </Text>

          {/* Conteúdo adicional baseado na categoria */}
          {notification.category === 'Investimento' && (
            <View style={styles.notificationItem}>
              <Text style={styles.notificationTitle}>Detalhes do Investimento</Text>
              <Text style={styles.notificationMessage}>
                • Rentabilidade esperada: 12% ao ano{'\n'}
                • Prazo mínimo: 6 meses{'\n'}
                • Valor mínimo: R$ 1.000,00{'\n'}
                • Liquidez: D+30
              </Text>
            </View>
          )}

          {notification.category === 'Relatório' && (
            <View style={styles.notificationItem}>
              <Text style={styles.notificationTitle}>Resumo do Relatório</Text>
              <Text style={styles.notificationMessage}>
                • Performance do mês: +8,5%{'\n'}
                • Melhor ativo: Ação XYZ (+15,2%){'\n'}
                • Pior ativo: Fundo ABC (-2,1%){'\n'}
                • Total investido: R$ 25.000,00
              </Text>
            </View>
          )}

          <View style={styles.detailActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.primaryActionButton]}
              onPress={handleActionPress}
              activeOpacity={0.7}
            >
              <Text style={styles.primaryActionButtonText}>{notification.action}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSecondaryAction}
              activeOpacity={0.7}
            >
              <Text style={styles.actionButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationDetailScreen; 