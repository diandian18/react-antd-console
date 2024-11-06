import ls from 'store2';

/**
 * 使用map数据结构保存数据
 * set时，有最大数量限制，超出则删除第一个
 * get时，会把get的值作为最新的一个
 */
class LRUCache<K, V> {
  length: number;
  data: [K, V][]; // Map<K, V>

  constructor(length: number, data?: [K, V][]) {
    this.length = length;
    this.data = data || [];
  }

  /**
   * 设置值
   * 如果超过缓存数量限制，就删除第一个
   */
  set(key: K, value: V) {
    const { data, length } = this;
    const mapData = new Map(data);
    if (mapData.has(key)) {
      mapData.delete(key);
    }
    mapData.set(key, value);

    if (mapData.size > length) {
      const firstKey = mapData.keys().next().value as K;
      mapData.delete(firstKey);
    }
    this.data = Array.from(mapData);
  }

  get(key: K) {
    const { data } = this;
    const mapData = new Map(data);

    if (!mapData.has(key)) {
      return null;
    }

    const value = mapData.get(key) as V;
    mapData.delete(key);
    mapData.set(key, value);

    this.data = Array.from(mapData);

    return value;
  }

  remove(key: K) {
    const { data } = this;
    const mapData = new Map(data);

    if (mapData.has(key)) {
      mapData.delete(key);
    }

    this.data = Array.from(mapData);
  }
}

export interface GetOptions {
  /**
   * get时，把该值放到map的最新的位置
   */
  bellwether?: boolean
}

/**
 * 以LRU方式存储到localStorage，
 * 并提供数据的增删改查
 */
export abstract class LRULocalStorage<T, D> {
  storeKey: string;
  maxLength: number;
  /**
   * lruCache的data对象的key，lruCache格式如下:
   * {
   *   data: [[{dataKey}, {dataValue}]],
   *   length: {lruLength}
   * }
   */
  abstract getDataKey(): T;

  constructor(storeKey: string, maxLength?: number) {
    this.storeKey = storeKey;
    this.maxLength = maxLength ?? 20;
  }
  get(options?: GetOptions) {
    const { bellwether = false } = options ?? {};
    const dataKey = this.getDataKey();
    const { length = this.maxLength, data } = ls.get(this.storeKey) ?? {};
    const lruCache: LRUCache<T, D> = new LRUCache(length, data);
    const lruData = lruCache.get(dataKey);
    if (bellwether) {
      // lruCache.get后，lruCache数据顺序会发生变化，重新保存到localStorage
      ls.set(this.storeKey, lruCache);
    }
    return dataKey ? lruData : null;
  }
  set(newData: D) {
    const dataKey = this.getDataKey();
    if (dataKey) {
      const { length = this.maxLength, data } = ls.get(this.storeKey) ?? {};
      const lruCache = new LRUCache(length, data);
      lruCache.set(dataKey, newData);
      ls.set(this.storeKey, lruCache);
    }
  }
  remove() {
    const dataKey = this.getDataKey();
    if (dataKey) {
      const { length = this.maxLength, data } = ls.get(this.storeKey) ?? {};
      const lruCache = new LRUCache(length, data);
      lruCache.remove(dataKey);
      ls.set(this.storeKey, lruCache);
    }
  }
  removeAll() {
    ls.remove(this.storeKey);
  }
}

export default LRUCache;
