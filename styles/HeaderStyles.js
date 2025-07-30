import { StyleSheet, Platform, StatusBar } from 'react-native';

const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

export const createHeaderStyles = (themeColors) => StyleSheet.create({
  headerContainer: {
    backgroundColor: themeColors.primary,
    // Remove paddingTop pois será controlado individualmente
  },
  headerContent: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    // paddingTop será adicionado dinamicamente no componente
  },
  headerLeft: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: themeColors.white,
    textAlign: 'center',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Mais opaco para melhor contraste
  },
  headerIcon: {
    color: themeColors.white,
  },
  headerActionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Mais opaco para melhor contraste
  },
  themeToggleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: 'rgba(255, 215, 0, 0.3)', // Mais opaco para melhor contraste
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.5)', // Borda mais visível
  },
});