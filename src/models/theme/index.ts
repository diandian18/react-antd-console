import { Model, INITIAL_STATE, Persist, persist } from '@zhangsai/model';
import { defaultDarkMode, defaultLightMode, setScrollStyle } from '@/utils/scrollStyle';
import { setCssVar } from '@/utils/setCssVar';

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
     * 并同步至antd的暗色主题的 colorBgLayout
     */
    '--layout-background-color': '#edeff0',
    /**
     * 容器背景色.
     * 并同步至antd的亮色主题的 colorBgContainer
     */
    '--container-background-color': '#fff',
  },
  dark: {
    '--layout-background-color': '#121212',
    '--container-background-color': '#1e1e1e',
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
    setCssVar({ '--color-primary': initialState.colorPrimary });
    // 初始化亮/暗模式对应的色值(布局背景色/容器背景色)至css变量
    this._updateThemeColors();
    // 初始化亮/暗模式对应的滚动条颜色
    this._updateScrollStyle();

    this.watch('colorPrimary', (value) => {
      // 同步主色至css变量
      setCssVar({ '--color-primary': value as string });
    });

    this.watch('curDarkMode', () => {
      // 同步亮/暗模式对应的色值(布局背景色/容器背景色)至css变量
      this._updateThemeColors();
      // 同步亮/暗模式对应的滚动条颜色
      this._updateScrollStyle();
    });

    this.watch('colorBlindness', () => {
      // 同步色盲颜色
      this._updateColorBlindness();
    });
  }
  init() {}
  destroy() {}
  _updateThemeColors() {
    const { curDarkMode } = this.state;
    setCssVar(themeColors[curDarkMode ? 'dark' : 'light']);
  }
  _updateScrollStyle() {
    const { curDarkMode } = this.state;
    setScrollStyle({
      style: curDarkMode ? defaultDarkMode : defaultLightMode,
      force: true,
    });
  }
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
