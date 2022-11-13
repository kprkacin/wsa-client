import { Rank } from './types';

export const transformRank = (res: any): Rank => ({
  id: res.rank._id,
  userId: res.rank.userId,
  wins: res.rank.wins,
  losses: res.rank.losses,
});
