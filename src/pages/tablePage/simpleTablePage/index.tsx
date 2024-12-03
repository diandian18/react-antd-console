import TablePage from '@/components/TablePage';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';
import { baseModel } from '@/models/base';
import { useModel } from '@zhangsai/model';
import PoweredBy from '../components/PoweredByAdminSearchList';

interface SearchModel {
  a: string;
  b: string;
}

interface ListItem {
  a: string;
  b: string;
}

/**
 * 简单使用TablePage
 */
const SimpleTablePage = () => {
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
      url={`/table/common`}
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

export default SimpleTablePage;
