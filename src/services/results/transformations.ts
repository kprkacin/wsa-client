import { Result } from './types';

export const transformResult = (res: any): Result => ({
  id: res._id,
  playerO: res.playerO,
  playerX: res.playerX,
  winner: res.winner,
});
