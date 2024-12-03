# 搜索列表组件

后台管理系统一般有很多可搜索的表格页，我们提供了一款强大的组件 [admin-search-list](https://github.com/diandian18/admin-search-list)，方便快速开发，适用于多种场景

## 功能预览

- 封装了大部分逻辑，最少只需要提供 url ，搜索区域、列表区域。基本上只需要写样式即可
  - 封装了收集搜索数据、搜索、重置、分页、滚动加载、请求等逻辑
- 搜索区域是响应式的，适配各种不同宽度的设备，只需要无脑排放样式组件即可
- 列表区域可渲染任意元素，可以是表格、列表、卡片等任意元素
- 支持滚动加载和分页条两种分页模式
- 支持分页数据自动同步至 url ，刷新页面可保留分页状态
- 支持搜索区域吸顶和表头吸顶
- 支持额外参数变化时执行搜索，适用于组件外的数据作为搜索条件
- 支持格式化搜索参数
- 支持自定义搜索按钮和重置按钮样式
- 支持延迟请求，适用于进页面时不加载数据
- 支持在组件加载前预制一些搜索数据
- 支持回到顶部
- 支持自定义多语言
- 完整的 ts 类型提示

## 在线示例

- [常见表格](https://template.react-antd-console.site/table/tablePage)
- [滚动加载表格](https://template.react-antd-console.site/table/scrollLoadModeTable)
- [滚动加载列表](https://template.react-antd-console.site/table/scrollLoadModeList)
- [额外参数](https://template.react-antd-console.site/table/extraSearchModel)
- [格式化搜索参数](https://template.react-antd-console.site/table/formatSearchModel)
- [简单表格](https://template.react-antd-console.site/table/simpleTablePage)
- [自定义搜索按钮](https://template.react-antd-console.site/table/customSearchBtn)

## 通用封装

项目中所有 [admin-search-list](https://github.com/diandian18/admin-search-list) 组件一般使用同样的 `http` 请求方法，故封装

```ts
/** 请求方法类型 */
export declare type HttpGet = <Res>(url: string, options: {
    params: Record<string, Key>;
    headers?: Record<string, Key>;
}) => Promise<Res>;
```

```tsx
import AdminSearchList, { HttpGet, RefProps, SearchListProps } from 'admin-search-list';
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';

const axiosHttpGet: HttpGet = async(url, opts) => {
  return axios.get(url, {
    method: 'get',
    params: opts.params,
    headers: opts.headers,
  }).then((res) => {
    return res.data;
  });
};

const SearchList = <T extends Record<string, any>, D>(props: Omit<SearchListProps<T, D>, 'httpGet'>, ref: ForwardedRef<RefProps<D>>) => {

  const tempRef = useRef<RefProps<D>>();
  useImperativeHandle(ref, () => tempRef.current);

  return (
    <AdminSearchList
      {...props}
      ref={tempRef}
      httpGet={axiosHttpGet}
    />
  );
};

export default forwardRef(SearchList);
```

## 基本使用

```tsx
import SearchList from '@/components/SearchList';
import { GridAction, GridForm, GridFormItem, RefProps } from 'admin-search-list';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

interface SearchModel {
  a: string;
  b: string;
}

interface ListItem {
  a: string;
  b: string;
}

const columns: ColumnsType<ListItem> = [
  {
    title: '姓名',
    dataIndex: 'a',
    key: 'a',
  },
  {
    title: '邮箱',
    dataIndex: 'b',
    key: 'b',
  },
];

const SimpleDemo = () => {
  const [form] = Form.useForm<SearchModel>();
  return (
    <SearchList<SearchModel, ListItem>
      url="/table/common"
      searchForm={form}
      searchRender={({ SearchBtnComponent }) => {
        return (
          // GridForm, GridFormItem，GridAction 是 antd 的 Form 组件的封装
          // 功能完全同 antd 的 form
          // 但提供了响应式的能力
          <GridForm form={form}>
            <GridFormItem name="a" label="姓名">
              <Input />
            </GridFormItem>
            <GridFormItem name="b" label="邮箱">
              <Input />
            </GridFormItem>
            <SearchBtnComponent />
            <GridAction>
              <Button type="primary">新增</Button>
            </GridAction>
          </GridForm>
        );
      }}
      // data 的类型会被提示为 ListItem[]
      listRender={({ data }) => {
        return (
          // 你可以利用 data 渲染任意元素
          <Table
            bordered
            dataSource={data}
            columns={columns}
            pagination={false}
            key="a"
            rowKey="a"
          />
        );
      }}
    />
  );
};

export default SimpleDemo;
```

就像上面示例，我们只需要写 `url`、`searchForm`、`searchRender` 的样式和 `listRender`的样式。没有任何逻辑。`searchRender` 的函数参数还提供了 `SearchBtnComponent`，包含了搜索和重置按钮。我们无需关心点击搜索按钮时，搜索表单的数据是如何被用作请求参数的。

## 组件 API

### 组件泛型

组件有两个泛型

- `T`: 搜索的表单的类型
- `D`: 请求返回的数组项类型

### className

- 可选
- 类型: `string`

样式名

### url

- 类型: `string`

列表数据请求地址

### headers

- 可选
- 类型: `Record<string, string>`

请求头

### httpGet

- 类型: `HttpGet`

```ts
export declare type HttpGet = <Res>(url: string, options: {
    params: Record<string, Key>;
    headers?: Record<string, Key>;
}) => Promise<Res>;
```

请求方法。例如使用 `axios` 作为请求方法

```tsx
const axiosHttpGet: HttpGet = async(url, opts) => {
  return request.get(url, {
    method: 'get',
    params: opts.params,
    headers: opts.headers,
  }).then((res) => {
    return res.data;
  });
};

<SearchList
  httpGet={axiosHttpGet}
>
```

### beforeSearch

- 可选
- 类型: `() => boolean | Promise<boolean>`

请求前钩子，返回boolean决定是否执行搜索

### afterSearch

- 可选
- 类型: `(data: D[]) => void | Promise<void>`

请求后钩子

### searchForm

- 可选
- 类型: `FormProps<T>`

```ts
/** 表单属性 */
export declare interface FormProps<T> {
  getFieldsValue: () => T;
  setFieldsValue: (values: Partial<T>) => void;
  resetFields: () => void;
}
```

form表单对象。可以是 antd 的 `const [form] = Form.useForm()`

### extraSearchModel

- 可选
- 类型: `Record<string, any>`

额外的查询参数，当该参数变化时自动执行搜索至第一页

### formatSearchModel

- 可选
- 类型: `(searchModel: T) => any`
  - `searchModel` 参数: 搜索表单对象

请求前对数据格式化

### topRender

- 可选
- 类型: `ComponentType` (react 类型)

顶部区域渲染组件

### searchRender

- 可选
- 类型:

```ts
ComponentType<{
  /** 搜索当前页 */
  search: (searchParams?: SearchParams) => void;
  /** 搜索至首页 */
  searchFirstPage: () => void;
  /** 重置至首页 */
  reSearchFirstPage: () => void;
  /** 搜索按钮组件 */
  SearchBtnComponent: FC;
}>

export declare interface SearchParams {
  pageNum?: number;
  pageSize?: number;
}
```

搜索区域渲染组件。

提供了一个组件:

- `SearchBtnComponent`: 搜索按钮组件，包含了搜索和重置按钮。点击会执行搜索逻辑。

另外提供了三个搜索方法:

- `search`: 搜索当前页
- `searchFirstPage`: 搜索至首页
- `reSearchFirstPage`: 重置至首页

### searchBtn

- 可选
- 类型: `('search' | 'reset')[]`

搜索、重置按钮配置

### searchBtnRender

- 可选
- 类型: `ReactElement`

自定义搜索按钮

### resetBtnRender

- 可选
- 类型: `ReactElement`

自定义重置按钮

### searchSticky

- 可选
- 类型: `ReactElement`

搜索区域吸顶，仅在非[listScroll](./search-list#listscroll)模式下生效

### actionRender

- 可选
- 类型:

```ts
ComponentType<{
  search: (searchParams?: SearchParams) => void;
}>

export declare interface SearchParams {
  pageNum?: number;
  pageSize?: number;
}
```

操作区域渲染组件。样式上为单独一行

### beforeListRender

- 可选
- 类型:

```ts
ComponentType<{
  search: (searchParams?: SearchParams) => void;
}>

export declare interface SearchParams {
  pageNum?: number;
  pageSize?: number;
}
```

列表前区域渲染组件。样式上为单独一行

### listRender

- 可选
- 类型:

```ts
ComponentType<{
  /** 搜索返回的列表数据 */
  data: D[];
}>
```

列表区域渲染组件。
提供了 `data` 参数: 搜索请求返回的列表数据

### identifier

- 可选
- 类型: `string`
- 默认值: `data.items`

根据标示，从后端返回数据中拿到列表数据

### identifierTotal

- 可选
- 类型: `string`
- 默认值: `data.total`

根据标示，从后端返回数据中拿到列表数据总数 `total`

### paginationLeftRender

- 可选
- 类型:

```ts
ComponentType<{
  search: (searchParams?: SearchParams) => void;
}>;
```

分页左侧区域渲染组件

### scrollLoadMode

- 可选
- 类型: `boolean`
- 默认值: `false`

listRender区域使用滚动加载模式

### scrollContainer

- 可选
- 类型: `string`

滚动容器, 影响滚动加载模式和回到顶部

### listScroll

- 可选
- 类型: `boolean`
- 默认值: `true`

列表容器固定一屏高度，内容滚动。仅在 `scrollLoadMode = false` 时生效

### scrollToTop

- 可选
- 类型: `() => void`

滚动到顶部

- 在非[listScroll](./search-list#listscroll)模式下，在搜索(除了search api)后会滚顶
- 在[listScroll](./search-list#listscroll)模式下，不需要设置该值，会自动处理

### enableBackTop

- 可选
- 类型: `boolean`
- 默认值: `false`

回到顶部

### searchLater

- 可选
- 类型: `boolean`
- 默认值: `false`

是否在初始化时搜索

### hidePagination

- 可选
- 类型: `boolean`
- 默认值: `false`

是否隐藏分页条。在滚动加载模式下，将无视本属性，分页条会被强制隐藏

### paginationProps

- 可选
- 类型: `PaginationProps` (antd 类型)

antd PaginationProps 分页组件 props。详见 [antd Pagination 文档](https://ant.design/components/pagination-cn#api)

### willMount

- 可选
- 类型: `(() => void) | (() => Promise<void>)`

searchList 组件将要渲染，或者说该组件所有逻辑执行前的一个钩子，可用于根据页面 url 的 query，在搜索前预设好一些搜索项

### syncUrl

- 可选
- 类型: `boolean`
- 默认值: `false`

搜索和分页的参数是否同步在 url query 中

### formatUrlQuery

- 可选
- 类型: `(formValues: Record<string, any>) => T`

syncUrl 时, 若设置了 [formatSearchModel](./search-list#formatsearchmodel), 则需要设置此方法, 用以将 url 上的 formValues 格式化为 form 需要的值

- @param formValues url上关于搜索表单的值

### language

- 可选
- 类型: `Language | string`
- 默认值: `Language['zh_Hans']`

```ts
export enum Language {
  en = 'en',
  zh_Hans = 'zh_Hans',
}
```

当前语言

### locale

- 可选
- 类型: `Locale`

```ts
export interface Locale {
  /** 搜索按钮文本 */
  search?: string;
  /** 重置按钮文本 */
  reset?: string;
  /** 空列表文本 */
  noMore?: string;
  /** 分页条总数文本 */
  total?: string;
  /** 分页条项文本 */
  items?: string;
}

export const SEARCH_LIST_LANGUAGE: Record<string | Language, Locale> = {
  [Language.en]: {
    search: 'Search',
    reset: 'Reset',
    noMore: 'No more',
    total: 'Total',
    items: 'items',
  },
  [Language.zh_Hans]: {
    search: '查询',
    reset: '重置',
    noMore: '没有更多',
    total: '共',
    items: '条',
  },
};
```

国际化

## 组件 ref API

组件的 ref 也提供了一系列 API，可灵活运用于多场景

### search

- 类型: `(searchParams?: SearchParams) => Promise<void>`

```ts
export declare interface SearchParams {
  pageNum?: number;
  pageSize?: number;
}
```

搜索至指定页, 不传参数为当前页

### searchFirstPage

- 类型: `() => void`

搜索至第一页

### reSearchFirstPage

- 类型: `() => void`

重置至第一页

### getData

- 类型: `() => D[]`

获取搜索到的数据

### setData

- 类型: `(data: D[]) => void`

手动设置搜索到的数据

### getPageNum

- 类型: `() => number`

获取当前页码

### setPageNum

- 类型: `(num: number) => void`

获取当前是第几页

### getPageTotal

- 类型: `() => number`

获取总数

### setPageTotal

- 类型: `(total: number) => void`

设置总数

### getPageSize

- 类型: `() => number`

获取一页的数据量

### setPageSize

- 类型: `(num: number) => void`

设置一页的数据量

### scrollToListTop

- 类型: `() => void`

滚动到列表顶部，仅在[listScroll](./search-list#listscroll)模式下生效

### scrollToList

- 类型: `(top: number) => void`

滚动到列表某个高度，仅在[listScroll](./search-list#listscroll)模式下生效

### getListScrollTop

- 类型: `() => number`

获取当前列表的scrollTop，仅在[listScroll](./search-list#listscroll)模式下生效
