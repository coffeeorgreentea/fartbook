import { useQuery } from "@tanstack/react-query";
import { ImageOutputWithSignedUrls, Profile } from "@/types/index";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/supabase";
import UpdateModal from "../modals/UpdateModal";
import clsx from "clsx";

const updates = [
  {
    id: 1,
    subject: "v0.1",
    sender: "Synthx is now live!",
    time: "1w ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 2,
    subject: "Photorealism, anime and more!",
    sender: "10+ new models added.",
    time: "6d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 3,
    subject: "Lora Support added",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 4,
    subject: "Lora Support added",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 5,
    subject: "Lora Support added",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 6,
    subject: "Lora Support added",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 7,
    subject: "Lora Support added",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 8,
    subject: "Lora Support added",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
].reverse();

const posts = [
  {
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
  },
  {
    title: "How to use search engine optimization to drive sales",
    href: "#",
    description:
      "Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
  },
  {
    title: "Improve your customer experience",
    href: "#",
    description:
      "Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
  },
  {
    title: "Writing effective landing page copy",
    href: "#",
    description:
      "Ipsum voluptates quia doloremque culpa qui eius. Id qui id officia molestias quaerat deleniti. Qui facere numquam autem libero quae cupiditate asperiores vitae cupiditate. Cumque id deleniti explicabo.",
    date: "Jan 29, 2020",
    datetime: "2020-01-29",
  },
];

type Props = {
  classNames?: string;
};

const DashSideContent = (props: Props) => {
  const profile = useQuery<Profile>(["profile"]);
  const [activeTab, setActiveTab] = useState(0);

  const [open, setOpen] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(updates[0]);

  const handleTab = (index: number) => {
    setActiveTab(index);
  };
  return (
    <div
      className={clsx(
        props.classNames,
        "overflow-hidden hover:overflow-scroll"
      )}
    >
      {/* TABS */}
      <div className="top-0 z-50 divide-y divide-purple-700 xl:sticky">
        <div className="pl-0 space-x-2 rounded-sm tabs tabs-boxed conic from-purple-900 via-indigo-900 to-zinc-900">
          <button
            disabled={activeTab === 0}
            className="text-gray-300 rounded-sm tab btn btn-sm btn-ghost disabled:text-white hover:border-purple-700/50 disabled:border-purple-700"
            onClick={() => handleTab(0)}
          >
            Profile
          </button>
          <button
            disabled={activeTab === 1}
            className="text-gray-300 rounded-sm tab btn btn-sm btn-ghost disabled:text-white hover:border-purple-700/50 disabled:border-purple-700"
            onClick={() => handleTab(1)}
          >
            History
          </button>
          <button
            disabled={activeTab === 2}
            className="text-gray-300 rounded-sm tab btn btn-sm btn-ghost disabled:text-white hover:border-purple-700/50 disabled:border-purple-700"
            onClick={() => handleTab(2)}
          >
            Updates
          </button>
          <button
            disabled={activeTab === 3}
            className="text-gray-300 rounded-sm tab btn btn-sm btn-ghost disabled:text-white hover:border-purple-700/50 disabled:border-purple-700"
            onClick={() => handleTab(3)}
          >
            Blog
          </button>
        </div>
        {/* DIVDER */}
      </div>
      <div className="h-1 mt-1 border-t border-purple-700" />
      {activeTab === 0 ? (
        // @ts-ignore
        <Profile {...(profile.data || { avatar_url: "", username: "" })} />
      ) : activeTab === 1 ? (
        <History />
      ) : activeTab === 2 ? (
        <Updates updates={updates} />
      ) : (
        <Blog posts={posts} />
      )}
      {/* DIVDER */}
      {/* <div className="h-1 border-t border-purple-700" /> */}
    </div>
  );
};

type ProfileProps = {
  username: string;
  avatar_url: string;
};
const Profile = ({ username, avatar_url }: ProfileProps) => {
  return (
    <>
      <div className="relative overflow-hidden h-2/4 sm:h-64">
        <Image
          className="object-fill w-full rounded-t-sm"
          src="/img/depth/sketch_1.png"
          alt="profile-banner"
          fill
          unoptimized
        />
      </div>
      <div className="flex justify-start px-5 mb-5 -mt-12">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-purple-700">
            <img src={avatar_url || "img/logo.png"} />
          </div>
        </div>
      </div>
      <div className="">
        <div className="mb-8 px-7">
          <h2 className="text-3xl font-bold text-purple-700">@{username}</h2>
          <p className="mt-2 text-gray-300">Stats</p>
          <div className="flex flex-wrap justify-center gap-2 mt-8 sm:gap-4">
            <button className="inline-flex items-center p-1 text-gray-400 sm:p-2 hover:text-gray-300">
              <svg
                className="fill-current w-7 h-7"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </button>
            <button className="inline-flex items-center p-1 text-gray-400 sm:p-2 hover:text-gray-300">
              <svg
                className="fill-current w-7 h-7"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

type UpdatesProps = {
  updates: typeof updates;
};
const Updates = ({ updates }: UpdatesProps) => {
  const [open, setOpen] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(updates[0]);
  return (
    <>
      <UpdateModal
        open={open}
        setOpen={setOpen}
        title={selectedUpdate.subject}
        subTitle="test"
      >
        {selectedUpdate.preview}
      </UpdateModal>

      <ul role="list" className="divide-y divide-purple-700">
        {updates.map((update) => (
          <li
            onClick={() => {
              setSelectedUpdate(update);
              setOpen(true);
            }}
            key={update.id}
            className="relative px-4 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-700"
          >
            <div className="flex justify-between space-x-3">
              <div className="flex-1 min-w-0">
                <a href="#" className="block focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-purple-500 truncate">
                    {update.sender}
                  </p>
                  <p className="text-sm text-indigo-500 truncate">
                    {update.subject}
                  </p>
                </a>
              </div>
              <time
                dateTime={update.datetime}
                className="flex-shrink-0 text-sm text-purple-700 whitespace-nowrap"
              >
                {update.time}
              </time>
            </div>
            <div className="mt-1">
              <p className="text-sm text-white line-clamp-3">
                {update.preview}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

type BlogProps = {
  posts: typeof posts;
};

const Blog = ({ posts }: BlogProps) => {
  return (
    <ul role="list" className="divide-y divide-purple-700">
      {posts.map((post) => (
        <li
          key={post.href}
          className="relative px-4 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-700"
        >
          <div className="flex justify-between space-x-3">
            <div className="flex-1 min-w-0">
              <a href={post.href} className="block focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-purple-500 truncate">
                  {post.title}
                </p>
                <p className="text-sm text-indigo-500 truncate">
                  {post.description}
                </p>
              </a>
            </div>
            <time
              dateTime={post.datetime}
              className="flex-shrink-0 text-sm text-purple-700 whitespace-nowrap"
            >
              {/* @ts-ignore */}
              {post.time}
            </time>
          </div>
          <div className="mt-1">
            <p className="text-sm text-white line-clamp-3">
              {post.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

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
    <ul role="list" className="h-full divide-y divide-purple-700">
      {loading && <p>loading</p>}

      {error.length > 0 ? (
        <p>{error}</p>
      ) : (
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
      )}
    </ul>
  );
};

export default DashSideContent;
