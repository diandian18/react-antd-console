import { useModel } from '@zhangsai/model';
import i18n from '@/locales';
import { baseModel } from '@/models/base';
import { Column, ColumnOptions } from '@antv/g2plot';
import { useEffect, useMemo, useRef } from 'react';
import { useMount } from 'react-use';

const t_home = (key: string) => {
  return i18n.t(`home:${key}`);
};

const DemoColumn = () => {
  const ref = useRef<Column>();
  const language = useModel(baseModel, 'language');
  const data = useMemo(() => {
    return [
      { type: `1-3${t_home('秒')}`, value: 0.16 },
      { type: `4-10${t_home('秒')}`, value: 0.125 },
      { type: `11-30${t_home('秒')}`, value: 0.24 },
      { type: `31-60${t_home('秒')}`, value: 0.19 },
      { type: `1-3${t_home('分')}`, value: 0.22 },
      { type: `3-10${t_home('分')}`, value: 0.05 },
      { type: `10-30${t_home('分')}`, value: 0.01 },
      { type: `30+${t_home('分')}`, value: 0.015 },
    ];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);
  const config: ColumnOptions = useMemo(() => {
    return {
      data,
      xField: 'type',
      yField: 'value',
      seriesField: '',
      color: '#1677ff',
      label: {
        content: (originData) => {
          const val = parseFloat(originData.value);
          if (val < 0.05) {
            return (val * 100).toFixed(1) + '%';
          } else {
            return '';
          }
        },
        offset: 10,
      },
      legend: false,
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
    };
  }, [data]);

  useMount(() => {
    const chart = new Column('demoColumn', config);
    ref.current = chart;
    chart.render();
  });

  useEffect(() => {
    ref.current?.update(config);
  }, [config]);

  return (
    <div id="demoColumn" />
  );
};

export default DemoColumn;
