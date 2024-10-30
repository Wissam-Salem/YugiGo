import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CarsPage.css";
import { Helmet } from "react-helmet";

export default function CardPage() {
  let { cardId } = useParams();
  let [emblaRef] = useEmblaCarousel({
    loop: true,
    axis: "x",
    direction: "ltr",
  });
  let [card, setCard] = useState({
    cardName: "",
    cardDesc: "",
    cardPendDesc: "",
    cardAtk: 0,
    cardDef: 0,
    cardLvl: 0,
    cardAtr: "",
    cardTypes: [],
    cardSets: [],
    cardImg: "",
  });
  let [similarCards, setSimilarCards] = useState([]);
  console.log(cardId);
  useEffect(() => {
    axios(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardId}`).then(
      (res) => {
        console.log(res?.data?.data[0]);
        setCard({
          cardName: res?.data?.data[0]?.name,
          cardDesc: res?.data?.data[0]?.desc,
          cardPendDesc: res?.data?.data[0]?.pend_desc,
          cardAtk: res?.data?.data[0]?.atk < 0 ? "?" : res?.data?.data[0]?.atk,
          cardDef: res?.data?.data[0]?.def < 0 ? "?" : res?.data?.data[0]?.def,
          cardImg: res?.data?.data[0]?.card_images[0]?.image_url,
          cardLvl: res?.data?.data[0]?.level,
          cardSets: res?.data?.data[0]?.card_sets,
          cardAtr:
            res?.data?.data[0]?.attribute === undefined
              ? res?.data?.data[0]?.frameType?.toUpperCase()
              : res?.data?.data[0]?.attribute,
          cardTypes:
            res?.data?.data[0]?.typeline === undefined
              ? res?.data?.data[0]?.race
              : res?.data?.data[0]?.typeline,
        });
        axios(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${
            res?.data?.data[0]?.name?.slice(" ")[0]
          }&race=${res?.data?.data[0]?.race}`
        ).then((resp) => {
          console.log(resp?.data?.data);
          setSimilarCards(resp?.data?.data);
        });
      }
    );
  }, [cardId]);
  return (
    <div className="flex flex-col justify-between items-center min-h-dvh px-5 ">
      <Helmet>
        <title>Cards | {card?.cardName === "" ? "..." : card?.cardName}</title>
      </Helmet>
      <div
        className={`flex ${
          !card?.cardPendDesc && "gap-6"
        } max-md:flex-col w-full min-h-dvh py-8`}
      >
        <div className="flex flex-col justify-start items-center gap-5 w-1/2 max-md:w-full h-full max-md:h-fit">
          <header className="w-full max-md:flex justify-between items-center hidden">
            <button
              onClick={() => {
                window.location.pathname =
                  window.localStorage.getItem("prevPath") !== null
                    ? window.localStorage.getItem("prevPath")
                    : "/";
              }}
              className="ring-1 ring-red-400 hover:bg-red-900 transition-all active:scale-95 rounded-full flex justify-center items-center size-8 p-3"
            >
              <FontAwesomeIcon size="sm" icon={faChevronLeft} />
            </button>
            <h1 className="text-2xl text-right text-white font-bold">
              {card?.cardName}
            </h1>
          </header>
          <img
            className="w-[16rem] max-md:w-[14rem] h-fit"
            src={card.cardImg}
            alt={card.cardName}
          />
          {card?.cardPendDesc && (
            <div className="flex flex-col justify-center items-start gap-3 w-full max-md:mb-6">
              <h1 className="text-xl text-white font-semibold">
                Pendulum Descreption
              </h1>
              <p className="italic">{card?.cardPendDesc}</p>
            </div>
          )}
          <div className="flex flex-col justify-center items-start w-full max-md:hidden">
            <h1 className="text-xl text-white font-semibold mb-3">Card Sets</h1>
            {card?.cardSets?.map((cardSet, i) => {
              return (
                <div
                  key={i}
                  className="flex justify-start items-center gap-2 px-2"
                >
                  <img className="size-10" src="/assets/deck.png" alt="" />
                  <p>{cardSet?.set_name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col justify-start items-center gap-5 w-1/2 max-md:w-full">
          <header className="w-full flex justify-between items-center max-md:hidden">
            <button
              onClick={() => {
                window.location.pathname =
                  window.localStorage.getItem("prevPath");
              }}
              className="ring-1 ring-red-400 hover:bg-red-900 transition-all active:scale-95 rounded-full flex justify-center items-center size-8 p-3"
            >
              <FontAwesomeIcon size="sm" icon={faChevronLeft} />
            </button>
            <h1 className="text-2xl font-bold text-white text-right">
              {card?.cardName}
            </h1>
          </header>
          <main className="flex flex-col justify-start items-start w-full gap-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-xl text-white font-semibold">Descreption</h1>
              <i className="font-[Poppins] px-2">
                <p>{card?.cardDesc}</p>
              </i>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-xl text-white font-semibold">Card Info</h1>
              <ul className="flex flex-col justify-center items-start gap-2">
                {card?.cardAtk !== undefined && (
                  <li className="flex justify-start items-center gap-2 text-right w-full px-2">
                    <img
                      className="size-6"
                      src="https://img.icons8.com/?size=100&id=16672&format=png&color=000000"
                      alt=""
                    />
                    <h1 className="text-white">Attack:</h1> {card?.cardAtk}
                  </li>
                )}
                {card?.cardDef !== undefined && (
                  <li className="flex justify-start items-center gap-2 text-right w-full px-2">
                    <img
                      className="size-6"
                      src="https://img.icons8.com/?size=100&id=m5SHj3biqpiR&format=png&color=000000"
                      alt=""
                    />
                    <h1 className="text-white">Defense:</h1> {card?.cardDef}
                  </li>
                )}
                {card?.cardLvl !== undefined && (
                  <li className="flex justify-start items-center gap-2 text-right w-full px-2">
                    <img
                      className="size-6"
                      src="https://img.icons8.com/?size=100&id=8ggStxqyboK5&format=png&color=000000"
                      alt=""
                    />
                    <h1 className="text-white">Level:</h1> {card?.cardLvl}
                  </li>
                )}
                <li className="flex justify-start items-center gap-2 text-right w-full px-2">
                  <img
                    className="size-6"
                    src="https://img.icons8.com/?size=100&id=mMPdSvgRE4Rl&format=png&color=000000"
                    alt=""
                  />
                  <h1 className="text-white">Attribute:</h1> {card?.cardAtr}{" "}
                  <img
                    className="size-5"
                    src={`/assets/${card?.cardAtr?.toLowerCase()}.png`}
                    alt=""
                  />
                </li>
                <li className="flex justify-start items-center gap-2 text-right w-full px-2">
                  <img
                    className="size-6 object-contain"
                    src="/assets/types.jpg"
                    alt=""
                  />
                  <h1 className="text-white">Types:</h1>{" "}
                  {typeof card?.cardTypes === "object"
                    ? card?.cardTypes?.map((type, index) => {
                        if (index === card?.cardTypes?.length - 1) {
                          return <span key={index}>{type}</span>;
                        }
                        return <span key={index}>{type} | </span>;
                      })
                    : card?.cardTypes}
                </li>
              </ul>
            </div>
            <div className="flex-col justify-center items-start w-full hidden max-md:flex">
              <h1 className="text-xl text-white font-semibold mb-3">
                Card Sets
              </h1>
              {card?.cardSets?.map((cardSet, i) => {
                return (
                  <div
                    key={i}
                    className="flex justify-start items-center gap-2 px-2"
                  >
                    <img className="size-10" src="/assets/deck.png" alt="" />
                    <p>{cardSet?.set_name}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col justify-start items-center gap-4 w-full">
              <h1 className="text-xl text-left text-white w-full font-semibold">
                Similar Cards
              </h1>
              <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                  {similarCards?.slice(0, 20)?.map((simCard, index) => (
                    <a
                      href={`/cards/${simCard?.id}`}
                      className="embla__slide"
                      key={index}
                    >
                      <img
                        src={simCard?.card_images[0]?.image_url}
                        alt={simCard?.name}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
