import { useEffect, useState, useCallback, useRef } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function useRealtime(
  channel: string,
  table: string,
  filter: string = "",
  callback: () => void,
  isSubscribed: boolean
) {
  const supabase = useSupabaseClient();
  const chRef = useRef<any>(null);
  const memoizedCallback = useCallback(callback, []);

  useEffect(() => {
    if (!isSubscribed) return;
    chRef.current = supabase.channel(channel).on(
      "postgres_changes",
      {
        schema: "public",
        table,
        filter: filter || undefined,
        event: "*",
      },
      (_: unknown) => {
        memoizedCallback();
      }
    );
    chRef.current.subscribe();
    return () => {
      chRef.current.unsubscribe();
    };
  }, [channel, table, filter, memoizedCallback, isSubscribed]);

  useEffect(() => {
    if (isSubscribed) {
      console.log("subscribed");
    } else {
      console.log("unsubscribed");
    }
  }, [isSubscribed]);
}
