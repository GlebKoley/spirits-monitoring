import { apiClient } from '@/shared/api/apiClient';

import { Spirit } from './types';

export const getAllSpirits = async (): Promise<Spirit[]> => await apiClient.get<Spirit[]>('/api/spirits');
