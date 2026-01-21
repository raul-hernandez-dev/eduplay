import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Estado
      user: null,
      token: null,
      isLoading: false,
      error: null,
      
      // Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          // Simulación de API
          const response = await mockLoginAPI(credentials);
          
          set({
            user: response.user,
            token: response.token,
            isLoading: false,
            error: null
          });
          
          return { success: true };
        } catch (error) {
          set({ 
            error: error.message, 
            isLoading: false 
          });
          return { success: false, error: error.message };
        }
      },
      
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await mockRegisterAPI(userData);
          
          set({
            user: response.user,
            token: response.token,
            isLoading: false,
            error: null
          });
          
          return { success: true };
        } catch (error) {
          set({ 
            error: error.message, 
            isLoading: false 
          });
          return { success: false, error: error.message };
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          error: null
        });
      },
      
      updateProfile: (userData) => {
        set(state => ({
          user: { ...state.user, ...userData }
        }));
      },
      
      // Getters
      isAuthenticated: () => !!get().token,
      getUserRole: () => get().user?.role,
    }),
    {
      name: 'eduplay-auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token 
      }),
    }
  )
);

// Mock API functions (reemplazar con llamadas reales)
const mockLoginAPI = async (credentials) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (credentials.email === 'demo@eduplay.com' && credentials.password === 'demo123') {
    return {
      user: {
        id: '1',
        email: credentials.email,
        name: 'Usuario Demo',
        role: 'student',
        avatar: null,
        preferences: {}
      },
      token: 'demo-jwt-token'
    };
  }
  
  throw new Error('Credenciales inválidas');
};

export default useAuthStore;