import { SpaceSearchResult, PageSearchResult } from '../types/confluence';
import { createHttpClient } from '../utils';

export async function getSpaces(
  accessToken: string,
  cloudId: string,
  limit: number = 25,
  start: number = 0
): Promise<SpaceSearchResult> {
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
  limit: number = 25,
  start: number = 0
): Promise<PageSearchResult> {
  const client = createHttpClient(accessToken, cloudId);
  const params: Record<string, any> = {
    limit,
    start
  };

  const response = await client.get(`/wiki/api/v2/spaces/${spaceId}/pages`, { params });
  return response.data;
}

export default {
  getSpaces,
  getSpacePages
}; 