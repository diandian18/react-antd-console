import { Card, CardProps, Col, Row } from 'antd';
import CountUp from 'react-countup';
import DemoColumn from './Column';
import DemoPie from './Pie';
import DemoBar from './Bar';
import DemoLine from './Line';
import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/SvgIcon';
import './index.less';

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

interface ChartsWrapProps {
  cardProps: CardProps;
}

const ChartsWrap = (props: PropsWithChildren<ChartsWrapProps>) => {
  return (
    <Col
      className="console-home__charts-wrap-col"
      {...chartConfig}
    >
      <Card {...props.cardProps}>
        {props.children}
      </Card>
    </Col>
  );
};

const Home = () => {
  const { t: t_home } = useTranslation('home');
  return (
    <div className="console-home">
      <Row gutter={24}>
        <Col {...cardConfig}>
          <Card className="console-home__card" title={t_home('报名')}>
            <div className="console-home__card-left">
              <p>{t_home('累计')} <CountUp end={232} /> {t_home('人')}</p>
              <p>{t_home('较昨日')} <SvgIcon className="console-home__icon-rise" name="rise" /> <span><CountUp end={36} />%</span></p>
            </div>
            <div className="console-home__card-right">
              <SvgIcon name="signup" color="#1677ff" size={48} />
            </div>
          </Card>
        </Col>
        <Col {...cardConfig}>
          <Card className="console-home__card" title={t_home('签到')}>
            <div className="console-home__card-left">
              <p>{t_home('累计')} <CountUp end={546} /> {t_home('人')}</p>
              <p>{t_home('较昨日')} <SvgIcon className="console-home__icon-fall" name="fall" /> <span><CountUp end={2} />%</span></p>
            </div>
            <div className="console-home__card-right">
              <SvgIcon name="sign" color="#1677ff" size={48} />
            </div>
          </Card>
        </Col>
        <Col {...cardConfig}>
          <Card className="console-home__card" title={t_home('驻留')}>
            <div className="console-home__card-left">
              <p>{t_home('累计')} <CountUp end={6788} /> {t_home('分钟')}</p>
              <p>{t_home('较昨日')} <SvgIcon className="console-home__icon-rise" name="rise" /> <span><CountUp end={178} />%</span></p>
            </div>
            <div className="console-home__card-right">
              <SvgIcon name="stay" color="#1677ff" size={48} />
            </div>
          </Card>
        </Col>
        <Col {...cardConfig}>
          <Card className="console-home__card" title={t_home('互动')}>
            <div className="console-home__card-left">
              <p>{t_home('累计')} <CountUp end={380} /> {t_home('次')}</p>
              <p>{t_home('较昨日')} <SvgIcon className="console-home__icon-fall" name="fall" /> <span><CountUp end={26} />%</span></p>
            </div>
            <div className="console-home__card-right">
              <SvgIcon name="interact" color="#1677ff" size={48} />
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={24}>
        <ChartsWrap cardProps={{
          title: t_home('柱状图'),
        }}>
          <DemoColumn />
        </ChartsWrap>
        <ChartsWrap cardProps={{
          title: t_home('折线图'),
        }}>
          <DemoLine />
        </ChartsWrap>
        <ChartsWrap cardProps={{
          title: t_home('条形图'),
        }}>
          <DemoBar />
        </ChartsWrap>
        <ChartsWrap cardProps={{
          title: t_home('饼图'),
        }}>
          <DemoPie />
        </ChartsWrap>
      </Row>
    </div>
  );
};

export default Home;
