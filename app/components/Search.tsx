import * as React from "react";
import { useCallback } from "react";
import { useNavigate } from "@remix-run/react";

interface Props {
  className?: string;
}

const Search: React.FC<Props> = ({ className = "" }) => {
  const navigate = useNavigate();
  // const [min, ratio] = useMemo(() => {
  //   const max = Object.values(tags).reduce((a, b) => Math.max(a, b), 0)
  //   const min = Object.values(tags).reduce((a, b) => Math.min(a, b), 0)
  //   return [min, range.length / (max - min)]
  // }, [tags])
  //

  const handleSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter")
        navigate({
          search: "?q=" + e.currentTarget.value,
        });
    },
    []
  );

  return (
    <div className={`flex flex-col items-center w-3/4 sm:w-1/2 ${className}`}>
      <input
        className="px-4 py-3 w-full rounded border shadow
        font-semibold text-lg
        "
        type="text"
        placeholder="search in posts ..."
        onKeyUp={handleSearch}
      />
    </div>
  );
};

export default Search;
