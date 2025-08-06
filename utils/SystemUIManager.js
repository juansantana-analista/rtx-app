// utils/SystemUIManager.js
import { Platform, NativeModules, DeviceEventEmitter } from 'react-native';

const { StatusBarManager } = NativeModules;

class SystemUIManager {
  
  // Define a cor da navigation bar inferior (Android)
  static setNavigationBarColor(color, lightButtons = false) {
    if (Platform.OS === 'android' && Platform.Version >= 21) {
      try {
        // Usando StatusBarManager que também controla navigation bar
        if (StatusBarManager && StatusBarManager.setNavigationBarColor) {
          StatusBarManager.setNavigationBarColor(color, lightButtons);
        } else {
          // Fallback usando código nativo via bridge
          const { UIManager } = require('react-native');
          UIManager.dispatchViewManagerCommand(
            0, // rootViewTag 
            'setNavigationBarColor',
            [color, lightButtons]
          );
        }
        // Navigation Bar definida
      } catch (error) {
        console.warn('Não foi possível definir cor da navigation bar:', error);
      }
    }
  }

  // Define se os botões da navigation bar são claros ou escuros
  static setNavigationBarStyle(style) {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      try {
        const lightButtons = style === 'light';
        // Implementação para mudar estilo dos botões
        if (StatusBarManager && StatusBarManager.setNavigationBarStyle) {
          StatusBarManager.setNavigationBarStyle(lightButtons);
        }
      } catch (error) {
        console.warn('Não foi possível definir estilo da navigation bar:', error);
      }
    }
  }

  // Esconde a navigation bar
  static hideNavigationBar() {
    if (Platform.OS === 'android') {
      try {
        if (StatusBarManager && StatusBarManager.setHidden) {
          StatusBarManager.setHidden(true, 'slide');
        }
      } catch (error) {
        console.warn('Não foi possível esconder navigation bar:', error);
      }
    }
  }

  // Mostra a navigation bar
  static showNavigationBar() {
    if (Platform.OS === 'android') {
      try {
        if (StatusBarManager && StatusBarManager.setHidden) {
          StatusBarManager.setHidden(false, 'slide');
        }
      } catch (error) {
        console.warn('Não foi possível mostrar navigation bar:', error);
      }
    }
  }
}

export default SystemUIManager;