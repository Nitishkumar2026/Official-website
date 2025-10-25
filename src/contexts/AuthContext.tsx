import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConnected } from '../lib/supabaseClient';

interface Profile {
  id: string;
  role: string;
  full_name?: string;
  is_admin?: boolean;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  loginAsAdmin: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // FIX: If Supabase isn't connected, stop loading and show the app in a logged-out state.
    if (!isSupabaseConnected || !supabase) {
      setLoading(false);
      return;
    }

    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          const { data: userProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setProfile(userProfile);
        }
      } catch (e) {
        console.error("Error getting session:", e);
      } finally {
        setLoading(false);
      }
    };
    
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data: userProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    if (!supabase) return;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    if (error) throw error;
  };

  const updatePassword = async (password: string) => {
    if (!supabase) return;
    const { error } = await supabase.auth.updateUser({
      password: password
    });
    if (error) throw error;
  };

  const loginAsAdmin = async (email: string, password: string) => {
    // Hardcoded admin credentials
    if (email === "nitishk38938@gmail.com" && password === "Dreamjob@123Admin") {
      // Set admin status directly without Supabase authentication
      setIsAdmin(true);
      
      // Create a mock profile for the admin
      const adminProfile: Profile = {
        id: 'admin-user',
        role: 'admin',
        full_name: 'Admin User',
        is_admin: true
      };
      
      setProfile(adminProfile);
      return;
    } else {
      // If credentials don't match, throw error
      throw new Error('Invalid admin credentials');
    }
  };


  // Update isAdmin state when profile changes
  useEffect(() => {
    if (profile?.is_admin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [profile]);

  const value = {
    session,
    user,
    profile,
    loading,
    isAdmin,
    logout,
    resetPassword,
    updatePassword,
    loginAsAdmin,
  };

  return <AuthContext.Provider value={value}>{!loading ? children : null}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
