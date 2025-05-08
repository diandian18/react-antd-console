import TablePage from '@/components/TablePage';
import { GridAction, GridForm, GridFormItem, RefProps } from 'admin-search-list';
import { tab_title } from '@/consts';
import { useScrollContainer, useListScroll, useTableSticky } from '@/hooks/useTablePage';
import { useModel } from '@zhangsai/model';
import { baseModel } from '@/models/base';
import router from '@/router';
import { Button, Form, Input, Popconfirm, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PoweredBy from './components/PoweredByAdminSearchList';

interface SearchModel {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
}

interface ListItem {
  id: number,
  a: string;
  b: string;
  action: string;
}

// 在列表内滚动
const configListScroll = false; // 仅在headerFixed时生效

const CommonTablePage = () => {
  const backTopTarget = useScrollContainer(configListScroll);
  // console.log('backTopTarget: ', backTopTarget);
  const tableSticky = useTableSticky(configListScroll);
  const listScroll = useListScroll(configListScroll);
  const [form] = Form.useForm<SearchModel>();
  const ref = useRef<RefProps<ListItem>>(null);
  const { t: t_tablePage } = useTranslation('tablePage');
  const language = useModel(baseModel,  'language');

  async function onClickDelete(record: ListItem) {
    console.log({ record });
    const _scrollTop = ref.current?.getListScrollTop();
    await ref.current?.search();
    console.log('_scrollTop: ', _scrollTop);
    _scrollTop && ref.current?.scrollToList(_scrollTop);
  }

  function onClickDetail(record: ListItem) {
    router.push(`/table/tablePage/${record.id}?${tab_title}=${record.a}`);
  }

  // eslint-disable-next-line
  function onClickEdit(record: ListItem) {

  }

  const columns: ColumnsType<ListItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
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
    {
      title: t_tablePage('操作'),
      key: 'action',
      width: 220,
      render: (_, record) => (
        <Space size="middle">
          <Button size="small" type="link" onClick={() => onClickDetail(record)}>{t_tablePage('详情')}</Button>
          <Button size="small" type="link" onClick={() => onClickEdit(record)}>{t_tablePage('编辑')}</Button>
          <Popconfirm
            title={t_tablePage('确认删除吗？')}
            description={t_tablePage('删除后保持滚动条位置')}
            onConfirm={() => onClickDelete(record)}
          >
            <Button size="small" type="link" danger>{t_tablePage('删除')}</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <TablePage<SearchModel, ListItem>
      language={language}
      ref={ref}
      url={`/table/common`}
      syncUrl
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
              <Button type="primary">{t_tablePage('详情')}</Button>
            </GridAction>
          </GridForm>
        );
      }}
      // beforeSearch={() => Promise.resolve(true)}
      // afterSearch={(data) => {
      //   console.log(data);
      //   return Promise.resolve();
      // }}
      // topRender={() => <div>topRender</div>}
      // actionRender={() => {
      //   return (
      //     <>
      //       <Button type="primary">新增</Button>
      //       <Button type="primary">编辑</Button>
      //       <Button type="primary" danger>删除</Button>
      //       <Button type="primary">日志</Button>
      //       <Button type="primary">详情</Button>
      //       <Button type="primary">详情</Button>
      //       <Button type="primary">详情</Button>
      //     </>
      //   );
      // }}
      // beforeTableRender={() => {
      //   return (
      //     <div>123321</div>
      //   );
      // }}
      // searchLater
      // scrollLoadMode
      // hidePagination
      // searchSticky
      listScroll={listScroll}
      listRender={({ data }) => {
        return (
          <Table
            bordered
            sticky={tableSticky}
            dataSource={data}
            columns={columns}
            pagination={false}
            key="a"
            rowKey="a"
          />
        );
      }}
      enableBackTop
      scrollContainer={backTopTarget}
      paginationLeftRender={() => <PoweredBy />}
    />
  );
};

export default CommonTablePage;
