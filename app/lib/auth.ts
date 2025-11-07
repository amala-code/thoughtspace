
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123' // Change this to your password
  };
  
  // Simple hash function (for basic security)
  const simpleHash = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  };
  
  export const login = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const token = simpleHash(`${username}${password}${Date.now()}`);
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', username);
      return true;
    }
    return false;
  };
  
  export const logout = (): void => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  };
  
  export const isAuthenticated = (): boolean => {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('admin_token');
    return !!token;
  };
  
  export const getUser = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('admin_user');
  };