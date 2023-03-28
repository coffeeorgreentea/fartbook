import type { NextPage } from "next";

// components
import BasicButton from "@/components/buttons/BasicButton";
import PageContainer from "@/components/containers/PageContainer";
import { fadeLeft } from "../constants/transitions";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <PageContainer title="Fart Book" description="SOTA AI Fart Generation" variants={fadeLeft}>
      <div className="absolute top-0 left-0 z-50 w-full h-full pointer-events-none hero">
        <div className="w-4/5 p-16 mx-auto text-center border border-purple-700 rounded-sm hero-content sm:w-auto conic from-purple-400/10 via-zinc-900/10 to-indigo-400/10 card-body text-neutral-content">
          <div className="max-w-md my-auto">
            <h1 className="mb-5 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500">
              Fart Book
            </h1>
            <p className="mb-5">SOTA Fart Generation</p>
            <div className="flex flex-row justify-center space-x-4">
              <BasicButton as="link" href="/login">
                Get started
              </BasicButton>
              <BasicButton as="link" href="https://www.magickml.com">
                Github
              </BasicButton>
            </div>

            {/* Depth Images */}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;
