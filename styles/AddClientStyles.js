import { StyleSheet } from 'react-native';

const createStyles = (themeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: themeColors.text,
    marginBottom: 16,
    marginTop: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: themeColors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: themeColors.cardBackground,
    borderWidth: 1,
    borderColor: themeColors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: themeColors.text,
    minHeight: 48,
  },
  inputError: {
    borderColor: themeColors.error,
  },
  textArea: {
    backgroundColor: themeColors.cardBackground,
    borderWidth: 1,
    borderColor: themeColors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: themeColors.text,
    minHeight: 100,
  },
  errorText: {
    fontSize: 12,
    color: themeColors.error,
    marginTop: 4,
    marginLeft: 4,
  },
  planContainer: {
    gap: 12,
  },
  planOption: {
    backgroundColor: themeColors.cardBackground,
    borderWidth: 1,
    borderColor: themeColors.border,
    borderRadius: 8,
    padding: 16,
    minHeight: 80,
  },
  planOptionSelected: {
    borderColor: themeColors.primary,
    backgroundColor: themeColors.primary + '10',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.text,
  },
  planNameSelected: {
    color: themeColors.primary,
  },
  planDescription: {
    fontSize: 14,
    color: themeColors.textSecondary,
    lineHeight: 20,
  },
  planDescriptionSelected: {
    color: themeColors.text,
  },
  buttonContainer: {
    marginTop: 32,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: themeColors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    minHeight: 56,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.white,
  },
});

export default createStyles;
