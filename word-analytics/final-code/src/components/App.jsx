import { useState } from "react";

import Stats from "./Stats";
import Textarea from "./Textarea";
import Footer from "./Footer";
import Main from "./Main";
import Header from "./Header";

function App() {
  const [stats, setStats] = useState({
    numberOfWords: 0,
    numberOfCharacters: 0,
    instagramCharactersLeft: 280,
    facebookCharactersLeft: 2200,
  });

  return (
    <>
      <Header />

      <Main>
        <Textarea setStats={setStats} />
        <Stats stats={stats} />
      </Main>

      <Footer />
    </>
  );
}

export default App;
