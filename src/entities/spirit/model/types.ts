export enum ThreatLevel {
   High = 'High',
   Medium = 'Medium',
   Low = 'Low',
   Critical = 'Critical',
}

export interface Spirit {
   id: string;
   name: string;
   threatLevel: ThreatLevel;
   location: string;
   status: 'Active' | 'Captured';
   lastUpdate: string;
}
