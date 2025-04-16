/**
 * 提供一种稍微简单一些的写法用于创建Context
 */

import { PropsWithChildren, useContext, Context as ReactContext, createContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CreateStoreParams<T extends Record<string, any>> {
  defaultValue?: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createStore<T extends Record<string, any>>(params?: CreateStoreParams<T>) {
  const { defaultValue } = params ?? {};
  const Context = createContext<T>(defaultValue ?? null!);

  function useStore() {
    return useContext(Context);
  }

  return {
    Context,
    useStore,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CreateProviderParams<T> {
  Context: ReactContext<T>;
  useValue: () => T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createProvider<T extends Record<string, any>>({ Context, useValue }: CreateProviderParams<T>) {
  const Provider = ({ children }: PropsWithChildren) => {
    const value = useValue();
    return (
      <Context value={value}>{children}</Context>
    );
  };
  return Provider;
}
