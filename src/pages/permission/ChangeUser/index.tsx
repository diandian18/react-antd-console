import { useModel } from '@zhangsai/model';
import { withAuthModel } from '@/models/withAuth';
import { lsSetToken } from '@/utils/business/token';
import { Radio, RadioChangeEvent, Table, TableProps } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/SvgIcon';
import './index.less';

const options = [
  { label: 'admin', value: 'admin' },
  { label: 'assistant', value: 'assistant' },
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
    user: 'admin',
    route: true,
    local: true,
    btn1: true,
    btn2: true,
  },
  {
    user: 'assistant',
    route: false,
    local: true,
    btn1: false,
    btn2: true,
  },
];

const ChangeUser = () => {
  const userAccount = useModel(withAuthModel, 'userAccount');
  const [value, setValue] = useState(userAccount);
  const { t: t_permission } = useTranslation('permission');


  const columns: TableProps<DataType>['columns'] = [
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

  function onChange({ target: { value } }: RadioChangeEvent) {
    setValue(value);
    const tokenAry: [string, string, number] = value === 'admin' ? ['aaaa', 'bbbb', 1710230387237] : ['cccc', 'dddd', 1710230387237];
    lsSetToken(...tokenAry);
    window.location.reload();
  }

  return (
    <div className="console-change-user">
      <div>
        <span className="console-change-user__radio-label">{t_permission('切换帐号')}: </span>
        <Radio.Group
          options={options}
          value={value}
          onChange={onChange}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <p className="console-change-user__table-title">{t_permission('帐号权限说明')}:</p>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="user"
        bordered
        pagination={false}
      />
    </div>
  );
};

export default ChangeUser;
