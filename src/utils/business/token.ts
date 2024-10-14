import { MyLocalStorage } from './localStorage';
import type { GetOptions } from '@/utils/LRUCache';

const STORE_KEY = 'accessTokens';
const MAX_LENGTH = 20;

interface Token {
  accessToken: string;
  refreshToken: string;
  expiration: number;
}

const myLs = new MyLocalStorage<Token>(STORE_KEY, MAX_LENGTH);

/**
 * 获取当前命名空间下的token
 * 不存在，则返回''
 */
export function lsGetToken(options?: GetOptions) {
  return myLs.get(options);
}

/**
 * 设置当前命名空间下的token
 * 不在命名空间，则不设置
 * 本方法有两个副作用:
 * 1. 开始refreshToken定时器
 * 2. 更新ramToken
 */
export function lsSetToken(accessToken: string, refreshToken: string, expiration: number) {
  myLs.set({
    accessToken,
    refreshToken,
    expiration,
  });
}

/**
 * 移除当前命名空间下的token
 * 不在命名空间，则不移除
 */
export function lsRemoveToken() {
  myLs.remove();
}

/**
 * 移除localStorage中所有活动的token
 */
export function lsRemoveAllToken() {
  myLs.removeAll();
}
