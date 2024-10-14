import { Bar, BarOptions } from '@antv/g2plot';
import { useEffect, useMemo, useRef } from 'react';
import { useMount } from 'react-use';

const data = [
  { year: '2048', value: 38 },
  { year: '2049', value: 52 },
  { year: '2050', value: 61 },
  { year: '2051', value: 145 },
  { year: '2052', value: 48 },
];

const DemoBar = () => {
  const ref = useRef<Bar>();
  const config: BarOptions = useMemo(() => {
    return {
      data,
      xField: 'value',
      yField: 'year',
      seriesField: 'year',
      legend: {
        position: 'top-left',
      },
    };
  }, []);

  useMount(() => {
    const line = new Bar('demoBar', config);
    ref.current = line;
    line.render();
  });

  useEffect(() => {
    ref.current?.update(config);
  }, [config]);

  return (
    <div id="demoBar" />
  );
};

export default DemoBar;
