import { Card, Col, Divider, Row } from 'antd';
import type { FC } from 'react';
import type { ComparisonItem } from '../../mock/comparisonCardsData';
import { cards } from '../../mock/comparisonCardsData';

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
