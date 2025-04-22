import { DEFAULT_PAGE_SIZE } from "./const";

export const transformSkipAndTake = ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  return {
    skip: ((page ?? 1) - 1) * (pageSize ?? DEFAULT_PAGE_SIZE),
    take: pageSize ?? DEFAULT_PAGE_SIZE,
  };
};

export const calculatePageNUmbers = ({
  currentPage, //5
  skippedPages,
  totalPages, //40
}: {
  currentPage: number;
  skippedPages: number;
  totalPages: number;
}) => {
  const totalNumbers = skippedPages * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - skippedPages);
    const endPage = Math.min(totalPages - 1, currentPage + skippedPages);

    let pages: (string | number)[] = Array.from(
      {
        length: endPage - startPage + 1,
      },
      (_, i) => startPage + i
    );

    if (startPage > 2) pages = ["...", ...pages];
    if (endPage < totalPages - 1) pages = [...pages, "..."];

    return [1, ...pages, totalPages];
  }

  return Array.from(
    {
      length: totalPages,
    },
    (_, i) => i + 1
  );
};
