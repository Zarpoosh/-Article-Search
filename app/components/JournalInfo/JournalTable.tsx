"use client";

// import React from "react";
import type { JournalRow } from "@/src/types/journal";

interface Props {
  rows: JournalRow[];
}

export default function JournalTable({ rows }: Props) {
  return (
    <div className=" w-full">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-fuchsia-700 text-white text-xl">
          <tr>
            <th className="border border-gray-300 p-2">Year</th>
            <th className="border border-gray-300 p-2">ISSN</th>
            <th className="border border-gray-300 p-2">JIF</th>
            <th className="border border-gray-300 p-2">5Y IF</th>
            <th className="border border-gray-300 p-2">Total Citations</th>
            <th className="border border-gray-300 p-2">Rank</th>
            <th className="border border-gray-300 p-2">Rank Category</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">AIS</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="even:bg-neutral-800 hover:bg-gray-300 hover:text-neutral-900 transition"
            >
              <td className="border border-gray-300 p-2">{row.year}</td>
              <td className="border border-gray-300 p-2">{row.issn ?? "-"}</td>
              <td className="border border-gray-300 p-2">{row.jif ?? "-"}</td>
              <td className="border border-gray-300 p-2">
                {row.five_year_jif ?? "-"}
              </td>
              <td className="border border-gray-300 p-2">
                {row.total_citations ?? "-"}
              </td>
              <td className="border border-gray-300 p-2">{row.rank ?? "-"}</td>
              <td className="border border-gray-300 p-2">
                {row.rank_category ?? "-"}
              </td>
              <td className="border border-gray-300 p-2">
                {row.category ?? "-"}
              </td>
              <td className="border border-gray-300 p-2">
                {row.article_influence_score ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
