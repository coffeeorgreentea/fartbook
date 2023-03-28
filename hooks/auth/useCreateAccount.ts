import {
  SupabaseClient,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useMutation } from "@tanstack/react-query";
import { Database } from "@/types/supabase";

interface CreateUserProps {
  email: string;
  password: string;
  username?: string;
}

export const createAccount = async (
  supabaseClient: SupabaseClient,
  { email, password, username }: CreateUserProps
) => {
  let { data: findByUsername } = await supabaseClient
    .from("user")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (findByUsername) {
    throw new Error("Username already exists");
  }

  let {
    data: { user },
    error,
  } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(`${error.message}`);
  }

  return user;
};
const useCreateAccount = () => {
  const supabaseClient = useSupabaseClient();

  return useMutation(
    (data: CreateUserProps) => createAccount(supabaseClient, data),
    {
      onSuccess(user) {
        // state.user = user;
        console.log(user);
      },
      onError(error) {
        console.log(error);
      },
    }
  );
};

export default useCreateAccount;
