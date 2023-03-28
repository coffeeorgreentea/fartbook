import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";

export type SupabaseProviderProps = {
  children: React.ReactNode;
  session: Session;
};

const SupabaseProvider = ({ children, session }: SupabaseProviderProps) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      console.log("SB_PROVIDER: SIGNED_OUT");
    } else if (event === "SIGNED_IN") {
      console.log("SB_PROVIDER: SIGNED_IN");
    }
  });

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={session}
    >
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
