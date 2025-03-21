import { createHttpClient } from '../utils';
import { Page, PageList } from '../types';

export async function getPages(
  accessToken: string,
  cloudId: string,

): Promise<PageList> {
  const client = createHttpClient(accessToken, cloudId);

  const response = await client.get('/wiki/api/v2/pages');
  return response.data;
}

export async function getPageById(
  accessToken: string,
  cloudId: string,
  pageId: string
): Promise<Page> {
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