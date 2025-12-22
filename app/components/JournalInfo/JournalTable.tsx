"use client";

import { Journal } from "./types/journal";

interface Props {
  journals: Journal[];
}

export default function JournalTable({ journals }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border text-sm text-center">
        <thead className="bg-transparent">
          <tr>
            <th className="border p-2">Rank</th>
            <th className="border p-2">Journal Title</th>
            <th className="border p-2">ISSN</th>
            <th className="border p-2">Country</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Total Cites</th>
            <th className="border p-2">Impact Factor</th>
            <th className="border p-2">IF (Without Self Cites)</th>
            <th className="border p-2">5-Year IF</th>
            <th className="border p-2">Immediacy Index</th>
            <th className="border p-2">Eigenfactor</th>
            <th className="border p-2">Article Influence</th>
          </tr>
        </thead>

        <tbody>
          {journals.map((journal) => (
            <tr
              key={journal.rank}
              className="hover:bg-neutral-100 hover:text-neutral-900 hover:cursor-pointer transition"
            >
              <td className="border p-2">{journal.rank}</td>

              <td className="border p-2 text-left">
                <div className="font-semibold">{journal.fullTitle}</div>
                <div className="text-xs text-gray-500">
                  {journal.abbreviatedTitle}
                </div>
              </td>

              <td className="border p-2">{journal.issn}</td>
              <td className="border p-2">{journal.country}</td>
              <td className="border p-2">{journal.category}</td>
              <td className="border p-2">
                {journal.totalCites.toLocaleString()}
              </td>
              <td className="border p-2">
                {journal.journalImpactFactor}
              </td>
              <td className="border p-2">
                {journal.impactFactorWithoutSelfCites}
              </td>
              <td className="border p-2">
                {journal.fiveYearImpactFactor}
              </td>
              <td className="border p-2">
                {journal.immediacyIndex}
              </td>
              <td className="border p-2">
                {journal.eigenfactorScore}
              </td>
              <td className="border p-2">
                {journal.articleInfluenceScore}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
