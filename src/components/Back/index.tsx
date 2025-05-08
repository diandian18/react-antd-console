import { Divider } from 'antd';
import router, { history } from '@/router';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import SvgIcon from '@/components/SvgIcon';
import './index.less';

interface Props {
  title?: string;
  backUrl?: string;
}

/**
 * 页面返回
 */
const Back: FC<Props> = ({ title, backUrl }) => {
  const { t: t_components } = useTranslation('components');

  function onClickBack() {
    if (backUrl) {
      router.push(backUrl);
    } else {
      history.back();
    }
  }

  return (
    <div className="console__back">
      <span className="console__back-action" onClick={onClickBack}>
        <SvgIcon className="console__back-icon" name="back" />
        {t_components('返回')}
      </span>
      {title && <>
        <Divider type="vertical" orientationMargin={60} />
        <h3>{title}</h3>
      </>}
    </div>
  );
};

export default Back;
