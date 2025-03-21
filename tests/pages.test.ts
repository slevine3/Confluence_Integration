import { expect } from 'chai';
import nock from 'nock';
import config from '../src/config';
import { getPages, getPageById } from '../src/services';

describe('Pages Service', () => {
  beforeEach(() => {
    // Mock OAuth token endpoint
    nock(config.auth.tokenUrl)
      .post('')
      .reply(200, {
        access_token: 'mock-token',
        expires_in: 3600
      });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('getPages', () => {
    it('should fetch pages from a space', async () => {
      const mockPages = {
        data: {
          space: {
            pages: {
              results: [
                {
                  id: '123',
                  title: 'Test Page',
                  status: 'current',
                  body: {
                    storage: {
                      value: 'Test content',
                      representation: 'storage'
                    }
                  },
                  version: {
                    number: 1,
                    message: 'Initial version',
                    createdAt: '2024-03-01T00:00:00Z'
                  },
                  createdAt: '2024-03-01T00:00:00Z',
                  updatedAt: '2024-03-01T00:00:00Z'
                }
              ],
              limit: 25,
              start: 0,
              size: 1,
              totalSize: 1
            }
          }
        }
      };

      nock(config.graphql.apiUrl)
        .post('')
        .reply(200, mockPages);

      const result = await getPages({ spaceKey: 'TEST' });
      expect(result.results).to.have.lengthOf(1);
      expect(result.results[0].title).to.equal('Test Page');
    });
  });

  describe('getPageById', () => {
    it('should fetch a single page by ID', async () => {
      const mockPage = {
        data: {
          page: {
            id: '123',
            title: 'Test Page',
            spaceKey: 'TEST',
            status: 'current',
            body: {
              storage: {
                value: 'Test content',
                representation: 'storage'
              }
            },
            version: {
              number: 1,
              message: 'Initial version',
              createdAt: '2024-03-01T00:00:00Z'
            },
            createdAt: '2024-03-01T00:00:00Z',
            updatedAt: '2024-03-01T00:00:00Z'
          }
        }
      };

      nock(config.graphql.apiUrl)
        .post('')
        .reply(200, mockPage);

      const result = await getPageById('123');
      expect(result.id).to.equal('123');
      expect(result.title).to.equal('Test Page');
    });
  });
}); 