import { Model, INITIAL_STATE, Persist, persist } from '@zhangsai/model';
import i18n from '@/locales';

export class InitialState extends INITIAL_STATE {
  /** 语言 */
  @persist
  language: string = 'zh_Hans';
  /** 是否刷新中 */
  refreshing: boolean = false;
}

const initialState = new InitialState();

@Persist()
class BaseModel extends Model<InitialState> {
  constructor(initialState: InitialState) {
    super(initialState);
  }

  public async init() {}
  public destroy() {}

  setLanguage = (language: string) => {
    this.setState({ language });
    i18n.changeLanguage(language);
  };

  /** 刷新当前路由用,会更新refreshing变量 */
  refresh() {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 0);
  }
}

export default BaseModel;

/** 基础model */
export const baseModel = new BaseModel(initialState);

