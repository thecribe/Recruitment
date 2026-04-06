import React, { useEffect, useState } from "react";

const Pagination = ({
  arrayLength,
  toShow,
  currentPageHandler,
}: {
  arrayLength: number | null;
  toShow?: number;
  currentPageHandler: (e: number) => void;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil((arrayLength || 0) / (toShow || 10));
  const visiblePages = 3;

  const getPageRange = () => {
    let start = Math.max(currentPage - 1, 1);
    let end = Math.min(start + visiblePages - 1, totalPages);

    if (end - start < visiblePages - 1) {
      start = Math.max(end - visiblePages + 1, 1);
    }

    return { start, end };
  };

  const { start, end } = getPageRange();

  useEffect(() => {
    currentPageHandler(currentPage);
  }, [currentPage]);

  return (
    <div className="p-4 flex justify-center items-center text-gray-500 gap-10">
      {/* Prev */}
      <button
        disabled={currentPage <= 1}
        className={`py-1 px-3 rounded-md bg-slate-200 text-sm font-semibold ${
          currentPage <= 1
            ? "disabled:opacity-50 disabled:cursor-not-allowed"
            : "cursor-pointer"
        }`}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      >
        Prev
      </button>

      {/* Pages */}
      <div className="flex gap-2 items-center text-sm">
        {/* First page */}
        {start > 1 && (
          <>
            <button
              onClick={() => setCurrentPage(1)}
              className="px-2 rounded-sm"
            >
              1
            </button>
            <span>...</span>
          </>
        )}

        {/* Visible range */}
        {[...Array(end - start + 1)].map((_, index) => {
          const page = start + index;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-2 rounded-sm ${
                currentPage === page ? "bg-blue-500/50" : ""
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Last page */}
        {end < totalPages && (
          <>
            <span>...</span>
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-2 rounded-sm"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Next */}
      <button
        disabled={currentPage >= totalPages}
        className={`py-1 px-3 rounded-md bg-slate-200 text-sm font-semibold ${
          currentPage >= totalPages
            ? "disabled:opacity-50 disabled:cursor-not-allowed"
            : "cursor-pointer"
        }`}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
