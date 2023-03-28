import dynamic from "next/dynamic";
import {
  Cog6ToothIcon,
  PaintBrushIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import BasicButton from "../buttons/BasicButton";
import { toast } from "react-hot-toast";

import { InfiniteData } from "@tanstack/react-query";

// pintura
import {
  setPlugins,
  plugin_crop,
  plugin_finetune,
  plugin_filter,
  // plugin_annotate,
  getEditorDefaults,
  blobToFile,
} from "@pqina/pintura";

// @ts-ignore
import { pintura } from "@pqina/pintura/pintura.module.css";

// atoms
import { useAtom } from "jotai";
import { selectedAtom } from "@/atoms/image";
import { ImageOutputWithSignedUrls } from "@/types/index";

const PinturaEditorModal = dynamic(
  () => import("@pqina/react-pintura").then((mod) => mod.PinturaEditorModal),
  {
    ssr: false,
  }
);

setPlugins(plugin_crop, plugin_finetune, plugin_filter);

const editorDefaults = getEditorDefaults({
  // imageWriter: {
  //   targetSize: {
  //     width: 512,
  //     height: 512,
  //     fit: "contain",
  //   },
  // },
  imageReader: {
    preprocessImageFile: async (file: File) => {
      // If is not of type HEIC we skip the file
      const heic2any = require("heic2any");
      if (!/heic/.test(file.type)) return file;

      // Let's turn the HEIC image into JPEG so the browser can read it
      const blob = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.94,
      });

      // The editor expects a File so let's convert our Blob
      return blobToFile(blob as Blob, file.name);
    },
  },
});

type Props = {
  editOpen: boolean;
  setEditOpen: (value: boolean) => void;
  inpaintOpen: boolean;
  setInpaintOpen: (value: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  uploads: string[];
  setUploads: (value: string[]) => void;
  images: InfiniteData<ImageOutputWithSignedUrls[]>;
};

const ImageButtons = ({
  editOpen,
  setEditOpen,
  inpaintOpen,
  setInpaintOpen,
  menuOpen,
  setMenuOpen,
  setUploads,
  uploads,
  images,
}: Props) => {
  const [selected, setSelected] = useAtom(selectedAtom);

  const handleEditResult = (url: string) => {
    setUploads([...uploads, url]);
    setSelected({
      ...selected,
      source: "edits",
      image: uploads.length,
    });
    toast.success("Image edit processed.");

    setEditOpen(false);
  };

  const handleInpaintResult = (url: string) => {
    setUploads([...uploads, url]);
    setSelected({
      ...selected,
      source: "edits",
      image: uploads.length,
    });
    toast.success("Image inpaint processed.");

    setInpaintOpen(false);
  };

  const imageSrc = () => {
    if (selected["source"] === "history") {
      return images.pages[selected.page][selected.generation].signed_urls[
        selected.image
      ].og;
    } else if (selected["source"] === "edits") {
      return uploads[selected.image];
    } else if (selected["source"] === "current") {
      return "";
    }
  };
  return (
    <div className="z-30 inline-flex justify-end space-x-2 sm:top-4 sm:right-4 sm:absolute">
      {/* ACTION BUTTONS */}
      <BasicButton
        className="w-10"
        as="button"
        onClick={() => setEditOpen(true)}
      >
        <PencilIcon className="absolute object-contain w-6 h-6 group-hover:text-purple-400 colors-300" />
      </BasicButton>
      <BasicButton
        className="w-10"
        as="button"
        onClick={() => setInpaintOpen(true)}
      >
        <PaintBrushIcon className="absolute object-contain w-6 h-6 group-hover:text-purple-400 colors-300" />
      </BasicButton>
      <BasicButton
        className="w-10 lg:hidden"
        as="button"
        onClick={() => setMenuOpen(true)}
      >
        <Cog6ToothIcon className="absolute object-contain w-6 h-6 group-hover:text-purple-400 colors-300" />
      </BasicButton>
      {/* PINTURA EDITOR MODAL */}
      {editOpen && (
        <PinturaEditorModal
          {...editorDefaults}
          className={pintura}
          src={imageSrc()}
          onLoad={(res) => console.log("load modal image", res)}
          onHide={() => setEditOpen(false)}
          onProcess={({ dest }) => handleEditResult(URL.createObjectURL(dest))}
        />
      )}
      {/* PINTURA INPAINT MODAL */}
      {inpaintOpen && (
        <PinturaEditorModal
          {...editorDefaults}
          className={pintura}
          src={imageSrc()}
          onLoad={(res) => console.log("load modal image", res)}
          onHide={() => setInpaintOpen(false)}
          onProcess={({ dest }) =>
            handleInpaintResult(URL.createObjectURL(dest))
          }
        />
      )}
    </div>
  );
};

export default ImageButtons;
