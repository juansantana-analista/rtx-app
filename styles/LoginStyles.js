import { StyleSheet } from 'react-native';

const createLoginStyles = (themeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background
  },
  headerSafeArea: {
    backgroundColor: themeColors.primary,
  },
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  logoImage: {
    width: 280,
    height: 80,
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    marginTop: -20,
    backgroundColor: themeColors.background
  },
  welcomeSection: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: themeColors.text
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: themeColors.darkGray
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
    color: themeColors.text
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderColor: themeColors.mediumGray,
    backgroundColor: themeColors.lightGray,
    color: themeColors.text
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: themeColors.mediumGray,
    backgroundColor: themeColors.lightGray
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: themeColors.text
  },
  eyeButton: {
    padding: 12,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: themeColors.secondary
  },
  loginButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: themeColors.secondary
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: themeColors.mediumGray
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: themeColors.darkGray
  },
  biometricButton: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderColor: themeColors.secondary
  },
  biometricButtonText: {
    fontSize: 16,
    marginLeft: 8,
    color: themeColors.secondary
  },
  footerSafeArea: {
    backgroundColor: themeColors.background,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 10,
  },
  registerButton: {
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 14,
    color: themeColors.darkGray
  },
  registerLink: {
    fontWeight: 'bold',
    color: themeColors.secondary
  },
});

export default createLoginStyles;
