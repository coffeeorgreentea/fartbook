import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface LoginProps {
  email: string;
  password: string;
}

const useLogin = () => {
  const supabaseClient = useSupabaseClient();
  const errorToast = (error: string) => toast.error(error);
  const successToast = (success: string) => toast.success(success);

  const login = async ({ email, password }: LoginProps) => {
    let {
      data: { user },
      error,
    } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      errorToast(error.message);
      throw new Error(`${error.message}`);
    }

    successToast("Welcome back!");
    return user;
  };

  return useMutation((data: LoginProps) => login(data), {
    onError(error) {
      console.log(error);
    },
  });
};

export default useLogin;
