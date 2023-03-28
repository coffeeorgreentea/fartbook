import { atom } from "jotai";
import { ImageOutput, ImageOutputInsert } from "../types";

export type SelectedImage = {
  page: number;
  generation: number;
  image: number;
  source: "history" | "edits" | "current";
};

export type SelectedStorage = {
  page: number;
  generation: number;
  image: number;
  source: "image" | "audio" | "language";
};

export const selectedAtom = atom<SelectedImage>({
  source: "history",
  page: 0,
  generation: 0,
  image: 0,
});

export const selectedStorageAtom = atom<SelectedStorage>({
  page: 0,
  generation: 0,
  image: 0,
  source: "image",
});

// export const imageGenerationAtom = atom<ImageOutput[]>([]);

// export const imageStorageAtom = atom(
//   (get) => get(imageOutputsAtom),
//   (get, set, update: ImageOutput[]) => {
//     set(imageStorageAtom, get(imageStorageAtom).concat(update));
//   }
// );
// export const imageProcessingAtom = atom(
//   (get) => get(imageOutputsAtom),
//   (get, set, update: ImageOutput[]) => {
//     set(imageProcessingAtom, get(imageProcessingAtom).concat(update));
//   }
// );

// Atom derived from hydrated imageDefaultsAtom that does not write back
// Atoms derived from imageInsertAtom that write to imageInsertAtom

export const imageInsertAtom = atom<ImageOutputInsert>({
  prompt: "",
  negative_prompt: "",
  model: "",
  pipeline: "",
  scheduler: "",
  width: 0,
  height: 0,
  cfg: 0,
  steps: 0,
  seed: 0,
  id: "",
  safety_checker: true,
  outputs_paths: [],
  batch_size: 0,
});

export const insertPrompt = atom(
  (get) => get(imageInsertAtom).prompt,
  (get, set, update: string) => {
    set(imageInsertAtom, { ...get(imageInsertAtom), prompt: update });
  }
);

export const insertNegativePrompt = atom(
  (get) => get(imageInsertAtom).negative_prompt,
  (get, set, update: string) => {
    set(imageInsertAtom, { ...get(imageInsertAtom), negative_prompt: update });
  }
);

export const insertModel = atom(
  (get) => get(imageInsertAtom).model,
  (get, set, update: string) => {
    set(imageInsertAtom, { ...get(imageInsertAtom), model: update });
  }
);

export const insertPipeline = atom(
  (get) => get(imageInsertAtom).pipeline,
  (get, set, update: string) => {
    set(imageInsertAtom, { ...get(imageInsertAtom), pipeline: update });
  }
);

export const insertScheduler = atom(
  (get) => get(imageInsertAtom).scheduler,
  (get, set, update: string) => {
    set(imageInsertAtom, { ...get(imageInsertAtom), scheduler: update });
  }
);

export const insertWidth = atom(
  (get) => get(imageInsertAtom).width,
  (get, set, update: number) => {
    set(imageInsertAtom, { ...get(imageInsertAtom), width: update });
  }
);

export const insertHeight = atom(
  (get) => get(imageInsertAtom).height,
  (get, set, update: number) => {
    set(imageInsertAtom, { ...get(imageInsertAtom), height: update });
  }
);

export const insertCfg = atom(
  (get) => get(imageInsertAtom).cfg,
  (get, set, update: number) => {
    set(imageInsertAtom, { ...get(imageInsertAtom), cfg: update });
  }
);

export const insertSteps = atom(
  (get) => get(imageInsertAtom).steps,
  (get, set, update: number) => {
    set(imageInsertAtom, { ...get(imageInsertAtom), steps: update });
  }
);

export const insertSeed = atom(
  (get) => get(imageInsertAtom).seed,
  (get, set, update: number) => {
    set(imageInsertAtom, { ...get(imageInsertAtom), seed: update });
  }
);

export const insertSafetyChecker = atom(
  (get) => get(imageInsertAtom).safety_checker,
  (get, set, update: boolean) => {
    set(imageInsertAtom, { ...get(imageInsertAtom), safety_checker: update });
  }
);

export const insertBatchSize = atom(
  (get) => get(imageInsertAtom).batch_size,
  (get, set, update: number) => {
    set(imageInsertAtom, { ...get(imageInsertAtom), batch_size: update });
  }
);
