import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../../../lib/supabaseClient';
import toast from 'react-hot-toast';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Estado
      user: null,
      session: null,
      profile: null,
      isLoading: false,
      error: null,
      
      // Actions
      login: async ({ email, password }) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          // Obtener perfil del usuario
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
            console.warn('Error fetching profile:', profileError);
          }

          set({
            user: data.user,
            session: data.session,
            profile: profile || {
              id: data.user.id,
              email: data.user.email,
              full_name: data.user.user_metadata?.full_name || '',
              role: data.user.user_metadata?.role || 'student',
            },
            isLoading: false,
            error: null,
          });

          toast.success('¡Bienvenido de vuelta!');
          return { success: true };
        } catch (error) {
          const message = error.message || 'Error al iniciar sesión';
          set({ error: message, isLoading: false });
          toast.error(message);
          return { success: false, error: message };
        }
      },
      
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          // 1. Registrar usuario en Supabase Auth
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: {
              data: {
                full_name: userData.name,
                role: userData.role,
                birth_date: userData.birthDate,
              },
              emailRedirectTo: `${window.location.origin}/auth/callback`,
            }
          });

          if (authError) throw authError;

          // 2. No intentar insertar en profiles manualmente
          // El trigger handle_new_user lo hará automáticamente
          
          // Si el usuario no necesita confirmación de email (en desarrollo)
          if (authData.user && !authData.user.identities?.length) {
            toast.error('El usuario ya existe');
            return { success: false, error: 'El usuario ya existe' };
          }

          // 3. Si se requiere confirmación de email
          if (authData.user && authData.session) {
            // Usuario confirmado inmediatamente (puede suceder en desarrollo)
            set({
              user: authData.user,
              session: authData.session,
              profile: {
                id: authData.user.id,
                email: userData.email,
                full_name: userData.name,
                role: userData.role,
              },
              isLoading: false,
              error: null,
            });
            
            toast.success('¡Cuenta creada exitosamente!');
            return { success: true };
          } else {
            // Usuario necesita confirmar email
            set({ isLoading: false, error: null });
            toast.success('¡Revisa tu email para confirmar la cuenta!');
            return { 
              success: true, 
              needsConfirmation: true,
              message: 'Por favor revisa tu email para confirmar tu cuenta.' 
            };
          }
        } catch (error) {
          console.error('Registration error:', error);
          const message = error.message || 'Error al crear la cuenta';
          set({ error: message, isLoading: false });
          toast.error(message);
          return { success: false, error: message };
        }
      },
      
      logout: async () => {
        try {
          await supabase.auth.signOut();
          set({
            user: null,
            session: null,
            profile: null,
            error: null,
          });
          toast.success('Sesión cerrada correctamente');
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      },
      
      updateProfile: async (profileData) => {
        try {
          const { error } = await supabase
            .from('profiles')
            .update({
              ...profileData,
              updated_at: new Date().toISOString(),
            })
            .eq('id', get().user.id);

          if (error) throw error;

          set(state => ({
            profile: { ...state.profile, ...profileData }
          }));

          toast.success('Perfil actualizado correctamente');
          return { success: true };
        } catch (error) {
          toast.error('Error al actualizar el perfil');
          return { success: false, error: error.message };
        }
      },
      
      // Social Login
      loginWithGoogle: async () => {
        try {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
              queryParams: {
                access_type: 'offline',
                prompt: 'consent',
              }
            }
          });
          if (error) throw error;
        } catch (error) {
          toast.error('Error al iniciar sesión con Google');
        }
      },
      
      loginWithGitHub: async () => {
        try {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            }
          });
          if (error) throw error;
        } catch (error) {
          toast.error('Error al iniciar sesión con GitHub');
        }
      },

      // Verificar sesión activa
      checkSession: async () => {
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) throw error;

          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            set({
              user: session.user,
              session: session,
              profile: profile || {
                id: session.user.id,
                email: session.user.email,
                full_name: session.user.user_metadata?.full_name || '',
                role: session.user.user_metadata?.role || 'student',
              },
            });
          }
        } catch (error) {
          console.error('Session check error:', error);
        }
      },
      
      // Getters
      isAuthenticated: () => {
        const session = get().session;
        return !!session && new Date(session.expires_at * 1000) > new Date();
      },
      getUserRole: () => get().profile?.role,
    }),
    {
      name: 'eduplay-auth-storage',
      partialize: (state) => ({ 
        session: state.session,
        profile: state.profile,
      }),
      onRehydrateStorage: () => (state) => {
        // Restaurar sesión de Supabase
        if (state?.session) {
          supabase.auth.setSession(state.session);
        }
      },
    }
  )
);

export default useAuthStore;