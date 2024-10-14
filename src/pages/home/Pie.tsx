import { Pie, PieOptions } from '@antv/g2plot';
import { useEffect, useMemo, useRef } from 'react';
import { useMount } from 'react-use';
import { useModel } from '@zhangsai/model';
import { baseModel } from '@/models/base';
import i18n from '@/locales';

const t_home = (key: string) => {
  return i18n.t(`home:${key}`);
};

const DemoPie = () => {
  const ref = useRef<Pie>();
  const language = useModel(baseModel, 'language');
  const data = useMemo(() => {
    return [
      { type: `${t_home('分类')}1`, value: 27 },
      { type: `${t_home('分类')}2`, value: 25 },
      { type: `${t_home('分类')}3`, value: 18 },
      { type: `${t_home('分类')}4`, value: 15 },
      { type: `${t_home('分类')}5`, value: 10 },
      { type: t_home('其他'), value: 5 },
    ];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);
  
  const config: PieOptions = useMemo(() => {
    return {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.6,
      label: {
        type: 'inner',
        offset: '-50%',
        content: '{value}',
        style: {
          textAlign: 'center',
          fontSize: 14,
        },
      },
      interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
      statistic: {
        title: false,
        content: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          content: 'React Antd',
        },
      },
    };
  }, [data]);

  useMount(() => {
    const chart = new Pie('demoPie', config);
    ref.current = chart;
    chart.render();
  });

  useEffect(() => {
    ref.current?.update(config);
  }, [config]);

  return (
    <div id="demoPie" />
  );
};

export default DemoPie;
