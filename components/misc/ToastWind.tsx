import { Toaster, resolveValue, toast, ToastIcon } from "react-hot-toast";
import {
  CheckCircleIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import useScreenSize from "@/hooks/misc/useScreenSize";

const ToastWind = () => {
  const { width: width } = useScreenSize();
  return (
    <Toaster
      position={width > 640 ? "top-center" : "bottom-center"}
      toastOptions={{ duration: 5000 }}
    >
      {(t) => (
        <Transition
          appear
          show={t.visible}
          as={Fragment}
          enter="transform ease-in-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2 scale-0"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0 scale-100"
          leave="transition ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="w-full max-w-sm overflow-hidden transition-colors duration-300 ease-in-out border border-purple-500 rounded-sm shadow-lg pointer-events-auto hover:border-purple-400 conic hover:purple-900/40 hover:via-black/40 hover:to-indigo-900/40 purple-900/50 via-black/50 to-indigo-900/50 backdrop-blur-xl">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {t.type === "success" ? (
                    <CheckCircleIcon
                      className="w-6 h-6 text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    t.type === "error" && (
                      <ExclamationTriangleIcon
                        className="w-6 h-6 text-red-500"
                        aria-hidden="true"
                      />
                    )
                  )}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-white">
                    {resolveValue(t.message, t)}
                  </p>
                </div>
                <div className="flex flex-shrink-0 ml-4">
                  <button
                    type="button"
                    className="inline-flex text-purple-500 bg-black rounded-sm hover:text-purple-400 focus:outline-none focus:ring-2 hover:ring-2 hover:ring-purple-400 focus:ring-purple-500 focus:ring-offset-0"
                    onClick={() => {
                      toast.dismiss(t.id);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon
                      className="w-5 h-5 text-purple-500"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      )}
    </Toaster>
  );
};

export default ToastWind;
