import Link from "next/link";
import clsx from "clsx";

type Props = {
  as: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
};

const HyperButton = (props: Props) => {
  const { as, href, onClick, className, children } = props;

  if (as == "link" && href) {
    return (
      <Link
        href={href}
        className="btn btn-ghost bg-black bg-opacity-20 hover:bg-opacity-10 backdrop-saturate-200 transition-all ease-linear duration-500 transform hover:-translate-y-1"
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className={clsx(
          "btn btn-ghost bg-black bg-opacity-20 hover:bg-opacity-10 backdrop-saturate-200 transition-all ease-linear duration-500 transform hover:-translate-y-1",
          className
        )}
      >
        {children}
      </button>
    );
  }
};

export default HyperButton;
