
export type Category = 'Skill' | 'Item' | 'Help' | 'Workshop';

export interface Seed {
  id: string;
  title: string;
  description: string;
  category: Category;
  author: string;
  location: string;
  impactScore: number; // estimated CO2 saved or hours
  type: 'Offer' | 'Request';
  timestamp: Date;
  tags: string[];
}

export interface ImpactStats {
  hoursShared: number;
  itemsSaved: number;
  co2SavedKg: number;
  communityGrowth: number; // percentage
}

export enum ViewMode {
  Ecosystem = 'ecosystem',
  SeedBank = 'seedbank',
  MyGarden = 'mygarden',
  Impact = 'impact'
}
