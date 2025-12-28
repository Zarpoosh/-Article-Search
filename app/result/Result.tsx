"use client";

import { useEffect, useState } from "react";
import { fetchJournal } from "@/src/lib/api";
import type { JournalResponse, JournalRow } from "@/src/types/journal";
import JournalTable from "@/app/components/JournalInfo/JournalTable";
import QRCodeGenerator from "../components/QRCodeGenerator/QRCodeGenerator";
import { usePathname, useSearchParams } from "next/navigation";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const issn = searchParams.get("issn") || "";

  const [data, setData] = useState<JournalResponse | null>(null);
  const [rows, setRows] = useState<JournalRow[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const currentUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${pathname}?${searchParams.toString()}`
      : "";
  useEffect(() => {
    if (!issn) return;

    fetchJournal(issn)
      .then((res) => {
        setData(res);
        const flattened = Object.values(res.by_year).flatMap((items) =>
          items.map((item) => ({
            ...item,
          }))
        );
        setRows(flattened);
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [issn]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Searching...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Article not found for ISSN:{" "}
          <span className="text-fuchsia-500">{issn}</span>
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8">
      <div className="container mx-auto px-4 max-w-8xl ">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {data.metadata.journal_name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            ISSN: {data.metadata.issns[0]}
          </p>
        </div>

        {/* Table + QR Code */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* جدول */}
          <div className="w-full md:flex-1 bg-white dark:bg-transparent rounded-xl shadow-lg overflow-x-auto">
            <h2 className="text-xl text-center p-3 font-semibold mb-4 text-white">
              Article Information
            </h2>

            <JournalTable rows={rows} />
          </div>

          {/* QR Code */}
          <div className="w-full md:w-1/6 flex justify-center items-start">
            <QRCodeGenerator
              articleLink={currentUrl}
              articleTitle={data.metadata.journal_name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
