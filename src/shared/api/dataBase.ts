import { Spirit, ThreatLevel } from '@/entities/spirit/model/types';

export const initialData: Spirit[] = [
   {
      id: '1',
      name: 'Kitsune',
      status: 'Active',
      location: 'Tokyo',
      threatLevel: ThreatLevel.High,
      lastUpdate: new Date().toISOString(),
   },
   {
      id: '2',
      name: 'Tengu',
      status: 'Active',
      location: 'Kyoto',
      threatLevel: ThreatLevel.Medium,
      lastUpdate: new Date().toISOString(),
   },
   {
      id: '3',
      name: 'Kappa',
      status: 'Active',
      location: 'Osaka',
      threatLevel: ThreatLevel.Low,
      lastUpdate: new Date().toISOString(),
   },
   {
      id: '4',
      name: 'Oni',
      status: 'Active',
      location: 'Yokohama',
      threatLevel: ThreatLevel.Critical,
      lastUpdate: new Date().toISOString(),
   },
   {
      id: '5',
      name: 'Yuri',
      status: 'Active',
      location: 'Sapporo',
      threatLevel: ThreatLevel.High,
      lastUpdate: new Date().toISOString(),
   },
   {
      id: '6',
      name: 'Osa',
      status: 'Active',
      location: 'Fukuoka',
      threatLevel: ThreatLevel.High,
      lastUpdate: new Date().toISOString(),
   },
];

let spiritsData = [...initialData];

export const dataBase = {
   getAll: () => spiritsData,
   reset: () => {
      spiritsData = [...spiritsData];
   },
   getById: (id: string) => spiritsData.find((spirit) => spirit.id === id),
   update: (id: string, updates: Partial<Spirit>) => {
      spiritsData = spiritsData.map((spirit) => (spirit.id === id ? { ...spirit, ...updates } : spirit));
      return spiritsData.find((spirit) => spirit.id === id);
   },
};
