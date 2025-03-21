import { expect } from 'chai';
import axios from 'axios';

describe('Confluence API Integration', () => {
  const baseUrl = 'http://localhost:3000';

  it('should return a list of pages from a space', async () => {
    const spaceId = 'your-test-space-id';
    const response = await axios.get(`${baseUrl}/api/spaces/${spaceId}/pages`);

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('results').that.is.an('array');
  });

  it('should return page content by ID', async () => {
    const pageId = '786452';
    const response = await axios.get(`${baseUrl}/api/pages/${pageId}`);

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('title');
    expect(response.data).to.have.nested.property('body.storage.value');
  });
});
