"use client";

import { useState } from "react";
import { Journal, JournalRow } from "../../../src/types/journal";
// eslint-disable-next-line react-hooks/rules-of-hooks
const [rows, setRows] = useState<JournalRow[]>([]);


interface Props {
  journals: Journal[];
}

export default function JournalTable({ journals }: Props) {

  
  return (
    <div className="overflow-x-auto">
      {/* <table className="min-w-full border text-sm">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th>Year</th>
            <th>Total Cites</th>
            <th>JIF</th>
            <th>5Y IF</th>
            <th>IF (No Self)</th>
            <th>Immediacy</th>
            <th>Eigenfactor</th>
            <th>Article Influence</th>
          </tr>
        </thead>
        <tbody>
          {journals.map((y) => (
            <tr key={y.year} className="text-center border-t">
              <td>{y.year}</td>
              <td>{y.metrics.total_citations ?? "-"}</td>
              <td>{y.metrics.jif ?? "-"}</td>
              <td>{y.metrics.five_year_jif ?? "-"}</td>
              <td>{y.metrics.jif_without_self_cites ?? "-"}</td>
              <td>{y.metrics.immediacy_index ?? "-"}</td>
              <td>{y.metrics.eigenfactor_score ?? "-"}</td>
              <td>{y.metrics.article_influence_score ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

<table className="min-w-full border text-sm">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th>Year</th>
            <th>JIF</th>
            <th>5Y IF</th>
            <th>Total Citations</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t text-center">
              <td>{row.year}</td>
              <td>{row.jif ?? "-"}</td>
              <td>{row.five_year_jif ?? "-"}</td>
              <td>{row.total_citations ?? "-"}</td>
              <td>{row.category ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
