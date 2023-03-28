import Image from "next/image";
import clsx from "clsx";
import { SelectedImage } from "@/atoms/image";

type Props = {
  image: string;
  set: () => void;
  index: number;
  selected: SelectedImage;
};

const ImageUploadEdits = ({ image, set, index, selected }: Props) => {
  return (
    <button
      key={`${image}-upload/edit`}
      className={clsx(
        index === selected.image && selected.source === "edits"
          ? "opacity-100"
          : "opacity-50",
        "relative h-24 w-24 btn btn-ghost m-0 p-0 hover:opacity-100 hover:border-transparent"
      )}
      onClick={set}
    >
      <Image
        className={clsx("object-cover mask mask-squircle")}
        src={image}
        alt="thumb"
        fill={true}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM80PKnHgAHDQLB9rFJWgAAAABJRU5ErkJggg=="
        unoptimized={true}
      />
    </button>
  );
};

export default ImageUploadEdits;
