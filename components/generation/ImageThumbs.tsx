import clsx from "clsx";
import Image from "next/image";
import { SetStateAction } from "jotai/vanilla";
import { useRef } from "react";
import { SignedUrl } from "@/types/index";
import { SelectedImage } from "@/atoms/image";

type Props = {
  images: SignedUrl[];
  selected: SelectedImage;
  setSelected: React.Dispatch<SetStateAction<SelectedImage>>;
};

const ImageThumbs = ({ images, setSelected, selected }: Props) => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  return (
    <div className="flex flex-col w-full p-4 mx-auto conic from-purple-900/40 via-indigo-900/40 to-zinc-900/40">
      <div
        className="grid max-w-full grid-cols-2 gap-1 mx-auto overflow-hidden lg:mx-0 sm:grid-cols-5 lg:grid-cols-7 xl:grid-cols-7 2xl:grid-cols-10"
        ref={ref}
      >
        {images.length > 0 &&
          images.map((img, index) => (
            <button
              key={`${img.og}-thumb`}
              className={clsx(
                "relative h-24 w-24 btn btn-ghost m-0 p-0 hover:opacity-100 hover:border-transparent",
                selected.image !== index && "opacity-50",
                selected.source !== "history" && "opacity-50"
              )}
              onClick={() =>
                setSelected({ ...selected, source: "history", image: index })
              }
            >
              <Image
                className={clsx("object-cover mask mask-squircle")}
                src={img.xs || img.og}
                alt="thumb"
                fill={true}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM80PKnHgAHDQLB9rFJWgAAAABJRU5ErkJggg=="
                unoptimized={true}
              />
            </button>
          ))}
      </div>
    </div>
  );
};

export default ImageThumbs;
