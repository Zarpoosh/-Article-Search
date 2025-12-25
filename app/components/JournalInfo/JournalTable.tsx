// "use client";

// import { Journal } from "../../../src/types/journal";

// interface Props {
//   journals: Journal[];
// }

// export default function JournalTable({ journals }: Props) {
//   return (
//     <div className="relative w-full overflow-x-auto">
//       <table className="min-w-[1500px] border-collapse border text-sm text-center">
//         <thead className="bg-neutral-800 sticky top-0 z-10">
//           <tr>
//             <th className="border p-2">Year</th>
//             <th className="border p-2">Total Cites</th>
//             <th className="border p-2">Journal IF</th>
//             <th className="border p-2">IF (Without Self Cites)</th>
//             <th className="border p-2">5-Year IF</th>
//             <th className="border p-2">Immediacy Index</th>
//             <th className="border p-2">Citable Items</th>
//             <th className="border p-2">Citable Half-Life</th>
//             <th className="border p-2">Citing Half-Life</th>
//             <th className="border p-2">Eigenfactor</th>
//             <th className="border p-2">Article Influence</th>
//             <th className="border p-2">ISSN</th>
//             <th className="border p-2">Country</th>
//             <th className="border p-2">Category</th>
//             <th className="border p-2">Impact Factor</th>
//           </tr>
//         </thead>

//         <tbody>
//           {journals.map((journal) => (
//             <tr
//               key={`${journal.issn}-${journal.year}`}
//               className="hover:bg-neutral-600 transition"
//             >
//               <td className="border py-4">{journal.year}</td>
//               <td className="border px-2 py-4">
//                 {journal.totalCites.toLocaleString()}
//               </td>
//               <td className="border px-2 py-4">
//                 {journal.journalImpactFactor}
//               </td>
//               <td className="border px-2 py-4">
//                 {journal.impactFactorWithoutSelfCites}
//               </td>
//               <td className="border px-2 py-4">
//                 {journal.fiveYearImpactFactor}
//               </td>
//               <td className="border px-2 py-4">{journal.immediacyIndex}</td>
//               <td className="border px-2 py-4">{journal.citableItems}</td>
//               <td className="border px-2 py-4">{journal.citableHalfLife}</td>
//               <td className="border px-2 py-4">{journal.citingHalfLife}</td>
//               <td className="border px-2 py-4">{journal.eigenfactorScore}</td>
//               <td className="border px-2 py-4">
//                 {journal.articleInfluenceScore}
//               </td>
//               <td className="border px-2 py-4">{journal.issn}</td>
//               <td className="border px-2 py-4">{journal.country}</td>
//               <td className="border px-2 py-4">{journal.category}</td>
//               <td className="border px-2 py-4">{journal.impactFactor}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }




import { JournalYear } from "@/src/types/journal";

interface Props {
  journals: JournalYear[];
}

export default function JournalTable({ journals }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
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
      </table>
    </div>
  );
}
