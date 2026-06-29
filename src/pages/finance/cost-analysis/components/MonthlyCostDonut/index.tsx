import { Pie } from '@ant-design/plots';
import { Card } from 'antd';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import { donutData, donutTotal } from '../../mock/monthlyCostDonutData';
import { categoryColors } from '../../mock/monthlyCostStackData';

// ==================== 组件 ====================

const MonthlyCostDonut: FC = () => {
  const colorRange = useMemo(() => Object.values(categoryColors), []);

  return (
    <Card
      variant="borderless"
      title={
        <span style={{ fontWeight: 600, fontSize: 16 }}>🍩 月度费用构成</span>
      }
    >
      <Pie
        height={400}
        data={donutData}
        angleField="value"
        colorField="category"
        innerRadius={0.6}
        scale={{ color: { range: colorRange } }}
        legend={{
          position: 'right',
          itemLabelText: (d: { label: string }) => d.label,
        }}
        tooltip={{
          items: [
            (d: { category: string; value: number }) => ({
              name: d.category,
              value: `${d.value} (${((d.value / donutTotal) * 100).toFixed(1)}%)`,
              color: categoryColors[d.category],
            }),
          ],
        }}
        label={false}
        annotations={[
          {
            type: 'text',
            style: {
              text: `${donutTotal}`,
              x: '50%',
              y: '47%',
              textAlign: 'center',
              fontSize: 28,
              fontWeight: 600,
            },
          },
          {
            type: 'text',
            style: {
              text: '费用总计',
              x: '50%',
              y: '55%',
              textAlign: 'center',
              fontSize: 13,
              fill: '#8c8c8c',
            },
          },
        ]}
      />
    </Card>
  );
};

export default MonthlyCostDonut;
