import Link from "next/link";
import clsx from "clsx";
import { MouseEventHandler } from "react";

type Props = {
  children: React.ReactNode;
  as: "button" | "link";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
  className?: string;
  hover?: boolean;
  loading?: boolean;
};

const baseClasses =
  // "duration-300 ease-in-out bg-black hover:bg-black/50 border border-indigo-400 rounded-sm btn btn-ghost hover:border-purple-500";
  "bg-indigo-500 rounded-xl btn btn-ghost";

const BasicButton = ({
  children,
  as,
  onClick,
  href,
  className,
  hover,
  loading,
}: Props) => {
  if (as === "button" && onClick) {
    return (
      <button
        className={clsx(
          loading && "loading",
          hover && "transform hover:-translate-y-1",
          className,
          baseClasses,
          "group pointer-events-auto before:text-purple-500"
        )}
        onClick={onClick}
      >
        {children}
      </button>
    );
  } else if (as === "link" && href) {
    return (
      <Link
        href={href}
        className={clsx(
          loading && "loading",
          hover && "transform hover:-translate-y-1 before:text-purple-500",
          className,
          baseClasses,
          "group pointer-events-auto"
        )}
      >
        {children}
      </Link>
    );
  } else {
    return null;
  }
};

export default BasicButton;
