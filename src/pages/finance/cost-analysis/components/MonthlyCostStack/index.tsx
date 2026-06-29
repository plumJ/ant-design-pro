import { Area } from '@ant-design/plots';
import { Card } from 'antd';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import {
  categoryColors,
  monthlyCostData,
} from '../../mock/monthlyCostStackData';

// ==================== 组件 ====================

const MonthlyCostStack: FC = () => {
  const colorRange = useMemo(() => Object.values(categoryColors), []);

  return (
    <Card
      variant="borderless"
      title={
        <span style={{ fontWeight: 600, fontSize: 16 }}>
          📊 月度费用堆叠分析
        </span>
      }
    >
      <Area
        height={400}
        data={monthlyCostData}
        xField="month"
        yField="value"
        colorField="category"
        stack={true}
        scale={{
          y: { domainMin: 0, domainMax: 800 },
          color: { range: colorRange },
        }}
        axis={{
          y: {
            title: false,
            labelFormatter: (v: number) => `${v}`,
            grid: {
              line: {
                style: { lineDash: [4, 4], stroke: '#E5E7EB' },
              },
            },
          },
          x: {
            grid: null,
            labelAutoHide: false,
          },
        }}
        style={{
          fillOpacity: 0.85,
        }}
        legend={{
          position: 'bottom',
          layout: { justifyContent: 'center' },
        }}
        tooltip={{
          items: [
            (d: { category: string; value: number }) => ({
              name: d.category,
              value: d.value,
              color: categoryColors[d.category],
            }),
          ],
        }}
      />
    </Card>
  );
};

export default MonthlyCostStack;
