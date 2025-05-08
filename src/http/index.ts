import axios from 'axios';
import { statusClass } from './utils';
import type { AxiosResponse, AxiosError, AxiosInstance } from '@/http/axios.d';
import { lsGetToken } from '@/utils/business/token';
import { message } from '@/components/AntdProvider';
import router from '@/router';
import { t } from 'i18next';

const { VITE_API_HOST } = import.meta.env;

type StatusHandlers = Record<string, (data: ResType) => void>;

type CodeHandlers = Record<string, (data: ResType) => void>;

/**
 * 后端响应体约定
 */
interface ResType {
  code: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  message: string;
}

function handle401() {
  router.push('/login');
}

const statusMap: StatusHandlers = {
  '401': handle401,
  '403': () => {},
  '404': () => {},
  '409': () => {},
  '5xx': () => {},
};

const codeMap: CodeHandlers = {
  '100041': handle401,
  '100046': handle401,
};

const request: AxiosInstance = axios.create({
  // 本地开发若要修改环境，请移步至 .env.localhost 文件中
  baseURL: VITE_API_HOST,
  // withCredentials: true, // 跨域要把这个注释
  timeout: 15000,
});

request.interceptors.request.use(
  (config) => {
    const { accessToken = '' } = lsGetToken() || {};
    if (config.headers && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response: AxiosResponse<ResType>) => {
    const { code, message: resMessage } = response.data;
    const { silence = false, ignoreResponseIC = false } = response.config;

    if (ignoreResponseIC) {
      return response;
    }
    if (code !== '200') {
      if (!silence && typeof resMessage === 'string') {
        message.error(resMessage);
      }
      return Promise.reject(new Error(resMessage || `Http error, code is ${code}`));
    }

    return response;
  },
  (error: AxiosError<ResType>) => {
    const { code, response } = error;
    if (code === 'ERR_NETWORK') {
      message.error(t('http:请检查网络'));
      return Promise.reject(error);
    }
    console.log('http interceptors response error: ', error);
    const { status, data/* , headers */ } = response!; // 后端返回的http状态码、响应体、相应头
    const { silence = false, ignoreResponseIC = false } = error.config || {};
    if (ignoreResponseIC) {
      return Promise.reject(error);
    }

    /**
     * 后端返回http状态码通用处理
     */
    if (status !== 200) {
      if (!silence && typeof data.message === 'string' && data.message) {
        message.error(data.message);
      }

      /**
       * http状态码单独处理
       */
      const statusHandler = statusMap[statusClass(status)];
      if (typeof statusHandler === 'function') {
        statusHandler(data);
      }

      if (data.code && data.code !== '200') {
        /**
         * 业务code码单独处理
         */
        const codeHanlder = codeMap[data.code];
        if (typeof codeHanlder === 'function') {
          codeHanlder(data);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default request;
