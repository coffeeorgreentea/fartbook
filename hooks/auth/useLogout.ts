import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function useLogout() {
  const supabaseClient = useSupabaseClient();
  const queryClient = useQueryClient();
  const router = useRouter();

  const logout = async () => {
    let { error } = await supabaseClient.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  };

  return useMutation(() => logout(), {
    onSuccess: () => {
      router.push("/");
      queryClient.removeQueries();
      toast.success("Goodbye!");
    },
    onError: (error) => {
      toast.error("Error logging out, please try again.");
    },
  });
}
