// app/result/page.tsx
import { Suspense } from "react";
import Result from "./Result"

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Result />
    </Suspense>
  );
}
