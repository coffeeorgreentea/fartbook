type Props = {
  fetchNext: () => void;
  fetchPrevious: () => void;
  selected: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
};

const ImagePagination = ({
  fetchNext,
  fetchPrevious,
  selected,
  hasNextPage,
  hasPreviousPage,
}: Props) => {
  return (
    <div className="pt-4 mx-auto border-l-0 rounded-sm btn-group">
      <button
        onClick={fetchPrevious}
        disabled={selected === 0}
        className="border-purple-400 rounded-sm btn disabled:border-purple-400 disabled:text-gray-400"
      >
        «
      </button>
      <button className="border-purple-400 rounded-sm pointer-events-none btn">
        Page {selected + 1}
      </button>
      <button onClick={fetchNext} className="border-purple-400 rounded-sm btn">
        »
      </button>
    </div>
  );
};

export default ImagePagination;
