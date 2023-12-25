import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Sidebar, { SidebarTop } from "./Sidebar";
import { Toaster } from "react-hot-toast";
import ResultsCount from "./ResultsCount";
import Sorting from "./SortingControls";
import Pagination from "./PaginationControls";
import JobItemContent from "./JobItemContent";
import Logo from "./Logo";
import Bookmarks from "./BookmarksButton";
import JobListSearch from "./JobList/JobListSearch";
import SearchForm from "./SearchForm";

function App() {
  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <Bookmarks />
        </HeaderTop>

        <SearchForm />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <Sorting />
          </SidebarTop>

          <JobListSearch />

          <Pagination />
        </Sidebar>

        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
