export interface JournalEntry {
  year: number;
  journal_name: string;
  issn: string;
  total_citations: number | null;
  jif: number | null;
  five_year_jif: number | null;
  jif_without_self_cites: number | null;
  eigenfactor_score: number | null;
  category: string | null;
}

export interface JournalResponse {
  query_code: string;
  metadata: {
    journal_name: string;
    issns: string[];
  };
  by_year: {
    [year: string]: JournalEntry[];
  };
}

export interface JournalRow {
  article_influence_score: string;
  rank_category: string;
  rank: string;
  year: number;
  journal_name: string;
  issn: string;
  total_citations: number | null;
  jif: number | null;
  five_year_jif: number | null;
  jif_without_self_cites: number | null;
  category: string | null;
}
