import { LRULocalStorage } from '../LRUCache';

export class MyLocalStorage<D> extends LRULocalStorage<string, D> {
  getDataKey() {
    return 'common'; // 可以设置动态的命名空间，例如根据路由区分。此处先先死
  }
}
