import { PropsWithChildren } from 'react';
import { ConfigProvider, App as AntdApp } from 'antd';
import { useAntdTheme } from './hooks';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { useModel } from '@zhangsai/model';
import { baseModel } from '@/models/base';
import { Locale } from 'antd/lib/locale';
import AntdStaticFnInit from '.';
import './index.less';

const languageMap: Record<string, Locale> = {
  ['zh_Hans']: zhCN,
  ['en']: enUS,
};

const AntdProvider = ({ children }: PropsWithChildren) => {
  const language = useModel(baseModel, 'language');
  const antdTheme = useAntdTheme();
  return (
    <ConfigProvider theme={antdTheme} locale={languageMap[language]}>
      <AntdApp className="console-antd-app">
        <AntdStaticFnInit>
          { children }
        </AntdStaticFnInit>
      </AntdApp>
    </ConfigProvider>
  );
};

export default AntdProvider;
