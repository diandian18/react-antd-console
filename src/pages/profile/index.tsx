import { Button, Space } from 'antd';
import { useModel } from '@zhangsai/model';
import { withAuthModel } from '@/models/withAuth';
import { logo } from '@/consts';
import SvgIcon from '@/components/SvgIcon';
import './index.less';

const Profile = () => {
  const userAccount = useModel(withAuthModel, 'userAccount');

  return (
    <div>
      <div className="console-profile__wrap">
        <Space orientation="vertical">
          <img src={logo} alt="react-antd-console" width={128} />
          <h2>{userAccount}</h2>
          <p>Lok&apos;tar Ogar!</p>
          <Button type="primary" onClick={() => {
            window.open('https://github.com/diandian18/react-antd-console');
          }}>Follow</Button>
          <div className="console-profile__contact">
            <p><SvgIcon name="company" /> <span>@部落</span></p>
            <p><SvgIcon name="location" /> <span>卡利姆多</span></p>
            <p><SvgIcon name="github" /> <a href="https://github.com/diandian18/react-antd-console" target="__blank">react-antd-console</a></p>
            <p><SvgIcon name="help" /> <a href="https://doc.react-antd-console.site/" target="__blank">Document</a></p>
            <p><SvgIcon name="contact" /> <a href="https://template.react-antd-console.site" target="__blank">Preview</a></p>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default Profile;

