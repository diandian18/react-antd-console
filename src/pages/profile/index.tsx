import { Avatar, Button, Space } from 'antd';
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
        <Space direction="vertical">
          <Avatar src={logo} size={128} />
          <h2>{userAccount}</h2>
          <p>千里之行, 始于足下</p>
          <Button type="primary">Follow</Button>
          <div className="console-profile__contact">
            <p><SvgIcon name="company" /> <span>@水浒寨</span></p>
            <p><SvgIcon name="location" /> <span>水泊梁山</span></p>
            <p><SvgIcon name="email" /> <a>luzhishen@zhongyitang.com</a></p>
            <p><SvgIcon name="contact" /> <a>https://shuihu.com</a></p>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default Profile;

