import { Bar } from '@ant-design/plots';
import { Card, Segmented } from 'antd';
import type { FC } from 'react';
import React, { useMemo, useRef, useState } from 'react';
import allRows from '../../mock/costDetailData';

// ==================== 类型 ====================

type SortMode = 'budget' | 'actual' | 'difference';

interface ChartDatum {
  department: string;
  type: string;
  value: number;
}

interface AnnotationDatum {
  department: string;
  maxValue: number;
  diffText: string;
  isPositive: boolean;
}

// ==================== 常量 ====================

const SORT_OPTIONS: { label: string; value: SortMode }[] = [
  { label: '按预算', value: 'budget' },
  { label: '按实际', value: 'actual' },
  { label: '按差异额', value: 'difference' },
];

// ==================== 组件 ====================

interface Props {
  onDepartmentClick?: (department: string) => void;
}

const DepartmentBudgetChart: FC<Props> = ({ onDepartmentClick }) => {
  const [sortMode, setSortMode] = useState<SortMode>('budget');

  // 用 ref 保存最新 callback，避免 onReady 闭包捕获旧值
  const onDeptClickRef = useRef(onDepartmentClick);
  onDeptClickRef.current = onDepartmentClick;

  // ---- 聚合 + 排序 + 构建图表数据 ----
  const { chartData, annotationData, sortedDepts } = useMemo(() => {
    // 1. 按部门聚合
    const deptMap = new Map<string, { budget: number; actual: number }>();
    for (const row of allRows) {
      const entry = deptMap.get(row.departmentKey) ?? { budget: 0, actual: 0 };
      entry.budget += row.budget;
      entry.actual += row.actual;
      deptMap.set(row.departmentKey, entry);
    }

    // 2. 按选定模式排序
    const sorted = [...deptMap.entries()]
      .sort(([, a], [, b]) => {
        if (sortMode === 'budget') return b.budget - a.budget;
        if (sortMode === 'actual') return b.actual - a.actual;
        return Math.abs(b.actual - b.budget) - Math.abs(a.actual - a.budget);
      })
      .map(([dept]) => dept);

    // 3. 构建图表和标注数据
    const cData: ChartDatum[] = [];
    const aData: AnnotationDatum[] = [];
    for (const dept of sorted) {
      const entry = deptMap.get(dept);
      if (!entry) continue;
      const { budget, actual } = entry;
      cData.push({ department: dept, type: '预算', value: budget });
      cData.push({ department: dept, type: '实际', value: actual });
      const diff = actual - budget;
      aData.push({
        department: dept,
        maxValue: Math.max(budget, actual),
        diffText: `${diff >= 0 ? '+' : ''}${diff.toFixed(1)}`,
        isPositive: diff >= 0,
      });
    }
    return { chartData: cData, annotationData: aData, sortedDepts: sorted };
  }, [sortMode]);

  return (
    <Card
      variant="borderless"
      title={
        <span style={{ fontWeight: 600, fontSize: 16 }}>
          📊 部门费用预算 vs 实际（点击条形联动明细）
        </span>
      }
    >
      <Segmented
        value={sortMode}
        onChange={(val) => setSortMode(val as SortMode)}
        options={SORT_OPTIONS}
        style={{ marginBottom: 16 }}
      />
      <Bar
        height={400}
        data={chartData}
        xField="department"
        yField="value"
        colorField="type"
        group={true}
        scale={{
          x: { domain: sortedDepts },
          y: { domainMin: 0 },
          color: {
            domain: ['预算', '实际'],
            range: ['#1890FF', '#FA8C16'],
          },
        }}
        axis={{
          x: { title: false, labelAutoHide: false, grid: null },
          y: {
            title: false,
            grid: {
              line: { style: { lineDash: [4, 4], stroke: '#E5E7EB' } },
            },
          },
        }}
        legend={{
          position: 'top',
          layout: { justifyContent: 'flex-end' },
        }}
        tooltip={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          title: (d: any) => d.department,
          items: [
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (d: any) => ({
              name: d.type,
              value: d.value.toFixed(1),
            }),
          ],
        }}
        label={false}
        onReady={(plot) => {
          // 直接绑定到原始 G2 Chart（非 Plot 包装层）
          const g2Chart = (plot as any).chart;
          if (g2Chart) {
            g2Chart.on('element:click', (event: any) => {
              const record = event.data?.data as ChartDatum | undefined;
              if (record?.department) {
                onDeptClickRef.current?.(record.department);
              }
            });
          }
        }}
        onEvent={(_chart, event: any) => {
          // 双保险：onEvent 也监听所有含 click 的事件
          if (event.type?.includes?.('click')) {
            const record = event.data?.data as ChartDatum | undefined;
            if (record?.department) {
              onDeptClickRef.current?.(record.department);
            }
          }
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        annotations={
          [
            {
              type: 'text',
              data: annotationData,
              xField: 'department',
              yField: 'maxValue',
              style: {
                text: (d: AnnotationDatum) => d.diffText,
                textAlign: 'start',
                dx: 8,
                fill: (d: AnnotationDatum) =>
                  d.isPositive ? '#cf1322' : '#389e0d',
                fontSize: 12,
                fontWeight: 500,
              },
            },
          ] as any // eslint-disable-line @typescript-eslint/no-explicit-any
        }
      />
      <div
        style={{
          textAlign: 'right',
          color: '#8C8C8C',
          fontSize: 12,
          marginTop: 8,
        }}
      >
        *柱子右侧数字为差额（实际－预算）
      </div>
    </Card>
  );
};

export default DepartmentBudgetChart;
