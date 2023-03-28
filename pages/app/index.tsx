import PageContainer from "@/components/containers/PageContainer";
import DashSideContent from "@/components/dashboard/DashSideContent";
import Welcome from "@/components/dashboard/Welcome";

// ssr
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProcessingCount, getQueryClient, getUserProps } from "@/utils/ssr";
import Action from "@/components/dashboard/Action";
import { actions } from "@/constants/actions";
import { useState } from "react";

export default function IndexPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [actionOpen, setActionOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(actions[0]);
  return (
    <PageContainer
      sidebar={<SideContent />}
      title="Dashboard"
      description="next-ai app dashboard"
      transition={true}
    >
      <div className="sm:card-body">
        <Welcome />
        <p>Insert Fart Generation Stuff Here</p>
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
