import Link from "next/link";
import Image from "next/image";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Transition from "@/components/motion/Transition";
import { fade } from "@/constants/transitions";
import { siteNavigation } from "@/constants/navigation";
import { useSetAtom } from "jotai";
import { mobileMenuAtom } from "@/atoms/index";
import DropdownMenu, { MenuItem } from "@/components/headless/DropdownMenu";
import useUserProfile from "@/hooks/profile/useUserProfile";
import useLogout from "@/hooks/auth/useLogout";
import { useEffect, useState } from "react";
import { usePathStartsWith } from "@/hooks/misc/usePathStartsWith";

type Props = {};

const items: MenuItem[] = [
  {
    title: "Profile",
    href: "/app/profile",
    type: "link",
  },
  {
    title: "Settings",
    href: "/app/settings",
    type: "link",
  },
  {
    title: "Docs",
    href: "/app/docs",
    type: "link",
  },
];

const Navbar = (props: Props) => {
  const router = useRouter();
  const session = useSession();
  const setMobileMenu = useSetAtom(mobileMenuAtom);
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { mutate: logout, isLoading: logoutLoading } = useLogout();
  const isAppRoute = usePathStartsWith("/app");
  const isLoginRoute = usePathStartsWith("/login");

  return (
    <Transition
      variants={fade}
      name="navbar"
      className="z-50 flex w-full text-white align-middle border-b bg-white/50 min-h-[3.5rem] border-b-green-700"
    >
      {/* Mobile Menu Button */}
      <div className="flex-none md:hidden">
        <button
          // htmlFor="my-drawer-3"
          onClick={() => setMobileMenu(true)}
          className="text-green-400 btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="inline-flex w-full align-middle">
        <div className="inline-flex justify-end w-full mr-4 space-x-10">
          {!isAppRoute && (
            <>
              {siteNavigation.map(({ href, name }) => (
                <Link
                  key={`{${href}-nav`}
                  className="hidden my-auto text-sm font-semibold transition-colors duration-300 ease-in-out hover:text-green-300 lg:flex"
                  href={href}
                >
                  {name}
                </Link>
              ))}

              <Link
                className="flex w-16 my-auto text-sm font-semibold transition-colors duration-300 ease-in-out hover:text-green-300"
                href={session ? "/app" : isLoginRoute ? "/" : "/login"}
              >
                {session ? "Dashboard" : isLoginRoute ? "Go back" : "Login"}
              </Link>
            </>
          )}

          {session && (
            <div className="inline-flex justify-end align-middle">
              <DropdownMenu
                header={
                  <UserMenuHeader
                    username={
                      typeof profile?.username === "string"
                        ? `@${profile?.username}`
                        : "loading..."
                    }
                  />
                }
                menuItems={[
                  ...items,
                  {
                    title: "Logout",
                    onClick: logout,
                    type: "button",
                    loading: logoutLoading,
                  },
                ]}
                classNames="w-10 mask mask-circle transition-transform ease-in-out duration-150 active:scale-95"
              >
                <Image
                  src={
                    profile?.avatar_url ? profile.avatar_url : "/img/logo.png"
                  }
                  alt="user-avatar"
                  width={40}
                  height={40}
                />
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </Transition>
  );
};

const UserMenuHeader = ({ username }: { username: string }) => {
  return (
    <>
      <p className="text-sm">Signed in as</p>
      <Link
        href="#"
        className="text-sm font-medium text-green-400 truncate hover:underline underline-under"
      >
        {username}
      </Link>
    </>
  );
};

export default Navbar;
