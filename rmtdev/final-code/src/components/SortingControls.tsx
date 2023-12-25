import { useJobItemsContext } from "../contexts/JobItemsContextProvider";

export default function Sorting() {
  const { sortBy, handleChangeSort } = useJobItemsContext();

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        className={`sorting__button sorting__button--relevant ${
          sortBy === "relevant" ? "sorting__button--active" : ""
        }`}
        onClick={(e) => {
          e.currentTarget.blur();
          handleChangeSort("relevant");
        }}
      >
        Relevant
      </button>

      <button
        className={`sorting__button sorting__button--recent ${
          sortBy === "recent" ? "sorting__button--active" : ""
        }`}
        onClick={(e) => {
          e.currentTarget.blur();
          handleChangeSort("recent");
        }}
      >
        Recent
      </button>
    </section>
  );
}
