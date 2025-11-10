"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [issn, setIssn] = useState("");
  const router = useRouter();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (issn.trim()) {
      router.push(`/result?issn=${encodeURIComponent(issn)}`);
      setIssn(""); 
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black"
    >
      <input 
        type="text" 
        value={issn}
        onChange={(e) => setIssn(e.target.value)}
        className="border-fuchsia-400 border w-1/2 lg:w-1/4 h-12 rounded-xl p-2 outline-0" 
        placeholder="Enter ISSN (ex: 0009-2022)"
      />
      <button 
        type="submit"
        className="m-2 rounded-lg bg-fuchsia-500 flex p-2 hover:bg-fuchsia-600 cursor-pointer text-white items-center gap-2"
      >
        Search
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
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );
}