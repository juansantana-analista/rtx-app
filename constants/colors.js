// Cores oficiais do brandbook RTX Operações
export const lightColors = {
    // Cores principais RTX (EXATAS do brandbook)
    primary: '#113334',    // Azul RTX
    secondary: '#55B880',  // Verde RTX
    black: '#000000',      // Preto
    white: '#FFFFFF',      // Branco
    
    // Cores complementares (neutras apenas) - MELHORADAS para contraste
    lightGray: '#F8F9FA',  // Cinza muito claro para fundos
    mediumGray: '#E9ECEF', // Cinza médio para bordas
    darkGray: '#495057',   // Cinza escuro para texto secundário
    text: '#212529',       // Texto principal mais escuro
    textSecondary: '#495057', // Texto secundário mais escuro
    textTertiary: '#6C757D',  // Texto terciário
    error: '#DC3545',      // Vermelho para erros
    background: '#FFFFFF', // Fundo claro
    cardBackground: '#F8F9FA', // Fundo de cards
    
    // Cores de estado
    success: '#28A745',    // Verde de sucesso
    warning: '#FFC107',    // Amarelo de aviso
    
    // Cores de acento
    accent: '#55B880',     // Verde RTX como cor de destaque
    accentHover: '#4A9B6B', // Verde mais escuro para hover
    
    // Bordas e divisores
    border: '#DEE2E6',     // Bordas mais visíveis
    divider: '#E9ECEF',    // Divisores
    
    // Sobreposições
    overlay: 'rgba(0, 0, 0, 0.5)', // Overlay para modais
    shadow: 'rgba(0, 0, 0, 0.1)',  // Sombras
    
    // Cores específicas para Navigation Bar
    navigationBarBackground: '#FFFFFF', // Fundo da navigation bar (tema claro)
    navigationBarButtons: 'dark',       // Estilo dos botões (dark/light)
};

export const darkColors = {
    // Cores principais RTX adaptadas para tema escuro
    primary: '#000000',    // Azul RTX mais escuro
    blue: '#113334',    // Azul RTX
    secondary: '#4A9B6B',  // Verde RTX levemente mais escuro
    black: '#000000',      // Preto puro
    white: '#FFFFFF',      // Branco puro
    
    // Sistema de cinzas mais moderno baseado na imagem
    background: '#000000', // Fundo principal muito escuro (quase preto)
    cardBackground: '#1A1F25', // Cards ligeiramente mais claros
    lightGray: '#242A32',  // Cinza para elementos interativos
    mediumGray: '#2D3339', // Cinza médio para bordas
    darkGray: '#8A9199',   // Cinza claro para texto secundário
    
    // Textos otimizados para contraste
    text: '#E8EAED',       // Texto principal (branco levemente off)
    textSecondary: '#BDC1C6', // Texto secundário
    textTertiary: '#9AA0A6',  // Texto terciário
    
    // Cores de estado
    error: '#F28B82',      // Vermelho mais suave para tema escuro
    success: '#81C995',    // Verde de sucesso
    warning: '#FDD663',    // Amarelo de aviso
    
    // Cores de acento
    accent: '#55B880',     // Verde RTX como cor de destaque
    accentHover: '#4A9B6B', // Verde mais escuro para hover
    
    // Bordas e divisores
    border: '#2D3339',     // Bordas sutis
    divider: '#3C4043',    // Divisores
    
    // Sobreposições
    overlay: 'rgba(0, 0, 0, 0.7)', // Overlay para modais
    shadow: 'rgba(0, 0, 0, 0.3)',  // Sombras
    
    // Cores específicas para Navigation Bar
    navigationBarBackground: '#0F1419', // Fundo da navigation bar (tema escuro)
    navigationBarButtons: 'light',      // Estilo dos botões (dark/light)
};

export const colors = {
    light: lightColors,
    dark: darkColors
};