import { createHttpClient } from '../utils';
import { SpaceList, PageInSpaceList } from '../types';

export async function getSpaces(
  accessToken: string,
  cloudId: string,
  limit: number = 25,
  start: number = 0
): Promise<SpaceList> {
  const client = createHttpClient(accessToken, cloudId);
  const params: Record<string, any> = {
    limit,
    start
  };

  const response = await client.get('/wiki/api/v2/spaces', { params });
  return response.data;
}

export async function getSpacePages(
  accessToken: string,
  cloudId: string,
  spaceId: string,
): Promise<PageInSpaceList> {
  const client = createHttpClient(accessToken, cloudId);

  const response = await client.get(`/wiki/api/v2/spaces/${spaceId}/pages`);
  return response.data;
}

export default {
  getSpaces,
  getSpacePages
}; 