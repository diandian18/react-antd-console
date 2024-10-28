import { Alert } from 'antd';
import { useTranslation } from 'react-i18next';

const SingleSider = () => {
  const { t: t_menu } = useTranslation('menu');
  return (
    <Alert message={t_menu('单栏示例')} type="info"></Alert>
  );
};

export default SingleSider;
