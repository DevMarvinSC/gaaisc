// src/utils/SessionManager.js
export const getSession = () => {
  try {
    const session = localStorage.getItem('userSession');
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Error al obtener sesión:', error);
    return null;
  }
};

export const isLoggedIn = () => {
  const session = getSession();
  return session && session.isLoggedIn;
};

export const logout = () => {
  try {
    localStorage.removeItem('userSession');
    window.location.href = '/';
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

export const getCurrentUser = () => {
  return getSession();
};

export const checkSessionExpiry = () => {
  const session = getSession();
  if (session && session.loginTime) {
    const loginTime = new Date(session.loginTime);
    const now = new Date();
    const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
    
    if (hoursDiff > 8) {
      logout();
      return true;
    }
  }
  return false;
};