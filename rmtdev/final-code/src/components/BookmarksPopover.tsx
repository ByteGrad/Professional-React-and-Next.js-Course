// use portal so that the bookmarks list is not affected by the z-index of the header
import { createPortal } from "react-dom";
import JobListBookmarks from "./JobList/JobListBookmarks";
import { forwardRef } from "react";

const BookmarksPopover = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function (_, ref) {
  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobListBookmarks />
    </div>,
    document.body
  );
});

export default BookmarksPopover;
