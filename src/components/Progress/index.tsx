import { getRandomNumber } from '@/utils';
import NProgress from 'nprogress';
import { useLocation } from 'react-router';
import { useEffect, useRef } from 'react';
import { setNProgressColor } from './utils';
import { useModel } from '@zhangsai/model';
import { themeModel } from '@/models/theme';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

function act() {
  NProgress.start();
  NProgress.inc(getRandomNumber(0.2, 0.8));
  NProgress.done();
}

/**
 * 进度条
 */
const Progress = () => {
  const { pathname } = useLocation();
  const mountedRef = useRef(false);
  const colorPrimary = useModel(themeModel, 'colorPrimary');

  // 主题色变化时更新NProgress颜色
  useEffect(() => {
    setNProgressColor(colorPrimary, { force: mountedRef.current });
  }, [colorPrimary]);

  useEffect(() => {
    act();
    mountedRef.current = true;
  }, []);

  useEffect(() => {
    if (mountedRef.current) {
      act();
    }
  }, [pathname]);

  return null;
};

export default Progress;
