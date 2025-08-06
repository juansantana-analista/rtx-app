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
import { getNoticias, getCategorias, getNoticiasPorCategoria } from '../services/newsService';
import CustomHeader from '../components/CustomHeader';
import FloatingLoader from '../components/FloatingLoader';
import createStyles from '../styles/NewsStyles';

const NewsScreen = ({ onBack, onNavigate, showFloatingNav = true }) => {
  const { themeColors } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const styles = createStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  // Função para carregar notícias
  const loadNews = async (categoryId = null) => {
    if (!isAuthenticated) {
      setNews([]);
      setError('');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const newsData = await getNoticias(categoryId);
      setNews(newsData);
    } catch (error) {
      setError('Erro ao carregar notícias');
      console.error('Erro ao buscar notícias:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para carregar categorias
  const loadCategories = async () => {
    if (!isAuthenticated) {
      setCategories([]);
      return;
    }

    try {
      const categoriesData = await getCategorias();
      // Adicionar categoria "Todas" no início
      const allCategories = [
        { id: 'todas', nome: 'Todas', icon: 'grid' },
        ...categoriesData
      ];
      setCategories(allCategories);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  // Carregar dados na inicialização
  useEffect(() => {
    if (isAuthenticated) {
      loadCategories();
      loadNews();
    }
  }, [isAuthenticated]);

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



  // Função para atualizar as notícias
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        loadCategories(),
        loadNews(selectedCategory === 'todas' ? null : selectedCategory)
      ]);
    } catch (error) {
      console.error('Erro ao atualizar notícias:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Função para lidar com o clique na notícia
  const handleNewsPress = (news) => {
    console.log('Notícia clicada:', news.titulo);
    onNavigate('newsDetail', { news });
  };

  // Função para lidar com mudança de categoria
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    loadNews(categoryId === 'todas' ? null : categoryId);
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
                onPress={() => handleCategoryChange(category.id)}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={category.icon || 'grid'} 
                  size={16} 
                  color={selectedCategory === category.id ? themeColors.white : themeColors.text} 
                />
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}>
                  {category.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Lista de Notícias */}
        <View style={styles.newsContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Carregando notícias...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : news.length > 0 ? (
            news.map((newsItem, index) => (
                          <TouchableOpacity
                key={newsItem.id}
                style={[
                  styles.newsCard,
                  newsItem.em_destaque === '1' && styles.featuredNewsCard
                ]}
                onPress={() => handleNewsPress(newsItem)}
                activeOpacity={0.7}
              >
                              {/* Imagem da notícia */}
                <View style={styles.newsImageContainer}>
                  {newsItem.image_url ? (
                    <Image 
                      source={{ uri: newsItem.image_url }} 
                      style={styles.newsImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.newsImagePlaceholder}>
                      <Ionicons name="newspaper" size={40} color={themeColors.darkGray} />
                    </View>
                  )}
                  {newsItem.em_destaque === '1' && (
                    <View style={styles.featuredBadge}>
                      <Text style={styles.featuredBadgeText}>Destaque</Text>
                    </View>
                  )}
                </View>

              {/* Conteúdo da notícia */}
              <View style={styles.newsContent}>
                <View style={styles.newsHeader}>
                  <Text style={styles.newsCategory}>
                    {categories.find(cat => cat.id === newsItem.noticias_categoria_id)?.nome || 'Notícia'}
                  </Text>
                  <Text style={styles.newsTime}>
                    {formatPublishedDate(newsItem.publicado_em)}
                  </Text>
                </View>

                <Text style={styles.newsTitle} numberOfLines={2}>
                  {newsItem.titulo}
                </Text>

                <Text style={styles.newsSummary} numberOfLines={3}>
                  {newsItem.resumo}
                </Text>

                <View style={styles.newsFooter}>
                  <Text style={styles.newsReadTime}>
                    {newsItem.tempo_leitura} de leitura
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color={themeColors.darkGray} />
                </View>
              </View>
            </TouchableOpacity>
          ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhuma notícia encontrada</Text>
            </View>
          )}
        </View>

        {/* Espaçamento final */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

export default NewsScreen; 