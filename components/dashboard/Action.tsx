import clsx from "clsx";
import { Action } from "@/constants/actions";
// import styles from "@/styles/Action.module.css";

const Action = ({
  action,
  setOpen,
  setModal,
}: {
  action: Action;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<Action>>;
}) => {
  return (
    <article
      onClick={() => {
        setModal(action);
        setOpen(true);
      }}
      key={action.name + "-card"}
      className={clsx(
        "card group  conic from-purple-900/40 via-indigo-900/40 to-zinc-900/40 shadow-none rounded-sm border-purple-700 border-opacity-50",
        action.border
      )}
    >
      <action.icon
        className={clsx(
          "absolute top-0 left-0 right-0 bottom-0 transition-all ease-in-out duration-500 text-opacity-50 group-hover:text-opacity-100 w-full z-0 h-4/6 mb-10 mt-5 mx-auto opacity-60",
          action.iconColor
        )}
      />
      <div className="z-10 card-body">
        <h2 className="px-12 mt-4 text-3xl font-medium text-center min-h-18">
          {action.name}
        </h2>
        <p className="p-4 m-4 text-lg leading-relaxed text-center">
          {action.description}
        </p>
      </div>
    </article>
  );
};

export default Action;
