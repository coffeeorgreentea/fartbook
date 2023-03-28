import { fadeLeft, fadeRight, fadeVertical } from "../../constants/transitions";
import Transition from "../motion/Transition";
import { Fragment, useState } from "react";
import { Dialog, Transition as T } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Head from "next/head";

type SlideOverProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
};

type Props = {
  title: string;
  description: string;
  variants?: any;
  children?: React.ReactNode;
  sidebar?: React.ReactNode;
  showOnMobile?: boolean;
  slideOnMobile?: boolean;
  transition?: boolean;
  direction?: "left" | "right";
  menuOpen?: boolean;
  setMenuOpen?: (value: boolean) => void;
  classNames?: string;
};

const PageContainer = ({
  title,
  description,
  variants,
  children,
  sidebar = null,
  direction,
  transition,
  showOnMobile = false,
  slideOnMobile = false,
  menuOpen = false,
  setMenuOpen = () => {},
  classNames = "",
}: Props) => {
  const [sidebarDirection, setSidebarDirection] = useState<"left" | "right">(
    direction || "right"
  );

  const [isTransitioning, setIsTransitioning] = useState(false);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* h-full ?? */}
      <div
        className={clsx(
          direction === "left" ? "flex-row-reverse" : "flex-row",
          "flex justify-between h-full px-0 my-0 transition-all duration-200 ease-in-out grow"
        )}
      >
        {sidebar && sidebarDirection === "left" && (
          <Aside
            direction={sidebarDirection}
            transition={transition}
            setDirection={setSidebarDirection}
          >
            {sidebar}
          </Aside>
        )}
        <Transition
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          name="page-container"
          variants={variants || fadeVertical}
          // className="z-50 items-center h-full text-white rounded-sm card grow shrink "
          className={clsx(
            isTransitioning ? "border-transparent" : "border-purple-700",
            "bright bg-gradient-to-tr from-purple-900/10 via-black/50 to-indigo-900/10 w-full h-full p-4 overflow-x-hidden overflow-y-auto text-white border-b border-l border-r rounded-none sm:overflow-hidden hover:overflow-y-auto card transition-colors duration-150 ease-in-out sm:p-4",
            classNames
          )}
        >
          {children}
          {sidebar && showOnMobile && <Hidden>{sidebar}</Hidden>}
        </Transition>
        {sidebar && sidebarDirection === "right" && (
          <Aside
            direction={sidebarDirection}
            transition={transition}
            setDirection={setSidebarDirection}
          >
            {sidebar}
          </Aside>
        )}
      </div>
      {sidebar && slideOnMobile && (
        <SlideOver open={menuOpen} setOpen={setMenuOpen}>
          {sidebar}
        </SlideOver>
      )}
    </>
  );
};

type AsideProps = {
  children: React.ReactNode;
  direction: "left" | "right";
  setDirection: (direction: "left" | "right") => void;
  transition?: boolean;
};

const Aside = ({
  children,
  direction,
  setDirection,
  transition,
}: AsideProps) => {
  if (transition) {
    return (
      <Transition
        key={direction}
        variants={direction === "left" ? fadeLeft : fadeRight}
        name="side-content"
        className="relative hidden h-full grid-cols-1 gap-4 overflow-hidden text-white rounded-sm card shrink-0 w-96 xl:grid"
      >
        {children}
        <button
          onClick={() => setDirection(direction === "left" ? "right" : "left")}
          className={clsx(
            direction === "left" ? "flex-row-reverse" : "flex-row",
            "absolute bottom-0 flex w-full p-2 text-purple-400 border-purple-700 hover:border-indigo-700"
          )}
        >
          <ChevronLeftIcon
            className={clsx(direction === "left" && "rotate-180", "w-8 h-8")}
          />
        </button>
      </Transition>
    );
  } else {
    return (
      <div className="sticky top-0 hidden h-full grid-cols-1 gap-4 text-white rounded-sm card shrink-0 w-96 xl:grid">
        {children}
      </div>
    );
  }
};

type HiddenProps = {
  children: React.ReactNode;
};

const Hidden = ({ children }: HiddenProps) => {
  return <div className="block md:hidden">{children}</div>;
};

const SlideOver = ({ children, open, setOpen }: SlideOverProps) => {
  return (
    <T.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <T.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 t-opacity" />
        </T.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
              <T.Child
                as={Fragment}
                enter="transform t ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform t ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative w-screen max-w-md pointer-events-auto">
                  <T.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 flex pt-4 pr-2 -ml-8 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="text-gray-300 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                      </button>
                    </div>
                  </T.Child>
                  <div className="flex flex-col h-full py-6 overflow-y-scroll text-white border-l border-purple-700 shadow-xl bg-gradient-to-tr from-purple-900/10 via-black/50 to-indigo-900/10 bright">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-medium">
                        Panel title
                      </Dialog.Title>
                    </div>
                    <div className="relative flex-1 px-4 mt-6 sm:px-6 card">
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </T.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </T.Root>
  );
};

export default PageContainer;
