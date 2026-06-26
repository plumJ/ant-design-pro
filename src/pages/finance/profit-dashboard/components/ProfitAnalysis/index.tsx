import { DualAxes, Waterfall } from '@ant-design/plots';
import { Card, Segmented } from 'antd';
import type { FC } from 'react';
import React, { useState } from 'react';

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

// ==================== 瀑布图数据 ====================

// 年度汇总
const year2025Total = profit2025.reduce((a, b) => a + b, 0);
const y2026Total = Object.values(profit2026).reduce((a, b) => a + b, 0);

// 2025/1 ~ 2026/4 各月净利润 + 年度总计
const toWaterfallItem = (month: string, profit: number, isTotal = false) => ({
  month,
  profit,
  type: (isTotal ? 'total' : profit >= 0 ? 'rising' : 'falling') as
    | 'rising'
    | 'falling'
    | 'total',
  ...(isTotal ? { isTotal: true } : {}),
});

const waterfallData = [
  // 2025 年
  ...months.map((m, i) => toWaterfallItem(`25/${m}`, profit2025[i])),
  toWaterfallItem('2025年总计', year2025Total, true),
  // 2026 年 1-4 月（1月从 0 开始，但保持橙色）
  {
    month: '26/1月',
    profit: profit2026[0],
    type: 'rising' as const,
    isTotal: true,
  },
  ...months
    .slice(1, 4)
    .map((m, i) => toWaterfallItem(`26/${m}`, profit2026[i + 1])),
  toWaterfallItem('2026年当前总计', y2026Total, true),
];

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

// ==================== 主组件 ====================

const ProfitAnalysis: FC = () => {
  const [chartType, setChartType] = useState<'waterfall' | 'dual-axes'>(
    'waterfall',
  );

  return (
    <Card
      variant="borderless"
      style={{ marginBottom: 24 }}
      title={<span style={{ fontWeight: 600, fontSize: 16 }}>利润分析</span>}
      extra={
        <Segmented
          value={chartType}
          onChange={(val) => setChartType(val as typeof chartType)}
          options={[
            { label: '利润瀑布图', value: 'waterfall' },
            { label: '利润柱状趋势图', value: 'dual-axes' },
          ]}
        />
      }
    >
      {chartType === 'waterfall' ? (
        <Waterfall
          height={380}
          data={waterfallData}
          xField="month"
          yField="profit"
          colorField="type"
          scale={{
            y: { domainMin: 0 },
            color: {
              domain: ['rising', 'falling', 'total'],
              range: ['#E77562', '#5CB85C', '#99AAB5'],
            },
          }}
          axis={{
            y: {
              title: false,
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
            },
          }}
          label={{
            text: (d: { profit: number }) => `${d.profit}万`,
            position: 'inside',
            style: { fill: '#fff', fontSize: 10 },
          }}
          linkStyle={{ stroke: '#aaa', lineDash: [4, 4] }}
          legend={false}
        />
      ) : (
        <div>
          {legendNode}
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
                          style: {
                            lineDash: [4, 4],
                            stroke: '#E5E7EB',
                          },
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
        </div>
      )}
    </Card>
  );
};

export default ProfitAnalysis;
