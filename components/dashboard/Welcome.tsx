import { useQuery } from "@tanstack/react-query";
import { Credits, Profile } from "@/types/index";
import MiniProfile from "./MiniProfile";
import History from "./History";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import useUserProfile from "@/hooks/profile/useUserProfile";
import Updates from "./Updates";
import BlogPosts from "./BlogPosts";
import clsx from "clsx";

const tabs = [
  {
    name: "Profile",
    title: "Profile",
  },
  {
    name: "History",
    title: "History",
  },
  {
    name: "Updates",
    title: "Updates",
  },
  {
    name: "Blog",
    title: "Blog",
  },
];

type Props = {};

const Welcome = (props: Props) => {
  //   const profile = useQuery<Profile>(["profile"]);
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(true);

  const profile = useQuery<Profile>(["profile"]);
  //   const processingCount = useQuery<number>(["image_processing_count"]);
  const credits = useQuery<Credits>(["credits"]);

  const handlePagination = (direction: boolean) => {
    if (direction) {
      if (tab === tabs.length - 1) {
        setTab(0);
      } else {
        setTab(tab + 1);
      }
    } else {
      if (tab === 0) {
        setTab(tabs.length - 1);
      } else {
        setTab(tab - 1);
      }
    }
  };

  return (
    <div className="relative text-white transition-all duration-300 ease-in-out border rounded-sm card conic from-purple-900/40 via-indigo-900/40 to-zinc-900/40 border-purple-700/25 hover:border-purple-700">
      {/* Dropdown button */}
      <button
        className={clsx(
          open ? "-rotate-90" : "rotate-90",
          "xl:hidden absolute top-0 right-0 p-2 text-purple-500 transform transition-transform duration-150 ease-in-out"
        )}
        onClick={() => setOpen(!open)}
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Title and pagination */}
      <div className="card-body">
        <div className="flex flex-row justify-between">
          <h2 className="block text-3xl font-semibold text-transparent xl:hidden bg-gradient-to-r from-purple-400/60 via-indigo-400/60 to-white/60 bg-clip-text">
            {open ? tabs[tab].title : "Welcome"}
          </h2>
          <h2 className="hidden text-3xl font-semibold text-transparent xl:block bg-gradient-to-r from-purple-400/60 via-indigo-400/60 to-white/60 bg-clip-text">
            {"Welcome"}
          </h2>
          {/* Pagination */}
          <div
            className={clsx(
              open ? "flex" : "hidden",
              "flex-row justify-center text-purple-500 xl:hidden"
            )}
          >
            <div className="flex flex-row justify-center space-x-2">
              <button
                onClick={() => handlePagination(false)}
                className="btn btn-ghost"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => handlePagination(true)}
                className="btn btn-ghost"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Contents */}
      <div
        className={clsx(
          open ? "grid" : "hidden",
          "grid-cols-1 pt-0 overflow-hidden divide-x divide-purple-500 xl:hidden card-body h-96 hover:overflow-scroll"
        )}
      >
        {tab === 0 ? (
          <MiniProfile
          // @ts-ignore
            username={profile.data?.username}
            // @ts-ignore
            avatar_url={profile.data?.avatar_url}
          />
        ) : tab === 1 ? (
          <History />
        ) : tab === 2 ? (
          <Updates />
        ) : (
          <BlogPosts />
        )}
      </div>

      {/* Bottom buttons */}
      <ul className="inline-flex justify-around py-2 border-t-0 rounded-b-sm bg-black/50">
 
      </ul>
    </div>
  );
};

export default Welcome;
