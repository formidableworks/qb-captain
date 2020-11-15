import { createAsyncThunk } from '@reduxjs/toolkit';
import { MaindataResponse } from '../../api/generated-types/Maindata.response';
import { maindataRequest, MaindataRequestParams } from '../../api/sync';
import { validateResp } from '../../api/validation';

export const maindataThunk = createAsyncThunk(
  'sync/maindata',
  async (maindataReqParams: MaindataRequestParams): Promise<MaindataResponse> => {
    const response = await maindataRequest(maindataReqParams);
    const validatedData = await validateResp<MaindataResponse>('MaindataResponse', response.data);
    return validatedData;
  }
);
