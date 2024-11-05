export function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export function isTrue(val: 0 | 1) {
  return !!val;
}

export function enumer(val: boolean): BlEnum {
  return val ? 1 : 0;
}

/**
 * 获取随机字符串
 */
export function getRandomString(options?: {
  prefix?: string;
  timestamp?: boolean;
  length?: number;
}) {
  const { prefix, timestamp, length = 6 } = options ?? {};
  const prefixChar = prefix ? `${prefix}_` : '';
  const timestampChar = timestamp ? `${new Date().getTime()}_` : '';
  const stringChar = Math.random().toString(36).slice(-length);
  return `${prefixChar}${timestampChar}${stringChar}`;
}

interface GetRandomNumberOptions {
  toFixed?: number;
}

export function getRandomNumber(max: number, min: number, options?: GetRandomNumberOptions) {
  const { toFixed = 0 } = options ?? {};
  return Number((Math.random() * (max - min) + min).toFixed(toFixed));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function omit<T extends Record<string, any>, K extends keyof T>(source: T, keys: K[]): Omit<T, K> {
  // return Object.keys(source).reduce((target: Partial<T>, nowKey: K) => {
  //   if (!keys.includes(nowKey)) {
  //     target[nowKey] = source[nowKey];
  //   }
  //   return target;
  // }, {} as Partial<T>);
  const ret = {} as Omit<T, K>;
  Object.keys(source).forEach(key => {
    if (!(keys as string[]).includes(key)) {
      // @ts-expect-error pass
      ret[key] = source[key];
    }
  });
  return ret;
}

export function omitBy<T extends Record<string, unknown>>(
  source: T,
  filterFn: (v: unknown) => boolean,
) {
  return Object.keys(source).reduce((target: T, nowKey: keyof T) => {
    if (!filterFn(source[nowKey])) target[nowKey] = source[nowKey];
    return target;
  }, {} as T);
}

export function getUrlQuery(key: string): string | undefined;
export function getUrlQuery(): Record<string, string>;
export function getUrlQuery(key?: string) {
  const queryStr = window.location.search.replace(/^\?/, '');
  const queryAry = queryStr ? queryStr.split('&').map(item => item.split('=')) : [];
  // @ts-expect-error pass
  const queryMap = new Map<string, string>(queryAry);
  if (key) {
    const val = queryMap.get(key);
    return val ? decodeURIComponent(val) : undefined;
  } else {
    return Object.fromEntries(queryMap);
  }
}
