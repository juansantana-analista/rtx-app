// Utilitário para logout global sem dependência circular
let globalLogout = null;

export function registerGlobalLogout(fn) {
  globalLogout = fn;
}

export function forceGlobalLogout() {
  if (typeof globalLogout === 'function') {
    globalLogout();
  }
}

export function hasGlobalLogoutCallback() {
  return typeof globalLogout === 'function';
}