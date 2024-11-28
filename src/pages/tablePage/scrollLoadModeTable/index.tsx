import TablePage from '@/components/TablePage';
import { GridAction, GridForm, GridFormItem, RefProps } from 'admin-search-list';
import { useScrollContainer, useListScroll, useTableSticky } from '@/hooks/useTablePage';
import { Button, Form, Input, Table } from 'antd';
import { useRef } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';
import { useModel } from '@zhangsai/model';
import { baseModel } from '@/models/base';

interface SearchModel {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
}

interface ListItem {
  a: string;
  b: string;
}

// 在列表内滚动
const configListScroll = false; // 仅在headerFixed时生效

const ScrollLoadMode = () => {
  const backTopTarget = useScrollContainer(configListScroll);
  const tableSticky = useTableSticky(configListScroll);
  const listScroll = useListScroll(configListScroll);
  const [form] = Form.useForm<SearchModel>();
  const ref = useRef<RefProps<ListItem>>(null);
  const { t: t_tablePage } = useTranslation('tablePage');
  const language = useModel(baseModel, 'language');

  const columns: ColumnsType<ListItem> = [
    {
      title: t_tablePage('姓名'),
      dataIndex: 'a',
      key: 'a',
    },
    {
      title: t_tablePage('邮箱'),
      dataIndex: 'b',
      key: 'b',
    },
  ];

  return (
    <TablePage<SearchModel, ListItem>
      language={language}
      ref={ref}
      url={`/table/common`}
      searchForm={form}
      searchRender={({ SearchBtnComponent }) => {
        return (
          <GridForm
            form={form}
          >
            <GridFormItem name="a" label={t_tablePage('姓名')}>
              <Input placeholder={t_tablePage('请输入')} />
            </GridFormItem>
            <GridFormItem name="b" label={t_tablePage('姓名')}>
              <Input placeholder={t_tablePage('请输入')} />
            </GridFormItem>
            <GridFormItem name="c" label={t_tablePage('姓名')}>
              <Input placeholder={t_tablePage('请输入')} />
            </GridFormItem>
            <GridFormItem name="d" label={t_tablePage('姓名')}>
              <Input placeholder={t_tablePage('请输入')} />
            </GridFormItem>
            <GridFormItem name="e" label={t_tablePage('姓名')}>
              <Input placeholder={t_tablePage('请输入')} />
            </GridFormItem>
            <GridFormItem name="f" label={t_tablePage('姓名')}>
              <Input placeholder={t_tablePage('请输入')} />
            </GridFormItem>
            <SearchBtnComponent />
            <GridAction>
              <Button type="primary">{t_tablePage('新增')}</Button>
              <Button type="primary">{t_tablePage('编辑')}</Button>
              <Button type="primary">{t_tablePage('日志')}</Button>
              <Button type="primary">{t_tablePage('导出')}</Button>
            </GridAction>
          </GridForm>
        );
      }}
      listScroll={listScroll}
      scrollLoadMode
      scrollContainer={backTopTarget}
      enableBackTop
      listRender={({ data }) => {
        return (
          <Table
            bordered
            dataSource={data}
            columns={columns}
            pagination={false}
            key="a"
            rowKey="a"
            sticky={tableSticky}
          />
        );
      }}
    />
  );
};

export default ScrollLoadMode;
