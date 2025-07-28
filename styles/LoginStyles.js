import { StyleSheet } from 'react-native';

const createLoginStyles = (themeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background
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
    color: themeColors.text,
    letterSpacing: -0.3,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: themeColors.textSecondary || themeColors.darkGray,
    fontWeight: '500',
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
    fontWeight: '600',
    color: themeColors.text
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderColor: themeColors.border || themeColors.mediumGray,
    backgroundColor: themeColors.cardBackground || themeColors.lightGray,
    color: themeColors.text
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: themeColors.border || themeColors.mediumGray,
    backgroundColor: themeColors.cardBackground || themeColors.lightGray
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
    color: themeColors.accent || themeColors.secondary,
    fontWeight: '600',
  },
  loginButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: themeColors.accent || themeColors.secondary,
    shadowColor: themeColors.shadow || themeColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    color: themeColors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: themeColors.error,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: themeColors.border || themeColors.mediumGray
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: themeColors.textSecondary || themeColors.darkGray,
    fontWeight: '500',
  },
  biometricButton: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderColor: themeColors.border || themeColors.secondary,
    backgroundColor: themeColors.cardBackground,
  },
  biometricButtonText: {
    fontSize: 16,
    marginLeft: 8,
    color: themeColors.accent || themeColors.secondary,
    fontWeight: '600',
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
    color: themeColors.textSecondary || themeColors.darkGray,
    fontWeight: '500',
  },
  registerLink: {
    fontWeight: 'bold',
    color: themeColors.accent || themeColors.secondary
  },
});

export default createLoginStyles;