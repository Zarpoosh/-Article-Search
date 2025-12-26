"use client";

import React from "react";
import type { JournalRow } from "@/src/types/journal";

interface Props {
  rows: JournalRow[];
}

export default function JournalTable({ rows }: Props) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full text-sm">
        <thead className="bg-fuchsia-700 text-white text-xl">
          <tr>
            <th>Year</th>
            <th>ISSN</th>
            <th>JIF</th>
            <th>5Y IF</th>
            <th>Total Citations</th>
            <th>Rank</th>
            <th>RankCategory</th>
            <th>Category</th>
            <th>ArticleInfluenceScore</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-t text-center hover:bg-neutral-300 hover:text-neutral-900 hover:cursor-pointer"
            >
              <td className="p-4">{row.year}</td>
              <td className="p-4">{row.issn ?? "-"}</td>
              <td className="p-4">{row.jif ?? "-"}</td>
              <td className="p-4">{row.five_year_jif ?? "-"}</td>
              <td className="p-4">{row.total_citations ?? "-"}</td>
              <td className="p-4">{row.rank ?? "-"}</td>
              <td className="p-4">{row.rank_category ?? "-"}</td>
              <td className="p-4">{row.category ?? "-"}</td>
              <td className="p-4">{row.article_influence_score ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
