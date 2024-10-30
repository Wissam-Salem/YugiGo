import { createPortal } from "react-dom";
import "./Card.css";
import { useRef } from "react";

export default function Card({ cardId, cardImg }) {
  let sideInfo = useRef(null);
  return (
    <div
      className="w-fit h-fit"
      onClick={() => {
        window.localStorage.setItem(
          "prevPath",
          window.location.pathname.includes("race")
            ? window.location.pathname.split("race")[0]
            : window.location.pathname.includes("type")
            ? window.location.pathname.split("type")[0]
            : window.location.pathname
        );
        window.location.pathname = `cards/${cardId}`;
      }}
    >
      <div>
        <img
          className="w-[8rem] hover:scale-105 max-sm:w-[7rem] transition-all"
          src={cardImg}
          alt=""
        />
      </div>
    </div>
  );
}
