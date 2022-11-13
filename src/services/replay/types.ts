import { Square } from '../../components/TicTacToe/types';

export interface Replay {
  id: string;
  replay: Square[][];
  resultId: string;
}
