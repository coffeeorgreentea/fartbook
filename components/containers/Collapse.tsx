import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

type Props = {
  children: React.ReactNode;
  title: string;
  defaultOpen: boolean;
};

const Collapse = ({ children, title, defaultOpen }: Props) => {
  return (
    <Disclosure
      defaultOpen={defaultOpen}
      as="div"
      key={title}
      className="pb-2 mb-4 border-b border-purple-500"
    >
      {({ open }) => (
        <>
          <h3>
            <Disclosure.Button
              className="relative flex items-center justify-between w-full py-6 text-left group transition-500 "
            >
              <span
                className={clsx(
                  open ? "text-purple-500" : "text-purple-200",
                  "text-sm font-medium"
                )}
              >
                {title}
              </span>
              <span className="flex items-center ml-6">
                {open ? (
                  <MinusIcon
                    className="block w-6 h-6 text-purple-400 group-hover:text-purple-500"
                    aria-hidden="true"
                  />
                ) : (
                  <PlusIcon
                    className="block w-6 h-6 text-purple-300 group-hover:text-purple-400"
                    aria-hidden="true"
                  />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel as="div" className="flex flex-col justify-center">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Collapse;
