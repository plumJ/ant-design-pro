import { Card, Col, Row } from 'antd';
import type { FC } from 'react';
import type { AnnualCardProps } from '../../mock/topCardsData';
import { topCardsData } from '../../mock/topCardsData';

const titleStyle: React.CSSProperties = {
  color: '#8c8c8c',
  fontSize: 14,
  marginBottom: 8,
};

const valueStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 600,
};

const AnnualCard: FC<AnnualCardProps> = ({ title, value }) => (
  <Card variant="borderless">
    <div style={titleStyle}>{title}</div>
    <div style={valueStyle}>{value}</div>
  </Card>
);

const TopCards: FC = () => {
  return (
    <Row gutter={24} style={{ marginBottom: 24 }}>
      {topCardsData.map((item) => (
        <Col key={item.title} xs={24} sm={12} lg={6}>
          <AnnualCard title={item.title} value={item.value} />
        </Col>
      ))}
    </Row>
  );
};

export default TopCards;
