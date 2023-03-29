import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import ZEAL from "@/constants/zeal";
// import AudioPlayer from "@/components/audio/AudioPlayer";
import dynamic from "next/dynamic";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const AudioPlayer = dynamic(() => import("@/components/audio/AudioPlayer"), {
  ssr: false,
});

export default function indexPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    // <div className="text-black">
    //   <h1>indexPage</h1>
    //   <p>{data.fartId}</p>

    //   <AudioPlayer audioBase64={ZEAL} />
    // </div>
    <Content />
  );
}

const Content = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <AudioPlayer audioBase64={ZEAL} />

      <div className="relative w-24 h-24">
        <Image
          src="/img/download.png"
          alt="Join the waitlist"
          fill
          className="object-fill"
        />
      </div>
      <h1 className="text-[#006B3E] text-4xl font-bold">Download your fart</h1>
      <div className="flex flex-row justify-center w-full gap-4 mt-4">
        <div className="flex flex-col gap-4">
          <button className="btn btn-ghost bg-[#1173f1] hover:bg-[#1173f1] focus:bg-[#1173f1] active:bg-[#1173f1]">
            Join the waitlist
          </button>
          <div className="relative w-24 h-24">
            <Image
              src="/icons/HandIcon.svg"
              alt="Join the waitlist"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button className="btn btn-ghost bg-[#1173f1] hover:bg-[#1173f1] focus:bg-[#1173f1] active:bg-[#1173f1]">
            Support our research
          </button>
          <div className="relative w-24 h-24">
            <Image
              src="/icons/SupportIcon.svg"
              alt="Join the waitlist"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button className="btn btn-ghost bg-[#1173f1] hover:bg-[#1173f1] focus:bg-[#1173f1] active:bg-[#1173f1]">
            Share your fart
          </button>
          <div className="relative w-24 h-24">
            <Image
              src="/icons/ShareIcon.svg"
              alt="Join the waitlist"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const fartId = ctx.params?.fartId;
  return {
    props: {
      data: {
        fartId,
      },
    },
  };
}
