import { calculatePageNUmbers } from "@/lib/helpers";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { cn } from "@/lib/utils";

const Pagination = ({
  currentPage,
  totalPages,
  skippedPages = 2,
  className,
}: {
  currentPage: number;
  totalPages: number;
  skippedPages?: number;
  className?: string;
}) => {
  const pageNumbers = calculatePageNUmbers({
    skippedPages,
    totalPages,
    currentPage,
  });
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {currentPage !== 1 && (
        <Button
          className="
        rounded-md py-2 px-2 text-primary bg-background hover:bg-foreground  cursor-pointer
      "
        >
          <Link href={`?page=${currentPage - 1}`}>
            <ChevronLeftIcon className="w-4" />
          </Link>
        </Button>
      )}

      {pageNumbers.map((page, index) => (
        <Button
          key={index}
          className={cn("px-3 py-1 rounded-md transition", {
            "bg-foreground text-primary hover:bg-foreground/50 cursor-pointer":
              currentPage !== page && page !== "...",
            "bg-transparent text-primary border-primary border-2 hover:bg-transparent":
              currentPage === page,
            "cursor-not-allowed text-black bg-transparent hover:bg-transparent":
              page === "...",
          })}
        >
          {page === "..." ? "..." : <Link href={`?page=${page}`}>{page}</Link>}
        </Button>
      ))}

      {currentPage !== totalPages && (
        <Button
          className="
        rounded-md py-2 px-2 text-primary bg-background hover:bg-foreground cursor-pointer
      "
        >
          <Link href={`?page=${currentPage + 1}`}>
            <ChevronRightIcon className="w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
};

export default Pagination;
