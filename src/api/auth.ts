import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';

export interface LoginRequestParams {
  username: string;
  password: string;
}
export const loginRequest = (loginParams: LoginRequestParams): Promise<AxiosResponse> =>
  Axios.request({
    url: 'api/v2/auth/login',
    method: 'POST',
    data: qs.stringify({ username: loginParams.username, password: loginParams.password }),
  });

export const logoutRequest = (): Promise<AxiosResponse> =>
  Axios.request({
    url: 'api/v2/auth/logout',
    method: 'POST',
  });
