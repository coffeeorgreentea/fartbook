import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Credits } from "@/types/index";
import { PostgrestError } from "@supabase/supabase-js";

type PostgrestResponse<T> = {
  data: T | null;
  error: PostgrestError | null;
};

export default function useCredits() {
  const { isLoading, session, error: authError } = useSessionContext();
  const supabaseClient = useSupabaseClient();

  const getCredits = async () => {
    if (authError || !session) {
      throw new Error("No session");
    }
    // typesafe
    const {
      data,
      error,
    }: {
      data: Credits | null;
      error: PostgrestError | null;
    } = await supabaseClient.from("credits").select("*").single();

    if (!data) {
      throw new Error("No credits");
    }

    return data;
  };

  //   type GenerationsResponse = Awaited<ReturnType<typeof getGenerations>>;

  return useQuery(["credits"], () => getCredits(), {
    refetchOnWindowFocus: true,
    retry: false,
    enabled: !isLoading,
    refetchInterval: 1000 * 60,
    staleTime: 1000 * 60,
  });
}
