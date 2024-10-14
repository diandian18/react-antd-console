type BlEnum = 0 | 1;

type Key = string | number;

interface Token {
  accessToken: string;
  refreshToken: string;
  /**
   * 过期时间, 单位毫秒
   */
  expiration: number;
}
