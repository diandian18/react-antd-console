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
