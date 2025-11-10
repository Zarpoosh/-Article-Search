"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import journalData from "@/data/mockData";

interface Journal {
  rank: number;
  fullTitle: string;
  abbreviatedTitle: string;
  category: string;
  issn: string;
  totalCites: number;
  journalImpactFactor: number;
  impactFactorWithoutSelfCites: number;
  fiveYearImpactFactor: number;
  immediacyIndex: number;
  eigenfactorScore: number;
  articleInfluenceScore: number;
}

export default function Result() {
  const searchParams = useSearchParams();
  const issn = searchParams.get("issn") || "";
  const [journal, setJournal] = useState<Journal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // استفاده از setTimeout برای جلوگیری از synchronous setState
    const timer = setTimeout(() => {
      if (issn) {
        const foundJournal = journalData.find(j => j.issn === issn);
        setJournal(foundJournal || null);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [issn]);

  // یا روش بهتر: استفاده از useMemo برای محاسبه مقدار
  // const journal = useMemo(() => {
  //   return issn ? journalData.find(j => j.issn === issn) || null : null;
  // }, [issn]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching...</p>
        </div>
      </div>
    );
  }

  if (!journal) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            مقاله‌ای با ISSN 
            <span className="text-fuchsia-500"> {issn}</span> 
            یافت نشد
          </h1>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-fuchsia-500 text-white px-6 py-3 rounded-lg hover:bg-fuchsia-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-fuchsia-500 mb-4 inline-block">← Back</Link>
        <h1 className="text-3xl font-bold mb-4">{journal.fullTitle}</h1>
        <div className=" p-6 rounded-lg shadow">
          <p><strong>ISSN:</strong> {journal.issn}</p>
          <p><strong>Rank:</strong> {journal.rank}</p>
          <p><strong>Category:</strong> {journal.category}</p>
          <p><strong>Total Cites:</strong> {journal.totalCites}</p>
          <p><strong>Impact Factor:</strong> {journal.journalImpactFactor}</p>
        </div>
      </div>
    </div>
  );
}