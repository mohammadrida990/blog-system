import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import React from "react";
import { calculatePageNUmbers } from "@/lib/helpers";

type Props = {
  currentPage: number;
  totalPages: number;
  skippedPages?: number;
  setCurrentPage: (page: number) => void;
  className?: string;
};
const CommentPagination = ({
  currentPage,
  totalPages,
  skippedPages = 2,
  setCurrentPage,
  className,
}: Props) => {
  const pageNumbers = calculatePageNUmbers({
    currentPage,
    skippedPages,
    totalPages,
  });

  const handleClick = (page: number | string) => {
    if (typeof page === "number" && page > 0 && page <= totalPages)
      setCurrentPage(page);
  };

  return (
    <div className={className}>
      {currentPage !== 1 && (
        <Button
          onClick={() => handleClick(currentPage - 1)}
          className="
            rounded-md py-2 px-2 text-primary bg-background hover:bg-foreground  cursor-pointer
          "
        >
          <ChevronLeftIcon className="w-4" />
        </Button>
      )}

      {pageNumbers.map((page, index) => (
        <Button
          key={index}
          disabled={page === "..."}
          onClick={() => handleClick(page)}
          className={cn("px-3 py-1 rounded-md transition", {
            "bg-foreground text-primary hover:bg-foreground/50 cursor-pointer":
              currentPage !== page && page !== "...",
            "bg-transparent text-primary border-primary border-2 hover:bg-transparent":
              currentPage === page,
            "cursor-not-allowed text-black bg-transparent hover:bg-transparent":
              page === "...",
          })}
        >
          {page === "..." ? "..." : <span>{page}</span>}
        </Button>
      ))}

      {currentPage !== totalPages && (
        <Button
          onClick={() => handleClick(currentPage + 1)}
          className="
            rounded-md py-2 px-2 text-primary bg-background hover:bg-foreground cursor-pointer
          "
        >
          <ChevronRightIcon className="w-4" />
        </Button>
      )}
    </div>
  );
};

export default CommentPagination;
