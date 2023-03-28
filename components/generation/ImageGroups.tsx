import Image from "next/image";
import clsx from "clsx";
import Transition from "../motion/Transition";
import { fade } from "@/constants/transitions";

// types
import { ImageOutputWithSignedUrls } from "@/types/index";
import { SelectedImage } from "@/atoms/image";

type Props = {
  images: ImageOutputWithSignedUrls[] | undefined;
  selected: SelectedImage;
  setSelected: React.Dispatch<React.SetStateAction<SelectedImage>>;
};

// convert timestamptz to minutes or hours or days ago
const timeAgo = (date: string) => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + (interval === 1 ? " year" : " years");
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + (interval === 1 ? " month" : " months");
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + (interval === 1 ? " day" : " days");
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + (interval === 1 ? " hour" : " hours");
  }

  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + (interval === 1 ? " min" : " mins");
  }

  return Math.floor(seconds) + " seconds";
};

const ImageGroups = ({ images, selected, setSelected }: Props) => {
  return (
    <div className="flex flex-col p-2 mx-auto rounded-sm conic from-purple-900/40 via-indigo-900/40 to-zinc-900/40">
      <div className="grid max-w-full grid-cols-4 grid-rows-2 gap-4 overflow-hidden sm:grid-cols-5 sm:grid-rows-2 lg:grid-cols-10 lg:grid-rows-1">
        {images &&
          images.map((img, index) => (
            <Transition
              variants={fade}
              className="flex flex-col items-center group"
              key={`${img.signed_urls[0].og}-group-${index}`}
              name={`${img.signed_urls[0].og}-group-${index}`}
            >
              <button
                className="relative flex-col w-16 h-16 p-0 m-0 btn btn-ghost group-hover:border-transparent"
                // needs a fix for pagination
                onClick={() =>
                  setSelected({
                    ...selected,
                    source: "history",
                    generation: index,
                    image: 0,
                  })
                }
              >
                <Image
                  className={clsx(
                    selected.generation !== index
                      ? "opacity-50"
                      : "opacity-100",
                    "object-cover mask mask-hexagon-2 hover:opacity-100 transition-500"
                  )}
                  src={img.signed_urls[0].xs || img.signed_urls[0].og}
                  alt="thumb"
                  fill={true}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM80PKnHgAHDQLB9rFJWgAAAABJRU5ErkJggg=="
                  unoptimized={true}
                />
              </button>
              <span className="text-xs text-center truncate">
                {`${timeAgo(img.created_at as string)} ago`}
              </span>
            </Transition>
          ))}
      </div>
    </div>
  );
};

export default ImageGroups;
