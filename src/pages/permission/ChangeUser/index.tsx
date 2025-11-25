import { useModel } from '@zhangsai/model';
import { withAuthModel } from '@/models/withAuth';
import { lsSetToken } from '@/utils/business/token';
import { Segmented, Space, Table, TableProps } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/SvgIcon';
import { message } from '@/components/AntdProvider';
import './index.less';

const options = [
  { label: 'Admin', value: 'admin' },
  { label: 'Assistant', value: 'assistant' },
];

interface DataType {
  user: string;
  route: boolean;
  local: boolean;
  btn1: boolean;
  btn2: boolean;
}

const render = (data: boolean) => data ? <SvgIcon name="checked"size={24} /> : <SvgIcon name="unchecked" size={24} />;

const data: DataType[] = [
  {
    user: 'Admin',
    route: true,
    local: true,
    btn1: true,
    btn2: true,
  },
  {
    user: 'Assistant',
    route: false,
    local: true,
    btn1: false,
    btn2: true,
  },
];

interface Props {
  type: 'route' | 'local';
}

const ChangeUser: React.FC<Props> = ({ type }) => {
  const userAccount = useModel(withAuthModel, 'userAccount');
  const [value, setValue] = useState(userAccount);
  const { t: t_permission } = useTranslation('permission');

  const columnsRouter: TableProps<DataType>['columns'] = [
    {
      title: t_permission('帐号'),
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: t_permission('路由权限页'),
      dataIndex: 'route',
      key: 'route',
      align: 'center',
      render,
    },
    {
      title: t_permission('局部权限页'),
      dataIndex: 'local',
      key: 'local',
      align: 'center',
      render,
    },
  ];

  const columnsLocal: TableProps<DataType>['columns'] = [
    {
      title: t_permission('帐号'),
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: t_permission('按钮A'),
      dataIndex: 'btn1',
      key: 'local',
      align: 'center',
      render,
    },
    {
      title: t_permission('按钮B'),
      dataIndex: 'btn2',
      key: 'local',
      align: 'center',
      render,
    },
  ];

  function onChange(value: string) {
    setValue(value);
    message.success(t_permission('切换帐号成功'));
    setTimeout(() => {
      const tokenAry: [string, string, number] = value === 'admin' ? ['aaaa', 'bbbb', 1710230387237] : ['cccc', 'dddd', 1710230387237];
      lsSetToken(...tokenAry);
      window.location.reload();
    }, 300);
  }

  return (
    <Space className="console-change-user" orientation="vertical" size="large">
      <div>
        <Segmented
          options={options}
          value={value}
          onChange={onChange}
        />
      </div>
      <Table
        columns={type === 'route' ? columnsRouter : columnsLocal}
        dataSource={data}
        rowKey="user"
        bordered
        pagination={false}
      />
    </Space>
  );
};

export default ChangeUser;
