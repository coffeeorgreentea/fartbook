import { useRouter } from "next/router";
import { useSession } from "@supabase/auth-helpers-react";
import { Toaster } from "react-hot-toast";

// jotai
import { mobileMenuAtom } from "@/atoms/index";
import { useAtom } from "jotai";

// components
import Navbar from "./Navbar/Navbar";
import PagePresence from "../motion/PagePresence";
import Sidebar from "./Sidebar/Sidebar";
import ToastWind from "../misc/ToastWind";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const session = useSession();
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useAtom(mobileMenuAtom);

  return (
    <div className="relative flex flex-row h-full overflow-hidden">
      {/* <Toaster
        toastOptions={{
          className: "bg-black",
        }}
      /> */}
      <ToastWind />
      {/* Sidebar */}
      {session && router.pathname !== "/login" && <Sidebar />}
      <div className="z-40 drawer">
        {/* Hidden input for Daisy drawer */}
        <input
          checked={mobileMenu}
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          onChange={() => setMobileMenu(!mobileMenu)}
        />

        <div className="flex flex-col overflow-hidden drawer-content">
          <Navbar />
          <div className="flex flex-1 w-full h-full overflow-hidden transition-transform duration-500 ease-in-out backdrop-saturate-100">
            <PagePresence>
              <div
                key={router.route}
                className="z-40 w-full h-full mx-auto my-auto overflow-y-auto shrink"
              >
                {children}
              </div>
            </PagePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
