import { useState, useMemo } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import { useDebounce, useJobItems } from "../lib/hooks";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobList from "./JobList/JobList";
import Search from "./SearchForm";
import { Toaster } from "react-hot-toast";
import ResultsCount from "./ResultsCount";
import Sorting from "./SortingControls";
import Pagination from "./PaginationControls";
import JobItemContent from "./JobItemContent";
import Logo from "./Logo";
import Bookmarks from "./BookmarksButton";
import { RESULTS_PER_PAGE } from "../lib/constants";
import type { SortBy } from "../lib/types";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);
  const [allJobItems, isLoading] = useJobItems(debouncedSearchText);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");
  const [currentPage, setCurrentPage] = useState(1);

  const totalNumberOfResults = allJobItems.length || 0;
  const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);
  const sortedAllJobItems = useMemo(() => {
    if (sortBy === "relevant") {
      return [...allJobItems].sort((a, b) => {
        return b.relevanceScore - a.relevanceScore;
      });
    } else {
      return [...allJobItems].sort((a, b) => {
        return a.daysAgo - b.daysAgo;
      });
    }
  }, [allJobItems, sortBy]);
  const jobItems = useMemo(
    () =>
      sortedAllJobItems?.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [sortedAllJobItems, currentPage]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleSortChange = (newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <Bookmarks />
        </HeaderTop>

        <Search searchText={searchText} onSearchChange={handleSearchChange} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount count={allJobItems.length || 0} />
            <Sorting currentSortBy={sortBy} onSortChange={handleSortChange} />
          </SidebarTop>

          <JobList
            jobItems={jobItems}
            isLoading={isLoading && searchText.length > 0}
          />

          <Pagination
            currentPage={currentPage}
            totalNumberOfPages={totalNumberOfPages}
            onPageChange={handlePageChange}
          />
        </Sidebar>

        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
