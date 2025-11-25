import { themeModel } from '@/models/theme';
import { useModel } from '@zhangsai/model';
import { InputNumber, Space } from 'antd';
import { useState } from 'react';

const Alive = () => {
  const [count, setCount] = useState<number>();
  const [showAd, setShowAd] = useState(false);
  const colorPrimary = useModel(themeModel, 'colorPrimary');

  return (
    <div>
      <div>
        <Space orientation="vertical">
          <p>输入数字并滚动滚轮，切换到其他页面，然后再切换回来，看看数字和滚轮状态是否还保持原来: </p>
          <div>
            练习了 <InputNumber style={{ width: '60px' }} value={count} onChange={(v) => {
              if (v) {
                setCount(v);
              }
            }} /> 年半？
          </div>
          <div style={{ height: 200, border: '1px solid #000', overflow: 'auto', borderRadius: '8px' }}>
            <div style={{ height: 1000, backgroundColor: `${colorPrimary}` }}></div>
          </div>
        </Space>
      </div>
      {count && (
        <div style={{ marginTop: '20px' }}>
          <Space orientation="vertical">
            <p>
              朋友，我看你似乎对多标签的 KeepAlive 感兴趣，<a href="https://doc.react-antd-console.site/development/keep-alive.html" target="blank" onClick={() => {
                setShowAd(true);
              }}>点击查看文档</a> 以启用。
            </p>
            {showAd && (
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>如果你觉得这个项目对你有帮助，欢迎给我点个 <a href="https://github.com/diandian18/react-antd-console" target="blank">Star</a>，感谢你的支持！</p>
            )}
          </Space>
        </div>
      )}
    </div>
  );
}

export default Alive;
