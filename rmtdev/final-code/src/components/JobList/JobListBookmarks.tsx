import { useBookmarksContext } from "../../contexts/BookmarksContextProvider";
import JobList from "./JobList";

export default function JobListBookmarks() {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();

  return <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />;
}
