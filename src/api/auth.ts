import Axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';

export interface LoginRequestParams {
  username: string;
  password: string;
}
export const loginRequest = (loginParams: LoginRequestParams): Promise<AxiosResponse> =>
  Axios.request({
    url: 'api/v2/auth/login',
    method: 'POST',
    data: queryString.stringify({ username: loginParams.username, password: loginParams.password }),
  });

export const logoutRequest = (): Promise<AxiosResponse> =>
  Axios.request({
    url: 'api/v2/auth/logout',
    method: 'POST',
  });
