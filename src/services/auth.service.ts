import api from '../config/api.config';
import { getAccessToken } from '../helpers/token.helper';
import router from '../router';
import { AuthPayload, LoginDto, RegisterDto } from '../types';

export const login = async (loginDto: LoginDto) => {
  const authPayload = (await api.post<AuthPayload>('/auth/login', loginDto))
    .data;
  authPayload &&
    localStorage.setItem('auth-payload', JSON.stringify(authPayload));
  return authPayload;
};

export const register = async (registerDto: RegisterDto) => {
  const authPayload = (
    await api.post<AuthPayload>('/auth/register', registerDto)
  ).data;
  authPayload &&
    localStorage.setItem('auth-payload', JSON.stringify(authPayload));
  return authPayload;
};

export const whoami = async () => {
  const authPayload: AuthPayload = JSON.parse(
    JSON.stringify(localStorage.getItem('auth-payload'))
  );
  if (!authPayload) {
    router.push('/');
  }
  return (
    await api.get('/auth/whoami', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
  ).data;
};

