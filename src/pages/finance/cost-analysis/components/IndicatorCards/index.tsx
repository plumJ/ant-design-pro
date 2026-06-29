import { Card } from 'antd';
import type { FC } from 'react';
import { metricCards, progressCard } from '../../mock/indicatorCardsData';

// ==================== 样式常量 ====================

const POSITIVE_COLOR = '#52c41a';
const NEGATIVE_COLOR = '#f5222d';

const titleStyle: React.CSSProperties = {
  color: '#8c8c8c',
  fontSize: 12,
  marginBottom: 4,
};

const valueStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 8,
};

// ==================== 子组件 ====================

/** 标准指标卡（前 4 个） */
const MetricCard: FC<{
  title: string;
  value: string;
  delta: number;
  unit: string;
  comparisonLabel: string;
  comparisonValue: string;
}> = ({ title, value, delta, unit, comparisonLabel, comparisonValue }) => {
  const isUp = delta >= 0;
  const color = isUp ? POSITIVE_COLOR : NEGATIVE_COLOR;
  const arrow = isUp ? '▲' : '▼';
  const sign = isUp ? '+' : '';

  return (
    <Card variant="borderless" style={{ flex: 1 }}>
      <div style={titleStyle}>{title}</div>
      <div style={valueStyle}>{value}</div>
      <div style={{ marginBottom: 2 }}>
        <span style={{ color, fontSize: 12, fontWeight: 500 }}>
          {arrow} {sign}
          {Math.abs(delta)}
          {unit}
        </span>
      </div>
      <div style={{ color: '#8c8c8c', fontSize: 11 }}>
        {comparisonLabel} {comparisonValue}
      </div>
    </Card>
  );
};

/** 进度汇总卡（第 5 个） */
const ProgressSummaryCard: FC = () => {
  const { percent, usedLabel, usedAmount, targetLabel, targetAmount } =
    progressCard;

  return (
    <Card variant="borderless" style={{ flex: 1 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 28, fontWeight: 600, marginBottom: 12 }}>
          {percent}%
        </div>
        <div style={{ marginBottom: 8 }}>
          <div
            style={{
              width: '100%',
              height: 8,
              backgroundColor: '#e8e8e8',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${percent}%`,
                height: '100%',
                backgroundColor: '#4a90e2',
                borderRadius: 4,
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            fontSize: 11,
            color: '#8c8c8c',
          }}
        >
          <span>
            {usedLabel}：{usedAmount}
          </span>
          <span>
            {targetLabel}：{targetAmount}
          </span>
        </div>
      </div>
    </Card>
  );
};

// ==================== 主组件 ====================

const IndicatorCards: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        marginBottom: 24,
      }}
    >
      {metricCards.map((card) => (
        <div
          key={card.title}
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <MetricCard {...card} />
        </div>
      ))}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ProgressSummaryCard />
      </div>
    </div>
  );
};

export default IndicatorCards;
