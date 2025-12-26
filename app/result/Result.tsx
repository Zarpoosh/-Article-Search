// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// // import journalData from "@/data/mockData";
// import journalData from "@/data/jcr_combined.json";
// import QRCodeGenerator from "@/app/components/QRCodeGenerator/QRCodeGenerator";
// import "./result.css";
// // import JournalInfoList from "../components/JournalInfo/JournalInfo";
// import JournalTable from "../components/JournalInfo/JournalTable";
// export interface Journal {
//   year: number;
//   rank: number;
//   fullTitle: string;
//   abbreviatedTitle: string;
//   category: string;
//   issn: string;
//   totalCites: number;
//   journalImpactFactor: number;
//   impactFactor: number;
//   impactFactorWithoutSelfCites: number;
//   fiveYearImpactFactor: number;
//   immediacyIndex: number;
//   citableItems: number;
//   citableHalfLife: number;
//   citingHalfLife: number;
//   eigenfactorScore: number;
//   articleInfluenceScore: number;
//   link: string;
//   country: string;
// }


// export default function Result() {
//   const searchParams = useSearchParams();
//   const issn = searchParams.get("issn") || "";
//   const [journal, setJournal] = useState<Journal | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (issn) {
//         const foundJournal = journalData.find((j) => j.issn === issn);
//         setJournal(foundJournal || null);
//       }
//       setLoading(false);
//     }, 0);

//     return () => clearTimeout(timer);
//   }, [issn]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Searching...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!journal) {
//     return (
//       <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//             Article not found with this
//             <span className="text-fuchsia-500 m-2"> {issn}</span>
//             ISSN Number :(
//           </h1>
//           <Link
//             href="/"
//             className="inline-flex items-center gap-2 bg-fuchsia-500 text-white px-6 py-3 rounded-lg hover:bg-fuchsia-600 transition-colors"
//           >
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-black py-8">
//       <div className="container mx-auto px-1 max-w-4/5">
//         {/* هدر */}
//         <div className="mb-8">
//           <Link href="/" className="text-fuchsia-500 mb-4  flex">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="size-5 mt-auto"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
//               />
//             </svg>
//             Back to Search
//           </Link>
//           <h1 className="md:text-4xl text-3xl font-bold text-gray-900 dark:text-white mb-2 ">
//             {journal.fullTitle}
//           </h1>
//           <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
//             <span>ISSN: {journal.issn}</span>
//             <span>•</span>
//             <span>Rank: #{journal.rank}</span>
//             <span>•</span>
//             <span>Category: {journal.category}</span>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-8">
//           <div className="flex-1 order-1 sm:order-2 w-5/5 ">
//             <div className=" wrap-break-word background-white-glass dark:border-gray-800 border-2 h-auto rounded-xl shadow-lg p-6 ">
//               <h2 className="text-xl rounded-lg text-center bg-gray-800 p-3 font-semibold mb-4 text-gray-900 dark:text-white">
//                 Article Information
//               </h2>
//                 {/* <JournalInfoList journal={journal} /> */}
//                 <JournalTable journals={[journalData]} />
//           <div className="sm:w-50 order-2 sm:order-1">
//             <QRCodeGenerator
//               articleLink={journal.link}
//               articleTitle={journal.fullTitle}
//             />
//           </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// app/result/Result.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchJournal } from "@/src/lib/api";
import type { JournalResponse , JournalRow} from "@/src/types/journal";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const issn = searchParams.get("issn");

  const [data, setData] = useState<JournalResponse | null>(null);
  const [rows, setRows] = useState<JournalRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!issn) return;

    fetchJournal(issn)
      .then((res) => {
        setData(res);

        const flattened = Object.values(res.by_year).flatMap((items) =>
          items.map((item) => ({
            ...item
          }))
        );
        

        setRows(flattened);
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [issn]);

// !----------------------------------------
  console.log("ISSN FROM URL:", issn);


  if (loading) return <p className="p-6">در حال دریافت اطلاعات...</p>;
  if (!data) return <p className="p-6">یافت نشد ❌</p>;

  return (
    <div className="p-6 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-2">{data.metadata.journal_name}</h1>
      <p className="mb-4 text-neutral-300">ISSN: {data.metadata.issns[0]}</p>


      

      <table className="min-w-full border text-sm">
        <thead className="bg-fuchsia-700 text-xl text-white">
          <tr >
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
            <tr key={i} className="border-t text-center hover:bg-neutral-300 hover:text-neutral-900 hover:cursor-pointer ">
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
