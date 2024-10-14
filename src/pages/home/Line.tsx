import { Line } from '@antv/g2plot';
import { useEffect, useMemo, useRef } from 'react';
import { useMount } from 'react-use';

const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

const DemoLine = () => {
  const ref = useRef<Line>();
  const config = useMemo(() => {
    return {
      data,
      xField: 'year',
      yField: 'value',
      label: {},
      point: {
        size: 4,
        shape: 'circle',
        style: {
          fill: 'white',
          stroke: '#1677ff',
          lineWidth: 2,
        },
      },
      tooltip: { showMarkers: false },
      color: '#1677ff',
    };
  }, []);

  useMount(() => {
    const line = new Line('demoLine', config);
    ref.current = line;
    line.render();
  });

  useEffect(() => {
    ref.current?.update(config);
  }, [config]);

  return (
    <div id="demoLine" />
  );
};

export default DemoLine;
