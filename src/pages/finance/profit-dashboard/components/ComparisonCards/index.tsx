import { Card, Col, Divider, Row } from 'antd';
import type { FC } from 'react';

/** 单个比较项 */
interface ComparisonItem {
  label: string; // "环比（上月）" / "同比（去年同月）"
  referenceValue?: string; // 参考值，如 "￥2,500.00"，净利润率卡不显示
  rate: number; // 变化率，如 -5.60，正数为涨，负数为跌
  unit?: string; // "%" 或 "pp"
}

const renderComparison = (item: ComparisonItem) => {
  const isUp = item.rate >= 0;
  const color = isUp ? '#52c41a' : '#f5222d';
  const arrow = isUp ? '▲' : '▼';
  const sign = isUp ? '+' : '';
  const rateText = `${sign}${Math.abs(item.rate).toFixed(2)}${item.unit || '%'}`;

  return (
    <div>
      <div style={{ color: '#8c8c8c', fontSize: 12, marginBottom: 4 }}>
        {item.label}
      </div>
      {item.referenceValue !== undefined && (
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>
          {item.referenceValue}
        </div>
      )}
      <span style={{ color, fontSize: 13 }}>
        {arrow} {rateText}
      </span>
    </div>
  );
};

interface CardConfig {
  title: string;
  primaryValue: string;
  mom: ComparisonItem; // 环比
  yoy: ComparisonItem; // 同比
}

const cards: CardConfig[] = [
  {
    title: '本月收入',
    primaryValue: '￥2,360,000',
    mom: {
      label: '环比（上月）',
      referenceValue: '￥2,500,000',
      rate: -5.6,
    },
    yoy: {
      label: '同比（去年同月）',
      referenceValue: '￥2,200,000',
      rate: 7.27,
    },
  },
  {
    title: '本月销售净毛利',
    primaryValue: '￥6,169,000',
    mom: {
      label: '环比（上月）',
      referenceValue: '￥5,800,000',
      rate: 6.36,
    },
    yoy: {
      label: '同比（去年同月）',
      referenceValue: '￥5,500,000',
      rate: 12.16,
    },
  },
  {
    title: '本月净利润',
    primaryValue: '￥3,380,000',
    mom: {
      label: '环比（上月）',
      referenceValue: '￥3,200,000',
      rate: 5.62,
    },
    yoy: {
      label: '同比（去年同月）',
      referenceValue: '￥3,050,000',
      rate: 10.82,
    },
  },
  {
    title: '本月净利润率',
    primaryValue: '14.5%',
    mom: {
      label: '环比（上月）',
      referenceValue: '13.80%',
      rate: 0.7,
      unit: 'pp',
    },
    yoy: {
      label: '同比（去年同月）',
      referenceValue: '12.90%',
      rate: 1.6,
      unit: 'pp',
    },
  },
];

const ComparisonCards: FC = () => {
  return (
    <Row gutter={24} style={{ marginBottom: 24 }}>
      {cards.map((card) => (
        <Col key={card.title} xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            {/* 标题 */}
            <div style={{ color: '#8c8c8c', fontSize: 14, marginBottom: 8 }}>
              {card.title}
            </div>
            {/* 主值 */}
            <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
              {card.primaryValue}
            </div>
            {/* 分割线 */}
            <Divider style={{ margin: '12px 0' }} />
            {/* 环比 & 同比 */}
            <Row>
              <Col span={12}>{renderComparison(card.mom)}</Col>
              <Col span={12}>{renderComparison(card.yoy)}</Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ComparisonCards;
