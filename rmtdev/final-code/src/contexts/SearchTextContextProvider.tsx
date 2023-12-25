import React, {
  useState,
  createContext,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { useDebounce } from "../lib/hooks";

type SearchTextProviderProps = {
  children: React.ReactNode;
};

type SearchTextContext = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearch: (newSearchText: string) => void;
};

export const SearchTextContext = createContext<SearchTextContext | null>(null);

export default function SearchTextContextProvider({
  children,
}: SearchTextProviderProps) {
  // state
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);

  // event handlers / actions
  const handleChangeSearch = useCallback(
    (newSearchText: string) => {
      setSearchText(newSearchText);
    },
    [setSearchText]
  );

  // context value
  const contextValue = useMemo(
    () => ({
      searchText,
      debouncedSearchText,
      handleChangeSearch,
    }),
    [searchText, debouncedSearchText, handleChangeSearch]
  );

  return (
    <SearchTextContext.Provider value={contextValue}>
      {children}
    </SearchTextContext.Provider>
  );
}

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);

  if (!context) {
    throw new Error(
      "SearchTextContext must be used within a SearchTextProvider"
    );
  }
  return context;
}
