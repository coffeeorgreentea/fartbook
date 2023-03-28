import { ImageOutputWithSignedUrls } from "@/types/index";
import { Database } from "@/types/supabase";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Transition from "../motion/Transition";
import { fade } from "@/constants/transitions";
import LoadingSpinner from "../misc/LoadingSpinner";

type Props = {};

const History = () => {
  const supabase = useSupabaseClient<Database>();
  const [generations, setGenerations] = useState<ImageOutputWithSignedUrls[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGenerations = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("image_outputs")
        .select("*")
        .range(0, 9)
        .order("created_at", { ascending: false });
      if (error) {
        setError(error.message);
      }
      if (data) {
        setError("");
        // @ts-ignore
        setGenerations(data);
      }
      setLoading(false);
    };

    fetchGenerations();
  }, []);

  return (
    <Transition
      variants={fade}
      name="welcome-history"
      className="relative grid h-full grid-cols-1 divide-y divide-purple-700"
    >
      {error.length > 0 ? (
        <p className="absolute top-0 left-0 w-full h-full p-4 text-lg text-center text-red-500">
          {error}
        </p>
      ) : !loading ? (
        generations.map((generation) => (
          <li
            key={generation.oid}
            className="relative px-4 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-700"
          >
            <div className="flex justify-between space-x-3">
              <div className="flex-1 min-w-0">
                <a href="#" className="block focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-purple-500 truncate">
                    {generation.prompt}
                  </p>
                  <p className="text-sm text-indigo-500 truncate">
                    {generation.oid}
                  </p>
                  <div className="relative w-12 h-12">
                    {generation.status === "complete" ? (
                      <Image
                        className="object-contain w-16 h-16"
                        src={
                          generation.signed_urls[0].xs ||
                          generation.signed_urls[0].og ||
                          ""
                        }
                        alt={generation.oid}
                        fill
                      />
                    ) : generation.status === "processing" ? (
                      <p>image processing</p>
                    ) : (
                      <p>image failed</p>
                    )}
                  </div>
                  <button className="btn btn-ghost btn-sm">
                    <span>View</span>
                  </button>
                </a>
              </div>
              <div
                // dateTime={generation.created_at || ""}
                className="flex-shrink-0 text-sm text-purple-700 whitespace-nowrap"
              >
                {/* {generation.created_at} as new date  */}
                {new Date(generation.created_at || "").toLocaleDateString()}
                <p className="text-white text-end">
                  {generation.batch_size} credits
                </p>
              </div>
            </div>
          </li>
        ))
      ) : (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
          <LoadingSpinner classNames="w-24 h-24 text-purple-500" />
        </div>
      )}
    </Transition>
  );
};

export default History;
