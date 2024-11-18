import LoginForm from './LoginForm';
import Tools from './Tools';
import SvgIcon from '@/components/SvgIcon';
import './index.less';

const Login = () => {
  return (
    <div className="console-login">
      <div className="console-login__container">
        <LoginForm />
        <Tools />
      </div>
      <footer className="console-login__footer">
        Copyright <SvgIcon name="copyright" /> 2024 react-antd-console
      </footer>
    </div>
  );
};

export default Login;
