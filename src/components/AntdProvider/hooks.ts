import { useModel } from '@zhangsai/model';
import { themeColors, themeModel } from '@/models/theme';
import { ThemeConfig, theme } from 'antd';

export function getAntdThemeConfigByThemeModel(isDark: boolean, colorPrimary: string) {
  return {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary,
      colorBgLayout: isDark ? themeColors.dark['--layout-background-color'] : themeColors.light['--layout-background-color'],
      colorBgContainer: isDark ? themeColors.dark['--container-background-color'] : themeColors.light['--container-background-color'],
    },
  };
}

/** 根据themeModel映射一份antd theme的配置 */
export function useAntdTheme(darkMode?: boolean): ThemeConfig {
  const curDarkMode = useModel(themeModel, 'curDarkMode');
  const colorPrimary = useModel(themeModel, 'colorPrimary');
  const isDark = (darkMode ?? curDarkMode);

  return getAntdThemeConfigByThemeModel(isDark, colorPrimary);
}
