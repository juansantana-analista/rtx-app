import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import CustomHeader from '../components/CustomHeader';
import createStyles from '../styles/NewsStyles';

const NewsScreen = ({ onBack, showFloatingNav = true }) => {
  const { themeColors } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const styles = createStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('todas');

  // Dados mockados das notícias
  const newsData = [
    {
      id: 1,
      title: 'Ibovespa fecha em alta de 2,3% com dados positivos da economia',
      summary: 'O principal índice da bolsa brasileira registrou forte recuperação nesta terça-feira, impulsionado por indicadores econômicos que superaram as expectativas do mercado.',
      category: 'mercado',
      publishedAt: '2024-01-15T10:30:00Z',
      readTime: '3 min',
      image: 'https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=Ibovespa',
      featured: true,
    },
    {
      id: 2,
      title: 'Dólar cai para R$ 4,85 com melhora no cenário externo',
      summary: 'A moeda americana registrou queda de 1,2% frente ao real, influenciada por dados positivos da economia global e redução da aversão ao risco.',
      category: 'cambio',
      publishedAt: '2024-01-15T09:15:00Z',
      readTime: '2 min',
      image: 'https://via.placeholder.com/300x200/7B68EE/FFFFFF?text=Dolar',
    },
    {
      id: 3,
      title: 'Tesouro Direto: Títulos públicos registram forte demanda',
      summary: 'Investidores buscaram refúgio em títulos públicos, com volume de aplicações aumentando 15% em relação ao mês anterior.',
      category: 'investimentos',
      publishedAt: '2024-01-15T08:45:00Z',
      readTime: '4 min',
      image: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Tesouro',
    },
    {
      id: 4,
      title: 'Petrobras anuncia novo plano de investimentos',
      summary: 'A estatal apresentou estratégia de investimentos de R$ 102 bilhões para os próximos 5 anos, focando em energias renováveis.',
      category: 'empresas',
      publishedAt: '2024-01-14T16:20:00Z',
      readTime: '5 min',
      image: 'https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Petrobras',
    },
    {
      id: 5,
      title: 'Bitcoin atinge máxima do ano com adoção institucional',
      summary: 'A criptomoeda registrou valorização de 8% em 24 horas, impulsionada por notícias sobre adoção por grandes instituições financeiras.',
      category: 'criptomoedas',
      publishedAt: '2024-01-14T14:30:00Z',
      readTime: '3 min',
      image: 'https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=Bitcoin',
    },
    {
      id: 6,
      title: 'BC mantém Selic em 11,75% ao ano',
      summary: 'O Comitê de Política Monetária decidiu manter a taxa básica de juros inalterada, conforme esperado pelo mercado.',
      category: 'economia',
      publishedAt: '2024-01-14T12:00:00Z',
      readTime: '2 min',
      image: 'https://via.placeholder.com/300x200/96CEB4/FFFFFF?text=BC',
    },
  ];

  // Categorias disponíveis
  const categories = [
    { id: 'todas', title: 'Todas', icon: 'grid' },
    { id: 'mercado', title: 'Mercado', icon: 'trending-up' },
    { id: 'economia', title: 'Economia', icon: 'analytics' },
    { id: 'investimentos', title: 'Investimentos', icon: 'wallet' },
    { id: 'empresas', title: 'Empresas', icon: 'business' },
    { id: 'criptomoedas', title: 'Cripto', icon: 'logo-bitcoin' },
  ];

  // Formata a data de publicação
  const formatPublishedDate = (dateString) => {
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

  // Filtra notícias por categoria
  const filteredNews = selectedCategory === 'todas' 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory);

  // Função para atualizar as notícias
  const onRefresh = async () => {
    setRefreshing(true);
    // Simular carregamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  // Função para lidar com o clique na notícia
  const handleNewsPress = (news) => {
    console.log('Notícia clicada:', news.title);
    // Aqui você pode navegar para uma tela de detalhes da notícia
  };

  const rightActions = [
    { 
      icon: 'search-outline', 
      onPress: () => console.log('Buscar notícias') 
    },
    { 
      icon: 'bookmark-outline', 
      onPress: () => console.log('Notícias salvas') 
    }
  ];

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Notícias"
        leftIcon="arrow-back"
        leftAction={onBack}
        rightActions={rightActions}
      />

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[themeColors.secondary]}
            tintColor={themeColors.secondary}
          />
        }
      >
        {/* Categorias */}
        <View style={styles.categoriesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={category.icon} 
                  size={16} 
                  color={selectedCategory === category.id ? themeColors.white : themeColors.text} 
                />
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}>
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Lista de Notícias */}
        <View style={styles.newsContainer}>
          {filteredNews.map((news, index) => (
            <TouchableOpacity
              key={news.id}
              style={[
                styles.newsCard,
                news.featured && styles.featuredNewsCard
              ]}
              onPress={() => handleNewsPress(news)}
              activeOpacity={0.7}
            >
              {/* Imagem da notícia */}
              <View style={styles.newsImageContainer}>
                <View style={styles.newsImagePlaceholder}>
                  <Ionicons name="newspaper" size={40} color={themeColors.darkGray} />
                </View>
                {news.featured && (
                  <View style={styles.featuredBadge}>
                    <Text style={styles.featuredBadgeText}>Destaque</Text>
                  </View>
                )}
              </View>

              {/* Conteúdo da notícia */}
              <View style={styles.newsContent}>
                <View style={styles.newsHeader}>
                  <Text style={styles.newsCategory}>
                    {categories.find(cat => cat.id === news.category)?.title}
                  </Text>
                  <Text style={styles.newsTime}>
                    {formatPublishedDate(news.publishedAt)}
                  </Text>
                </View>

                <Text style={styles.newsTitle} numberOfLines={2}>
                  {news.title}
                </Text>

                <Text style={styles.newsSummary} numberOfLines={3}>
                  {news.summary}
                </Text>

                <View style={styles.newsFooter}>
                  <Text style={styles.newsReadTime}>
                    {news.readTime} de leitura
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color={themeColors.darkGray} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Espaçamento final */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

export default NewsScreen; 