import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export type MenuItem = {
  title: string;
  type: "link" | "button";
  href?: string;
  onClick?: () => void;
  loading?: boolean;
};

export type DropdownProps = {
  header?: React.ReactNode;
  menuItems?: MenuItem[];
  classNames?: string;
  children?: React.ReactNode;
};

export default function Dropdown({
  header,
  menuItems,
  classNames,
  children,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <Menu as="div" className="relative inline-block my-auto text-left">
      <div>
        <Menu.Button className={classNames}>{children}</Menu.Button>
      </div>

      <Transition
        as={Fragment}
        beforeEnter={() => setOpen(true)}
        afterLeave={() => setOpen(false)}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right border divide-y divide-purple-500 rounded-sm shadow-lg border-purple-500/50 bg-black/75 backdrop-blur-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">{header}</div>
          <div className="">
            {/* map menuItems where type is not button */}

            {menuItems?.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) =>
                  item.type !== "button" ? (
                    <a
                      key={item.href}
                      href="#"
                      className={clsx(
                        active ? "bg-purple-400/50 text-white" : "text-white",
                        "block px-4 py-2 text-sm transition-colors duration-150 ease-in-out"
                      )}
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={item.onClick}
                          className={clsx(
                            item.loading && "cursor-not-allowed loading",
                            active
                              ? "bg-purple-400/50 text-white"
                              : "text-white",
                            "block w-full text-left px-4 py-2 text-sm transition-colors duration-150 ease-in-out"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  )
                }
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
