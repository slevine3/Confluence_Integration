import { gql } from 'graphql-request';

export const GET_PAGES = gql`
  query GetPages($spaceKey: String!, $limit: Int!, $start: Int!) {
    space(key: $spaceKey) {
      pages(limit: $limit, start: $start) {
        results {
          id
          title
          status
          body {
            storage {
              value
              representation
            }
          }
          version {
            number
            message
            createdAt
          }
          createdAt
          updatedAt
        }
        limit
        start
        size
        totalSize
      }
    }
  }
`;

export const GET_PAGE_BY_ID = gql`
  query GetPage($pageId: ID!) {
    page(id: $pageId) {
      id
      title
      spaceKey
      status
      body {
        storage {
          value
          representation
        }
      }
      version {
        number
        message
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`; 