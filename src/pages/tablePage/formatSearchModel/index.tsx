import TablePage from '@/components/TablePage';
import { GridAction, GridForm, GridFormItem } from 'admin-search-list';
import { omit } from '@/utils';
import { Button, Form, DatePicker, Table, Input } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { baseModel } from '@/models/base';
import { useModel } from '@zhangsai/model';
import PoweredBy from '../components/PoweredByAdminSearchList';

interface SearchModel {
  name: string;
  timeRange: [Dayjs | null, Dayjs | null];
}

// interface FormattedSearchModel {
//   name: string;
//   timeStart: string;
//   timeEnd: string;
// }

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

const CommonTablePage = () => {
  const [form] = Form.useForm<SearchModel>();
  const { t: t_tablePage } = useTranslation('tablePage');
  const language = useModel(baseModel, 'language');

  function formatSearchModel(searchModel: SearchModel) {
    const ret = omit(searchModel, ['timeRange']);
    if (!searchModel.timeRange) {
      return ret;
    }
    const [start, end] = searchModel.timeRange;
    const timeStart = start?.format('YYYY-MM-DD') ?? '';
    const timeEnd = end?.format('YYYY-MM-DD') ?? '';
    // @ts-expect-error pass
    if (timeStart) ret['timeStart'] = timeStart;
    // @ts-expect-error pass
    if (timeEnd) ret['timeEnd'] = timeEnd;
    return ret;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function formatUrlQuery(formValues: any): SearchModel {
    return {
      name: formValues.name,
      timeRange: [formValues.timeStart ? dayjs(formValues.timeStart) : null, formValues.timeEnd ? dayjs(formValues.timeEnd) : null],
    };
  }

  return (
    <TablePage<SearchModel, ListItem>
      language={language}
      formatSearchModel={formatSearchModel}
      syncUrl
      formatUrlQuery={formatUrlQuery}
      url={`/table/common`}
      searchForm={form}
      searchRender={({ SearchBtnComponent }) => {
        return (
          <GridForm
            form={form}
            initialValues={{ timeRange: [null, null] }}
          >
            <GridFormItem name="name" label={t_tablePage('姓名')}>
              <Input placeholder={t_tablePage('请输入')} />
            </GridFormItem>
            <GridFormItem name="timeRange" label={t_tablePage('时间范围')}>
              <DatePicker.RangePicker />
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
