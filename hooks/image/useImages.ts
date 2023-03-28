import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Database } from "@/types/supabase";

export default function useImages(fkey: string, limit: number) {
  const { isLoading, session, error: authError } = useSessionContext();
  const supabaseClient = useSupabaseClient<Database>();

  const getRecords = async () => {
    if (authError || !session) {
      throw new Error("No session");
    }
    const { data, error } = await supabaseClient
      .from("image_outputs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      // return empty array instead?
      return [];
    }

    return data;
  };

  return useQuery([fkey], () => getRecords(), {
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !isLoading,
    refetchInterval: 1000 * 60,
    staleTime: 1000 * 60,
  });
}
