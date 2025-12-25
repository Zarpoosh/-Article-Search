export interface JournalYear {
  year: number;
  metrics: {
    total_citations?: number;
    jif?: number;
    jif_without_self_cites?: number;
    five_year_jif?: number;
    immediacy_index?: number;
    citable_items?: number;
    citing_half_life?: number;
    eigenfactor_score?: number;
    article_influence_score?: number;
  };
  by_category: {
    category: string;
    rank: number | null;
    rank_category: string | null;
  }[];
}

export interface Journal {
  code: string;
  issn: string;
  eissn: string | null;
  journal_name: string;
  years: JournalYear[];
}
