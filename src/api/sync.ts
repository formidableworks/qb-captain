import Axios, { AxiosResponse } from 'axios';

export interface MaindataRequestParams {
  rid: number;
}
export const maindataRequest = ({ rid }: MaindataRequestParams): Promise<AxiosResponse> =>
  Axios.request({
    url: '/api/v2/sync/maindata',
    method: 'GET',
    params: { rid },
  });
