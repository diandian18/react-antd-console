import SearchList, { HttpGet, RefProps, SearchListProps } from 'admin-search-list';
import request from '@/http';
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';

const axiosHttpGet: HttpGet = async(url, opts) => {
  return request.get(url, {
    method: 'get',
    params: opts.params,
    headers: opts.headers,
  }).then((res) => {
    return res.data;
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TablePage = <T extends Record<string, any>, D>(props: Omit<SearchListProps<T, D>, 'httpGet'>, ref: ForwardedRef<RefProps<D>>) => {

  const tempRef = useRef<RefProps<D>>(null);
  // @ts-expect-error who can help?
  useImperativeHandle(ref, () => tempRef.current);

  return (
    <SearchList
      {...props}
      ref={tempRef}
      httpGet={axiosHttpGet}
    />
  );
};

export default forwardRef(TablePage);