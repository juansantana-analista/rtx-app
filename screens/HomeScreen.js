import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import { apiRequest } from '../services/api';
import { getNoticias } from '../services/newsService';
import CustomHeader from '../components/CustomHeader';
import FloatingBottomNav from '../components/FloatingBottomNav';
import FloatingLoader from '../components/FloatingLoader';
import createStyles from '../styles/HomeStyles';
import createFloatingNavStyles from '../styles/FloatingBottomNavStyles';

const HomeScreen = ({ onWallet, onProfile, onLogout, onNavigate, onOpenMenu, showFloatingNav = true, showSideMenu = true }) => {
  const { theme, themeColors, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const styles = createStyles();
  const floatingStyles = createFloatingNavStyles({ ...themeColors, theme });
  const [balance, setBalance] = useState(null);
  const [totalBalance, setTotalBalance] = useState(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [balanceError, setBalanceError] = useState('');
  const [news, setNews] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState('');
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const fetchBalance = async () => {
    if (!isAuthenticated || !user?.id) {
      setBalance(null);
      setBalanceError('');
      setIsLoadingBalance(false);
      return;
    }
    setIsLoadingBalance(true);
    setBalanceError('');
    try {
      const result = await apiRequest({
        classe: 'CarteiraRestService',
        metodo: 'getCarteirasUsuario',
        params: { pessoa_id: user.pessoaid }
      });
      

      
      if (result.status === 'success' && result.data && result.data.length > 0) {
        setBalance(result.data[0].saldo);
        setTotalBalance(result.data[0].saldo_total);
      } else {
        setBalance('0');
        setTotalBalance('0');
        setBalanceError('Saldo não encontrado');
      }
    } catch (e) {
      // Se for erro de autenticação, não mostra erro na tela
      if (e.message.includes('Sessão expirada') || e.message.includes('Token') || e.message.includes('login')) {
        // Erro de autenticação ao buscar saldo
        // O logout será tratado automaticamente pelo apiRequest
        return;
      }
      setBalanceError(e.message || 'Erro ao buscar saldo');
    } finally {
      setIsLoadingBalance(false);
    }
  };

  const fetchNews = async () => {
    if (!isAuthenticated) {
      setNews([]);
      setNewsError('');
      setIsLoadingNews(false);
      return;
    }
    setIsLoadingNews(true);
    setNewsError('');
    try {
      const newsData = await getNoticias();
      // Pegar apenas as primeiras 4 notícias para a prévia
      setNews(newsData.slice(0, 4));
    } catch (error) {
      setNewsError('Erro ao carregar notícias');
    } finally {
      setIsLoadingNews(false);
    }
  };

  useEffect(() => {
    fetchBalance();
    fetchNews();
  }, [user, isAuthenticated]);

  const handleRefreshBalance = () => {
    fetchBalance();
  };

    const allMenuItems = [
    {
      id: 1,
      title: 'Aporte',
      icon: 'add-circle',
      badge: 'Novo',
      onPress: () => onNavigate && onNavigate('aportes')
    },
    {
      id: 2,
      title: 'TSX Locadora',
      icon: 'car-sport',
      onPress: () => onNavigate && onNavigate('tsxLocadora')
    },
    {
      id: 3,
      title: 'Escritórios',
      icon: 'business',
      onPress: () => onNavigate && onNavigate('offices')
    },
    {
      id: 4,
      title: 'Notícias',
      icon: 'newspaper',
      onPress: () => onNavigate && onNavigate('news')
    },
    {
      id: 5,
      title: 'Meus Clientes',
      icon: 'people',
      onPress: () => onNavigate && onNavigate('myClients')
    },
    {
      id: 6,
      title: 'Shop',
      icon: 'bag',
      onPress: () => onNavigate && onNavigate('shop')
    },
    {
      id: 7,
      title: 'Relatórios',
      icon: 'document-text',
      onPress: () => console.log('Relatórios')
    },
    {
      id: 8,
      title: showMoreOptions ? 'Mostrar menos' : 'Mostrar mais',
      icon: showMoreOptions ? 'chevron-up' : 'ellipsis-horizontal',
      onPress: () => setShowMoreOptions(!showMoreOptions)
    },
  ];

  // Mostrar apenas 3 itens + botão "Mostrar mais" quando não expandido
  const menuItems = showMoreOptions ? allMenuItems : allMenuItems.slice(0, 3).concat(allMenuItems[7]);

  // Dados mockados dos investimentos do usuário
  const userInvestments = [
    {
      id: 1,
      productName: 'PRIVATE',
      investedAmount: 5000,
      dueDate: '2024-06-15',
      yieldPercentage: 14.5,
      status: 'active'
    },
    {
      id: 2,
      productName: 'SELECT',
      investedAmount: 15000,
      dueDate: '2025-03-20',
      yieldPercentage: 8.2,
      status: 'active'
    }
  ];

  // Função para formatar a data das notícias
  const formatNewsDate = (dateString) => {
    try {
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
    } catch (error) {
      return 'Data não disponível';
    }
  };

  const rightActions = [
    { 
      icon: theme === 'dark' ? 'sunny-outline' : 'moon-outline', 
      onPress: toggleTheme 
    },
    { 
      icon: 'notifications-outline', 
      onPress: () => onNavigate && onNavigate('notifications') 
    }
  ];

  const handleWalletPress = () => {
    setActiveTab('wallet');
    if (onWallet && typeof onWallet === 'function') {
      onWallet();
    } else {
      console.warn('onWallet function not provided');
    }
  };

  const handleProfilePress = () => {
    setActiveTab('profile');
    if (onProfile && typeof onProfile === 'function') {
      onProfile();
    } else {
      console.warn('onProfile function not provided');
    }
  };

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    console.log('Tab selecionada:', tabId);
    
    // Navegação para outras telas
    switch (tabId) {
      case 'investment':
        if (onNavigate && typeof onNavigate === 'function') {
          onNavigate('investment');
        }
        break;
      case 'shop':
        console.log('Navegar para shop');
        break;
      default:
        break;
    }
  };

  const handleLogoutPress = () => {
    if (onLogout && typeof onLogout === 'function') {
      onLogout();
    } else {
      console.warn('onLogout function not provided');
    }
  };

  // Formata a data de vencimento
  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Formata o valor investido
  const formatInvestedAmount = (amount) => {
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  };



  // Função para lidar com o clique no card de investimento
  const handleInvestmentPress = (investment) => {
    console.log('Investimento clicado:', investment);
    // Aqui você pode navegar para uma tela de detalhes do investimento
    // onNavigate && onNavigate('investmentDetails', { investment });
  };

  // Função para lidar com o clique nas notícias
  const handleNewsPress = (news) => {
    console.log('Notícia clicada:', news.titulo);
    onNavigate && onNavigate('newsDetail', { news });
  };

  return (
    <View style={styles.container}>
      <CustomHeader 
        showCenteredLogo={true}
        leftIcon="menu-outline"
        leftAction={onOpenMenu}
        rightActions={rightActions}
      />

      {/* Conteúdo Rolável */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }} // Espaço para o nav flutuante
      >
        {/* Card de Saldo */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View style={styles.balanceInfo}>
              <Text style={styles.balanceLabel}>SALDO TOTAL EM OPERAÇÃO</Text>
              <Text style={styles.balanceAmount}>
                {isLoadingBalance ? 'Carregando...' : (isBalanceVisible ? `R$ ${Number(totalBalance || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}` : '••••••••••')}
              </Text>
              {balanceError ? <Text style={{color: 'red', fontSize: 12}}>{balanceError}</Text> : null}
            </View>
            <View style={styles.balanceActions}>
              <TouchableOpacity style={styles.balanceActionButton} onPress={handleRefreshBalance}>
                <Ionicons name="refresh" size={20} color={themeColors.secondary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.balanceActionButton} onPress={() => setIsBalanceVisible(!isBalanceVisible)}>
                <Ionicons 
                  name={isBalanceVisible ? "eye-off" : "eye"} 
                  size={20} 
                  color={themeColors.secondary} 
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.balanceCardActions}>
            <TouchableOpacity style={styles.accessWallet} onPress={handleWalletPress}>
              <Text style={styles.accessWalletText}>Acessar carteira</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu de Ações */}
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons 
                  name={item.icon} 
                  size={24} 
                  color={item.id === 8 ? themeColors.darkGray : themeColors.secondary} 
                />
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Cards Promocionais */}
        <View style={styles.promoSection}>
          {/* Card Participação Disponível */}
          <View style={styles.participationCard}>
            <View style={styles.participationContent}>
              <Text style={styles.participationTitle}>Participação disponível do dia</Text>
              <Text style={styles.participationTitle}>01 ao dia 05</Text>
            </View>
          </View>
        </View>

        {/* Meus Investimentos */}
        <View style={styles.opportunitiesSection}>
          <Text style={styles.sectionTitle}>Meus Investimentos</Text>
          
          {userInvestments.length > 0 ? (
            userInvestments.map((investment) => (
            <TouchableOpacity 
              key={investment.id} 
              style={styles.investmentCard}
              onPress={() => handleInvestmentPress(investment)}
              activeOpacity={0.7}
            >
                              <View style={styles.investmentInfo}>
                  <View style={styles.investmentHeader}>
                    <Text style={styles.investmentTitle}>{investment.productName}</Text>
                    <Text style={[styles.investmentYield, { color: themeColors.success }]}>
                      +{investment.yieldPercentage.toFixed(1)}%
                    </Text>
                  </View>
                  <Text style={styles.investmentAmount}>
                    {formatInvestedAmount(investment.investedAmount)}
                  </Text>
                  <View style={styles.investmentDetails}>
                    <Text style={[styles.investmentDueDate, { color: themeColors.success }]}>
                      {formatDueDate(investment.dueDate)}
                    </Text>
                    <Ionicons name="chevron-forward" size={20} color={themeColors.darkGray} />
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyInvestments}>
              <Text style={styles.emptyInvestmentsText}>
                Você ainda não possui investimentos ativos.
              </Text>
              <TouchableOpacity 
                style={styles.newInvestmentButton}
                onPress={() => onNavigate && onNavigate('aportes')}
              >
                <Text style={styles.newInvestmentButtonText}>Fazer primeiro aporte</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Notícias */}
        <View style={styles.newsSection}>
          <View style={styles.newsHeader}>
            <Text style={styles.sectionTitle}>Notícias</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => onNavigate && onNavigate('news')}
            >
              <Text style={styles.seeAllButtonText}>Ver todas</Text>
              <Ionicons name="chevron-forward" size={16} color={themeColors.secondary} />
            </TouchableOpacity>
          </View>
          
          {isLoadingNews ? (
            <View style={styles.newsLoading}>
              <Text style={styles.newsLoadingText}>Carregando notícias...</Text>
            </View>
          ) : newsError ? (
            <View style={styles.newsError}>
              <Text style={styles.newsErrorText}>{newsError}</Text>
            </View>
          ) : news.length > 0 ? (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.newsScrollContent}
            >
              {news.map((newsItem) => (
                <TouchableOpacity 
                  key={newsItem.id} 
                  style={styles.newsCard}
                  onPress={() => handleNewsPress(newsItem)}
                  activeOpacity={0.7}
                >
                  <Image 
                    source={{ uri: newsItem.image_url || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop' }} 
                    style={styles.newsImage}
                    resizeMode="cover"
                  />
                  <View style={styles.newsCardContent}>
                    <View style={styles.newsCardHeader}>
                      <Text style={styles.newsCategory}>Notícia</Text>
                      <Text style={styles.newsTime}>{formatNewsDate(newsItem.publicado_em)}</Text>
                    </View>
                    <Text style={styles.newsTitle} numberOfLines={2}>
                      {newsItem.titulo}
                    </Text>
                    <View style={styles.newsCardFooter}>
                      <Text style={styles.newsReadTime}>{newsItem.tempo_leitura}</Text>
                      <Ionicons name="chevron-forward" size={16} color={themeColors.darkGray} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.newsEmpty}>
              <Text style={styles.newsEmptyText}>Nenhuma notícia disponível</Text>
            </View>
          )}
        </View>

        {/* Espaçamento para o nav flutuante */}
        <View style={floatingStyles.bottomSpacing} />
      </ScrollView>

      {/* Navigation Bar Flutuante - apenas se showFloatingNav for true */}
      {showFloatingNav && (
        <FloatingBottomNav
          activeTab={activeTab}
          onTabPress={handleTabPress}
          onWalletPress={handleWalletPress}
          onProfilePress={handleProfilePress}
        />
      )}

      {/* Loader flutuante */}
      {isLoadingBalance && <FloatingLoader message="Carregando saldo..." />}
    </View>
  );
};

export default HomeScreen;