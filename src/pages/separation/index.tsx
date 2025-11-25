import withAuth from '@/components/business/withAuth';
import Back from '@/components/Back';
import { Alert, Card } from 'antd';
import { useTranslation } from 'react-i18next';

const Separation = withAuth(() => {
  const { t: t_menu } = useTranslation('menu');
  return (
    <Card style={{ height: '100%' }}>
      <Back title={t_menu('独立布局')} backUrl={`/home`} />
      <Alert title={t_menu('本页面独立于默认布局')} type="info" />
    </Card>
  );
});

export default Separation;

