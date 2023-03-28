import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Database } from "@/types/supabase";
import toast from "react-hot-toast";
import { useUser } from "@supabase/auth-helpers-react";

export default function useUserProfile() {
  const { isLoading, session, error: authError } = useSessionContext();
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();

  const getProfile = async () => {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();
    if (error) {
      // toast.error("Error fetching user profile");
      return undefined;
    }

    if (!data) {
      return undefined;
    }

    return data;
  };

  return useQuery(["profile"], () => getProfile(), {
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !isLoading,
    refetchInterval: 1000 * 60,
    staleTime: 1000 * 60,
  });
}
