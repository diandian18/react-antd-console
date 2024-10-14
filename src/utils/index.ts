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
