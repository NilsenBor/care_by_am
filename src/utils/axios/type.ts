import { InternalAxiosRequestConfig } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConfigResponse = InternalAxiosRequestConfig<any> & {
  _retry?: boolean;
};
