import { StyleSheet } from 'react-native';

const createStyles = (themeColors) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: themeColors.background,
    borderRadius: 16,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: themeColors.text,
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.text,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: themeColors.textSecondary,
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: themeColors.text,
    flex: 2,
    textAlign: 'right',
  },
  highlightValue: {
    fontWeight: '600',
    color: themeColors.primary,
  },
  notesText: {
    fontSize: 14,
    color: themeColors.text,
    lineHeight: 20,
    backgroundColor: themeColors.cardBackground,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: themeColors.border,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: themeColors.border,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    minHeight: 48,
  },
  cancelButton: {
    backgroundColor: themeColors.cardBackground,
    borderWidth: 1,
    borderColor: themeColors.border,
  },
  confirmButton: {
    backgroundColor: themeColors.primary,
  },
  disabledButton: {
    opacity: 0.6,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: themeColors.text,
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: themeColors.white,
  },
});

export default createStyles;
