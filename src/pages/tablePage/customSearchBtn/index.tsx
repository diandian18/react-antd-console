import TablePage from '@/components/TablePage';
import { GridAction, GridForm, GridFormItem } from 'admin-search-list';
import { Button, Card, Form, Input, Select, Switch, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { baseModel } from '@/models/base';
import { useModel } from '@zhangsai/model';
import PoweredBy from '../components/PoweredByAdminSearchList';

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

const CommonTablePage = () => {
  const [form] = Form.useForm<SearchModel>();
  const [order, setOrder] = useState<('search' | 'reset')[]>(['search', 'reset']);
  const [isCustom, setIsCustom] = useState(true);

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

  function onChangeOrder(value: ('search' | 'reset')[]) {
    setOrder(value);
  }

  const topRender = useMemo(() => {
    return () => {
      return (
        <Card title={t_tablePage('自定义搜索按钮')}>
          <span>{t_tablePage('按钮顺序')}: </span>
          <Select mode="multiple" style={{
            width: '200px',
          }} onChange={onChangeOrder} options={[{
            label: 'search',
            value: 'search',
          }, {
            label: 'reset',
            value: 'reset',
          }]} defaultValue={['search', 'reset']} />
          <span style={{ marginLeft: '16px' }}>{t_tablePage('自定义渲染')}: </span>
          <Switch onChange={(checked: boolean) => {
            console.log(checked);
            setIsCustom(checked);
          }} checkedChildren={t_tablePage('自定义')} unCheckedChildren={t_tablePage('默认')} defaultChecked />
        </Card>
      );
    };
  }, [t_tablePage]);

  return (
    <TablePage<SearchModel, ListItem>
      searchBtnRender={isCustom ? <button>My search</button> : undefined}
      resetBtnRender={isCustom ? <button>My reset</button> : undefined}
      searchBtn={order}
      topRender={topRender}

      language={language}
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
              <Button type="primary">{t_tablePage('详情')}</Button>
            </GridAction>
          </GridForm>
        );
      }}
      listRender={({ data }) => {
        return (
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
      paginationLeftRender={() => <PoweredBy />}
    />
  );
};

export default CommonTablePage;
