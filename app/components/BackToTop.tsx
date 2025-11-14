"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisible);

    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bg-fuchsia-500 cursor-pointer text-white shadow-lg rounded-full 
        w-12 h-12 flex items-center justify-center transition-opacity duration-300
        hover:bg-fuchsia-600 
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      style={{
        bottom: "50px",
        left: "30px",
        zIndex: 1000,
      }}
    >
      <span className="text-2xl font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
          />
        </svg>
      </span>
    </button>
  );
}
