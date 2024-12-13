import { getMapCookie } from '@/utils/cookie/cookie';

export const getAccessToken = (cookie: string) => {
  const mapCookies = getMapCookie(cookie);

  return mapCookies.get('accessToken');
};
