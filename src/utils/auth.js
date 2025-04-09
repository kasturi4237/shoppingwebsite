// Check if user is authenticated
export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };
  
  // Set authentication token
  export const setAuthToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Remove authentication token
  export const removeAuthToken = () => {
    localStorage.removeItem('token');
  };
  
  // Get current user
  export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  // Set current user
  export const setCurrentUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  // Remove current user
  export const removeCurrentUser = () => {
    localStorage.removeItem('user');
  };
  
  // Logout user
  export const logout = () => {
    removeAuthToken();
    removeCurrentUser();
  };