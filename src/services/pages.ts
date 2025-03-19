import { Page, PageList, PageQueryParams } from '../types/pages';
import { GET_PAGES, GET_PAGE_BY_ID } from '../graphql/queries';
import { graphql } from './graphql';

export async function getPages({ spaceKey, limit = 25, start = 0 }: PageQueryParams): Promise<PageList> {
  const response = await graphql.executeQuery<{ space: { pages: PageList } }>(GET_PAGES, {
    spaceKey,
    limit,
    start
  });

  return response.space.pages;
}

export async function getPageById(pageId: string): Promise<Page> {
  const response = await graphql.executeQuery<{ page: Page }>(GET_PAGE_BY_ID, { pageId });
  return response.page;
}

export default {
  getPages,
  getPageById
}; 