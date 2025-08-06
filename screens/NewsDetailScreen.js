import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  Linking,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import CustomHeader from '../components/CustomHeader';
import createStyles from '../styles/NewsDetailStyles';

const { width, height } = Dimensions.get('window');

const NewsDetailScreen = ({ route, onBack }) => {
  const { themeColors } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const styles = createStyles();
  const [isLoading, setIsLoading] = useState(false);

  // Dados da notícia passados via route.params
  const { news } = route.params || {};

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

  // Função para compartilhar notícia
  const handleShare = async () => {
    try {
      const shareContent = {
        title: news?.titulo || 'Notícia RTX',
        message: `${news?.titulo}\n\n${news?.resumo}\n\nLeia mais no app RTX!`,
        url: 'https://rtx.tecskill.com.br', // URL do app ou site
      };

      await Share.share(shareContent);
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  // Função para abrir link externo (se houver)
  const handleOpenExternalLink = async (url) => {
    if (url) {
      try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        }
      } catch (error) {
        console.error('Erro ao abrir link:', error);
      }
    }
  };

  // Função para marcar como favorita
  const handleToggleFavorite = () => {
    // Implementar lógica para marcar/desmarcar como favorita
    console.log('Toggle favorita:', news?.id);
  };

  const rightActions = [
    {
      icon: 'heart-outline',
      onPress: handleToggleFavorite,
    },
    {
      icon: 'share-outline',
      onPress: handleShare,
    },
  ];

  if (!news) {
    return (
      <View style={styles.container}>
        <CustomHeader
          title="Notícia"
          leftIcon="arrow-back"
          leftAction={onBack}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Notícia não encontrada</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={themeColors.primary}
        translucent={false}
      />
      
      <CustomHeader
        title=""
        leftIcon="arrow-back"
        leftAction={onBack}
        rightActions={rightActions}
        showCenteredLogo={true}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Imagem da notícia */}
        <View style={styles.imageContainer}>
          {news.image_url ? (
            <Image
              source={{ uri: news.image_url }}
              style={styles.newsImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="newspaper" size={60} color={themeColors.darkGray} />
            </View>
          )}
          
          {/* Badge de destaque */}
          {news.em_destaque === '1' && (
            <View style={styles.featuredBadge}>
              <Ionicons name="star" size={12} color={themeColors.white} />
              <Text style={styles.featuredBadgeText}>Destaque</Text>
            </View>
          )}

          {/* Overlay gradiente */}
          <View style={styles.imageOverlay} />
        </View>

        {/* Conteúdo da notícia */}
        <View style={styles.newsContent}>
          {/* Cabeçalho */}
          <View style={styles.newsHeader}>
            <View style={styles.categoryContainer}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>Notícia</Text>
              </View>
            </View>
            
            <View style={styles.metaInfo}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={14} color={themeColors.textSecondary} />
                <Text style={styles.metaText}>{formatPublishedDate(news.publicado_em)}</Text>
              </View>
              
              <View style={styles.metaItem}>
                <Ionicons name="eye-outline" size={14} color={themeColors.textSecondary} />
                <Text style={styles.metaText}>{news.visualizacoes || 0} visualizações</Text>
              </View>
              
              <View style={styles.metaItem}>
                <Ionicons name="book-outline" size={14} color={themeColors.textSecondary} />
                <Text style={styles.metaText}>{news.tempo_leitura || '3 min'} de leitura</Text>
              </View>
            </View>
          </View>

          {/* Título */}
          <Text style={styles.newsTitle}>{news.titulo}</Text>

          {/* Resumo */}
          <Text style={styles.newsSummary}>{news.resumo}</Text>

          {/* Separador */}
          <View style={styles.separator} />

          {/* Conteúdo completo */}
          <Text style={styles.newsContentText}>{news.conteudo}</Text>

          {/* Informações adicionais */}
          <View style={styles.additionalInfo}>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={16} color={themeColors.textSecondary} />
              <Text style={styles.infoText}>
                Publicado em {new Date(news.publicado_em).toLocaleDateString('pt-BR')}
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="refresh-outline" size={16} color={themeColors.textSecondary} />
              <Text style={styles.infoText}>
                Atualizado em {new Date(news.atualizado_em).toLocaleDateString('pt-BR')}
              </Text>
            </View>
          </View>

          {/* Botões de ação */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleShare}
              activeOpacity={0.7}
            >
              <Ionicons name="share-outline" size={20} color={themeColors.primary} />
              <Text style={styles.actionButtonText}>Compartilhar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.primaryActionButton]}
              onPress={handleToggleFavorite}
              activeOpacity={0.7}
            >
              <Ionicons name="heart-outline" size={20} color={themeColors.white} />
              <Text style={[styles.actionButtonText, styles.primaryActionButtonText]}>
                Favoritar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Espaçamento final */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>
    </View>
  );
};

export default NewsDetailScreen; 