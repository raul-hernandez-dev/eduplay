import useAuthStore from '../store/authStore';

export const useAuth = () => {
  const {
    user,
    token,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated,
    getUserRole
  } = useAuthStore();

  return {
    // State
    user,
    token,
    isLoading,
    error,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    
    // Getters
    isAuthenticated: isAuthenticated(),
    getUserRole: getUserRole(),
    
    // Utilities
    isStudent: getUserRole() === 'student',
    isParent: getUserRole() === 'parent',
    isTeacher: getUserRole() === 'teacher',
  };
};