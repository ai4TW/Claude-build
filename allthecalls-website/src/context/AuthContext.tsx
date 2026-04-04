import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase, Client } from "../lib/supabase";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  client: Client | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshClient: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null, user: null, client: null, loading: true,
  signOut: async () => {}, refreshClient: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchClient(userId: string) {
    const { data } = await supabase
      .from("clients")
      .select("*")
      .eq("user_id", userId)
      .single();
    setClient(data ?? null);
  }

  async function refreshClient() {
    if (session?.user) await fetchClient(session.user.id);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) fetchClient(session.user.id).finally(() => setLoading(false));
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) fetchClient(session.user.id);
      else setClient(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    setClient(null);
  }

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, client, loading, signOut, refreshClient }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
