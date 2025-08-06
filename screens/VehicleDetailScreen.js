import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Linking,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import CustomHeader from '../components/CustomHeader';
import createStyles from '../styles/VehicleDetailStyles';

const { width } = Dimensions.get('window');

const VehicleDetailScreen = ({ route, onBack, showFloatingNav = false }) => {
  const { themeColors, theme } = useTheme();
  const { user } = useAuth();
  const styles = createStyles(themeColors, theme, showFloatingNav);
  const { vehicle } = route.params || {};
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const scrollViewRef = useRef(null);

  // Mock data para múltiplas imagens do veículo
  const vehicleImages = [
    vehicle?.image || 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
  ];

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    });
  };

  const handleImageScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentImageIndex(index);
  };

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    Alert.alert(
      isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      isFavorite 
        ? `${vehicle?.brand} ${vehicle?.name} foi removido dos seus favoritos.`
        : `${vehicle?.brand} ${vehicle?.name} foi adicionado aos seus favoritos.`
    );
  };

  const handleRentPress = () => {
    Alert.alert(
      'Alugar Veículo',
      `Confirmar locação do ${vehicle?.brand} ${vehicle?.name}?\n\nPreço: ${formatCurrency(vehicle?.price || 0)} ${vehicle?.priceType}\n\nDeseja prosseguir com a locação?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => {
          Alert.alert('Sucesso!', 'Sua solicitação de locação foi enviada. Entraremos em contato em breve.');
        }}
      ]
    );
  };

  const handleContactPress = () => {
    Alert.alert(
      'Contato',
      'Como você gostaria de entrar em contato?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'WhatsApp', onPress: () => handleWhatsAppContact() },
        { text: 'Telefone', onPress: () => handlePhoneContact() },
        { text: 'Email', onPress: () => handleEmailContact() }
      ]
    );
  };

  const handleWhatsAppContact = () => {
    const message = `Olá! Gostaria de saber mais sobre o ${vehicle?.brand} ${vehicle?.name} ${vehicle?.model}.`;
    const url = `whatsapp://send?phone=5511999999999&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Erro', 'Não foi possível abrir o WhatsApp');
    });
  };

  const handlePhoneContact = () => {
    Linking.openURL('tel:+5511999999999').catch(() => {
      Alert.alert('Erro', 'Não foi possível fazer a ligação');
    });
  };

  const handleEmailContact = () => {
    const subject = `Consulta sobre ${vehicle?.brand} ${vehicle?.name}`;
    const body = `Olá!\n\nGostaria de saber mais sobre o ${vehicle?.brand} ${vehicle?.name} ${vehicle?.model}.\n\nPreço: ${formatCurrency(vehicle?.price || 0)} ${vehicle?.priceType}\n\nAguardo retorno.`;
    const url = `mailto:contato@tsxlocadora.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Erro', 'Não foi possível abrir o email');
    });
  };

  const handleSharePress = () => {
    Alert.alert('Compartilhar', 'Funcionalidade de compartilhamento em desenvolvimento');
  };

  if (!vehicle) {
    return (
      <View style={styles.container}>
        <CustomHeader
          title="Detalhes do Veículo"
          leftIcon="arrow-back"
          leftAction={onBack}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Ionicons name="car-sport" size={64} color={themeColors.textSecondary} />
          <Text style={{ fontSize: 18, fontWeight: '600', color: themeColors.text, marginTop: 16, textAlign: 'center' }}>
            Veículo não encontrado
          </Text>
          <Text style={{ fontSize: 14, color: themeColors.textSecondary, marginTop: 8, textAlign: 'center' }}>
            O veículo solicitado não foi encontrado ou foi removido.
          </Text>
        </View>
      </View>
    );
  }

  const rightActions = [
    {
      icon: 'share-outline',
      onPress: handleSharePress
    }
  ];

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Detalhes do Veículo"
        leftIcon="arrow-back"
        leftAction={onBack}
        rightActions={rightActions}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Carousel */}
        <View style={styles.imageCarousel}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleImageScroll}
            scrollEventThrottle={16}
          >
            {vehicleImages.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.carouselImage}
              />
            ))}
          </ScrollView>

          {/* Pagination Dots */}
          <View style={styles.carouselPagination}>
            {vehicleImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentImageIndex && styles.paginationDotActive
                ]}
              />
            ))}
          </View>

          {/* Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? '#ff4757' : themeColors.white}
            />
          </TouchableOpacity>
        </View>

        {/* Vehicle Information */}
        <View style={styles.vehicleInfo}>
          {/* Header */}
          <View style={styles.vehicleHeader}>
            <Text style={styles.vehicleTitle}>
              {vehicle.brand} {vehicle.name}
            </Text>
            <Text style={styles.vehicleSubtitle}>
              {vehicle.model} • {vehicle.year}
            </Text>
            <Text style={styles.vehiclePrice}>
              {formatCurrency(vehicle.price)} {vehicle.priceType}
            </Text>

            {/* Badges */}
            <View style={styles.badgeContainer}>
              {vehicle.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{vehicle.badge}</Text>
                </View>
              )}
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Disponível</Text>
              </View>
            </View>

            {/* Rating */}
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={20} color="#ffd700" />
              <Text style={styles.rating}>{vehicle.rating}</Text>
              <Text style={styles.reviews}>({vehicle.reviews} avaliações)</Text>
            </View>
          </View>

          {/* Specifications */}
          <View style={styles.specsSection}>
            <Text style={styles.sectionTitle}>Especificações Técnicas</Text>
            <View style={styles.specsGrid}>
              <View style={styles.specItem}>
                <View style={styles.specCard}>
                  <View style={styles.specIcon}>
                    <Ionicons name="speedometer" size={24} color={themeColors.primary} />
                  </View>
                  <Text style={styles.specLabel}>Potência</Text>
                  <Text style={styles.specValue}>{vehicle.specs.power}</Text>
                </View>
              </View>
              <View style={styles.specItem}>
                <View style={styles.specCard}>
                  <View style={styles.specIcon}>
                    <Ionicons name="settings" size={24} color={themeColors.primary} />
                  </View>
                  <Text style={styles.specLabel}>Motor</Text>
                  <Text style={styles.specValue}>{vehicle.specs.engine}</Text>
                </View>
              </View>
              <View style={styles.specItem}>
                <View style={styles.specCard}>
                  <View style={styles.specIcon}>
                    <Ionicons name="car" size={24} color={themeColors.primary} />
                  </View>
                  <Text style={styles.specLabel}>Transmissão</Text>
                  <Text style={styles.specValue}>{vehicle.specs.transmission}</Text>
                </View>
              </View>
              <View style={styles.specItem}>
                <View style={styles.specCard}>
                  <View style={styles.specIcon}>
                    <Ionicons name="water" size={24} color={themeColors.primary} />
                  </View>
                  <Text style={styles.specLabel}>Combustível</Text>
                  <Text style={styles.specValue}>{vehicle.specs.fuel}</Text>
                </View>
              </View>
              <View style={styles.specItem}>
                <View style={styles.specCard}>
                  <View style={styles.specIcon}>
                    <Ionicons name="people" size={24} color={themeColors.primary} />
                  </View>
                  <Text style={styles.specLabel}>Lugares</Text>
                  <Text style={styles.specValue}>{vehicle.specs.seats}</Text>
                </View>
              </View>
                             <View style={styles.specItem}>
                 <View style={styles.specCard}>
                   <View style={styles.specIcon}>
                     <Ionicons name="car" size={24} color={themeColors.primary} />
                   </View>
                   <Text style={styles.specLabel}>Portas</Text>
                   <Text style={styles.specValue}>{vehicle.specs.doors}</Text>
                 </View>
               </View>
            </View>
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Equipamentos e Conforto</Text>
            <View style={styles.featuresGrid}>
              {vehicle.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.featureIcon}>
                    <Ionicons name="checkmark-circle" size={16} color={themeColors.success} />
                  </View>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Location */}
          <View style={styles.locationSection}>
            <Text style={styles.sectionTitle}>Localização</Text>
            <View style={styles.locationCard}>
              <View style={styles.locationIcon}>
                <Ionicons name="location" size={24} color={themeColors.primary} />
              </View>
              <View style={styles.locationInfo}>
                <Text style={styles.locationTitle}>TSX Locadora</Text>
                <Text style={styles.locationAddress}>{vehicle.location}</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.descriptionText}>
              O {vehicle.brand} {vehicle.name} {vehicle.model} é um veículo de luxo que oferece 
              excelência em conforto, tecnologia e performance. Equipado com os mais modernos 
              recursos de segurança e entretenimento, proporciona uma experiência de condução 
              única e memorável. Ideal para ocasiões especiais, viagens de negócios ou simplesmente 
              para desfrutar do prazer de dirigir um veículo premium.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleContactPress}
              activeOpacity={0.7}
            >
              <Text style={styles.secondaryButtonText}>Contato</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleRentPress}
              activeOpacity={0.7}
            >
              <Text style={styles.primaryButtonText}>Alugar Agora</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default VehicleDetailScreen; 