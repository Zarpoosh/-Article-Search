export interface Journal {
  year: number;
  rank: number;
  fullTitle: string;
  abbreviatedTitle: string;
  category: string;
  issn: string;
  totalCites: number;
  journalImpactFactor: number;
  impactFactor: number;
  impactFactorWithoutSelfCites: number;
  fiveYearImpactFactor: number;
  immediacyIndex: number;
  citableItems: number;
  citableHalfLife: number;
  citingHalfLife: number;
  eigenfactorScore: number;
  articleInfluenceScore: number;
  link: string;
  country: string;
}
