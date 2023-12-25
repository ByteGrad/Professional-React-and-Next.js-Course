import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
  useCallback,
} from "react";
import { JobItem, JobItemId } from "../lib/types";
import { useJobItems } from "../lib/hooks";

type BookmarksProviderProps = {
  children: React.ReactNode;
};

type BookmarksContext = {
  bookmarkedJobItems: JobItem[];
  bookmarkedJobItemIds: JobItemId[];
  isLoading: boolean;
  handleToggleBookmark: (jobItem: JobItemId) => void;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);

export default function BookmarksContextProvider({
  children,
}: BookmarksProviderProps) {
  // state
  const [bookmarkedJobItemIds, setBookmarkedJobItemIds] = useState<JobItemId[]>(
    () => JSON.parse(localStorage.getItem("bookmarkedJobItemIds") || "[]")
  );
  const { jobItems: bookmarkedJobItems, isLoading } =
    useJobItems(bookmarkedJobItemIds);

  // event handlers / actions
  const handleToggleBookmark = useCallback((jobItemId: JobItemId) => {
    setBookmarkedJobItemIds((prevBookmarkedJobItemIds) => {
      if (prevBookmarkedJobItemIds.includes(jobItemId)) {
        return prevBookmarkedJobItemIds.filter((id) => id !== jobItemId);
      } else {
        return [...prevBookmarkedJobItemIds, jobItemId];
      }
    });
  }, []);

  // side effects
  useEffect(() => {
    localStorage.setItem(
      "bookmarkedJobItemIds",
      JSON.stringify(bookmarkedJobItemIds)
    );
  }, [bookmarkedJobItemIds]);

  // context value
  const contextValue = useMemo(
    () => ({
      bookmarkedJobItems,
      bookmarkedJobItemIds,
      isLoading,
      handleToggleBookmark,
    }),
    [bookmarkedJobItems, bookmarkedJobItemIds, isLoading, handleToggleBookmark]
  );

  return (
    <BookmarksContext.Provider value={contextValue}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("BookmarksContext must be used within a BookmarksProvider");
  }
  return context;
}
