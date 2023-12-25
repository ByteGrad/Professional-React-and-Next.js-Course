import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useJobItemsContext } from "../contexts/JobItemsContextProvider";

export default function Pagination() {
  const { currentPage, totalNumberOfPages, handleChangePage } =
    useJobItemsContext();

  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction="previous"
          currentPage={currentPage}
          onChangePage={handleChangePage}
        />
      )}

      {currentPage < totalNumberOfPages && (
        <PaginationButton
          direction="next"
          currentPage={currentPage}
          onChangePage={handleChangePage}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: "previous" | "next";
  currentPage: number;
  onChangePage: (newPage: number) => void;
};

function PaginationButton({
  direction,
  currentPage,
  onChangePage,
}: PaginationButtonProps) {
  return (
    <button
      className={`pagination__button pagination__button--${direction}`}
      onClick={(e) => {
        direction === "previous"
          ? onChangePage(currentPage - 1)
          : onChangePage(currentPage + 1);
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
