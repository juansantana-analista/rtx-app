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
import { login, storeToken } from '../services/authService';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ onLogin }) => {
  const { themeColors } = useTheme();
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const formatCPF = (text) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 11) {
      const formatted = numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      setCpf(formatted);
    }
  };

  const handleLogin = async () => {
    setLoginError('');
    
    if (cpf.replace(/\D/g, '').length === 11 && password.length >= 4) {
      setIsLoading(true);
      try {
        const response = await login({
          userDoc: cpf.replace(/\D/g, ''),
          password: password
        });
        
        if (response.status === 'success') {
          const tokenStored = await storeToken(response.data);
          
          if (tokenStored) {
            onLogin();
          } else {
            setLoginError('Falha interna - tente novamente');
          }
        } else if (response.status === 'error') {
          setLoginError(response.data || 'Credenciais inválidas');
        } else if (response.error) {
          setLoginError(response.error);
        } else {
          setLoginError('Resposta inesperada do servidor');
        }
      } catch (error) {
        console.error('Erro na requisição de login:', error);
        setLoginError('Erro de conexão com o servidor');
      } finally {
        setIsLoading(false);
      }
    } else {
      setLoginError('CPF deve ter 11 dígitos e senha pelo menos 4 caracteres');
    }
  };

  const styles = createLoginStyles(themeColors);
  
  return (
    <View style={styles.container}>
      <CustomHeader showLogo={true} logoHeight={140} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Bem-vindo de volta!</Text>
          <Text style={styles.welcomeSubtitle}>Acesse sua conta</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>CPF</Text>
            <TextInput
              style={styles.input}
              value={cpf}
              onChangeText={formatCPF}
              placeholder="000.000.000-00"
              keyboardType="numeric"
              maxLength={14}
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

          <TouchableOpacity style={styles.biometricButton}>
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
    </View>
  );
};

export default LoginScreen;