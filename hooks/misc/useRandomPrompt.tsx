import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Database } from "@/types/supabase";

export default function useRandomPrompt() {
  const supabaseClient = useSupabaseClient<Database>();

  const getPrompt = async () => {
    const { data, error } = await supabaseClient
      .from("random_prompt")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      return {
        error: error.message,
        prompt: "",
        data: null,
      };
    }
    if (!data) {
      throw new Error("No data returned");
    }

    return data;
  };

  return useQuery(["random-prompt"], () => getPrompt());
}
