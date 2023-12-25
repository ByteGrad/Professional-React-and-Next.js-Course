import { SortBy } from "../lib/types";

export default function Sorting({
  currentSortBy,
  onSortChange,
}: {
  currentSortBy: SortBy;
  onSortChange: (sortBy: SortBy) => void;
}) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        className={`sorting__button sorting__button--relevant ${
          currentSortBy === "relevant" ? "sorting__button--active" : ""
        }`}
        onClick={(e) => {
          e.currentTarget.blur();
          onSortChange("relevant");
        }}
      >
        Relevant
      </button>

      <button
        className={`sorting__button sorting__button--recent ${
          currentSortBy === "recent" ? "sorting__button--active" : ""
        }`}
        onClick={(e) => {
          e.currentTarget.blur();
          onSortChange("recent");
        }}
      >
        Recent
      </button>
    </section>
  );
}
