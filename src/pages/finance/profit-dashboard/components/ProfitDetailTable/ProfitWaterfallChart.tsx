import { Waterfall } from '@ant-design/plots';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import { buildWaterfallData } from '../../mock/waterfallData';

// ==================== 组件 ====================

const ProfitWaterfallChart: FC = () => {
  const data = useMemo(() => buildWaterfallData(), []);

  return (
    <Waterfall
      height={468}
      data={data}
      xField="category"
      yField="amount"
      colorField="type"
      scale={{
        y: { domainMin: 0 },
        color: {
          domain: ['rising', 'falling', 'total'],
          range: ['#1E293B', '#F59E0B', '#6EE7B7'],
        },
      }}
      axis={{
        y: {
          title: false,
          labelFormatter: (v: number) => (v === 0 ? '0' : `${v}`),
          grid: {
            line: {
              style: { lineDash: [4, 4], stroke: '#E5E7EB' },
            },
          },
        },
        x: {
          grid: null,
          labelAutoHide: false,
          labelAutoRotate: true,
        },
      }}
      label={{
        text: (d: { amount: number }) => `${d.amount}`,
        position: (d: { amount: number }) => (d.amount >= 0 ? 'top' : 'bottom'),
        textBaseline: (d: { amount: number }) =>
          d.amount >= 0 ? 'bottom' : 'top',
        dy: (d: { amount: number }) => (d.amount >= 0 ? -6 : 6),
        style: { fill: '#333', fontSize: 10 },
      }}
      linkStyle={{ stroke: '#aaa', lineDash: [4, 4] }}
      legend={false}
    />
  );
};

export default ProfitWaterfallChart;
