import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationProps = {
  currentPage: number;
  totalNumberOfPages: number;
  onPageChange: (newPage: number) => void;
};

export default function Pagination({
  currentPage,
  totalNumberOfPages,
  onPageChange,
}: PaginationProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction="previous"
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}

      {currentPage < totalNumberOfPages && (
        <PaginationButton
          direction="next"
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = Omit<PaginationProps, "totalNumberOfPages"> & {
  direction: "previous" | "next";
};

function PaginationButton({
  direction,
  currentPage,
  onPageChange,
}: PaginationButtonProps) {
  return (
    <button
      className={`pagination__button pagination__button--${direction}`}
      onClick={(e) => {
        direction === "previous"
          ? onPageChange(currentPage - 1)
          : onPageChange(currentPage + 1);
        e.currentTarget.blur();
      }}
    >
      {direction === "previous" && (
        <>
          <ArrowLeftIcon />
          Page <span>{currentPage - 1}</span>
        </>
      )}
      {direction === "next" && (
        <>
          Page <span>{currentPage + 1}</span>
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
