import { AuthPayload } from '../types';

export const getAccessToken = () => {
  const authPayload: AuthPayload = JSON.parse(
    localStorage.getItem('auth-payload') || '{}'
  );
  return authPayload?.accessToken;
};

