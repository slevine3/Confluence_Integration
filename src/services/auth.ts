import axios from 'axios';
import config from '../config';

export async function getAccessToken(code: string) {
  const res = await axios.post('https://auth.atlassian.com/oauth/token', {
    grant_type: 'authorization_code',
    client_id: config.confluence.clientId,
    client_secret: config.confluence.clientSecret,
    code,
    redirect_uri: config.auth.redirectUri,
  });

  return res.data;
}

export async function getCloudId(accessToken: string) {
  const res = await axios.get('https://api.atlassian.com/oauth/token/accessible-resources', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
}
