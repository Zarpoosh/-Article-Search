"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import journalData from "@/data/mockData";
import QRCodeGenerator from "@/app/components/QRCodeGenerator/QRCodeGenerator";

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
  link: string;
}

export default function Result() {
  const searchParams = useSearchParams();
  const issn = searchParams.get("issn") || "";
  const [journal, setJournal] = useState<Journal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (issn) {
        const foundJournal = journalData.find((j) => j.issn === issn);
        setJournal(foundJournal || null);
      }
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [issn]);

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
            Article not found with this
            <span className="text-fuchsia-500 m-2"> {issn}</span>
            ISSN Number :(
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
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* هدر */}
        <div className="mb-8">
          <Link href="/" className="text-fuchsia-500 mb-4 inline-block">
            ← Back to Search
          </Link>
          <h1 className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {journal.fullTitle}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>ISSN: {journal.issn}</span>
            <span>•</span>
            <span>Rank: #{journal.rank}</span>
            <span>•</span>
            <span>Category: {journal.category}</span>
          </div>
        </div>

        {/* محتوای اصلی با لیاوت رسپانسیو */}
        <div className="flex flex-col sm:flex-row gap-8">

          {/* QR Code - در موبایل پایین، در sm به بالا سمت چپ */}
          <div className="sm:w-80 order-2 sm:order-1">
            <QRCodeGenerator
              articleLink={journal.link}
              articleTitle={journal.fullTitle}
            />
          </div>
          {/* اطلاعات مقاله - همیشه اول از نظر DOM */}
          <div className="flex-1 order-1 sm:order-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Article Information
              </h2>
              <div className="space-y-3">
                <p>
                  <strong>ISSN:</strong> {journal.issn}
                </p>
                <p>
                  <strong>Rank:</strong> {journal.rank}
                </p>
                <p>
                  <strong>Category:</strong> {journal.category}
                </p>
                <p>
                  <strong>Total Cites:</strong>{" "}
                  {journal.totalCites.toLocaleString()}
                </p>
                <p>
                  <strong>Impact Factor:</strong> {journal.journalImpactFactor}
                </p>
                <p>
                  <strong>Without Self Cites:</strong>{" "}
                  {journal.impactFactorWithoutSelfCites}
                </p>
                <p>
                  <strong>5-Year Impact:</strong> {journal.fiveYearImpactFactor}
                </p>
                <p>
                  <strong>Immediacy Index:</strong> {journal.immediacyIndex}
                </p>
                <p>
                  <strong>Eigenfactor Score:</strong> {journal.eigenfactorScore}
                </p>
                <p>
                  <strong>Article Influence:</strong>{" "}
                  {journal.articleInfluenceScore}
                </p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}