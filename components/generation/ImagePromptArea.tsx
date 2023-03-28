import { useState, useEffect } from "react";
import { atom } from "jotai";

// atoms
import { useAtom, useAtomValue } from "jotai";
import {
  insertPrompt,
  insertNegativePrompt,
  imageInsertAtom,
} from "@/atoms/image";
// import { imageDefaultsAtom } from "@/atoms/HydrationAtoms";

// components
import DropPopMenu from "../containers/DropPopMenu";

// ui
import {
  AtSymbolIcon,
  CodeBracketIcon,
  LinkIcon,
} from "@heroicons/react/20/solid";
import { ImageDefaults, ImageOutputInsert } from "@/types/index";
import useCreateImage from "@/hooks/image/useCreateImage";
// react query
import useRandomPrompt from "@/hooks/misc/useRandomPrompt";
import { queryClientAtom } from "pages/_app";
import BasicButton from "../buttons/BasicButton";
import LoadingSpinner from "../misc/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const buttonOne = [
  {
    label: "Save Preset",
    Icon: AtSymbolIcon,
  },
  {
    label: "Load Preset",
    Icon: CodeBracketIcon,
  },
];

const buttonTwo = [
  {
    label: "No label",
    Icon: AtSymbolIcon,
  },
  {
    label: "Create label",
    Icon: CodeBracketIcon,
  },
  {
    label: "label 1",
    Icon: LinkIcon,
  },
  {
    label: "label 2",
    Icon: LinkIcon,
  },
  {
    label: "label 3",
    Icon: LinkIcon,
  },
];

const buttonThree = [
  {
    label: "Url",
    Icon: AtSymbolIcon,
  },
  {
    label: "Automatic1111",
    Icon: CodeBracketIcon,
  },
  {
    label: "InvokeAI",
    Icon: LinkIcon,
  },
];
const PromptArea = (props: Props) => {
  const [prompt, setPrompt] = useAtom(insertPrompt);
  const [negativePrompt, setNegativePrompt] = useAtom(insertNegativePrompt);
  //   const imageDefaultsAtom = atom<ImageDefaults>({} as ImageDefaults);
  //   const imageDefaults = useAtomValue(imageDefaultsAtom);
  const imageDefaults = useQuery<ImageDefaults>(["image_defaults"]);

  const [imageInsert, setImageInsert] = useAtom(imageInsertAtom);
  const [reset, setReset] = useState(false);

  //   change all values of keys in object a with matching keys in object b
  const changeValues = (a: any, b: any) => {
    for (const key in a) {
      if (b[key]) {
        a[key] = b[key];
      }
    }
  };

  const { mutate: createGeneration, isLoading: createLoading } =
    useCreateImage();

  //   useEffect(() => {
  //     if (reset) {
  //       const i = { ...imageDefaults };
  //       setImageInsert(imageDefaults as ImageOutputInsert);
  //       setReset(false);
  //     }
  //   }, [reset]);

  const handleReset = () => {
    // @ts-ignore
    setImageInsert(imageDefaults.data);
  };

  // random prompt
  const queryClient = useAtom(queryClientAtom);
  const { data: randomPrompt } = useRandomPrompt();

  const handleRandomPrompt = async () => {
    await queryClient[0].refetchQueries(["random-prompt"]);
    // setPrompt(!randomPrompt ? "" : randomPrompt.prompt);
    if (randomPrompt !== undefined && randomPrompt.prompt !== null) {
      setPrompt(randomPrompt.prompt);
    }
  };

  return (
    <div className="w-full rounded-sm card md:p-8">
      <div className="items-center hidden md:flex">
        <div className="flex space-x-2">
          <button
            className="btn btn-ghost hover:border-purple-500
            text-white bg-black border border-purple-500 hover:bg-zinc-900
            rounded-sm px-3 p-1.5 text-sm font-medium transition-colors duration-300 ease-in-out"
            onClick={() => {
              setPrompt("");
              setNegativePrompt("");
            }}
          >
            Clear Prompts
          </button>
          <button className="btn btn-ghost hover:border-purple-500
            text-white bg-black border border-purple-500 hover:bg-zinc-900
            rounded-sm px-3 p-1.5 text-sm font-medium transition-colors duration-300 ease-in-out" onClick={() => handleReset()}>
            Reset to Defaults
          </button>
          <button
            className="btn btn-ghost hover:border-purple-500
            text-white bg-black border border-purple-500 hover:bg-zinc-900
            rounded-sm px-3 p-1.5 text-sm font-medium transition-colors duration-300 ease-in-out"
            onClick={() => handleRandomPrompt()}
          >
            Random Prompt
          </button>
        </div>

        {true ? (
          <div className="flex items-center ml-auto space-x-3">
            <DropPopMenu
              title="Presets"
              // @ts-ignore
              Icon={CodeBracketIcon}
              // @ts-ignore
              tabs={buttonOne}
            />
            {/* @ts-ignore */}
            <DropPopMenu title="label" Icon={LinkIcon} tabs={buttonTwo} />
            <DropPopMenu
              title="Export settings"
              // @ts-ignore
              Icon={AtSymbolIcon}
              // @ts-ignore
              tabs={buttonThree}
            />
          </div>
        ) : null}
      </div>

      {/* prompt area */}
      <div className="w-full mt-2">
        <div className="w-full -m-0.5 rounded-lg p-0.5">
          <label htmlFor="prompt" className="sr-only">
            Prompts
          </label>
          <textarea
            rows={5}
            name="prompt-top"
            id="prompt"
            className="block w-full text-white border-purple-400 rounded-sm rounded-b-none bg-black/75 backdrop-brightness-200 sm:text-sm focus:border-indigo-500 focus:ring-transparent"
            placeholder="Prompt"
            // value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
          />
          <label htmlFor="negative_prompt" className="sr-only">
            Negative Prompt
          </label>
          <textarea
            rows={3}
            name="negative_prompt"
            id="negative_prompt"
            className="block w-full text-white border-purple-400 rounded-sm rounded-t-none sm:text-sm bg-black/75 backdrop-brightness-200 focus:border-indigo-500 focus:ring-transparent"
            placeholder="Negative Prompt"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end mt-2">
        <BasicButton
          as="button"
          className="w-24"
          onClick={() => {
            createGeneration();
          }}
        >
          Generate
          {createLoading && <LoadingSpinner classNames="ml-2 h-4 w-4" />}
        </BasicButton>
      </div>
    </div>
  );
};

export default PromptArea;
