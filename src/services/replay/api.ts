import { createApiCall } from '../api/api';
import { transformReplay } from './transformations';
import { Replay } from './types';

export const getReplay = async (id: string): Promise<Replay> => {
  const resp = await createApiCall({
    url: `/replay/${id}`,
    method: 'GET',
  })();

  return transformReplay(resp.data);
};
