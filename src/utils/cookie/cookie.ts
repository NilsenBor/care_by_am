export const getMapCookie = (cookie: string) => {
  const array = cookie.split('; ');
  const map = new Map<string, string>();
  for (const str of array) {
    const [name, value] = str.split('=');
    map.set(name, value);
  }
  return map;
};
