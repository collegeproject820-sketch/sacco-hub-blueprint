import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: AppRole | null;
  isLoading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshRole: () => Promise<void>;
  authReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);

  const fetchUserRole = useCallback(async (userId: string): Promise<AppRole | null> => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching role:', error);
        return null;
      }
      
      if (!data || data.length === 0) return null;
      
      const hasAdmin = data.some(r => r.role === 'admin');
      if (hasAdmin) return 'admin';
      
      return data[0]?.role || null;
    } catch (error) {
      console.error('Error fetching role:', error);
      return null;
    }
  }, []);

  const refreshRole = useCallback(async () => {
    if (user) {
      const userRole = await fetchUserRole(user.id);
      setRole(userRole);
    }
  }, [user, fetchUserRole]);

  useEffect(() => {
    let mounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const initialize = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (session?.user) {
          const userRole = await fetchUserRole(session.user.id);
          if (mounted) {
            setSession(session);
            setUser(session.user);
            setRole(userRole);
          }
        } else {
          if (mounted) {
            setSession(null);
            setUser(null);
            setRole(null);
          }
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
          setAuthReady(true);
        }
      }
    };

    // Set up listener BEFORE getting session (per Supabase docs)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        if (session?.user) {
          // Defer role fetch to avoid race condition
          setTimeout(async () => {
            if (!mounted) return;
            const userRole = await fetchUserRole(session.user.id);
            if (mounted) {
              setSession(session);
              setUser(session.user);
              setRole(userRole);
              setIsLoading(false);
              setAuthReady(true);
            }
          }, 0);
        } else {
          setSession(null);
          setUser(null);
          setRole(null);
          setIsLoading(false);
          setAuthReady(true);
        }
      }
    );
    authSubscription = subscription;

    // Now initialize
    initialize();

    return () => {
      mounted = false;
      authSubscription?.unsubscribe();
    };
  }, [fetchUserRole]);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            full_name: fullName,
          },
        },
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRole(null);
  };

  const value = {
    user,
    session,
    role,
    isLoading,
    authReady,
    isAdmin: role === 'admin',
    signUp,
    signIn,
    signOut,
    refreshRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
