import { createApiCall } from '../api/api';
import { transformRank } from './transformations';
import { Rank } from './types';

export const getRanks = async (): Promise<Rank[]> => {
  const resp = await createApiCall({
    url: `/ranks`,
    method: 'GET',
  })();

  return resp.data.ranks
    .map((r) => transformRank({ rank: r }))
    .sort((a, b) => b.wins - a.wins);
};
export const getRankByUserId = async (id: string): Promise<Rank> => {
  const resp = await createApiCall({
    url: `/ranks/${id}`,
    method: 'GET',
  })();

  return transformRank(resp.data);
};
