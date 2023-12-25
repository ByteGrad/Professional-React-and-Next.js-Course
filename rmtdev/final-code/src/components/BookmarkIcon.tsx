import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { JobItemId } from "../lib/types";
import { useBookmarksContext } from "../contexts/BookmarksContextProvider";

type BookmarkIconProps = {
  jobItemId: JobItemId;
};

export default function BookmarkIcon({ jobItemId }: BookmarkIconProps) {
  const { bookmarkedJobItemIds, handleToggleBookmark } = useBookmarksContext();

  return (
    <button
      onClick={(e) => {
        handleToggleBookmark(jobItemId);
        e.stopPropagation();
        e.preventDefault();
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={`${
          bookmarkedJobItemIds.some((id) => id === jobItemId) ? "filled" : ""
        }`}
      />
    </button>
  );
}
