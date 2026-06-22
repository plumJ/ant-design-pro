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

// ==================== 图表数据 ====================

const barData2025 = months.flatMap((month, i) => [
  { month, type: '收入', value: revenue2025[i] },
  { month, type: '净利润', value: profit2025[i] },
]);

const lineData2025 = months.map((month, i) => ({
  month,
  value: rate2025[i],
}));

// 2026 年数据（仅 1-4 月有实际值）
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
const rate2026Actual = [
  { month: '1月', value: 0.16 },
  { month: '2月', value: 0.159 },
  { month: '3月', value: 0.158 },
  { month: '4月', value: 0.16 },
];
const rate2026Project = months.slice(4).map((month) => ({
  month,
  value: 0.11,
}));

const barData2026 = months.slice(0, 4).flatMap((month, i) => [
  { month, type: '收入', value: revenue2026[i] },
  { month, type: '净利润', value: profit2026[i] },
]);

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
    <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
      <Card
        variant="borderless"
        style={{ flex: 1 }}
        title={cardTitle('2025年收入利润分析')}
      >
        <DualAxes
          height={380}
          xField="month"
          axis={{
            y: false,
          }}
          {...{
            children: [
              {
                type: 'interval',
                data: barData2025,
                xField: 'month',
                yField: 'value',
                colorField: 'type',
                group: true,
                scale: {
                  x: { domain: months },
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
                  x: { grid: null, labelAutoHide: false, transform: [] },
                },
                legend: false,
                tooltip: {
                  title: (d: { month: string }) => d.month,
                },
              },
              {
                type: 'line',
                data: lineData2025,
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
            ],
          }}
        />
      </Card>
      <Card
        variant="borderless"
        style={{ flex: 1 }}
        title={cardTitle('2026年收入利润分析')}
      >
        <DualAxes
          height={380}
          xField="month"
          axis={{
            y: false,
          }}
          {...{
            children: [
              {
                type: 'interval',
                data: barData2026,
                xField: 'month',
                yField: 'value',
                colorField: 'type',
                group: true,
                scale: {
                  x: { domain: months },
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
                  x: { grid: null, labelAutoHide: false, transform: [] },
                },
                legend: false,
                tooltip: {
                  title: (d: { month: string }) => d.month,
                },
              },
              {
                type: 'line',
                data: rate2026Actual,
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
            ],
          }}
        />
      </Card>
    </div>
  );
};

export default ProfitAnalysis;
