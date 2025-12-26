import { JournalResponse } from "../types/journal";

const API_BASE = "http://127.0.0.1:8000";

export async function fetchJournal(issn: string): Promise<JournalResponse> {
  const res = await fetch(`${API_BASE}/journals/${issn}`);

  if (!res.ok) {
    throw new Error("Journal not found");
  }

  return res.json();
}
