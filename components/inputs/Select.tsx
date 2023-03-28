import clsx from "clsx";

type Props = {
  label: string;
  options: string[];
  value: string | number;
  tooltip?: string;
  right?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ label, options, value, tooltip, right, onChange }: Props) => {
  return (
    <div
      className={clsx(tooltip && "tooltip", "form-control w-full mx-auto")}
      data-tip={tooltip}
    >
      <label className="text-white input-group">
        <span className="w-24 input-label-colors">{label}</span>
        <select
          onChange={onChange}
          defaultValue={value}
          className="w-56 border-purple-400 select focus:border-indigo-500 focus:ring-0 bg-zinc-900 grow-1"
        >
          {options.map((option) => (
            <option className="" key={option}>
              {option}
            </option>
          ))}
        </select>

        {right && <span className="w-12">{right}</span>}
      </label>
    </div>
  );
};

export default Select;
