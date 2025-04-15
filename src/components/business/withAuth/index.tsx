import Loading from '@/components/Loading';
import { useModel } from '@zhangsai/model';
import { withAuthModel } from '@/models/withAuth';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { usePrevious } from 'react-use';

/**
 * 需要鉴权的组件可用本HOC包裹
 */
const withAuth = <T extends Record<string, unknown>>(Component: React.ComponentType<T>) => {
  // 务必声明一个大驼峰的变量,否则热更新不会生效
  // 参见: https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports
  // https://remix.run/docs/en/main/discussion/hot-module-replacement
  const Auth = (props: T) => {
    const loading = useModel(withAuthModel, 'loading');
    const previusLoading = usePrevious(loading);
    const location = useLocation();

    useEffect(() => {
      (async function() {
        await withAuthModel.init();
      })();
    }, [location.pathname]);

    // previusLoading为了确保只执行第一次的loading,从而忽略热更新导致的loading重置为true
    if (previusLoading === undefined && loading) {
      return <Loading />;
    }

    return (
      <Component {...props} />
    ); 
  };

  return Auth;
};

export default withAuth;
