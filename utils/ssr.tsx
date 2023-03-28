import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { AppData } from "../types";
import { Database } from "@/types/supabase";
import { dehydrate, QueryClient } from "@tanstack/react-query";

const typeCheck = (data: any) => {
  if (typeof data === "string") {
    return JSON.parse(data);
  } else {
    return data;
  }
};

export const getAccountWithProfile = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient<Database>(ctx);
  const { data, error } = await supabase
    .from("accounts")
    .select("*, profile(*)")
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return {
    account: { ...data, profile: data.id },
    profile: data.profile,
  };
};

export const getAccountWithProfileAndDefaults = async (
  ctx: GetServerSidePropsContext
) => {
  const supabase = createServerSupabaseClient<Database>(ctx);
  const { data, error } = await supabase
    .from("accounts")
    .select("*, profile(*), image_defaults(*)")
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return {
    account: { ...data, profile: data.id, image_defaults: data.id },
    profile: data.profile,
    image_defaults: data.image_defaults,
  };
};

export const getImages = async (
  ctx: GetServerSidePropsContext,
  limit: number,
  status: "complete" | "processing" | "failed"
) => {
  const supabase = createServerSupabaseClient<Database>(ctx);
  const { data, error } = await supabase
    .from("image_outputs")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("status", status)
    .limit(limit);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  if (data) {
    return data;
  }
};

export const getProcessingCount = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient<Database>(ctx);
  const { error, count } = await supabase
    .from("image_outputs")
    .select("*", { count: "exact", head: true })
    .eq("status", "processing");

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  console.log(count);

  if (count || count === 0) {
    return count;
  }
};

export const getAccountProfileCreditsDefaults = async (
  ctx: GetServerSidePropsContext
) => {
  const supabase = createServerSupabaseClient<Database>(ctx);
  const { data, error } = await supabase
    .from("accounts")
    .select("*, profile(*), image_defaults(*), credits(*)")
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return {
    account: {
      ...data,
      profile: data.id,
      image_defaults: data.id,
      credits: data.id,
    },
    profile: data.profile,
    image_defaults: data.image_defaults,
    credits: data.credits,
  };
};

export const getUserProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const data = await getAccountProfileCreditsDefaults(ctx);

    // Use destructuring assignment to extract properties from the returned data
    const { account, profile, image_defaults, credits } = data;

    // Use a ternary operator to check the type of each property and parse it if necessary
    const parsedData: AppData = {
      account,
      profile: typeCheck(profile),
      image_defaults: typeCheck(image_defaults),
      credits: typeCheck(credits),
      image_insert: {
        ...typeCheck(image_defaults),
      },
    };

    return parsedData;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getQueryClient = async (data: AppData, queries: string[]) => {
  const queryClient = new QueryClient();

  const prefetchQueries = async (
    queries: string[],
    callback: (query: string) => any
  ) => {
    for (const query of queries) {
      try {
        await queryClient.prefetchQuery([query], async () => callback(query));
      } catch (error) {
        // handle error
      }
    }
  };
  try {
    await prefetchQueries(queries, (query) =>
      data ? data[query as keyof AppData] : null
    );
    return dehydrate(queryClient);
  } catch (error) {
    // handle error
    return false;
  }
};
