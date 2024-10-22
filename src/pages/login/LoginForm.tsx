import { message } from 'antd';
import { history } from '@/router';
import { httpPostLogin } from '@/services/login';
import { lsSetToken } from '@/utils/business/token';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/SvgIcon';

interface FormValues {
  userAccount: string;
  userPassword: string;
}

const LoginForm = () => {
  const [form] = Form.useForm<FormValues>();
  const { t: t_login } = useTranslation('login');

  const onFinish = () => {
    form.validateFields().then(({ userAccount, userPassword }: FormValues) => {
      httpPostLogin({
        userAccount,
        userPassword,
      }).then(({ data: { data } }) => {
        lsSetToken(data.accessToken, data.refreshToken, data.expiration);
        message.success(t_login('登录成功'));
        const reUrl = window.location.search.replace(/^\?/, '').split('&').map(item => item.split('=')).find(([key]) => key === 'reUrl')?.[1];
        history.push(reUrl ?? '/home');
      }).catch(() => {});
    }).catch(() => {});
  };

  return (
    <div className="console-login__login-form">
      <h1>{t_login('欢迎回来')}</h1>
      <h3>react-antd-console</h3>
      <Form
        form={form}
        initialValues={{ userAccount: 'admin', userPassword: 'admin', remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          className="console-login__login-form-item"
          name="userAccount"
          rules={[{ required: true, message: t_login('请输入帐号') }]}
        >
          <Input size="large" prefix={<SvgIcon name="user" />} placeholder="admin" />
        </Form.Item>
        <Form.Item
          className="console-login__login-form-item"
          name="userPassword"
          rules={[{ required: true, message: t_login('请输入密码') }]}
        >
          <Input size="large" prefix={<SvgIcon name="locked" />} type="password" placeholder="admin" />
        </Form.Item>
        <Form.Item className="console-login__login-form-item">
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t_login('记住我')}</Checkbox>
            </Form.Item>
            <a>{t_login('忘记密码')}</a>
          </Flex>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit" size="large">
            {t_login('登录')}
          </Button>
          <div className="console-login__login-form-register">
            {t_login('或')} <a>{t_login('注册')}</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
