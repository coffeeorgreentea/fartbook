import PageContainer from "@/components/containers/PageContainer";
import DashSideContent from "@/components/dashboard/DashSideContent";
import Welcome from "@/components/dashboard/Welcome";

// ssr
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProcessingCount, getQueryClient, getUserProps } from "@/utils/ssr";
import Action from "@/components/dashboard/Action";
import { actions } from "@/constants/actions";
import { useState } from "react";
import BasicButton from "@/components/buttons/BasicButton";
import AudioPlayer from "@/components/audio/AudioPlayer";

export default function IndexPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState<string | null>(null);
  const fart = async () => {
    setLoading(true);
    const audio = await fetch("/api/fart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        modelInputs: {
          prompt: prompt,
        },
      }),
    });
    const result = await audio.json();
    setAudio(result.audio);
    setLoading(false);
  };

  return (
    <PageContainer
      sidebar={<SideContent />}
      title="Dashboard"
      description="next-ai app dashboard"
      transition={true}
    >
      <div className="sm:card-body">
        <Welcome />
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            className="input input-bordered w-full border-indigo-500 focus:border-purple-600 ring-none rounded-sm"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your fart"
          />
          <BasicButton as="button" onClick={fart} loading={loading}>
            Fart
          </BasicButton>
          {audio && <AudioPlayer base64Audio={audio} />}
        </div>
      </div>
    </PageContainer>
  );
}

const SideContent = () => {
  return (
    <div className="space-y-2 rounded-none card from-purple-900/40 via-indigo-900/40 to-zinc-900/40">
      {/* <DashSideContent classNames="h-96 sm:card-body" /> */}
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queries = [
    "account",
    "profile",
    "image_defaults",
    "credits",
    "image_insert",
    "image_processing_count",
  ];
  const data = await getUserProps(ctx);
  const count = await getProcessingCount(ctx);

  // combine data and count into new object
  const merge = { ...data, image_processing_count: count };

  if (!data) {
    return {
      notFound: true,
    };
  } else {
    // @ts-ignore
    const dehydratedClient = await getQueryClient(merge, queries);
    return {
      props: {
        data,
        dehydratedState: dehydratedClient,
      },
    };
  }
};
