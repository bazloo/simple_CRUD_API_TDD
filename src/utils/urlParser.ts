import url from 'node:url';
import routes from '../routes';

const SLASHES_PATTERN = /^\/+|\/+$/g;

export default function parseUrl(urlString: string | undefined): [string, string] {
  let route = '';
  let possibleUrlParam = '';

  if (urlString) {
    const parsedUrl = url.parse(urlString, true);
    let sanitizedUrl = parsedUrl.pathname as string;
    sanitizedUrl = sanitizedUrl.replace(SLASHES_PATTERN, '');

    Object.keys(routes).forEach((existingRoute) => {
      if (new RegExp(`^${existingRoute}`).test(sanitizedUrl)) {
        route = existingRoute;
      }
    });

    // in our case, we expected the id only
    possibleUrlParam = sanitizedUrl
      .replace(route, '')
      .replace(SLASHES_PATTERN, '');
  }

  return [route, possibleUrlParam];
}
