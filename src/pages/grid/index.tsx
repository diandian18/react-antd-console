import { Alert, Card, Col, Grid, Row, Table } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useModel } from '@zhangsai/model';
import { themeModel } from '@/models/theme';
import './index.less';

const { useBreakpoint } = Grid;

const cardConfig = {
  xs: { flex: '100%' },
  sm: { flex: '50%' },
  md: { flex: '50%' },
  lg: { flex: '50%' },
  xl: { flex: '25%' },
};

const chartConfig = {
  xs: { flex: '100%' },
  sm: { flex: '100%' },
  md: { flex: '50%' },
  lg: { flex: '50%' },
  xl: { flex: '50%' },
  xxl: { flex: '25%' },
};

const Item = () => {
  const colorPrimary = useModel(themeModel, 'colorPrimary');
  return (
    <div className="console-grid__item" style={{ backgroundColor: colorPrimary }} />
  );
};

const GridPage = () => {
  const { t: t_grid } = useTranslation('grid');
  const screens = useBreakpoint();
  const currentSize = useMemo(() => {
    const sizes = Object.entries(screens)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, bl]) => !!bl);
    return sizes[sizes.length - 1];
  }, [screens]);
  return (
    <div className="console-grid">
      <Alert title={t_grid('改变窗口宽度，观察布局的变化')} type="info" showIcon />
      <div style={{ marginTop: '24px' }}>
        {t_grid('当前尺寸')}: <strong>{currentSize}</strong>
      </div>
      <Card title={t_grid('第一排')} style={{ marginTop: '30px' }}>
        <Row gutter={24} {...cardConfig}>
          <Col {...cardConfig}>
            <Item />
          </Col>
          <Col {...cardConfig}>
            <Item />
          </Col>
          <Col {...cardConfig}>
            <Item />
          </Col>
          <Col {...cardConfig}>
            <Item />
          </Col>
        </Row>
      </Card>
      <Card title={t_grid('第二排')} style={{ marginTop: '30px' }}>
        <Row gutter={24}>
          <Col {...chartConfig}>
            <Item />
          </Col>
          <Col {...chartConfig}>
            <Item />
          </Col>
          <Col {...chartConfig}>
            <Item />
          </Col>
          <Col {...chartConfig}>
            <Item />
          </Col>
        </Row>
      </Card>
      <Table columns={[{
        title: t_grid('尺寸'),
        dataIndex: 'size',
        key: 'size',
      }, {
        title: t_grid('备注'),
        dataIndex: 'remark',
        key: 'remark',
      }]} dataSource={[{
        size: 'xs',
        remark: `${t_grid('屏幕')} < 576px`,
      }, {
        size: 'sm',
        remark: `${t_grid('屏幕')} ≥ 576px`,
      }, {
        size: 'md',
        remark: `${t_grid('屏幕')} ≥ 768px`,
      }, {
        size: 'lg',
        remark: `${t_grid('屏幕')} ≥ 992px`,
      }, {
        size: 'xl',
        remark: `${t_grid('屏幕')} ≥ 1200px`,
      }, {
        size: 'xxl',
        remark: `${t_grid('屏幕')} ≥ 1600px`,
      }]} rowKey="size" pagination={false} bordered style={{ marginTop: '24px' }} />
    </div>
  );
};

export default GridPage;
