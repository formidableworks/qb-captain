import Ajv from 'ajv';
import LoginResponse from './schemas/Login.response.json';
import MaindataResponse from './schemas/Maindata.response.json';
import TorrentInfo from './schemas/TorrentInfo.json';
import TransferInfo from './schemas/TransferInfo.json';

export const qbCaptAjv = new Ajv({
  validateSchema: true,
  allErrors: true,
  schemas: {
    [LoginResponse.title]: { $async: true, ...LoginResponse },
    [MaindataResponse.title]: { $async: true, ...MaindataResponse },
    [TorrentInfo.title]: { $async: true, ...TorrentInfo },
    [TransferInfo.title]: { $async: true, ...TransferInfo },
  },
});

export async function validateResp<T>(schemaTitle: string, data: unknown): Promise<T> {
  const validData = await qbCaptAjv.validate(schemaTitle, data);
  return (validData as unknown) as T;
}
