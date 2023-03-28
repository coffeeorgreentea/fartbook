import React, { useState } from "react";
import clsx from "clsx";

type HeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

type tab = {
  label: string;
  Icon: HeroIcon;
};
type Props = {
  Icon: HeroIcon;
  tabs?: tab[];
  title: string;
};

const DropPopMenu = ({ Icon, tabs, title }: Props) => {
  const [tabindex, setTabIndex] = useState(0);
  return (
    <div className="dropdown dropdown-top group">
      <label
        tabIndex={tabindex}
        className="m-1 border-purple-700 btn btn-circle bg-zinc-900 group-hover:bg-zinc-800 group-hover:border-indigo-700 colors-300"
      >
        <Icon
          className="w-5 h-5 text-white group-hover:text-purple-700 colors-300"
          aria-hidden="true"
        />
      </label>
      <ul
        tabIndex={0}
        className="w-64 p-2 bg-black border border-purple-700 rounded-sm shadow dropdown-content menu"
      >
        <li className="pt-4 pl-4 menu-title menu-item">{title}</li>
        {tabs?.map((tab, index) => (
          <li
            key={index}
            className="p-4 menu-item"
            onClick={() => setTabIndex(index)}
          >
            <button className="inline-flex justify-start w-full h-full btn btn-ghost btn-sm rounded-box">
              <tab.Icon
                className="w-5 h-5 text-purple-500 "
                aria-hidden="true"
              />
              <span className="ml-2">{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropPopMenu;
