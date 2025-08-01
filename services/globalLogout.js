// Utilitário para logout global sem dependência circular
let globalLogout = null;

export function registerGlobalLogout(fn) {
  globalLogout = fn;
}

export function forceGlobalLogout() {
  console.log('forceGlobalLogout chamado');
  if (typeof globalLogout === 'function') {
    console.log('Executando logout global...');
    globalLogout();
  } else {
    console.log('Função de logout global não registrada');
  }
}

export function hasGlobalLogoutCallback() {
  return typeof globalLogout === 'function';
}