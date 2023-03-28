import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

// components
import Transition from "@/components/motion/Transition";

import { fade } from "@/constants/transitions";
import { appNavigation } from "@/constants/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

type Props = {};

const Sidebar = (props: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [delayed, setDelayed] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // delays for showing title to avoid flickering
  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => setDelayed(true), 300);
      return () => clearTimeout(timeout);
    }
    setDelayed(false);
  }, [open]);

  return (
    <Transition
      variants={fade}
      name="sidebar"
      className={clsx(
        "hidden text-white md:flex card rounded-none bg-black/50 z-50"
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className={clsx(
          open ? "w-32" : "w-16",
          "relative h-16 btn btn-ghost hover:border-transparent transition-all duration-300 ease-in-out"
        )}
      >
        <Image src="/img/logo.png" fill alt="logo" className="object-contain" />
      </Link>

      {/* Navigation */}
      <div
        ref={navRef}
        id="sidebar-nav"
        className={clsx(
          open ? "w-32" : "w-16",
          "transition-all duration-500 ease-in-out "
        )}
      >
        <div className="flex flex-col items-center space-y-6 overflow-x-hidden">
          {appNavigation.map((item) => (
            <Link
              href={item.href}
              key={`sidebar-${item.name}`}
              className={clsx(
                open
                  ? "inline-flex items-center w-full space-x-2 justify-start ml-4"
                  : "",

                "py-2 border-transparent text-lg font-medium group"
              )}
            >
              <item.icon
                className={clsx(
                  router.asPath === item.href ? item.activeColor : "text-white",
                  "w-6 h-6 transition-all duration-300 ease-in-out",
                  //   item.hoverColor
                  "group-hover:text-purple-400"
                )}
              />

              {delayed && (
                <div
                  className={clsx(
                    router.asPath === item.href
                      ? "text-purple-500"
                      : "text-white",
                    delayed ? "opacity-100" : "opacity-0",
                    open ? "inline-flex" : "hidden",
                    "transition-all duration-300 ease-in-out group-hover:text-purple-400 font-semibold text-sm"
                  )}
                >
                  <span>{item.name}</span>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Width Toggle */}
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className="mx-auto mt-2 btn btn-ghost hover:border-transparent "
      >
        <ChevronRightIcon
          className={clsx(
            open ? "rotate-180" : "rotate-0",
            "w-6 h-6 text-purple-500 hover:text-purple-400 transition-transform duration-300 ease-in-out"
          )}
        />
      </button>

      {/* Spacer */}
      <div className="flex flex-col grow" />

      {/* Theme Switcher */}
      {/* </> */}
    </Transition>
  );
};

export default Sidebar;
