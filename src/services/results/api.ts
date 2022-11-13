import { createApiCall } from '../api/api';
import { transformResult } from './transformations';
import { Result } from './types';

export const getResults = async (limit?: number): Promise<Result[]> => {
  const resp = await createApiCall({
    url: `/results?limit=${limit}`,
    method: 'GET',
  })();

  return resp.data.map(transformResult);
};
export const getResultsByUserId = async (
  id: string,
  limit?: number,
): Promise<Result[]> => {
  const resp = await createApiCall({
    url: `/results/${id}?limit=${limit}`,
    method: 'GET',
  })();

  return resp.data.map(transformResult);
};
