import React, { useState } from 'react';
import createLoginStyles from '../styles/LoginStyles';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import FloatingLoader from '../components/FloatingLoader';
import { useAuth } from '../constants/AuthContext';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDeviceUUID from '../hooks/useDeviceUUID';
import DeviceActivationScreen from './DeviceActivationScreen';

const { width, height } = Dimensions.get('window');

const LOGIN_DATA_KEY = '@RTX:loginData';

const LoginScreen = () => {
  const { themeColors } = useTheme();
  const { login } = useAuth();
  const { deviceUUID } = useDeviceUUID();
  const [documento, setDocumento] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showDeviceActivation, setShowDeviceActivation] = useState(false);
  const [userToken, setUserToken] = useState(null);



  const formatDocumento = (text) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 11) {
      // CPF: 000.000.000-00
      const formatted = numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (match, p1, p2, p3, p4) => {
        let result = `${p1}.${p2}.${p3}`;
        if (p4) result += `-${p4}`;
        return result;
      });
      setDocumento(formatted);
    } else if (numbers.length <= 14) {
      // CNPJ: 00.000.000/0000-00
      const formatted = numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, (match, p1, p2, p3, p4, p5) => {
        let result = `${p1}.${p2}.${p3}/${p4}`;
        if (p5) result += `-${p5}`;
        return result;
      });
      setDocumento(formatted);
    }
  };

  const handleLogin = async () => {
    setLoginError('');
    const docNumbers = documento.replace(/\D/g, '');
    const isCPF = docNumbers.length === 11;
    const isCNPJ = docNumbers.length === 14;
    if ((isCPF || isCNPJ) && password.length >= 4) {
      setIsLoading(true);
      try {
        const result = await login({
          userDoc: docNumbers,
          password: password,
          deviceUuid: deviceUUID
        });
        
        if (result.success) {
          // Verificar se o dispositivo está liberado
          if (result.requiresDeviceActivation) {
            console.log('📱 Dispositivo precisa de ativação');
            // Dispositivo não liberado - mostrar tela de ativação
            setUserToken(result.data.token || result.data); // Salvar token temporário
            console.log('🔧 Definindo showDeviceActivation como true');
            setShowDeviceActivation(true);
            setIsLoading(false);
            console.log('🔧 Estados definidos, retornando...');
            return;
          }
          
          // Salva documento e senha para login biométrico futuro
          await AsyncStorage.setItem(LOGIN_DATA_KEY, JSON.stringify({ documento: docNumbers, password }));
          // Login bem-sucedido - o AuthContext já gerencia o estado
          console.log('Login realizado com sucesso!');
        } else {
          setLoginError(result.error || 'Credenciais inválidas');
        }
      } catch (error) {
        console.error('Erro na requisição de login:', error);
        setLoginError('Erro de conexão com o servidor');
      } finally {
        setIsLoading(false);
      }
    } else {
      setLoginError('Digite um CPF (11 dígitos) ou CNPJ (14 dígitos) válido e senha com pelo menos 4 caracteres');
    }
  };

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!hasHardware || !isEnrolled) {
      Alert.alert('Biometria não disponível', 'Seu dispositivo não suporta biometria ou não há biometria cadastrada.');
      return;
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autentique-se para entrar',
      fallbackLabel: 'Usar senha',
    });
    if (result.success) {
      // Buscar dados salvos
      const saved = await AsyncStorage.getItem(LOGIN_DATA_KEY);
      if (saved) {
        const { documento, password } = JSON.parse(saved);
        setDocumento(documento);
        setPassword(password);
        setIsLoading(true);
        try {
                  const loginResult = await login({ userDoc: documento, password, deviceUuid: deviceUUID });
        if (loginResult.success) {
          // Verificar se o dispositivo está liberado
          if (loginResult.requiresDeviceActivation) {
            setShowDeviceActivation(true);
            return;
          }
        } else {
          setLoginError(loginResult.error || 'Credenciais inválidas');
        }
        } catch (e) {
          setLoginError('Erro ao tentar login biométrico');
        } finally {
          setIsLoading(false);
        }
      } else {
        Alert.alert('Dados não encontrados', 'Faça login manualmente ao menos uma vez para ativar a biometria.');
      }
    } else {
      Alert.alert('Falha', 'Não foi possível autenticar com biometria.');
    }
  };

  const styles = createLoginStyles(themeColors);
  
  // Se precisar ativar o dispositivo, mostrar a tela de ativação
  if (showDeviceActivation) {
    return (
      <DeviceActivationScreen
        onBack={() => setShowDeviceActivation(false)}
        onSuccess={() => {
          setShowDeviceActivation(false);
          setUserToken(null);
          // Tentar login novamente após ativação
          handleLogin();
        }}
        userToken={userToken}
      />
    );
  }
  
  return (
    <View style={styles.container}>
      <CustomHeader showLogo={true} logoHeight={160} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Bem-vindo de volta!</Text>
          <Text style={styles.welcomeSubtitle}>Acesse sua conta</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>CPF ou CNPJ</Text>
            <TextInput
              style={styles.input}
              value={documento}
              onChangeText={formatDocumento}
              placeholder="CPF ou CNPJ"
              keyboardType="numeric"
              maxLength={18} // 18: 00.000.000/0000-00
              placeholderTextColor={themeColors.darkGray}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Digite sua senha"
                secureTextEntry={!showPassword}
                placeholderTextColor={themeColors.darkGray}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Ionicons 
                  name={showPassword ? 'eye-off' : 'eye'} 
                  size={24} 
                  color={themeColors.darkGray} 
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          {loginError ? (
            <Text style={styles.errorText}>{loginError}</Text>
          ) : null}

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.biometricButton} onPress={handleBiometricAuth}>
            <Ionicons name="finger-print" size={24} color={themeColors.secondary} />
            <Text style={styles.biometricButtonText}>Entrar com biometria</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <SafeAreaView style={styles.footerSafeArea}>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>
              Ainda não tem conta? <Text style={styles.registerLink}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Loader flutuante */}
      {isLoading && <FloatingLoader message="Fazendo login..." />}
    </View>
  );
};

export default LoginScreen;