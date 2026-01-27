import { useEffect } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';

export const useAuthSession = () => {
  const { checkSession, isLoading } = useAuth();

  useEffect(() => {
    const initializeAuth = async () => {
      await checkSession();
    };

    initializeAuth();
  }, [checkSession]);

  return { isLoading };
};