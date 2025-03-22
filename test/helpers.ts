import axios from 'axios';
import { CookieJar } from 'tough-cookie';
import { wrapper as axiosCookieJarSupport } from 'axios-cookiejar-support';

export interface TestContext {
  axiosInstance: any;
  cookieJar: CookieJar;
}

export const setupTestClient = async (baseUrl: string): Promise<TestContext> => {
  // Create a cookie jar and axios instance that supports cookies
  const cookieJar = new CookieJar();
  const axiosInstance = axios.create({
    jar: cookieJar,
    withCredentials: true
  });
  axiosCookieJarSupport(axiosInstance);

  // Set up session
  const response = await axiosInstance.get(`${baseUrl}/test/login`);
  console.log('Test session response:', response.data);

  return { axiosInstance, cookieJar };
}; 