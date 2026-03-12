const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBasePath(path = '') {
  if (!path.startsWith('/')) {
    return `${BASE_PATH}/${path}`.replace(/\/{2,}/g, '/');
  }
  return `${BASE_PATH}${path}` || path;
}

export default withBasePath;
