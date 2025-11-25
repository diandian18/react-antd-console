import { Card, Col, List, Row, Space } from 'antd';
import { useModel } from '@zhangsai/model';
import { withAuthModel } from '@/models/withAuth';
import SvgIcon from '@/components/SvgIcon';
import ThreeDPie from './3dPiie';
import { motion } from 'framer-motion';
import './index.less';

const data = [
  {
    avtar: 'color_hot',
    title: '最新技术栈',
    description: 'Vite(支持热更新)、React19、Ant Design5、TypeScript(近乎100%的类型覆盖)',
  },
  {
    avtar: 'color_focus',
    title: '专注业务',
    description: '封装好的布局(侧边菜单、面包屑、标签页、页头页脚等)，只需要专注于业务开发',
  },
  {
    avtar: 'color_permission',
    title: '权限管理',
    description: '支持菜单级和按钮级权限',
  },
  {
    avtar: 'color_router',
    title: '路由配置',
    description: '一份配置，自动生成路由、菜单、面包屑等，支持嵌套路由、单/无布局等配置，支持路由动态变化等',
  },
  {
    avtar: 'color_data',
    title: '数据管理',
    description: '分层（数据和视图）架构设计，数据管理方案理论上支持接入任意UI渲染库/框架（包括不限于React/Vue/Angular）',
  },
  {
    avtar: 'color_theme',
    title: '颜色换肤',
    description: '支持深/浅肤色模式下的任意颜色切换',
  },
  {
    avtar: 'color_tabs',
    size: 28,
    title: '多标签页',
    description: '可拖拽的多标签页，支持持久化、右键菜单等',
  },
  {
    avtar: 'color_function',
    size: 28,
    title: '其他功能',
    description: '如响应式设计、国际化、Mock、环境配置、工程化规范等',
  },
]

const Home = () => {
  const userAccount = useModel(withAuthModel, 'userAccount');
  const text = ' 是一个后台管理系统的生产级前端解决方案，封装了后台管理系统必要功能（如登录、鉴权、菜单、面包屑、标签页等），帮助开发人员专注于业务快速开发。项目基于 React 19、Ant design 5、Vite 和 TypeScript 等新版本。对于使用到的各项技术，会被持续更新至最新版本'.split('');
  return (
    <div className="console-home">
      <Space orientation="vertical">
        <Row gutter={24}>
          <Col span={11}>
            <Space orientation="vertical" size="large">
              <Space orientation="vertical" size="large">
                <h2>欢迎你! { userAccount.charAt(0).toUpperCase() + userAccount.slice(1) }</h2>
                <p className="console-home__desc">
                  <strong>react-antd-console</strong>
                  {text.map((el, i) => (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.1,
                        delay: i / 10
                      }}
                      key={i}
                    >
                      {el}{''}
                    </motion.span>
                  ))}
                </p>
              </Space>
              <Card title="语言" extra={<span>核心源码量约 3400 行</span>}>
                <ThreeDPie />
              </Card>
            </Space>
          </Col>
          <Col span={13}>
            <Card title="功能" className="console-home__function">
              <List
                size="small"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<SvgIcon name={item.avtar} size={item.size ?? 32} />}
                      title={item.title}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default Home;
