import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import {
  PieChart
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  LegendComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption
} from 'echarts/charts';
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption
} from 'echarts/components';
import type {
  ComposeOption,
} from 'echarts/core';
import { useEffect } from 'react';
import { useMount } from 'react-use';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

const ThreeDPie = () => {
  useMount(() => {
    const chartDom = document.getElementById('pie')!;
    const myChart = echarts.init(chartDom);
    const option: EChartsOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          type: 'pie',
          center: ['50%', '58%'],
          avoidLabelOverlap: false,
          padAngle: 0,
          itemStyle: {
            borderRadius: 10
          },
          label: {
            show: false,
            position: 'inside',
            formatter: '{d}%',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
            },
            itemStyle: {
              shadowBlur: 12,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.8)',
            }
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 75.4, name: 'TypeScript', itemStyle: { color: '#3178c6' } },
            { value: 10.7, name: 'Less', itemStyle: { color: '#1d365d' } },
            { value: 9.1, name: 'JSON', itemStyle: { color: '#0fd59d' } },
            { value: 0.3, name: 'HTML', itemStyle: { color: '#e44d26' } },
            { value: 4.5, name: 'Other', itemStyle: { color: '#f8b862' } },
          ]
        }
      ]
    };

    option && myChart.setOption(option);
  });

  return <div id="pie" style={{width: '100%', height: '374px'}}></div>;
}

export default ThreeDPie;
