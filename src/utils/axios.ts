import { HttpException } from '@/exceptions/HttpException';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export const makeRequest = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  headers?: Record<string, string>,
): Promise<T> => {
  try {
    let finalData = data;
    let finalHeaders = headers || {};

    // Detect if the payload includes a file stream
    if (data?.file instanceof fs.ReadStream) {
      const form = new FormData();
      form.append('file', data.file);

      finalData = form;
      finalHeaders = {
        ...finalHeaders,
        ...form.getHeaders(),
      };
    }

    const config: AxiosRequestConfig = {
      method,
      url,
      headers: finalHeaders, // Use the potentially updated headers for FormData
      data: method !== 'get' ? finalData : undefined, // Use the potentially updated data (FormData) for non-GET
      httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
    };

    const response: AxiosResponse<T> = await axios(config);
    return response.data;
  } catch (error) {
    throw new HttpException(409, '', JSON.stringify(error.response?.data), 'axios.ts makeRequest');
  }
};
