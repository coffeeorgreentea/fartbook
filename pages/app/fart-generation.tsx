import PageContainer from "@/components/containers/PageContainer";
import ImageButtons from "@/components/generation/ImageButtons";
import { fade } from "@/constants/transitions";
import useInfiniteImages from "@/hooks/image/useInfiniteImages";
import useSelect from "@/hooks/misc/useSelect";
import useRealtime from "@/hooks/realtime/useRealtime";
import { getImages, getQueryClient, getUserProps } from "@/utils/ssr";
import Transition from "@/components/motion/Transition";
import { useQueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useAtom } from "jotai";
import { selectedAtom } from "@/atoms/image";
import Collapse from "@/components/containers/Collapse";
import ImageInfo from "@/components/generation/ImageInfo";
import ImageThumbs from "@/components/generation/ImageThumbs";
import ImageUploadEdits from "@/components/generation/ImageUploadsEdits";
import ImageGroups from "@/components/generation/ImageGroups";
import ImagePagination from "@/components/generation/ImagePagination";
import PromptArea from "@/components/generation/ImagePromptArea";

// SIDE
import Select from "@/components/inputs/Select";
import InputNum from "@/components/inputs/InputNum";
import BoolSwap from "@/components/inputs/BoolSwap";
import {
  insertBatchSize,
  insertHeight,
  insertModel,
  insertPipeline,
  insertScheduler,
  insertSteps,
  insertWidth,
  insertCfg,
  insertSafetyChecker,
  insertSeed,
} from "@/atoms/image";

// models resverse
const models = {
  sd21_768: "Stable Diffusion 2.1 768",
  sd21_512: "Stable Diffusion 2.1 512",
  sd15: "Stable Diffusion 1.5",
};

const pipelines = {
  text_to_image: "Text to Image",
  image_to_image: "Image to Image",
  inpainting: "Inpainting",
};

const schedulers = {
  DPMSolverMultistepScheduler: "DPMSolverMultistepScheduler",
  LMSDiscreteScheduler: "LMSDiscreteScheduler",
  DDIMScheduler: "DDIMScheduler",
  PNDMScheduler: "PNDMScheduler",
  EulerAncestralDiscreteScheduler: "EulerAncestralDiscreteScheduler",
  EulerDiscreteScheduler: "EulerDiscreteScheduler",
};

const ImageGeneration = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const queryClient = useQueryClient();
  const [selected, setSelected] = useAtom(selectedAtom);

  // pintura state
  const [editOpen, setEditOpen] = useState(false);
  const [editResult, setEditResult] = useState("");
  const [inpaintOpen, setInpaintOpen] = useState(false);
  const [inpaintResult, setInpaintResult] = useState("");

  // uploads
  const [uploads, setUploads] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [editorResult, setEditorResult] = useState(undefined);

  const {
    data: images,
    isLoading,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
  } = useInfiniteImages();

  const onImageStatusChange = useCallback(async () => {
    toast.success("Image status changed.");
    await queryClient.refetchQueries(["image_generations"]);
    await queryClient.refetchQueries(["infinite_images"]);
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // setGallery([0, 0, 0]);
    await queryClient.invalidateQueries(["image_processing"]);
  }, []);

  useRealtime(
    "image_generations",
    "image_outputs",
    "",
    onImageStatusChange,
    listening
  );

  const { data: processing, isLoading: processingLoading } = useSelect(
    "image_processing",
    5,
    "image_outputs",
    "status",
    "processing"
  );

  useEffect(() => {
    if (processing && processing.length > 0) {
      setListening(true);
      toast.success(`You have ${processing.length} images processing.`);
    } else {
      setListening(false);
    }
  }, [processing]);

  const imageSrc = () => {
    if (selected["source"] === "history") {
      // @ts-ignore
      return images.pages[selected.page][selected.generation].signed_urls[
        selected.image
      ].og;
    } else if (selected["source"] === "edits") {
      return uploads[selected.image];
    } else if (selected["source"] === "current") {
      return "";
    }
  };

  const handleNextPage = async () => {
    await fetchNextPage();
    if (hasNextPage) {
      setSelected({
        source: "history",
        page: selected.page + 1,
        generation: 0,
        image: 0,
      });
      // @ts-ignore
    } else if (selected.page < images?.pages.length - 1) {
      setSelected({
        source: "history",
        page: selected.page + 1,
        generation: 0,
        image: 0,
      });
    }
  };

  const handlePreviousPage = async () => {
    // await fetchPreviousPage();
    if (selected.page > 0) {
      setSelected({
        source: "history",
        page: selected.page + -1,
        generation: 0,
        image: 0,
      });
    }
  };
  return (
    <PageContainer
      sidebar={<SideContent />}
      direction="right"
      transition={true}
      showOnMobile={false}
      slideOnMobile={true}
      menuOpen={open}
      setMenuOpen={setOpen}
      title="Image Generation"
      description="next-ai app image generation"
    >
      <ImageButtons
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        inpaintOpen={inpaintOpen}
        setInpaintOpen={setInpaintOpen}
        uploads={uploads}
        // @ts-ignore
        images={images ? images : []}
        menuOpen={open}
        setMenuOpen={setOpen}
      />
      <div className="relative sm:card-body">
        {/* @ts-ignore */}
        {!isLoading && images?.pages[selected.page][selected.generation] && (
          <Transition
            // @ts-ignore
            name={
              //   images.pages[selected.page][selected.generation].signed_urls[
              //     selected["image"]
              //   ].og
              // @ts-ignore
              isSuccess && images.pages[selected.page][selected.generation]
            }
            //   w-72 h-72 sm:w-[512px] sm:h-[512px] lg:w-[1024x]"
            className="relative mx-auto w-72 h-72 mt-2 sm:w-[512px] sm:h-[512px] lg:w-[1024x]"
            variants={fade}
          >
            <Image
              // @ts-ignore
              src={imageSrc()}
              fill={true}
              // @ts-ignore
              alt={images.pages[selected.page][selected.generation].oid}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM80PKnHgAHDQLB9rFJWgAAAABJRU5ErkJggg=="
              unoptimized={true}
              className="object-contain"
            />
          </Transition>
        )}
        <ImageThumbs
          // @ts-ignore
          images={images.pages[selected.page][selected.generation].signed_urls}
          setSelected={setSelected}
          selected={selected}
        />

        {/* INFO AREA */}
        <Collapse title="Info" defaultOpen={true}>
          <ImageInfo
          // @ts-ignore
            data={images.pages[selected.page][selected.generation]}
            selected={selected}
          />
        </Collapse>

        {/* UPLOADS & EDITS */}
        {uploads.length > 0 && (
          <Collapse title="Uploads & Edits" defaultOpen={true}>
            <div className="flex max-w-3xl space-x-3 overflow-x-scroll scrollbar-hide">
              {uploads.map((upload, index) => (
                <ImageUploadEdits
                  image={upload}
                  key={`upload-${index}`}
                  index={index}
                  set={() =>
                    setSelected({
                      ...selected,
                      source: "edits",
                      image: index,
                    })
                  }
                  selected={selected}
                />
              ))}
            </div>
          </Collapse>
        )}

        {/* GROUPS */}
        <Collapse title="Past Generations" defaultOpen={true}>
          <ImageGroups
          // @ts-ignore
            images={images.pages[selected.page]}
            selected={selected}
            setSelected={setSelected}
          />
          <ImagePagination
            fetchNext={handleNextPage}
            fetchPrevious={handlePreviousPage}
            selected={selected.page}
          />
        </Collapse>

        <PromptArea />
      </div>
      {processing && processing.length > 0 && (
        <div className="text-center card-body">
          <p>{`You have ${processing.length} generations processing.`}</p>
          {listening ? <p>Listening for updates. </p> : <p>Not listening. </p>}
        </div>
      )}
    </PageContainer>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  console.log(ctx.query);

  if (ctx.query.remix === "true") {
    console.log("remixing");
  } else {
    console.log("not remixing");
  }

  const queries = [
    "account",
    "profile",
    "credits",
    "image_defaults",
    "image_insert",
    "image_processing",
    "image_generations",
    "infinite_images",
  ];

  const ddata = await getUserProps(ctx);
  const image_processing = await getImages(ctx, 5, "processing");
  const image_generations = await getImages(ctx, 10, "complete");

  const infinite_images = {
    pages: [image_generations],
    pageParams: [1],
  };
  if (!ddata || !image_processing || !image_generations) {
    return {
      notFound: true,
    };
  } else {
    const data = {
      ...ddata,
      image_processing,
      image_generations,
      infinite_images,
    };
    const dehydratedClient = await getQueryClient(data, queries);
    return {
      props: {
        data,
        dehydratedState: dehydratedClient,
      },
    };
  }
};

type SideProps = {};

const SideContent = ({}: SideProps) => {
  const [model, setModel] = useAtom(insertModel);
  const [pipeline, setPipeline] = useAtom(insertPipeline);
  const [scheduler, setScheduler] = useAtom(insertScheduler);
  const [width, setWidth] = useAtom(insertWidth);
  const [height, setHeight] = useAtom(insertHeight);
  const [steps, setSteps] = useAtom(insertSteps);
  const [batchSize, setBatchSize] = useAtom(insertBatchSize);
  const [cfg, setCfg] = useAtom(insertCfg);
  const [safetyChecker, setSafetyChecker] = useAtom(insertSafetyChecker);
  const [seed, setSeed] = useAtom(insertSeed);
  return (
    <div className="space-y-2 card-body hover:overflow-y-auto">
      <div className="items-center text-center">
        <div className="pb-2 card-title">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <div className="flex-col w-full mx-auto space-y-2 card-actions">
          <Select
            label="Model"
            options={Object.values(models)}
            tooltip="The model used to generate the image."
            value={model as string}
            onChange={(e) => {
              setModel(
                Object.keys(models)[
                  Object.values(models).indexOf(e.target.value)
                ]
              );
            }}
          />

          <Select
            label="Pipeline"
            options={Object.values(pipelines)}
            tooltip="The pipeline used to generate the image."
            value={pipeline as string}
            onChange={(e) => {
              setPipeline(
                Object.keys(pipelines)[
                  Object.values(pipelines).indexOf(e.target.value)
                ]
              );
            }}
          />
          <Select
            label="Scheduler"
            options={Object.values(schedulers)}
            tooltip="The scheduler used to generate noise."
            value={scheduler as string}
            onChange={(e) => {
              setScheduler(
                Object.keys(schedulers)[
                  Object.values(schedulers).indexOf(e.target.value)
                ]
              );
            }}
          />
          <InputNum
            label="Steps"
            min={1}
            max={200}
            step={1}
            right={false}
            tooltip="The number of steps to run the model for."
            value={steps as number}
            onChange={(e) => {
              setSteps(parseInt(e.target.value));
            }}
          />
          <InputNum
            label="Cfg"
            min={-20}
            max={50}
            step={0.5}
            right={false}
            tooltip="The classifer free guidance value used to generate the image."
            value={cfg as number}
            onChange={(e) => {
              setCfg(parseFloat(e.target.value));
            }}
          />
          <Select
            label="Width"
            options={Array.from(
              { length: (1536 - 64) / 64 + 1 },
              (_, i) => 64 + i * 64
            ).map((x) => x.toString())}
            tooltip="The width of the image to generate in pixels."
            value={width as number}
            onChange={(e) => {
              setWidth(parseInt(e.target.value));
            }}
          />

          <Select
            label="Height"
            options={Array.from(
              { length: (1536 - 64) / 64 + 1 },
              (_, i) => 64 + i * 64
            ).map((x) => x.toString())}
            tooltip="The height of the image to generate in pixels."
            value={height as number}
            onChange={(e) => {
              setHeight(parseInt(e.target.value));
            }}
          />
          <InputNum
            label="Batch Size"
            min={4}
            max={20}
            step={1}
            right={false}
            tooltip="The number of images to generate at once."
            value={batchSize as number}
            onChange={(e) => {
              setBatchSize(parseInt(e.target.value));
            }}
          />

          <BoolSwap
            label="NSFW Filter"
            on="ON"
            off="OFF"
            tooltip="Whether to filter out NSFW images."
            value={safetyChecker ? safetyChecker : true}
            onChange={(e) => {
              setSafetyChecker(e.target.checked);
            }}
          />

          <InputNum
            label="Seed"
            min={0}
            max={100000}
            step={1}
            right={true}
            tooltip="The seed used to generate the image."
            value={seed as number}
            onChange={(e) => {
              setSeed(parseInt(e.target.value));
            }}
          >
            <label className="w-full swap">
              <input type="checkbox" className="hidden" />
              <div className="swap-on">ON</div>
              <div className="swap-off">OFF</div>
            </label>
          </InputNum>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneration;
