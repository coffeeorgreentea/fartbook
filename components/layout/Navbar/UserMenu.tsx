import Image from "next/image";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Link from "next/link";
import useLogout from "@/hooks/auth/useLogout";
import useUserProfile from "@/hooks/profile/useUserProfile";

type Props = {
  direction: "left" | "right" | "top" | "bottom";
};

const UserMenu = ({ direction }: Props) => {
  const { data: profile, isLoading } = useUserProfile();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { mutate: logout, isLoading: logoutLoading } = useLogout();
  return (
    <div
      className={clsx(
        "dropdown",
        direction === "left" && "dropdown-left",
        direction === "right" && "dropdown-right",
        direction === "top" && "dropdown-top",
        direction === "bottom" && "dropdown-end"
      )}
    >
      <label
        tabIndex={0}
        className={clsx(
          !profile && "pointer-events-none",
          "btn btn-ghost btn-circle avatar"
        )}
      >
        <div className="w-10 mask mask-circle">
          <Image
            src={profile?.avatar_url ? profile.avatar_url : "/img/logo.png"}
            alt="user-avatar"
            width={40}
            height={40}
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="p-2 mt-3 rounded-sm menu bg-black/80 menu-compact drop-shadow-lg dropdown-content w-52"
      >
        <li className="group hover:text-purple-400">
          <Link
            className="justify-between group-hover:bg-white group-hover:bg-opacity-20"
            href={"/profile/" + profile?.username}
          >
            Profile
            <span className="text-purple-400 badge">New</span>
          </Link>
        </li>
        <li className="group hover:text-purple-400">
          <Link
            className="group-hover:bg-white group-hover:bg-opacity-20"
            href="/app/credits"
          >
            Credits
          </Link>
        </li>
        <li className="group hover:text-purple-400">
          <Link
            className="group-hover:bg-white group-hover:bg-opacity-20"
            href="/app/settings"
          >
            Settings
          </Link>
        </li>
        <li className="group hover:text-purple-400">
          <Link
            className="group-hover:bg-white group-hover:bg-opacity-20"
            href="/docs"
          >
            Help
          </Link>
        </li>
        <li className="group before:text-purple-500">
          <button
            className={clsx(
              logoutLoading && "loading before:text-white",
              "group-hover:bg-white group-hover:bg-opacity-20"
            )}
            onClick={async () => {
              logout();
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
