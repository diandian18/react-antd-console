import { PropsWithChildren } from "react";
import { ConfigProvider, App as AntdApp } from "antd";
import { useAntdTheme } from "./hooks";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import faIR from "antd/locale/fa_IR";
import { useModel } from "@zhangsai/model";
import { baseModel } from "@/models/base";
import { Locale } from "antd/lib/locale";
import AntdStaticFnInit from ".";
import { themeModel } from "@/models/theme";
import classNames from "classnames";
import "./index.less";

const languageMap: Record<string, Locale> = {
  ["zh_Hans"]: zhCN,
  ["en"]: enUS,
  ["fa"]: faIR,
};

const AntdProvider = ({ children }: PropsWithChildren) => {
  const language = useModel(baseModel, "language");
  const curDarkMode = useModel(themeModel, "curDarkMode");
  const antdTheme = useAntdTheme();
  return (
    <ConfigProvider
      theme={antdTheme}
      locale={languageMap[language]}
      direction={["fa"].includes(language) ? "rtl" : "ltr"}
    >
      <AntdApp
        className={classNames("console-antd-app", {
          isDark: curDarkMode,
        })}
      >
        <AntdStaticFnInit>{children}</AntdStaticFnInit>
      </AntdApp>
    </ConfigProvider>
  );
};

export default AntdProvider;
