import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import clsx from "clsx";

// hooks
import { useSession } from "@supabase/auth-helpers-react";

// motion
import { fadeRight } from "../constants/transitions";
import PageContainer from "@/components/containers/PageContainer";
import BasicButton from "@/components/buttons/BasicButton";

import useLogin from "@/hooks/auth/useLogin";

const text = [
  {
    title: "Sign in to your account",
    button: "Sign in",
    switcher: "Don't have an account?",
    action: "sign-in",
  },
  {
    title: "Create an account",
    button: "Create account",
    switcher: "Already have an account?",
    switcherLink: "register",
  },
  {
    title: "Password Reset",
    button: "Reset password",
    switcher: "Remember your password?",
    switcherLink: "password-reset",
  },
];

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [switcher, setSwitcher] = useState<number>(0);

  const { mutate: login, isLoading: loginLoading } = useLogin();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
  };

  // redirect to app if logged in
  useEffect(() => {
    if (session) {
      router.push("/app");
    }
  }, [session]);

  const handleQueryParams = (action: string | string[] | undefined) => {
    if (action === "register") {
      setSwitcher(1);
    } else if (action === "password-reset") {
      setSwitcher(2);
    } else {
      setSwitcher(0);
    }
  };

  const changeQueryParams = (action: string) => {
    router.push({
      pathname: "/login",
      query: { action: action },
    });
  };

  useEffect(() => {
    handleQueryParams(router.query.action);
  }, [router.query.action]);

  return (
    <PageContainer
      title="Login"
      description="Login to next-ai"
      variants={fadeRight}
      classNames="p-0"
    >
      <div className="flex-row p-0 card-body">
        <div className="flex flex-col justify-center flex-1 px-0 py-0 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="w-full max-w-sm p-8 mx-auto rounded-sm lg:w-96 bg-black/75">
            <div>
              <Image src="/img/logo.png" alt="Logo" width={64} height={64} />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
                {text[switcher].title}
              </h2>
              <p className="mt-2 text-sm text-white">
                Or{" "}
                <a
                  onClick={() => {
                    switcher !== 1
                      ? changeQueryParams("register")
                      : changeQueryParams("sign-in");
                  }}
                  className="font-medium text-purple-500 cursor-pointer hover:text-purple-400"
                >
                  {switcher === 1
                    ? "sign in to your account."
                    : "create an account."}
                </a>
              </p>
            </div>

            <div className="mt-8">
              <div>
                <div>
                  <p className="text-sm font-medium text-white">Sign in with</p>

                  <div className="grid grid-cols-3 gap-3 mt-1">
                    {/* map 3 times */}
                    {[1, 2, 3].map((item) => (
                      <div key={`login-${item}`}>
                        <a
                          href="#"
                          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-purple-500 border border-purple-500 rounded-sm shadow-sm bg-purple-500/25 hover:bg-purple-500/50 "
                        >
                          <span className="sr-only">Sign in with GitHub</span>
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mt-6">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-white border border-purple-700 bg-zinc-900">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <form
                // onsubmit do not post
                onSubmit={handleLogin}
                className="mt-6"
              >
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white"
                    >
                      Email address
                    </label>
                    <div className="mt-1 text-black">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-sm shadow-sm appearance-none focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-white"
                    >
                      Password
                    </label>
                    <div className="mt-1 text-black">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-sm shadow-sm appearance-none focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="w-4 h-4 text-purple-500 transition-colors duration-300 ease-in-out bg-black border-gray-300 rounded-sm focus:ring-offset-0 focus:ring-0"
                      />
                      <label
                        htmlFor="remember-me"
                        className="block ml-2 text-sm text-white"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        onClick={() => {
                          switcher === 2
                            ? changeQueryParams("sign-in")
                            : changeQueryParams("password-reset");
                        }}
                        className="font-medium text-purple-600 cursor-pointer hover:text-purple-500"
                      >
                        {switcher === 2
                          ? "Know your password?"
                          : "Forgot your password?"}
                      </a>
                    </div>
                  </div>

                  <div>
                    <BasicButton
                      as="button"
                      // @ts-ignore
                      onClick={handleLogin}
                      loading={loginLoading}
                      className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-purple-700 border border-transparent rounded-sm shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-0 focus:ring-white "
                    >
                      {loginLoading ? "Loading..." : text[switcher].button}
                    </BasicButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="relative flex-1 hidden w-0 opacity-10 bg-purple-50 lg:block">
          <img
            className="absolute inset-0 object-cover w-full h-full"
            // src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </PageContainer>
  );
}
