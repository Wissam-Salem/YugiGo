import { useEffect, useRef, useState } from "react";
import Card from "../../components/Card/Card";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faChevronCircleUp,
  faChevronUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Home() {
  let [visibleCards, setVisibleCards] = useState(40);
  let [mobileMenuShown, setMobileMenuShown] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [cards, setCards] = useState([]);
  let mobileMenuRef = useRef(null);
  useEffect(() => {
    axios("https://db.ygoprodeck.com/api/v7/cardinfo.php").then((res) => {
      console.log(res.data);
      setIsLoading(false);
      setCards(res.data?.data);
    });
  }, []);
  let ShowMoreCards = () => {
    setVisibleCards((prevValue) => Math.min(prevValue + 40, cards.length));
  };
  return (
    <div className="w-full min-h-dvh flex flex-col justify-between items-center p-3">
      <header className="w-full flex justify-between items-center">
        <a className="flex justify-start items-center gap-2" href="/">
          <img className="size-16" src="/assets/yugigo.png" alt="" />
          <h1 className="text-2xl max-sm:text-xl">YugiGo</h1>
        </a>
        <div className="flex justify-center items-center gap-3 max-md:hidden">
          <div className="dropdown dropdown-hover dropdown-left dropdown-bottom mr-2">
            <div tabIndex={0} role="button" className="py-1">
              Monsters
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 z-[100] !rounded-md !-left-32 w-52 p-2 shadow"
            >
              <li className="text-gray-300">
                <a href="/search?type=normal%20monster">
                  <span className="!w-3 !h-3 rounded-full inline-block bg-yellow-500"></span>
                  Normal
                </a>
              </li>
              <li className="text-gray-300">
                <a href="/search?type=effect%20monster">
                  <span className="!w-3 !h-3 rounded-full inline-block bg-orange-500"></span>
                  Effect
                </a>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-hover dropdown-left dropdown-bottom mr-2">
            <div tabIndex={0} role="button" className="py-1">
              Spells & Traps
            </div>
            <div
              tabIndex={0}
              className="dropdown-content menu bg-base-100 z-[100] !rounded-md !-left-24 w-52 p-2 shadow"
            >
              <h1 className="p-[.5rem] flex justify-start gap-2 items-center text-white">
                <span className="!w-3 !h-3 rounded-full inline-block bg-teal-500"></span>
                Spells
              </h1>
              <li className="px-4 text-[.830rem] text-gray-300">
                <a href="/search?race=normal&type=spell%20card">Normal</a>
              </li>
              <li className="px-4 text-[.830rem] text-gray-300">
                <a href="/search?race=continuous&type=spell%20card">
                  Continuous
                </a>
              </li>
              <li className="px-4 text-[.830rem] text-gray-300">
                <a href="/search?race=equip&type=spell%20card">Equip</a>
              </li>
              <li className="px-4 text-[.830rem] text-gray-300">
                <a href="/search?race=field&type=spell%20card">Field</a>
              </li>
              <li className="px-4 text-[.830rem] text-gray-300">
                <a href="/search?race=quick-play&type=spell%20card">
                  Quick-play
                </a>
              </li>
              <li className="px-4 text-[.830rem] text-gray-300">
                <a href="/search?race=ritual&type=spell%20card">Ritual</a>
              </li>
              <h1 className="p-[.5rem] flex justify-start gap-2 items-center text-white">
                <span className="!w-3 !h-3 rounded-full inline-block bg-pink-500"></span>
                Traps
              </h1>
              <li className="px-4 text-[.830rem] text-gray-300">
                <a href="/search?race=normal&type=trap%20card">Normal</a>
              </li>
              <li className="px-4 text-[.830rem] text-gray-300">
                <a href="/search?race=continuous&type=trap%20card">
                  Continuous
                </a>
              </li>
              <li className="px-4 text-[.830rem] text-gray-300">
                <a href="/search?race=counter&type=trap%20card">Counter</a>
              </li>
            </div>
          </div>
          <div className="dropdown dropdown-hover dropdown-left dropdown-bottom mr-2">
            <div tabIndex={0} role="button" className="py-1">
              Characters
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 z-[100] !rounded-md !-left-28 w-52 p-2 shadow"
            >
              <h1 className="text-gray-400">Coming Soon</h1>
            </ul>
          </div>
        </div>
        <div className="hidden max-md:flex justify-end items-center">
          <button
            onClick={() => {
              setMobileMenuShown(!mobileMenuShown);
              if (mobileMenuShown) {
                mobileMenuRef?.current?.classList.remove("slide-in-top");
              } else {
                mobileMenuRef?.current?.classList.add("slide-in-top");
              }
            }}
            className="w-5 h-5 p-5 rounded-lg flex justify-center items-center transition-all bg-zinc-800 hover:bg-zinc-900"
          >
            <FontAwesomeIcon
              className={`${
                mobileMenuShown ? "rotate-60" : "-rotate-180"
              } transition-all`}
              icon={faChevronUp}
              size="lg"
            />
          </button>
        </div>
      </header>
      <main className="relative w-full flex-grow flex justify-center items-start flex-wrap gap-2 py-5">
        <div
          ref={mobileMenuRef}
          className="absolute top-2 w-full h-fit z-[500] hidden rounded-t-sm rounded-b-md bg-base-100 md:!hidden"
        >
          <ul className="flex menu">
            <h1 className="p-[.5rem] px-[.3rem] w-fit flex justify-start gap-2 items-center text-white">
              <span className="!w-3 !h-3 rounded-full inline-block bg-amber-500"></span>
              Monsters
            </h1>
            <li className="px-4 text-[.830rem] text-gray-300">
              <a href="/search?type=normal%20monster">Normal</a>
            </li>
            <li className="px-4 text-[.830rem] text-gray-300">
              <a href="/search?type=effect%20monster">Effect</a>
            </li>
            <h1 className="p-[.5rem] px-[.3rem] w-fit flex justify-start gap-2 items-center text-white">
              <span className="!w-3 !h-3 rounded-full inline-block bg-teal-500"></span>
              Spells
            </h1>
            <li className="px-4 text-[.830rem] text-gray-300">
              <a href="/search?race=normal&type=spell%20card">Normal</a>
            </li>
            <li className="px-4 text-[.830rem] text-gray-300">
              <a href="/search?race=continuous&type=spell%20card">Continuous</a>
            </li>
            <li className="px-4 text-[.830rem] text-gray-300">
              <a href="/search?race=equip&type=spell%20card">Equip</a>
            </li>
            <li className="px-4 text-[.830rem] text-gray-300">
              <a href="/search?race=field&type=spell%20card">Field</a>
            </li>
            <li className="px-4 text-[.830rem] text-gray-300">
              <a href="/search?race=quick-play&type=spell%20card">Quick-Play</a>
            </li>
            <li className="px-4 text-[.830rem] text-gray-300">
              <a href="/search?race=ritual&type=spell%20card">Ritual</a>
            </li>
            <h1 className="p-[.5rem] px-[.3rem] flex justify-start gap-2 items-center text-white">
              <span className="!w-3 !h-3 rounded-full inline-block bg-pink-500"></span>
              Traps
            </h1>
            <li className="px-4 text-[.830rem] text-gray-300">
              <a href="/search?race=normal&type=spell%20card">Normal</a>
            </li>
            <li className="px-4 text-[.830rem] text-gray-300">
              <a href="/search?race=continuous&type=spell%20card">Continuous</a>
            </li>
            <li className="px-4 text-[.830rem] text-gray-300">
              <a href="/search?race=counter&type=spell%20card">Counter</a>
            </li>
          </ul>
        </div>
        {cards?.slice(0, visibleCards)?.map((card) => {
          return (
            <Card
              key={card?.id}
              cardId={card?.id}
              cardDesc={card?.desc}
              cardImg={card?.card_images[0]?.image_url}
            />
          );
        })}
      </main>
      {visibleCards < cards?.length && (
        <footer className="w-full">
          <div className="join !w-full flex justify-center">
            <button
              onClick={() => {
                ShowMoreCards();
              }}
              className="p-2 bg-red-600 hover:bg-red-700 w-[20rem] rounded-md active:scale-95 transition-all text-white text-center flex justify-center items-center gap-2"
            >
              <p>Load more</p>
              <FontAwesomeIcon icon={faChevronCircleDown} color="#eee" />
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
