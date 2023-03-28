import clsx from "clsx";

type Props = {
  label: string;
  value: boolean;
  on: string;
  off: string;
  tooltip?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BoolSwap = ({ label, value, on, off, tooltip, onChange }: Props) => {
  return (
    <div
      className={clsx(tooltip && "tooltip", "form-control w-full mx-auto")}
      data-tip={tooltip}
    >
      <label className="input-group">
        <span className="w-24 text-white input-label-colors">{label}</span>
        <label
          className={clsx(
            value ? "border-indigo-500" : "border-purple-400",
            "swap w-56 text-xl bg-black/50 border"
          )}
        >
          <input
            type="checkbox"
            className="hidden"
            defaultChecked={value}
            onChange={onChange}
          />

          <div className="swap-on">{on}</div>
          <div className="swap-off">{off}</div>
        </label>
      </label>
    </div>
  );
};

export default BoolSwap;
