import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SeachPage.css";
import axios from "axios";
import Card from "../../components/Card/Card";
import { Helmet } from "react-helmet";

export default function SearchPage() {
  let url = useLocation();
  let mobileMenuRef = useRef(null);
  let [mobileMenuShown, setMobileMenuShown] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [openedSelect, setOpenedSelect] = useState(null);
  let [options, setOptions] = useState({
    name: "",
    race: undefined,
    type: undefined,
    lvl: undefined,
  });
  let [cards, setCards] = useState([]);
  let races = [
    "Aqua",
    "Beast",
    "Beast-Warrior",
    "Cyberse",
    "Dinosaur",
    "Divine-Beast",
    "Dragon",
    "Fairy",
    "Fiend",
    "Fish",
    "Insect",
    "Machine",
    "Plant",
    "Psychic",
    "Pyro",
    "Reptile",
    "Rock",
    "Sea Serpent",
    "Spellcaster",
    "Thunder",
    "Warrior",
    "Winged Beast",
    "Wyrm",
    "Zombie",
    "Normal",
    "Field",
    "Equip",
    "Continuous",
    "Quick-play",
    "Ritual",
    "Counter",
  ];
  let types = [
    "Effect Monster",
    "Flip Effect Monster",
    "Flip Tuner Effect Monster",
    "Gemini Monster",
    "Normal Monster",
    "Normal Tuner Monster",
    "Pendulum Effect Monster",
    "Pendulum Effect Ritual Monster",
    "Pendulum Flip Effect Monster",
    "Pendulum Normal Monster",
    "Pendulum Tuner Effect Monster",
    "Ritual Effect Monster",
    "Ritual Monster",
    "Spell card",
    "Spirit Monster",
    "Toon Monster",
    "Trap card",
    "Tuner Monster",
    "Union Effect Monster",
    "Fusion Monster",
    "Link Monster",
    "Pendulum Effect Fusion Monster",
    "Synchro Monster",
    "Synchro Pendulum Effect Monster",
    "Synchro Tuner Monster",
    "XYZ Monster",
    "XYZ Pendulum Effect Monster",
    "Skill card",
    "Token",
  ];
  let fetchSearch = () => {
    if (options.lvl || options.name !== "" || options.race || options.type) {
      axios(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?${
          options.type ? `type=${options.type}` : ""
        }${options.race ? `&race=${options.race}` : ""}
        ${options.lvl ? `&level=${options.lvl}` : ""}
        ${options.name ? `&fname=${options.name}` : ""}`
      )
        .then((res) => {
          console.log(res?.data?.data);
          setCards(res?.data?.data);
          setIsLoading(false);
        })
        .catch(() => {
          setCards([]);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };
  let theRace = url?.search.includes("race")
    ? (
        url?.search
          ?.slice(1, url?.search?.length)
          ?.split("&")
          [url?.search.includes("type") ? 0 : 1]?.split("=")[1][0]
          ?.toUpperCase() +
        url?.search
          ?.slice(1, url?.search?.length)
          ?.split("&")
          [url?.search.includes("type") ? 0 : 1]?.split("=")[1]
          ?.slice(1)
      )?.replace("%20", " ")
    : undefined;

  let theType = url?.search.includes("type")
    ? (
        url?.search
          ?.slice(1, url?.search?.length)
          ?.split("&")
          [url?.search.includes("race") ? 1 : 0]?.split("=")[1][0]
          ?.toUpperCase() +
        url?.search
          ?.slice(1, url?.search?.length)
          ?.split("&")
          [url?.search.includes("race") ? 1 : 0]?.split("=")[1]
          ?.slice(1)
      )?.replace("%20", " ")
    : undefined;

  useEffect(() => {
    if (url?.search !== undefined && url?.search !== "") {
      setIsLoading(true);
      setOptions({
        ...options,
        type: theType,
        race: theRace,
      });
      axios(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?${
          theType ? `type=${theType}` : ""
        }${theRace ? `&race=${theRace}` : ""}`
      ).then((res) => {
        console.log(res?.data?.data);
        setCards(res?.data?.data);
        setIsLoading(false);
      });
      console.log(options);
    }
  }, []);
  return (
    <div className="p-3 min-h-dvh flex flex-col justify-start items-center">
      <Helmet>
        <title>Search for cards</title>
      </Helmet>
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
      <main
        className={`relative w-full ${
          (cards?.length === 0 || isLoading) && "flex-grow"
        } flex justify-center items-start flex-wrap gap-2 py-5`}
      >
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
        <div className="flex flex-col justify-start items-center gap-3 w-full">
          <div className="select-group flex justify-center items-center gap-3 w-full">
            <div
              onClick={() => {
                setOpenedSelect(openedSelect === "race" ? null : "race");
              }}
              className="select-wrapper cursor-pointer w-1/3 relative flex justify-start items-center  bg-zinc-900 rounded-sm ring-2 text-sm py-1 ring-red-500"
            >
              <div className="flex justify-center items-center gap-2 px-2">
                <h1 className="whitespace-nowrap text-ellipsis overflow-hidden max-sm:max-w-[3rem] w-fit">
                  {!options.race ? "Race" : options.race}
                </h1>
                <FontAwesomeIcon icon={faChevronDown} size="sm" />
              </div>
              {openedSelect === "race" && (
                <ul className="absolute top-9 left-0 select-body w-full max-h-52 custom-scroll overflow-y-auto z-[200] rounded-md p-2 bg-zinc-800">
                  {races?.map((race) => {
                    return (
                      <li
                        onClick={() => {
                          console.log(race);
                          setOptions({ ...options, race: race });
                        }}
                        key={race}
                        className="w-full"
                      >
                        <button className="w-full h-full flex justify-start items-center text-start p-2 hover:bg-red-500 rounded-md transition-all">
                          {race}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div
              onClick={() => {
                setOpenedSelect(openedSelect === "type" ? null : "type");
              }}
              className="select-wrapper cursor-pointer w-1/3 relative flex justify-start items-center custom-scroll bg-zinc-900 rounded-sm ring-2 text-sm py-1 ring-red-500"
            >
              <div className="flex justify-center items-center gap-2 px-2">
                <h1 className="whitespace-nowrap text-ellipsis overflow-hidden max-md:max-w-[3rem] w-fit">
                  {!options.type ? "Type" : options.type}
                </h1>
                <FontAwesomeIcon icon={faChevronDown} size="sm" />
              </div>
              {openedSelect === "type" && (
                <ul className="absolute top-9 left-0 select-body w-full max-h-52 overflow-y-auto z-[200] rounded-md p-2 bg-zinc-800">
                  {types?.map((type) => {
                    return (
                      <li
                        onClick={() => {
                          console.log(type);
                          setOptions({ ...options, type: type });
                        }}
                        key={type}
                        className="w-full"
                      >
                        <button className="w-full h-full flex justify-start items-center text-start p-2 hover:bg-red-500 rounded-md transition-all">
                          {type}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            {["Trap Card", "Spell Card"].includes(options?.type) ||
            [
              "Field",
              "Continuous",
              "Quick-Play",
              "Equip",
              "Ritual",
              "Counter",
            ].includes(options?.race) ? (
              <div className="select-wrapper cursor-not-allowed w-1/3 relative flex justify-start items-center custom-scroll bg-zinc-900 rounded-sm ring-2 text-sm py-1 ring-zinc-800">
                <div className="flex justify-center items-center gap-2 px-2">
                  <h1 className="whitespace-nowrap text-ellipsis overflow-hidden max-md:max-w-[3rem] w-fit text-gray-700">
                    {!options.lvl ? "Level" : options.lvl}
                  </h1>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="sm"
                    color="#374151"
                  />
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  setOpenedSelect(openedSelect === "lvl" ? null : "lvl");
                }}
                className="select-wrapper cursor-pointer w-1/3 relative flex justify-start items-center custom-scroll bg-zinc-900 rounded-sm ring-2 text-sm py-1 ring-red-500"
              >
                <div className="flex justify-center items-center gap-2 px-2">
                  <h1 className="whitespace-nowrap text-ellipsis overflow-hidden max-md:max-w-[3rem] w-fit">
                    {!options.lvl ? "Level" : options.lvl}
                  </h1>
                  <FontAwesomeIcon icon={faChevronDown} size="sm" />
                </div>
                {openedSelect === "lvl" && (
                  <ul className="absolute top-9 left-0 select-body w-full select-last-body max-h-52 overflow-y-auto z-[200] rounded-md p-2 bg-zinc-800">
                    {[...Array(12)]?.map((_, lvl) => {
                      return (
                        <li
                          onClick={() => {
                            setOptions({ ...options, lvl: lvl + 1 });
                            console.log(options.lvl);
                          }}
                          key={lvl + 1}
                          className="w-full"
                        >
                          <button className="w-full h-full flex justify-start items-center text-start p-2 hover:bg-red-500 rounded-md transition-all">
                            Level {lvl + 1}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-center items-center h-fit w-full">
            <input
              className="w-[80%] bg-[#191e24] focus:outline-none rounded-l-lg px-2 h-10 text-sm"
              type="text"
              value={options.name}
              onChange={(e) => setOptions({ ...options, name: e.target.value })}
              placeholder="Enter Card's Name"
            />
            <button
              onClick={() => {
                setIsLoading(true);
                fetchSearch();
              }}
              className="flex-grow rounded-r-lg h-10 text-sm bg-red-600 hover:bg-red-700 transition-all"
            >
              Search
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className="w-full flex-grow flex justify-center items-center">
            <img
              className="size-10 animate-ping"
              src="/assets/loading.png"
              alt=""
            />
          </div>
        ) : cards?.length === 0 ? (
          <div className="w-full h-full flex-grow flex justify-center items-center gap-2">
            <img
              className="size-8"
              src="https://img.icons8.com/?size=100&id=70077&format=png&color=6b7280"
              alt=""
            />
            <h1 className="text-gray-500">No matched cards</h1>
          </div>
        ) : (
          <div className="w-full flex-grow flex justify-center items-start flex-wrap pt-3 gap-1">
            {cards?.map((card) => {
              return (
                <Card
                  key={card?.id}
                  cardId={card?.id}
                  cardImg={card?.card_images[0]?.image_url}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
