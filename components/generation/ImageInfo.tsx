import { SelectedImage } from "@/atoms/image";
import { ImageOutputWithSignedUrls } from "@/types/index";
import React from "react";

type Props = {
  data: ImageOutputWithSignedUrls;
  selected: SelectedImage;
};

const ImageInfo = ({ data, selected }: Props) => {
  return (
    <div className="flex flex-col w-full p-2 conic-layer">
      <h2 className="text-xl font-medium text-left line-clamp-1">
        Prompt:
        <span className="text-xl font-thin">{` ${data && data.prompt}`}</span>
      </h2>
      {data && (
        <div className="grid grid-cols-5 text-sm">
          <div className="flex flex-col w-full col-span-3 font-normal text-left">
            <span className="line-clamp-2">
              <strong>Negative Prompt:</strong>
              {` ${data && data.negative_prompt}`}
            </span>

            <span>
              <strong>Steps:</strong>
              {` ${data.steps}`}
            </span>
            <span>
              <strong>Cfg:</strong>
              {` ${data.cfg}`}
            </span>
            <span>
              <strong>Width:</strong>
              {` ${data.width}`}
            </span>
            <span>
              <strong>Height:</strong>
              {` ${data.height}`}
            </span>
          </div>
          <div className="flex flex-col w-full col-span-2 text-right">
            <span>
              <strong>Model:</strong>
              {` ${data.model}`}
            </span>
            <span>
              <strong>Pipeline:</strong>
              {` ${data.pipeline}`}
            </span>
            <span>
              <strong>Scheduler:</strong>
              {` ${data.scheduler}`}
            </span>
            <span>
              <strong>Seed:</strong>
              {` ${data.seed + selected.image}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageInfo;
