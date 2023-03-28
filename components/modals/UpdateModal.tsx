import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";

type Props = {
  children?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  subTitle?: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function UpdateModal({
  children,
  open,
  setOpen,
  title,
  subTitle,
  Icon,
}: Props) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-opacity-75 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left text-white transition-all transform rounded-sm shadow-xl bg-black/100 sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  {/* Icon */}
                  {Icon && (
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                      <Icon
                        className="w-6 h-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6"
                    >
                      {title}
                    </Dialog.Title>
                    {subTitle && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-300">{subTitle}</p>
                      </div>
                    )}

                    {children}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-5 text-white sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 bg-indigo-500 border-transparent rounded-sm shadow-sm btn hover:border-transparent hover:bg-indigo-600"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                  <Link
                    href="/"
                    className="inline-flex justify-center w-full px-4 py-2 bg-purple-500 border-transparent rounded-sm shadow-sm btn hover:border-transparent hover:bg-purple-600"
                    onClick={() => setOpen(false)}
                  >
                    Go
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
