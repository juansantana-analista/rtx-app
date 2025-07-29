import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useAuth } from '../constants/AuthContext';
import CustomHeader from '../components/CustomHeader';
import createStyles from '../styles/ProfileStyles';

const ProfileScreen = ({ onBack, showFloatingNav = true }) => {
  const { theme, themeColors, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const styles = createStyles();

  // Função para gerar iniciais do nome
  const getInitials = (name) => {
    if (!name || name.trim() === '') return 'U';
    
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    
    const firstInitial = words[0].charAt(0).toUpperCase();
    const lastInitial = words[words.length - 1].charAt(0).toUpperCase();
    
    return firstInitial + lastInitial;
  };

  // Opções do perfil
  const profileOptions = [
    {
      id: 'personal-info',
      title: 'Informações Pessoais',
      subtitle: 'Dados cadastrais e documentos',
      icon: 'person-outline',
      onPress: () => console.log('Informações Pessoais')
    },
    {
      id: 'security',
      title: 'Segurança',
      subtitle: 'Senha, biometria e autenticação',
      icon: 'shield-checkmark-outline',
      onPress: () => console.log('Segurança')
    },
    {
      id: 'notifications',
      title: 'Notificações',
      subtitle: 'Configurar alertas e comunicações',
      icon: 'notifications-outline',
      onPress: () => console.log('Notificações')
    },
    {
      id: 'privacy',
      title: 'Privacidade',
      subtitle: 'Controle de dados e privacidade',
      icon: 'lock-closed-outline',
      onPress: () => console.log('Privacidade')
    },
    {
      id: 'theme',
      title: `Tema ${theme === 'dark' ? 'Claro' : 'Escuro'}`,
      subtitle: 'Alternar entre tema claro e escuro',
      icon: theme === 'dark' ? 'sunny-outline' : 'moon-outline',
      onPress: toggleTheme,
      isTheme: true
    },
    {
      id: 'help',
      title: 'Ajuda e Suporte',
      subtitle: 'Central de ajuda e contato',
      icon: 'help-circle-outline',
      onPress: () => console.log('Ajuda')
    },
    {
      id: 'about',
      title: 'Sobre o App',
      subtitle: 'Versão, termos e condições',
      icon: 'information-circle-outline',
      onPress: () => console.log('Sobre')
    }
  ];

  // Configurações da conta
  const accountOptions = [
    {
      id: 'backup',
      title: 'Backup de Dados',
      subtitle: 'Fazer backup das suas informações',
      icon: 'cloud-upload-outline',
      onPress: () => console.log('Backup')
    },
    {
      id: 'logout',
      title: 'Sair da Conta',
      subtitle: 'Fazer logout do aplicativo',
      icon: 'log-out-outline',
      onPress: () => {
        Alert.alert(
          'Sair da Conta',
          'Tem certeza que deseja sair?',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Sair', style: 'destructive', onPress: logout }
          ]
        );
      },
      isLogout: true
    }
  ];

  const rightActions = [
    { 
      icon: 'settings-outline', 
      onPress: () => console.log('Configurações rápidas') 
    }
  ];

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Meu Perfil"
        leftIcon="arrow-back"
        leftAction={onBack}
        rightActions={rightActions}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card do Perfil */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
                         <View style={[styles.profileAvatar, { backgroundColor: themeColors.primary }]}>
               <Text style={styles.profileInitials}>{getInitials(user?.name || 'Usuário')}</Text>
             </View>
             
             <View style={styles.profileDetails}>
               <Text style={styles.profileName}>{user?.name || 'Usuário'}</Text>
               <Text style={styles.profileEmail}>{user?.cpf || '000.000.000-00'}</Text>
               <Text style={styles.profileId}>{user?.email || 'email@rtx.com'}</Text>
             </View>
          </View>

          <TouchableOpacity style={styles.editProfileButton}>
            <Ionicons name="create-outline" size={20} color={themeColors.secondary} />
            <Text style={styles.editProfileText}>Editar</Text>
          </TouchableOpacity>
        </View>

        {/* Seção de Configurações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          
          {profileOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionItem,
                option.isTheme && { backgroundColor: 'rgba(255, 215, 0, 0.1)' }
              ]}
              onPress={option.onPress}
              activeOpacity={0.7}
            >
              <View style={[
                styles.optionIcon,
                { backgroundColor: option.isTheme ? 'rgba(255, 215, 0, 0.2)' : themeColors.lightGray }
              ]}>
                <Ionicons 
                  name={option.icon} 
                  size={22} 
                  color={option.isTheme ? '#FFD700' : themeColors.secondary}
                />
              </View>
              
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
              
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={themeColors.darkGray} 
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Seção da Conta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>
          
          {accountOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionItem,
                option.isLogout && { 
                  borderColor: themeColors.error,
                  borderWidth: 1,
                  backgroundColor: 'rgba(255, 68, 68, 0.05)'
                }
              ]}
              onPress={option.onPress}
              activeOpacity={0.7}
            >
              <View style={[
                styles.optionIcon,
                { backgroundColor: option.isLogout ? 'rgba(255, 68, 68, 0.1)' : themeColors.lightGray }
              ]}>
                <Ionicons 
                  name={option.icon} 
                  size={22} 
                  color={option.isLogout ? themeColors.error : themeColors.secondary}
                />
              </View>
              
              <View style={styles.optionContent}>
                <Text style={[
                  styles.optionTitle,
                  { color: option.isLogout ? themeColors.error : themeColors.text }
                ]}>
                  {option.title}
                </Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
              
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={option.isLogout ? themeColors.error : themeColors.darkGray} 
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Informações do App */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>RTX App v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2025 RTX Operações</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;