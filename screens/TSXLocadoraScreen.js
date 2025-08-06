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
      location: 'São Paulo, SP',
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
      location: 'São Paulo, SP',
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
      location: 'São Paulo, SP',
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
      location: 'São Paulo, SP',
      rating: 5.0,
      reviews: 28,
    },
  ];

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'sedan', name: 'Sedan' },
    { id: 'suv', name: 'SUV' },
    { id: 'esportivo', name: 'Esportivo' },
    { id: 'elétrico', name: 'Elétrico' },
  ];

  const priceRanges = [
    { id: 'todos', name: 'Todos os preços' },
    { id: 'economico', name: 'Até R$ 2.000' },
    { id: 'medio', name: 'R$ 2.000 - R$ 3.500' },
    { id: 'premium', name: 'Acima de R$ 3.500' },
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
      switch (selectedPriceRange) {
        case 'economico':
          filtered = filtered.filter(vehicle => vehicle.price <= 2000);
          break;
        case 'medio':
          filtered = filtered.filter(vehicle => vehicle.price > 2000 && vehicle.price <= 3500);
          break;
        case 'premium':
          filtered = filtered.filter(vehicle => vehicle.price > 3500);
          break;
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

  const renderVehicleCard = ({ item }) => (
    <View style={styles.vehicleCard}>
      <View style={styles.vehicleImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.vehicleImage}
          resizeMode="cover"
        />
        {item.badge && (
          <View style={styles.vehicleBadge}>
            <Text style={styles.vehicleBadgeText}>{item.badge}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.vehicleInfo}>
        <View style={styles.vehicleHeader}>
          <Text style={styles.vehicleTitle}>{item.brand} {item.name}</Text>
          <Text style={styles.vehiclePrice}>{formatCurrency(item.price)}</Text>
        </View>
        
        <Text style={styles.vehicleSubtitle}>{item.model} • {item.year}</Text>
        
        <View style={styles.vehicleSpecs}>
          <View style={styles.vehicleSpec}>
            <Ionicons name="speedometer" size={16} color={themeColors.textSecondary} />
            <Text style={styles.vehicleSpecText}>{item.specs.power}</Text>
          </View>
          <View style={styles.vehicleSpec}>
            <Ionicons name="people" size={16} color={themeColors.textSecondary} />
            <Text style={styles.vehicleSpecText}>{item.specs.seats} lugares</Text>
          </View>
          <View style={styles.vehicleSpec}>
            <Ionicons name="star" size={16} color={themeColors.textSecondary} />
            <Text style={styles.vehicleSpecText}>{item.rating} ({item.reviews})</Text>
          </View>
        </View>
        
        <View style={styles.vehicleActions}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => handleVehiclePress(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryButtonText}>Detalhes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => handleRentPress(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.primaryButtonText}>Alugar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="car-sport" style={styles.emptyIcon} />
      <Text style={styles.emptyTitle}>Nenhum veículo encontrado</Text>
      <Text style={styles.emptyMessage}>
        Não encontramos veículos com os filtros selecionados. Tente ajustar sua busca.
      </Text>
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
              placeholder="Buscar veículos..."
              placeholderTextColor={themeColors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Filters Section */}
        <View style={styles.filtersSection}>
          <Text style={styles.filtersTitle}>Categorias</Text>
          <View style={styles.filtersRow}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.filterChip,
                  selectedCategory === category.id && styles.filterChipActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedCategory === category.id && styles.filterChipTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.filtersTitle, { marginTop: 16 }]}>Faixa de Preço</Text>
          <View style={styles.filtersRow}>
            {priceRanges.map((range) => (
              <TouchableOpacity
                key={range.id}
                style={[
                  styles.filterChip,
                  selectedPriceRange === range.id && styles.filterChipActive
                ]}
                onPress={() => setSelectedPriceRange(range.id)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedPriceRange === range.id && styles.filterChipTextActive
                ]}>
                  {range.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Vehicles Section */}
        <View style={styles.vehiclesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Veículos Disponíveis ({filteredVehicles.length})
            </Text>
          </View>

          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle) => (
              <View key={vehicle.id}>
                {renderVehicleCard({ item: vehicle })}
              </View>
            ))
          ) : (
            renderEmptyState()
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default TSXLocadoraScreen; 