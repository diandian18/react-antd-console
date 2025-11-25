import Back from '@/components/Back';
import { Descriptions, DescriptionsProps, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

const items: (id: string) => DescriptionsProps['items'] = (id) => [
  {
    key: '1',
    label: 'UserName',
    children: 'Zelensky',
  },
  {
    key: '2',
    label: 'Telephone',
    children: '1810000000',
  },
  {
    key: '3',
    label: 'Live',
    children: 'American Shendiyago',
  },
  {
    key: '4',
    label: 'Id',
    children: id,
  },
  {
    key: '5',
    label: 'Address',
    children: 'Sanlitun, Beijing, China',
  },
];

const items2: DescriptionsProps['items'] = [
  {
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Time',
    children: '18:00:00',
  },
  {
    label: 'Amount',
    children: '$80.00',
  },
  {
    label: 'Discount',
    span: { xl: 2, xxl: 2 },
    children: '$20.00',
  },
  {
    label: 'Official',
    span: { xl: 2, xxl: 2 },
    children: '$60.00',
  },
  {
    label: 'Config Info',
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
      </>
    ),
  },
  {
    label: 'Hardware Info',
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: (
      <>
        CPU: 6 Core 3.5 GHz
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
      </>
    ),
  },
];

const Detail = () => {
  const params = useParams();
  const { t: t_tablePage } = useTranslation('tablePage');
  return (
    <div>
      <Back title={t_tablePage('常见表格 - 详情')} backUrl={`/table/tablePage`} />
      <Space orientation="vertical" size="large">
        <Descriptions title="User Info" items={items(params.id ?? '')} />
        <Descriptions
          title="Responsive Descriptions"
          bordered
          column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
          items={items2}
        />
      </Space>
      
    </div>
  );
};

export default Detail;
