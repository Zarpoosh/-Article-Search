// "use client";

// import { Journal } from "../../../src/types/journal";

// interface Props {
//   journal: Journal;
// }

// export default function JournalInfoList({ journal }: Props) {
//   const fields: { label: string; value: string | number }[] = [
//     { label: "ISSN", value: journal.issn },
//     { label: "Rank", value: journal.rank },
//     { label: "Country", value: journal.country },
//     { label: "Category", value: journal.category },
//     { label: "Total Cites", value: journal.totalCites.toLocaleString() },
//     { label: "Impact Factor", value: journal.journalImpactFactor },
//     {
//       label: "Without Self Cites",
//       value: journal.impactFactorWithoutSelfCites,
//     },
//     { label: "5-Year Impact", value: journal.fiveYearImpactFactor },
//     { label: "Immediacy Index", value: journal.immediacyIndex },
//     { label: "Eigenfactor Score", value: journal.eigenfactorScore },
//     {
//       label: "Article Influence",
//       value: journal.articleInfluenceScore,
//     },
//   ];

//   return (
//     <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4">
//       {fields.map((item) => (
//         <p
//           className="border p-4 rounded-lg  md:grid md:grid-cols-2"
//           key={item.label}
//         >
//           <strong>{item.label} :</strong>
//           <strong>{item.value}</strong>
//         </p>
//       ))}
//     </div>
//   );
// }
