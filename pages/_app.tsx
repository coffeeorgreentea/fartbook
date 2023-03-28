import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import SupabaseProvider from "@/components/providers/SupabaseProvider";
import { ThemeProvider } from "next-themes";
import { useAtom, atom } from "jotai";
import { SessionProvider } from "next-auth/react";

// tanstack-query
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "../styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const queryClientAtom = atom(new QueryClient());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ||
    function (page) {
      return <Layout>{page}</Layout>;
    };

  const [queryClient] = useAtom(queryClientAtom);
  return (
    <SessionProvider session={session}>
      <SupabaseProvider session={pageProps.initialSession}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider>
              {getLayout(<Component {...pageProps} />)}
              {/* <Component {...pageProps} /> */}
            </ThemeProvider>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SupabaseProvider>
    </SessionProvider>
  );
}
