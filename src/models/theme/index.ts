import { Model, INITIAL_STATE, Persist, persist } from '@zhangsai/model';
import { defaultDarkMode, defaultLightMode, setScrollStyle } from '@/utils/scrollStyle';
import { setCssVar } from '@/utils/setCssVar';
import { theme } from 'antd';
import { getAntdThemeConfigByThemeModel } from '@/components/AntdProvider/hooks';

/**
 * themeVars 和 themeColors 预设在这个两个对象的css变量中,
 * 主色预设在 InitialState.colorPrimary 中,并且其相关算法色会根据该主色同步至css变量中
 */
export const themeVars = {
  /** 布局模块间距 */
  '--layout-gutter': '8px',
  /** 布局模块圆角 */
  '--layout-border-radius': '12px',
}

export const themeColors = {
  light: {
    /**
     * 布局背景色.
     * 并同步至antd的亮色主题的 colorBgLayout
     */
    '--layout-background-color': '#edeff0',
    /**
     * 容器背景色.
     * 并同步至antd的亮色主题的 colorBgContainer
     */
    '--container-background-color': '#fff',
    /** 布局阴影 */
    '--layout-box-shdow': '0px 3px 4px #ddd',
  },
  dark: {
    '--layout-background-color': '#121212',
    '--container-background-color': '#202020',
    '--layout-box-shdow': 'none',
  },
};

export class InitialState extends INITIAL_STATE {
  /** 当前是否深色 */
  @persist
  curDarkMode: boolean = false;
  /** 主题色 */
  @persist
  colorPrimary: string = '#1677ff'; // 取的antd的默认主色 colorPrimary
  /** 色弱 */
  @persist
  colorBlindness: boolean = false;
}

const initialState = new InitialState();

@Persist()
class Theme extends Model<InitialState> {
  static className?: string = 'theme';
  constructor(initialState: InitialState) {
    super(initialState);

    // 初始化主题css变量
    setCssVar(themeVars);
    // 初始化主色至css变量
    this._setCssVarThemeColorPrimary(initialState.colorPrimary);

    // 初始化亮/暗模式对应的色值(布局背景色/容器背景色)至css变量
    this._setCssVarThemeColors();
    // 初始化亮/暗模式对应的滚动条颜色
    this._updateScrollStyle();

    this.watch('colorPrimary', (value) => {
      // 同步主色至css变量
      this._setCssVarThemeColorPrimary(value as string);
    });

    this.watch('curDarkMode', () => {
      // 同步亮/暗模式对应的色值(布局背景色/容器背景色)至css变量
      this._setCssVarThemeColors();
      // 同步亮/暗模式对应的滚动条颜色
      this._updateScrollStyle();
      // 同步antd主色算法色
      this._setCssVarThemeColorPrimaryAlgorithm();
    });

    this.watch('colorBlindness', () => {
      // 同步色盲颜色
      this._updateColorBlindness();
    });
  }
  init() {}
  destroy() {}
  /** 更新预设的主题颜色 */
  _setCssVarThemeColors() {
    const { curDarkMode } = this.state;
    setCssVar(themeColors[curDarkMode ? 'dark' : 'light']);
  }
  /** 设置antd的主色相关css变量 */
  _setCssVarThemeColorPrimary(colorPrimary: string) {
    setCssVar({
      '--console-antd-colorPrimary': colorPrimary,
    });
    this._setCssVarThemeColorPrimaryAlgorithm();
  }
  /** 更新antd的算法颜色 */
  _setCssVarThemeColorPrimaryAlgorithm() {
    const { curDarkMode, colorPrimary } = this.state;
    const antdThemeConfig = getAntdThemeConfigByThemeModel(curDarkMode, colorPrimary);
    const colorPrimaryBg = theme.getDesignToken(antdThemeConfig)['colorPrimaryBg'];
    setCssVar({
      '--console-antd-colorPrimaryBg': colorPrimaryBg,
    });
  }
  /** 更新滚动条主题颜色 */
  _updateScrollStyle() {
    const { curDarkMode } = this.state;
    setScrollStyle({
      style: curDarkMode ? defaultDarkMode : defaultLightMode,
      force: true,
    });
  }
  /** 更新色弱色 */
  _updateColorBlindness() {
    const { colorBlindness } = this.state;
    document.body.style.filter = colorBlindness ? 'invert(80%)' : 'unset';
    // @ts-expect-error pass
    document.body.style['-webkit-filter'] = colorBlindness ? 'invert(80%)' : 'unset';
  }
  /** 设置themeModel的state */
  public setThemeState(_theme: Partial<InitialState> | ((draft: InitialState) => void)) {
    this.setState(_theme);
  }
}

export const themeModel = new Theme(initialState);
