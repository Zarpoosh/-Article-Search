"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [issn, setIssn] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanIssn = issn.trim();

    if (!cleanIssn) return;

    console.log("Searching ISSN:", cleanIssn); // 👈 برای تست

    router.push(`/result?issn=${encodeURIComponent(cleanIssn)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex h-150 items-center justify-center bg-zinc-50 font-sans dark:bg-black"
    >
      <input
        type="text"
        value={issn}
        onChange={(e) => setIssn(e.target.value)}
        className="border-fuchsia-400 border w-1/2 lg:w-1/4 h-12 rounded-xl p-2 outline-0"
        placeholder="Enter ISSN (ex: 0096-1442)"
      />

      <button
        type="submit"
        className="m-2 rounded-lg bg-fuchsia-500 flex p-2 hover:bg-fuchsia-600 text-white items-center gap-2"
      >
        Search
      </button>
    </form>
  );
}
