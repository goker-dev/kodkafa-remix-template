import { Link } from "@remix-run/react";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { TagCloudDto } from "../../api";

const range = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl"];
const opacity = [60, 65, 70, 75, 85, 95, 0];

interface Props {
  className?: string;
  tags: TagCloudDto[];
}

const TagCloud: React.FC<Props> = ({ tags, className = "" }) => {
  const [min, ratio] = useMemo(() => {
    const max = Object.values(tags).reduce((a, b) => Math.max(a, b.usage), 0);
    const min = Object.values(tags).reduce((a, b) => Math.min(a, b.usage), 0);
    return [min, range.length / (max - min)];
  }, [tags]);

  const size = useCallback(
    (s: number) => ((ratio * (s - min)) >> 0) - 1,
    [ratio, min]
  );

  return (
    <div className="w-full flex items-center justify-center my-4 sm:my-0">
      <ul
        className={`flex flex-row flex-wrap content-center place-content-center items-center align-middle
      ${className}`}
      >
        {Object.entries(tags).map(([k, i]) => {
          const slug = String(k)
            .toLowerCase()
            .replace(" ", "-")
            .replace("/", "-");

          return (
            <li
              key={slug}
              // to={`/@goker/tags/${slug}`}
              className={`p-1 mx-1 hover:underline hover:text-gray-600 text-${
                range[size(i.usage)]
              } opacity-[.${opacity[size(i.usage)]}]`}
            >
              <Link to={`/@goker/tags/${i.name}`}>{i.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TagCloud;
