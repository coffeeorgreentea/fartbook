import { useState } from "react";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Database } from "@/types/supabase";
import { ImageOutputWithSignedUrls } from "@/types/index";

export default function useInfiniteImages() {
  const { isLoading, session, error: authError } = useSessionContext();
  const supabaseClient = useSupabaseClient<Database>();

  const supabase = useSupabaseClient<Database>();

  const [page, setPage] = useState<number>(1);

  const [finalPage, setFinalPage] = useState(false);

  const getInfiniteGenerations = async (page: number) => {
    const { data: images, error } = await supabase
      .from("image_outputs")
      .select("*")
      .eq("status", "complete")
      .range(page * 10 - 10, page * 10 - 1)
      .order("created_at", { ascending: false });

    if (error) {
      // throw new Error(error.message);
      console.log(error.message);
      return undefined;
    }

    if (!images) {
      // return empty array instead?
      setFinalPage(true);
      return undefined;
    }
    if (images.length < 10) {
      setFinalPage(true);
    }

    return images as ImageOutputWithSignedUrls[];
  };

  return useInfiniteQuery(
    ["infinite_images"],
    ({ pageParam = 1 }) => getInfiniteGenerations(pageParam),
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !isLoading,
      refetchInterval: 1000 * 600,
      staleTime: 1000 * 600,
      getNextPageParam: (lastPage, allPages) => {
        if (finalPage) return undefined;
        const nextPage = allPages.length + 1;
        return nextPage;
      },
      getPreviousPageParam: (firstPage, allPages) => {
        const previousPage = allPages.length - 1;
        return previousPage;
      },
    }
  );
}
