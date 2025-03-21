import { ConfluencePage, PageSearchResult } from '../types/confluence';
import { createHttpClient } from '../utils';

export async function getPages(
  accessToken: string,
  cloudId: string,
  spaceKey?: string,
  limit: number = 25,
  start: number = 0
): Promise<PageSearchResult> {
  const client = createHttpClient(accessToken, cloudId);
  const params: Record<string, any> = {
    limit,
    start
  };

  if (spaceKey) {
    params.spaceKey = spaceKey;
  }

  const response = await client.get('/wiki/api/v2/pages', { params });
  return response.data;
}

export async function getPageById(
  accessToken: string,
  cloudId: string,
  pageId: string
): Promise<ConfluencePage> {
  const client = createHttpClient(accessToken, cloudId);
  const response = await client.get(`/wiki/api/v2/pages/${pageId}`, {
    params: {
      'body-format': 'storage'
    },
  });
  return response.data;
}

export default {
  getPages,
  getPageById
}; 