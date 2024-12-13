import axios from 'axios';
import { ConfigResponse } from '@/utils/axios/type';
import {getSession} from "next-auth/react";
import {getAccessToken} from "@/utils/cookie/tokens";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session) {
    config.headers.set(
      {
        ...config.headers,
        Cookie: `accessToken=${session.access_token};`,
      },
      true,
    );
  }

  return config;
});

instance.interceptors.response.use(
  async (response) => {
    const config = response.config as ConfigResponse;
    if (config._retry) {
      const session = await getSession();
      if (session)
        await setSession(() => ({
          ...session,
          access_token: getAccessToken(config.headers.Cookie) ?? '',
        }));
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 403) {
      const session = await getSession();

      if (!originalRequest._retry && session) {
        originalRequest.headers.set(
          {
            ...originalRequest.headers,
            Cookie: `accessToken=${session.accessToken}; refreshToken=${session.refreshToken};`,
          },
          true,
        );
      }
      originalRequest._retry = true;

      return instance(originalRequest);
    }

    return Promise.reject(error);
  },
);

export { instance as axios };
