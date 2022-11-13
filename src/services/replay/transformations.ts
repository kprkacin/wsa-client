import { Replay } from './types';

export const transformReplay = (res: any): Replay => ({
  id: res.replay._id,
  replay: res.replay.replay,
  resultId: res.replay.resultId,
});
