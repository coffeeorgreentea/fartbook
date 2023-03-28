import Image from "next/image";
import React from "react";
import Transition from "../motion/Transition";
import { fade } from "@/constants/transitions";
type MiniProfileProps = {
  username: string;
  avatar_url: string;
};
const MiniProfile = ({ username, avatar_url }: MiniProfileProps) => {
  return (
    <Transition
      variants={fade}
      name="welcome-profile"
      className="grid grid-cols-1 gap-2 sm:grid-cols-2"
    >
      <div className="relative w-full h-64 overflow-hidden sm:h-80 xl:w-auto">
        <Image
          className="object-center w-full rounded-t-sm"
          src="/img/depth/sketch_1.png"
          alt="profile-banner"
          fill
          unoptimized
        />
      </div>
      <div className="">
        <div className="flex justify-start px-5 mb-5 -mt-12 sm:mt-2">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-purple-700">
              <img src={avatar_url || "img/logo.png"} />
            </div>
          </div>
        </div>
        <div className="">
          <div className="mb-8 px-7">
            <h2 className="text-3xl font-bold text-purple-700">@{username}</h2>
            <p className="mt-2 text-gray-300">Stats</p>
            <div className="flex flex-wrap justify-center gap-2 mt-8 sm:gap-4">
              <button className="inline-flex items-center p-1 text-gray-400 sm:p-2 hover:text-gray-300">
                <svg
                  className="fill-current w-7 h-7"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button className="inline-flex items-center p-1 text-gray-400 sm:p-2 hover:text-gray-300">
                <svg
                  className="fill-current w-7 h-7"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default MiniProfile;
