import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 h-dvh w-full">
      <img className="w-60" src="/assets/not-found.png" alt="" />
      <a href="/" className="link-error">
        Back to home
      </a>
    </div>
  );
}
