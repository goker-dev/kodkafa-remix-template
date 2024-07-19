import { HTMLAttributes, ReactElement } from "react";
import { useSearchParamsAsObject } from "~/hooks";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: number;
  limit: number;
  setPage?: (page: number) => void;
  total: number;
  totalPage?: number;
  maxSiblings?: number;
  setParam?: (page: number) => void;
}

export default function Pagination({
  page,
  limit,
  total,
  className = "flex justify-center items-center space-x-2",
}: Props): ReactElement {
  const { replaceSearchParam } = useSearchParamsAsObject<{
    page: number;
    limit: number;
  }>();

  const setParam = (page = 1) => {
    replaceSearchParam({ page: String(page) });
  };

  const totalPages = Math.ceil(total / limit);
  const range = Math.min(totalPages, 9);
  const center = totalPages > range ? Math.ceil(range / 2) : range;
  const start =
    page > center
      ? page >= totalPages - center
        ? totalPages - range
        : page - center
      : 1;
  const end = totalPages > range ? start + range : start + range - 1;
  const currentPage = Math.min(Math.max(0, page), totalPages);

  // // console.log({ page });
  //
  // // const first = () => setOffset(0);
  // const previous = () => setOffset(page);
  // const next = () => setOffset(page + 2);
  // // const last = () => setOffset(totalPages - 1);
  //
  // const isPrevDisable = page <= start - 1;
  // const isNextDisable = page >= end - 1;

  const pageNumbers = () => {
    const pages = [];
    for (let i = start; i <= end; i++) {
      // const to = () => setOffset(i - 1);
      const isActive = i === page;
      pages.push(
        <button
          key={i}
          data-page={i}
          data-limit={limit}
          className={`w-10 h-10  
                    p-4 inline-flex items-center text-sm 
                    font-medium rounded-full
                    ${isActive && "bg-neutral-500 text-white"}
                    `}
          type="button"
          onClick={() => setParam(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <nav className={className}>
      <button
        className="text-gray-500 hover:text-neutral-600 p-4 inline-flex items-center gap-2 rounded-md"
        type="button"
        onClick={() => setParam(Math.max(1, currentPage - 1))}
        // disabled={isPrevDisable}
      >
        <span aria-hidden="true">«</span>
        <span className="sr-only">Previous</span>
      </button>
      {pageNumbers()}
      <button
        className="text-gray-500 hover:text-neutral-600 p-4 inline-flex items-center gap-2 rounded-md"
        type="button"
        onClick={() => setParam(Math.min(currentPage + 1, totalPages))}
        // disabled={isNextDisable}
      >
        <span className="sr-only">Next</span>
        <span aria-hidden="true">»</span>
      </button>
    </nav>
  );
}
