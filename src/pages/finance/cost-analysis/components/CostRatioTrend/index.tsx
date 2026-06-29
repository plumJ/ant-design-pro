import { Line } from '@ant-design/plots';
import { Card } from 'antd';
import type { FC } from 'react';
import React from 'react';
import { absoluteData } from '../../mock/costRatioTrendData';

// ==================== 组件 ====================

const CostRatioTrend: FC = () => {
  return (
    <Card
      variant="borderless"
      style={{ height: '100%' }}
      title={
        <span style={{ fontWeight: 600, fontSize: 16 }}>
          📈 费用占收入比趋势（去年 vs 本年）
        </span>
      }
    >
      <Line
        height={400}
        data={absoluteData}
        xField="month"
        yField="value"
        colorField="category"
        scale={{
          y: { domainMin: 0.05, domainMax: 0.08 },
          color: {
            domain: ['去年占比', '本年占比'],
            range: ['#9CA3AF', '#3B82F6'],
          },
        }}
        axis={{
          y: {
            title: false,
            tickCount: 4,
            labelFormatter: (v: number) => `${(v * 100).toFixed(0)}%`,
            grid: {
              line: { style: { lineDash: [4, 4], stroke: '#E5E7EB' } },
            },
          },
          x: { grid: null, labelAutoHide: false },
        }}
        point={{ size: 4 }}
        legend={{
          position: 'top',
          layout: { justifyContent: 'flex-end' },
        }}
        tooltip={{
          title: (d: { month: string }) => d.month,
          items: [
            (d: { category: string; value: number }) => ({
              name: d.category,
              value: `${(d.value * 100).toFixed(2)}%`,
            }),
          ],
        }}
        annotations={[
          {
            type: 'lineY',
            yField: 0.0666,
            style: { stroke: '#f5222d', lineDash: [4, 4], lineWidth: 1.5 },
            label: {
              text: 'KPI 6.66%',
              position: 'right',
              offsetX: 4,
              style: { fill: '#f5222d', fontSize: 12 },
            },
          },
        ]}
      />
    </Card>
  );
};

export default CostRatioTrend;
