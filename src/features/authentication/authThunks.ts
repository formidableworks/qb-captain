import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest, LoginRequestParams, logoutRequest } from '../../api/auth';
import { LoginResponse } from '../../api/generated-types/Login.response';
import { validateResp } from '../../api/validation';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (loginRequestParams: LoginRequestParams): Promise<LoginResponse> => {
    const response = await loginRequest(loginRequestParams);
    const validatedData = await validateResp<LoginResponse>('LoginResponse', response.data);
    return validatedData;
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (): Promise<void> => {
    await logoutRequest();
  }
);
