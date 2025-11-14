export interface Journal {
    rank: number;
    fullTitle: string;
    abbreviatedTitle: string;
    category: string;
    issn: string;
    totalCites: number;
    journalImpactFactor: number;
    impactFactorWithoutSelfCites: number;
    fiveYearImpactFactor: number;
    immediacyIndex: number;
    eigenfactorScore: number;
    articleInfluenceScore: number;
    link: string;
    country: string;
  }
  