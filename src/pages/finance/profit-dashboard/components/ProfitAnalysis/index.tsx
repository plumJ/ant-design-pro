import { DualAxes } from '@ant-design/plots';
import { Card } from 'antd';
import type { FC } from 'react';
import React from 'react';

// ==================== 数据常量 ====================

const months = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
];

const revenue2025 = [
  1800, 1600, 2000, 1900, 2200, 2400, 2600, 2500, 2300, 2100, 2700, 2900,
];
const profit2025 = [270, 240, 300, 285, 350, 390, 430, 410, 370, 340, 450, 500];
const rate2025 = [
  0.12, 0.16, 0.15, 0.145, 0.14, 0.135, 0.13, 0.125, 0.115, 0.105, 0.095, 0.078,
];

// 2026 年 1-4 月实际值
const revenue2026: Record<number, number> = {
  0: 2900,
  1: 2700,
  2: 2400,
  3: 2000,
};
const profit2026: Record<number, number> = {
  0: 464,
  1: 430,
  2: 380,
  3: 320,
};

// 2026 年 5-12 月预测值（利润率 16%）
const projectedRevenue = [1900, 1800, 1700, 1850, 1950, 2100, 2300, 2500];
const projectedProfit = [304, 288, 272, 296, 312, 336, 368, 400];

// 2026 年利润率
const rate2026ActualValues = [0.16, 0.159, 0.158, 0.16];

// ==================== X 轴标签 ====================

const monthsLabel25 = months.map((m) => `25/${m}`);
const monthsLabel26 = months.map((m) => `26/${m}`);
const allMonthsLabel = [...monthsLabel25, ...monthsLabel26];

// ==================== 柱状数据 ====================

// 实际值：2025 全年 + 2026 年 1-4 月
const actualBarData = [
  ...months.flatMap((m, i) => [
    { month: `25/${m}`, type: '收入', value: revenue2025[i] },
    { month: `25/${m}`, type: '净利润', value: profit2025[i] },
  ]),
  ...months.slice(0, 4).flatMap((m, i) => [
    { month: `26/${m}`, type: '收入', value: revenue2026[i] },
    { month: `26/${m}`, type: '净利润', value: profit2026[i] },
  ]),
];

// 预测值：2026 年 5-12 月
const projectedBarData = months.slice(4).flatMap((m, i) => [
  { month: `26/${m}`, type: '收入', value: projectedRevenue[i] },
  { month: `26/${m}`, type: '净利润', value: projectedProfit[i] },
]);

// ==================== 折线数据 ====================

// 实际值折线：2025 全年 + 2026 年 1-4 月
const actualLineData = [
  ...months.map((m, i) => ({ month: `25/${m}`, value: rate2025[i] })),
  ...months.slice(0, 4).map((m, i) => ({
    month: `26/${m}`,
    value: rate2026ActualValues[i],
  })),
];

// 预测值折线：2026 年 5-12 月
const projectedLineData = months.slice(4).map((m) => ({
  month: `26/${m}`,
  value: 0.16,
}));

// ==================== 图例 ====================

const legendNode = (
  <div
    style={{
      display: 'flex',
      gap: 24,
      alignItems: 'center',
      fontSize: 12,
    }}
  >
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: 12,
          height: 12,
          backgroundColor: '#1E293B',
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      收入
    </span>
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: 12,
          height: 12,
          backgroundColor: '#6EE7B7',
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      净利润
    </span>
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: 16,
          height: 2,
          backgroundColor: '#3B82F6',
          flexShrink: 0,
        }}
      />
      净利润率（趋势）
    </span>
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: 12,
          height: 12,
          backgroundColor: '#1E293B',
          borderRadius: 2,
          opacity: 0.35,
          flexShrink: 0,
        }}
      />
      收入/净利润（预测）
    </span>
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: 16,
          height: 0,
          borderTop: '2px dashed #3B82F6',
          flexShrink: 0,
        }}
      />
      净利润率（预测）
    </span>
  </div>
);

// ==================== 卡片标题 ====================

const cardTitle = (title: string) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <span style={{ fontWeight: 600, fontSize: 16 }}>{title}</span>
    {legendNode}
  </div>
);

// ==================== 主组件 ====================

const ProfitAnalysis: FC = () => {
  return (
    <Card
      variant="borderless"
      style={{ marginBottom: 24 }}
      title={cardTitle('2025-2026年收入利润分析')}
    >
      <DualAxes
        height={380}
        xField="month"
        axis={{
          y: false,
        }}
        {...{
          children: [
            // ① 实际值柱子 — 实心，正常颜色
            {
              type: 'interval',
              data: actualBarData,
              xField: 'month',
              yField: 'value',
              colorField: 'type',
              group: true,
              scale: {
                x: { domain: allMonthsLabel },
                y: { key: 'leftY', domainMin: 0, domainMax: 5000 },
                color: {
                  domain: ['收入', '净利润'],
                  range: ['#1E293B', '#6EE7B7'],
                },
              },
              axis: {
                y: {
                  title: false,
                  position: 'left',
                  labelFormatter: (v: number) => (v === 0 ? '0' : `${v}万`),
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
                  transform: [],
                },
              },
              legend: false,
              tooltip: {
                title: (d: { month: string }) => d.month,
              },
            },
            // ② 预测值柱子 — 半透明
            {
              type: 'interval',
              data: projectedBarData,
              xField: 'month',
              yField: 'value',
              colorField: 'type',
              group: true,
              scale: {
                y: { key: 'leftY' },
                color: {
                  domain: ['收入', '净利润'],
                  range: ['#1E293B', '#6EE7B7'],
                },
              },
              style: {
                fillOpacity: 0.35,
              },
              axis: {
                y: false,
                x: false,
              },
              legend: false,
              tooltip: {
                title: (d: { month: string }) => d.month,
              },
            },
            // ③ 实际值折线 — 实线
            {
              type: 'line',
              data: actualLineData,
              xField: 'month',
              yField: 'value',
              scale: {
                y: { key: 'rightY', domainMin: 0, domainMax: 0.2 },
                color: { range: ['#3B82F6'] },
              },
              axis: {
                y: {
                  title: false,
                  position: 'right',
                  labelFormatter: (v: number) => `${(v * 100).toFixed(0)}%`,
                  grid: null,
                },
              },
              style: { stroke: '#3B82F6', lineWidth: 2 },
              legend: false,
              tooltip: {
                items: [
                  (d: { value: number }) => ({
                    name: '净利润率',
                    value: `${(d.value * 100).toFixed(1)}%`,
                    color: '#3B82F6',
                  }),
                ],
              },
            },
            // ④ 预测值折线 — 虚线
            {
              type: 'line',
              data: projectedLineData,
              xField: 'month',
              yField: 'value',
              scale: {
                y: { key: 'rightY', domainMin: 0, domainMax: 0.2 },
                color: { range: ['#3B82F6'] },
              },
              style: {
                stroke: '#3B82F6',
                lineWidth: 2,
                lineDash: [6, 4],
              },
              axis: {
                y: false,
              },
              legend: false,
              tooltip: {
                items: [
                  (d: { value: number }) => ({
                    name: '净利润率（预测）',
                    value: `${(d.value * 100).toFixed(1)}%`,
                    color: '#3B82F6',
                  }),
                ],
              },
            },
          ],
        }}
      />
    </Card>
  );
};

export default ProfitAnalysis;
