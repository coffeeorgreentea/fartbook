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
      className="z-50 flex w-full text-white align-middle bg-white/50 min-h-[3.5rem] navbar-shadow"
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
      <div className="flex flex-row items-center justify-between w-full mx-4">
        <Image
          src="/img/logo.png"
          alt="logo"
          width={48}
          height={48}
          unoptimized
        />
        <Image
          src="/img/text-logo.png"
          alt="logo"
          width={192}
          height={48}
          unoptimized
        />
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
