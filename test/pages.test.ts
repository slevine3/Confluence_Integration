import { expect } from 'chai';
import axios from 'axios';
import { setupTestServer, teardownTestServer } from './setup';
import { setupTestClient } from './helpers';

describe('Confluence API Integration', () => {
  const baseUrl = 'http://localhost:3001';
  const testPageId = '786452';
  const testSpaceId = '98310';
  let axiosInstance: any;

  before(async () => {
    await setupTestServer();
    const { axiosInstance: instance } = await setupTestClient(baseUrl);
    axiosInstance = instance;
  });

  after(async () => {
    await teardownTestServer();
  });

  it('should return a list of pages from a space', async function() {
    this.retries(3);
    const response = await axiosInstance.get(`${baseUrl}/api/spaces/${testSpaceId}/pages`);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('results').that.is.an('array');
  });

  it('should return page content by ID', async function() {
    this.retries(3);
    const response = await axiosInstance.get(`${baseUrl}/api/pages/${testPageId}`);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('title');
    expect(response.data).to.have.nested.property('body.storage.value');
  });

  it('should return 404 for an invalid page ID', async () => {
    try {
      const nonExistentPageId = '999999999'; 
      await axiosInstance.get(`${baseUrl}/api/pages/${nonExistentPageId}`);
      expect.fail('Expected request to fail with 404');
    } catch (error: any) {
      expect(error.response.status).to.equal(404);
    }
  });

  it('should return 401 if session is not initialized', async () => {
    const noCookieAxios = axios.create();
    try {
      await noCookieAxios.get(`${baseUrl}/api/pages/${testPageId}`);
      expect.fail('Expected 401 error for missing session');
    } catch (error: any) {
      expect(error.response.status).to.equal(401);
    }
  });
});
