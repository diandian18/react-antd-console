import TablePage from '@/components/TablePage';
import { Button, Modal, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { baseModel } from '@/models/base';
import { useModel } from '@zhangsai/model';
import PoweredBy from '../components/PoweredByAdminSearchList';

interface ListItem {
  a: string;
  b: string;
}

/**
 * 弹窗内使用TablePage
 */
const TablePageInModal = () => {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div style={{
      textAlign: 'center',
    }}>
      <Space orientation="vertical" size="large">
        <div>{t_tablePage('TalbePage也可以用在弹窗里, 或更多地方')}</div>
        <div>
          <Button type="primary" onClick={showModal}>
            {t_tablePage('打开弹窗')}
          </Button>
        </div>
      </Space>
      <Modal
        title={t_tablePage('弹窗内TablePage')}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        styles={{
          body: {
            height: '500px',
          },
        }}
      >
        <TablePage<Record<string, never>, ListItem>
          language={language}
          url={`/table/common`}
          topRender={() => <PoweredBy />}
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
        />
      </Modal>
    </div>
  );
};

export default TablePageInModal;
