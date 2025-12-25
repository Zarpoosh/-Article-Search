const API_BASE = "http://127.0.0.1:8000/docs";

export async function fetchJournal(issn: string) {
  const res = await fetch(`${API_BASE}/journal/${issn}`);

  if (!res.ok) {
    throw new Error("Journal not found");
  }

  return res.json();
}
