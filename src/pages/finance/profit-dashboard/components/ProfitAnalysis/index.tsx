import { DualAxes } from '@ant-design/plots';
import { Card } from 'antd';
import type { FC } from 'react';
import React from 'react';
import {
  actualBarData,
  actualLineData,
  months,
} from '../../mock/profitAnalysisData';

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

// ==================== 主组件 ====================

const ProfitAnalysis: FC = () => {
  return (
    <Card
      variant="borderless"
      title={<span style={{ fontWeight: 600, fontSize: 16 }}>年利润趋势</span>}
    >
      <div>
        {legendNode}
        <DualAxes
          height={450}
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
              // ② 实际值折线 — 实线
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
            ],
          }}
        />
      </div>
    </Card>
  );
};

export default ProfitAnalysis;
