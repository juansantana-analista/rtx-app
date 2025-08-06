import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import CustomHeader from '../components/CustomHeader';
import createStyles from '../styles/ShopStyles';

const { width } = Dimensions.get('window');

const ShopScreen = ({ onBack, showFloatingNav = true }) => {
  const { themeColors, theme } = useTheme();
  const { user } = useAuth();
  const styles = createStyles(themeColors, theme, showFloatingNav);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Categorias do Shop
  const categories = [
    { id: 'todos', name: 'Todos', icon: 'grid-outline' },
    { id: 'cursos', name: 'Cursos', icon: 'school-outline' },
    { id: 'relatorios', name: 'Relatórios', icon: 'document-text-outline' },
    { id: 'consultoria', name: 'Consultoria', icon: 'people-outline' },
    { id: 'ferramentas', name: 'Ferramentas', icon: 'calculator-outline' },
  ];

  // Produtos do Shop (mock data)
  const shopProducts = [
    {
      id: 1,
      name: 'Curso de Análise Fundamentalista',
      description: 'Aprenda a analisar empresas e fazer investimentos fundamentados',
      price: 297.00,
      originalPrice: 497.00,
      category: 'cursos',
      image: 'https://via.placeholder.com/300x200/113334/FFFFFF?text=Curso+Fundamentalista',
      rating: 4.8,
      students: 1247,
      duration: '12 horas',
      isFeatured: true,
      discount: 40,
    },
    {
      id: 2,
      name: 'Relatório Mensal de Ações',
      description: 'Análise detalhada das melhores oportunidades do mercado',
      price: 97.00,
      originalPrice: 147.00,
      category: 'relatorios',
      image: 'https://via.placeholder.com/300x200/55B880/FFFFFF?text=Relatório+Mensal',
      rating: 4.9,
      subscribers: 892,
      pages: 45,
      isFeatured: true,
      discount: 34,
    },
    {
      id: 3,
      name: 'Consultoria Personalizada',
      description: 'Sessão individual com especialista para montar sua carteira',
      price: 497.00,
      originalPrice: 697.00,
      category: 'consultoria',
      image: 'https://via.placeholder.com/300x200/FFD700/000000?text=Consultoria',
      rating: 5.0,
      sessions: 1,
      duration: '2 horas',
      isFeatured: false,
      discount: 29,
    },
    {
      id: 4,
      name: 'Calculadora de Valuation',
      description: 'Ferramenta profissional para calcular o valor justo de ações',
      price: 197.00,
      originalPrice: 297.00,
      category: 'ferramentas',
      image: 'https://via.placeholder.com/300x200/DC3545/FFFFFF?text=Calculadora',
      rating: 4.7,
      users: 567,
      features: 'Análise DCF, Múltiplos, Fluxo de Caixa',
      isFeatured: false,
      discount: 34,
    },
    {
      id: 5,
      name: 'Curso de Análise Técnica',
      description: 'Domine os gráficos e indicadores para timing perfeito',
      price: 247.00,
      originalPrice: 397.00,
      category: 'cursos',
      image: 'https://via.placeholder.com/300x200/6F42C1/FFFFFF?text=Curso+Técnica',
      rating: 4.6,
      students: 892,
      duration: '8 horas',
      isFeatured: false,
      discount: 38,
    },
    {
      id: 6,
      name: 'Relatório de Dividendos',
      description: 'As melhores ações pagadoras de dividendos do mercado',
      price: 67.00,
      originalPrice: 97.00,
      category: 'relatorios',
      image: 'https://via.placeholder.com/300x200/28A745/FFFFFF?text=Dividendos',
      rating: 4.8,
      subscribers: 456,
      pages: 32,
      isFeatured: false,
      discount: 31,
    },
  ];

  useEffect(() => {
    filterProducts();
  }, [selectedCategory]);

  const filterProducts = () => {
    if (selectedCategory === 'todos') {
      setProducts(shopProducts);
    } else {
      const filtered = shopProducts.filter(product => product.category === selectedCategory);
      setProducts(filtered);
    }
  };

  const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const handleProductPress = (product) => {
    console.log('Produto selecionado:', product.name);
    // Aqui você pode navegar para a tela de detalhes do produto
  };

  const handleCategoryPress = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        {
          backgroundColor: selectedCategory === item.id 
            ? themeColors.primary 
            : themeColors.cardBackground,
          borderColor: selectedCategory === item.id 
            ? themeColors.secondary 
            : themeColors.border,
        }
      ]}
      onPress={() => handleCategoryPress(item.id)}
      activeOpacity={0.7}
    >
      <Ionicons 
        name={item.icon} 
        size={20} 
        color={selectedCategory === item.id 
          ? themeColors.white 
          : themeColors.textSecondary
        } 
      />
      <Text style={[
        styles.categoryText,
        {
          color: selectedCategory === item.id 
            ? themeColors.white 
            : themeColors.textSecondary
        }
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item)}
      activeOpacity={0.8}
    >
      {/* Imagem do Produto */}
      <View style={styles.productImageContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.productImage}
          resizeMode="cover"
        />
        {item.isFeatured && (
          <View style={[styles.featuredBadge, { backgroundColor: themeColors.secondary }]}>
            <Text style={styles.featuredText}>DESTAQUE</Text>
          </View>
        )}
        {item.discount > 0 && (
          <View style={[styles.discountBadge, { backgroundColor: themeColors.error }]}>
            <Text style={styles.discountText}>-{item.discount}%</Text>
          </View>
        )}
      </View>

      {/* Informações do Produto */}
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Rating e Estatísticas */}
        <View style={styles.productStats}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          {item.students && (
            <Text style={styles.statsText}>{item.students} alunos</Text>
          )}
          {item.subscribers && (
            <Text style={styles.statsText}>{item.subscribers} assinantes</Text>
          )}
          {item.users && (
            <Text style={styles.statsText}>{item.users} usuários</Text>
          )}
        </View>

        {/* Preços */}
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>{formatCurrency(item.price)}</Text>
          {item.originalPrice > item.price && (
            <Text style={styles.originalPrice}>{formatCurrency(item.originalPrice)}</Text>
          )}
        </View>

        {/* Botão de Compra */}
        <TouchableOpacity 
          style={[styles.buyButton, { backgroundColor: themeColors.primary }]}
          activeOpacity={0.7}
        >
          <Text style={styles.buyButtonText}>Comprar Agora</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="RTX Shop"
        leftIcon="arrow-back"
        leftAction={onBack}
        showCenteredLogo={true}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Banner de Boas-vindas */}
        <View style={styles.welcomeBanner}>
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>Bem-vindo ao RTX Shop!</Text>
            <Text style={styles.welcomeSubtitle}>
              Produtos exclusivos para impulsionar seus investimentos
            </Text>
          </View>
          <Ionicons name="bag" size={40} color={themeColors.white} />
        </View>

        {/* Categorias */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Produtos */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'todos' ? 'Todos os Produtos' : 
             categories.find(cat => cat.id === selectedCategory)?.name}
          </Text>
          <FlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
            scrollEnabled={false}
          />
        </View>

                 {/* Espaçamento final */}
         <View style={{ height: showFloatingNav ? 120 : 100 }} />
       </ScrollView>
     </View>
   );
 };
 
 export default ShopScreen; 