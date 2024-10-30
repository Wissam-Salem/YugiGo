import React, { lazy, Suspense } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
let Home = lazy(() => import("./pages/Home/Home"));
import CardPage from "./pages/CardPage/CardPage";
import CharacterPage from "./pages/CharacterPage/CharacterPage";
import NotFound from "./pages/NotFound/NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          index
          element={
            <Suspense
              fallback={
                <div className="w-full h-dvh p-3 flex flex-col">
                  <header className="w-full flex justify-between items-center">
                    <a
                      className="flex justify-start items-center gap-2"
                      href="/"
                    >
                      <img
                        className="size-20 max-sm:size-16"
                        src="/assets/yugigo.png"
                        alt=""
                      />
                      <h1 className="text-2xl max-sm:text-xl">YugiGo</h1>
                    </a>
                    <div className="flex justify-center items-center gap-3 max-md:hidden">
                      <a>Monsters</a>
                      <a>Spells && Traps</a>
                      <a>Characters</a>
                    </div>
                    <div className="hidden max-md:flex justify-end items-center">
                      <button className="w-5 h-5 p-5 rounded-lg flex justify-center items-center transition-all bg-zinc-800 hover:bg-zinc-900">
                        <FontAwesomeIcon icon={faChevronDown} size="lg" />
                      </button>
                    </div>
                  </header>
                  <main className="flex-grow w-full flex justify-center items-center">
                    <img
                      className="animate-ping size-12"
                      src="/assets/loading.png"
                      alt=""
                    />
                  </main>
                </div>
              }
            >
              <Home />
            </Suspense>
          }
        />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/cards/:cardId" element={<CardPage />} />
        <Route path="/characters/:characterId" element={<CharacterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
