import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useMutation } from "@tanstack/react-query";
import Router from "next/router";
import toast from "react-hot-toast";

export default function useUpdatePassword() {
  const supabaseClient = useSupabaseClient();
  const updatePassword = async (password: string) => {
    const { data: user, error } = await supabaseClient.auth.updateUser({
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return user;
  };

  return useMutation((password: string) => updatePassword(password), {
    onSuccess: () => {
      toast.success("Password updated successfully");
      Router.push("/");
    },
  });
}
