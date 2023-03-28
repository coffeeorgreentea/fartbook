import clsx from "clsx";

type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  right?: boolean;
  children?: React.ReactNode;
  tooltip?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputNum = ({
  label,
  min,
  max,
  step,
  value,
  right,
  children,
  tooltip,
  onChange,
}: Props) => {
  return (
    <div
      className={clsx(tooltip && "tooltip", "form-control w-full mx-auto over")}
      data-tip={tooltip}
    >
      {right && (
        <label className="label">
          <span className="label-text"></span>
          <span className="label-text-alt">Random</span>
        </label>
      )}
      <label className="input-group">
        <span className="w-24 input-label-colors border-r-0 bg-black text-white">
          {label}
        </span>
        <input
          type="number"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          className={clsx(
            right ? "w-44" : "w-56",
            "input input-bordered input-colors"
          )}
        />
        {right && (
          <span className="w-12 bg-black text-white input-label-colors border-l-0">
            {children}
          </span>
        )}
      </label>
    </div>
  );
};

export default InputNum;
