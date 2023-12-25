import React, {
  useState,
  createContext,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { useJobItems, useSearchQuery } from "../lib/hooks";
import { JobItem, SortBy } from "../lib/types";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { useSearchTextContext } from "./SearchTextContextProvider";

type JobItemsProviderProps = {
  children: React.ReactNode;
};

type JobItemsContext = {
  jobItems: JobItem[];
  jobItemsSortedAndSliced: JobItem[];
  isLoading: boolean;
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  currentPage: number;
  handleChangePage: (newPage: number) => void;
  sortBy: SortBy;
  handleChangeSort: (newSortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: JobItemsProviderProps) {
  // dependency on other context
  const { debouncedSearchText } = useSearchTextContext();

  // state
  const [jobItems, isLoading] = useSearchQuery(debouncedSearchText);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");
  const [currentPage, setCurrentPage] = useState(1);

  // derived / computed state
  const totalNumberOfResults = jobItems.length || 0;
  const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);
  const jobItemsSorted = useMemo(() => {
    if (sortBy === "relevant") {
      return [...jobItems].sort((a, b) => {
        return b.relevanceScore - a.relevanceScore;
      });
    } else {
      return [...jobItems].sort((a, b) => {
        return a.daysAgo - b.daysAgo;
      });
    }
  }, [jobItems, sortBy]);
  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted?.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [jobItemsSorted, currentPage]
  );

  // event handlers / actions
  const handleChangeSort = useCallback((newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }, []);
  const handleChangePage = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  // context value
  const contextValue = useMemo(
    () => ({
      jobItems,
      jobItemsSortedAndSliced,
      isLoading: isLoading && debouncedSearchText.length > 0,
      totalNumberOfResults,
      totalNumberOfPages,
      currentPage,
      handleChangePage,
      sortBy,
      handleChangeSort,
    }),
    [
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      debouncedSearchText,
      totalNumberOfResults,
      totalNumberOfPages,
      currentPage,
      handleChangePage,
      sortBy,
      handleChangeSort,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);

  if (!context) {
    throw new Error(
      "JobItemsContext must be used within a JobItemsContextContextProvider"
    );
  }
  return context;
}
