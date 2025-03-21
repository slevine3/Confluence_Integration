import { expect } from 'chai';
import axios from 'axios';

describe('Confluence Spaces API Integration', () => {
  const baseUrl = 'http://localhost:3000';

  it('should return a list of spaces', async () => {
    const response = await axios.get(`${baseUrl}/api/spaces`);
    
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('results').that.is.an('array');
    expect(response.data.results[0]).to.have.property('key');
    expect(response.data.results[0]).to.have.property('id');
  });

  it('should return a list of pages for a specific space', async () => {
    const spaceId = '98310';
    const response = await axios.get(`${baseUrl}/api/spaces/${spaceId}/pages`);

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('results').that.is.an('array');
    expect(response.data.results[0]).to.have.property('title');
  });
});
