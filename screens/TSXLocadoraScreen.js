import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Alert,
  Image,
  Animated,
  LinearGradient,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import CustomHeader from '../components/CustomHeader';
import createStyles from '../styles/TSXLocadoraStyles';

const TSXLocadoraScreen = ({ onBack, onNavigate, showFloatingNav = false }) => {
  const { themeColors, theme } = useTheme();
  const { user } = useAuth();
  const styles = createStyles(themeColors, theme, showFloatingNav);
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedPriceRange, setSelectedPriceRange] = useState('todos');
  const [scrollY] = useState(new Animated.Value(0));

  // Mock data para veículos de luxo
  const mockVehicles = [
    {
      id: 1,
      name: 'Mercedes-Benz S-Class',
      model: 'S 580 4MATIC',
      year: 2024,
      price: 2500,
      priceType: 'por dia',
      category: 'sedan',
      brand: 'Mercedes-Benz',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
      specs: {
        engine: '4.0L V8 Biturbo',
        power: '503 cv',
        transmission: 'Automática 9G-TRONIC',
        fuel: 'Gasolina',
        seats: 5,
        doors: 4,
      },
      features: ['GPS', 'Ar Condicionado', 'Couro', 'Bluetooth', 'Câmera de Ré'],
      available: true,
      badge: 'Premium',
      location: 'Maringá, PR',
      rating: 4.9,
      reviews: 127,
    },
    {
      id: 2,
      name: 'BMW X7',
      model: 'xDrive40i',
      year: 2024,
      price: 2800,
      priceType: 'por dia',
      category: 'suv',
      brand: 'BMW',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      specs: {
        engine: '3.0L I6 Turbo',
        power: '340 cv',
        transmission: 'Automática 8 velocidades',
        fuel: 'Gasolina',
        seats: 7,
        doors: 5,
      },
      features: ['GPS', 'Ar Condicionado', 'Couro', 'Bluetooth', 'Câmera 360°'],
      available: true,
      badge: 'Luxury',
      location: 'Rio de Janeiro, RJ',
      rating: 4.8,
      reviews: 89,
    },
    {
      id: 3,
      name: 'Porsche 911',
      model: 'Carrera S',
      year: 2024,
      price: 3500,
      priceType: 'por dia',
      category: 'esportivo',
      brand: 'Porsche',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
      specs: {
        engine: '3.0L Flat-6 Turbo',
        power: '450 cv',
        transmission: 'PDK 8 velocidades',
        fuel: 'Gasolina',
        seats: 2,
        doors: 2,
      },
      features: ['GPS', 'Ar Condicionado', 'Couro', 'Bluetooth', 'Sport Chrono'],
      available: true,
      badge: 'Sport',
      location: 'Maringá, PR',
      rating: 4.9,
      reviews: 156,
    },
    {
      id: 4,
      name: 'Range Rover',
      model: 'Autobiography',
      year: 2024,
      price: 3200,
      priceType: 'por dia',
      category: 'suv',
      brand: 'Land Rover',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
      specs: {
        engine: '3.0L I6 Turbo',
        power: '400 cv',
        transmission: 'Automática 8 velocidades',
        fuel: 'Gasolina',
        seats: 5,
        doors: 5,
      },
      features: ['GPS', 'Ar Condicionado', 'Couro', 'Bluetooth', 'Terrain Response'],
      available: true,
      badge: 'Premium',
      location: 'Brasília, DF',
      rating: 4.7,
      reviews: 73,
    },
    {
      id: 5,
      name: 'Audi RS e-tron GT',
      model: 'Quattro',
      year: 2024,
      price: 3800,
      priceType: 'por dia',
      category: 'elétrico',
      brand: 'Audi',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      specs: {
        engine: 'Dual Motor Elétrico',
        power: '646 cv',
        transmission: 'Automática',
        fuel: 'Elétrico',
        seats: 4,
        doors: 4,
      },
      features: ['GPS', 'Ar Condicionado', 'Couro', 'Bluetooth', 'Carregamento Rápido'],
      available: true,
      badge: 'Electric',
      location: 'Maringá, PR',
      rating: 4.9,
      reviews: 42,
    },
    {
      id: 6,
      name: 'Ferrari F8',
      model: 'Tributo',
      year: 2024,
      price: 4500,
      priceType: 'por dia',
      category: 'esportivo',
      brand: 'Ferrari',
      image: 'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202412/20241216/ferrari-f8-tributo-3.9-v8-turbo-gasolina-f1dct-wmimagem17124182165.jpg',
      specs: {
        engine: '3.9L V8 Twin-Turbo',
        power: '720 cv',
        transmission: 'F1 7 velocidades',
        fuel: 'Gasolina',
        seats: 2,
        doors: 2,
      },
      features: ['GPS', 'Ar Condicionado', 'Couro', 'Bluetooth', 'Launch Control'],
      available: true,
      badge: 'Super Sport',
      location: 'Maringá, PR',
      rating: 5.0,
      reviews: 28,
    },
  ];

  const categories = [
    { id: 'todos', name: 'Todos', icon: 'car-outline' },
    { id: 'sedan', name: 'Sedan', icon: 'car-outline' },
    { id: 'suv', name: 'SUV', icon: 'car-sport-outline' },
    { id: 'esportivo', name: 'Esportivo', icon: 'flash-outline' },
    { id: 'elétrico', name: 'Elétrico', icon: 'battery-charging-outline' },
  ];

  const priceRanges = [
    { id: 'todos', name: 'Todos os preços' },
    { id: 'economico', name: 'Até R$ 2.000', max: 2000 },
    { id: 'medio', name: 'R$ 2.000 - R$ 3.500', min: 2000, max: 3500 },
    { id: 'premium', name: 'Acima de R$ 3.500', min: 3500 },
  ];

  useEffect(() => {
    loadVehicles();
  }, []);

  useEffect(() => {
    filterVehicles();
  }, [vehicles, searchQuery, selectedCategory, selectedPriceRange]);

  const loadVehicles = async () => {
    setIsLoading(true);
    try {
      // Simular carregamento da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVehicles(mockVehicles);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os veículos');
    } finally {
      setIsLoading(false);
    }
  };

  const filterVehicles = () => {
    let filtered = vehicles;

    // Filtro por busca
    if (searchQuery) {
      filtered = filtered.filter(vehicle =>
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtro por categoria
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(vehicle => vehicle.category === selectedCategory);
    }

    // Filtro por preço
    if (selectedPriceRange !== 'todos') {
      const range = priceRanges.find(r => r.id === selectedPriceRange);
      if (range) {
        filtered = filtered.filter(vehicle => {
          if (range.min && range.max) {
            return vehicle.price > range.min && vehicle.price <= range.max;
          } else if (range.max) {
            return vehicle.price <= range.max;
          } else if (range.min) {
            return vehicle.price > range.min;
          }
          return true;
        });
      }
    }

    setFilteredVehicles(filtered);
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    });
  };

  const getBadgeColor = (badge) => {
    const colors = {
      'Premium': '#FFD700',
      'Luxury': '#9370DB',
      'Sport': '#FF4500',
      'Electric': '#00FF7F',
      'Super Sport': '#FF1493'
    };
    return colors[badge] || themeColors.secondary;
  };

  const handleVehiclePress = (vehicle) => {
    if (onNavigate) {
      onNavigate('vehicleDetail', { vehicle });
    }
  };

  const handleRentPress = (vehicle) => {
    Alert.alert(
      'Alugar Veículo',
      `Confirmar locação do ${vehicle.brand} ${vehicle.name}?\n\nPreço: ${formatCurrency(vehicle.price)} ${vehicle.priceType}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => console.log('Alugar:', vehicle.id) }
      ]
    );
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item.id && styles.categoryChipActive
      ]}
      onPress={() => setSelectedCategory(item.id)}
      activeOpacity={0.7}
    >
      <Ionicons 
        name={item.icon}
        size={16} 
        color={selectedCategory === item.id ? themeColors.white : themeColors.textSecondary} 
      />
      <Text style={[
        styles.categoryChipText,
        selectedCategory === item.id && styles.categoryChipTextActive
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderVehicleCard = ({ item, index }) => (
    <Animated.View 
      style={[
        styles.vehicleCard,
        {
          opacity: scrollY.interpolate({
            inputRange: [0, 100 * index, 100 * (index + 1)],
            outputRange: [0.3, 1, 1],
            extrapolate: 'clamp',
          }),
          transform: [{
            translateY: scrollY.interpolate({
              inputRange: [0, 100 * index, 100 * (index + 1)],
              outputRange: [50, 0, 0],
              extrapolate: 'clamp',
            }),
          }],
        }
      ]}
    >
      <TouchableOpacity
        onPress={() => handleVehiclePress(item)}
        activeOpacity={0.95}
      >
        {/* Imagem do Veículo */}
        <View style={styles.vehicleImageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.vehicleImage}
            resizeMode="cover"
          />
          
          {/* Overlay gradiente */}
          <View style={styles.imageOverlay} />
          
          {/* Badge */}
          <View style={[styles.vehicleBadge, { backgroundColor: getBadgeColor(item.badge) }]}>
            <Text style={styles.vehicleBadgeText}>{item.badge}</Text>
          </View>
          
          {/* Indicador de disponibilidade */}
          <View style={styles.availabilityIndicator}>
            <View style={[styles.availabilityDot, { backgroundColor: item.available ? '#00FF7F' : '#FF4500' }]} />
            <Text style={styles.availabilityText}>
              {item.available ? 'Disponível' : 'Indisponível'}
            </Text>
          </View>

          {/* Preço destacado */}
          <View style={styles.priceOverlay}>
            <Text style={styles.overlayPrice}>{formatCurrency(item.price)}</Text>
            <Text style={styles.overlayPriceType}>{item.priceType}</Text>
          </View>
        </View>
        
        {/* Informações do Veículo */}
        <View style={styles.vehicleInfo}>
          <View style={styles.vehicleHeader}>
            <View style={styles.vehicleTitleSection}>
              <Text style={styles.vehicleBrand}>{item.brand}</Text>
              <Text style={styles.vehicleTitle}>{item.name}</Text>
              <Text style={styles.vehicleSubtitle}>{item.model} • {item.year}</Text>
            </View>
          </View>
          
          {/* Especificações em chips */}
          <View style={styles.vehicleSpecs}>
            <View style={styles.specChip}>
              <Ionicons name="speedometer-outline" size={14} color={themeColors.primary} />
              <Text style={styles.specText}>{item.specs.power}</Text>
            </View>
            <View style={styles.specChip}>
              <Ionicons name="people-outline" size={14} color={themeColors.primary} />
              <Text style={styles.specText}>{item.specs.seats} lugares</Text>
            </View>
            <View style={styles.specChip}>
              <Ionicons name="water-outline" size={14} color={themeColors.primary} />
              <Text style={styles.specText}>{item.specs.fuel}</Text>
            </View>
          </View>
          
          {/* Rating e localização */}
          <View style={styles.vehicleMetrics}>
            <View style={styles.ratingSection}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
              <Text style={styles.reviewsText}>({item.reviews})</Text>
            </View>
            <View style={styles.locationSection}>
              <Ionicons name="location-outline" size={14} color={themeColors.textSecondary} />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </View>
          
          {/* Botões de ação */}
          <View style={styles.vehicleActions}>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => handleVehiclePress(item)}
              activeOpacity={0.7}
            >
              <Ionicons name="information-circle-outline" size={16} color={themeColors.white} />
              <Text style={styles.detailsButtonText}>Detalhes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.rentButton, !item.available && styles.rentButtonDisabled]}
              onPress={() => item.available && handleRentPress(item)}
              activeOpacity={0.7}
              disabled={!item.available}
            >
              <Ionicons name="car-outline" size={16} color={themeColors.white} />
              <Text style={styles.rentButtonText}>
                {item.available ? 'Alugar' : 'Indisponível'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="car-sport-outline" size={80} color={themeColors.textSecondary} />
      </View>
      <Text style={styles.emptyTitle}>Nenhum veículo encontrado</Text>
      <Text style={styles.emptyMessage}>
        Não encontramos veículos com os filtros selecionados. Tente ajustar sua busca.
      </Text>
      <TouchableOpacity 
        style={styles.clearFiltersButton}
        onPress={() => {
          setSearchQuery('');
          setSelectedCategory('todos');
          setSelectedPriceRange('todos');
        }}
      >
        <Text style={styles.clearFiltersText}>Limpar filtros</Text>
      </TouchableOpacity>
    </View>
  );

  const rightActions = [
    { 
      icon: 'refresh', 
      onPress: () => loadVehicles() 
    },
    { 
      icon: 'heart-outline', 
      onPress: () => Alert.alert('Favoritos', 'Funcionalidade de favoritos em desenvolvimento') 
    }
  ];

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="TSX Locadora"
        leftIcon="arrow-back"
        leftAction={onBack}
        rightActions={rightActions}
      />

      <Animated.ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroBackground} />
          <View style={styles.heroGradient} />
          
          {/* Badge Premium */}
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>Premium</Text>
          </View>
          
          <View style={styles.heroContent}>
            <Image 
              source={require('../assets/tsx-logo.png')} 
              style={styles.heroLogo}
              resizeMode="contain"
            />
            <Text style={styles.heroLogoText}>LOCADORA</Text>
            <Text style={styles.heroSubtitle}>
              Descubra a excelência em locação de veículos de luxo{'\n'}
              Experiência única e personalizada
            </Text>
            
          </View>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={themeColors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar veículos, marcas ou modelos..."
              placeholderTextColor={themeColors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={themeColors.textSecondary} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* Filters Section */}
        <View style={styles.filtersSection}>
          <Text style={styles.filtersTitle}>Categorias</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />

          <Text style={[styles.filtersTitle, { marginTop: 20 }]}>Faixa de Preço</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.priceFiltersList}
          >
            {priceRanges.map((range) => (
              <TouchableOpacity
                key={range.id}
                style={[
                  styles.priceFilterChip,
                  selectedPriceRange === range.id && styles.priceFilterChipActive
                ]}
                onPress={() => setSelectedPriceRange(range.id)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.priceFilterText,
                  selectedPriceRange === range.id && styles.priceFilterTextActive
                ]}>
                  {range.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Vehicles Section */}
        <View style={styles.vehiclesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Veículos Disponíveis
            </Text>
            <View style={styles.resultsBadge}>
              <Text style={styles.resultsText}>{filteredVehicles.length}</Text>
            </View>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingCard}>
                <Ionicons name="car-sport" size={40} color={themeColors.primary} />
                <Text style={styles.loadingText}>Carregando veículos...</Text>
              </View>
            </View>
          ) : filteredVehicles.length > 0 ? (
            <FlatList
              data={filteredVehicles}
              renderItem={renderVehicleCard}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.vehiclesList}
            />
          ) : (
            renderEmptyState()
          )}
        </View>


      </Animated.ScrollView>
    </View>
  );
};

export default TSXLocadoraScreen;