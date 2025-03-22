import { expect } from 'chai';
import axios from 'axios';
import { setupTestServer, teardownTestServer } from './setup';
import { setupTestClient } from './helpers';

describe('Confluence Spaces API Integration', () => {
  const baseUrl = 'http://localhost:3001';
  const testSpaceId = '98310'; // Replace with a valid test space ID
  let axiosInstance: any;

  before(async () => {
    await setupTestServer();
    const { axiosInstance: instance } = await setupTestClient(baseUrl);
    axiosInstance = instance;
  });

  after(async () => {
    await teardownTestServer();
  });

  it('should return a list of spaces', async function() {
    this.retries(3);
    const response = await axiosInstance.get(`${baseUrl}/api/spaces`);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('results').that.is.an('array');
    expect(response.data.results[0]).to.have.property('key');
    expect(response.data.results[0]).to.have.property('id');
  });

  it('should return a list of pages for a specific space', async function() {
    this.retries(3);
    const response = await axiosInstance.get(`${baseUrl}/api/spaces/${testSpaceId}/pages`);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('results').that.is.an('array');
    expect(response.data.results[0]).to.have.property('title');
  });

  it('should return 404 for an invalid space ID', async () => {
    try {
      const nonExistentSpaceId = '999999999'; 
      await axiosInstance.get(`${baseUrl}/api/spaces/${nonExistentSpaceId}`);
      expect.fail('Expected request to fail with 404');
    } catch (error: any) {
      expect(error.response.status).to.equal(404);
    }
  });

  it('should return 401 if session is not initialized', async () => {
    const noCookieAxios = axios.create();
    try {
      await noCookieAxios.get(`${baseUrl}/api/spaces`);
      expect.fail('Expected 401 error for missing session');
    } catch (error: any) {
      expect(error.response.status).to.equal(401);
    }
  });
});
