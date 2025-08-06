import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import CustomHeader from '../components/CustomHeader';
import createStyles from '../styles/NotificationsStyles';

const NotificationsScreen = ({ onBack, onNavigate, showFloatingNav = false }) => {
  const { themeColors, theme } = useTheme();
  const { user } = useAuth();
  const styles = createStyles(themeColors, theme, showFloatingNav);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data para notificações
  const mockNotifications = [
    {
      id: 1,
      title: 'Novo investimento disponível',
      message: 'Uma nova oportunidade de investimento foi adicionada ao seu portfólio. Confira os detalhes e aproveite as condições especiais.',
      category: 'Investimento',
      time: '2024-01-15 10:30:00',
      isRead: false,
      icon: 'trending-up',
      iconColor: '#55B880',
      action: 'Ver investimento',
    },
    {
      id: 2,
      title: 'Relatório mensal disponível',
      message: 'Seu relatório de performance do mês está pronto. Acesse para ver como seus investimentos estão se comportando.',
      category: 'Relatório',
      time: '2024-01-14 15:45:00',
      isRead: false,
      icon: 'document-text',
      iconColor: '#113334',
      action: 'Ver relatório',
    },
    {
      id: 3,
      title: 'Atualização do app',
      message: 'Uma nova versão do RTX está disponível com melhorias de performance e novas funcionalidades.',
      category: 'Sistema',
      time: '2024-01-13 09:15:00',
      isRead: true,
      icon: 'refresh',
      iconColor: '#FFC107',
      action: 'Atualizar',
    },
    {
      id: 4,
      title: 'Lembrete de aporte',
      message: 'Não esqueça de fazer seu aporte mensal para manter seus objetivos de investimento em dia.',
      category: 'Lembrete',
      time: '2024-01-12 14:20:00',
      isRead: true,
      icon: 'calendar',
      iconColor: '#DC3545',
      action: 'Fazer aporte',
    },
    {
      id: 5,
      title: 'Curso disponível',
      message: 'O curso "Análise Fundamentalista Avançada" está disponível na sua conta. Comece a aprender agora!',
      category: 'Educação',
      time: '2024-01-11 11:00:00',
      isRead: true,
      icon: 'school',
      iconColor: '#6F42C1',
      action: 'Acessar curso',
    },
  ];

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      // Simular carregamento da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotifications(mockNotifications);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as notificações');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Agora mesmo';
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d atrás`;
    }
  };

  const handleNotificationPress = (notification) => {
    // Marcar como lida
    if (!notification.isRead) {
      const updatedNotifications = notifications.map(n => 
        n.id === notification.id ? { ...n, isRead: true } : n
      );
      setNotifications(updatedNotifications);
    }
    
    // Navegar para detalhes da notificação
    if (onNavigate) {
      onNavigate('notificationDetail', { notification });
    }
  };

  const handleActionPress = (notification) => {
    Alert.alert(
      'Ação',
      `Executando ação: ${notification.action}`,
      [{ text: 'OK' }]
    );
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => handleNotificationPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.notificationHeader}>
        <View style={[styles.notificationIcon, { backgroundColor: item.iconColor + '20' }]}>
          <Ionicons name={item.icon} size={20} color={item.iconColor} />
        </View>
        <View style={styles.notificationInfo}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationTime}>{formatTime(item.time)}</Text>
        </View>
        {!item.isRead && <View style={styles.unreadIndicator} />}
      </View>
      
      <View style={styles.notificationContent}>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
      </View>
      
      <View style={styles.notificationFooter}>
        <View style={styles.notificationCategory}>
          <Text style={styles.notificationCategoryText}>{item.category}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleActionPress(item)}
          activeOpacity={0.7}
        >
          <Text style={{ color: themeColors.secondary, fontSize: 14, fontWeight: '600' }}>
            {item.action}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="notifications-off" style={styles.emptyIcon} />
      <Text style={styles.emptyTitle}>Nenhuma notificação</Text>
      <Text style={styles.emptyMessage}>
        Você não tem notificações no momento. Novas notificações aparecerão aqui quando disponíveis.
      </Text>
    </View>
  );

  const rightActions = [
    { 
      icon: 'refresh', 
      onPress: () => loadNotifications() 
    },
    { 
      icon: 'filter-outline', 
      onPress: () => Alert.alert('Filtros', 'Funcionalidade de filtros em desenvolvimento') 
    }
  ];

  return (
    <View style={styles.container}>
      <CustomHeader 
        title={`Notificações (${notifications.filter(n => !n.isRead).length})`}
        leftIcon="arrow-back"
        leftAction={onBack}
        rightActions={rightActions}
      />



      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.notificationsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
                 contentContainerStyle={{ 
           flexGrow: 1,
           paddingBottom: 20 
         }}
      />
    </View>
  );
};

export default NotificationsScreen; 