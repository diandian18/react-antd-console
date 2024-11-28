import classNames from 'classnames';
import TablePage from '@/components/TablePage';
import { GridAction, GridForm, GridFormItem, RefProps } from 'admin-search-list';
import { useScrollContainer, useListScroll, useTableSticky } from '@/hooks/useTablePage';
import { Button, Card, Form, Input, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { baseModel } from '@/models/base';
import { useModel } from '@zhangsai/model';
import PoweredBy from '../components/PoweredByAdminSearchList';
import './index.less';

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

const configTableScroll = true; // 仅在headerFixed时生效

/**
 * 额外参数
 */
const ExtraSearchModel = () => {
  const backTopTarget = useScrollContainer(configTableScroll);
  const tableSticky = useTableSticky(configTableScroll);
  const listScroll = useListScroll(configTableScroll);
  const [form] = Form.useForm<SearchModel>();
  const ref = useRef<RefProps<ListItem>>(null);
  const { t: t_tablePage } = useTranslation('tablePage');
  const language = useModel(baseModel, 'language');
  const leftList = [t_tablePage('人力资源部'), t_tablePage('财务部'), t_tablePage('销售部'), t_tablePage('市场部'), t_tablePage('技术部'), t_tablePage('运营部')];
  const [extraSearchModel, setExtraSearchModel] = useState({
    student: leftList[0],
  });

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

  async function onClickDelete() {
    const _scrollTop = ref.current?.getListScrollTop();
    await ref.current?.search();
    console.log('_scrollTop: ', _scrollTop);
    _scrollTop && ref.current?.scrollToList(_scrollTop);
  }

  // const [cur, setCur] = useState('张三');
  function onClickLeftItem(item: string) {
    // setCur(item);
    setExtraSearchModel({
      student: item,
    });
  }

  return (
    <div className="extraModel">
      <div className="extraModel__left">
        <Card>
          <div className="extraModel__header">
            <Card.Meta title={t_tablePage('部门')} description={t_tablePage('部门作为额外参数,值改变时,表格将自动搜索')} />
          </div>
          <div className="extraModel__left-list">
            {leftList.map(item => {
              return (
                <div className={classNames('extraModel__left-item', {
                  active: extraSearchModel.student === item,
                })} key={item} onClick={() => onClickLeftItem(item)}>
                  {item}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
      <TablePage<SearchModel, ListItem>
        className="extraModel__right"
        language={language}
        ref={ref}
        url={`/table/common`}
        // syncUrl
        extraSearchModel={extraSearchModel}
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
                <Button type="primary" danger onClick={onClickDelete}>{t_tablePage('删除')}</Button>
                <Button type="primary">{t_tablePage('详情')}</Button>
              </GridAction>
            </GridForm>
          );
        }}
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
    </div>
  );
};

export default ExtraSearchModel;
